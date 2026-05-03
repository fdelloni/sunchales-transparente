/**
 * POST /api/v1/chat — Endpoint del Asistente Ciudadano (arquitectura híbrida).
 *
 * Pipeline (de más barato a más caro):
 *
 *   1. RAG LOCAL (BM25 sobre baseDocumental) — gratis, sin LLM.
 *      Si la búsqueda devuelve un documento con score >= umbral, respondemos
 *      con la cita textual del doc + su fuente. Ahí termina la consulta.
 *
 *   2. LLM (proveedor configurado: Gemini 2.5 Flash o Claude Haiku 4.5)
 *      Si el RAG no alcanza, llamamos al LLM con TOP-3 documentos del corpus
 *      como contexto. El system prompt obliga al modelo a:
 *        - usar SOLO el contexto provisto + datos del system prompt;
 *        - NO inventar; si no sabe, decirlo y derivar al canal oficial.
 *
 *   3. FAQ LOCAL (modo legacy, fallback final).
 *      Si tampoco hay LLM (ninguna API key configurada) o el LLM falla,
 *      caemos al matcher de FAQs local.
 *
 * Diseñado para ser barato:
 *   - 70-90% de las consultas resueltas en (1) sin tocar IA → 0 USD.
 *   - max_tokens = 400 cuando se usa LLM.
 *   - Rate-limit por IP (12/min).
 *   - Sin persistencia de preguntas/respuestas (privacidad por diseño).
 */

import { NextResponse, type NextRequest } from "next/server";
import { construirSystemPrompt } from "@/lib/chat/systemPrompt";
import { buscarRespuestaDemo, preguntasSugeridas } from "@/lib/chat/faqLocal";
import { buscar, topN } from "@/lib/chat/buscador";
import { chequearGuardrails } from "@/lib/chat/guardrails";
import { obtenerProveedor, type Proveedor } from "@/lib/chat/proveedores";

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
  return NextResponse.json({
    modo: proveedor ? "ia" : "rag",
    proveedor: proveedor?.nombre ?? null,
    modelo: proveedor?.modeloPorDefecto ?? null,
    sugeridas: preguntasSugeridas(),
    aviso: proveedor
      ? `Asistente híbrido. Primero busca en la base documental verificada (gratis); si no encuentra respuesta, consulta a ${proveedor.nombre === "google" ? "Gemini 2.5 Flash" : "Claude Haiku"}.`
      : "Modo RAG sin LLM: respuestas pregrabadas desde la base documental verificada. Configurá GOOGLE_API_KEY o ANTHROPIC_API_KEY para habilitar IA generativa como techo."
  });
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
  // PASO 0 — GUARDRAILS: detectar intenciones que NO debemos resolver
  // (opinión personal, consejo legal/médico, predicciones).
  // Esto va ANTES del RAG porque el buscador BM25 hace match por
  // keywords y "intendente" en "qué opinás del intendente" gana score.
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

  // ============================================================
  // PASO 1 — RAG LOCAL: buscar en la base documental verificada.
  // Si hay match con confianza alta, respondemos sin IA.
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

  // ============================================================
  // PASO 2 — LLM con contexto RAG (si hay proveedor configurado).
  // ============================================================
  const proveedor = obtenerProveedor();
  if (proveedor) {
    try {
      const respuesta = await consultarLlmConContexto(pregunta, proveedor);
      return NextResponse.json({
        modo: "ia",
        proveedor: proveedor.nombre,
        modelo: respuesta.modelo,
        respuesta: respuesta.texto,
        contexto_usado: respuesta.contextoIds
      });
    } catch (err) {
      console.error("[/api/v1/chat] error en LLM:", err);
      // No corto: caigo al paso 3 como fallback amigable.
    }
  }

  // ============================================================
  // PASO 3 — FAQ legacy y fallback final.
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
// Helper: arma el contexto RAG y llama al proveedor de LLM.
// ============================================================
async function consultarLlmConContexto(
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

  // IMPORTANTE: Gemini 2.5 Flash incluye "thinking tokens" internos dentro
  // del límite de output. Con 400 tokens, el modelo "piensa" y se queda sin
  // espacio para escribir la respuesta completa (se corta a media oración).
  // Subimos a 1200 para garantizar que la respuesta visible llegue completa,
  // y agregamos una instrucción explícita de concisión al system prompt.
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
