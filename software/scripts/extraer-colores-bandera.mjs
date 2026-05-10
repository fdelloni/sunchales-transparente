// Descarga la bandera oficial de Sunchales y extrae los colores reales
// (oro arriba, verde abajo) calculando el color promedio de cada mitad,
// excluyendo píxeles muy claros u oscuros (escudo, espigas, estrellas).
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadImage, createCanvas } from "@napi-rs/canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const CACHE_DIR = path.join(RAIZ, "data");
await mkdir(CACHE_DIR, { recursive: true });

const URL_BANDERA = "https://sunchales.gob.ar/wp-content/uploads/2025/05/Bandera-de-Sunchales_01.jpg";
const CACHE_PATH = path.join(CACHE_DIR, "bandera-sunchales-oficial.jpg");

if (!existsSync(CACHE_PATH)) {
  console.log("Descargando", URL_BANDERA);
  const r = await fetch(URL_BANDERA, {
    headers: { "User-Agent": "Mozilla/5.0 (Sunchales Transparente)" },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  await writeFile(CACHE_PATH, Buffer.from(await r.arrayBuffer()));
  console.log("✓ Guardado en", CACHE_PATH);
}

const img = await loadImage(await readFile(CACHE_PATH));
console.log("Dimensiones:", img.width, "×", img.height);

const canvas = createCanvas(img.width, img.height);
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);
const data = ctx.getImageData(0, 0, img.width, img.height).data;

// Suponemos: bandera dividida horizontalmente. Mitad superior = oro, inferior = verde.
// Para evitar contaminación del escudo / fortín / estrellas, sólo tomamos píxeles
// en franjas exteriores (10%-30% y 70%-90% verticales) y descartamos píxeles
// que parezcan negros (escudo) o blancos (estrellas/espigas).

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function promedioFranja(yIniPct, yFinPct, esOro) {
  let sumR = 0, sumG = 0, sumB = 0, n = 0;
  const yIni = Math.floor(img.height * yIniPct);
  const yFin = Math.floor(img.height * yFinPct);
  for (let y = yIni; y < yFin; y++) {
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const { l, s } = rgbToHsl(r, g, b);
      // Filtramos demasiado claros (>0.92 l) y demasiado oscuros (<0.20 l) y
      // grises (saturación baja) que no son ni oro ni verde.
      if (l > 0.92 || l < 0.20 || s < 0.20) continue;
      // Filtramos por hue: si esperamos oro, hue 30-60; si verde, 80-160
      const { h } = rgbToHsl(r, g, b);
      if (esOro && (h < 25 || h > 70)) continue;
      if (!esOro && (h < 70 || h > 170)) continue;
      sumR += r; sumG += g; sumB += b; n++;
    }
  }
  if (n === 0) return null;
  return { r: Math.round(sumR / n), g: Math.round(sumG / n), b: Math.round(sumB / n), n };
}

function toHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// Franja oro: 5%-40% (mitad superior, esquivando borde y centro del escudo)
const oro = promedioFranja(0.05, 0.40, true);
// Franja verde: 60%-95% (mitad inferior)
const verde = promedioFranja(0.60, 0.95, false);

console.log("\nColores promedio extraídos (filtrando blanco/negro/gris):");
if (oro) console.log("  ORO:   ", toHex(oro), "RGB", oro.r, oro.g, oro.b, `(n=${oro.n} px)`);
if (verde) console.log("  VERDE: ", toHex(verde), "RGB", verde.r, verde.g, verde.b, `(n=${verde.n} px)`);

// Mostrar también el HSL para chequeo
if (oro) {
  const hsl = rgbToHsl(oro.r, oro.g, oro.b);
  console.log(`  oro HSL: ${hsl.h.toFixed(0)}° ${(hsl.s * 100).toFixed(0)}% ${(hsl.l * 100).toFixed(0)}%`);
}
if (verde) {
  const hsl = rgbToHsl(verde.r, verde.g, verde.b);
  console.log(`  verde HSL: ${hsl.h.toFixed(0)}° ${(hsl.s * 100).toFixed(0)}% ${(hsl.l * 100).toFixed(0)}%`);
}
