#!/usr/bin/env node
/**
 * Descarga los PDFs de las normas del digesto del Concejo Municipal
 * (concejosunchales.gob.ar) y extrae su TEXTO COMPLETO a archivos .txt
 * para que el indexer RAG los vectorice.
 *
 * - Lee el listado desde data/sincronizado/digesto-concejo.json
 *   (correr antes: npm run sincronizar-datos).
 * - Salida: data/digesto-concejo-textos/{idDigesto}.txt + _indice.json
 *   (estado por norma: ok | sin-texto | sin-pdf | error).
 * - Idempotente: no re-descarga lo que ya tiene estado ok o sin-texto.
 * - "sin-texto" = el PDF no tiene capa de texto (escaneado viejo); esos
 *   requeririan OCR real y se omiten por ahora (quedan registrados).
 * - El PDF NO se commitea (solo el .txt); .vercelignore ya excluye *.txt.
 *
 * Uso:
 *   node scripts/descargar-textos-digesto-concejo.mjs                 (default --desde=2024)
 *   node scripts/descargar-textos-digesto-concejo.mjs --desde=2020 --hasta=2023
 *   node scripts/descargar-textos-digesto-concejo.mjs --limite=10    (debug)
 *   node scripts/descargar-textos-digesto-concejo.mjs --reintentar   (reprocesa errores)
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_JSON = path.join(RAIZ, "data", "sincronizado", "digesto-concejo.json");
const DEST_DIR = path.join(RAIZ, "data", "digesto-concejo-textos");
const INDICE_PATH = path.join(DEST_DIR, "_indice.json");

const args = new Map(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? "true"] : [a, "true"];
  })
);
const DESDE = Number(args.get("desde") ?? "2024");
const HASTA = Number(args.get("hasta") ?? "2100");
const LIMITE = Number(args.get("limite") ?? "0");
const PAUSA_MS = Number(args.get("pausa") ?? "400");
const REINTENTAR = args.has("reintentar");

const log = (...m) => console.log(...m);
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

function leerIndice() {
  if (!fs.existsSync(INDICE_PATH)) return { actualizado: null, normas: {} };
  return JSON.parse(fs.readFileSync(INDICE_PATH, "utf8"));
}

async function extraerTextoPdf(buffer) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(buffer),
    disableFontFace: true,
    useSystemFonts: false
  });
  const pdf = await loadingTask.promise;
  const partes = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    partes.push(content.items.map((it) => it.str).join(" "));
  }
  const texto = partes.join("\n\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { texto, paginas: pdf.numPages };
}

async function main() {
  if (!fs.existsSync(RUTA_JSON)) {
    console.error("Falta data/sincronizado/digesto-concejo.json — corre `npm run sincronizar-datos` primero.");
    process.exit(1);
  }
  fs.mkdirSync(DEST_DIR, { recursive: true });

  const { normas } = JSON.parse(fs.readFileSync(RUTA_JSON, "utf8"));
  const indice = leerIndice();

  const candidatas = normas.filter((n) =>
    n.anio !== null && n.anio >= DESDE && n.anio <= HASTA
  );
  log(`Digesto Concejo → textos: ${candidatas.length} normas en rango ${DESDE}-${HASTA === 2100 ? "hoy" : HASTA}`);

  let procesadas = 0, ok = 0, sinTexto = 0, sinPdf = 0, errores = 0, saltadas = 0;

  for (const n of candidatas) {
    if (LIMITE && procesadas >= LIMITE) break;

    const prev = indice.normas[n.idDigesto];
    const estadosFirmes = REINTENTAR ? ["ok", "sin-texto"] : ["ok", "sin-texto", "sin-pdf", "error"];
    if (prev && estadosFirmes.includes(prev.estado)) { saltadas++; continue; }
    // Si el .txt ya existe (corrida anterior interrumpida antes de guardar el
    // indice), lo damos por hecho y solo regularizamos el indice.
    const rutaTxt = path.join(DEST_DIR, `${n.idDigesto}.txt`);
    if (!REINTENTAR && fs.existsSync(rutaTxt)) {
      const chars = fs.statSync(rutaTxt).size;
      indice.normas[n.idDigesto] = { estado: "ok", titulo: n.titulo, anio: n.anio, chars, regularizado: true };
      fs.writeFileSync(INDICE_PATH, JSON.stringify(indice, null, 2), "utf8");
      saltadas++;
      continue;
    }

    procesadas++;

    if (!n.urlPdf) {
      indice.normas[n.idDigesto] = { estado: "sin-pdf", titulo: n.titulo, anio: n.anio };
      sinPdf++;
      continue;
    }

    try {
      const res = await fetch(n.urlPdf, {
        headers: { "User-Agent": "Mozilla/5.0 (Sunchales Transparente · indexador de normativa publica)" }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      const pdfBytes = buffer.byteLength;
      const sha256Pdf = crypto.createHash("sha256").update(new Uint8Array(buffer)).digest("hex").slice(0, 16);
      // pdfjs transfiere (y "desconecta") el ArrayBuffer que recibe: le pasamos
      // una copia sacrificable y conservamos los metadatos calculados antes.
      const { texto, paginas } = await extraerTextoPdf(buffer.slice(0));

      if (texto.length < 80) {
        // PDF escaneado sin capa de texto: requeriria OCR. Lo registramos y seguimos.
        indice.normas[n.idDigesto] = {
          estado: "sin-texto", titulo: n.titulo, anio: n.anio, paginas,
          pdfBytes
        };
        sinTexto++;
        log(`  [sin-texto] ${n.titulo} (${paginas} pag, probablemente escaneado)`);
      } else {
        fs.writeFileSync(path.join(DEST_DIR, `${n.idDigesto}.txt`), texto, "utf8");
        indice.normas[n.idDigesto] = {
          estado: "ok", titulo: n.titulo, anio: n.anio, paginas,
          chars: texto.length,
          sha256Pdf,
          extraidoEl: new Date().toISOString()
        };
        ok++;
        log(`  [ok] ${n.titulo} → ${texto.length.toLocaleString()} chars (${paginas} pag)`);
      }
    } catch (err) {
      indice.normas[n.idDigesto] = { estado: "error", titulo: n.titulo, anio: n.anio, error: String(err.message).slice(0, 120) };
      errores++;
      log(`  [error] ${n.titulo}: ${err.message}`);
    }

    // Persistir el indice tras cada norma: si el proceso se interrumpe
    // (timeout de CI, corte de red), no se pierde el progreso.
    indice.actualizado = new Date().toISOString();
    fs.writeFileSync(INDICE_PATH, JSON.stringify(indice, null, 2), "utf8");
    await pausa(PAUSA_MS);
  }

  indice.actualizado = new Date().toISOString();
  fs.writeFileSync(INDICE_PATH, JSON.stringify(indice, null, 2), "utf8");

  log(`\nResumen: ${procesadas} procesadas | ${ok} con texto | ${sinTexto} sin capa de texto | ${sinPdf} sin PDF | ${errores} errores | ${saltadas} ya hechas`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
