import Link from "next/link";

export const metadata = {
  title: "Baja confirmada · Sunchales Transparente",
};

export default function BajaConfirmadaPage({
  searchParams,
}: {
  searchParams: { ya?: string };
}) {
  const yaEstaba = searchParams.ya === "1";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="inline-block rounded-full bg-slate-100 p-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#475569"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold text-navy">
        {yaEstaba ? "Ya estabas dado de baja" : "Listo, te diste de baja"}
      </h1>
      <p className="mt-3 text-base text-slate-700">
        {yaEstaba
          ? "Tu suscripción ya había sido revocada con anterioridad. No vas a recibir más mensajes."
          : "Tu suscripción quedó revocada. No vas a recibir más alertas."}
      </p>
      <p className="mt-4 text-sm text-slate-500">
        Si fue por error, podés volver a suscribirte en cualquier momento desde la
        página de Alertas Ciudadanas.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-amber-400"
        >
          Ir al inicio
        </Link>
        <Link
          href="/suscripciones"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Volver a Alertas Ciudadanas
        </Link>
      </div>
    </div>
  );
}
