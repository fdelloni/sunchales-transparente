/**
 * Handler de IA (fallback) — usa Claude para respuestas en lenguaje natural,
 * estrictamente sobre datos publicos del municipio que ya tenemos cargados.
 *
 * Reglas duras del system prompt:
 *   - solo informacion verificable / publicada
 *   - si no sabe la respuesta, lo dice y deriva al canal oficial
 *   - prohibido inventar cifras, nombres o normativa
 *
 * Si ANTHROPIC_API_KEY no esta seteada, devuelve un mensaje de fallback
 * que invita al usuario a usar el menu numerado.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { totales } from "@/lib/data/presupuesto";
import { empleados } from "@/lib/data/personal";

export const manejarIa: Handler = async (ctx) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      respuesta: { texto:
        "El modo IA todavía no está activo en esta instancia. Usá el menú numerado escribiendo *menú*, " +
        "o consultá con palabras clave como *presupuesto*, *intendente*, *trámites*."
      },
      nuevoEstado: { intentActivo: "ia" }
    };
  }

  try {
    const respuesta = await consultarClaude(ctx.entrada.body, apiKey);
    return { respuesta: { texto: respuesta }, nuevoEstado: { intentActivo: "ia" } };
  } catch (err) {
    console.error("[ia] error consultando Claude:", err);
    return {
      respuesta: { texto:
        "Tuve un problema técnico para generar la respuesta. Probá de nuevo en un momento, " +
        "o escribí *menú* para usar las opciones predefinidas."
      },
      nuevoEstado: { intentActivo: "ia" }
    };
  }
};

/**
 * Llama a la Messages API de Claude.
 * Usamos fetch directo (sin SDK) para no agregar dependencia.
 * Modelo: claude-haiku (rapido y barato; ideal para chatbot).
 */
async function consultarClaude(pregunta: string, apiKey: string): Promise<string> {
  const systemPrompt = construirSystemPrompt();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: pregunta }]
    })
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Claude API ${res.status}: ${errBody}`);
  }

  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
  const texto = data.content?.find((b) => b.type === "text")?.text ?? "";
  if (!texto) throw new Error("Claude devolvió respuesta vacía");

  // Cap por seguridad: WhatsApp acepta ~1600 chars; partimos limpio si es muy largo.
  return texto.length > 1500 ? texto.slice(0, 1497) + "..." : texto;
}

function construirSystemPrompt(): string {
  const funcionariosResumen = empleados
    .map((e) => `- ${e.cargo}: ${e.apellidoNombre} (${e.area})`)
    .join("\n");

  return (
    `Sos el asistente virtual oficial de la Municipalidad de Sunchales (Santa Fe, Argentina).\n` +
    `Respondé en español rioplatense, breve y claro. Máximo 6 líneas o 600 caracteres.\n\n` +
    `REGLAS DURAS — son inviolables:\n` +
    `1. SOLO usás información verificable que aparece a continuación. NO inventás cifras, nombres, fechas ni normativa.\n` +
    `2. Si no tenés la información, decilo de forma directa y derivá al sitio oficial sunchales.gob.ar o al teléfono del municipio.\n` +
    `3. NO das opiniones políticas. NO te metés en debates partidarios.\n` +
    `4. Cuando cites una cifra, mencioná brevemente la fuente.\n` +
    `5. Si la pregunta es de un trámite específico (TGI, licencia), decí lo general que sabés y aclará que conviene confirmar en el sitio oficial.\n` +
    `6. Si detectás un reclamo concreto (bache, luminaria), invitá al ciudadano a escribir *3* o *reclamo* para abrir el flujo formal.\n\n` +
    `DATOS DISPONIBLES (única fuente válida):\n` +
    `- Población: ${totales.habitantes.toLocaleString("es-AR")} habitantes (Censo INDEC 2022).\n` +
    `- Presupuesto Municipal 2026 — Gastos: $${totales.gastos_total.toLocaleString("es-AR")}.\n` +
    `- Presupuesto Municipal 2026 — Recursos: $${totales.recursos_corrientes.toLocaleString("es-AR")}.\n` +
    `- Fondo provincial Ley 12.385 recibido en 2026: $${totales.fondoLey12385_recibido.toLocaleString("es-AR")}.\n` +
    `- Gasto per cápita 2026: $${totales.gasto_per_capita.toLocaleString("es-AR")}.\n` +
    `- Sunchales es Capital Nacional del Cooperativismo (Ley Nacional 26.037, año 2005).\n` +
    `- Eje 2026: avance hacia AUTONOMÍA MUNICIPAL con Carta Orgánica propia.\n` +
    `- Marco normativo de transparencia: Ley Nac. 27.275, Decreto Pcial. SF 0692/2009, reforma constitucional Santa Fe 2025 (principio de máxima divulgación).\n\n` +
    `Funcionarios públicos cargados:\n${funcionariosResumen}\n\n` +
    `Si la pregunta no se puede contestar con esos datos, decilo y derivá al canal oficial.`
  );
}
