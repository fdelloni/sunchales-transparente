#!/usr/bin/env node
/**
 * Scrapea el listado completo del digesto del Concejo Municipal de Sunchales,
 * iterando todos los años (1973-2026) y todas las páginas via paginación
 * ASP.NET Web Forms (__doPostBack con DataPager3).
 *
 * Salida: src/lib/data/digesto-concejo.generated.ts
 *
 * Política de honestidad:
 *   - Se extrae verbatim lo que el HTML muestra (título, fecha, área, autor,
 *     descripción, link al PDF). No se infiere nada.
 *   - Si una página falla, se reporta y se continúa con el resto.
 *
 * Uso:
 *   npm run scrapear-digesto-concejo
 *   npm run scrapear-digesto-concejo -- --anio=2024  (solo un año, para debug)
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "digesto-concejo.generated.ts");

const args = new Map(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? "true"] : [a, "true"];
  })
);
const ANIO_FILTRO = args.has("anio") ? Number(args.get("anio")) : null;
const ANIO_INICIO = Number(args.get("desde") ?? "1973");
const ANIO_FIN = Number(args.get("hasta") ?? "2026");
const PAUSA_MS = Number(args.get("pausa") ?? "200");

const HEADERS_BASE = {
  "User-Agent":
    "Mozilla/5.0 (Sunchales Transparente · scraper público) AppleWebKit/537.36",
  "Accept-Language": "es-AR,es;q=0.9",
  Accept: "text/html,application/xhtml+xml",
};

const BASE = "https://concejosunchales.gob.ar";
const URL_PATH = "/normativa-local-resultados.aspx";

// ---------- helpers --------------------------------------------------------

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#176;/g, "°")
    .replace(/&#186;/g, "º")
    .replace(/&#193;/g, "Á").replace(/&#225;/g, "á")
    .replace(/&#201;/g, "É").replace(/&#233;/g, "é")
    .replace(/&#205;/g, "Í").replace(/&#237;/g, "í")
    .replace(/&#211;/g, "Ó").replace(/&#243;/g, "ó")
    .replace(/&#218;/g, "Ú").replace(/&#250;/g, "ú")
    .replace(/&#209;/g, "Ñ").replace(/&#241;/g, "ñ");
}

function quitarTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

function extraerInputHidden(html, id) {
  const re = new RegExp(
    `<input[^>]+name="${id.replace(/[$]/g, "\\$")}"[^>]+value="([^"]*)"`,
    "i"
  );
  const m = html.match(re);
  return m ? decodeEntities(m[1]) : "";
}

function extraerItems(html) {
  const items = [];
  const blocks = [...html.matchAll(/<div class="listado-item"[\s\S]*?<\/div>\s*<!--\/listado-item-->/g)];
  for (const b of blocks) {
    const block = b[0];
    const tituloM = block.match(/<h3>\s*<a[^>]+href="(normativa-local-detalle\.aspx\?id=(\d+))"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/);
    if (!tituloM) continue;
    const idDigesto = Number(tituloM[2]);
    const titulo = quitarTags(tituloM[3]);
    const liItems = [...block.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => quitarTags(m[1]));
    const liMap = {};
    for (const li of liItems) {
      const m = li.match(/^([^:]+):\s*(.*)$/);
      if (m) liMap[m[1].toLowerCase().trim()] = m[2].trim();
    }
    const descM = block.match(/<p>([\s\S]*?)<\/p>/);
    const descripcion = descM ? quitarTags(descM[1]) : "";
    const pdfM = block.match(/href="(documentos\/digesto\/[^"]+\.pdf)"/);
    const urlPdf = pdfM ? `${BASE}/${pdfM[1]}` : null;

    items.push({
      idDigesto,
      titulo,
      anio: liMap["año"] ? Number(liMap["año"]) : null,
      fecha: liMap["fecha"] ?? null,
      tipo: liMap["tipo"] ?? null,
      area: liMap["area"] ?? liMap["área"] ?? null,
      autor: liMap["autor/es"] ?? null,
      descripcion,
      urlDetalle: `${BASE}/normativa-local-detalle.aspx?id=${idDigesto}`,
      urlPdf,
    });
  }
  return items;
}

function obtenerEventTargetsDePaginacion(html) {
  // Captura todos los DataPagerN$ctl0X$ctlYY que aparecen en links javascript:__doPostBack
  const targets = new Set();
  for (const m of html.matchAll(/__doPostBack\(&#39;(DataPager\d+\$ctl\d+\$ctl\d+)&#39;/g)) {
    targets.add(m[1]);
  }
  for (const m of html.matchAll(/__doPostBack\('(DataPager\d+\$ctl\d+\$ctl\d+)'/g)) {
    targets.add(m[1]);
  }
  return [...targets];
}

async function pausa(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getInicial(anio) {
  const url = `${BASE}${URL_PATH}?anio=${anio}`;
  const res = await fetch(url, { headers: HEADERS_BASE });
  if (!res.ok) throw new Error(`HTTP ${res.status} para anio ${anio}`);
  const html = new TextDecoder("utf-8").decode(new Uint8Array(await res.arrayBuffer()));
  return { html, url };
}

async function postPagina(anio, formData) {
  const url = `${BASE}${URL_PATH}?anio=${anio}`;
  const body = new URLSearchParams(formData);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...HEADERS_BASE,
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      Origin: BASE,
      Referer: url,
    },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return new TextDecoder("utf-8").decode(new Uint8Array(await res.arrayBuffer()));
}

function extraerEstado(html) {
  return {
    viewstate: extraerInputHidden(html, "__VIEWSTATE"),
    viewstateGenerator: extraerInputHidden(html, "__VIEWSTATEGENERATOR"),
    eventValidation: extraerInputHidden(html, "__EVENTVALIDATION"),
  };
}

const MAX_PAGINAS_SEGURO = Number(args.get("max-paginas") ?? "700");
const MAX_PAGINAS_SIN_NUEVOS = Number(args.get("max-vacias") ?? "8");

async function scrapearAnio(anio) {
  const itemsDelAnio = [];
  const idsVistos = new Set();
  console.log(`\n--- ${anio} ---`);

  let { html } = await getInicial(anio);
  let estado = extraerEstado(html);
  let itemsPagina = extraerItems(html);
  // Filtrar solo los del año pedido — la paginación POST a veces pierde el filtro
  let nuevosDelAnio = itemsPagina.filter(
    (it) => it.anio === anio && !idsVistos.has(it.idDigesto)
  );
  nuevosDelAnio.forEach((it) => idsVistos.add(it.idDigesto));
  itemsDelAnio.push(...nuevosDelAnio);
  console.log(`  página 1: ${nuevosDelAnio.length} del año (de ${itemsPagina.length} en página)`);

  let pagina = 1;
  let consecutivasSinNuevos = 0;

  while (pagina < MAX_PAGINAS_SEGURO) {
    const targets = obtenerEventTargetsDePaginacion(html);
    if (targets.length === 0) break;
    const siguiente = targets.find((t) => /ctl03\$ctl00$/.test(t));
    if (!siguiente) break;
    pagina++;
    try {
      html = await postPagina(anio, {
        __EVENTTARGET: siguiente,
        __EVENTARGUMENT: "",
        __LASTFOCUS: "",
        __VIEWSTATE: estado.viewstate,
        __VIEWSTATEGENERATOR: estado.viewstateGenerator,
        __EVENTVALIDATION: estado.eventValidation,
      });
      estado = extraerEstado(html);
      itemsPagina = extraerItems(html);
      nuevosDelAnio = itemsPagina.filter(
        (it) => it.anio === anio && !idsVistos.has(it.idDigesto)
      );
      if (nuevosDelAnio.length === 0) {
        consecutivasSinNuevos++;
        if (consecutivasSinNuevos >= MAX_PAGINAS_SIN_NUEVOS) {
          console.log(`  ${MAX_PAGINAS_SIN_NUEVOS} páginas sin items del ${anio} consecutivas — corto`);
          break;
        }
      } else {
        consecutivasSinNuevos = 0;
        nuevosDelAnio.forEach((it) => idsVistos.add(it.idDigesto));
        itemsDelAnio.push(...nuevosDelAnio);
        console.log(`  página ${pagina}: ${nuevosDelAnio.length} del año (acum ${itemsDelAnio.length})`);
      }
      await pausa(PAUSA_MS);
    } catch (e) {
      console.log(`  ✗ página ${pagina}: ${e.message}`);
      break;
    }
  }
  return itemsDelAnio;
}

/**
 * Scrapeo "todo el digesto" en una sola corrida (sin filtro por año).
 * El filtro `?anio=` solo respeta el GET inicial; los POSTs de paginación
 * pierden el filtro. Hacer una sola corrida es más eficiente y completo.
 */
