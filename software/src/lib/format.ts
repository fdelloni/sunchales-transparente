/**
 * Helpers de formato para AR-ES.
 * Centralizar acá para que toda la app muestre cifras de manera consistente.
 */

const AR = new Intl.NumberFormat("es-AR");
const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

export function formatNumber(n: number): string {
  return AR.format(n);
}

export function formatARS(n: number): string {
  return ARS.format(n);
}

/** "30.938.107.965" → "$30,9 mil M" — útil para KPIs grandes */
export function formatARSCompact(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2).replace(".", ",")} mil M`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(".", ",")} M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)} mil`;
  return ARS.format(n);
}

/** Genera hash SHA-256 para audit_log (en cliente sería crypto.subtle) */
export async function sha256(data: string): Promise<string> {
  const buf = new TextEncoder().encode(data);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
