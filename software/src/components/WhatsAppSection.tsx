/**
 * Sección destacada en la home que invita al ciudadano a usar el bot vía WhatsApp.
 *
 * Mientras estamos en Twilio Sandbox, el ciudadano necesita "unirse" enviando
 * un comando "join <keyword>" al numero +1 415 523 8886. Para hacer esa friccion
 * lo mas baja posible, generamos un link wa.me con el mensaje pre-cargado:
 * el ciudadano solo toca "Enviar" en su WhatsApp y queda activado.
 *
 * Cuando el municipio active WhatsApp Business API con numero propio, basta con
 * cambiar las variables de entorno y este componente sigue funcionando igual,
 * sin el codigo de activacion.
 */

const NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "14155238886";
const JOIN_CODE = process.env.NEXT_PUBLIC_WHATSAPP_JOIN_CODE || "join silver-fox";
const ES_SANDBOX = (process.env.NEXT_PUBLIC_WHATSAPP_ES_SANDBOX ?? "true") === "true";

function construirLinkWA(): string {
  if (ES_SANDBOX) {
    // sandbox: pre-cargamos el comando "join <keyword>" para activar el numero
    return `https://wa.me/${NUMERO}?text=${encodeURIComponent(JOIN_CODE)}`;
  }
  // produccion: solo abrimos la conversacion sin texto pre-cargado
  return `https://wa.me/${NUMERO}`;
}

export default function WhatsAppSection() {
  const link = construirLinkWA();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 shadow-sm">
        <div className="grid gap-0 md:grid-cols-[1fr_auto] md:items-center">
          {/* Lado izquierdo: explicacion */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-emerald-500 text-white shadow">
                <WhatsAppIcon />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                Canal directo · WhatsApp
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-bold text-navy md:text-3xl">
              También respondemos por WhatsApp
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
              Hacé tu consulta sobre <strong>presupuesto, normativa, obras, funcionarios o
              trámites</strong> escribiendo en lenguaje natural a nuestro asistente. Responde con
              datos públicos verificados del Digesto Oficial, padrón municipal, presupuesto y
              actas del Concejo. No inventa cifras ni opina sobre política — solo hechos
              verificables, con cita de fuente.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
              >
                <WhatsAppIcon size={18} />
                Abrir conversación
              </a>
              <span className="text-xs text-slate-500">
                Disponible 24/7 · sin cargo · sin descargas
              </span>
            </div>

          </div>

          {/* Lado derecho: ejemplo visual */}
          <div className="hidden border-t border-emerald-200/70 bg-emerald-50/40 p-6 md:block md:border-l md:border-t-0 md:p-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
              Ejemplo de consulta
            </div>
            <div className="mt-3 space-y-2">
              <Bubble outgoing>¿Cuánto se gasta en salud en 2026?</Bubble>
              <Bubble>
                Para Salud 2026 se presupuestaron $2.165.667.557, sobre un total general de
                $30.938.107.965. <em className="text-emerald-700">(Presupuesto 2026)</em>
              </Bubble>
              <Bubble outgoing>¿Quién es Pablo Pinotti?</Bubble>
              <Bubble>
                Pablo Pinotti es el Intendente Municipal de Sunchales. Asumió tras la sucesión de
                Gonzalo Toselli. <em className="text-emerald-700">(Padrón Municipal)</em>
              </Bubble>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ children, outgoing }: { children: React.ReactNode; outgoing?: boolean }) {
  return (
    <div className={`flex ${outgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[18rem] rounded-2xl px-3 py-2 text-xs leading-snug shadow-sm ${
          outgoing
            ? "rounded-br-sm bg-emerald-500 text-white"
            : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16 .395C7.163.395 0 7.557 0 16.395c0 2.819.74 5.582 2.146 8.018L0 32.395l8.198-2.118a15.94 15.94 0 0 0 7.802 1.99h.007C24.844 32.267 32 25.105 32 16.267 32 7.43 24.838.395 16 .395zm0 28.94h-.005a13.12 13.12 0 0 1-6.696-1.834l-.48-.286-4.866 1.257 1.298-4.74-.313-.494a13.13 13.13 0 0 1-2.013-7.058c0-7.265 5.91-13.176 13.18-13.176 3.518 0 6.825 1.371 9.314 3.86a13.077 13.077 0 0 1 3.857 9.32c-.003 7.265-5.913 13.176-13.176 13.176zm7.224-9.872c-.396-.198-2.34-1.156-2.703-1.288-.362-.132-.626-.198-.89.198-.265.396-1.022 1.288-1.253 1.553-.231.265-.462.297-.858.099-.396-.198-1.673-.617-3.187-1.965-1.178-1.05-1.973-2.346-2.205-2.742-.231-.396-.025-.611.174-.808.18-.18.396-.462.594-.694.198-.231.265-.396.396-.66.132-.265.066-.495-.033-.694-.099-.198-.89-2.146-1.222-2.94-.32-.77-.646-.665-.89-.677-.231-.012-.495-.012-.759-.012a1.456 1.456 0 0 0-1.057.495c-.363.396-1.387 1.355-1.387 3.302s1.42 3.829 1.618 4.094c.198.265 2.79 4.262 6.764 5.974.945.408 1.683.652 2.258.834.948.301 1.81.259 2.493.158.76-.114 2.34-.957 2.671-1.881.33-.924.33-1.717.231-1.881-.099-.165-.363-.265-.759-.462z" />
    </svg>
  );
}
