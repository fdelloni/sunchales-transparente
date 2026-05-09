/**
 * Retriever del sistema RAG con HYBRID SEARCH.
 *
 * Combina dos estrategias:
 *   1. Vector search (semantica): embedding de la pregunta + similarity
 *      coseno contra todos los chunks. Bueno para preguntas conceptuales.
 *   2. Keyword search (literal): si la pregunta contiene siglas (TGI),
 *      numeros de norma (1872/2009), nombres propios (Pinotti) o años
 *      (2026), buscamos chunks de tipos curados que contengan ese texto
 *      literal. Bueno para preguntas con terminos especificos.
 *
 * Los resultados de keyword search van al frente del topK (alta prioridad).
 * Despues, los chunks vectoriales pasan por reranking estratificado para
 * garantizar que haya diversidad de tipos curados.
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
  topK?: number;
  poolInicial?: number;
  filtroTipo?: string;
  umbral?: number;
};

const TIPOS_CURADOS = ["presupuesto", "funcionario", "faq", "normativa-marco"];
const TIPOS_CURADOS_SET = new Set(TIPOS_CURADOS);

const MIN_CURADOS_TOP = 4;
const MAX_KEYWORD_HITS = 12;

export async function recuperar(
  pregunta: string,
  opts: OpcionesRecuperacion = {}
): Promise<ChunkRecuperado[]> {
  if (!supabase) {
    console.warn("[rag] Supabase no configurado; retriever devuelve vacio");
    return [];
  }

  const topK = opts.topK ?? 8;
  const poolInicial = opts.poolInicial ?? 30;

  // Lanzar las dos busquedas EN PARALELO para minimizar latencia.
  const [vectorChunks, keywordChunks] = await Promise.all([
    busquedaVectorial(pregunta, poolInicial, opts),
    busquedaPorPalabrasClave(pregunta, MAX_KEYWORD_HITS)
  ]);

  // Deduplicar: si un chunk aparece en ambas busquedas, prevalece su version
  // de keyword (con similarity boosteada).
  const idsKeyword = new Set(keywordChunks.map((c) => c.id));
  const vectorSinDup = vectorChunks.filter((c) => !idsKeyword.has(c.id));

  // Reranking estratificado del lado vectorial: garantizar curados.
  const vectorEstratificado = estratificar(vectorSinDup, topK - keywordChunks.length);

  // Resultado final: keyword chunks PRIMERO (mas prioridad), despues vectoriales.
  return [...keywordChunks, ...vectorEstratificado].slice(0, topK);
}

// ====================== Busqueda vectorial ======================

async function busquedaVectorial(
  pregunta: string,
  poolInicial: number,
  opts: OpcionesRecuperacion
): Promise<ChunkRecuperado[]> {
  if (!supabase) return [];

  let embedding: number[];
  try {
    embedding = await embeddearTexto(pregunta, "RETRIEVAL_QUERY");
  } catch (err) {
    console.error("[rag] error embeddeando query:", err);
    return [];
  }

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

  return (data as Array<Record<string, unknown>>).map(mapearChunk);
}

// ====================== Busqueda por keywords ======================

async function busquedaPorPalabrasClave(
  pregunta: string,
  limit: number
): Promise<ChunkRecuperado[]> {
  if (!supabase) return [];

  const palabras = extraerPalabrasClave(pregunta);
  if (palabras.length === 0) return [];

  const tiposPreferidos = detectarTiposObjetivo(pregunta);

  // Sintaxis Supabase: .or("texto.ilike.%p1%,texto.ilike.%p2%")
  // Generar variantes con y sin tildes para que ILIKE matchee ambas formas
  // ("Gestión" en query vs "Gestion" en chunk indexado).
  const palabrasExpandidas = expandirVariantes(palabras);

  const orClause = palabrasExpandidas
    .map((p) => `texto.ilike.%${escaparILike(p)}%`)
    .join(",");

  // Lanzar UNA query por cada tipo curado, en paralelo. Limit alto por tipo
  // para garantizar que todos los chunks relevantes llegen — despues
  // dedupeamos y aplicamos el limit total al final.
  const limitPorTipo = 8;

  const consultas = TIPOS_CURADOS.map((tipo) =>
    supabase!
      .from("chunks_rag")
      .select("*")
      .eq("fuente_tipo", tipo)
      .or(orClause)
      .limit(limitPorTipo)
  );

  const resultados = await Promise.all(consultas);

  // Recolectar todos los hits con marca de "preferido" segun el tipo de pregunta.
  type Row = Record<string, unknown>;
  const hits: Array<{ row: Row; preferido: boolean }> = [];

  for (let i = 0; i < resultados.length; i++) {
    const r = resultados[i];
    if (r.error) {
      console.warn(`[rag] keyword search fallo para tipo ${TIPOS_CURADOS[i]}:`, r.error);
      continue;
    }
    if (!Array.isArray(r.data)) continue;
    const esPreferido = tiposPreferidos.includes(TIPOS_CURADOS[i]);
    for (const row of r.data as Row[]) {
      hits.push({ row, preferido: esPreferido });
    }
  }

  // Ordenar: preferidos primero (sin importar el orden interno por tipo).
  hits.sort((a, b) => Number(b.preferido) - Number(a.preferido));

  // Dedupe por id y aplicar limit.
  const yaVistos = new Set<string>();
  const final: ChunkRecuperado[] = [];
  for (const { row, preferido } of hits) {
    const id = String(row.id ?? "");
    if (!id || yaVistos.has(id)) continue;
    yaVistos.add(id);
    final.push({
      ...mapearChunk(row),
      // Similarity sintetica: tipos preferidos = 0.97, otros curados = 0.92
      similarity: preferido ? 0.97 : 0.92
    });
    if (final.length >= limit) break;
  }

  return final;
}

/**
 * Heuristica para detectar que tipo(s) de fuente curada es mas probable que
 * responda la pregunta. Devuelve array vacio si no hay señal clara.
 */
