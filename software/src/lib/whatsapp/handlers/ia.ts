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
    // - poolInicial=30: traer un pool grande para que el reranking tenga
    //   suficiente material curado entre el ruido del Digesto/PDFs.
    // - topK=10: pasamos al modelo los 10 chunks mas relevantes despues
    //   del reranking (los curados con boost 1.4x quedan al frente).
    // - umbral=0.05: muy permisivo, dejamos que el reranking decida.
    const chunks = await recuperar(pregunta, {
      topK: 10,
      poolInicial: 50,
      umbral: 0.05
    });

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
      maxOutputTokens: 1500,
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
    `Respondes en español rioplatense, claro y util. Maximo 5-6 oraciones, ~700 caracteres para que entre en WhatsApp sin problema.\n\n` +
    `REGLAS — en orden de prioridad:\n` +
    `1. Tu mision es SER UTIL al ciudadano usando la información del [CONTEXTO RECUPERADO]. Si los chunks contienen info aunque sea parcialmente relevante, USALA. Solo decis "no tengo info" si verdaderamente NINGUNO de los chunks tiene nada relacionado.\n` +
    `2. NO inventes cifras, nombres, fechas o normativa que NO esten en el contexto. Pero SI podes combinar datos de varios chunks para armar una respuesta completa.\n` +
    `3. Cuando hay datos contradictorios entre chunks, preferi:\n` +
    `   a) datos mas recientes (ej: Censo 2022 sobre Plan Base 2014).\n` +
    `   b) chunks de tipo "presupuesto", "funcionario" o "normativa-marco" sobre menciones tangenciales en PDFs del Concejo.\n` +
    `   c) datos verificados oficialmente sobre estimaciones referenciales.\n` +
    `4. Citas la fuente entre parentesis al final, breve y legible. Ejemplos buenos: "(Ord. 1872/2009)", "(Presupuesto 2026)", "(Censo INDEC 2022)", "(Padrón Municipal)". NO uses la pregunta como cita.\n` +
    `5. Si la pregunta es claramente fuera de scope municipal (deportes, clima, opinion politica partidaria), decis amablemente que ese tipo de info no esta en tus datos y derivas al canal correspondiente.\n` +
    `6. Si detectas un reclamo concreto del ciudadano (bache, luminaria, recoleccion), invitas a escribir *reclamo* para abrir el flujo formal.\n` +
    `7. Tono profesional pero cordial, sin formalismos burocraticos.\n\n` +
    `[CONTEXTO RECUPERADO]\n${contexto}\n[FIN DEL CONTEXTO]`
  );
}

function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  return texto.slice(0, max - 3) + "...";
}
