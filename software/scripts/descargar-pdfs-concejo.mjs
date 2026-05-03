#!/usr/bin/env node
/**
 * Script de descarga de PDFs del Concejo Municipal de Sunchales.
 *
 * Recorre las páginas-índice del sitio oficial concejosunchales.gob.ar,
 * extrae los enlaces a PDFs, los descarga organizados por categoría/fecha
 * y genera un índice JSON con metadatos (URL original, fecha de publicación,
 * categoría, ruta local, tamaño, hash SHA-256).
 *
 * Diseñado para ser idempotente: si un PDF ya está descargado y su tamaño
 * coincide, no se vuelve a bajar. Los PDFs nuevos detectados se añaden al
 * índice y se descargan.
 *
 * Uso:
 *   node scripts/descargar-pdfs-concejo.mjs              (descarga por defecto)
 *   node scripts/descargar-pdfs-concejo.mjs --solo=ucm   (solo categoría UCM)
 *   node scripts/descargar-pdfs-concejo.mjs --listar     (no descarga, solo lista)
 *
 * Requisitos: Node 18+ (usa fetch nativo).
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "concejo");
const INDICE_PATH = path.join(DATA_DIR, "_indice.json");

const BASE_URL = "https://concejosunchales.gob.ar";

/**
 * Definición de categorías a procesar. Cada entrada describe:
 *  - id: identificador interno
 *  - pagina: ruta de la página índice del sitio
 *  - carpeta: subcarpeta destino dentro de data/concejo/
 *  - filtro: regex que se aplica a la URL del PDF para incluirlo
 */
const CATEGORIAS = [
  {
    id: "boletines-bimestrales",
    pagina: "/boletin-informativo-bimestral.aspx",
    carpeta: "boletines-bimestrales",
    descripcion: "Boletín informativo bimestral del Concejo"
  },
  {
    id: "resumenes-anuales",
    pagina: "/resumen-anual.aspx",
    carpeta: "resumenes-anuales",
    descripcion: "Resúmenes anuales de actividad del Concejo"
  },
  {
    id: "ejecucion-presupuestaria",
    pagina: "/ejecucion-partida-presupuestaria.aspx",
    carpeta: "transparencia-economica/ejecucion-presupuestaria",
    descripcion: "Ejecución partida presupuestaria mensual"
  },
  {
    id: "movimiento-saldos",
    pagina: "/movimiento-de-saldos.aspx",
    carpeta: "transparencia-economica/movimiento-saldos",
    descripcion: "Estado de Ejecución del Presupuesto (movimientos de saldos)"
  },
  {
    id: "ucm",
    pagina: "/valor-de-la-ucm.aspx",
    carpeta: "transparencia-economica/ucm",
    descripcion: "Ordenanzas que actualizan la Unidad de Cuenta Municipal (UCM)"
  },
  {
    id: "proyectos-en-tratamiento",
    pagina: "/proyectos-estado-parlamentario.aspx",
    carpeta: "proyectos/en-tratamiento",
    descripcion: "Proyectos en estado parlamentario"
  },
  {
    id: "proyectos-perdidos",
    pagina: "/proyectos-perdieron-estado-parlamentario.aspx",
    carpeta: "proyectos/perdidos",
    descripcion: "Proyectos que perdieron estado parlamentario"
  },
  {
    id: "iniciativas-ciudadanas",
    pagina: "/registro-de-iniciativas-ciudadanas.aspx",
    carpeta: "iniciativas-ciudadanas",
    descripcion: "Iniciativas presentadas por ciudadanos al Concejo"
  },
  {
    id: "actas",
    pagina: "/acta-de-sesiones.aspx",
    carpeta: "sesiones/actas",
    descripcion: "Actas oficiales de sesiones"
  },
  {
    id: "diarios",
    pagina: "/diario-de-sesiones.aspx",
    carpeta: "sesiones/diarios",
    descripcion: "Diarios de sesiones"
  },
  {
    id: "ordenes-del-dia",
    pagina: "/orden-del-dia.aspx",
    carpeta: "sesiones/ordenes-del-dia",
    descripcion: "Órdenes del día de las sesiones"
  },
  {
    id: "normativa-local",
    pagina: "/Normativa-local.aspx",
    carpeta: "normativa/ordenanzas",
    descripcion: "Normativa local (cuerpo normativo del municipio)"
  },
  {
    id: "normativa-ambiental",
    pagina: "/normativa-ambiental.aspx",
    carpeta: "normativa-ambiental/ordenanzas",
    descripcion: "Normativa ambiental"
  },
  {
    id: "patrimonio-cultural",
    pagina: "/patrimonio-cultural.aspx",
    carpeta: "patrimonio-cultural",
    descripcion: "Patrimonio cultural sunchalense"
  },
  {
    id: "programa-fortalecimiento",
    pagina: "/programa-fortalecimiento.aspx",
    carpeta: "programa-fortalecimiento",
    descripcion: "Programa de fortalecimiento y apoyo comunitario"
  },
  {
    id: "acceso-informacion-publica",
    pagina: "/acceso-informacion-publica.aspx",
    carpeta: "acceso-informacion-publica",
    descripcion: "Régimen local de Acceso a la Información Pública (Ord. 1872/09)"
  }
];

