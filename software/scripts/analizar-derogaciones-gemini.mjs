#!/usr/bin/env node
/**
 * Analiza el texto de las normas del Digesto oficial usando Gemini Flash
 * para detectar relaciones de derogación y modificación entre ellas.
 *
 * Lee: data/digesto-oficial/items_completos.json (generado por sincronizar-digesto-oficial.mjs)
 * Escribe:
 *   - data/digesto-oficial/relaciones.json    — array de relaciones con cita textual
 *   - data/digesto-oficial/estados.json       — mapa { idNorma → "vigente"|"modificada"|"derogada" }
 *   - src/lib/data/digesto-estados.generated.ts — para uso en charts/UI
 *
 * Estrategia:
 *   1. Filtra normas candidatas (las que CITAN otras + tienen verbo de afectación).
 *      ~132 de 964 → reduce 7x el universo y el costo.
 *   2. Para cada candidata: prompt estricto a Gemini Flash con JSON schema.
 *   3. Construye grafo: para cada norma destinataria, junta todas las relaciones que la afectan.
 *   4. Computa estado:
 *        - "derogada": al menos una relación tipo "deroga" con alcance="total"
 *        - "modificada": al menos una "modifica" o "deroga parcial"
 *        - "vigente": no aparece como destinataria
 *
 * Costo estimado: ~$0.10 USD con Gemini 2.5 Flash (134K tokens input + 26K tokens output).
 * Tiempo: ~5-10 min con concurrencia 4 (rate limit free tier).
 *
 * Requisitos:
 *   - GOOGLE_API_KEY en .env.local (ya configurada para el chatbot)
 *   - data/digesto-oficial/items_completos.json existente
 *
 * Uso:
 *   node scripts/analizar-derogaciones-gemini.mjs            # incremental (saltea las ya analizadas)
 *   node scripts/analizar-derogaciones-gemini.mjs --reset    # re-analiza todo
 *   node scripts/analizar-derogaciones-gemini.mjs --limit=10 # analiza solo las primeras 10 (para probar)
 */

