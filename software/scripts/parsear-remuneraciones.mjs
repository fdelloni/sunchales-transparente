#!/usr/bin/env node
/**
 * Parsea cada PDF del listado de remuneraciones de funcionarios y genera un
 * dataset estructurado con filas {funcionario, bruto, descuentos, neto}.
 *
 * Política de honestidad:
 *   - El parser NUNCA inventa montos. Si una celda no aparece en el PDF, el
 *     valor queda como `null` (no como cero).
 *   - Los PDFs escaneados (sin texto digital) se reportan como tales: el
 *     parser no aplica OCR. Esta limitación de los archivos publicados por
 *     el municipio queda registrada como brecha de calidad de la fuente.
 *   - Los textos quedan tal como aparecen en el PDF.
 *
 * Optimizaciones:
 *   - Procesamiento en paralelo (pool de N) para acelerar.
 *   - Timeout duro por PDF (no debería superar 20s; si lo hace, se reporta
 *     y el resto del trabajo continúa).
 *   - Cache local en data/remuneraciones-pdfs/.
 *
 * Uso:
 *   npm run parsear-remuneraciones
 *   npm run parsear-remuneraciones -- --paralelo=8
 */

import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const CACHE = path.join(RAIZ, "data", "remuneraciones-pdfs");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "remuneraciones-detalle.generated.ts");
await mkdir(CACHE, { recursive: true });

const args = new Map(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? "true"] : [a, "true"];
  })
);
const PARALELO = Number(args.get("paralelo") ?? "4");
const TIMEOUT_DOWNLOAD_MS = Number(args.get("timeout-download") ?? "60000");
const TIMEOUT_PDFJS_MS = Number(args.get("timeout-pdfjs") ?? "20000");
const REINTENTOS = Number(args.get("reintentos") ?? "1");

// ---------- carga del catálogo ---------------------------------------------

