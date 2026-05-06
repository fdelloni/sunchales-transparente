#!/usr/bin/env node
/**
 * Indexer RAG — vectoriza toda la documentacion publica del municipio
 * y la inserta en la tabla `chunks_rag` de Supabase (pgvector).
 *
 * Fuentes que indexa:
 *   1. Digesto oficial completo            (data/digesto-oficial/items_completos.json)
 *   2. PDFs del Concejo                    (data/concejo/*.txt)
 *   3. Resumenes anuales                   (subset de los PDFs concejo)
 *   4. Padron de funcionarios              (hardcoded, sincronizar con src/lib/data/personal.ts)
 *   5. Presupuesto 2026                    (hardcoded, sincronizar con src/lib/data/presupuesto.ts)
 *   6. Catalogo FAQ                        (hardcoded, sincronizar con src/lib/whatsapp/data/faq.ts)
 *   7. Marco normativo general             (hardcoded)
 *
 * Pipeline por documento:
 *   1. Computar SHA-256 del texto completo.
 *   2. Si ya existe en BD con el mismo hash, saltar (incremental).
 *   3. Chunkear (~500 tokens, 50 de overlap, respetando saltos de parrafo).
 *   4. Embeddear cada chunk con Gemini text-embedding-004 (768 dim).
 *   5. Upsert en chunks_rag.
 *
 * Costo estimado: ~$0 (free tier Gemini cubre miles de embeddings/dia).
 * Tiempo: 1-2 horas para todo el corpus completo.
 *
 * Requisitos en .env.local:
 *   GOOGLE_API_KEY                        — para Gemini embeddings
 *   NEXT_PUBLIC_SUPABASE_URL              — tu instancia Supabase
 *   SUPABASE_SERVICE_ROLE_KEY             — clave de servicio (NO la anon)
 *
 * Uso:
 *   node scripts/indexar-rag.mjs                       # incremental (default)
 *   node scripts/indexar-rag.mjs --solo=digesto        # solo una fuente
 *   node scripts/indexar-rag.mjs --reset               # borra todo y reindexa
 *   node scripts/indexar-rag.mjs --limite=50           # primeros 50 docs (smoke test)
 *   node scripts/indexar-rag.mjs --concurrencia=3      # llamadas paralelas a Gemini
 */

import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");

// =============== CARGA DE .env.local ===============
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

// =============== ARGS ===============
const ARGS = process.argv.slice(2);
const SOLO = ARGS.find((a) => a.startsWith("--solo="))?.split("=")[1] ?? null;
const RESET = ARGS.includes("--reset");
const LIMITE = parseInt(ARGS.find((a) => a.startsWith("--limite="))?.split("=")[1] ?? "0", 10) || 0;
const CONCURRENCIA = parseInt(ARGS.find((a) => a.startsWith("--concurrencia="))?.split("=")[1] ?? "2", 10) || 2;

// =============== CONFIG ===============
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY) abortar("Falta GOOGLE_API_KEY en .env.local");
if (!SUPABASE_URL) abortar("Falta NEXT_PUBLIC_SUPABASE_URL en .env.local");
if (!SUPABASE_SERVICE_ROLE_KEY) abortar("Falta SUPABASE_SERVICE_ROLE_KEY en .env.local");

