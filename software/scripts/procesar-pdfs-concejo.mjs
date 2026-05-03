#!/usr/bin/env node
/**
 * Extrae el texto plano de cada PDF descargado y lo guarda como `.txt` al lado.
 *
 * - Idempotente: si el `.txt` ya existe y es más nuevo que el `.pdf`, lo saltea.
 * - Recorre `data/concejo/` recursivamente.
 * - Actualiza el índice `_indice.json` agregando el flag `textoExtraido` y el
 *   `tamanioTextoBytes` para cada PDF procesado.
 * - Usa `pdfjs-dist/legacy` (no requiere worker en Node).
 *
 * Uso:
 *   node scripts/procesar-pdfs-concejo.mjs                  (procesa todos)
 *   node scripts/procesar-pdfs-concejo.mjs --solo=resumenes-anuales
 *   node scripts/procesar-pdfs-concejo.mjs --limite=20
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "concejo");
const INDICE_PATH = path.join(DATA_DIR, "_indice.json");

const args = process.argv.slice(2);
const SOLO = args.find((a) => a.startsWith("--solo="))?.split("=")[1];
const LIMITE = parseInt(
  args.find((a) => a.startsWith("--limite="))?.split("=")[1] ?? "0",
  10
);

function log(...m) {
  console.log(...m);
}

function leerIndice() {
  if (!fs.existsSync(INDICE_PATH)) return { actualizado: null, pdfs: [] };
  return JSON.parse(fs.readFileSync(INDICE_PATH, "utf8"));
}

function escribirIndice(idx) {
  fs.writeFileSync(INDICE_PATH, JSON.stringify(idx, null, 2), "utf8");
}

async function extraerTexto(rutaPdf) {
  // Carga lazy de pdfjs-dist para que el script falle con mensaje claro si
  // la dependencia no está instalada.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(rutaPdf));
  const loadingTask = pdfjs.getDocument({
    data,
    disableFontFace: true,
    useSystemFonts: false
  });
  const pdf = await loadingTask.promise;
  const partes = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const linea = content.items
      .map((it) => ("str" in it ? it.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (linea) partes.push(linea);
  }
  await pdf.destroy();
  return partes.join("\n\n");
}

async function main() {
  if (!fs.existsSync(INDICE_PATH)) {
    log(`No existe ${INDICE_PATH}. Corré primero: npm run descargar-pdfs`);
    process.exit(1);
  }
  const indice = leerIndice();

  let candidatos = indice.pdfs.slice();
  if (SOLO) candidatos = candidatos.filter((p) => p.categoria === SOLO);
  if (LIMITE > 0) candidatos = candidatos.slice(0, LIMITE);

  log(`Procesando ${candidatos.length} PDFs${SOLO ? ` (solo ${SOLO})` : ""}...`);

  let extraidos = 0,
    yaEstaban = 0,
    errores = 0;

  for (const meta of candidatos) {
    const rutaPdf = path.join(DATA_DIR, meta.rutaLocal);
    const rutaTxt = rutaPdf.replace(/\.pdf$/i, ".txt");

    if (!fs.existsSync(rutaPdf)) {
      // El índice referencia un PDF que no está en disco
      continue;
    }

    // ¿El .txt ya existe y es más nuevo que el .pdf?
    if (fs.existsSync(rutaTxt)) {
      const txtMtime = fs.statSync(rutaTxt).mtimeMs;
      const pdfMtime = fs.statSync(rutaPdf).mtimeMs;
      if (txtMtime >= pdfMtime) {
        meta.textoExtraido = true;
        meta.tamanioTextoBytes = fs.statSync(rutaTxt).size;
        yaEstaban++;
        continue;
      }
    }

    try {
      const texto = await extraerTexto(rutaPdf);
      fs.writeFileSync(rutaTxt, texto, "utf8");
      meta.textoExtraido = true;
      meta.tamanioTextoBytes = Buffer.byteLength(texto, "utf8");
      extraidos++;
      if (extraidos % 10 === 0) log(`  · ${extraidos} extraídos...`);
    } catch (e) {
      errores++;
      meta.textoExtraido = false;
      meta.errorExtraccion = e.message?.slice(0, 200);
      log(`  ERROR ${meta.nombreArchivo}: ${e.message}`);
    }
  }

  indice.procesado = new Date().toISOString();
  indice.totalConTexto = indice.pdfs.filter((p) => p.textoExtraido).length;
  escribirIndice(indice);

  log(`\n=== RESUMEN ===`);
  log(`Extraídos en esta corrida: ${extraidos}`);
  log(`Ya estaban procesados: ${yaEstaban}`);
  log(`Errores: ${errores}`);
  log(`Total con texto en el índice: ${indice.totalConTexto} de ${indice.pdfs.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
