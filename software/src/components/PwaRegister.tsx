"use client";

/**
 * Registra el Service Worker /sw.js.
 *
 * Se monta una sola vez en el RootLayout. Es un componente cliente vacío
 * (sin UI) — su única responsabilidad es ejecutar el registro del SW
 * después de hidratar.
 *
 * Política:
 *  - En desarrollo (NODE_ENV !== "production") NO registramos el SW para
 *    evitar que caches viejas interfieran con cambios en caliente.
 *  - Si se detecta una versión nueva esperando, le mandamos SKIP_WAITING
 *    para que tome el control inmediatamente.
 */

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    // Cuando un SW nuevo toma control, recargamos UNA vez para que la
    // app instalada use el HTML/CSS/JS nuevos. Sin esto, la PWA abierta
    // sigue corriendo la versión vieja hasta que el usuario la mate.
    let recargado = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (recargado) return;
      recargado = true;
      window.location.reload();
    });

    const onLoad = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          // No usar el HTTP-cache para el script del SW ni sus imports:
          // garantiza que cada visita revalide /sw.js contra el servidor.
          updateViaCache: "none",
        });

        // Si ya hay una versión nueva en "waiting", activarla.
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });

        // Buscar updates al volver a la app (la PWA instalada puede pasar
        // días suspendida sin una navegación "real" que dispare el update).
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            reg.update().catch(() => {});
          }
        });

        // Detectar actualizaciones posteriores.
        reg.addEventListener("updatefound", () => {
          const nuevo = reg.installing;
          if (!nuevo) return;
          nuevo.addEventListener("statechange", () => {
            if (
              nuevo.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Hay una nueva versión esperando; la activamos sin pedir
              // confirmación al usuario porque el contenido cambia con
              // frecuencia (datos cívicos, presupuesto, etc.).
              nuevo.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      } catch (err) {
        // SW no es crítico; el sitio funciona sin él. Silenciamos errores
        // para no ensuciar la consola del usuario final.
        if (process.env.NODE_ENV === "development") {
          console.warn("PWA SW registration failed", err);
        }
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return null;
}
