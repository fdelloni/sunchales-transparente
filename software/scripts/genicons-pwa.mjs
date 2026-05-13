import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("/sessions/great-inspiring-fermi/mnt/software/public/icons", { recursive: true });

/**
 * Pinta el ícono Sunchales Transparente:
 *  - top half oro (#FCC81D), bottom half verde (#ADCF3D)
 *  - círculo blanco al centro
 *  - "S" verde forestal (#0F5E1F)
 *  - subrayado oro oscuro
 *
 * @param {number} size   tamaño del cuadrado
 * @param {boolean} maskable  si true, agrega "safe zone" interior 80%
 */
function render(size, maskable = false) {
  const c = createCanvas(size, size);
  const ctx = c.getContext("2d");

  // Maskable: deja un 10% de padding alrededor, pintando todo con verde para
  // que el sistema operativo no recorte contenido importante.
  if (maskable) {
    ctx.fillStyle = "#ADCF3D";
    ctx.fillRect(0, 0, size, size);
  }

  // Calculamos zona "segura" (80% en maskable, 100% en non-maskable).
  const pad = maskable ? size * 0.1 : 0;
  const innerSize = size - pad * 2;
  const inner = (x) => pad + x * innerSize;

  // Fondo dividido oro/verde
  ctx.fillStyle = "#FCC81D";
  ctx.fillRect(inner(0), inner(0), innerSize, innerSize / 2);
  ctx.fillStyle = "#ADCF3D";
  ctx.fillRect(inner(0), inner(0.5), innerSize, innerSize / 2);

  // Círculo blanco
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.arc(inner(0.5), inner(0.5), innerSize * 0.33, 0, Math.PI * 2);
  ctx.fill();

  // "S" verde forestal
  ctx.fillStyle = "#0F5E1F";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Georgia no está en el sandbox; usamos serif genérico que se renderiza
  // con DejaVu Serif. El glifo "S" se ve bien.
  ctx.font = `bold ${innerSize * 0.55}px serif`;
  // ligero offset vertical para alinear con el centro óptico
  ctx.fillText("S", inner(0.5), inner(0.52));

  // Subrayado oro oscuro
  ctx.fillStyle = "#9A7400";
  const undW = innerSize * 0.30;
  const undH = innerSize * 0.018;
  ctx.fillRect(inner(0.5) - undW / 2, inner(0.72), undW, undH);

  return c.toBuffer("image/png");
}

const base = "/sessions/great-inspiring-fermi/mnt/software/public/icons";

writeFileSync(`${base}/icon-192.png`, render(192, false));
writeFileSync(`${base}/icon-512.png`, render(512, false));
writeFileSync(`${base}/icon-maskable-192.png`, render(192, true));
writeFileSync(`${base}/icon-maskable-512.png`, render(512, true));
writeFileSync(`${base}/apple-touch-icon.png`, render(180, false));

console.log("OK iconos generados");
