/**
 * Handler de IA — pipeline conversacional principal del bot.
 *
 * Toda pregunta natural del ciudadano pasa por aca. El bot es 100% conversacional;
 * no hay menu numerado.
 *
 * Pipeline:
 *   1. Recibe la pregunta del ciudadano en lenguaje natural.
 *   2. Recupera top-K chunks relevantes con RAG (Supabase pgvector + Gemini embeddings).
 *   3. Construye prompt con reglas duras + chunks + pregunta.
 *   4. Genera respuesta con Gemini 2.5 Flash.
 *   5. Devuelve respuesta + cita de fuente al ciudadano.
 *
 * Reglas duras (system prompt):
 *   - Solo responder con informacion presente en los chunks recuperados.
 *   - Si no hay informacion suficiente, decirlo y derivar al canal oficial.
 *   - Nunca inventar cifras, nombres, normativa o fechas.
 *   - Respuestas concisas (~3-4 oraciones), max 600 caracteres.
 *   - Citar la fuente al final.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { recuperar, formatearContexto, type ChunkRecuperado } from "@/lib/rag/retriever";
import { generar } from "@/lib/rag/gemini";

export const manejarIa: Handler = async (ctx) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      respuesta: { texto:
        "El motor de IA no está disponible temporalmente. Por favor probá de nuevo en unos minutos, " +
        "o consultá directamente en sunchales.gob.ar."
      },
      nuevoEstado: { intentActivo: "ia" }
    };
  }

  const pregunta = ctx.entrada.body.trim();

  try {
    // 1. RAG: recuperar contexto
    // Umbral bajo (0.1) para asegurar contexto disponible cuando hay afinidad
    // temática. La calidad la garantiza Gemini con las reglas duras del prompt:
    // si los chunks no responden la pregunta, el modelo lo dice y deriva.
    const chunks = await recuperar(pregunta, { topK: 6, umbral: 0.1 });

    if (chunks.length === 0) {
      return {
        respuesta: { texto:
          "No encuentro información verificable sobre eso en los datos públicos cargados. " +
          "Probá reformulando tu pregunta o consultá en sunchales.gob.ar. " +
          "Si querés abrir un reclamo (bache, luminaria, recolección), escribí *reclamo*."
        },
        nuevoEstado: { intentActivo: "ia" }
      };
    }

    // 2. Generar respuesta con Gemini
    const systemInstruction = construirSystemInstruction(chunks);
    const respuestaCruda = await generar(pregunta, {
      systemInstruction,
      maxOutputTokens: 500,
      temperatura: 0.2
    });

    // 3. Cap por seguridad para WhatsApp (~1500 chars)
    const respuesta = recortar(respuestaCruda, 1500);

    return {
      respuesta: { texto: respuesta },
      nuevoEstado: { intentActivo: "ia" }
    };
  } catch (err) {
    console.error("[ia] error en pipeline RAG:", err);
    return {
      respuesta: { texto:
        "Tuve un problema técnico generando la respuesta. Probá de nuevo en un momento. " +
        "Si el problema persiste, consultá directamente en sunchales.gob.ar."
      },
      nuevoEstado: { intentActivo: "ia" }
    };
  }
};

// ====================== helpers ======================

function construirSystemInstruction(chunks: ChunkRecuperado[]): string {
  const contexto = formatearContexto(chunks);

  return (
    `Sos el asistente virtual oficial de la Municipalidad de Sunchales (Santa Fe, Argentina).\n` +
    `Respondes en español rioplatense, breve y claro. Maximo 4 oraciones o 500 caracteres.\n\n` +
    `REGLAS DURAS — son inviolables:\n` +
    `1. Solo respondes con informacion contenida en el bloque [CONTEXTO RECUPERADO] de abajo. NO inventes cifras, nombres, fechas ni normativa.\n` +
    `2. Si la pregunta no se puede contestar con el contexto, lo decis directamente y derivas a sunchales.gob.ar. NO confabules.\n` +
    `3. Citas la fuente entre parentesis al final, usando el titulo de la FUENTE relevante (ej: "(Ord. 1872/2009)" o "(Padron Municipal)").\n` +
    `4. NO opines sobre temas politicos partidarios. Solo das hechos verificables del contexto.\n` +
    `5. Si detectas un reclamo concreto del ciudadano (bache, luminaria), invitas a escribir *reclamo* para abrir el flujo formal.\n` +
    `6. Tono profesional y cordial, sin formalismos excesivos.\n\n` +
    `[CONTEXTO RECUPERADO]\n${contexto}\n[FIN DEL CONTEXTO]\n\n` +
    `Si el contexto contradice la pregunta o es insuficiente, decilo. NO completes con conocimiento general.`
  );
}

function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  return texto.slice(0, max - 3) + "...";
}