async function scrapearTodo() {
  const items = [];
  const idsVistos = new Set();
  console.log(`\n→ Modo TODO: paginando el digesto completo`);

  // GET inicial sin filtro
  const urlInicial = `${BASE}${URL_PATH}`;
  let res = await fetch(urlInicial, { headers: HEADERS_BASE });
  let html = new TextDecoder("utf-8").decode(new Uint8Array(await res.arrayBuffer()));
  let estado = extraerEstado(html);
  let itemsPagina = extraerItems(html);
  itemsPagina.forEach((it) => idsVistos.add(it.idDigesto));
  items.push(...itemsPagina);
  console.log(`  página 1: ${itemsPagina.length} items`);

  let pagina = 1;
  let consecutivasSinNuevos = 0;

  while (pagina < MAX_PAGINAS_SEGURO) {
    const targets = obtenerEventTargetsDePaginacion(html);
    const siguiente = targets.find((t) => /ctl03\$ctl00$/.test(t));
    if (!siguiente) {
      console.log(`  no hay más botón "Siguiente" — corto`);
      break;
    }
    pagina++;
    try {
      const body = new URLSearchParams({
        __EVENTTARGET: siguiente,
        __EVENTARGUMENT: "",
        __LASTFOCUS: "",
        __VIEWSTATE: estado.viewstate,
        __VIEWSTATEGENERATOR: estado.viewstateGenerator,
        __EVENTVALIDATION: estado.eventValidation,
      });
      res = await fetch(urlInicial, {
        method: "POST",
        headers: {
          ...HEADERS_BASE,
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: BASE,
          Referer: urlInicial,
        },
        body: body.toString(),
      });
      html = new TextDecoder("utf-8").decode(new Uint8Array(await res.arrayBuffer()));
      estado = extraerEstado(html);
      itemsPagina = extraerItems(html);
      const nuevos = itemsPagina.filter((it) => !idsVistos.has(it.idDigesto));
      if (nuevos.length === 0) {
        consecutivasSinNuevos++;
        if (consecutivasSinNuevos >= MAX_PAGINAS_SIN_NUEVOS) {
          console.log(`  ${MAX_PAGINAS_SIN_NUEVOS} páginas consecutivas sin nuevos — corto`);
          break;
        }
      } else {
        consecutivasSinNuevos = 0;
        nuevos.forEach((it) => idsVistos.add(it.idDigesto));
        items.push(...nuevos);
        if (pagina % 10 === 0 || nuevos.length < 10) {
          console.log(`  página ${pagina}: +${nuevos.length} (acum ${items.length})`);
        }
      }
      await pausa(PAUSA_MS);
    } catch (e) {
      console.log(`  ✗ página ${pagina}: ${e.message}`);
      break;
    }
  }
  console.log(`  ✓ Total recolectado: ${items.length} normas en ${pagina} páginas`);
  return items;
}

