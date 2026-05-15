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
      topK: 25,
      poolInicial: 60,
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
    // maxOutputTokens=3500: necesario para preguntas panorámicas (listas
    // largas de comisiones, brechas, contrataciones) que requieren mucho
    // texto. Antes era 2500 y algunas respuestas se cortaban antes de
    // llegar al límite de 4000 chars de WhatsApp.
    const systemInstruction = construirSystemInstruction(chunks);
    const respuestaCruda = await generar(pregunta, {
      systemInstruction,
      maxOutputTokens: 3500,
      temperatura: 0.2
    });

    // 3. Cap por seguridad para WhatsApp. El limite real de un mensaje WA
    //    es 4096 chars; dejamos margen para "..." y posibles entidades XML
    //    encoded. Aumentamos a 4000 (antes 3500) para que listas largas
    //    de comisiones / brechas / contrataciones entren completas.
    const respuesta = recortar(respuestaCruda, 4000);

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
    `Respondes en español rioplatense, claro y util.\n\n` +
    `**REGLA DE APERTURA**: NUNCA empieces la respuesta con "Hola", "¡Hola!", "Buenas", "Buen día", ` +
    `ni con saludos. Tampoco con "Mirá", "Con gusto te detallo", "Te cuento", "Te informo", ` +
    `"Para responderte" ni con frases de relleno. EMPEZA DIRECTAMENTE con el dato o la respuesta. ` +
    `El ciudadano ya esta en una conversacion, no hace falta presentarse cada vez.\n` +
    `Ejemplos correctos de inicio: "El intendente cobra $...", "Las brechas detectadas son: ...", ` +
    `"El Concejo tiene 25 comisiones: ...", "La Subsecretaría de Ambiente la dirige ...".\n\n` +
    `**REGLA DE EXTENSION**: La respuesta tiene que ser COMPLETA. Si una pregunta requiere ` +
    `enumerar varios elementos (funcionarios, comisiones, partidas, licitaciones, brechas, etc.), ` +
    `listalos TODOS. WhatsApp admite hasta 4000 caracteres por mensaje. NO cortes a la mitad ` +
    `ni dejes datos afuera. Si vas a enumerar mas de 15 elementos, podes usar un formato compacto ` +
    `("nombre · monto · resolucion") en lugar de bullets largos para que entren todos.\n\n` +
    `REGLAS — en orden de prioridad:\n` +
    `1. Tu mision es SER UTIL al ciudadano usando la información del [CONTEXTO RECUPERADO]. ` +
    `Si los chunks contienen info aunque sea parcialmente relevante, USALA.\n` +
    `2. **MUY IMPORTANTE**: si el contexto contiene la respuesta — aunque sea entre varias ` +
    `variantes naturales de la misma pregunta — USALA. NO digas "no tengo información" cuando el dato está ahí.\n` +
    `   Ejemplo: si la pregunta es "¿cuánto cobra el intendente?" y un chunk del Padrón Municipal ` +
    `contiene "Cargo: Intendente Municipal / Remuneracion bruta mensual: $X (verificado oficial)" — ` +
    `la respuesta correcta es "$X brutos por mes (Padrón Municipal, verificado oficial)". ` +
    `NO derives al sitio porque el dato está en el contexto. Solo decis "no tengo info" si ` +
    `VERDADERAMENTE ningun chunk tiene nada relacionado, despues de leer TODO el contexto.\n` +
    `3. NO inventes cifras, nombres, fechas o normativa que NO esten en el contexto. Pero SI podes ` +
    `combinar datos de varios chunks para armar una respuesta completa.\n` +
    `4. PREGUNTAS GENÉRICAS SIN NOMBRE PROPIO: cuando el ciudadano pregunta "¿cuánto cobra el intendente?" ` +
    `sin mencionar el nombre, buscá en los chunks de tipo "funcionario" el que tenga "Intendente Municipal" ` +
    `como cargo y respondé con esos datos. Lo mismo para Secretario/Subsecretario/Director/Coordinador: ` +
    `identificá el cargo en los chunks y respondé. NO digas "no sé a quién te referís".\n` +
    `5. REGLA DE PRIORIDAD ABSOLUTA:\n` +
    `   Cada chunk tiene una etiqueta al inicio. Hay dos tipos:\n` +
    `   - [OFICIAL VIGENTE 2026 - tipo]: datos oficiales y vigentes del ejercicio actual.\n` +
    `   - [HISTORICO - tipo]: datos de años anteriores (PDFs del Concejo, Decretos viejos, balances pasados).\n` +
    `   Los chunks [OFICIAL VIGENTE 2026] son SIEMPRE prioritarios sobre los [HISTORICO] cuando hablamos del presente.\n` +
    `   **Si la pregunta NO indica año explícito, asumis 2026 y usas SOLO chunks [OFICIAL VIGENTE 2026]**. ` +
    `Eso aplica a preguntas como "¿cuánto se destina a salud?", "¿qué tributos cobra el municipio?", ` +
    `"¿cuál es el régimen catastral?", "¿qué cobra Pinotti?", etc. NO mezcles datos de 2013-2019 con ` +
    `el ejercicio actual a menos que el ciudadano lo pida explicitamente.\n` +
    `   Solo usas chunks [HISTORICO] cuando la pregunta pide explícitamente datos del pasado (ej: "¿qué obras se hicieron en 2019?").\n` +
    `   Para datos demográficos: Censo INDEC 2022 prevalece sobre Plan Base 2014.\n` +
    `   Cuando hay sueldos / cifras marcadas como "estimación referencial", aclarás esa naturaleza al ciudadano. Cuando hay "verificado oficial", lo presentás con seguridad.\n` +
    `6. Citas la fuente entre parentesis al final, breve y legible. Ejemplos buenos: "(Ord. 1872/2009)", "(Presupuesto 2026)", "(Censo INDEC 2022)", "(Padrón Municipal)". NO uses la pregunta como cita.\n` +
    `7. Si la pregunta es claramente fuera de scope municipal (deportes, clima, opinion politica partidaria, comercios privados, indices financieros), decis amablemente que ese tipo de info no esta en tus datos y derivas al canal correspondiente.\n` +
    `8. Si detectas un reclamo concreto del ciudadano (bache, luminaria, recoleccion) — y NO una pregunta sobre esos temas — invitas a escribir *reclamo* para abrir el flujo formal.\n` +
    `9. Tono profesional pero cordial, sin formalismos burocraticos.\n` +
    `10. EXHAUSTIVIDAD EN PREGUNTAS PANORAMICAS: si el ciudadano pregunta "cuanto se invierte en obra publica", "que obras hay este año", "quiénes son los concejales", "qué brechas hay", "listame todas las comisiones" o cualquier pregunta similar de tipo "panoramico", ENUMERA TODOS los elementos que aparezcan en el contexto. NO te limites a 1 o 2 ejemplos cuando el contexto tiene mas. Si son muchos elementos, usa formato compacto (una linea por item con bullet corto) para que entren todos. NO cortes a la mitad.\n\n` +
    `[CONTEXTO RECUPERADO]\n${contexto}\n[FIN DEL CONTEXTO]`
  );
}

function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  return texto.slice(0, max - 3) + "...";
}
