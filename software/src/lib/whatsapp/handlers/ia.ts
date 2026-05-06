/**
 * Handler de IA (fallback / opcion 4 del menu).
 *
 * Pipeline:
 *   1. Recibe la pregunta del ciudadano.
 *   2. Recupera top-5 chunks relevantes con RAG (Supabase pgvector + Gemini embeddings).
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
 *
 * Si GOOGLE_API_KEY no esta configurada, devuelve mensaje de fallback.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { recuperar, formatearContexto, type ChunkRecuperado } from "@/lib/rag/retriever";
import { generar } from "@/lib/rag/gemini";

export const manejarIa: Handler = async (ctx) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      respuesta: { texto:
        "El modo IA todavia no esta activo en esta instancia. Usa el menu numerado escribiendo *menu*, " +
        "o consulta con palabras clave como *presupuesto*, *intendente*, *tramites*."
      },
      nuevoEstado: { intentActivo: "ia" }
    };
  }

  const pregunta = ctx.entrada.body.trim();

  try {
    // 1. RAG: recuperar contexto
    const chunks = await recuperar(pregunta, { topK: 5, umbral: 0.4 });

    if (chunks.length === 0) {
      return {
        respuesta: { texto:
          "No encuentro informacion verificable sobre eso en los datos publicos cargados. " +
          "Puedo ayudarte con consultas sobre presupuesto, normativa del Digesto, padron de funcionarios, " +
          "obra publica o tramites comunes. Tambien podes consultar en sunchales.gob.ar o escribir *menu*."
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
        "Tuve un problema tecnico generando la respuesta. Probá de nuevo en un momento, " +
        "o escribi *menu* para usar las opciones predefinidas."
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
    `2. Si la pregunta no se puede contestar con el contexto, lo decis directamente y derivas a sunchales.gob.ar o al *menu* del bot. NO confabules.\n` +
    `3. Citas la fuente entre parentesis al final, usando el titulo de la FUENTE relevante (ej: "(Ord. 1872/2009)" o "(Padron Municipal)").\n` +
    `4. NO opines sobre temas politicos partidarios. Solo das hechos verificables del contexto.\n` +
    `5. Si detectas un reclamo concreto del ciudadano (bache, luminaria), invitas a escribir *3* o *reclamo* para abrir el flujo formal.\n` +
    `6. Tono profesional y cordial, sin formalismos excesivos.\n\n` +
    `[CONTEXTO RECUPERADO]\n${contexto}\n[FIN DEL CONTEXTO]\n\n` +
    `Si el contexto contradice la pregunta o es insuficiente, decilo. NO completes con conocimiento general.`
  );
}

function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  return texto.slice(0, max - 3) + "...";
}