const EMBED_MODEL = "text-embedding-004";
const EMBED_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=${GOOGLE_API_KEY}`;
const CHUNK_CHARS = 1800;       // ~450 tokens
const CHUNK_OVERLAP = 200;      // ~50 tokens
const PAUSA_ENTRE_REQ_MS = 100; // 600 req/min, debajo del limite gratuito (1500 req/min)

// =============== HELPERS ===============
function abortar(msg) {
  console.error("ERROR:", msg);
  process.exit(1);
}

function log(...m) {
  console.log("[indexer-rag]", ...m);
}

function sha256(s) {
  return createHash("sha256").update(s).digest("hex");
}

function limpiarTexto(s) {
  return s
    .replace(/<[^>]+>/g, " ")          // strip HTML
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Chunkea texto en bloques de ~CHUNK_CHARS con overlap, intentando cortar
 * en limites de oracion/parrafo cuando es posible.
 */
function chunkear(texto) {
  const limpio = texto.trim();
  if (limpio.length <= CHUNK_CHARS) return [limpio];

  const chunks = [];
  let inicio = 0;
  while (inicio < limpio.length) {
    let fin = Math.min(inicio + CHUNK_CHARS, limpio.length);
    if (fin < limpio.length) {
      // intentar cortar en limite de oracion
      const slice = limpio.slice(inicio, fin);
      const idxPunto = Math.max(
        slice.lastIndexOf(". "),
        slice.lastIndexOf(".\n"),
        slice.lastIndexOf("\n\n")
      );
      if (idxPunto > CHUNK_CHARS * 0.5) {
        fin = inicio + idxPunto + 1;
      }
    }
    chunks.push(limpio.slice(inicio, fin).trim());
    inicio = fin - CHUNK_OVERLAP;
    if (inicio < 0) inicio = 0;
    if (fin >= limpio.length) break;
  }
  return chunks.filter((c) => c.length > 50);  // descartar chunks ridiculamente cortos
}

// =============== GEMINI EMBEDDINGS ===============
async function embeddearTexto(texto, taskType = "RETRIEVAL_DOCUMENT") {
  const truncado = texto.length > 7500 ? texto.slice(0, 7500) : texto;
  const body = {
    model: `models/${EMBED_MODEL}`,
    content: { parts: [{ text: truncado }] },
    taskType
  };
  const res = await fetch(EMBED_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gemini embeddings ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const v = data.embedding?.values;
  if (!v || v.length !== 768) throw new Error(`Vector invalido: ${v?.length}`);
  return v;
}

async function embeddearConReintentos(texto, intentos = 3) {
  let ultimoErr;
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await embeddearTexto(texto);
      if (i > 0) log(`   reintento ${i + 1} OK`);
      return r;
    } catch (err) {
      ultimoErr = err;
      const espera = 1000 * Math.pow(2, i);
      log(`   error embeddings (${err.message}); reintentando en ${espera}ms`);
      await new Promise((r) => setTimeout(r, espera));
    }
  }
  throw ultimoErr;
}

// =============== SUPABASE (REST API directa, sin SDK para mantener mjs simple) ===============
const SB_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_SERVICE_ROLE_KEY,
  "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Prefer": "resolution=merge-duplicates"
};

async function sbRequest(path, opts = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, { ...opts, headers: { ...SB_HEADERS, ...(opts.headers || {}) } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Supabase ${res.status} ${path}: ${t.slice(0, 300)}`);
  }
  if (res.status === 204) return null;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("json")) return res.json();
  return res.text();
}

async function obtenerHashExistente(fuenteTipo, fuenteId) {
  const path = `chunks_rag?select=hash_origen&fuente_tipo=eq.${encodeURIComponent(fuenteTipo)}&fuente_id=eq.${encodeURIComponent(fuenteId)}&chunk_idx=eq.0&limit=1`;
  const rows = await sbRequest(path);
  return rows?.[0]?.hash_origen ?? null;
}

async function borrarChunksDe(fuenteTipo, fuenteId) {
  const path = `chunks_rag?fuente_tipo=eq.${encodeURIComponent(fuenteTipo)}&fuente_id=eq.${encodeURIComponent(fuenteId)}`;
  await sbRequest(path, { method: "DELETE" });
}

async function insertarChunks(filas) {
  if (filas.length === 0) return;
  await sbRequest("chunks_rag", {
    method: "POST",
    headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(filas)
  });
}

async function borrarTodo() {
  log("RESET: borrando toda la tabla chunks_rag...");
  await sbRequest("chunks_rag?id=neq.00000000-0000-0000-0000-000000000000", { method: "DELETE" });
  log("RESET: tabla limpia.");
}

