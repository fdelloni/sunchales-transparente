/**
 * POST /api/v1/chat — Endpoint del Asistente Ciudadano (web + buscadores embebidos).
 *
 * UNIFICADO desde 2026-05: el motor canónico de retrieval ahora es el mismo que
 * usa el chatbot de WhatsApp — búsqueda híbrida (vectorial + keyword) sobre la
 * tabla `chunks_rag` de Supabase pgvector. Esto garantiza que el ciudadano que
 * pregunta por la web y el que pregunta por WhatsApp acceden al mismo corpus
 * (~1850 documentos: Digesto Oficial completo, PDFs del Concejo, padrón de
 * funcionarios, presupuesto, marco normativo, FAQ).
 *
 * Pipeline:
 *
 *   PASO 0 — Guardrails: bloquea pedidos de opinión personal, consejo legal/médico,
 *            predicciones. Mismo comportamiento que antes.
 *
 *   PASO 1 — Retriever pgvector (motor canónico):
 *            - Recupera top-K chunks combinando vector search + keyword search.
 *            - Si hay resultados Y hay proveedor LLM configurado: invoca al LLM
 *              con esos chunks como contexto. Devuelve modo "ia" con la respuesta
 *              generada y los IDs de los chunks usados (para auditoría).
 *
 *   PASO 2 — Fallback BM25 + LLM (si pgvector no está configurado o falla):
 *            usa la baseDocumental local (23 docs curados a mano) y el mismo LLM.
 *            Esto permite que el chat funcione en entornos sin Supabase.
 *
 *   PASO 3 — Fallback final: buscarRespuestaDemo (FAQ legacy) o "sin_respuesta".
 *
 * Diseño:
 *   - El frontend (BuscadorSeccion, widget de chat) sigue recibiendo el mismo
 *     contrato de respuesta: { modo, respuesta, fuente?, url?, links? }.
 *   - Rate-limit por IP (12/min) y sin persistencia de preguntas (privacidad).
 */

import { NextResponse, type NextRequest } from "next/server";
import { construirSystemPrompt } from "@/lib/chat/systemPrompt";
import { buscarRespuestaDemo, preguntasSugeridas } from "@/lib/chat/faqLocal";
import { buscar, topN } from "@/lib/chat/buscador";
import { chequearGuardrails } from "@/lib/chat/guardrails";
import { obtenerProveedor, type Proveedor } from "@/lib/chat/proveedores";
import { recuperar, formatearContexto, type ChunkRecuperado } from "@/lib/rag/retriever";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// -------- Rate limit en memoria --------
const VENTANA_MS = 60_000;
const TOPE_POR_VENTANA = 12;
const buckets = new Map<string, { ts: number; count: number }>();

