// Cliente mínimo de Chrome DevTools Protocol: lanza Chrome headless y expone
// send(method, params) sobre la pestaña. Sin dependencias (usa el WebSocket
// global de Node 22+).

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export async function abrirChrome({ ancho, alto, escala = 1 }) {
  const puerto = 9300 + Math.floor(Math.random() * 500);
  const perfil = mkdtempSync(join(tmpdir(), "st-video-"));
  const proc = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${puerto}`,
      `--user-data-dir=${perfil}`,
      "--hide-scrollbars",
      "--mute-audio",
      "--no-first-run",
      "--no-default-browser-check",
      "--allow-file-access-from-files",
      `--window-size=${ancho},${alto}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let pagina;
  for (let i = 0; i < 100 && !pagina; i++) {
    await esperar(150);
    try {
      const lista = await (await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
      pagina = lista.find((t) => t.type === "page");
    } catch {}
  }
  if (!pagina) throw new Error("Chrome no respondió en el puerto de depuración");

  const ws = new WebSocket(pagina.webSocketDebuggerUrl);
  await new Promise((ok, mal) => {
    ws.onopen = ok;
    ws.onerror = mal;
  });

  let siguienteId = 1;
  const pendientes = new Map();
  const oyentes = new Map();
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pendientes.has(msg.id)) {
      const { ok, mal } = pendientes.get(msg.id);
      pendientes.delete(msg.id);
      msg.error ? mal(new Error(msg.error.message)) : ok(msg.result);
    } else if (msg.method && oyentes.has(msg.method)) {
      for (const f of oyentes.get(msg.method)) f(msg.params);
    }
  };

  const send = (method, params = {}) =>
    new Promise((ok, mal) => {
      const id = siguienteId++;
      pendientes.set(id, { ok, mal });
      ws.send(JSON.stringify({ id, method, params }));
    });

  const una = (method) =>
    new Promise((ok) => {
      const f = (p) => {
        oyentes.get(method).delete(f);
        ok(p);
      };
      if (!oyentes.has(method)) oyentes.set(method, new Set());
      oyentes.get(method).add(f);
    });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: ancho,
    height: alto,
    deviceScaleFactor: escala,
    mobile: false,
  });

  return {
    send,
    async ir(url) {
      const cargada = una("Page.loadEventFired");
      await send("Page.navigate", { url });
      await cargada;
    },
    async evaluar(expression) {
      const r = await send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    },
    async cerrar() {
      try {
        await send("Browser.close");
      } catch {}
      ws.close();
      await esperar(500);
      proc.kill();
      try {
        rmSync(perfil, { recursive: true, force: true });
      } catch {}
    },
  };
}