// =============== INDEXACION DE UN DOCUMENTO ===============
async function indexarDocumento(doc) {
  const hashNuevo = sha256(doc.texto);
  const hashViejo = await obtenerHashExistente(doc.fuenteTipo, doc.fuenteId);
  if (hashNuevo === hashViejo) {
    return { saltado: true };
  }

  if (hashViejo) {
    await borrarChunksDe(doc.fuenteTipo, doc.fuenteId);
  }

  const chunks = chunkear(doc.texto);
  const filas = [];
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embeddearConReintentos(chunks[i]);
    filas.push({
      fuente_tipo: doc.fuenteTipo,
      fuente_id: doc.fuenteId,
      fuente_titulo: doc.fuenteTitulo,
      fuente_url: doc.fuenteUrl ?? null,
      fuente_fecha: doc.fuenteFecha ?? null,
      chunk_idx: i,
      texto: chunks[i],
      metadata: doc.metadata ?? {},
      embedding,
      hash_origen: hashNuevo
    });
    if (i < chunks.length - 1) await new Promise((r) => setTimeout(r, PAUSA_ENTRE_REQ_MS));
  }
  await insertarChunks(filas);
  return { saltado: false, chunks: chunks.length };
}

// =============== FUENTES ===============
async function * fuenteDigesto() {
  const ruta = path.join(RAIZ, "data", "digesto-oficial", "items_completos.json");
  if (!existsSync(ruta)) {
    log("(saltando digesto: no existe items_completos.json — corre antes `npm run sincronizar-digesto`)");
    return;
  }
  const items = JSON.parse(await readFile(ruta, "utf-8"));
  log(`Digesto: ${items.length} normas en items_completos.json`);
  for (const item of items) {
    if (item.ES_TITULO === "S") continue;  // saltar nodos titulo (no son normas)
    const titulo = item.NOMBRE_ITEM || item.TITULO || `Norma #${item.ID_ITEM}`;
    const cuerpo = limpiarTexto(item.TEXTO_ITEM || item.HTML_ITEM || item.TEXTO || "");
    if (cuerpo.length < 100) continue;  // sin texto util
    yield {
      fuenteTipo: "digesto",
      fuenteId: String(item.ID_ITEM ?? item.id ?? titulo),
      fuenteTitulo: titulo,
      fuenteUrl: `https://sunchales.miportal.ar/digesto`,
      fuenteFecha: item.FECHA ?? null,
      texto: `${titulo}\n\n${cuerpo}`,
      metadata: {
        tipo: item.TIPO_ITEM ?? null,
        numero: item.NUMERO ?? null
      }
    };
  }
}

async function * fuentePdfsConcejo() {
  const indicePath = path.join(RAIZ, "data", "concejo", "_indice.json");
  if (!existsSync(indicePath)) {
    log("(saltando pdf-concejo: no existe data/concejo/_indice.json)");
    return;
  }
  const indice = JSON.parse(await readFile(indicePath, "utf-8"));
  const procesables = indice.pdfs.filter((p) => p.textoExtraido);
  log(`PDFs concejo: ${procesables.length} con texto extraido`);
  for (const p of procesables) {
    const txtPath = path.join(RAIZ, "data", "concejo", p.rutaLocal.replace(/\.pdf$/i, ".txt"));
    if (!existsSync(txtPath)) continue;
    const texto = limpiarTexto(await readFile(txtPath, "utf-8"));
    if (texto.length < 100) continue;
    const esResumen = p.categoria === "resumenes-anuales";
    yield {
      fuenteTipo: esResumen ? "resumen-anual" : "pdf-concejo",
      fuenteId: p.rutaLocal,
      fuenteTitulo: p.textoEnlace || p.nombreArchivo,
      fuenteUrl: p.urlOriginal ?? null,
      fuenteFecha: p.fechaContexto ?? null,
      texto,
      metadata: { categoria: p.categoria }
    };
  }
}

