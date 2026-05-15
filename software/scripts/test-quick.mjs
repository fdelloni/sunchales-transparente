#!/usr/bin/env node
/**
 * Test rapido: prueba puntualmente las 2 preguntas que quedaron pendientes
 * tras la ultima ronda de fixes.
 *
 * Uso:
 *   node scripts/test-quick.mjs
 */

const URL = "https://ciudadan.com/api/v1/whatsapp";
const FROM = "whatsapp:+5499999999999";
const TO = "whatsapp:+14155238886";

const PREGUNTAS = [
  "¿Hay digesto consultable?",
  "¿Qué cobra Pinotti?"
];

async function consultar(pregunta) {
  const body = new URLSearchParams({
    From: FROM,
    To: TO,
    Body: pregunta,
    NumMedia: "0",
    ProfileName: "Quick Test",
    SmsMessageSid: `SMquick${Date.now()}`,
    AccountSid: "ACquick"
  });
  const t0 = Date.now();
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  const tMs = Date.now() - t0;
  if (!res.ok) return { error: `HTTP ${res.status}`, ms: tMs };
  const xml = await res.text();
  const matches = [...xml.matchAll(/<Message>([\s\S]*?)<\/Message>/g)];
  const respuesta = matches
    .map((m) => m[1].trim()
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'"))
    .join("\n\n---\n\n");
  return { respuesta, ms: tMs };
}

async function main() {
  console.log(`\n=== TEST QUICK ===`);
  console.log(`Endpoint: ${URL}\n`);

  for (let i = 0; i < PREGUNTAS.length; i++) {
    const p = PREGUNTAS[i];
    console.log(`────────────────────────────────────────────────────────────`);
    console.log(`Pregunta ${i + 1}/${PREGUNTAS.length}: ${p}`);
    console.log(`────────────────────────────────────────────────────────────`);
    const r = await consultar(p);
    if (r.error) {
      console.log(`❌ ERROR: ${r.error} (${r.ms}ms)\n`);
    } else {
      console.log(`✓ ${r.ms}ms\n`);
      console.log(r.respuesta);
      console.log();
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`=== FIN ===\n`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
