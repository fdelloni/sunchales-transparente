#!/usr/bin/env node
/**
 * ⚠ ESTADO ACTUAL (2026-05-10):
 * Este script está LISTO PERO NO EJECUTADO. La instalación de
 * `tesseract.js` y `@napi-rs/canvas` en este entorno (carpeta del proyecto
 * dentro de OneDrive) falla silenciosamente: npm reporta que instaló los
 * paquetes pero los directorios no se materializan en `node_modules`.
 *
 * Para ejecutarlo:
 *   - Pausar la sincronización de OneDrive sobre la carpeta del proyecto, o
 *   - Mover el proyecto fuera de OneDrive temporalmente, o
 *   - Ejecutar `npm install` desde un PowerShell con privilegios elevados.
 *   Después correr: `npm run ocr-remuneraciones -- --limite=1` para probar
 *   con un solo PDF antes de la corrida completa.
 *
 * Mientras tanto, los 42 PDFs escaneados quedan declarados como
 * "PDFs sin texto digital" en el dataset y la página los muestra como
 * brecha de calidad de la fuente.
 *
 * OCR para los PDFs escaneados de remuneraciones que no tienen texto digital.
 *
 * Pipeline por PDF:
 *   1. Cargar el PDF con pdfjs-dist
 *   2. Renderizar cada página a canvas (escala 2.5x ≈ 300 DPI) usando node-canvas
 *   3. Pasar el PNG a tesseract.js con idioma "spa"
 *   4. Aplicar el mismo parser de filas que parsear-remuneraciones.mjs
 *
 * Política de honestidad:
 *   - Las filas resultantes se marcan SIEMPRE con `ocrNoVerificado: true`.
 *     Eso señala explícitamente que un OCR puede equivocarse en montos
 *     (ej. confundir "8" con "0", "1" con "7"). La página de detalle muestra
 *     un warning prominente para estos períodos.
 *   - Si el OCR retorna texto pero el parser no detecta filas válidas, se
 *     reporta como tal sin inventar.
 *
 * Salida:
 *   src/lib/data/remuneraciones-ocr.generated.ts
 *
 * Uso:
 *   npm run ocr-remuneraciones
 *   npm run ocr-remuneraciones -- --limite=2  (solo primeros 2, para debug)
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { createWorker } from "tesseract.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const CACHE = path.join(RAIZ, "data", "remuneraciones-pdfs");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "remuneraciones-ocr.generated.ts");

const args = new Map(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? "true"] : [a, "true"];
  })
);
const LIMITE = args.has("limite") ? Number(args.get("limite")) : null;
const ESCALA = Number(args.get("escala") ?? "2.5");

// ---------- carga del catálogo (PDFs escaneados) ---------------------------

const catalogoPath = path.join(RAIZ, "src", "lib", "data", "remuneraciones-detalle.generated.ts");
const catalogoSrc = await readFile(catalogoPath, "utf8");
const matchArr = catalogoSrc.match(/remuneracionesDetalle: RemuneracionDetalle\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
if (!matchArr) throw new Error("No pude leer remuneraciones-detalle.generated.ts");
const detalle = JSON.parse(matchArr[1]);
let escaneados = detalle.filter(
  (d) => !d.parseado && /sin texto digital/.test(d.error ?? "")
);
if (LIMITE) escaneados = escaneados.slice(0, LIMITE);

console.log(`→ ${escaneados.length} PDFs escaneados a procesar (escala=${ESCALA})`);

// ---------- pdfjs (legacy build para Node) --------------------------------

const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

// CanvasFactory que devuelve un canvas de @napi-rs/canvas en lugar de DOM canvas.
// pdfjs-dist 4.x espera la clase (no la instancia) en el opt CanvasFactory.
class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
  }
}

async function pdfPaginaAPng(buf, escala) {
  const doc = await getDocument({
    data: new Uint8Array(buf),
    useSystemFonts: true,
    isEvalSupported: false,
    CanvasFactory: NodeCanvasFactory,
  }).promise;
  const pngsPorPagina = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: escala });
    const factory = new NodeCanvasFactory();
    const cc = factory.create(viewport.width, viewport.height);
    await page.render({ canvasContext: cc.context, viewport }).promise;
    pngsPorPagina.push(cc.canvas.toBuffer("image/png"));
  }
  return pngsPorPagina;
}

// ---------- parser de filas (idéntico al de parsear-remuneraciones.mjs) ----

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
  if (montosCandidatos.length < 3) return { etiqueta, montos: [], modoLegacy: false };
  const primerNumero = linea.match(/\b(\d{1,4})\b/);
  let montos = montosCandidatos;
  if (primerNumero && Number(primerNumero[1]) <= 9999 && montos[0] === Number(primerNumero[1])) {
    montos = montos.slice(1);
  }
  if (montos.length < 2) return { etiqueta, montos: [], modoLegacy: false };
  return { etiqueta, montos, modoLegacy: true };
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

function pareceFuncionario(etiqueta) {
  if (!etiqueta) return false;
  const cleaned = etiqueta.replace(/[\.\:]/g, " ").trim();
  if (cleaned.length < 4) return false;
  const palabras = cleaned.split(/\s+/);
  if (palabras.length < 1 || palabras.length > 16) return false;
  if (!palabras.some((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p))) return false;
  return true;
}

function extraerFuncionarios(textoOcr) {
  // El OCR devuelve texto plano por líneas; las separamos.
  const lineas = textoOcr.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
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
    if (esCabeceraOTitulo(etiqueta) || etiqueta.length < 3) continue;

    let bruto = null, desc = null, neto = null;
    if (modoLegacy) {
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
    filas.push({ etiqueta: cargoYNombre, bruto, descuentos: desc, neto, ocrNoVerificado: true });
  }
  return filas;
}

// ---------- main -----------------------------------------------------------

console.log("→ Inicializando worker de Tesseract (idioma: spa)…");
const worker = await createWorker("spa", undefined, {
  logger: () => {}, // silencioso
});

const resultados = [];
let i = 0;
for (const item of escaneados) {
  i++;
  const tag = `[${i}/${escaneados.length}] ${item.label}`;
  try {
    const fname = item.urlPdf.split("/").pop();
    const pdfPath = path.join(CACHE, fname);
    if (!existsSync(pdfPath)) throw new Error(`PDF no está en cache: ${fname}`);
    const buf = await readFile(pdfPath);
    const pngs = await pdfPaginaAPng(buf, ESCALA);
    let textoTotal = "";
    for (const png of pngs) {
      const { data } = await worker.recognize(png);
      textoTotal += "\n" + (data.text ?? "");
    }
    const filas = extraerFuncionarios(textoTotal);
    if (filas.length === 0) {
      resultados.push({
        ...item,
        ocrAplicado: true,
        cantidadFilas: 0,
        filas: [],
        error: "OCR aplicado pero sin filas válidas detectadas",
      });
      console.log(tag, "✗ 0 filas tras OCR");
    } else {
      resultados.push({
        ...item,
        ocrAplicado: true,
        cantidadFilas: filas.length,
        filas,
      });
      console.log(tag, "✓", filas.length, "filas (OCR)");
    }
  } catch (e) {
    resultados.push({
      ...item,
      ocrAplicado: true,
      cantidadFilas: 0,
      filas: [],
      error: e?.message ?? String(e),
    });
    console.log(tag, "✗", e?.message ?? String(e));
  }
}

await worker.terminate();

const ok = resultados.filter((r) => r.cantidadFilas > 0).length;
const totalFilas = resultados.reduce((acc, r) => acc + r.cantidadFilas, 0);
console.log(`\n✓ Cobertura OCR: ${ok}/${resultados.length} períodos con filas (${totalFilas} total)`);

const ahora = new Date().toISOString();
const ts = `// AUTO-GENERADO por scripts/ocr-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run ocr-remuneraciones
//
// Última extracción: ${ahora}
// PDFs procesados: ${resultados.length}
// Períodos con filas extraídas por OCR: ${ok}
// Filas totales (todas marcadas ocrNoVerificado: true): ${totalFilas}
//
// ⚠ ADVERTENCIA: estos datos provienen de OCR sobre PDFs escaneados.
// Tesseract puede confundir dígitos similares (8↔0, 1↔7, comas↔puntos).
// Antes de citar un monto, verificar contra el PDF original (urlPdf).

export type FilaOcr = {
  etiqueta: string;
  bruto: number | null;
  descuentos: number | null;
  neto: number | null;
  ocrNoVerificado: true;
};

export type RemuneracionDetalleOcr = {
  periodo: string;
  anio: number | null;
  mes: number | null;
  sac: boolean;
  label: string;
  urlPdf: string;
  ocrAplicado: true;
  cantidadFilas: number;
  filas: FilaOcr[];
  /** Campo heredado del catálogo de origen (siempre false; se conserva por compatibilidad). */
  parseado?: boolean;
  error?: string;
};

export const remuneracionesDetalleOcr: RemuneracionDetalleOcr[] = ${JSON.stringify(resultados, null, 2)};

export const remuneracionesOcrMeta = {
  generadoEl: ${JSON.stringify(ahora)},
  totalProcesados: ${resultados.length},
  conFilas: ${ok},
  filasTotales: ${totalFilas},
} as const;
`;

await writeFile(RUTA_TS, ts, "utf8");
console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
