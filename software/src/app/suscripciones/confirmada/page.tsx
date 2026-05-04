import Link from "next/link";

export const metadata = {
  title: "Suscripción confirmada · Sunchales Transparente",
};

export default function ConfirmadaPage({
  searchParams,
}: {
  searchParams: { ya?: string };
}) {
  const yaEstaba = searchParams.ya === "1";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="inline-block rounded-full bg-emerald-100 p-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold text-navy">
        {yaEstaba ? "Tu suscripción ya estaba confirmada" : "¡Suscripción confirmada!"}
      </h1>
      <p className="mt-3 text-base text-slate-700">
        {yaEstaba
          ? "Tu email ya estaba activo en nuestro sistema. No tenés que hacer nada más."
          : "Tu email quedó registrado y activo. A partir de ahora vas a recibir las alertas de las categorías que elegiste, en cuanto los disparadores estén operativos."}
      </p>
      <p className="mt-4 text-sm text-slate-500">
        Recordá: cada alerta que recibas va a tener un enlace para darte de baja
        en un click. Cumplimos la Ley 25.326 de Protección de Datos Personales y
        nunca cedemos tus datos a terceros.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-amber-400"
        >
          Ir al inicio
        </Link>
        <Link
          href="/marco-normativo"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Cómo pedir información pública
        </Link>
      </div>
    </div>
  );
}
