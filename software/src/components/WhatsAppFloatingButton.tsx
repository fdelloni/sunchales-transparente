/**
 * Floating Action Button de WhatsApp.
 *
 * Aparece fijo en la esquina inferior izquierda en TODAS las paginas.
 * (Inferior derecha esta ocupada por el chatbot web embebido — Chatbot.tsx).
 *
 * Comportamiento:
 *   - Click → abre wa.me con el join code precargado (sandbox) o conversacion
 *     vacia (produccion).
 *   - Tooltip al hover.
 */

const NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "14155238886";
const JOIN_CODE = process.env.NEXT_PUBLIC_WHATSAPP_JOIN_CODE || "join silver-fox";
const ES_SANDBOX = (process.env.NEXT_PUBLIC_WHATSAPP_ES_SANDBOX ?? "true") === "true";

function construirLink(): string {
  return ES_SANDBOX
    ? `https://wa.me/${NUMERO}?text=${encodeURIComponent(JOIN_CODE)}`
    : `https://wa.me/${NUMERO}`;
}

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={construirLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con el asistente por WhatsApp"
      className="group fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 .395C7.163.395 0 7.557 0 16.395c0 2.819.74 5.582 2.146 8.018L0 32.395l8.198-2.118a15.94 15.94 0 0 0 7.802 1.99h.007C24.844 32.267 32 25.105 32 16.267 32 7.43 24.838.395 16 .395zm0 28.94h-.005a13.12 13.12 0 0 1-6.696-1.834l-.48-.286-4.866 1.257 1.298-4.74-.313-.494a13.13 13.13 0 0 1-2.013-7.058c0-7.265 5.91-13.176 13.18-13.176 3.518 0 6.825 1.371 9.314 3.86a13.077 13.077 0 0 1 3.857 9.32c-.003 7.265-5.913 13.176-13.176 13.176zm7.224-9.872c-.396-.198-2.34-1.156-2.703-1.288-.362-.132-.626-.198-.89.198-.265.396-1.022 1.288-1.253 1.553-.231.265-.462.297-.858.099-.396-.198-1.673-.617-3.187-1.965-1.178-1.05-1.973-2.346-2.205-2.742-.231-.396-.025-.611.174-.808.18-.18.396-.462.594-.694.198-.231.265-.396.396-.66.132-.265.066-.495-.033-.694-.099-.198-.89-2.146-1.222-2.94-.32-.77-.646-.665-.89-.677-.231-.012-.495-.012-.759-.012a1.456 1.456 0 0 0-1.057.495c-.363.396-1.387 1.355-1.387 3.302s1.42 3.829 1.618 4.094c.198.265 2.79 4.262 6.764 5.974.945.408 1.683.652 2.258.834.948.301 1.81.259 2.493.158.76-.114 2.34-.957 2.671-1.881.33-.924.33-1.717.231-1.881-.099-.165-.363-.265-.759-.462z" />
      </svg>
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition group-hover:opacity-100">
        Hablar por WhatsApp
      </span>
    </a>
  );
}
