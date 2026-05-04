/**
 * GET /api/v1/suscripciones/confirmar?token=xxx
 *
 * Endpoint del enlace de doble opt-in que llega por email. Valida el token
 * y, si coincide con una suscripción pendiente y no revocada, la marca
 * como confirmada=true.
 *
 * Después redirige al usuario a /suscripciones/confirmada (página de éxito)
 * o /suscripciones/error (si el token no es válido).
 */

import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const baseUrl = req.nextUrl.origin;

  if (!token || token.length < 16) {
    return NextResponse.redirect(
      `${baseUrl}/suscripciones/error?motivo=token_invalido`
    );
  }

  if (!supabaseAdmin) {
    console.error("[confirmar] supabaseAdmin no configurado");
    return NextResponse.redirect(
      `${baseUrl}/suscripciones/error?motivo=servicio_no_disponible`
    );
  }

  try {
    // Buscar la suscripción por token.
    const { data: suscripcion, error: fetchError } = await supabaseAdmin
      .from("suscripciones_alertas")
      .select("id, email, confirmada, revocada_en")
      .eq("token_optin", token)
      .maybeSingle();

    if (fetchError) {
      console.error("[confirmar] Error fetch:", fetchError);
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=error_servidor`
      );
    }

    if (!suscripcion) {
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=token_no_encontrado`
      );
    }

    if (suscripcion.revocada_en) {
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=revocada`
      );
    }

    if (suscripcion.confirmada) {
      // Ya estaba confirmada — igual mostramos éxito (es idempotente).
      return NextResponse.redirect(`${baseUrl}/suscripciones/confirmada?ya=1`);
    }

    // Marcar como confirmada.
    const { error: updateError } = await supabaseAdmin
      .from("suscripciones_alertas")
      .update({
        confirmada: true,
        confirmada_en: new Date().toISOString(),
      })
      .eq("id", suscripcion.id);

    if (updateError) {
      console.error("[confirmar] Error update:", updateError);
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=error_actualizar`
      );
    }

    return NextResponse.redirect(`${baseUrl}/suscripciones/confirmada`);
  } catch (err) {
    console.error("[confirmar] Excepción:", err);
    return NextResponse.redirect(
      `${baseUrl}/suscripciones/error?motivo=excepcion`
    );
  }
}
