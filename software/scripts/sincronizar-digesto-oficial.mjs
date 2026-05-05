#!/usr/bin/env node
/**
 * Sincroniza el Digesto oficial del Municipio de Sunchales.
 *
 * Fuente: https://sunchales.miportal.ar/digesto (SPA pública del Concejo)
 * API:    https://api.miportal.ar/sunchales/
 *
 * Pasos:
 *  1. POST /primerIngreso → obtiene token JWT guest (idUsuario=-10)
 *  2. POST /digInicio (accion=primerIngreso) → árbol completo del Digesto
 *  3. Para cada item con ES_TITULO=N: POST /digInicio (accion=buscarItem) → detalle
 *  4. Genera:
 *       data/digesto-oficial/items_completos.json   (todo, con TEXTO HTML)
 *       src/lib/data/digesto-oficial.generated.ts   (metadata para el sitio)
 *
 * Re-ejecutable: omite items ya descargados (lee data/digesto-oficial/detalles/<id>.json).
 *
 * Uso:
 *   node scripts/sincronizar-digesto-oficial.mjs            # sincroniza incremental
 *   node scripts/sincronizar-digesto-oficial.mjs --reset    # borra cache y baja todo
 */

import { mkdir, writeFile, readFile, readdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const DIR_DATA = path.join(RAIZ, "data", "digesto-oficial");
const DIR_DETALLES = path.join(DIR_DATA, "detalles");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "digesto-oficial.generated.ts");
const RUTA_JSON_COMPLETO = path.join(DIR_DATA, "items_completos.json");

const API = "https://api.miportal.ar/sunchales";
const HEADERS_BASE = {
  Origin: "https://sunchales.miportal.ar",
  Referer: "https://sunchales.miportal.ar/",
  "User-Agent":
    "Mozilla/5.0 (sincronizador Sunchales Transparente) AppleWebKit/537.36",
};

const PARALELO = 12;
const REINTENTOS = 3;

// ----------------------------------------------------------------------------

async function obtenerTokenGuest() {
  const r = await fetch(`${API}/primerIngreso`, {
    method: "POST",
    headers: { ...HEADERS_BASE, "Content-Type": "application/json" },
    body: "{}",
  });
  const d = await r.json();
  if (!d.resultado) throw new Error(`primerIngreso falló: ${d.mensaje}`);
  return d.datos.token;
}

async function postApi(endpoint, token, body) {
  const r = await fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: {
      ...HEADERS_BASE,
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    },
    body: new URLSearchParams(body).toString(),
  });
  const txt = await r.text();
  // El backend PHP a veces antepone <br/><b>Warning</b>... antes del JSON
  const i = txt.indexOf("{");
  return JSON.parse(i > 0 ? txt.slice(i) : txt);
}

async function obtenerCatalogo(token) {
  const d = await postApi("digInicio", token, { accion: "primerIngreso" });
  if (!d.resultado) throw new Error(`Catálogo falló: ${d.mensaje}`);
  return d.digesto || [];
}

async function obtenerDetalle(token, id) {
  return postApi("digInicio", token, { accion: "buscarItem", idDigesto: id });
}

// ----------------------------------------------------------------------------
// Parseo y normalización
// ----------------------------------------------------------------------------

function parseAnio(it) {
  const f = String(it.FECHA ?? "");
  let m = f.match(/^(\d{4})/);
  if (m) return parseInt(m[1], 10);
  m = String(it.NUMERO ?? "").match(/\/(\d{4})\b/);
  if (m) return parseInt(m[1], 10);
  m = String(it.TITULO ?? "").match(/\/(\d{4})\b/);
  if (m) return parseInt(m[1], 10);
  return null;
}

function parseNumero(it) {
  const n = String(it.NUMERO ?? "").trim();
  return n.includes("/") ? n.split("/")[0].trim() : n;
}

function normalizar(it) {
  return {
    id: it.ID_DIGESTO,
    tipo: it.NOMBRE_TIPO ?? "",
    numero: parseNumero(it),
    anio: parseAnio(it),
    fecha: it.FECHA || null,
    titulo: (it.TITULO ?? "").trim(),
    pdf: it.NOMBRE_PDF || null,
    observacion: (it.OBSERVACION ?? "").trim() || null,
    texto: it.TEXTO || null,
  };
}

// ----------------------------------------------------------------------------
// Generación del .ts
// ----------------------------------------------------------------------------

