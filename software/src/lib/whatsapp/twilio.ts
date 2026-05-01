/**
 * Helpers Twilio:
 *   - validacion de firma X-Twilio-Signature (autenticidad del webhook)
 *   - serializacion de la respuesta TwiML
 *
 * No usamos el SDK oficial de Twilio para mantener bundle chico.
 * El algoritmo de firma esta documentado en:
 *   https://www.twilio.com/docs/usage/webhooks/webhooks-security
 *
 * Algoritmo:
 *   1. concatenar la URL completa del webhook (con query string si hubiera)
 *   2. agregar, ordenados alfabeticamente por clave, cada par clave+valor
 *      del cuerpo POST (sin separadores)
 *   3. calcular HMAC-SHA1 con el authToken como clave
 *   4. base64 del resultado
 *   5. comparar (constant time) contra el header X-Twilio-Signature
 */

import crypto from "node:crypto";

/**
 * Devuelve true si la firma es valida o si la validacion esta deshabilitada
 * por feature-flag (TWILIO_VALIDATE_SIGNATURE != "true").
 *
 * Para el sandbox puede ser util desactivarla mientras debuggeas con ngrok,
 * pero en produccion debe estar SIEMPRE activa.
 */
export function validarFirmaTwilio(opts: {
  authToken: string;
  signatureHeader: string | null;
  fullUrl: string;
  formParams: Record<string, string>;
}): boolean {
  const validar = process.env.TWILIO_VALIDATE_SIGNATURE === "true";
  if (!validar) return true;
  if (!opts.signatureHeader || !opts.authToken) return false;

  const claves = Object.keys(opts.formParams).sort();
  let payload = opts.fullUrl;
  for (const k of claves) payload += k + opts.formParams[k];

  const esperada = crypto
    .createHmac("sha1", opts.authToken)
    .update(payload, "utf-8")
    .digest("base64");

  // Comparacion en tiempo constante para evitar timing attacks.
  // (Convertimos a Uint8Array para compatibilidad con tipos estrictos de @types/node.)
  const a = new Uint8Array(Buffer.from(esperada));
  const b = new Uint8Array(Buffer.from(opts.signatureHeader));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Construye una respuesta TwiML con uno o mas mensajes.
 * WhatsApp limita cada mensaje a ~1600 caracteres; partimos si hace falta.
 */
export function construirTwiML(textos: string[]): string {
  const cuerpos = textos
    .flatMap((t) => partirMensajeLargo(t, 1500))
    .map((t) => `  <Message>${escaparXml(t)}</Message>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n${cuerpos}\n</Response>`;
}

/**
 * Twilio recomienda mensajes <= 1600 chars. Partimos en bloques respetando
 * saltos de linea cuando es posible.
 */
function partirMensajeLargo(texto: string, max: number): string[] {
  if (texto.length <= max) return [texto];
  const bloques: string[] = [];
  let resto = texto;
  while (resto.length > max) {
    let corte = resto.lastIndexOf("\n", max);
    if (corte < max * 0.5) corte = max; // si no hay salto razonable, corte duro
    bloques.push(resto.slice(0, corte));
    resto = resto.slice(corte).replace(/^\n+/, "");
  }
  if (resto.length) bloques.push(resto);
  return bloques;
}

function escaparXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