// ---------- main -----------------------------------------------------------

let todos = [];
const errores = [];

if (ANIO_FILTRO) {
  console.log(`→ Modo POR-AÑO: filtrando ${ANIO_FILTRO}`);
  try {
    todos = await scrapearAnio(ANIO_FILTRO);
  } catch (e) {
    errores.push({ anio: ANIO_FILTRO, error: e.message });
  }
} else {
  try {
    todos = await scrapearTodo();
  } catch (e) {
    errores.push({ etapa: "todo", error: e.message });
  }
}

// Reagrupar por año (a partir de cada item)
const porAnio = {};
for (const it of todos) {
  const k = it.anio ?? "sin_anio";
  porAnio[k] = (porAnio[k] ?? 0) + 1;
}

console.log(`\n✓ Total: ${todos.length} normas extraídas`);
console.log(`Errores: ${errores.length}`);

const ahora = new Date().toISOString();
const ts = `// AUTO-GENERADO por scripts/scrapear-digesto-concejo.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-digesto-concejo
//
// Fuente oficial: ${BASE}/normativa-local.aspx
// Última sincronización: ${ahora}
// Total normas: ${todos.length}

export type NormaConcejo = {
  /** Identificador estable usado por el sitio del Concejo. */
  idDigesto: number;
  titulo: string;
  anio: number | null;
  /** Fecha en formato dd/mm/aa (verbatim del sitio). */
  fecha: string | null;
  tipo: string | null;
  area: string | null;
  autor: string | null;
  descripcion: string;
  urlDetalle: string;
  urlPdf: string | null;
};

export const normasConcejo: NormaConcejo[] = ${JSON.stringify(todos, null, 2)};

export const digestoConcejoMeta = {
  fuenteUrl: ${JSON.stringify(`${BASE}/normativa-local.aspx`)},
  sincronizadoEl: ${JSON.stringify(ahora)},
  total: ${todos.length},
  porAnio: ${JSON.stringify(porAnio, null, 2)},
  erroresDeAnio: ${JSON.stringify(errores, null, 2)},
} as const;
`;

await writeFile(RUTA_TS, ts, "utf8");
console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
