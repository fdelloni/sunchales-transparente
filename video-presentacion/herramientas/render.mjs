// Renderiza escenas/index.html cuadro por cuadro con Chrome headless y lo
// codifica con ffmpeg. Cada cuadro se fija con seek(t): la animación no
// depende del reloj, así que el resultado es idéntico en cada corrida.

import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { abrirChrome } from "./cdp.mjs";

export async function renderizar({ html, tiempos, fps = 30, salida, cuadros }) {
  const chrome = await abrirChrome({ ancho: 1920, alto: 1080 });
  try {
    await chrome.ir(pathToFileURL(html).href);
    await chrome.evaluar(`window.listo`);
    await chrome.evaluar(`window.configurar(${JSON.stringify(tiempos)})`);

    const capturar = async (t, formato = "jpeg") => {
      await chrome.evaluar(`(window.seek(${t}), new Promise(r => requestAnimationFrame(() => r())))`);
      const { data } = await chrome.send("Page.captureScreenshot", {
        format: formato,
        quality: formato === "jpeg" ? 94 : undefined,
        optimizeForSpeed: true,
      });
      return Buffer.from(data, "base64");
    };

    // Recorre el video una vez para detectar palabras clave que no están en el guion.
    const faltan = await chrome.evaluar(
      `(() => { for (let t = 0; t < ${tiempos.total}; t += 0.5) window.seek(t); return [...window.FALTAN]; })()`,
    );
    if (faltan.length) console.log(`  ⚠ palabras clave que no encontré en el guion: ${faltan.join(", ")}`);

    if (cuadros) {
      for (const [t, archivo] of cuadros) writeFileSync(archivo, await capturar(t, "png"));
      return;
    }

    const ffmpeg = spawn(
      "ffmpeg",
      ["-hide_banner", "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps),
       "-c:v", "mjpeg", "-i", "-",
       // Los JPEG de Chrome vienen en rango completo; se pasa a rango TV
       // para que cualquier reproductor (y las redes al recodificar) muestre
       // los colores igual.
       "-vf", "scale=in_range=pc:out_range=tv,format=yuv420p", "-color_range", "tv",
       "-c:v", "libx264", "-preset", "medium", "-crf", "18",
       "-r", String(fps), "-movflags", "+faststart", salida],
      { stdio: ["pipe", "inherit", "inherit"] },
    );
    const terminado = new Promise((ok, mal) =>
      ffmpeg.on("close", (c) => (c === 0 ? ok() : mal(new Error(`ffmpeg salió con ${c}`)))),
    );

    const n = Math.round(tiempos.total * fps);
    const inicio = Date.now();
    for (let i = 0; i < n; i++) {
      const jpg = await capturar(i / fps);
      if (!ffmpeg.stdin.write(jpg)) await new Promise((r) => ffmpeg.stdin.once("drain", r));
      if (i % 150 === 0 || i === n - 1) {
        const seg = (Date.now() - inicio) / 1000;
        const resta = ((n - i - 1) * seg) / (i + 1);
        process.stdout.write(`  cuadro ${i + 1}/${n} · faltan ~${Math.ceil(resta)} s\n`);
      }
    }
    ffmpeg.stdin.end();
    await terminado;
  } finally {
    await chrome.cerrar();
  }
}
