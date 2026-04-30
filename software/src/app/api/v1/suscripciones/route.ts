import { sha256Hex } from "@/lib/hashchain";

/**
 * POST /api/v1/suscripciones
 *
 *  Crea una suscripción opt-in. En esta demo:
 *    - validamos el payload mínimo
 *    - simulamos la generación de un token de doble confirmación
 *    - devolvemos un id de suscripción derivado de un hash
 *
 *  Cuando esté conectado Supabase real, este handler insertará en la
 *  tabla `suscripciones_alertas` y enviará el email/WhatsApp de
 *  confirmación a través del despachador (ver sección "despachador" en
 *  supabase/migrations/0002_contrataciones.sql).
 */
type Filtros = {
  procedimientos?: string[];
  categorias?: string[];
  montoMinimo?: number;
};

type Body = {
  email?: string | null;
  whatsapp?: string | null;
  filtros?: Filtros;
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^\+?\d[\d\s().-]{6,}$/.test(s);

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

  // Generamos un id determinístico basado en el contacto + filtros + reloj.
  const idSeed = `${email ?? ""}|${whatsapp ?? ""}|${JSON.stringify(body.filtros ?? {})}|${new Date().toISOString()}`;
  const suscripcionId = (await sha256Hex(idSeed)).slice(0, 16);

  // Token opt-in: 16 bytes hex pseudoaleatorios.
  const token = (await sha256Hex(`${suscripcionId}|${Math.random()}|${Date.now()}`)).slice(0, 32);

  return Response.json(
    {
      ok: true,
      mensaje:
        "Recibimos tu pedido. Te enviamos un mensaje de confirmación opt-in al canal que elegiste. Hacé click en el enlace que recibís para activar las alertas.",
      suscripcion_id: suscripcionId,
      // En producción, este token se enviaría por email/whatsapp y NO se devolvería en la respuesta:
      _token_demo: token,
      _aviso:
        "Demo: en producción este token llega por el canal elegido y no por la respuesta HTTP."
    },
    { status: 201 }
  );
}
