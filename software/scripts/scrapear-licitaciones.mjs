#!/usr/bin/env node
/**
 * Scrapea el listado oficial de licitaciones y contrataciones de la
 * Municipalidad de Sunchales. Cada proceso aparece como un acordeón
 * Kadence dentro de la página `municipio-transparente/licitaciones-y-contrataciones/`.
 *
 * Salida: src/lib/data/licitaciones.generated.ts
 *
 * Política de honestidad:
 *   - Sólo se extraen campos que aparecen literalmente en el panel del acordeón.
 *   - Los campos no publicados por el municipio (oferentes, adjudicación,
 *     monto adjudicado, decreto de adjudicación, ampliaciones, pagos) NO se
 *     completan: la falta se declara en /brechas?modulo=contrataciones.
 *   - Los hashes SHA-256 de los pliegos quedan sin calcular hasta que se
 *     descarguen y verifiquen los archivos; el script jamás inventa hashes.
 *
 * Uso:
 *   npm run scrapear-licitaciones
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "licitaciones.generated.ts");

const URL_LISTADO =
  "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/";

const MESES_TEXTO = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
  noviembre: 11, diciembre: 12,
};

// ---------- helpers --------------------------------------------------------

function quitarTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#176;/g, "°")
    .replace(/&#186;/g, "º")
    .replace(/&#193;/g, "Á").replace(/&#225;/g, "á")
    .replace(/&#201;/g, "É").replace(/&#233;/g, "é")
    .replace(/&#205;/g, "Í").replace(/&#237;/g, "í")
    .replace(/&#211;/g, "Ó").replace(/&#243;/g, "ó")
    .replace(/&#218;/g, "Ú").replace(/&#250;/g, "ú")
    .replace(/&#209;/g, "Ñ").replace(/&#241;/g, "ñ");
}

function parsearMontoARS(s) {
  if (!s) return null;
  // Ejemplos: "$56.714.843,25", "$ 1.000.000.000,00", "$230.000.000,00(finales..."
  const m = s.match(/\$\s*([\d\.]+)(?:,(\d{1,2}))?/);
  if (!m) return null;
  const entera = m[1].replace(/\./g, "");
  const dec = m[2] ?? "0";
  const n = Number(entera) + Number(dec) / 100;
  return Number.isFinite(n) ? n : null;
}

function parsearFechaEspanol(s) {
  if (!s) return null;
  // "jueves 04 de diciembre de 2025" / "16 de octubre de 2025"
  const m = s
    .toLowerCase()
    .match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)(?:\s+de)?\s+(\d{4})/);
  if (!m) return null;
  const dia = Number(m[1]);
  const mes = MESES_TEXTO[m[2]];
  const anio = Number(m[3]);
  if (!mes || !Number.isFinite(dia) || !Number.isFinite(anio)) return null;
  const d = new Date(Date.UTC(anio, mes - 1, dia));
  return d.toISOString();
}

function detectarProcedimiento(titulo) {
  const t = titulo.toLowerCase();
  if (t.includes("licitación pública") || t.includes("licitacion publica")) return "licitacion_publica";
  if (t.includes("licitación privada") || t.includes("licitacion privada")) return "licitacion_privada";
  if (t.includes("concurso de precios") || t.includes("concurso precios")) return "concurso_precios";
  if (t.includes("contratación directa") || t.includes("contratacion directa")) return "contratacion_directa";
  return "otro";
}

function detectarNumero(titulo) {
  // "Licitación Pública N° 04/2025" — capturamos NN/YYYY
  const m = titulo.match(/N[°º]?\s*0*(\d{1,3})\s*\/\s*(\d{4})/);
  if (!m) return { numero: null, anio: null };
  return { numero: `${m[1].padStart(2, "0")}/${m[2]}`, anio: Number(m[2]) };
}

// ---------- parser ---------------------------------------------------------

function extraerPanes(html) {
  // Cada pane de Kadence empieza con `<div class="wp-block-kadence-pane ...">`
  // y termina cuando se cierra su bloque. Como no podemos contar divs anidados
  // con regex de forma robusta, dividimos por el delimitador conocido y nos
  // quedamos con el bloque hasta el siguiente delimitador.
  const partes = html.split(/<div\s+class="wp-block-kadence-pane[^"]*"/);
  const panes = [];
  for (let i = 1; i < partes.length; i++) {
    panes.push("<div " + partes[i]);
  }
  return panes;
}

function parsearPane(paneHtml) {
  // Título
  const tituloM = paneHtml.match(/<span class="kt-blocks-accordion-title"[^>]*>([\s\S]*?)<\/span>/);
  if (!tituloM) return null;
  const tituloRaw = decodeEntities(quitarTags(tituloM[1]));
  if (!tituloRaw) return null;

  const procedimiento = detectarProcedimiento(tituloRaw);
  const { numero, anio } = detectarNumero(tituloRaw);
  if (!numero || !anio) return null; // Sólo procesos que respetan el formato de numeración

  // Cuerpo (panel inner)
  const cuerpoM = paneHtml.match(/<div class="kt-accordion-panel-inner"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
  const cuerpo = cuerpoM ? cuerpoM[1] : paneHtml;

  // Decreto (puede no estar)
  const decretoM = cuerpo.match(/DECRETO\s+N[°º]?\s*(\d{2,5})\s*\/\s*(\d{4})/i);
  const decreto = decretoM ? `Decreto N° ${decretoM[1]}/${decretoM[2]}` : null;

  // Objeto
  const objetoM = cuerpo.match(/Objeto\s*<\/strong>\s*:?\s*([\s\S]*?)(?:<\/p>|<p>)/i);
  let objeto = objetoM ? decodeEntities(quitarTags(objetoM[1])) : null;
  if (!objeto) {
    // Variante: "<strong>Objeto:</strong>"
    const m2 = cuerpo.match(/Objeto:\s*<\/strong>\s*([\s\S]*?)(?:<\/p>|<p>)/i);
    if (m2) objeto = decodeEntities(quitarTags(m2[1]));
  }
  if (objeto) objeto = objeto.replace(/^[:\s]+/, "").trim();

  // Presupuesto oficial
  const presM = cuerpo.match(/Presupuesto\s*Oficial[\s\S]{0,200}?\$\s*[\d\.,]+/i);
  const presupuestoOficial = presM ? parsearMontoARS(presM[0]) : null;

  // Fecha de apertura
  const aperturaM = cuerpo.match(/Fecha\s*de\s*apertura\s*de\s*ofertas[^<]*<\/strong>\s*:\s*([\s\S]*?)(?:<\/p>|<p>)/i);
  let fechaApertura = aperturaM ? parsearFechaEspanol(decodeEntities(quitarTags(aperturaM[1]))) : null;
  if (!fechaApertura) {
    // Variante de orden de etiquetas
    const m2 = cuerpo.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)(?:\s+de)?\s+(\d{4})/i);
    if (m2 && /apertura/i.test(cuerpo)) fechaApertura = parsearFechaEspanol(m2[0]);
  }

  // Documentos: links dentro del cuerpo
  const docs = [];
  for (const m of cuerpo.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1];
    if (!/\.(pdf|rar|zip)(?:\?|$)/i.test(href)) continue;
    const nombre = decodeEntities(quitarTags(m[2])) || href.split("/").pop() || "documento";
    let tipo = "otro";
    if (/pliego/i.test(nombre) || /pliego/i.test(href)) tipo = "pliego";
    else if (/decreto/i.test(nombre) || /decreto/i.test(href)) tipo = "decreto";
    else if (/enmienda|aclaraci/i.test(nombre) || /enmienda/i.test(href)) tipo = "enmienda";
    else if (/circular/i.test(nombre)) tipo = "circular";
    else if (/anexo|plano/i.test(nombre)) tipo = "anexo";
    docs.push({ nombre, tipo, url: href });
  }

  return {
    id: `${procedimiento.replace("licitacion_", "lp-").replace("publica", "")}${numero.replace("/", "-")}`.replace(/^lp--/, "lp-"),
    titulo: tituloRaw,
    procedimiento,
    numero,
    anio,
    decreto,
    objeto,
    presupuestoOficial,
    fechaApertura,
    documentos: docs,
    fuenteUrl: URL_LISTADO,
  };
}

// ---------- main -----------------------------------------------------------

async function main() {
  console.log("→ GET", URL_LISTADO);
  const res = await fetch(URL_LISTADO, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Sunchales Transparente · scraper público) AppleWebKit/537.36",
      "Accept-Language": "es-AR,es;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  // Forzamos UTF-8 para evitar interpretación errónea por encoding del shell
  const buf = await res.arrayBuffer();
  const html = new TextDecoder("utf-8").decode(new Uint8Array(buf));

  const panes = extraerPanes(html);
  console.log(`✓ ${panes.length} panes detectados en el listado`);

  const items = [];
  for (const p of panes) {
    const parsed = parsearPane(p);
    if (parsed) items.push(parsed);
  }

  // Deduplicar por (procedimiento, numero) preservando el primero (que en el HTML
  // es el más reciente porque la página los lista cronológicamente desde 2025).
  const vistos = new Set();
  const unicos = [];
  for (const it of items) {
    const k = `${it.procedimiento}::${it.numero}`;
    if (vistos.has(k)) continue;
    vistos.add(k);
    unicos.push(it);
  }

  // Orden estable: por año desc y dentro del año por número desc
  unicos.sort((a, b) => {
    if (a.anio !== b.anio) return b.anio - a.anio;
    return b.numero.localeCompare(a.numero);
  });

  // Resumen por año y procedimiento
  const porAnio = {};
  const porProc = {};
  for (const it of unicos) {
    porAnio[it.anio] = (porAnio[it.anio] ?? 0) + 1;
    porProc[it.procedimiento] = (porProc[it.procedimiento] ?? 0) + 1;
  }
  console.log(`✓ ${unicos.length} licitaciones únicas extraídas`);
  console.log("Por año:");
  for (const a of Object.keys(porAnio).sort()) console.log(`  ${a}: ${porAnio[a]}`);
  console.log("Por procedimiento:");
  for (const p of Object.keys(porProc).sort()) console.log(`  ${p}: ${porProc[p]}`);

  const ahora = new Date().toISOString();
  const ts = `// AUTO-GENERADO por scripts/scrapear-licitaciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-licitaciones
//
// Fuente oficial:
// ${URL_LISTADO}
//
// Última sincronización: ${ahora}
// Total licitaciones extraídas: ${unicos.length}

export type ProcedimientoOficial =
  | "licitacion_publica"
  | "licitacion_privada"
  | "concurso_precios"
  | "contratacion_directa"
  | "otro";

export type DocumentoOficial = {
  /** Nombre humano del archivo (caja del link en la página oficial). */
  nombre: string;
  /** Tipo deducido del nombre: pliego | decreto | enmienda | circular | anexo | otro. */
  tipo: "pliego" | "decreto" | "enmienda" | "circular" | "anexo" | "otro";
  /** URL pública directa al archivo (PDF/RAR/ZIP). */
  url: string;
};