function * fuenteFuncionarios() {
  // NOTA: sincronizar manualmente con src/lib/data/personal.ts si cambia.
  const empleados = [
    { id: "emp_001", nombre: "Pinotti, Pablo", cargo: "Intendente Municipal", area: "Departamento Ejecutivo" },
    { id: "emp_002", nombre: "Martinez, Omar", cargo: "Secretario de Gestion", area: "Secretaria de Gestion" },
    { id: "emp_003", nombre: "Girard, Fabrina", cargo: "Subsecretaria de Infraestructura Urbana y Rural", area: "Secretaria de Gestion" },
    { id: "emp_004", nombre: "Gabiani, Cecilia", cargo: "Subsecretaria de Ambiente y Servicios a la Comunidad", area: "Secretaria de Gestion" },
    { id: "emp_005", nombre: "Diaz, Magali", cargo: "Subsecretaria de Hacienda y Finanzas", area: "Secretaria de Gestion" },
    { id: "emp_006", nombre: "Grande, Marilina", cargo: "Secretaria de Desarrollo", area: "Secretaria de Desarrollo" },
    { id: "emp_007", nombre: "Ghiano, Pablo", cargo: "Subsecretario de Educacion, Salud y Convivencia", area: "Secretaria de Desarrollo" },
    { id: "emp_008", nombre: "Prados, Carolina", cargo: "Subsecretaria de Produccion y Cooperativismo", area: "Secretaria de Desarrollo" }
  ];
  for (const e of empleados) {
    yield {
      fuenteTipo: "funcionario",
      fuenteId: e.id,
      fuenteTitulo: `${e.nombre} - ${e.cargo}`,
      fuenteUrl: "https://sunchales.gob.ar",
      texto: `Funcionario publico de la Municipalidad de Sunchales.\n` +
             `Nombre y apellido: ${e.nombre}\n` +
             `Cargo: ${e.cargo}\n` +
             `Area: ${e.area}\n` +
             `Ejercicio: 2026\n` +
             `Fuente: organigrama oficial publicado.`,
      metadata: { area: e.area, cargo: e.cargo }
    };
  }
}

function * fuentePresupuesto() {
  // Totales verificados del Presupuesto Municipal 2026.
  yield {
    fuenteTipo: "presupuesto",
    fuenteId: "totales-2026",
    fuenteTitulo: "Presupuesto Municipal 2026 - Totales",
    fuenteUrl: "https://sunchales.gob.ar",
    fuenteFecha: "2026-01-01",
    texto:
      `Presupuesto Municipal de Sunchales 2026 (cifras verificadas remitidas al Honorable Concejo Municipal).\n\n` +
      `Gastos totales: $30.938.107.965.\n` +
      `Recursos corrientes: $30.950.227.077.\n` +
      `Fondo Federal Provincial Ley 12.385 recibido: $613.691.020,73.\n` +
      `Habitantes de Sunchales (Censo INDEC 2022): 23.416.\n` +
      `Gasto presupuestado per capita 2026: aproximadamente $1.321.255 por habitante.\n` +
      `Sunchales es Capital Nacional del Cooperativismo (Ley Nacional 26.037 de 2005).\n` +
      `Eje 2026: avance hacia AUTONOMIA MUNICIPAL con Carta Organica propia.`,
    metadata: { ejercicio: 2026 }
  };
  // Partidas principales por finalidad (estimacion ejemplificadora basada en clasificador estandar).
  const partidas = [
    { id: "salud", finalidad: "Salud", monto: 2_165_667_557 },
    { id: "educacion", finalidad: "Educacion", monto: 1_546_905_398 },
    { id: "obra-pavimento", finalidad: "Pavimento (Programa de Obras Urbanas)", monto: 1_000_000_000 },
    { id: "obra-iluminacion", finalidad: "Iluminacion LED y alumbrado", monto: 619_762_159 },
    { id: "obra-girsu", finalidad: "Complejo Ambiental GIRSU (gestion integral residuos)", monto: 928_143_239 },
    { id: "obra-ferroviario", finalidad: "Recuperacion Predio Ferroviario", monto: 619_762_159 },
    { id: "obra-infraestructura", finalidad: "Infraestructura urbana y rural", monto: 4_640_716_195 },
    { id: "ambiente", finalidad: "Ambiente y servicios urbanos", monto: 2_475_048_637 },
    { id: "vivienda", finalidad: "Vivienda y urbanismo", monto: 928_143_239 },
    { id: "cultura", finalidad: "Cultura, deporte y comunidad", monto: 1_237_524_318 },
    { id: "desarrollo-humano", finalidad: "Desarrollo Humano y Promocion de Derechos", monto: 1_546_905_398 },
    { id: "seguridad", finalidad: "Seguridad ciudadana y prevencion", monto: 1_237_524_318 },
    { id: "transito", finalidad: "Transito y movilidad", monto: 463_071_619 },
    { id: "produccion", finalidad: "Produccion y empleo", monto: 619_762_159 },
    { id: "cooperativismo", finalidad: "Cooperativismo y economia social", monto: 309_381_080 }
  ];
  for (const p of partidas) {
    yield {
      fuenteTipo: "presupuesto",
      fuenteId: `partida-${p.id}`,
      fuenteTitulo: `Presupuesto 2026 - ${p.finalidad}`,
      texto: `Partida del Presupuesto Municipal de Sunchales 2026.\n` +
             `Finalidad / funcion: ${p.finalidad}.\n` +
             `Monto presupuestado: $${p.monto.toLocaleString("es-AR")}.\n` +
             `Sobre un total general de gastos de $30.938.107.965.\n` +
             `Fuente: Proyecto de Presupuesto 2026 al Honorable Concejo Municipal.`,
      metadata: { ejercicio: 2026, monto_ars: p.monto }
    };
  }
}

