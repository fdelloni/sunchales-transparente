/**
 * POST /api/v1/suscripciones — Alertas Ciudadanas
 *
 * Si Supabase está configurado (env vars NEXT_PUBLIC_SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY), inserta la suscripción REAL en la tabla
 * `suscripciones_alertas` (ver migration 0006).
 *
 * Si NO está configurado (cualquier env falta), funciona como demo:
 * valida el payload y devuelve un OK simulado, sin persistir.
 *
 * El despacho del email/WhatsApp de confirmación opt-in es trabajo de Fase
 * 2 (requiere proveedor de email tipo Resend/SendGrid). Mientras tanto, la
 * suscripción se guarda con confirmada=false. Cuando Fase 2 active el
 * despachador, se enviará la confirmación a las suscripciones pendientes.
 */

import { sha256Hex } from "@/lib/hashchain";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type Filtros = {
  procedimientos?: string[];
  categorias?: string[];
  montoMinimo?: number;
};

type AlertaItem = {
  tipo: string;
  filtros?: Record<string, unknown>;
};

type Body = {
  email?: string | null;
  whatsapp?: string | null;
  filtros?: Filtros; // legacy (solo contrataciones)
  alertas?: AlertaItem[]; // shape nuevo (multi-categoría)
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^\+?\d[\d\s().-]{6,}$/.test(s);

const CATEGORIAS_VALIDAS = new Set([
  "contrataciones",
  "concejo",
  "presupuesto",
  "juzgado",
  "brechas",
]);

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json(
      { ok: false, mensaje: "Payload inválido (JSON malformado)." },
      { status: 400 }
    );
  }

  const email = body.email?.trim() || null;
  const whatsapp = body.whatsapp?.trim() || null;
  if (!email && !whatsapp) {
    return Response.json(
      { ok: false, mensaje: "Indicá al menos un canal de contacto (email o WhatsApp)." },
      { status: 400 }
    );
  }
  if (email && !isEmail(email)) {
    return Response.json(
      { ok: false, mensaje: "El correo electrónico no parece válido." },
      { status: 400 }
    );
  }
  if (whatsapp && !isPhone(whatsapp)) {
    return Response.json(
      { ok: false, mensaje: "El número de WhatsApp no parece válido." },
      { status: 400 }
    );
  }

  // Resolver categorías y filtros desde el shape nuevo o legacy.
  const alertas = Array.isArray(body.alertas) ? body.alertas : [];
  const categoriasRaw = alertas.map((a) => String(a.tipo).toLowerCase());
  const categorias = categoriasRaw.filter((c) => CATEGORIAS_VALIDAS.has(c));

  // Si vino solo el shape legacy (sin alertas[]), asumimos contrataciones.
  if (categorias.length === 0 && body.filtros) {
    categorias.push("contrataciones");
  }

  if (categorias.length === 0) {
    return Response.json(
      {
        ok: false,
        mensaje: "Marcá al menos una categoría de alertas válida.",
      },
      { status: 400 }
    );
  }

  // Armar el JSONB de filtros: un objeto por categoría seleccionada.
  const filtros: Record<string, unknown> = {};
  for (const a of alertas) {
    if (CATEGORIAS_VALIDAS.has(String(a.tipo).toLowerCase())) {
      filtros[String(a.tipo).toLowerCase()] = a.filtros ?? {};
    }
  }
  // Compatibilidad legacy: si vino body.filtros, lo metemos en contrataciones.
  if (body.filtros && categorias.includes("contrataciones") && !filtros["contrataciones"]) {
    filtros["contrataciones"] = body.filtros;
  }

  // Token opt-in: 32 chars hex pseudoaleatorios.
  const tokenOptin = (
    await sha256Hex(`${email ?? ""}|${whatsapp ?? ""}|${Math.random()}|${Date.now()}`)
  ).slice(0, 32);

  // ============================================================
  // CAMINO 1 — Supabase REAL (si está configurado)
  // ============================================================
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("suscripciones_alertas")
        .insert({
          email,
          whatsapp,
          categorias,
          filtros,
          token_optin: tokenOptin,
        })
        .select("id")
        .single();

      if (error) {
        console.error("[/api/v1/suscripciones] Supabase insert error:", error);
        return Response.json(
          {
            ok: false,
            mensaje:
              "No se pudo registrar tu suscripción en este momento. Probá de nuevo en unos minutos.",
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          ok: true,
          mensaje:
            "Tu suscripción quedó registrada. El servicio de envío de confirmaciones está en desarrollo: cuando esté activo, recibirás el mensaje de doble opt-in para confirmar.",
          suscripcion_id: data.id,
        },
        { status: 201 }
      );
    } catch (err) {
      console.error("[/api/v1/suscripciones] excepción:", err);
      return Response.json(
        { ok: false, mensaje: "Error interno del servidor. Probá de nuevo más tarde." },
        { status: 500 }
      );
    }
  }

  // ============================================================
  // CAMINO 2 — Demo (sin Supabase configurado)
  // ============================================================
  const idSeed = `${email ?? ""}|${whatsapp ?? ""}|${JSON.stringify(filtros)}|${new Date().toISOString()}`;
  const suscripcionId = (await sha256Hex(idSeed)).slice(0, 16);

  return Response.json(
    {
      ok: true,
      mensaje:
        "Recibimos tu pedido (modo demo: la base de datos aún no está conectada en este entorno).",
      suscripcion_id: suscripcionId,
      _aviso: "Demo: en producción esto se persistiría en Supabase.",
    },
    { status: 201 }
  );
}