function detectarTiposObjetivo(pregunta: string): string[] {
  const norm = pregunta.toLowerCase();
  const tipos: string[] = [];

  if (/(presupuesto|gasto|gasta|gastos|recurso|partida|partidas|invierte|invertir|inversi[oó]n|mill[oó]n|millones|presupuestad|ejecuci[oó]n|obra|obras|infraestructura|pavimento|iluminaci[oó]n|construcci[oó]n|girsu|ferroviario|salud|educaci[oó]n|ambiente|vivienda|cultura|seguridad|transito|tr[aá]nsito|producci[oó]n|cooperativismo)/.test(norm)) {
    tipos.push("presupuesto");
  }
  if (/(intendente|secretari|subsecretari|funcionari|empleado|cargo|sueldo|salari|remunera|gana|cobra|gabinete|organigrama|planta|pinotti|martinez|girard|gabiani|diaz|grande|ghiano|prados)/.test(norm)) {
    tipos.push("funcionario");
  }
  if (/(ordenanza|decreto|ley|norma|reglament|resoluci[oó]n|digesto|articulo|c[oó]digo)/.test(norm)) {
    tipos.push("normativa-marco");
  }
  if (/(tgi|tasa|tr[aá]mite|licencia|habilitaci[oó]n|horario|atenci[oó]n|pagar|pago|p[uú]blico|donde|c[oó]mo)/.test(norm)) {
    tipos.push("faq");
  }

  return tipos;
}

/**
 * Detecta terminos "señal" en la pregunta del usuario que indican intencion
 * especifica: siglas, numeros de norma, años, nombres propios.
 * Estos terminos se buscan literal-en-texto contra chunks curados.
 */
