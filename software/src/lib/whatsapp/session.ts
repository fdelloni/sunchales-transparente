/**
 * Almacen de sesiones del chatbot.
 *
 * En desarrollo / sandbox: Map en memoria. Es perfectamente funcional dentro
 * del runtime de un solo lambda, pero NO es duradero entre invocaciones serverless.
 *
 * En produccion (cuando Supabase esta activo): se persiste en la tabla
 * `wa_sesiones` (ver migration 0003_whatsapp.sql), de modo que cualquier
 * lambda fria pueda recuperar el estado.
 *
 * El ciclo de vida es simple: cargar -> mutar -> guardar despues de la respuesta.
 * Sesiones inactivas mas de SESSION_TTL_MIN minutos se descartan al cargar.
 */

import { supabase } from "@/lib/supabase";
import type { EstadoSesion } from "@/lib/whatsapp/types";

const SESSION_TTL_MIN = 30;

const cache = new Map<string, EstadoSesion>();

export async function cargarSesion(from: string): Promise<EstadoSesion> {
  // 1. Intentar cache local
  const enCache = cache.get(from);
  if (enCache && !esVencida(enCache)) return enCache;

  // 2. Intentar Supabase si esta configurado
  if (supabase) {
    const { data, error } = await supabase
      .from("wa_sesiones")
      .select("*")
      .eq("from_number", from)
      .maybeSingle();
    if (!error && data) {
      const estado: EstadoSesion = {
        from: data.from_number,
        intentActivo: data.intent_activo,
        pasoReclamo: data.paso_reclamo,
        reclamoBorrador: data.reclamo_borrador ?? {},
        ultimaActualizacion: new Date(data.actualizado_en).getTime()
      };
      if (!esVencida(estado)) {
        cache.set(from, estado);
        return estado;
      }
    }
  }

  // 3. Sesion nueva
  return crearSesionNueva(from);
}

export async function guardarSesion(s: EstadoSesion): Promise<void> {
  s.ultimaActualizacion = Date.now();
  cache.set(s.from, s);

  if (supabase) {
    await supabase
      .from("wa_sesiones")
      .upsert({
        from_number: s.from,
        intent_activo: s.intentActivo,
        paso_reclamo: s.pasoReclamo,
        reclamo_borrador: s.reclamoBorrador,
        actualizado_en: new Date(s.ultimaActualizacion).toISOString()
      });
  }
}

/**
 * Aplica un parche al estado de la sesion.
 *
 *   - Mergea `reclamoBorrador` por defecto (cada paso del flujo agrega un campo).
 *   - Excepcion: cuando el parche pone `intentActivo` en null, el estado del
 *     reclamo se resetea por completo (cierre limpio del flujo).
 */
export function aplicarParche(s: EstadoSesion, parche: Partial<EstadoSesion>): EstadoSesion {
  const cierraFlujo = "intentActivo" in parche && parche.intentActivo === null;
  if (cierraFlujo) {
    return {
      ...s,
      ...parche,
      pasoReclamo: null,
      reclamoBorrador: {}
    };
  }
  return {
    ...s,
    ...parche,
    reclamoBorrador: { ...s.reclamoBorrador, ...(parche.reclamoBorrador ?? {}) }
  };
}

function crearSesionNueva(from: string): EstadoSesion {
  return {
    from,
    intentActivo: null,
    pasoReclamo: null,
    reclamoBorrador: {},
    ultimaActualizacion: Date.now()
  };
}

function esVencida(s: EstadoSesion): boolean {
  const minutos = (Date.now() - s.ultimaActualizacion) / 1000 / 60;
  return minutos > SESSION_TTL_MIN;
}
