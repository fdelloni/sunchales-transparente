#!/usr/bin/env node
/**
 * Scrapea las publicaciones del Concejo Municipal de Sunchales:
 *   - Boletines bimestrales (concejosunchales.gob.ar/boletin-informativo-bimestral.aspx)
 *   - Resúmenes anuales (concejosunchales.gob.ar/resumen-anual.aspx)
 *
 * Las dos páginas devuelven el listado completo en un solo GET (sin paginación).
 * Cada item es un `<div class="listado-item">` con fecha, título, link al detalle y link al PDF.
 *
 * Salida: src/lib/data/publicaciones-concejo.generated.ts
 *
 * Uso:
 *   npm run scrapear-publicaciones-concejo
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "publicaciones-concejo.generated.ts");

const BASE = "https://concejosunchales.gob.ar";
const URL_BOLETINES = `${BASE}/boletin-informativo-bimestral.aspx`;
const URL_RESUMENES = `${BASE}/resumen-anual.aspx`;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Sunchales Transparente · scraper público) AppleWebKit/537.36",
  "Accept-Language": "es-AR,es;q=0.9",
};

// ---------- helpers --------------------------------------------------------

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#176;/g, "°").replace(/&#186;/g, "º")
    .replace(/&#193;/g, "Á").replace(/&#225;/g, "á")
    .replace(/&#201;/g, "É").replace(/&#233;/g, "é")
    .replace(/&#205;/g, "Í").replace(/&#237;/g, "í")
    .replace(/&#211;/g, "Ó").replace(/&#243;/g, "ó")
    .replace(/&#218;/g, "Ú").replace(/&#250;/g, "ú")
    .replace(/&#209;/g, "Ñ").replace(/&#241;/g, "ñ");
}

function quitarTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

async function fetchHtml(url) {
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`HTTP ${r.status} para ${url}`);
  return new TextDecoder("utf-8").decode(new Uint8Array(await r.arrayBuffer()));
}

/** Convierte "dd/mm/aa" a ISO "20aa-mm-dd" (asume siglo XXI por la cobertura del Concejo). */
function fechaIso(ddmmaa) {
  if (!ddmmaa) return null;
  const m = ddmmaa.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (!m) return null;
  const dd = m[1].padStart(2, "0");
  const mm = m[2].padStart(2, "0");
  let yyyy = m[3];
  if (yyyy.length === 2) yyyy = "20" + yyyy;
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Construye una URL absoluta a partir de un href relativo del Concejo.
 * Maneja dos variantes vistas en el HTML: con `/` y con `\` (sí, ASP.NET viejo
 * escribe rutas con backslash en algunas entradas históricas).
 */
function urlAbsoluta(href) {
  if (!href) return null;
  let h = href.replace(/\\/g, "/");
  if (h.startsWith("http")) return h;
  if (h.startsWith("/")) return BASE + h;
  return `${BASE}/${h}`;
}

function extraerPublicaciones(html, tipo) {
  const items = [];
  const blocks = [...html.matchAll(/<div class="listado-item"[\s\S]*?<\/div>\s*(?:<!--[^>]*-->)?/g)];
  for (const b of blocks) {
    const block = b[0];
    const fechaM = block.match(/<p class="fecha-tema">\s*([^<]+?)\s*<\/p>/);
    const fechaPublicacion = fechaM ? fechaIso(fechaM[1]) : null;

    const tituloM = block.match(
      /<h3>\s*<a[^>]+href="([^"]*detalle\.aspx\?id=(\d+))[^"]*"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/
    );
    if (!tituloM) continue;
    const idPublicacion = Number(tituloM[2]);
    const urlDetalle = urlAbsoluta(tituloM[1]);
    const titulo = quitarTags(tituloM[3]);

    const pdfM = block.match(/<a[^>]+href="([^"]+\.pdf)"[^>]+class="btn btn-primary"/);
    const urlPdf = pdfM ? urlAbsoluta(pdfM[1]) : null;

    items.push({
      tipo,
      idPublicacion,
      titulo,
      fechaPublicacion,
      urlDetalle,
      urlPdf,
    });
  }
  return items;
}

// ---------- main -----------------------------------------------------------

console.log("→ GET", URL_BOLETINES);
const htmlBoletines = await fetchHtml(URL_BOLETINES);
const boletines = extraerPublicaciones(htmlBoletines, "boletin_bimestral");
console.log(`✓ Boletines bimestrales: ${boletines.length}`);

console.log("→ GET", URL_RESUMENES);
const htmlResumenes = await fetchHtml(URL_RESUMENES);
const resumenes = extraerPublicaciones(htmlResumenes, "resumen_anual");
console.log(`✓ Resúmenes anuales: ${resumenes.length}`);

const todos = [...boletines, ...resumenes].sort((a, b) => {
  const fa = a.fechaPublicacion ?? "";
  const fb = b.fechaPublicacion ?? "";
  return fb.localeCompare(fa);
});

const ahora = new Date().toISOString();
const ts = `// AUTO-GENERADO por scripts/scrapear-publicaciones-concejo.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-publicaciones-concejo
//
// Fuentes oficiales:
//   ${URL_BOLETINES}
//   ${URL_RESUMENES}
//
// Última sincronización: ${ahora}
// Boletines bimestrales: ${boletines.length}
// Resúmenes anuales: ${resumenes.length}

export type TipoPublicacionConcejo = "boletin_bimestral" | "resumen_anual";

export type PublicacionConcejo = {
  /** "boletin_bimestral" | "resumen_anual". */
  tipo: TipoPublicacionConcejo;
  /** Identificador estable que usa el sitio del Concejo. */
  idPublicacion: number;
  titulo: string;
  /** ISO 8601 (YYYY-MM-DD) — fecha de publicación según el Concejo. */
  fechaPublicacion: string | null;
  urlDetalle: string | null;
  urlPdf: string | null;
};

export const publicacionesConcejo: PublicacionConcejo[] = ${JSON.stringify(todos, null, 2)};

export const publicacionesConcejoMeta = {
  fuenteBoletines: ${JSON.stringify(URL_BOLETINES)},
  fuenteResumenes: ${JSON.stringify(URL_RESUMENES)},
  sincronizadoEl: ${JSON.stringify(ahora)},
  totalBoletines: ${boletines.length},
  totalResumenes: ${resumenes.length},
} as const;
`;

await writeFile(RUTA_TS, ts, "utf8");
console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
