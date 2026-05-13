"use client";

import { useEffect, useState } from "react";

/**
 * Hook minimalista para detectar si el viewport está en mobile.
 *
 * Usa matchMedia con el breakpoint Tailwind sm (640px por defecto).
 * Se actualiza al rotar el dispositivo / redimensionar ventana.
 *
 * En SSR devuelve `false` (asumimos desktop) — eso evita mismatch de
 * hidratación. El primer render post-hidratación sincroniza al estado
 * real. Si el chart tiene render-once (animación inicial), considerá
 * deshabilitar la animación o usar `key` para forzar remount.
 *
 * Uso típico en charts Recharts:
 *
 *   const esMobile = useIsMobile();
 *   <BarChart margin={{ left: esMobile ? 0 : 16 }} ...>
 *     <YAxis tick={{ fontSize: esMobile ? 10 : 12 }} />
 *   </BarChart>
 */
export function useIsMobile(maxWidthPx = 639): boolean {
  const [esMobile, setEsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const sync = () => setEsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [maxWidthPx]);
  return esMobile;
}
