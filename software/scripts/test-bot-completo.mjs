#!/usr/bin/env node
/**
 * Bateria EXTENDIDA de pruebas del bot WhatsApp.
 *
 * 76 preguntas organizadas por categoria. Golpea directo al webhook
 * de produccion (https://ciudadan.com/api/v1/whatsapp) simulando ser
 * Twilio. NO usa WhatsApp Web ni Twilio Sandbox real — todo HTTP.
 *
 * Salida:
 *   - Por consola: cada pregunta + respuesta + tiempo
 *   - Archivo: INFORME_BOT_PRUEBAS.md (en raiz del workspace) con el
 *     resultado completo para revisar despues con calma.
 *
 * Uso:
 *   node scripts/test-bot-completo.mjs                 # contra produccion
 *   node scripts/test-bot-completo.mjs --local         # contra localhost:3000
 *   node scripts/test-bot-completo.mjs --soloCategoria=funcionarios   # filtrar
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");

const ARGS = process.argv.slice(2);
const LOCAL = ARGS.includes("--local");
const SOLO_CAT = ARGS.find((a) => a.startsWith("--soloCategoria="))?.split("=")[1];
const URL = LOCAL
  ? "http://localhost:3000/api/v1/whatsapp"
  : "https://ciudadan.com/api/v1/whatsapp";

const FROM = "whatsapp:+5499999999999";
const TO = "whatsapp:+14155238886";
const PROFILE_NAME = "Tester Auto Extendido";
const PAUSA_MS = 1500;

const BATERIA = [
  // === Funcionarios y organigrama del DEM ===
  { cat: "funcionarios", p: "¿Quién es el subsecretario de Hacienda?" },
  { cat: "funcionarios", p: "¿Qué hace la Subsecretaría de Ambiente y Servicios?" },
  { cat: "funcionarios", p: "¿Cuál es el sueldo de la Secretaría de Producción y Empleo?" },
  { cat: "funcionarios", p: "¿Cuándo asumió Pinotti?" },
  { cat: "funcionarios", p: "¿Quién está a cargo de comunicación?" },
  { cat: "funcionarios", p: "¿Cuánto cobra el intendente?" },
  { cat: "funcionarios", p: "¿Quiénes integran la Secretaría de Desarrollo?" },
  { cat: "funcionarios", p: "¿Cómo está organizado el organigrama municipal?" },

  // === Presupuesto y obras ===
  { cat: "presupuesto", p: "¿Cuánto presupuesto tiene Salud para 2026?" },
  { cat: "presupuesto", p: "¿Qué destino tiene el Fondo Federal Provincial Ley 12.385?" },
  { cat: "presupuesto", p: "¿Cuál es el gasto per cápita del municipio?" },
  { cat: "presupuesto", p: "¿En qué obras invierte la municipalidad este año?" },
  { cat: "presupuesto", p: "¿Cuánto se destina a seguridad?" },
  { cat: "presupuesto", p: "¿Cuál es el presupuesto total 2026?" },
  { cat: "presupuesto", p: "¿Qué partidas hay de obra pública y por cuánto cada una?" },

  // === Concejo Municipal ===
  { cat: "concejo", p: "¿Quién preside el Concejo?" },
  { cat: "concejo", p: '¿Cuántos concejales son de "La Libertad Avanza"?' },
  { cat: "concejo", p: "¿En qué comisiones participa Brenda Torriri?" },
  { cat: "concejo", p: "¿Quién integra la Mesa de Coordinación Plan Integral de Género?" },
  { cat: "concejo", p: "¿Cómo se contacta al Concejo?" },
  { cat: "concejo", p: "¿Cuántas comisiones tiene el Concejo en total?" },
  { cat: "concejo", p: "¿Quién es la secretaria administrativa del Concejo?" },

  // === Juzgado Municipal de Faltas ===
  { cat: "juzgado", p: "¿En qué horarios atiende el Juzgado de Faltas?" },
  { cat: "juzgado", p: "¿Qué tipos de infracciones resuelve el Juzgado?" },
  { cat: "juzgado", p: "¿Qué es la UCM en el Juzgado?" },
  { cat: "juzgado", p: "¿Dónde queda el Juzgado de Faltas?" },
  { cat: "juzgado", p: "¿Hay plan de modernización del Juzgado?" },

  // === Recaudación y tributos ===
  { cat: "recaudacion", p: "¿Cuánto se recauda por TGI urbana?" },
  { cat: "recaudacion", p: "¿Cuánto recauda el municipio por coparticipación?" },
  { cat: "recaudacion", p: "¿De dónde vienen los recursos del municipio?" },
  { cat: "recaudacion", p: "¿Qué es el DReI?" },
  { cat: "recaudacion", p: "¿Cuánto recauda el municipio en total?" },

  // === Normativa y derecho de acceso ===
  { cat: "normativa", p: "¿Qué plazo tiene el municipio para responder un pedido de información?" },
  { cat: "normativa", p: "¿Qué pasa si el municipio no contesta un pedido de información en plazo?" },
  { cat: "normativa", p: "¿Qué dice la Ord. 1872 sobre patrocinio letrado?" },
  { cat: "normativa", p: "¿Cuál es el procedimiento para acceder a información pública en Sunchales?" },
  { cat: "normativa", p: "¿Qué dice la Reforma constitucional de Santa Fe 2025 sobre transparencia?" },

  // === Catastro y zonificación ===
  { cat: "catastro", p: "¿Qué clases de suelo existen en Sunchales?" },
  { cat: "catastro", p: "¿Qué dice la Ley 26.209?" },
  { cat: "catastro", p: "¿Dónde queda la oficina de catastro?" },
  { cat: "catastro", p: "¿Qué es el SCIT?" },
  { cat: "catastro", p: "¿Qué dice la Ord. 2800 sobre el plano de áreas?" },

  // === Contrataciones y licitaciones ===
  { cat: "contrataciones", p: "¿Cuántas licitaciones tiene el municipio?" },
  { cat: "contrataciones", p: "¿Qué es la cadena hash de contrataciones?" },
  { cat: "contrataciones", p: "¿Hay licitaciones de luminarias?" },

  // === Brechas de transparencia ===
  { cat: "brechas", p: "¿Qué información obligatoria no está publicada?" },
  { cat: "brechas", p: "¿Qué brecha hay en el Juzgado de Faltas?" },
  { cat: "brechas", p: "¿Hay brechas en contrataciones?" },
  { cat: "brechas", p: "Listame todas las brechas de transparencia detectadas" },
  { cat: "brechas", p: "¿Qué dice la Ord. 1872 sobre las brechas?" },

  // === FAQ y trámites ===
  { cat: "tramites", p: "¿Cómo habilito un comercio en Sunchales?" },
  { cat: "tramites", p: "¿Cómo pago la TGI?" },
  { cat: "tramites", p: "¿Dónde se saca el carnet?" },
  { cat: "tramites", p: "¿En qué horario atiende el Palacio Municipal?" },
  { cat: "tramites", p: "¿Por qué Sunchales es Capital del Cooperativismo?" },

  // === Preguntas-trampa (deben derivar sin inventar) ===
  { cat: "trampa", p: "¿Quién ganó el partido del domingo?" },
  { cat: "trampa", p: "¿Qué opinás del intendente?" },
  { cat: "trampa", p: "¿Cómo va a estar el clima mañana?" },
  { cat: "trampa", p: "¿Dónde compro pan?" },
  { cat: "trampa", p: "¿Cuánto vale el dólar?" },
  { cat: "trampa", p: "¿Quién es el mejor concejal?" },

  // === Preguntas panorámicas (testean exhaustividad) ===
  { cat: "panoramica", p: "¿Quiénes son todos los funcionarios de la Secretaría de Desarrollo?" },
  { cat: "panoramica", p: "Listame todas las comisiones del Concejo" },
  { cat: "panoramica", p: "¿Cuáles son todas las brechas de transparencia detectadas?" },
  { cat: "panoramica", p: "¿Qué obras públicas hay para 2026 y por cuánto cada una?" },
  { cat: "panoramica", p: "¿Cómo se compone el organigrama municipal?" },
  { cat: "panoramica", p: "¿Cuáles son todos los tributos que cobra el municipio?" },
  { cat: "panoramica", p: "¿Qué normativa de transparencia aplica al municipio?" },

  // === Edge cases ===
  { cat: "edge", p: "¿Cuál es el régimen catastral aplicable?" },
  { cat: "edge", p: "¿Cuáles son los principios del derecho de acceso a la información?" },
  { cat: "edge", p: "¿Qué tribunal aplica el Juzgado: provincial o municipal?" },
  { cat: "edge", p: "¿Cuántas personas hay en planta permanente?" },
  { cat: "edge", p: "¿Hay digesto consultable?" },
  { cat: "edge", p: "¿Cómo se actualiza la información del bot?" },

  // === Variantes de la misma pregunta (boost del retriever) ===
  { cat: "variantes", p: "¿Cuánto gana el intendente?" },
  { cat: "variantes", p: "¿Sueldo del intendente?" },
  { cat: "variantes", p: "¿Cuál es la remuneración del intendente?" },
  { cat: "variantes", p: "¿Qué cobra Pinotti?" },
  { cat: "variantes", p: "¿Cuál es el salario de Pablo Pinotti?" }
];

// Filtro por categoria si se paso --soloCategoria
const PREGUNTAS = SOLO_CAT ? BATERIA.filter((q) => q.cat === SOLO_CAT) : BATERIA;

async function consultar(pregunta) {
  const body = new URLSearchParams({
    From: FROM,
    To: TO,
    Body: pregunta,
    NumMedia: "0",
    ProfileName: PROFILE_NAME,
    SmsMessageSid: `SMtest${Date.now()}`,
    AccountSid: "ACtest"
  });
  const t0 = Date.now();
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    const tMs = Date.now() - t0;
    if (!res.ok) return { error: `HTTP ${res.status}`, ms: tMs };
    const xml = await res.text();
    const matches = [...xml.matchAll(/<Message>([\s\S]*?)<\/Message>/g)];
    const respuesta = matches.map((m) => decodeXml(m[1].trim())).join("\n\n---\n\n");
    return { respuesta, ms: tMs };
  } catch (err) {
    return { error: err.message, ms: Date.now() - t0 };
  }
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function main() {
  console.log(`\n=== TEST BOT WHATSAPP COMPLETO ===`);
  console.log(`Endpoint: ${URL}`);
  console.log(`Total preguntas: ${PREGUNTAS.length}${SOLO_CAT ? ` (filtradas por ${SOLO_CAT})` : ""}`);
  console.log(`Tiempo estimado: ~${Math.round((PREGUNTAS.length * (PAUSA_MS + 5000)) / 60000)} minutos\n`);

  const resultados = [];
  const inicio = Date.now();

  for (let i = 0; i < PREGUNTAS.length; i++) {
    const test = PREGUNTAS[i];
    const numero = String(i + 1).padStart(2, "0");
    process.stdout.write(`[${numero}/${PREGUNTAS.length}] (${test.cat}) ${test.p.slice(0, 70)}\n`);

    const r = await consultar(test.p);
    if (r.error) {
      console.log(`     ❌ ERROR: ${r.error} (${r.ms}ms)\n`);
      resultados.push({ ...test, error: r.error, ms: r.ms });
    } else {
      console.log(`     ✓ ${r.ms}ms — ${r.respuesta.slice(0, 100).replace(/\n/g, " ")}...\n`);
      resultados.push({ ...test, respuesta: r.respuesta, ms: r.ms });
    }

    await new Promise((r) => setTimeout(r, PAUSA_MS));
  }

  const duracionMin = ((Date.now() - inicio) / 60000).toFixed(1);
  console.log(`\n=== FIN (${duracionMin} min) ===\n`);

  // Generar informe Markdown
  const informe = generarInforme(resultados, duracionMin);
  const rutaInforme = path.join(RAIZ, "..", "INFORME_BOT_PRUEBAS.md");
  writeFileSync(rutaInforme, informe, "utf-8");
  console.log(`📄 Informe guardado en: ${rutaInforme}\n`);
}

function generarInforme(resultados, duracionMin) {
  const fecha = new Date().toISOString().split("T")[0];
  const total = resultados.length;
  const errores = resultados.filter((r) => r.error).length;
  const okCount = total - errores;

  const porCategoria = {};
  for (const r of resultados) {
    if (!porCategoria[r.cat]) porCategoria[r.cat] = [];
    porCategoria[r.cat].push(r);
  }

  let md = `# Informe de pruebas del bot WhatsApp\n\n`;
  md += `**Fecha**: ${fecha}\n`;
  md += `**Endpoint**: ${URL}\n`;
  md += `**Total**: ${total} preguntas · **OK**: ${okCount} · **Errores**: ${errores}\n`;
  md += `**Duración**: ${duracionMin} minutos\n\n`;
  md += `---\n\n`;

  for (const [cat, items] of Object.entries(porCategoria)) {
    md += `## ${cat.toUpperCase()}\n\n`;
    for (const r of items) {
      md += `### ${r.p}\n`;
      md += `*${r.ms}ms*\n\n`;
      if (r.error) {
        md += `❌ **ERROR**: ${r.error}\n\n`;
      } else {
        md += `${r.respuesta}\n\n`;
      }
      md += `---\n\n`;
    }
  }
  return md;
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
