/**
 * Selector de proveedor de LLM.
 *
 * Variable de entorno:
 *   LLM_PROVIDER=google    → Gemini 2.5 Flash (recomendado por costo)
 *   LLM_PROVIDER=anthropic → Claude Haiku 4.5
 *
 * Si no se setea, intenta auto-detectar:
 *   - GOOGLE_API_KEY presente → google
 *   - ANTHROPIC_API_KEY presente → anthropic
 *   - ninguna → null (modo solo RAG / FAQ local)
 */

import type { Proveedor } from "@/lib/chat/proveedores/types";
import { proveedorAnthropic } from "@/lib/chat/proveedores/anthropic";
import { proveedorGoogle } from "@/lib/chat/proveedores/google";

const REGISTRO: Record<string, Proveedor> = {
  anthropic: proveedorAnthropic,
  google: proveedorGoogle
};

export function obtenerProveedor(): Proveedor | null {
  const explicito = (process.env.LLM_PROVIDER ?? "").toLowerCase().trim();
  if (explicito && REGISTRO[explicito]) {
    const p = REGISTRO[explicito];
    return p.estaConfigurado() ? p : null;
  }
  // Auto-detección: priorizamos Google porque es más barato.
  if (proveedorGoogle.estaConfigurado()) return proveedorGoogle;
  if (proveedorAnthropic.estaConfigurado()) return proveedorAnthropic;
  return null;
}

export type { Proveedor } from "@/lib/chat/proveedores/types";