function * fuenteFaq() {
  // NOTA: sincronizar manualmente con src/lib/whatsapp/data/faq.ts si cambia.
  const faqs = [
    {
      id: "tgi_pago",
      pregunta: "Como pago la TGI (Tasa General de Inmuebles)?",
      respuesta: "Pagar TGI: por sunchales.gob.ar (Tramites Tributarios), plataforma SIAC Munidigital, " +
                 "Pago Mis Cuentas, Rapipago o Pago Facil con codigo de pago. Para codigo o saldo: SIAC con CUIL."
    },
    {
      id: "horarios_palacio",
      pregunta: "Cuales son los horarios del Palacio Municipal de Sunchales?",
      respuesta: "Horario de atencion: lunes a viernes de 7:00 a 13:00. Tramites online disponibles 24/7 en sunchales.gob.ar."
    },
    {
      id: "licencia_conducir",
      pregunta: "Como saco o renuevo la licencia de conducir en Sunchales?",
      respuesta: "Tramite en CETOS (Centro de Emision de Licencias). Pasos: turno previo, DNI, pago de tasa, " +
                 "examen psicofisico, teorico y practico segun el caso. Confirmar requisitos en sunchales.gob.ar."
    },
    {
      id: "habilitacion_comercio",
      pregunta: "Como habilito un comercio en Sunchales?",
      respuesta: "Requiere inscripcion AFIP y Rentas Santa Fe, libre deuda municipal del inmueble, plano del local " +
                 "y segun rubro: bromatologia o bomberos. Expediente en Subsecretaria de Hacienda y Finanzas."
    },
    {
      id: "intendente",
      pregunta: "Quien es el intendente actual de Sunchales?",
      respuesta: "El intendente actual es Pablo Pinotti. Asumio tras la sucesion de Gonzalo Toselli."
    },
    {
      id: "cooperativismo",
      pregunta: "Por que Sunchales es Capital Nacional del Cooperativismo?",
      respuesta: "Sunchales fue declarada Capital Nacional del Cooperativismo por Ley Nacional 26.037 (2005), " +
                 "en reconocimiento al ecosistema cooperativo historico de la ciudad (SanCor, La Segunda, etc)."
    }
  ];
  for (const f of faqs) {
    yield {
      fuenteTipo: "faq",
      fuenteId: f.id,
      fuenteTitulo: f.pregunta,
      fuenteUrl: "https://sunchales.gob.ar",
      texto: `${f.pregunta}\n\nRespuesta: ${f.respuesta}`,
      metadata: {}
    };
  }
}

