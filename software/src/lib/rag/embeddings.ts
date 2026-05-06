/**
 * Cliente de embeddings de Gemini.
 *
 * Modelo: text-embedding-004 (768 dimensiones, multilingue, gratis hasta
 *         1500 req/min en free tier).
 *
 * Documentacion oficial:
 *   https://ai.google.dev/gemini-api/docs/embeddings
 *
 * Usamos fetch directo en vez del SDK @google/generative-ai para mantener
 * el bundle chico y porque la API REST es estable y bien documentada.
 */

const ENDPOINT_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODELO = "text-embedding-004";
const DIMENSIONES = 768;

export type TaskType =
  | "RETRIEVAL_QUERY"      // para embeddings de PREGUNTAS de usuario
  | "RETRIEVAL_DOCUMENT"   // para embeddings de DOCUMENTOS al indexar
  | "SEMANTIC_SIMILARITY"
  | "CLASSIFICATION"
  | "CLUSTERING";

/**
 * Embeddea un solo texto. Lanza error si la API falla o devuelve vector
 * de dimensiones inesperadas.
 */
export async function embeddearTexto(
  texto: string,
  taskType: TaskType = "RETRIEVAL_QUERY",
  apiKey?: string
): Promise<number[]> {
  const key = apiKey ?? process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("GOOGLE_API_KEY no configurada");

  const url = `${ENDPOINT_BASE}/${MODELO}:embedContent?key=${key}`;
  const body = {
    model: `models/${MODELO}`,
    content: { parts: [{ text: truncar(texto) }] },
    taskType
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini embeddings ${res.status}: ${txt}`);
  }

  const data = (await res.json()) as { embedding?: { values: number[] } };
  const vector = data.embedding?.values;
  if (!vector || vector.length !== DIMENSIONES) {
    throw new Error(
      `Embedding invalido: esperaba ${DIMENSIONES} dim, llegaron ${vector?.length ?? 0}`
    );
  }
  return vector;
}

/**
 * Embeddea muchos textos en serie con manejo de rate limit.
 * Usado por el indexer (no por el runtime del chatbot).
 *
 * @param textos      array de textos a embeddear
 * @param onProgreso  callback para reportar avance (i, total)
 * @param msEntre     pausa entre requests (default 100ms = 600 req/min, debajo del limite free)
 */
export async function embeddearMuchos(
  textos: string[],
  taskType: TaskType = "RETRIEVAL_DOCUMENT",
  onProgreso?: (i: number, total: number) => void,
  msEntre: number = 100
): Promise<number[][]> {
  const out: number[][] = [];
  for (let i = 0; i < textos.length; i++) {
    const v = await embeddearTexto(textos[i], taskType);
    out.push(v);
    if (onProgreso) onProgreso(i + 1, textos.length);
    if (i < textos.length - 1 && msEntre > 0) {
      await new Promise((r) => setTimeout(r, msEntre));
    }
  }
  return out;
}

/**
 * Gemini embeddings tiene limite de ~2048 tokens (~8000 caracteres) por input.
 * Si el chunk es muy largo, lo recortamos antes de embeddear.
 */
function truncar(texto: string, maxChars: number = 7500): string {
  if (texto.length <= maxChars) return texto;
  return texto.slice(0, maxChars);
}

export const EMBED_DIMS = DIMENSIONES;
export const EMBED_MODELO = MODELO;
