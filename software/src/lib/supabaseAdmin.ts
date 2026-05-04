/**
 * Cliente Supabase ADMIN (server-side, con service_role).
 *
 * Este cliente bypassa RLS, así que SOLO debe usarse en API routes / server
 * components, NUNCA en client components ni exponerse al navegador.
 *
 * Si las env vars no están configuradas, exporta `null` y la app sigue
 * funcionando con el stub local (los endpoints que dependan de esto deben
 * chequear `if (!supabaseAdmin)` y devolver el modo demo).
 *
 * Variables requeridas en Vercel → Settings → Environment Variables:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin: SupabaseClient | null =
  url && serviceRole
    ? createClient(url, serviceRole, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;

export const isSupabaseAdminEnabled = (): boolean => supabaseAdmin !== null;
