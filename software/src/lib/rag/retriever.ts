/**
 * Retriever del sistema RAG.
 *
 * Dada una pregunta del usuario:
 *   1. Embeddea la pregunta con Gemini text-embedding-004 (taskType=RETRIEVAL_QUERY).
 *   2. Llama a la funcion RPC `match_chunks_rag` de Supabase, que retorna
 *      los top-K chunks mas similares por distancia coseno.
 *   3. Devuelve los chunks recuperados con su score de similitud.
 *
 * Si Supabase no esta disponible o la API key falta, devuelve array vacio
 * (el handler IA tiene fallback para cuando no hay contexto).
 */

import { embeddearTexto } from "@/lib/rag/embeddings";
import { supabase } from "@/lib/supabase";

export type ChunkRecuperado = {
  id: string;
  fuenteTipo: string;
  fuenteId: string;
  fuenteTitulo: string;
  fuenteUrl: string | null;
  fuenteFecha: string | null;
  texto: string;
  metadata: Record<string, unknown>;
  similarity: number;
};

export type OpcionesRecuperacion = {
  /** cuantos chunks devolver despues del reranking (default 8) */
  topK?: number;
  /** cuantos chunks pedir a Supabase ANTES del reranking (default 25) */
  poolInicial?: number;
  /** filtrar por tipo de fuente (digesto, funcionario, etc.) */
  filtroTipo?: string;
  /** umbral minimo de similitud (0..1). default 0.05 */
  umbral?: number;
};

// Tipos de fuente "curados" — informacion verificada y actualizada manualmente
// por el equipo del proyecto. Reciben boost de relevancia sobre PDFs del Concejo
// y normas del Digesto para evitar que chunks viejos opaquen datos actuales.
const TIPOS_CURADOS = new Set([
  "presupuesto",
  "funcionario",
  "faq",
  "normativa-marco"
]);
const BOOST_CURADO = 1.4; // multiplicador de similitud para tipos curados

export async function recuperar(
  pregunta: string,
  opts: OpcionesRecuperacion = {}
): Promise<ChunkRecuperado[]> {
  if (!supabase) {
    console.warn("[rag] Supabase no configurado; retriever devuelve vacio");
    return [];
  }

  let embedding: number[];
  try {
    embedding = await embeddearTexto(pregunta, "RETRIEVAL_QUERY");
  } catch (err) {
    console.error("[rag] error embeddeando query:", err);
    return [];
  }

  const topK = opts.topK ?? 8;
  const poolInicial = opts.poolInicial ?? 25;

  const { data, error } = await supabase.rpc("match_chunks_rag", {
    query_embedding: embedding,
    match_count: poolInicial,
    filter_tipo: opts.filtroTipo ?? null,
    threshold: opts.umbral ?? 0.05
  });

  if (error) {
    console.error("[rag] error en match_chunks_rag:", error);
    return [];
  }

  if (!Array.isArray(data)) return [];
  const filas = data as Array<Record<string, unknown>>;

  // Mapear y aplicar boost a tipos curados, despues reordenar y devolver topK.
  const chunks = filas.map((row) => {
    const tipo = String(row.fuente_tipo ?? "");
    const simBase = Number(row.similarity ?? 0);
    const simBoosted = TIPOS_CURADOS.has(tipo) ? simBase * BOOST_CURADO : simBase;
    return {
      id: String(row.id ?? ""),
      fuenteTipo: tipo,
      fuenteId: String(row.fuente_id ?? ""),
      fuenteTitulo: String(row.fuente_titulo ?? ""),
      fuenteUrl: (row.fuente_url as string | null) ?? null,
      fuenteFecha: (row.fuente_fecha as string | null) ?? null,
      texto: String(row.texto ?? ""),
      metadata: (row.metadata as Record<string, unknown>) ?? {},
      similarity: simBoosted
    };
  });

  chunks.sort((a, b) => b.similarity - a.similarity);
  return chunks.slice(0, topK);
}

/**
 * Construye un bloque de texto con los chunks recuperados, formateado
 * para insertarse en el system prompt del LLM. Cada chunk incluye su
 * titulo de fuente para que el modelo pueda citar.
 */
export function formatearContexto(chunks: ChunkRecuperado[]): string {
  if (chunks.length === 0) return "(sin contexto recuperado)";

  return chunks
    .map((c, i) => {
      const url = c.fuenteUrl ? ` <${c.fuenteUrl}>` : "";
      const fecha = c.fuenteFecha ? ` (${c.fuenteFecha})` : "";
      return `[FUENTE ${i + 1}] ${c.fuenteTitulo}${fecha}${url}\n${c.texto.trim()}`;
    })
    .join("\n\n---\n\n");
}
