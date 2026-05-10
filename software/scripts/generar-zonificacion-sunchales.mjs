#!/usr/bin/env node
/**
 * Generar src/lib/data/sunchales-manzanas.generated.ts a partir del
 * shapefile oficial del IPEC Santa Fe (Planta Urbana Sunchales — Censo 2022).
 *
 * Uso:
 *   1. Instalar deps (una sola vez): npm install --save-dev shpjs proj4
 *   2. Correr: node scripts/generar-zonificacion-sunchales.mjs
 *
 * Fuente: https://www.santafe.gov.ar/ipecinformes/uploads/planta/SUNCHALES.zip
 *   m0171.shp → manzanas (con flag ESPVERDE)
 *   r0171.shp → radios censales (Fracción/Radio 2020 y 2010)
 *
 * Reproyecta de POSGAR 1994 Argentina Zone 5 (EPSG:22185) a WGS84
 * (EPSG:4326) y guarda la geometría como módulo TS importable estáticamente.
 *
 * Si IPEC publica una versión más reciente, sólo regenerar este archivo.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const { parseShp, parseDbf } = await import("shpjs/lib/index.js");
const proj4 = (await import("proj4")).default;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(
  REPO_ROOT,
  "src",
  "lib",
  "data",
  "sunchales-manzanas.generated.ts"
);

const IPEC_URL =
  "https://www.santafe.gov.ar/ipecinformes/uploads/planta/SUNCHALES.zip";

// POSGAR 1994 Argentina Zone 5 (EPSG:22185, en proj4-string)
const POSGAR_Z5 =
  "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
proj4.defs("POSGAR_Z5", POSGAR_Z5);
const toWgs = proj4("POSGAR_Z5", "WGS84");

function reproject(coords) {
  if (typeof coords[0] === "number") {
    const [x, y] = toWgs.forward(coords);
    return [Number(x.toFixed(6)), Number(y.toFixed(6))];
  }
  return coords.map(reproject);
}

function processLayer(stem, workdir) {
  const shpBuf = fs.readFileSync(path.join(workdir, `${stem}.shp`));
  const dbfBuf = fs.readFileSync(path.join(workdir, `${stem}.dbf`));
  const geoms = parseShp(shpBuf);
  const props = parseDbf(dbfBuf);
  return geoms.map((g, i) => ({
    type: "Feature",
    properties: props[i],
    geometry: { type: g.type, coordinates: reproject(g.coordinates) },
  }));
}

function bbox(features) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const visit = (c) => {
    if (typeof c[0] === "number") {
      if (c[0] < minX) minX = c[0];
      if (c[0] > maxX) maxX = c[0];
      if (c[1] < minY) minY = c[1];
      if (c[1] > maxY) maxY = c[1];
    } else {
      c.forEach(visit);
    }
  };
  for (const f of features) visit(f.geometry.coordinates);
  return [minX, minY, maxX, maxY];
}

async function main() {
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "zonif-sunchales-"));
  console.log(`Workdir: ${workdir}`);

  // Descargar ZIP
  const zipPath = path.join(workdir, "SUNCHALES.zip");
  console.log(`Bajando ${IPEC_URL} ...`);
  execSync(`curl -sSL -o "${zipPath}" "${IPEC_URL}"`, { stdio: "inherit" });

  // Descomprimir
  execSync(`unzip -o "${zipPath}" -d "${workdir}"`, { stdio: "inherit" });

  // Procesar layers
  const manzanas = processLayer("m0171", workdir);
  const radios = processLayer("r0171", workdir);
  const bMz = bbox(manzanas);
  const bRd = bbox(radios);

  console.log(`Manzanas: ${manzanas.length} polígonos`);
  console.log(`Radios:   ${radios.length} polígonos`);
  console.log(`Bbox manzanas: [${bMz.join(", ")}]`);
  console.log(`Bbox radios:   [${bRd.join(", ")}]`);

  const manzanasSlim = manzanas.map((f, i) => ({
    id: i,
    espacioVerde: f.properties.ESPVERDE === 1,
    geometry: f.geometry,
  }));
  const radiosSlim = radios.map((f, i) => ({
    id: i,
    frac2020: String(f.properties.FRAC2020 ?? ""),
    rad2020: String(f.properties.RAD2020 ?? ""),
    frac2010: String(f.properties.FRAC2010 ?? ""),
    rad2010: String(f.properties.RAD2010 ?? ""),
    geometry: f.geometry,
  }));

  const fecha = new Date().toISOString().slice(0, 10);
  const out =
`/**
 * Manzanas y radios censales de Sunchales — geometría generada.
 *
 * Fuente: IPEC Santa Fe — Planta Urbana Sunchales (Censo 2022).
 * Archivo origen: ${IPEC_URL}
 *   - m0171.shp → manzanas (${manzanasSlim.length} polígonos)
 *   - r0171.shp → radios censales (${radiosSlim.length} polígonos)
 *
 * CRS origen: POSGAR 1994 Argentina Zone 5 (EPSG:22185 — Transverse Mercator,
 * meridiano central -60°, False Easting 5500000).
 * Reproyectado a WGS84 (EPSG:4326) con proj4js (precisión 6 decimales).
 *
 * Generado por scripts/generar-zonificacion-sunchales.mjs el ${fecha}.
 *
 * NO editar manualmente — regenerar con npm run generar-zonificacion-sunchales.
 *
 * Bbox WGS84 manzanas: [${bMz.map((n) => n.toFixed(6)).join(", ")}]
 * Bbox WGS84 radios:   [${bRd.map((n) => n.toFixed(6)).join(", ")}]
 */

export type ManzanaGeo = {
  id: number;
  /** ESPVERDE = 1 en el dbf IPEC → espacio verde / plaza */
  espacioVerde: boolean;
  geometry: { type: "Polygon"; coordinates: number[][][] };
};

export type RadioCensalGeo = {
  id: number;
  /** Fracción y radio del Censo 2020 */
  frac2020: string;
  rad2020: string;
  /** Fracción y radio del Censo 2010 (compatibilidad histórica) */
  frac2010: string;
  rad2010: string;
  geometry: { type: "Polygon"; coordinates: number[][][] };
};

export const manzanas: ManzanaGeo[] = ${JSON.stringify(manzanasSlim)};

export const radios: RadioCensalGeo[] = ${JSON.stringify(radiosSlim)};

export const bboxManzanas = [${bMz.join(", ")}] as const;
export const bboxRadios = [${bRd.join(", ")}] as const;

// Centroide aproximado del bbox manzanas, útil para linkear visualizadores
// externos (IDESF, OSM) centrados en Sunchales.
export const centroSunchales = {
  lng: ${((bMz[0] + bMz[2]) / 2).toFixed(6)},
  lat: ${((bMz[1] + bMz[3]) / 2).toFixed(6)},
} as const;
`;

  fs.writeFileSync(OUTPUT_PATH, out);
  const sz = fs.statSync(OUTPUT_PATH).size;
  console.log(`OK — escrito ${OUTPUT_PATH} (${sz} bytes)`);
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
