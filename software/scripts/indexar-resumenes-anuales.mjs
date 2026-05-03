#!/usr/bin/env node
/**
 * Lee los Resúmenes Anuales del Concejo y genera un archivo TS estructurado
 * con el índice consultable: año, fecha de publicación, ruta local del PDF,
 * texto extraído y un fragmento inicial.
 *
 * Output: src/lib/data/resumenes-anuales.generated.ts
 *
 * Cuando se descarguen nuevos resúmenes y se procesen sus textos, este script
 * regenera el archivo. Idempotente.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "concejo");
const INDICE_PATH = path.join(DATA_DIR, "_indice.json");
const OUT_PATH = path.join(
  ROOT,
  "src",
  "lib",
  "data",
  "resumenes-anuales.generated.ts"
);

function detectarAnio(meta) {
  // Busca un año 4 dígitos en el nombre o en el texto del enlace
  const candidatos = [meta.nombreArchivo, meta.textoEnlace ?? ""];
  for (const c of candidatos) {
    const m = c.match(/(20\d{2})/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function fragmentoInicial(texto, max = 800) {
  if (!texto) return "";
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (limpio.length <= max) return limpio;
  // Cortar en el último punto antes del límite
  const cortado = limpio.slice(0, max);
  const idx = cortado.lastIndexOf(".");
  return (idx > max * 0.6 ? cortado.slice(0, idx + 1) : cortado) + "…";
}

function main() {
  if (!fs.existsSync(INDICE_PATH)) {
    console.error("No existe _indice.json. Corré primero: npm run descargar-pdfs");
    process.exit(1);
  }
  const indice = JSON.parse(fs.readFileSync(INDICE_PATH, "utf8"));
  const resumenes = indice.pdfs.filter((p) => p.categoria === "resumenes-anuales");

  console.log(`Encontrados ${resumenes.length} resúmenes anuales en el índice.`);

  const items = [];
  for (const meta of resumenes) {
    const anio = detectarAnio(meta);
    const rutaPdf = path.join(DATA_DIR, meta.rutaLocal);
    const rutaTxt = rutaPdf.replace(/\.pdf$/i, ".txt");

    let texto = null;
    let fragmento = null;
    if (fs.existsSync(rutaTxt)) {
      texto = fs.readFileSync(rutaTxt, "utf8");
      fragmento = fragmentoInicial(texto);
    }

    items.push({
      id: `resumen-${anio ?? "sf"}-${meta.nombreArchivo
        .replace(/[^A-Za-z0-9]+/g, "-")
        .toLowerCase()
        .slice(0, 50)}`,
      anio,
      titulo: meta.textoEnlace || meta.nombreArchivo,
      fechaPublicacion: meta.fechaContexto,
      urlOriginal: meta.urlOriginal,
      rutaLocalPdf: meta.rutaLocal,
      rutaLocalTxt: meta.rutaLocal.replace(/\.pdf$/i, ".txt"),
      tamanioBytes: meta.tamanioBytes,
      textoExtraido: !!meta.textoExtraido,
      fragmento
    });
  }

  // Ordenar por año desc
  items.sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));

  const ts = `/**
 * AUTO-GENERADO por scripts/indexar-resumenes-anuales.mjs
 * No editar a mano. Se regenera cada vez que se procesan nuevos PDFs.
 *
 * Última generación: ${new Date().toISOString()}
 * Total de resúmenes: ${items.length}
 */

export type ResumenAnual = {
  id: string;
  anio: number | null;
  titulo: string;
  fechaPublicacion: string | null;
  urlOriginal: string;
  rutaLocalPdf: string;
  rutaLocalTxt: string;
  tamanioBytes: number;
  textoExtraido: boolean;
  fragmento: string | null;
};

export const resumenesAnuales: ResumenAnual[] = ${JSON.stringify(
    items,
    null,
    2
  )};
`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, ts, "utf8");
  console.log(`Generado ${path.relative(ROOT, OUT_PATH)} con ${items.length} entradas.`);
  console.log(
    `Con texto extraído: ${items.filter((i) => i.textoExtraido).length}`
  );
}

main();
