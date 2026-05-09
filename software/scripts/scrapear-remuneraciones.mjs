#!/usr/bin/env node
/**
 * Scrapea el listado oficial de remuneraciones de funcionarios municipales y
 * genera un archivo TS estable con metadatos por PDF.
 *
 * Fuente:
 *   https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/
 *   remuneraciones-de-funcionarios-municipales/
 *
 * Salida:
 *   src/lib/data/remuneraciones.generated.ts
 *
 * Política de honestidad:
 *   - Sólo se enumeran PDFs que el Municipio publica HOY en su sitio oficial.
 *   - No se infieren ni inventan períodos: un PDF cuya url no permita extraer
 *     mes y año se etiqueta como "desconocido" y se reporta para revisión.
 *   - El parseo del CONTENIDO de los PDFs (sueldos individuales) es una etapa
 *     posterior y no se hace en este script.
 *
 * Uso:
 *   npm run scrapear-remuneraciones
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "remuneraciones.generated.ts");

const URL_LISTADO =
  "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/";

const MESES_TEXTO = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
  noviembre: 11, diciembre: 12,
};

const NOMBRES_MES = [
  "", "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function parsearUrl(urlPdf) {
  const slug = decodeURIComponent(urlPdf)
    .split("/")
    .pop()
    .toLowerCase()
    .replace(/\.pdf$/i, "");

  // SAC explícito
  const sac = /\bsac\b/.test(slug);

  // Intento 1: nombre del mes en texto
  let mes = null;
  for (const [nombre, n] of Object.entries(MESES_TEXTO)) {
    const re = new RegExp(`(^|[^a-z])${nombre}([^a-z]|$)`);
    if (re.test(slug)) {
      mes = n;
      break;
    }
  }

  // Intento de año desde el filename — preferimos el del filename, no el de la URL
  let anio = null;
  const anioM = slug.match(/(20\d{2})/);
  if (anioM) anio = Number(anioM[1]);

  // Intento 2: si no hay mes textual, patrones numéricos
  if (!mes) {
    // Casos: 01_-2026, -01-2026, _01_2026, 2025-06-, 2025_08_
    let m;
    if ((m = slug.match(/(20\d{2})[-_](\d{1,2})(?:[-_]|$)/))) {
      anio = Number(m[1]);
      mes = Number(m[2]);
    } else if ((m = slug.match(/(?:^|[-_])(\d{1,2})[-_](20\d{2})(?:[-_]|$)/))) {
      mes = Number(m[1]);
      anio = Number(m[2]);
    }
  }

  // Saneo: mes 1-12
  if (mes !== null && (mes < 1 || mes > 12)) mes = null;

  return { anio, mes, sac };
}

function deduplicar(items) {
  const vistos = new Map();
  for (const it of items) {
    if (!vistos.has(it.urlPdf)) vistos.set(it.urlPdf, it);
  }
  return [...vistos.values()];
}

async function main() {
  console.log("→ GET", URL_LISTADO);
  const res = await fetch(URL_LISTADO, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Sunchales Transparente · scraper público) AppleWebKit/537.36",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const html = await res.text();

  const links = [
    ...html.matchAll(/href=["']([^"']*\.pdf)["']/gi),
  ].map((m) => m[1]);

  const items = deduplicar(
    links.map((urlPdf) => {
      const { anio, mes, sac } = parsearUrl(urlPdf);
      const periodo =
        anio && mes
          ? `${anio}-${String(mes).padStart(2, "0")}${sac ? "-SAC" : ""}`
          : "desconocido";
      const label =
        anio && mes
          ? `${NOMBRES_MES[mes][0].toUpperCase()}${NOMBRES_MES[mes].slice(1)} ${anio}${sac ? " — SAC" : ""}`
          : urlPdf.split("/").pop() ?? urlPdf;
      return { periodo, anio, mes, sac, label, urlPdf };
    })
  );

  // Orden estable: año desc, mes desc, SAC al final del mes
  items.sort((a, b) => {
    const aa = a.anio ?? 0, ba = b.anio ?? 0;
    if (aa !== ba) return ba - aa;
    const am = a.mes ?? 0, bm = b.mes ?? 0;
    if (am !== bm) return bm - am;
    return Number(a.sac) - Number(b.sac);
  });

  const desconocidos = items.filter((i) => i.periodo === "desconocido");
  const conocidos = items.length - desconocidos.length;

  // Resumen por año
  const resumenAnios = {};
  for (const it of items) {
    if (!it.anio) continue;
    resumenAnios[it.anio] = (resumenAnios[it.anio] ?? 0) + 1;
  }

  console.log(`✓ ${items.length} PDFs detectados (${conocidos} con período identificado, ${desconocidos.length} sin período)`);
  console.log("Resumen por año:");
  for (const a of Object.keys(resumenAnios).sort()) {
    console.log(`  ${a}: ${resumenAnios[a]} PDFs`);
  }
  if (desconocidos.length > 0) {
    console.log("⚠ PDFs sin período identificable (revisar parser):");
    for (const d of desconocidos) console.log("  -", d.urlPdf);
  }

  const ahora = new Date().toISOString();
  const ts = `// AUTO-GENERADO por scripts/scrapear-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-remuneraciones
//
// Fuente oficial:
// ${URL_LISTADO}
//
// Última sincronización: ${ahora}
// Total PDFs detectados: ${items.length}
// Cobertura: ${Math.min(...Object.keys(resumenAnios).map(Number))} – ${Math.max(...Object.keys(resumenAnios).map(Number))}

export type RemuneracionPdf = {
  /** Identificador estable del período. Formato YYYY-MM o YYYY-MM-SAC. "desconocido" si no se pudo parsear. */
  periodo: string;
  /** Año (calendario) si pudo extraerse del filename. */
  anio: number | null;
  /** Mes (1-12) si pudo extraerse del filename. */
  mes: number | null;
  /** True si el PDF corresponde al SAC (medio aguinaldo). */
  sac: boolean;
  /** Etiqueta legible para mostrar en UI. */
  label: string;
  /** URL pública directa al PDF en sunchales.gob.ar. */
  urlPdf: string;
};

export const remuneracionesPdfs: RemuneracionPdf[] = ${JSON.stringify(items, null, 2)};

export const remuneracionesMeta = {
  fuenteUrl: ${JSON.stringify(URL_LISTADO)},
  sincronizadoEl: ${JSON.stringify(ahora)},
  total: ${items.length},
  conPeriodoIdentificado: ${conocidos},
  sinPeriodo: ${desconocidos.length},
  porAnio: ${JSON.stringify(resumenAnios, null, 2)},
} as const;
`;

  await writeFile(RUTA_TS, ts, "utf8");
  console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