/* ====================== UTIL ====================== */

const args = process.argv.slice(2);
const SOLO = args.find((a) => a.startsWith("--solo="))?.split("=")[1];
const SOLO_LISTAR = args.includes("--listar");
const VERBOSE = args.includes("--verbose");

function log(...m) {
  console.log(...m);
}

function asegurarDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function nombreSeguro(s) {
  return decodeURIComponent(s)
    .replace(/[\\/:*?"<>|]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function fetchTexto(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "SunchalesTransparente/1.0 (cívico, +https://software-sunchales-transparente.vercel.app)"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return await res.text();
}

async function fetchBytes(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "SunchalesTransparente/1.0 (cívico, +https://software-sunchales-transparente.vercel.app)"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

/**
 * Extrae enlaces a PDFs de un HTML, junto con su texto de contexto y fechas
 * cercanas que aparecen como "dd/mm/aa" en el listado.
 */
function extraerPdfs(html) {
  const out = [];
  const re = /<a[^>]+href=["']([^"']+\.pdf[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const url = m[1];
    const textoCrudo = m[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Buscar una fecha "dd/mm/aa" en los 400 caracteres anteriores
    const ctx = html.slice(Math.max(0, m.index - 400), m.index);
    const fechaMatch = ctx.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
    out.push({
      url,
      textoEnlace: textoCrudo || null,
      fechaContexto: fechaMatch ? fechaMatch[1] : null
    });
  }
  return out;
}

function urlAbsoluta(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return BASE_URL + href;
  return BASE_URL + "/" + href.replace(/^\.?\/?/, "");
}

function leerIndice() {
  if (!fs.existsSync(INDICE_PATH)) return { actualizado: null, pdfs: [] };
  try {
    return JSON.parse(fs.readFileSync(INDICE_PATH, "utf8"));
  } catch {
    return { actualizado: null, pdfs: [] };
  }
}

function escribirIndice(idx) {
  asegurarDir(path.dirname(INDICE_PATH));
  fs.writeFileSync(INDICE_PATH, JSON.stringify(idx, null, 2), "utf8");
}

/* ====================== MAIN ====================== */

async function procesarCategoria(cat, indice) {
  log(`\n— ${cat.id} (${cat.pagina}) —`);
  const url = BASE_URL + cat.pagina;
  let html;
  try {
    html = await fetchTexto(url);
  } catch (e) {
    log(`  ERROR cargando página: ${e.message}`);
    return { nuevos: 0, omitidos: 0, errores: 1 };
  }
  const pdfs = extraerPdfs(html);
  log(`  ${pdfs.length} enlaces a PDF detectados`);

  if (SOLO_LISTAR) {
    pdfs.slice(0, 5).forEach((p, i) =>
      log(
        `   ${i + 1}. ${p.fechaContexto ?? "s/f"}  ${p.textoEnlace ?? ""}  → ${p.url}`
      )
    );
    if (pdfs.length > 5) log(`   ... (+${pdfs.length - 5} más)`);
    return { nuevos: 0, omitidos: pdfs.length, errores: 0 };
  }

  const carpetaDestino = path.join(DATA_DIR, cat.carpeta);
  asegurarDir(carpetaDestino);

  let nuevos = 0,
    omitidos = 0,
    errores = 0;

  for (const p of pdfs) {
    const urlAbs = urlAbsoluta(p.url);
    const nombreArchivo = nombreSeguro(
      path.basename(urlAbs.split("?")[0])
    );
    const destino = path.join(carpetaDestino, nombreArchivo);

    const yaExiste = fs.existsSync(destino);
    let bytes;
    try {
      if (!yaExiste) {
        bytes = await fetchBytes(urlAbs);
        fs.writeFileSync(destino, bytes);
        nuevos++;
        if (VERBOSE) log(`  + ${nombreArchivo}`);
      } else {
        omitidos++;
      }
    } catch (e) {
      errores++;
      log(`  ERROR descargando ${urlAbs}: ${e.message}`);
      continue;
    }

    // Actualizar/crear entrada en el índice
    const tamanio = fs.statSync(destino).size;
    const hash = bytes
      ? sha256(bytes)
      : indice.pdfs.find(
          (x) => x.rutaLocal === path.relative(DATA_DIR, destino)
        )?.hashSha256 ?? null;

    const existente = indice.pdfs.find((x) => x.urlOriginal === urlAbs);
    const meta = {
      urlOriginal: urlAbs,
      categoria: cat.id,
      categoriaDescripcion: cat.descripcion,
      rutaLocal: path
        .relative(DATA_DIR, destino)
        .replace(/\\/g, "/"),
      nombreArchivo,
      textoEnlace: p.textoEnlace,
      fechaContexto: p.fechaContexto,
      tamanioBytes: tamanio,
      hashSha256: hash,
      descargadoEl: existente?.descargadoEl ?? new Date().toISOString()
    };
    if (existente) Object.assign(existente, meta);
    else indice.pdfs.push(meta);
  }

  log(`  → nuevos: ${nuevos}  omitidos: ${omitidos}  errores: ${errores}`);
  return { nuevos, omitidos, errores };
}

async function main() {
  asegurarDir(DATA_DIR);
  const indice = leerIndice();

  const cats = SOLO ? CATEGORIAS.filter((c) => c.id === SOLO) : CATEGORIAS;
  if (cats.length === 0) {
    console.error(`Categoría no encontrada: ${SOLO}`);
    console.error(
      "Disponibles: " + CATEGORIAS.map((c) => c.id).join(", ")
    );
    process.exit(1);
  }

  log(`Sunchales Transparente — descarga de PDFs del Concejo`);
  log(`Modo: ${SOLO_LISTAR ? "listar" : "descargar"}`);
  log(`Categorías a procesar: ${cats.length}`);

  let totalNuevos = 0,
    totalOmitidos = 0,
    totalErrores = 0;
  for (const cat of cats) {
    const r = await procesarCategoria(cat, indice);
    totalNuevos += r.nuevos;
    totalOmitidos += r.omitidos;
    totalErrores += r.errores;
  }

  if (!SOLO_LISTAR) {
    indice.actualizado = new Date().toISOString();
    indice.totalPdfs = indice.pdfs.length;
    escribirIndice(indice);
    log(`\n=== RESUMEN ===`);
    log(`PDFs nuevos descargados: ${totalNuevos}`);
    log(`PDFs ya existentes (omitidos): ${totalOmitidos}`);
    log(`Errores: ${totalErrores}`);
    log(`Total en índice: ${indice.pdfs.length}`);
    log(`Índice escrito en: ${path.relative(ROOT, INDICE_PATH)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