export type LicitacionOficial = {
  /** Identificador estable: ej. lp-04-2025. */
  id: string;
  /** Título tal como aparece en la página oficial. */
  titulo: string;
  /** Tipo de procedimiento. */
  procedimiento: ProcedimientoOficial;
  /** Numeración con barra (ej. "04/2025"). */
  numero: string;
  /** Año del proceso (extraído de la numeración). */
  anio: number;
  /** Decreto de llamado, si está citado. Null si no se publicó. */
  decreto: string | null;
  /** Objeto de la contratación (texto literal del panel). Null si no se pudo extraer. */
  objeto: string | null;
  /** Presupuesto oficial en pesos argentinos. Null si no se pudo extraer. */
  presupuestoOficial: number | null;
  /** Fecha de apertura de ofertas (ISO 8601). Null si no se publicó o no se pudo parsear. */
  fechaApertura: string | null;
  /** Archivos publicados por el municipio para este proceso. */
  documentos: DocumentoOficial[];
  /** URL de la página oficial (listado). */
  fuenteUrl: string;
};

export const licitacionesOficiales: LicitacionOficial[] = ${JSON.stringify(unicos, null, 2)};

export const licitacionesMeta = {
  fuenteUrl: ${JSON.stringify(URL_LISTADO)},
  sincronizadoEl: ${JSON.stringify(ahora)},
  total: ${unicos.length},
  porAnio: ${JSON.stringify(porAnio, null, 2)},
  porProcedimiento: ${JSON.stringify(porProc, null, 2)},
} as const;
`;

  await writeFile(RUTA_TS, ts, "utf8");
  console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
