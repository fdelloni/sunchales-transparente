#!/usr/bin/env node
/**
 * Bateria de tests automaticos contra el webhook de WhatsApp.
 *
 * Manda 17 preguntas variadas al endpoint del bot y muestra cada
 * respuesta. NO pasa por Twilio ni WhatsApp — golpea directo al
 * webhook simulando el formato form-urlencoded que Twilio envia.
 *
 * Requisitos:
 *   - TWILIO_VALIDATE_SIGNATURE=false en Vercel (asi acepta POSTs sin firma).
 *   - Bot deployado en https://ciudadan.com/api/v1/whatsapp
 *
 * Uso:
 *   node scripts/test-bot.mjs                # contra produccion (default)
 *   node scripts/test-bot.mjs --local        # contra http://localhost:3000
 */

const ARGS = process.argv.slice(2);
const LOCAL = ARGS.includes("--local");
const URL = LOCAL
  ? "http://localhost:3000/api/v1/whatsapp"
  : "https://ciudadan.com/api/v1/whatsapp";

// Numero falso solo para identificar la sesion. NO molesta a usuarios reales.
const FROM = "whatsapp:+5499999999999";
const TO = "whatsapp:+14155238886";
const PROFILE_NAME = "Tester Auto";

// Preguntas agrupadas por categoria. La columna `expectativa` es lo que
// idealmente deberia hacer el bot (lo usa el evaluador, no el bot).
const PREGUNTAS = [
  // === Datos generales del municipio ===
  { id:  1, p: "¿Cuántos habitantes tiene Sunchales?", expectativa: "responder con 23.416 (Censo INDEC 2022)" },
  { id:  2, p: "¿Por qué Sunchales es Capital del Cooperativismo?", expectativa: "Ley Nacional 26.037 de 2005" },

  // === Funcionarios ===
  { id:  3, p: "¿Quién es el intendente de Sunchales?", expectativa: "Pablo Pinotti" },
  { id:  4, p: "¿Quién es Fabrina Girard?", expectativa: "Subsecretaria de Infraestructura Urbana y Rural" },
  { id:  5, p: "¿Quiénes integran la Secretaría de Gestión?", expectativa: "Martinez, Girard, Gabiani, Diaz" },

  // === Presupuesto ===
  { id:  6, p: "¿Cuál es el presupuesto del municipio para 2026?", expectativa: "$30.938 millones gastos / $30.950M recursos" },
  { id:  7, p: "¿Cuánto se gasta en salud en 2026?", expectativa: "$2.165.667.557" },
  { id:  8, p: "¿Cuánto se invierte en obra pública?", expectativa: "subtotal de obras" },
  { id:  9, p: "¿Qué es el fondo provincial Ley 12.385?", expectativa: "$613.691.020 transferencia provincial" },

  // === Normativa ===
  { id: 10, p: "¿Qué dice la ordenanza 1872 de 2009?", expectativa: "Acceso a la informacion publica municipal" },
  { id: 11, p: "¿Qué normas hay sobre cooperativismo en Sunchales?", expectativa: "Ley 26.037 + ordenanzas locales si las hay" },

  // === Tramites ===
  { id: 12, p: "¿Cómo pago la TGI?", expectativa: "SIAC, Pago Mis Cuentas, Rapipago, etc" },
  { id: 13, p: "¿Cuáles son los horarios del Palacio Municipal?", expectativa: "lunes a viernes 7-13" },

  // === Reclamos (deberia ofrecer flujo guiado) ===
  { id: 14, p: "Tengo un bache enorme en la calle Belgrano",
            expectativa: "invitar a escribir 'reclamo' para abrir flujo formal" },

  // === Out of scope (deberia rechazar y derivar) ===
  { id: 15, p: "¿Quién ganó el último partido de Unión de Sunchales?",
            expectativa: "decir que no encuentra info y derivar al canal oficial" },
  { id: 16, p: "¿Qué opina el intendente del aborto?",
            expectativa: "rechazar opinion politica partidaria" },
  { id: 17, p: "¿Cuál es el clima hoy en Sunchales?",
            expectativa: "decir que no es informacion del municipio" }
];

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
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  const tMs = Date.now() - t0;

  if (!res.ok) {
    return { error: `HTTP ${res.status}`, ms: tMs };
  }

  const xml = await res.text();
  // extrae todos los <Message>...</Message>
  const matches = [...xml.matchAll(/<Message>([\s\S]*?)<\/Message>/g)];
  const respuesta = matches.map((m) => decodeXml(m[1].trim())).join("\n\n---\n\n");
  return { respuesta, ms: tMs };
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
  console.log(`\n=== TESTING BOT WHATSAPP ===`);
  console.log(`Endpoint: ${URL}`);
  console.log(`Sesion test: ${FROM}`);
  console.log(`${PREGUNTAS.length} preguntas\n`);

  for (const test of PREGUNTAS) {
    process.stdout.write(`[${String(test.id).padStart(2, "0")}/${PREGUNTAS.length}] `);
    process.stdout.write(`Q: ${test.p}\n`);
    process.stdout.write(`     Esperado: ${test.expectativa}\n`);
    try {
      const r = await consultar(test.p);
      if (r.error) {
        console.log(`     ❌ ERROR: ${r.error} (${r.ms}ms)`);
      } else {
        console.log(`     ✓ ${r.ms}ms`);
        console.log(`     R: ${r.respuesta.replace(/\n/g, "\n        ")}`);
      }
    } catch (err) {
      console.log(`     ❌ EXCEPCION: ${err.message}`);
    }
    console.log();
    // pausa entre preguntas para no bombardear el rate limit de Gemini
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`=== FIN ===\n`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