function rateLimited(ip: string): boolean {
  const ahora = Date.now();
  const b = buckets.get(ip);
  if (!b || ahora - b.ts > VENTANA_MS) {
    buckets.set(ip, { ts: ahora, count: 1 });
    return false;
  }
  b.count += 1;
  return b.count > TOPE_POR_VENTANA;
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// -------- GET: meta info para el widget --------
export async function GET() {
  const proveedor = obtenerProveedor();
  const ragActivo = Boolean(supabase);
  return NextResponse.json({
    modo: proveedor ? (ragActivo ? "ia+rag-pgvector" : "ia") : "rag",
    proveedor: proveedor?.nombre ?? null,
    modelo: proveedor?.modeloPorDefecto ?? null,
    rag_pgvector: ragActivo,
    sugeridas: preguntasSugeridas(),
    aviso: armarAvisoEstado(proveedor, ragActivo)
  });
}

function armarAvisoEstado(proveedor: Proveedor | null, ragActivo: boolean): string {
  if (proveedor && ragActivo) {
    return (
      "Asistente municipal con IA. Recupera información sobre el corpus completo del " +
      "municipio (Digesto Oficial, PDFs del Concejo, presupuesto, padrón) y sintetiza " +
      "la respuesta citando la fuente."
    );
  }
  if (proveedor) {
    return (
      "Asistente híbrido: primero busca en la base documental local; si no encuentra, " +
      "sintetiza con IA. Configurá NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY " +
      "para activar el corpus completo."
    );
  }
  return (
    "Modo sin IA: respuestas pregrabadas desde la base documental verificada. " +
    "Configurá GOOGLE_API_KEY o ANTHROPIC_API_KEY para habilitar IA."
  );
}

// -------- POST: pregunta del usuario → respuesta del asistente --------
export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas consultas. Esperá un minuto y volvé a intentar." },
      { status: 429 }
    );
  }

  let body: { pregunta?: unknown };
  try {
    body = (await req.json()) as { pregunta?: unknown };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const pregunta = typeof body.pregunta === "string" ? body.pregunta.trim() : "";
  if (!pregunta) {
    return NextResponse.json({ error: "Falta el campo 'pregunta'." }, { status: 400 });
  }
  if (pregunta.length > 600) {
    return NextResponse.json(
      { error: "La pregunta supera los 600 caracteres. Resumila por favor." },
      { status: 413 }
    );
  }

  // ============================================================
  // PASO 0 — GUARDRAILS: detectar intenciones que NO debemos resolver.
  // ============================================================
  const guard = chequearGuardrails(pregunta);
  if (guard.bloqueado) {
    return NextResponse.json({
      modo: "guardrail",
      motivo: guard.motivo,
      respuesta: guard.respuesta,
      links: [{ label: "Sitio oficial", href: "https://sunchales.gob.ar" }]
    });
  }

  const proveedor = obtenerProveedor();

  // ============================================================
  // PASO 1 — RAG pgvector (motor canónico unificado con WhatsApp).
  // Solo si Supabase está configurado Y hay un proveedor LLM.
  // ============================================================
  if (supabase && proveedor) {
    try {
      const chunks = await recuperar(pregunta, {
        topK: 20,
        poolInicial: 50,
        umbral: 0.05
      });

      if (chunks.length > 0) {
        const respuesta = await consultarLlmConChunksPgvector(pregunta, proveedor, chunks);
        return NextResponse.json({
          modo: "ia",
          proveedor: proveedor.nombre,
          modelo: respuesta.modelo,
          respuesta: respuesta.texto,
          // Devolvemos info de la fuente principal para que el widget pueda
          // mostrar "ver fuente original" cuando hace sentido.
          fuente: chunks[0].fuenteTitulo,
          url: chunks[0].fuenteUrl ?? undefined,
          contexto_usado: chunks.slice(0, 5).map((c) => `${c.fuenteTipo}/${c.fuenteId}`)
        });
      }
      // Si pgvector no devolvió chunks, intentamos fallback BM25.
    } catch (err) {
      console.error("[/api/v1/chat] error en pgvector RAG, cayendo a fallback BM25:", err);
      // Sigue al fallback.
    }
  }

  // ============================================================
  // PASO 2 — FALLBACK: BM25 sobre baseDocumental local.
  // Activo cuando pgvector no está configurado, falló, o no devolvió chunks.
  // ============================================================
  const match = buscar(pregunta);
  if (match) {
    return NextResponse.json({
      modo: "documento",
      respuesta: match.doc.texto,
      fuente: match.doc.fuente,
      url: match.doc.url,
      categoria: match.doc.categoria,
      confianza: Number(match.confianza.toFixed(2)),
      doc_id: match.doc.id,
      links: match.doc.modulo
        ? [{ label: "Ir al módulo", href: match.doc.modulo }]
        : []
    });
  }

  if (proveedor) {
    try {
      const respuesta = await consultarLlmConBM25Local(pregunta, proveedor);
      return NextResponse.json({
        modo: "ia",
        proveedor: proveedor.nombre,
        modelo: respuesta.modelo,
        respuesta: respuesta.texto,
        contexto_usado: respuesta.contextoIds
      });
    } catch (err) {
      console.error("[/api/v1/chat] error en LLM fallback:", err);
    }
  }

  // ============================================================
  // PASO 3 — FAQ legacy y mensaje final.
  // ============================================================
  const respDemo = buscarRespuestaDemo(pregunta);
  if (respDemo) {
    return NextResponse.json({
      modo: "demo",
      respuesta: respDemo.texto,
      fuente: respDemo.fuente,
      links: respDemo.links ?? []
    });
  }

  return NextResponse.json({
    modo: "sin_respuesta",
    respuesta:
      "No tengo información verificada para responder esa pregunta. Probá con palabras como " +
      "\"presupuesto\", \"contrataciones\", \"personal\", \"datos abiertos\" o consultá " +
      "directamente al municipio en sunchales.gob.ar.",
    links: [
      { label: "Sitio oficial", href: "https://sunchales.gob.ar" },
      { label: "Ver módulos", href: "/" }
    ]
  });
}

