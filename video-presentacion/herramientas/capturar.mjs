// Captura páginas reales de ciudadan.com (ancho escritorio, alto extendido)
// para usarlas dentro de las ventanas de navegador del video.
// Uso: node herramientas/capturar.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { abrirChrome } from "./cdp.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = join(RAIZ, "escenas", "capturas");
mkdirSync(DESTINO, { recursive: true });

const SITIO = "https://ciudadan.com";
const PAGINAS = [
  ["inicio", "/"],
  ["presupuesto", "/presupuesto"],
  ["contrataciones", "/contrataciones"],
  ["personal", "/personal"],
  ["digesto", "/digesto"],
  ["concejo", "/concejo"],
  ["brechas", "/brechas"],
  ["datos-abiertos", "/datos-abiertos"],
];

const ANCHO = 1440;
const ALTO = 2600;

const chrome = await abrirChrome({ ancho: ANCHO, alto: ALTO });
try {
  for (const [nombre, ruta] of PAGINAS) {
    await chrome.ir(SITIO + ruta);
    await new Promise((r) => setTimeout(r, 3500));
    // Oculta lo flotante (botón del chat, avisos) para que no quede pegado
    // en medio de la captura extendida.
    await chrome.evaluar(`(() => {
      for (const el of document.querySelectorAll('body *')) {
        if (getComputedStyle(el).position === 'fixed') el.style.display = 'none';
      }
      window.scrollTo(0, 0);
    })()`);
    await new Promise((r) => setTimeout(r, 400));
    const { data } = await chrome.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 88,
    });
    writeFileSync(join(DESTINO, `${nombre}.jpg`), Buffer.from(data, "base64"));
    console.log("capturada", ruta);
  }
} finally {
  await chrome.cerrar();
}
