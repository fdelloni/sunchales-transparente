#!/usr/bin/env node
/**
 * Diagnostico de la API key de Gemini.
 * Lista todos los modelos a los que la key tiene acceso y sus metodos soportados.
 *
 * Uso: node scripts/diagnostico-gemini.mjs
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");

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

const KEY = process.env.GOOGLE_API_KEY;
if (!KEY) {
  console.error("Falta GOOGLE_API_KEY en .env.local");
  process.exit(1);
}

console.log("Consultando modelos disponibles para tu API key...\n");

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}`;
const res = await fetch(url);

if (!res.ok) {
  const txt = await res.text();
  console.error(`ERROR ${res.status} al consultar modelos:`);
  console.error(txt);
  process.exit(1);
}

const data = await res.json();
const modelos = data.models || [];

console.log(`Total modelos disponibles: ${modelos.length}\n`);

// Filtrar y mostrar especialmente los que soportan embeddings
const conEmbed = modelos.filter((m) =>
  m.supportedGenerationMethods?.includes("embedContent")
);
const conGenerate = modelos.filter((m) =>
  m.supportedGenerationMethods?.includes("generateContent")
);

console.log("=== MODELOS DE EMBEDDINGS (soportan embedContent) ===");
if (conEmbed.length === 0) {
  console.log("  (ninguno disponible)");
  console.log("  Tu API key NO puede generar embeddings.");
} else {
  for (const m of conEmbed) {
    console.log(`  - ${m.name} (dim: ${m.outputTokenLimit ?? "?"})`);
  }
}

console.log("\n=== MODELOS DE GENERACION (soportan generateContent) ===");
const generate = conGenerate.slice(0, 10);
for (const m of generate) {
  console.log(`  - ${m.name}`);
}
if (conGenerate.length > 10) console.log(`  ... y ${conGenerate.length - 10} mas`);

console.log("\n=== TODOS LOS MODELOS ===");
for (const m of modelos) {
  const metodos = (m.supportedGenerationMethods || []).join(", ");
  console.log(`  - ${m.name} [${metodos}]`);
}