const catalogoPath = path.join(RAIZ, "src", "lib", "data", "remuneraciones.generated.ts");
const catalogoSrc = await readFile(catalogoPath, "utf8");
const matchArr = catalogoSrc.match(/remuneracionesPdfs:\s*RemuneracionPdf\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
if (!matchArr) throw new Error("No pude leer remuneraciones.generated.ts");
const remuneracionesPdfs = JSON.parse(matchArr[1]);
console.log(
  `→ Catálogo: ${remuneracionesPdfs.length} PDFs · paralelo=${PARALELO}` +
    ` · timeout-download=${TIMEOUT_DOWNLOAD_MS}ms · timeout-pdfjs=${TIMEOUT_PDFJS_MS}ms` +
    ` · reintentos=${REINTENTOS}`
);

// ---------- helpers PDF ----------------------------------------------------

const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout tras ${ms}ms (${label})`)), ms)),
  ]);
}

async function descargarPdfConRetry(urlPdf) {
  const fname = urlPdf.split("/").pop();
  const dest = path.join(CACHE, fname);
  if (existsSync(dest)) {
    const s = await stat(dest);
    if (s.size > 0) return await readFile(dest);
  }
  let ultimoError;
  for (let intento = 0; intento <= REINTENTOS; intento++) {
    try {
      const r = await withTimeout(
        fetch(urlPdf, {
          headers: { "User-Agent": "Mozilla/5.0 (Sunchales Transparente parser)" },
        }),
        TIMEOUT_DOWNLOAD_MS,
        `download intento ${intento + 1}`
      );
      if (!r.ok) throw new Error(`HTTP ${r.status} (${urlPdf})`);
      const buf = Buffer.from(await r.arrayBuffer());
      await writeFile(dest, buf);
      return buf;
    } catch (e) {
      ultimoError = e;
    }
  }
  throw ultimoError ?? new Error("download falló");
}

async function pdfALineasYItems(buf) {
  const doc = await getDocument({
    data: new Uint8Array(buf),
    useSystemFonts: true,
    isEvalSupported: false,
  }).promise;
  let totalItems = 0;
  const lineas = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    totalItems += tc.items.length;
    const filas = new Map();
    for (const it of tc.items) {
      const y = Math.round(it.transform[5]);
      const x = it.transform[4];
      let yKey = y;
      for (const ye of filas.keys()) {
        if (Math.abs(ye - y) <= 2) {
          yKey = ye;
          break;
        }
      }
      if (!filas.has(yKey)) filas.set(yKey, []);
      filas.get(yKey).push({ x, str: it.str });
    }
    const ys = [...filas.keys()].sort((a, b) => b - a);
    for (const y of ys) {
      const fila = filas
        .get(y)
        .sort((a, b) => a.x - b.x)
        .map((c) => c.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (fila) lineas.push(fila);
    }
  }
  return { lineas, totalItems };
}

// ---------- parsers --------------------------------------------------------

function parsearMontoARS(texto) {
  if (!texto) return null;
  const limpio = texto.replace(/\$/g, "").replace(/\s+/g, "");
  const m = limpio.match(/^(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d{1,2}))?$/);
  if (m) {
    const entera = m[1].replace(/\./g, "");
    const dec = m[2] ?? "0";
    return Number(entera) + Number(dec.padEnd(2, "0")) / 100;
  }
  const m2 = limpio.match(/^(\d[\d\.]+)(?:,(\d{1,2}))?$/);
  if (m2) {
    const entera = m2[1].replace(/\./g, "");
    const dec = m2[2] ?? "0";
    const n = Number(entera) + Number(dec.padEnd(2, "0")) / 100;
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function partirFila(linea) {
  // Modo 1: con $ (formato moderno 2018+)
  if (linea.includes("$")) {
    const montos = [];
    const etiqueta = linea
      .replace(/\$\s*([\d\.\s]+(?:,\d{1,2})?)/g, (_m, num) => {
        const v = parsearMontoARS(num);
        if (v !== null) {
          montos.push(v);
          return " ";
        }
        return _m;
      })
      .replace(/\s+/g, " ")
      .trim();
    return { etiqueta, montos, modoLegacy: false };
  }
  // Modo 2: legacy (formato 2014-2015 con tabla de columnas Legajo/Nombre/Bruta/Retenc/Total)
  // Capturamos números con formato pesos: con punto miles y coma decimal,
  // o sin punto con coma decimal, requiriendo al menos 3 dígitos antes de coma.
  const montosCandidatos = [];
  const etiqueta = linea
    .replace(/\b(\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d{4,}(?:,\d{1,2})?|\d+,\d{2})\b/g, (_m, num) => {
      const v = parsearMontoARS(num);
      if (v !== null) {
        montosCandidatos.push(v);
        return " ";
      }
      return _m;
    })
    .replace(/\s+/g, " ")
    .trim();
  // Para considerar legacy: necesitamos ≥3 montos; si el primero parece legajo
  // (entero pequeño y de exactamente 4 dígitos sin decimal) lo descartamos.
  if (montosCandidatos.length < 3) {
    return { etiqueta, montos: [], modoLegacy: false };
  }
  const primerNumero = linea.match(/\b(\d{1,4})\b/);
  let montos = montosCandidatos;
  // Si el primer número de la línea es un legajo (4 dígitos enteros, ≤ 9999)
  // y coincide con el primer monto candidato, lo descartamos.
  if (primerNumero && Number(primerNumero[1]) <= 9999 && montos[0] === Number(primerNumero[1])) {
    montos = montos.slice(1);
  }
  if (montos.length < 2) return { etiqueta, montos: [], modoLegacy: false };
  return { etiqueta, montos, modoLegacy: true };
}

function pareceFuncionario(etiqueta) {
  if (!etiqueta) return false;
  const cleaned = etiqueta.replace(/[\.\:]/g, " ").trim();
  if (cleaned.length < 4) return false;
  const palabras = cleaned.split(/\s+/);
  if (palabras.length < 1 || palabras.length > 16) return false;
  if (!palabras.some((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p))) return false;
  const lower = cleaned.toLowerCase();
  const exclusiones = [
    "apellido y nombre",
    "sueldo bruto",
    "sueldo neto",
    "descuentos",
    "total",
    "subtotal",
    "página",
    "pagina",
    "cargo apellido",
    "remuneraciones de funcionarios",
    "departamento ejecutivo",
  ];
  if (exclusiones.some((e) => lower === e)) return false;
  return true;
}

const CABECERAS_VIEJAS = [
  "legajo nombre",
  "rem. bruta",
  "retenc. leg",
  "salar. fliar",
  "imp. gcias",
  "totales",
  "informaci",
  "municipalidad de sunchales",
  "secretaria de hacienda",
  "secretar",
];

function esCabeceraOTitulo(etiqueta) {
  const lower = etiqueta.toLowerCase();
  if (
    lower.includes("apellido y nombre") ||
    lower.includes("sueldo bruto") ||
    lower.includes("sueldo neto") ||
    lower.includes("descuento") ||
    /^\s*(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre|sac)\b/i.test(etiqueta) ||
    /^mes:/i.test(etiqueta)
  )
    return true;
  return CABECERAS_VIEJAS.some((c) => lower.includes(c));
}

function extraerFuncionarios(lineas) {
  const filas = [];
  let cargoColgado = null;

  for (const ln of lineas) {
    const { etiqueta, montos, modoLegacy } = partirFila(ln);

    if (montos.length === 0) {
      if (etiqueta && etiqueta.length > 3 && !/^\d/.test(etiqueta)) {
        if (esCabeceraOTitulo(etiqueta)) continue;
        cargoColgado = etiqueta;
      }
      continue;
    }

    // Filtrar líneas-totales: si la etiqueta queda vacía (sólo eran montos)
    // o es una cabecera, ignoramos.
    if (esCabeceraOTitulo(etiqueta) || etiqueta.length < 3) continue;

    let bruto = null, desc = null, neto = null;
    if (modoLegacy) {
      // Formato 2014-2015: bruto = primer monto, neto = último, descuentos quedan en null
      // (el PDF original tiene 3-4 columnas distintas de descuentos; no las inventamos).
      bruto = montos[0];
      neto = montos[montos.length - 1];
    } else {
      if (montos.length >= 3) [bruto, desc, neto] = montos;
      else if (montos.length === 2) { bruto = montos[0]; neto = montos[1]; }
      else bruto = montos[0];
    }

    if (!pareceFuncionario(etiqueta) && !cargoColgado) continue;

    const cargoYNombre = cargoColgado
      ? `${cargoColgado} — ${etiqueta}`.trim()
      : etiqueta;
    cargoColgado = null;

    filas.push({ etiqueta: cargoYNombre, bruto, descuentos: desc, neto });
  }
  return filas;
}

// ---------- worker por PDF -------------------------------------------------

async function procesarPdf(pdf) {
  try {
    const buf = await descargarPdfConRetry(pdf.urlPdf);
    const { lineas, totalItems } = await withTimeout(pdfALineasYItems(buf), TIMEOUT_PDFJS_MS, "pdfjs");
    if (totalItems === 0) {
      return {
        ...pdf,
        parseado: false,
        cantidadFilas: 0,
        filas: [],
        error: "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
      };
    }
    const filas = extraerFuncionarios(lineas);
    if (filas.length === 0) {
      return {
        ...pdf,
        parseado: false,
        cantidadFilas: 0,
        filas: [],
        error: "0 filas detectadas (formato no soportado por el parser actual).",
      };
    }
    return {
      ...pdf,
      parseado: true,
      cantidadFilas: filas.length,
      filas,
    };
  } catch (e) {
    return {
      ...pdf,
      parseado: false,
      cantidadFilas: 0,
      filas: [],
      error: e?.message ?? String(e),
    };
  }
}

// ---------- pool paralelo --------------------------------------------------

async function ejecutarPool(items, n, fn) {
  const cola = [...items];
  const total = cola.length;
  const resultados = new Array(total);
  let procesados = 0;

  async function worker() {
    while (true) {
      const idx = total - cola.length;
      const it = cola.shift();
      if (it === undefined) return;
      const r = await fn(it, idx);
      resultados[idx] = r;
      procesados++;
      if (procesados % 5 === 0 || procesados === total) {
        console.log(`  · ${procesados}/${total}`);
      }
    }
  }
  await Promise.all(Array.from({ length: n }, () => worker()));
  return resultados;
}

// ---------- main -----------------------------------------------------------

console.log(`→ Procesando con ${PARALELO} workers…`);
const detalle = await ejecutarPool(remuneracionesPdfs, PARALELO, async (pdf) => {
  const r = await procesarPdf(pdf);
  if (r.parseado) {
    console.log(`  ✓ ${r.label}: ${r.cantidadFilas} filas`);
  } else {
    console.log(`  ✗ ${r.label}: ${r.error}`);
  }
  return r;
});

const ok = detalle.filter((d) => d.parseado).length;
const escaneados = detalle.filter(
  (d) => !d.parseado && /sin texto digital/.test(d.error ?? "")
).length;
const otrosErrores = detalle.length - ok - escaneados;
const totalFilas = detalle.reduce((acc, d) => acc + d.cantidadFilas, 0);

console.log(`\n✓ Parseados: ${ok}/${detalle.length}`);
console.log(`⚠ Escaneados (necesitan OCR): ${escaneados}`);
console.log(`✗ Otros errores: ${otrosErrores}`);
console.log(`Σ Filas extraídas: ${totalFilas}`);

const ahora = new Date().toISOString();
const ts = `// AUTO-GENERADO por scripts/parsear-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run parsear-remuneraciones
//
// Fuente oficial:
// https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/
//
// Última extracción: ${ahora}
// Períodos parseados con éxito: ${ok}/${detalle.length}
// Períodos escaneados (PDFs sin texto digital): ${escaneados}
// Otros errores (timeout, formato no soportado): ${otrosErrores}
// Filas extraídas en total: ${totalFilas}

export type FilaFuncionario = {
  /** Texto literal (Apellido y Nombre, posiblemente con cargo) tal como aparece en el PDF. */
  etiqueta: string;
  /** Sueldo bruto en pesos. Null si no estaba en el PDF. */
  bruto: number | null;
  /** Descuentos en pesos. Null si no estaba en el PDF. */
  descuentos: number | null;
  /** Sueldo neto en pesos. Null si no estaba en el PDF. */
  neto: number | null;
};

export type RemuneracionDetalle = {
  /** YYYY-MM o YYYY-MM-SAC. */
  periodo: string;
  anio: number | null;
  mes: number | null;
  sac: boolean;
  label: string;
  urlPdf: string;
  /** True si el parser pudo extraer al menos una fila. */
  parseado: boolean;
  cantidadFilas: number;
  filas: FilaFuncionario[];
  error?: string;
};

export const remuneracionesDetalle: RemuneracionDetalle[] = ${JSON.stringify(detalle, null, 2)};

export const remuneracionesDetalleMeta = {
  generadoEl: ${JSON.stringify(ahora)},
  totalPeriodos: ${detalle.length},
  parseados: ${ok},
  escaneados: ${escaneados},
  otrosErrores: ${otrosErrores},
  filasTotales: ${totalFilas},
} as const;
`;

await writeFile(RUTA_TS, ts, "utf8");
console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
