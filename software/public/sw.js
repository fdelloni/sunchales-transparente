/**
 * Service Worker — Sunchales Transparente.
 *
 * Estrategias:
 *   1. App shell (rutas estáticas): network-first con fallback a cache.
 *      Si hay red, siempre traemos lo último (importante para datos
 *      cívicos: no queremos servir presupuestos viejos del cache).
 *   2. Assets estáticos (/_next/static/, /icons/, /favicon.ico, manifest):
 *      stale-while-revalidate. Devuelve el cache si existe y refresca en
 *      paralelo.
 *   3. API calls (/api/v1/*): network-only. La transparencia exige datos
 *      frescos; nunca servimos respuestas cacheadas de API.
 *   4. POST y métodos no-GET: bypass total.
 *
 * Política de invalidación: cada deploy a Vercel cambia el SW_VERSION (más
 * abajo). Al activarse un SW nuevo, borra TODAS las caches anteriores. Esto
 * evita el problema clásico de PWAs sirviendo versiones obsoletas tras una
 * actualización.
 */

const SW_VERSION = "v1-2026-05-13";
const CACHE_SHELL = `sunchales-shell-${SW_VERSION}`;
const CACHE_ASSETS = `sunchales-assets-${SW_VERSION}`;

const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/favicon.ico",
];

// install: pre-cache del shell mínimo. No bloqueamos si algún recurso falla
// (por ejemplo, si Next.js todavía no ha generado todas las rutas).
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_SHELL)
      .then((cache) =>
        Promise.allSettled(APP_SHELL.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

// activate: borra caches viejas.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.endsWith(SW_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Helper: ¿la URL pertenece a assets estáticos cacheables?
function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/manifest.webmanifest"
  );
}

// Helper: ¿es ruta de API?
function isApi(url) {
  return url.pathname.startsWith("/api/");
}

// fetch handler.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Ignoramos métodos no-GET (POST de chat, suscripciones, etc.).
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Ignoramos requests cross-origin (tiles de OSM, Twilio, etc.).
  if (url.origin !== self.location.origin) return;

  // API: network-only — nunca servimos respuestas cacheadas.
  if (isApi(url)) return;

  // Assets estáticos: stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(CACHE_ASSETS).then(async (cache) => {
        const cached = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // App shell (HTML/navegación): network-first con fallback al cache.
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_SHELL).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match("/"))
        )
    );
  }
});

// Permite a la página enviar SKIP_WAITING para activar el nuevo SW
// inmediatamente cuando se publica una versión nueva.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
