/**
 * Buscador BM25 sobre la base documental.
 *
 * BM25 con doble check (score alto + cobertura mínima de tokens) para
 * evitar falsos matches cuando un solo token con boost domina la pregunta.
 * La cobertura considera el texto del doc Y las keywords curadas (que
 * son sinónimos/formas verbales que el autor del corpus marcó como equivalentes).
 */

import { baseDocumental, type Documento } from "@/lib/chat/baseDocumental";

const BM25_K1 = 1.2;
const BM25_B = 0.75;

const SCORE_MIN_CONFIANZA = 0.65;
// Mayoría estricta de tokens distintivos cubiertos (texto + keywords).
const COBERTURA_MIN = 0.51;
const KEYWORD_BOOST = 2.0;

const STOPWORDS = new Set<string>([
  "a","al","algo","algun","algún","algunas","alguno","algunos","ante","antes",
  "aqui","aquí","aquel","aquella","aquellas","aquellos","como","cómo","con",
  "contra","cual","cuál","cuando","cuándo","de","del","desde","donde","dónde",
  "el","él","ella","ellas","ellos","en","entre","era","eran","es","esa","esas",
  "ese","eso","esos","esta","está","estas","este","esto","estos","fue","fueron",
  "ha","han","hasta","hay","la","las","le","les","lo","los","mas","más","me",
  "mi","mis","mucho","muy","nada","ni","no","nos","nosotros","o","otra","otras",
  "otro","otros","para","pero","poco","por","porque","que","qué","quien","quién",
  "se","sea","ser","si","sí","sin","sobre","son","soy","su","sus","tan","te",
  "tener","tengo","ti","tu","tus","un","una","uno","unos","y","ya","yo"
]);

function normalizarTexto(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9áéíóúñü\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizar(s: string): string[] {
  return normalizarTexto(s)
    .split(" ")
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

type IndiceDoc = {
  doc: Documento;
  tokens: string[];
  tf: Map<string, number>;
  keywordsSet: Set<string>;
  largo: number;
};

let _indiceCache: {
  docs: IndiceDoc[];
  idf: Map<string, number>;
  largoPromedio: number;
} | null = null;

function construirIndice() {
  if (_indiceCache) return _indiceCache;

  const docs: IndiceDoc[] = baseDocumental.map((doc) => {
    const tokens = tokenizar(doc.titulo + " " + doc.texto);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    const keywordsSet = new Set<string>();
    for (const kw of doc.keywords) {
      for (const tok of tokenizar(kw)) keywordsSet.add(tok);
    }
    return { doc, tokens, tf, keywordsSet, largo: tokens.length };
  });

  const N = docs.length;
  const df = new Map<string, number>();
  for (const d of docs) {
    for (const t of new Set(d.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const idf = new Map<string, number>();
  for (const [t, n] of df.entries()) {
    idf.set(t, Math.log((N - n + 0.5) / (n + 0.5) + 1));
  }

  const largoPromedio = docs.reduce((s, d) => s + d.largo, 0) / Math.max(N, 1);

  _indiceCache = { docs, idf, largoPromedio };
  return _indiceCache;
}

export type ResultadoBusqueda = {
  doc: Documento;
  score: number;
  confianza: number;
  cobertura: number;
};

function calcularCobertura(
  queryTokens: string[],
  tf: Map<string, number>,
  keywordsSet: Set<string>
): number {
  const distintos = new Set(queryTokens);
  if (distintos.size === 0) return 0;
  let cubiertos = 0;
  for (const t of distintos) {
    if (tf.has(t) || keywordsSet.has(t)) cubiertos++;
  }
  return cubiertos / distintos.size;
}

export function buscar(pregunta: string): ResultadoBusqueda | null {
  const idx = construirIndice();
  const queryTokens = tokenizar(pregunta);
  if (queryTokens.length === 0) return null;

  const scores: { doc: Documento; score: number; cobertura: number }[] = [];
  for (const d of idx.docs) {
    let score = 0;
    for (const qt of queryTokens) {
      const tf = d.tf.get(qt);
      if (!tf) continue;
      const idfTerm = idx.idf.get(qt) ?? 0;
      const num = tf * (BM25_K1 + 1);
      const den = tf + BM25_K1 * (1 - BM25_B + BM25_B * (d.largo / idx.largoPromedio));
      let contribucion = idfTerm * (num / den);
      if (d.keywordsSet.has(qt)) contribucion *= KEYWORD_BOOST;
      score += contribucion;
    }
    if (score > 0) {
      const cobertura = calcularCobertura(queryTokens, d.tf, d.keywordsSet);
      scores.push({ doc: d.doc, score, cobertura });
    }
  }

  if (scores.length === 0) return null;
  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];

  const confianza = Math.min(1, top.score / Math.max(queryTokens.length, 1));

  if (confianza < SCORE_MIN_CONFIANZA) return null;
  if (top.cobertura < COBERTURA_MIN) return null;

  return { doc: top.doc, score: top.score, confianza, cobertura: top.cobertura };
}

export function topN(pregunta: string, n = 3): ResultadoBusqueda[] {
  const idx = construirIndice();
  const queryTokens = tokenizar(pregunta);
  if (queryTokens.length === 0) return [];

  const scores: ResultadoBusqueda[] = [];
  for (const d of idx.docs) {
    let score = 0;
    for (const qt of queryTokens) {
      const tf = d.tf.get(qt);
      if (!tf) continue;
      const idfTerm = idx.idf.get(qt) ?? 0;
      const num = tf * (BM25_K1 + 1);
      const den = tf + BM25_K1 * (1 - BM25_B + BM25_B * (d.largo / idx.largoPromedio));
      let contribucion = idfTerm * (num / den);
      if (d.keywordsSet.has(qt)) contribucion *= KEYWORD_BOOST;
      score += contribucion;
    }
    if (score > 0) {
      scores.push({
        doc: d.doc,
        score,
        confianza: Math.min(1, score / Math.max(queryTokens.length, 1)),
        cobertura: calcularCobertura(queryTokens, d.tf, d.keywordsSet)
      });
    }
  }
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, n);
}

export function _resetIndice() {
  _indiceCache = null;
}