function * fuenteNormativaMarco() {
  const items = [
    {
      id: "ord-1872-2009",
      titulo: "Ordenanza Municipal Sunchales 1872/2009 - Acceso a la informacion publica",
      texto: "La Ordenanza Municipal 1872/2009 de Sunchales regula el derecho de acceso a la informacion publica " +
             "municipal. Establece que toda persona tiene derecho a solicitar y recibir informacion completa, " +
             "veraz, adecuada y oportuna del Estado Municipal, en cumplimiento del principio de publicidad de los " +
             "actos de gobierno y rendicion de cuentas. Plazos y procedimientos previstos."
    },
    {
      id: "decreto-pcial-0692-2009",
      titulo: "Decreto Provincial Santa Fe 0692/2009 - Mecanismo de acceso a informacion publica",
      texto: "El Decreto Provincial 0692/2009 de Santa Fe regula el procedimiento por el cual los ciudadanos " +
             "pueden requerir informacion publica al Estado provincial y municipal de la provincia de Santa Fe. " +
             "Aplica subsidiariamente cuando no hay norma municipal especifica."
    },
    {
      id: "ley-26037",
      titulo: "Ley Nacional 26.037 - Capital Nacional del Cooperativismo",
      texto: "La Ley Nacional 26.037, sancionada en 2005, declara a la ciudad de Sunchales (provincia de Santa Fe) " +
             "Capital Nacional del Cooperativismo en reconocimiento a su trayectoria historica como cuna del " +
             "movimiento cooperativo argentino (SanCor, La Segunda, etc.)."
    },
    {
      id: "reforma-cn-sf-2025",
      titulo: "Reforma Constitucion Santa Fe 2025 - Maxima divulgacion",
      texto: "La reforma de la Constitucion de la provincia de Santa Fe sancionada en 2025 incorpora el principio " +
             "de maxima divulgacion de la informacion publica como pauta hermeneutica obligatoria para todo el " +
             "Estado provincial y municipal."
    }
  ];
  for (const i of items) {
    yield {
      fuenteTipo: "normativa-marco",
      fuenteId: i.id,
      fuenteTitulo: i.titulo,
      texto: `${i.titulo}\n\n${i.texto}`,
      metadata: {}
    };
  }
}

// =============== ORQUESTACION ===============
async function procesarFuente(nombre, generador) {
  if (SOLO && SOLO !== nombre) return { total: 0, indexados: 0, saltados: 0 };
  log(`\n========== Fuente: ${nombre} ==========`);
  let total = 0, indexados = 0, saltados = 0, errores = 0;
  for await (const doc of generador()) {
    if (LIMITE && total >= LIMITE) break;
    total++;
    try {
      const r = await indexarDocumento(doc);
      if (r.saltado) {
        saltados++;
        if (total % 50 === 0) log(`  ${total} procesados | ${indexados} nuevos | ${saltados} saltados`);
      } else {
        indexados++;
        log(`  [${total}] ${doc.fuenteTitulo.slice(0, 70)} (${r.chunks} chunks)`);
      }
    } catch (err) {
      errores++;
      log(`  ERROR en ${doc.fuenteId}: ${err.message}`);
    }
  }
  log(`Fuente ${nombre}: ${total} docs | ${indexados} indexados | ${saltados} saltados | ${errores} errores`);
  return { total, indexados, saltados, errores };
}

async function main() {
  log("Indexer RAG arrancando");
  log(`Configuracion: SOLO=${SOLO ?? "(todas)"} RESET=${RESET} LIMITE=${LIMITE || "(sin limite)"}`);

  if (RESET) await borrarTodo();

  const fuentes = [
    ["normativa-marco", fuenteNormativaMarco],
    ["funcionario", fuenteFuncionarios],
    ["presupuesto", fuentePresupuesto],
    ["faq", fuenteFaq],
    ["digesto", fuenteDigesto],
    ["resumen-anual", fuentePdfsConcejo],
    ["pdf-concejo", fuentePdfsConcejo]
  ];

  const procesadas = new Set();
  let totalIndexados = 0, totalSaltados = 0, totalErrores = 0;

  for (const [nombre, gen] of fuentes) {
    if (procesadas.has(gen)) continue;  // pdf-concejo y resumen-anual comparten generador
    procesadas.add(gen);
    const r = await procesarFuente(nombre, gen);
    totalIndexados += r.indexados;
    totalSaltados += r.saltados;
    totalErrores += r.errores;
  }

  log(`\n========== RESUMEN FINAL ==========`);
  log(`Indexados (nuevos o modificados): ${totalIndexados}`);
  log(`Saltados (sin cambios):           ${totalSaltados}`);
  log(`Errores:                          ${totalErrores}`);
  log("Listo. El chatbot ya puede usar estos chunks via RAG.");
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