// ============================================================
// Helper: usar el LLM con chunks recuperados de pgvector como contexto.
// Reglas duras: cita obligatoria, prioridad de info vigente, no inventar,
// derivar al canal oficial cuando no hay datos. Mismas reglas que en el bot
// de WhatsApp para que ambos canales sean consistentes.
// ============================================================
async function consultarLlmConChunksPgvector(
  pregunta: string,
  proveedor: Proveedor,
  chunks: ChunkRecuperado[]
): Promise<{ texto: string; modelo: string }> {
  const contexto = formatearContexto(chunks);

  const systemPrompt =
    construirSystemPrompt("web") +
    "\n\nINSTRUCCIONES DE FORMATO DE RESPUESTA:\n" +
    "- Respondé en 2 a 5 oraciones, en español rioplatense, claro y útil.\n" +
    "- Empezá directamente con el dato; NO digas 'Según los documentos...'.\n" +
    "- Si la respuesta involucra una cifra, presentala con unidad y formato (ej: '$30.940 millones').\n" +
    "- Citá la fuente entre paréntesis al final, breve y legible (ej: '(Ord. 1872/2009)', '(Presupuesto 2026)', '(Padrón Municipal)').\n" +
    "- Si NO podés responder con los documentos provistos, decilo en una oración y derivá al canal oficial.\n\n" +
    "REGLAS DURAS — leer con cuidado:\n" +
    "1. Solo podés usar información presente en el [CONTEXTO RECUPERADO]. NO inventes cifras, fechas, nombres ni normativa.\n" +
    "2. Cada chunk tiene una etiqueta al inicio: [OFICIAL VIGENTE 2026 - tipo] o [HISTORICO - tipo]. " +
    "Los OFICIAL VIGENTE 2026 son SIEMPRE prioritarios sobre los HISTORICO cuando hablamos del presente. " +
    "Solo usás los HISTORICO cuando la pregunta pide explícitamente datos del pasado.\n" +
    "3. Para datos de remuneración: respetá la trazabilidad declarada en el chunk (verificado_oficial vs estimacion_referencial). " +
    "Si es estimación, aclaralo al ciudadano.\n\n" +
    `[CONTEXTO RECUPERADO]\n${contexto}\n[FIN DEL CONTEXTO]`;

  const salida = await proveedor.generar({
    systemPrompt,
    pregunta,
    maxTokens: 1200
  });
  return { texto: salida.texto, modelo: salida.modelo };
}

// ============================================================
// Helper legacy: BM25 sobre baseDocumental + LLM. Solo se usa cuando
// pgvector no está disponible. Mantiene el comportamiento histórico del
// endpoint para no degradarlo en entornos no-prod.
// ============================================================
async function consultarLlmConBM25Local(
  pregunta: string,
  proveedor: Proveedor
): Promise<{ texto: string; modelo: string; contextoIds: string[] }> {
  const top = topN(pregunta, 3);
  const contextoIds = top.map((t) => t.doc.id);

  let contextoTexto = "";
  if (top.length > 0) {
    contextoTexto =
      "\n\nDOCUMENTOS RELEVANTES DEL CORPUS (úsalos como única fuente de verdad — no inventes nada que no esté acá):\n" +
      top
        .map(
          (t, i) =>
            `\n[${i + 1}] ${t.doc.titulo}\n${t.doc.texto}\nFuente: ${t.doc.fuente}`
        )
        .join("\n");
  }

  const systemPrompt =
    construirSystemPrompt("web") +
    contextoTexto +
    "\n\nINSTRUCCIONES DE FORMATO DE RESPUESTA:\n" +
    "- Respondé en 2 a 5 oraciones máximo, en español rioplatense.\n" +
    "- Empezá directamente con el dato o la respuesta. NO digas 'Según los documentos...' ni 'Te informo que...'.\n" +
    "- Si la respuesta involucra una cifra, presentala con su unidad y formato (ej: '$30.940 millones', '23.416 habitantes').\n" +
    "- Si NO podés responder con los documentos provistos, decilo en una sola oración y derivá al canal oficial.";

  const salida = await proveedor.generar({
    systemPrompt,
    pregunta,
    maxTokens: 1200
  });
  return { texto: salida.texto, modelo: salida.modelo, contextoIds };
}
