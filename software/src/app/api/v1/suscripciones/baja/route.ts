/**
 * GET /api/v1/suscripciones/baja?token=xxx
 *
 * Endpoint para darse de baja en un click. Marca revocada_en con la
 * fecha actual. Es idempotente.
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
    return NextResponse.redirect(
      `${baseUrl}/suscripciones/error?motivo=servicio_no_disponible`
    );
  }

  try {
    const { data: suscripcion, error: fetchError } = await supabaseAdmin
      .from("suscripciones_alertas")
      .select("id, revocada_en")
      .eq("token_optin", token)
      .maybeSingle();

    if (fetchError || !suscripcion) {
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=token_no_encontrado`
      );
    }

    if (suscripcion.revocada_en) {
      // Ya estaba revocada — idempotente.
      return NextResponse.redirect(`${baseUrl}/suscripciones/baja-confirmada?ya=1`);
    }

    const { error: updateError } = await supabaseAdmin
      .from("suscripciones_alertas")
      .update({ revocada_en: new Date().toISOString() })
      .eq("id", suscripcion.id);

    if (updateError) {
      console.error("[baja] Error update:", updateError);
      return NextResponse.redirect(
        `${baseUrl}/suscripciones/error?motivo=error_actualizar`
      );
    }

    return NextResponse.redirect(`${baseUrl}/suscripciones/baja-confirmada`);
  } catch (err) {
    console.error("[baja] Excepción:", err);
    return NextResponse.redirect(
      `${baseUrl}/suscripciones/error?motivo=excepcion`
    );
  }
}
