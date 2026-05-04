/**
 * Cliente Brevo (ex-Sendinblue) para envío de emails transaccionales.
 *
 * Plan free: 300 emails/día, sin tarjeta. Suficiente para alertas iniciales.
 *
 * Variables de entorno requeridas en Vercel:
 *   BREVO_API_KEY      → empieza con "xkeysib-...". Generada en Brevo → SMTP & API → API Keys.
 *   BREVO_FROM_EMAIL   → ej. "alertas@ciudadan.com" (debe ser de un dominio autenticado en Brevo).
 *   BREVO_REPLY_TO     → ej. "contacto@ciudadan.com" (donde llegan las respuestas).
 *
 * Si las env vars no están configuradas, las funciones devuelven { ok: false }
 * y el endpoint que las llama puede degradar elegantemente (no-op o log).
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export type EnvioResultado =
  | { ok: true; messageId?: string }
  | { ok: false; motivo: string; status?: number };

export type Destinatario = {
  email: string;
  nombre?: string;
};

export type EnvioParams = {
  to: Destinatario[];
  subject: string;
  /** HTML del cuerpo. Si no se pasa, se usa textContent como fallback. */
  htmlContent?: string;
  /** Texto plano (recomendado siempre, mejora deliverability). */
  textContent?: string;
  /** Override del remitente (default: BREVO_FROM_EMAIL). */
  from?: { email: string; name?: string };
  /** Override del reply-to (default: BREVO_REPLY_TO). */
  replyTo?: { email: string; name?: string };
  /** Tags útiles para tracking en Brevo dashboard. */
  tags?: string[];
};

export const isBrevoEnabled = (): boolean =>
  Boolean(process.env.BREVO_API_KEY && process.env.BREVO_FROM_EMAIL);

/**
 * Envía un email transaccional vía Brevo.
 *
 * Devuelve { ok: true } con el messageId, o { ok: false, motivo } con
 * detalle del error (sin tirar excepción para que el caller pueda decidir
 * qué hacer: degradar a stub, registrar en cola, etc.).
 */
export async function enviarEmail(params: EnvioParams): Promise<EnvioResultado> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmailEnv = process.env.BREVO_FROM_EMAIL;
  const replyToEnv = process.env.BREVO_REPLY_TO;

  if (!apiKey || !fromEmailEnv) {
    return {
      ok: false,
      motivo:
        "BREVO_API_KEY y/o BREVO_FROM_EMAIL no están configuradas. El email NO se envió.",
    };
  }

  const sender = params.from ?? {
    email: fromEmailEnv,
    name: "Sunchales Transparente",
  };
  const replyTo = params.replyTo ?? (replyToEnv ? { email: replyToEnv } : undefined);

  const body: Record<string, unknown> = {
    sender,
    to: params.to,
    subject: params.subject,
  };
  if (params.htmlContent) body.htmlContent = params.htmlContent;
  if (params.textContent) body.textContent = params.textContent;
  if (replyTo) body.replyTo = replyTo;
  if (params.tags && params.tags.length > 0) body.tags = params.tags;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[brevoClient] Error API:", res.status, errText);
      return { ok: false, motivo: `Brevo API ${res.status}: ${errText}`, status: res.status };
    }

    const data = (await res.json()) as { messageId?: string };
    return { ok: true, messageId: data.messageId };
  } catch (err) {
    const motivo = err instanceof Error ? err.message : String(err);
    console.error("[brevoClient] Excepción de red:", motivo);
    return { ok: false, motivo };
  }
}

/**
 * Helper específico: envía email de doble opt-in para una nueva suscripción.
 *
 * El link incluye el token; al clickearlo, el usuario llega al endpoint
 * /api/v1/suscripciones/confirmar?token=... que valida y activa la
 * suscripción.
 */
export async function enviarOptInSuscripcion(args: {
  emailDestino: string;
  tokenOptin: string;
  categorias: string[];
  baseUrl: string; // ej. "https://www.ciudadan.com" — sin barra final
}): Promise<EnvioResultado> {
  const linkConfirmar = `${args.baseUrl}/api/v1/suscripciones/confirmar?token=${encodeURIComponent(
    args.tokenOptin
  )}`;
  const linkBaja = `${args.baseUrl}/api/v1/suscripciones/baja?token=${encodeURIComponent(
    args.tokenOptin
  )}`;

  const labelCategorias: Record<string, string> = {
    contrataciones: "Contrataciones y licitaciones",
    concejo: "Concejo Municipal",
    presupuesto: "Presupuesto y recaudación",
    juzgado: "Juzgado de Faltas",
    brechas: "Brechas de transparencia subsanadas",
  };
  const listaCategorias = args.categorias
    .map((c) => `<li>${labelCategorias[c] ?? c}</li>`)
    .join("");

  const subject = "Confirmá tu suscripción a Sunchales Transparente";

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
  <head><meta charset="UTF-8"><title>${subject}</title></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0F172A;">
    <div style="background: #0F1B3D; color: white; padding: 24px; border-radius: 12px 12px 0 0; border-left: 6px solid #E8A33D;">
      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 22px;">Sunchales Transparente</h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; opacity: 0.85;">Plataforma cívica de transparencia municipal</p>
    </div>
    <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
      <h2 style="font-family: Georgia, serif; color: #0F1B3D; margin-top: 0;">Hola,</h2>
      <p>Recibimos tu pedido para suscribirte a alertas ciudadanas de las siguientes categorías:</p>
      <ul style="background: #F5F0E6; padding: 12px 24px; border-radius: 8px; border-left: 4px solid #E8A33D;">${listaCategorias}</ul>
      <p>Para confirmar tu suscripción y empezar a recibir alertas cuando estén disponibles, hacé click acá:</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="${linkConfirmar}" style="background: #E8A33D; color: #18181b; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 13px;">Confirmar mi suscripción</a>
      </p>
      <p style="font-size: 13px; color: #64748b;">Si no fuiste vos quien solicitó esta suscripción, ignorá este mensaje. No vas a recibir nada hasta que confirmes el link de arriba.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
      <p style="font-size: 11px; color: #94a3b8;">Recibís este mensaje porque alguien (probablemente vos) ingresó tu email en https://www.ciudadan.com/suscripciones. Si querés cancelar el pedido sin confirmar, podés <a href="${linkBaja}" style="color: #C97B1A;">darte de baja en un click</a>. Cumplimos la Ley 25.326 de Protección de Datos Personales.</p>
    </div>
  </body>
</html>`;

  const textContent = `Sunchales Transparente — Confirmá tu suscripción

Recibimos tu pedido para suscribirte a alertas de:
${args.categorias.map((c) => `  - ${labelCategorias[c] ?? c}`).join("\n")}

Para confirmar tu suscripción, abrí este enlace:
${linkConfirmar}

Si no fuiste vos quien solicitó esta suscripción, ignorá este mensaje.

---
Recibís este mensaje porque alguien ingresó tu email en https://www.ciudadan.com/suscripciones.
Para cancelar sin confirmar: ${linkBaja}
Cumplimos la Ley 25.326 de Protección de Datos Personales.`;

  return enviarEmail({
    to: [{ email: args.emailDestino }],
    subject,
    htmlContent,
    textContent,
    tags: ["suscripcion", "opt-in"],
  });
}
