/**
 * Webhook de Twilio para WhatsApp.
 *
 *   POST /api/v1/whatsapp
 *
 * Twilio envia application/x-www-form-urlencoded con campos como:
 *   From      = "whatsapp:+5493493xxxxxx"
 *   To        = "whatsapp:+14155238886"
 *   Body      = texto del mensaje
 *   NumMedia  = "0"
 *   ProfileName, MediaUrl0, MediaContentType0, etc.
 *
 * Respondemos con TwiML (XML). Twilio reenvia automaticamente cada
 * <Message> al numero del usuario.
 *
 * Seguridad:
 *   - Validacion de firma X-Twilio-Signature (controlable por flag).
 *   - Sin auth de usuario: cualquiera que escribe al numero del bot recibe respuesta.
 *
 * Performance:
 *   - Twilio espera la respuesta en <15s. Si necesitamos mas, hay que ack
 *     inmediato y enviar mensajes posteriores via API saliente.
 *   - Por ahora todos los handlers son sincronos (<2s) asi que respondemos directo.
 */

import { NextRequest, NextResponse } from "next/server";
import { validarFirmaTwilio, construirTwiML } from "@/lib/whatsapp/twilio";
import { rutearMensaje } from "@/lib/whatsapp/router";
import { cargarSesion, guardarSesion, aplicarParche } from "@/lib/whatsapp/session";
import { supabase } from "@/lib/supabase";
import type { MensajeEntrante } from "@/lib/whatsapp/types";

// Forzamos runtime Node.js (necesitamos `crypto` y request body raw).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Leer body como form-urlencoded
  const rawBody = await req.text();
  const params = parseFormUrlEncoded(rawBody);

  // 2. Validar firma de Twilio
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? "";
  const fullUrl = construirUrlPublica(req);
  const firmaOk = validarFirmaTwilio({
    authToken,
    signatureHeader: req.headers.get("x-twilio-signature"),
    fullUrl,
    formParams: params
  });
  if (!firmaOk) {
    console.warn("[whatsapp] firma Twilio invalida; rechazando request");
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 3. Construir mensaje entrante
  const entrada: MensajeEntrante = {
    from: params["From"] ?? "",
    to: params["To"] ?? "",
    body: params["Body"] ?? "",
    numMedia: parseInt(params["NumMedia"] ?? "0", 10) || 0,
    mediaUrls: extraerMediaUrls(params),
    profileName: params["ProfileName"]
  };

  if (!entrada.from || !entrada.body) {
    return responderTwiML([]);
  }

  try {
    // 4. Cargar sesion
    const sesion = await cargarSesion(entrada.from);

    // 5. Rutear y ejecutar handler
    const { handler, intent } = await rutearMensaje({ entrada, sesion });
    const { respuesta, nuevoEstado } = await handler({ entrada, sesion });

    // 6. Persistir sesion actualizada
    if (nuevoEstado) {
      await guardarSesion(aplicarParche(sesion, nuevoEstado));
    } else {
      await guardarSesion(sesion);
    }

    // 7. Log conversacional (best-effort)
    void registrarEnLog(entrada, respuesta.texto, intent);

    // 8. Responder TwiML
    return responderTwiML([respuesta.texto]);
  } catch (err) {
    console.error("[whatsapp] error procesando mensaje:", err);
    return responderTwiML([
      "Tuve un problema técnico procesando tu mensaje. Probá de nuevo en un momento."
    ]);
  }
}

/**
 * GET para health-check / verificacion manual del endpoint.
 * NO acepta mensajes; solo confirma que el webhook esta vivo.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    ok: true,
    servicio: "whatsapp-webhook",
    version: 1,
    nota: "Endpoint vivo. Configurar en Twilio Console como POST."
  });
}

// ====================== helpers ======================

function parseFormUrlEncoded(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw) return out;
  for (const par of raw.split("&")) {
    if (!par) continue;
    const [k, v = ""] = par.split("=");
    out[decodeURIComponent(k.replace(/\+/g, " "))] = decodeURIComponent(v.replace(/\+/g, " "));
  }
  return out;
}

function extraerMediaUrls(params: Record<string, string>): string[] {
  const n = parseInt(params["NumMedia"] ?? "0", 10) || 0;
  const urls: string[] = [];
  for (let i = 0; i < n; i++) {
    const u = params[`MediaUrl${i}`];
    if (u) urls.push(u);
  }
  return urls;
}

/**
 * Twilio firma la URL exacta donde llega el webhook.
 * Detras de Vercel necesitamos reconstruirla con el host real (no localhost).
 * Si TWILIO_WEBHOOK_URL esta seteada, la usamos como fuente de verdad.
 */
function construirUrlPublica(req: NextRequest): string {
  const override = process.env.TWILIO_WEBHOOK_URL;
  if (override) return override;
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("host") ?? "localhost";
  return `${proto}://${host}${req.nextUrl.pathname}`;
}

function responderTwiML(textos: string[]): NextResponse {
  const xml = construirTwiML(textos);
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" }
  });
}

async function registrarEnLog(
  entrada: MensajeEntrante,
  respuesta: string,
  intent: string
): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.from("wa_mensajes_log").insert([
      {
        from_number: entrada.from,
        to_number: entrada.to,
        direccion: "entrante",
        cuerpo: entrada.body,
        intent
      },
      {
        from_number: entrada.to,
        to_number: entrada.from,
        direccion: "saliente",
        cuerpo: respuesta,
        intent
      }
    ]);
  } catch (err) {
    console.warn("[whatsapp] no se pudo registrar log:", err);
  }
}