function extraerPalabrasClave(pregunta: string): string[] {
  const out: string[] = [];

  // 1. Siglas (2+ letras MAYUSCULAS en palabra completa). Filtra preposiciones.
  const siglas = (pregunta.match(/\b[A-Z]{2,}\b/g) ?? []).filter(
    (s) => !["DE", "EL", "LA", "EN", "AL", "DEL", "LOS", "LAS", "UN", "UNA"].includes(s)
  );
  out.push(...siglas);

  // 2. Numeros tipo "1872/2009" o "1872-2009" (referencias a norma).
  const refsNorma = pregunta.match(/\b\d{2,5}[\/\-]\d{2,4}\b/g) ?? [];
  out.push(...refsNorma);

  // 3. Numeros sueltos despues de "ordenanza|decreto|ley|norma N° XXXX".
  const tipoNum = pregunta.matchAll(
    /\b(?:ordenanza|decreto|ley|norma|resoluci[oó]n)\s+(?:n[°º]?\s*)?(\d{2,5})\b/gi
  );
  for (const m of tipoNum) out.push(m[1]);

  // 4. Años 20XX o 19XX (relevante para presupuesto, ejercicio, etc.).
  const anios = pregunta.match(/\b(?:19|20)\d{2}\b/g) ?? [];
  out.push(...anios);

  // 5. Nombres propios: secuencias de palabra capitalizada (4+ chars) que NO
  //    arrancan la oracion (donde la mayuscula es esperada por gramatica).
  //    Detectamos solo a partir de la 2da palabra del input.
  const palabras = pregunta.split(/[\s,\.;:¿\?¡!()]+/).filter(Boolean);
  for (let i = 1; i < palabras.length; i++) {
    if (/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{3,}$/.test(palabras[i])) {
      out.push(palabras[i]);
    }
  }

  // 6. Si la pregunta es sobre presupuesto/obras/gastos pero NO menciona año
  //    explicito ni rango, forzamos "2026" como keyword para que el ILIKE
  //    matchee con los chunks curados del ejercicio actual.
  const norm = pregunta.toLowerCase();
  const esPresupuestaria = /(obra|obras|presupuesto|gasto|gasta|gastos|recurso|partida|invierte|invertir|invertimos|fondo|sueldo|salari|remunera|este\s+a[ñn]o|actualmente|vigente|actual)/.test(norm);
  const tieneAnioExplicito = /\b(?:19|20)\d{2}\b/.test(pregunta);
  if (esPresupuestaria && !tieneAnioExplicito) {
    out.push("2026");
  }

  // Dedupe preservando orden.
  return Array.from(new Set(out));
}

function escaparILike(s: string): string {
  // Postgres ILIKE: escape de %, _ y \. Tambien limpiamos comillas para
  // evitar romper la sintaxis del filtro Supabase .or().
  return s.replace(/[%_\\,()]/g, "");
}

/**
 * Expande cada palabra a sus variantes con y sin tildes/caracteres especiales.
 * El indexer guarda muchos chunks sin tildes ("Gestion", "Educacion"); las
 * preguntas del usuario suelen incluirlas ("Gestión", "Educación"). ILIKE
 * en Postgres NO normaliza tildes por defecto, asi que generamos ambas formas.
 */
function expandirVariantes(palabras: string[]): string[] {
  const out = new Set<string>();
  for (const p of palabras) {
    out.add(p);
    const sinTildes = p
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    if (sinTildes !== p) out.add(sinTildes);
  }
  return Array.from(out);
}

// ====================== Reranking estratificado ======================

function estratificar(chunks: ChunkRecuperado[], cuantos: number): ChunkRecuperado[] {
  if (cuantos <= 0) return [];

  const curados = chunks
    .filter((c) => TIPOS_CURADOS_SET.has(c.fuenteTipo))
    .sort((a, b) => b.similarity - a.similarity);

  const noCurados = chunks
    .filter((c) => !TIPOS_CURADOS_SET.has(c.fuenteTipo))
    .sort((a, b) => b.similarity - a.similarity);

  const tomarCurados = Math.min(curados.length, MIN_CURADOS_TOP, cuantos);
  const tomarNoCurados = Math.max(0, cuantos - tomarCurados);

  return [
    ...curados.slice(0, tomarCurados),
    ...noCurados.slice(0, tomarNoCurados)
  ];
}

// ====================== Helpers ======================

function mapearChunk(row: Record<string, unknown>): ChunkRecuperado {
  return {
    id: String(row.id ?? ""),
    fuenteTipo: String(row.fuente_tipo ?? ""),
    fuenteId: String(row.fuente_id ?? ""),
    fuenteTitulo: String(row.fuente_titulo ?? ""),
    fuenteUrl: (row.fuente_url as string | null) ?? null,
    fuenteFecha: (row.fuente_fecha as string | null) ?? null,
    texto: String(row.texto ?? ""),
    metadata: (row.metadata as Record<string, unknown>) ?? {},
    similarity: Number(row.similarity ?? 0)
  };
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
      // Etiquetar tipo: los curados marcamos como [OFICIAL VIGENTE 2026], los
      // demas como [HISTORICO]. Asi el modelo aplica la regla de prioridad.
      const etiqueta = TIPOS_CURADOS_SET.has(c.fuenteTipo)
        ? `[OFICIAL VIGENTE 2026 - ${c.fuenteTipo}]`
        : `[HISTORICO - ${c.fuenteTipo}]`;
      return `[FUENTE ${i + 1}] ${etiqueta} ${c.fuenteTitulo}${fecha}${url}\n${c.texto.trim()}`;
    })
    .join("\n\n---\n\n");
}
