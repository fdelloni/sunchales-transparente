/**
 * Cliente Supabase — feature-flag.
 *
 *  Si las variables de entorno NEXT_PUBLIC_SUPABASE_URL y
 *  NEXT_PUBLIC_SUPABASE_ANON_KEY están definidas, exportamos un cliente
 *  Supabase real. Si no están, exportamos `null` y la app sigue
 *  funcionando con los datos locales en src/lib/data/*.
 *
 *  De esta manera, el deploy a Vercel funciona sin Supabase desde el
 *  primer momento, y para activar Supabase basta con cargar las dos
 *  variables en Vercel → Settings → Environment Variables y volver a
 *  desplegar (no se toca código).
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon) : null;

export const isSupabaseEnabled = (): boolean => supabase !== null;

/**
 * Helper genérico: si hay Supabase activo, ejecuta la query;
 * si no, devuelve el fallback (datos locales).
 */
export async function fromSupabaseOrLocal<T>(
  query: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  if (!supabase) return fallback();
  try {
    return await query();
  } catch (err) {
    console.warn("[supabase] query falló, usando fallback local:", err);
    return fallback();
  }
}
