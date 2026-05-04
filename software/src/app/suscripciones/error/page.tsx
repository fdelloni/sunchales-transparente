import Link from "next/link";

export const metadata = {
  title: "Hubo un problema · Sunchales Transparente",
};

const MOTIVOS: Record<string, string> = {
  token_invalido: "El enlace que usaste no parece válido (token incorrecto o vacío).",
  token_no_encontrado:
    "No encontramos ninguna suscripción con ese enlace. Es posible que ya hayas hecho la baja, o que el enlace haya expirado.",
  revocada:
    "Esta suscripción ya fue revocada anteriormente. Si querés volver a suscribirte, andá a Alertas Ciudadanas.",
  servicio_no_disponible:
    "El servicio de suscripciones está temporalmente fuera de línea. Intentá de nuevo en unos minutos.",
  error_servidor:
    "Tuvimos un problema interno al verificar tu enlace. Intentá de nuevo más tarde.",
  error_actualizar:
    "Tuvimos un problema al actualizar tu suscripción. Intentá de nuevo más tarde.",
  excepcion:
    "Ocurrió un error inesperado procesando tu solicitud. Intentá de nuevo más tarde.",
};

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { motivo?: string };
}) {
  const motivoKey = searchParams.motivo ?? "";
  const mensaje =
    MOTIVOS[motivoKey] ?? "Hubo un problema procesando tu solicitud.";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="inline-block rounded-full bg-amber-100 p-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d97706"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold text-navy">
        Hubo un problema
      </h1>
      <p className="mt-3 text-base text-slate-700">{mensaje}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/suscripciones"
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-amber-400"
        >
          Volver a Alertas Ciudadanas
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