import { mkdir, readFile, writeFile, readdir, rm, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");

// Cargar .env.local manualmente (sin depender de dotenv)
function cargarEnvLocal() {
  const ruta = path.join(RAIZ, ".env.local");
  if (!existsSync(ruta)) return;
  const txt = readFileSync(ruta, "utf-8");
  for (const linea of txt.split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}
cargarEnvLocal();

const DIR_DATA = path.join(RAIZ, "data", "digesto-oficial");
const DIR_CACHE = path.join(DIR_DATA, "analisis-gemini");
const RUTA_ITEMS = path.join(DIR_DATA, "items_completos.json");
const RUTA_RELACIONES = path.join(DIR_DATA, "relaciones.json");
const RUTA_ESTADOS = path.join(DIR_DATA, "estados.json");
const RUTA_TS = path.join(RAIZ, "src", "lib", "data", "digesto-estados.generated.ts");

const API_KEY = process.env.GOOGLE_API_KEY;
const MODELO = process.env.GOOGLE_MODEL ?? "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;

const PARALELO = 4; // free tier ~15 RPM, vamos conservadores
const PAUSA_MS = 200; // entre requests del mismo worker

// ---------------------------------------------------------------------------
// Filtros: qué normas tiene sentido procesar
// ---------------------------------------------------------------------------

const RX_CITA = /(ordenanza|decreto|resoluci[oó]n)\s*N[°º]?\s*\d+/i;

// Filtro estricto: solo VERBOS DE ACCIÓN que producen derogación o modificación.
// Evitamos sustantivos como "modificaciones", "modificatorias" (que solo CITAN
// modificaciones existentes, no producen una nueva).
const RX_AFECTA = new RegExp(
  [
    "der[oó]gase",         // "Derógase la Ordenanza..."
    "der[oó]guese",        // "Deróguese..."
    "queda\\s+derogad",    // "queda derogada/o"
    "modif[íi]case",       // "Modifícase el artículo..."
    "modif[íi]quese",      // "Modifíquese..."
    "queda\\s+modificad",  // "queda modificado/a"
    "sustit[úu]yase",      // "Sustitúyase el texto..."
    "reempl[áa]zase",      // "Reemplázase..."
    "d[ée]jase\\s+sin\\s+efecto" // "Déjase sin efecto..."
  ].join("|"),
  "i"
);

function esCandidata(it) {
  const txt = it.texto || "";
  return RX_CITA.test(txt) && RX_AFECTA.test(txt);
}

// Limpia HTML del campo TEXTO: deja texto plano para mandarle al modelo.
function limpiarHtml(html) {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Prompt para Gemini
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Sos un asistente experto en análisis normativo municipal argentino.
Tu tarea es leer una norma (ordenanza, decreto o resolución) y extraer las
RELACIONES EXPLÍCITAS que ESTA norma establece con OTRAS normas anteriores.

Tipos de relación a detectar:
- "deroga": esta norma deroga (deja sin efecto) otra norma. Puede ser TOTAL o PARCIAL.
- "modifica": esta norma sustituye/cambia el texto de algún artículo de otra norma.

Verbos típicos que indican derogación / modificación:
- "Derógase la Ordenanza N° X"
- "Derógase el Decreto N° X"
- "Queda derogada la Resolución N° X"
- "Modifícase el artículo Y de la Ordenanza N° X"
- "Sustitúyase el artículo Y de..."
- "Reemplázase el texto del artículo Y de..."
- "Déjase sin efecto la Resolución N° X"

CASOS QUE NO CONTÁS:
- "Ordenanza N° X y sus modificatorias" → solo CITA, no genera modificación
- "modificaciones a la estructura..." → sustantivo, no es verbo de acción normativa
- "Visto la Ordenanza N° X" → solo cita, no afecta
- "Conforme al artículo Y de la Ordenanza N° X" → solo cita, no modifica

EJEMPLOS:

Texto: "ARTICULO 1°.- Derógase la Ordenanza N° 2878. ARTICULO 2°.- Establécese..."
Salida correcta:
{"relaciones":[{"tipo":"deroga","normaAfectada":{"tipo":"Ordenanza","numero":"2878","anio":null},"alcance":"total","articulos":[],"citaTextual":"Derógase la Ordenanza N° 2878"}]}

Texto: "ARTÍCULO 2°.- Modifícase el ARTÍCULO 18 de la Ordenanza N°2989, el cual queda redactado..."
Salida correcta:
{"relaciones":[{"tipo":"modifica","normaAfectada":{"tipo":"Ordenanza","numero":"2989","anio":null},"alcance":"parcial","articulos":["18"],"citaTextual":"Modifícase el ARTÍCULO 18 de la Ordenanza N°2989"}]}

Texto: "VISTO: Las Ordenanzas N° 1303/00, sus modificatorias, y los Decretos N° 3454/2025 y 3468/2025; CONSIDERANDO..."
Salida correcta:
{"relaciones":[]}

FORMATO DE SALIDA (JSON estricto):
{
  "relaciones": [
    {
      "tipo": "deroga" | "modifica",
      "normaAfectada": {"tipo": "Ordenanza"|"Decreto"|"Resolución", "numero": "2987", "anio": 2022 | null},
      "alcance": "total" | "parcial",
      "articulos": ["18"],
      "citaTextual": "texto literal de 30-200 caracteres"
    }
  ]
}

Reglas:
- "citaTextual" debe ser texto LITERAL de la norma analizada (copiar y pegar, sin parafrasear).
- Año: ponelo solo si aparece explícito (ej. "Ordenanza N° 2987/2022"). Si solo dice "N° 2987" sin año, ponés null.
- Devolvés SOLO el JSON. Sin markdown. Sin texto adicional.`;

function userPrompt(norma) {
  const texto = limpiarHtml(norma.texto).slice(0, 8000); // truncar muy largas
  return `NORMA A ANALIZAR:
Tipo: ${norma.tipo}
Número: ${norma.numero}/${norma.anio}
Fecha: ${norma.fecha ?? "(sin fecha)"}
Título: ${norma.titulo}

TEXTO:
${texto}`;
}

// ---------------------------------------------------------------------------
// Llamada a Gemini
// ---------------------------------------------------------------------------

async function preguntarGemini(norma) {
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: userPrompt(norma) }] }],
    generationConfig: {
      maxOutputTokens: 1500,
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  };

  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const e = await r.text();
    throw new Error(`Gemini ${r.status}: ${e.slice(0, 200)}`);
  }

  const data = await r.json();
  if (data.promptFeedback?.blockReason) {
    throw new Error(`Bloqueado: ${data.promptFeedback.blockReason}`);
  }
  const txt = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!txt.trim()) throw new Error("Respuesta vacía");

  let parsed;
  try {
    parsed = JSON.parse(txt);
  } catch {
    // A veces el modelo agrega markdown ```json ... ```
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("JSON no parseable: " + txt.slice(0, 100));
    parsed = JSON.parse(m[0]);
  }

  // Normalizar shape
  const relaciones = Array.isArray(parsed.relaciones) ? parsed.relaciones : [];
  return relaciones.filter((r) => r && (r.tipo === "deroga" || r.tipo === "modifica"));
}

// ---------------------------------------------------------------------------
// Pool de workers con rate limiting
// ---------------------------------------------------------------------------

async function procesar(candidatas) {
  await mkdir(DIR_CACHE, { recursive: true });
  const yaCache = new Set(
    (await readdir(DIR_CACHE).catch(() => [])).map((f) => f.replace(".json", ""))
  );

  const pendientes = candidatas.filter((c) => !yaCache.has(String(c.id)));
  console.log(`[gemini] ya cacheados: ${yaCache.size}, pendientes: ${pendientes.length}`);

  let i = 0;
  let okN = 0;
  let errN = 0;
  let conRelaciones = 0;
  const t0 = Date.now();

  async function worker(wid) {
    while (i < pendientes.length) {
      const idx = i++;
      const norma = pendientes[idx];
      try {
        const relaciones = await preguntarGemini(norma);
        const out = {
          id: norma.id,
          tipo: norma.tipo,
          numero: norma.numero,
          anio: norma.anio,
          relaciones,
        };
        await writeFile(path.join(DIR_CACHE, `${norma.id}.json`), JSON.stringify(out, null, 2));
        okN++;
        if (relaciones.length > 0) conRelaciones++;
      } catch (e) {
        errN++;
        console.error(`  [w${wid} err] ${norma.id} ${norma.tipo} ${norma.numero}/${norma.anio}: ${e.message}`);
      }
      if ((okN + errN) % 10 === 0) {
        const t = (Date.now() - t0) / 1000;
        console.log(
          `  [${t.toFixed(0)}s] ${okN} ok / ${errN} err — ${conRelaciones} con relaciones`
        );
      }
      await new Promise((r) => setTimeout(r, PAUSA_MS));
    }
  }

  await Promise.all(Array.from({ length: PARALELO }, (_, w) => worker(w)));
  console.log(`[gemini] FIN: ${okN} ok, ${errN} err, ${conRelaciones} con relaciones encontradas`);
}

// ---------------------------------------------------------------------------
// Consolidar: relaciones + estado por norma
// ---------------------------------------------------------------------------

async function consolidar(itemsCompletos) {
  console.log("[consolidar] leyendo cache de Gemini…");
  const archivos = await readdir(DIR_CACHE);
  const relaciones = [];
  for (const f of archivos) {
    const d = JSON.parse(await readFile(path.join(DIR_CACHE, f), "utf-8"));
    for (const r of d.relaciones) {
      relaciones.push({
        normaOrigen: { id: d.id, tipo: d.tipo, numero: d.numero, anio: d.anio },
        ...r,
      });
    }
  }
  console.log(`  total relaciones extraídas: ${relaciones.length}`);

  // Indexar items por (tipo, numero, anio) para resolver "normaAfectada" → id
  const indice = new Map();
  for (const it of Object.values(itemsCompletos)) {
    const k1 = `${it.tipo}|${it.numero}|${it.anio}`;
    indice.set(k1, it.id);
    // También sin año (por si Gemini no lo detectó)
    if (it.anio) indice.set(`${it.tipo}|${it.numero}|null`, it.id);
  }

  // Para cada relación, intentar resolver el ID destino
  let resueltas = 0;
  for (const r of relaciones) {
    const a = r.normaAfectada || {};
    const k = `${a.tipo}|${a.numero}|${a.anio ?? null}`;
    const idDestino = indice.get(k);
    if (idDestino) {
      r.idDestino = idDestino;
      resueltas++;
    } else {
      r.idDestino = null;
    }
  }
  console.log(`  relaciones resueltas a un ID del catálogo: ${resueltas}/${relaciones.length}`);

  // Computar estado por norma
  const estados = {}; // { idNorma → "derogada" | "modificada" }
  const justifs = {}; // { idNorma → [{tipo, alcance, origenId, cita}] }
  for (const r of relaciones) {
    if (!r.idDestino) continue;
    const dest = r.idDestino;
    const j = { tipo: r.tipo, alcance: r.alcance, origenId: r.normaOrigen.id, cita: r.citaTextual };
    (justifs[dest] = justifs[dest] || []).push(j);

    if (r.tipo === "deroga" && r.alcance === "total") {
      estados[dest] = "derogada";
    } else if (estados[dest] !== "derogada") {
      estados[dest] = "modificada";
    }
  }

  await writeFile(RUTA_RELACIONES, JSON.stringify({ generado: new Date().toISOString(), relaciones }, null, 0));
  await writeFile(RUTA_ESTADOS, JSON.stringify({ generado: new Date().toISOString(), estados, justifs }, null, 0));

  // Estadísticas
  const conteo = { vigente: 0, modificada: 0, derogada: 0 };
  for (const it of Object.values(itemsCompletos)) {
    const e = estados[it.id] || "vigente";
    conteo[e]++;
  }
  console.log("\n=== Resumen ===");
  console.log(`Total normas: ${Object.keys(itemsCompletos).length}`);
  console.log(`  Vigentes:    ${conteo.vigente}`);
  console.log(`  Modificadas: ${conteo.modificada}`);
  console.log(`  Derogadas:   ${conteo.derogada}`);

  // Generar TS
  const tsContent = `/**
 * AUTO-GENERADO desde análisis NLP del Digesto oficial con Gemini 2.5 Flash.
 * Fecha: ${new Date().toISOString().slice(0, 10)}
 *
 * Estado computado a partir de las relaciones EXPLÍCITAS (deroga/modifica) detectadas
 * en el texto de cada norma. Las relaciones tácitas NO se incluyen.
 *
 * IMPORTANTE: Esta clasificación es ALGORÍTMICA y se sustenta en la cita textual
 * de la norma posterior que afecta a la anterior. NO reemplaza un análisis legal.
 *
 * Para regenerar: ejecutar \`node scripts/analizar-derogaciones-gemini.mjs\`
 */

export type EstadoVigencia = "vigente" | "modificada" | "derogada";

export const estadosNormas: Record<number, EstadoVigencia> = ${JSON.stringify(estados, null, 0)};

export const conteoEstados: Record<EstadoVigencia, number> = {
  vigente: ${conteo.vigente},
  modificada: ${conteo.modificada},
  derogada: ${conteo.derogada}
};

export function estadoDeNorma(id: number): EstadoVigencia {
  return estadosNormas[id] ?? "vigente";
}
`;
  await writeFile(RUTA_TS, tsContent);
  console.log(`\n[generado] ${RUTA_TS}`);
  console.log(`[generado] ${RUTA_RELACIONES}`);
  console.log(`[generado] ${RUTA_ESTADOS}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!API_KEY) {
    console.error("FATAL: GOOGLE_API_KEY no configurada en .env.local");
    process.exit(1);
  }
  if (!existsSync(RUTA_ITEMS)) {
    console.error(`FATAL: no existe ${RUTA_ITEMS}`);
    console.error("Ejecutá primero: node scripts/sincronizar-digesto-oficial.mjs");
    process.exit(1);
  }

  const reset = process.argv.includes("--reset");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limite = limitArg ? parseInt(limitArg.split("=")[1], 10) : null;

  if (reset) {
    console.log("[reset] borrando cache de análisis…");
    await rm(DIR_CACHE, { recursive: true, force: true });
  }

  console.log("[1/3] cargando catálogo…");
  const itemsCompletos = JSON.parse(await readFile(RUTA_ITEMS, "utf-8"));
  const todas = Object.values(itemsCompletos);
  console.log(`       total normas: ${todas.length}`);

  console.log("[2/3] filtrando candidatas…");
  let candidatas = todas.filter(esCandidata);
  console.log(`       candidatas (citan otras + verbo de afectación): ${candidatas.length}`);
  if (limite) {
    candidatas = candidatas.slice(0, limite);
    console.log(`       --limit=${limite} aplicado`);
  }

  console.log(`[3/3] analizando con Gemini ${MODELO}…`);
  await procesar(candidatas);

  await consolidar(itemsCompletos);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
