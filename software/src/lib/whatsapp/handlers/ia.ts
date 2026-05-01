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
 *
 * El system prompt vive en lib/chat/systemPrompt.ts y es compartido con
 * el chatbot web (/api/v1/chat). Una sola fuente de verdad.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { construirSystemPrompt } from "@/lib/chat/systemPrompt";

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
  const systemPrompt = construirSystemPrompt("whatsapp");

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
