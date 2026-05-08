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
// por el equipo del proyecto. Estos chunks tienen prioridad GARANTIZADA en el
// resultado final: si aparecen en el pool inicial, llegan al topK aunque
// su similitud bruta sea menor que PDFs largos del Concejo.
const TIPOS_CURADOS = new Set([
  "presupuesto",
  "funcionario",
  "faq",
  "normativa-marco"
]);
// Cuantos chunks curados incluir como minimo en el resultado final.
// Si hay menos curados en el pool, se incluyen todos los que haya.
const MIN_CURADOS_TOP = 5;

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

  // Mapear chunks crudos del pool inicial.
  const todos: ChunkRecuperado[] = filas.map((row) => ({
    id: String(row.id ?? ""),
    fuenteTipo: String(row.fuente_tipo ?? ""),
    fuenteId: String(row.fuente_id ?? ""),
    fuenteTitulo: String(row.fuente_titulo ?? ""),
    fuenteUrl: (row.fuente_url as string | null) ?? null,
    fuenteFecha: (row.fuente_fecha as string | null) ?? null,
    texto: String(row.texto ?? ""),
    metadata: (row.metadata as Record<string, unknown>) ?? {},
    similarity: Number(row.similarity ?? 0)
  }));

  // Estratificar: separar curados (informacion oficial actualizada) de
  // no-curados (PDFs historicos del Concejo, normas del Digesto). Garantizamos
  // que si hay curados en el pool, lleguen al topK final aunque su similitud
  // bruta sea menor.
  const curados = todos
    .filter((c) => TIPOS_CURADOS.has(c.fuenteTipo))
    .sort((a, b) => b.similarity - a.similarity);

  const noCurados = todos
    .filter((c) => !TIPOS_CURADOS.has(c.fuenteTipo))
    .sort((a, b) => b.similarity - a.similarity);

  // Reservar al menos MIN_CURADOS_TOP slots para curados (o todos los que haya).
  const tomarCurados = Math.min(curados.length, MIN_CURADOS_TOP);
  const tomarNoCurados = Math.max(0, topK - tomarCurados);

  // Mezclar: primero los curados (mas relevantes para info oficial), despues
  // los no-curados como contexto adicional.
  return [
    ...curados.slice(0, tomarCurados),
    ...noCurados.slice(0, tomarNoCurados)
  ];
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