function generarTypescript(items) {
  const fecha = new Date().toISOString().slice(0, 10);

  const head = `/**
 * AUTO-GENERADO desde el Digesto oficial del Municipio de Sunchales.
 * Fuente: https://sunchales.miportal.ar/digesto
 * API:    https://api.miportal.ar/sunchales/digInicio (accion=primerIngreso)
 *
 * Generado el: ${fecha}
 *
 * Estos datos son sincronizados directamente del sistema oficial del municipio.
 * El campo "estado" (vigente / modificada / derogada) NO existe en el modelo
 * de datos del Digesto oficial — por eso no se incluye aquí.
 *
 * Para regenerar: ejecutar \`node scripts/sincronizar-digesto-oficial.mjs\`
 */

export type TipoNormaOficial = "Ordenanza" | "Decreto" | "Resolución";

export type NormaOficial = {
  id: number;
  tipo: TipoNormaOficial;
  numero: string;
  anio: number;
  fecha: string | null;
  titulo: string;
  pdf: string | null;
};

export const normasOficiales: NormaOficial[] = [
`;

  const filas = items
    .map((m) => {
      const j = (v) => (v === null ? "null" : JSON.stringify(v));
      return `  {id:${m.id}, tipo:${j(m.tipo)}, numero:${j(m.numero)}, anio:${m.anio}, fecha:${j(m.fecha)}, titulo:${j(m.titulo)}, pdf:${j(m.pdf)}},`;
    })
    .join("\n");

  const foot = `
];

export const conteoPorTipo: Record<TipoNormaOficial, number> =
  normasOficiales.reduce(
    (acc, n) => {
      acc[n.tipo] = (acc[n.tipo] ?? 0) + 1;
      return acc;
    },
    { Ordenanza: 0, Decreto: 0, Resolución: 0 } as Record<TipoNormaOficial, number>
  );

export const conteoPorAnio: Record<number, number> =
  normasOficiales.reduce(
    (acc, n) => {
      acc[n.anio] = (acc[n.anio] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

export function urlPdfDigesto(pdf: string | null): string | null {
  if (!pdf) return null;
  return \`https://api.miportal.ar/sunchales/SISverArchivo?archivo=\${encodeURIComponent(pdf)}\`;
}
`;

  return head + filas + foot;
}

// ----------------------------------------------------------------------------

async function main() {
  const reset = process.argv.includes("--reset");

  await mkdir(DIR_DETALLES, { recursive: true });
  await mkdir(path.dirname(RUTA_TS), { recursive: true });

  if (reset) {
    console.log("[reset] borrando cache local…");
    await rm(DIR_DETALLES, { recursive: true, force: true });
    await mkdir(DIR_DETALLES, { recursive: true });
  }

  console.log("[1/4] obteniendo token guest…");
  let token = await obtenerTokenGuest();

  console.log("[2/4] obteniendo árbol del Digesto…");
  const arbol = await obtenerCatalogo(token);
  const normas = arbol.filter((n) => n.ES_TITULO === "N");
  console.log(`       ${arbol.length} items totales, ${normas.length} normas reales`);

  console.log("[3/4] descargando detalle de cada norma…");
  const yaCacheados = new Set(
    (await readdir(DIR_DETALLES).catch(() => [])).map((f) => f.replace(".json", ""))
  );
  const pendientes = normas.filter((n) => !yaCacheados.has(String(n.ID_DIGESTO)));
  console.log(`       ya en caché: ${yaCacheados.size}, pendientes: ${pendientes.length}`);

  let okN = yaCacheados.size;
  let errN = 0;
  const t0 = Date.now();

  // Pool de descargas paralelas con renovación de token al fallar
  let i = 0;
  async function worker() {
    while (i < pendientes.length) {
      const idx = i++;
      const item = pendientes[idx];
      let intento = 0;
      while (intento < REINTENTOS) {
        try {
          const d = await obtenerDetalle(token, item.ID_DIGESTO);
          if (d.resultado) {
            const it = { ...d.item, ID_DIGESTO: item.ID_DIGESTO };
            await writeFile(
              path.join(DIR_DETALLES, `${item.ID_DIGESTO}.json`),
              JSON.stringify(it)
            );
            okN++;
            break;
          } else if (String(d.mensaje || "").includes("Token")) {
            token = await obtenerTokenGuest();
            continue;
          } else {
            errN++;
            break;
          }
        } catch (e) {
          intento++;
          if (intento >= REINTENTOS) {
            errN++;
            console.error(`       [err] ${item.ID_DIGESTO}: ${e.message}`);
            break;
          }
          await new Promise((r) => setTimeout(r, 1000 * intento));
        }
      }
      if ((okN + errN) % 50 === 0) {
        const t = (Date.now() - t0) / 1000;
        console.log(`       progreso: ${okN}/${normas.length} ok, ${errN} err — ${t.toFixed(0)}s`);
      }
    }
  }
  await Promise.all(Array.from({ length: PARALELO }, () => worker()));

  console.log(`       total: ${okN} ok, ${errN} err en ${((Date.now() - t0) / 1000).toFixed(0)}s`);

  console.log("[4/4] generando archivos consolidados…");
  // Releo TODOS los detalles (cache + recién bajados)
  const archivos = await readdir(DIR_DETALLES);
  const itemsCompletos = {};
  for (const f of archivos) {
    const it = JSON.parse(await readFile(path.join(DIR_DETALLES, f), "utf-8"));
    const norm = normalizar(it);
    itemsCompletos[String(norm.id)] = norm;
  }
  const lista = Object.values(itemsCompletos).sort((a, b) => a.id - b.id);

  await writeFile(RUTA_JSON_COMPLETO, JSON.stringify(itemsCompletos, null, 0));
  console.log(`       ${RUTA_JSON_COMPLETO}: ${(await stat(RUTA_JSON_COMPLETO)).size} bytes`);

  await writeFile(RUTA_TS, generarTypescript(lista));
  console.log(`       ${RUTA_TS}: ${(await stat(RUTA_TS)).size} bytes (${lista.length} normas)`);

  console.log("\nLISTO. Resumen:");
  const porTipo = {};
  const porAnio = {};
  for (const n of lista) {
    porTipo[n.tipo] = (porTipo[n.tipo] || 0) + 1;
    porAnio[n.anio] = (porAnio[n.anio] || 0) + 1;
  }
  console.log("  Por tipo:", porTipo);
  console.log("  Por año: ", porAnio);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
