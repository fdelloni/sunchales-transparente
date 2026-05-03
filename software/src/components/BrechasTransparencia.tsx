import Link from "next/link";
import {
  brechasPorModulo,
  labelEstado,
  type BrechaModulo
} from "@/lib/data/brechas";

type Props = {
  modulo: BrechaModulo;
  /**
   * Encabezado opcional. Si se omite, se usa uno por defecto contextualizado al módulo.
   */
  titulo?: string;
  /**
   * Texto introductorio opcional. Si se omite, se usa uno por defecto.
   */
  intro?: string;
};

/**
 * Componente de Brechas de Transparencia.
 *
 * Renderiza, dentro de cualquier módulo, la lista de información de publicación
 * obligatoria que el Estado municipal aún no expone. Cada brecha muestra su
 * fundamento normativo y un CTA para sumar firmas a un pedido formal de acceso
 * a la información (Ordenanza Sunchales N° 1872/2009 y concordantes).
 * NO expone datos personales de ciudadanos privados.
 */
export default function BrechasTransparencia({ modulo, titulo, intro }: Props) {
  const items = brechasPorModulo(modulo);
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="overflow-hidden rounded-2xl border-2 border-amber-500/70 bg-gradient-to-br from-amber-50 to-white">
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-amber-500 text-2xl font-black text-white">
              !
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                Brechas de transparencia detectadas
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-amber-900">
                {titulo ?? "Información de publicación obligatoria que aún no se expone"}
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[15px] text-amber-900/90">
            {intro ??
              "Lo que sigue es información que el Estado municipal está jurídicamente obligado a publicar y que al día de hoy no se encuentra accesible al ciudadano."}{" "}
            <strong>
              Hacer visible esta omisión es parte del deber de publicidad de los
              actos de gobierno y no expone a ningún ciudadano privado.
            </strong>
          </p>
          <div className="mt-4 rounded-lg border border-amber-200 bg-white p-4 text-[13px] text-amber-900">
            <strong className="text-amber-900">Fundamento normativo: </strong>
            Constitución Nacional arts. 1°, 33° y 75 inc. 22 (forma republicana
            y publicidad de los actos de gobierno) · CADH art. 13 ·{" "}
            <Link
              href="/marco-normativo"
              className="text-amber-800 underline"
            >
              Ordenanza Sunchales N° 1872/2009
            </Link>{" "}
            (acceso a la información pública municipal) · Decreto Provincial
            Santa Fe N° 0692/2009 (mecanismo provincial supletorio). La negativa
            o demora en publicar configura incumplimiento del deber estatal y
            habilita acciones administrativas y judiciales del ciudadano (Art. 9°
            de la Ord. 1872/2009).
          </div>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
          {items.map((b) => (
            <article
              key={b.id}
              className="rounded-xl border-2 border-dashed border-amber-400 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-base font-bold text-navy">
                  {b.titulo}
                </h3>
                <span
                  className={
                    b.estado === "subsanado"
                      ? "shrink-0 rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800"
                      : b.estado === "pedido_presentado" ||
                        b.estado === "respondido_parcial"
                      ? "shrink-0 rounded-md bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800"
                      : "shrink-0 rounded-md bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-800"
                  }
                >
                  {labelEstado[b.estado]}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{b.descripcion}</p>
              <div className="mt-3 rounded-md border-l-2 border-amber-500 bg-amber-50 p-2.5 text-[12.5px] text-amber-900">
                <strong className="text-amber-900">Obliga a publicar: </strong>
                {b.fundamento}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/suscripciones"
                  className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
                >
                  Sumarme al pedido
                </Link>
                {b.fundamentoUrl && (
                  <Link
                    href={b.fundamentoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
                  >
                    Ver fundamento legal
                  </Link>
                )}
              </div>
              <div className="mt-3 text-[11px] text-slate-500">
                Detectado: {b.detectadaEl}
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-amber-200 bg-amber-50/60 px-6 py-4 text-[13px] text-amber-900 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              <strong>Total de brechas detectadas en este módulo: {items.length}</strong>
            </span>
            <Link
              href="/datos-abiertos"
              className="font-semibold text-amber-800 hover:underline"
            >
              Descargar dataset abierto (CSV / JSON) →
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        Hacer visible la omisión es parte del deber de publicidad. No se exponen
        datos personales de ciudadanos privados.
      </p>
    </section>
  );
}
