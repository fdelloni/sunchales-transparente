import Link from "next/link";
import { notFound } from "next/navigation";
import { contrataciones, labels } from "@/lib/data/contrataciones";
import { sellarCadena } from "@/lib/hashchain";
import { formatARS } from "@/lib/format";

export const dynamicParams = true;

export async function generateStaticParams() {
  return contrataciones.map((c) => ({ id: c.id }));
}

export default async function ContratacionDetallePage({
  params
}: {
  params: { id: string };
}) {
  const c = contrataciones.find((x) => x.id === params.id);
  if (!c) notFound();

  const cadena = await sellarCadena(c.expediente, c.ejercicio, c.cadenaSinSellar);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/contrataciones" className="text-xs text-coral-dark hover:underline">
        ← Volver a contrataciones
      </Link>
      <span className="eyebrow mt-4 block">{labels.procedimiento[c.procedimiento]}</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy">{c.numero}</h1>
      <p className="mt-2 text-lg text-slate-700">{c.objeto}</p>

      {/* Metadatos */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Meta label="Expediente" value={c.expediente} />
        <Meta label="Área" value={c.area} />
        <Meta label="Categoría" value={labels.categoria[c.categoria]} />
        <Meta label="Estado" value={labels.estado[c.estado]} />
        <Meta label="Presupuesto oficial" value={formatARS(c.presupuestoOficial)} />
        {c.adjudicado && <Meta label="Monto adjudicado" value={formatARS(c.adjudicado.monto)} />}
        {c.fechaApertura && <Meta label="Apertura de ofertas" value={new Date(c.fechaApertura).toLocaleDateString("es-AR")} />}
        {c.fechaAdjudicacion && <Meta label="Adjudicación" value={new Date(c.fechaAdjudicacion).toLocaleDateString("es-AR")} />}
      </div>

      {/* Oferentes */}
      {c.oferentes.length > 0 && (
        <>
          <h2 className="mt-10 font-serif text-2xl font-bold text-navy">Oferentes</h2>
          <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">CUIT</th>
                  <th className="px-4 py-3">Razón social</th>
                  <th className="px-4 py-3 text-right">Monto ofertado</th>
                  <th className="px-4 py-3">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {c.oferentes.map((o) => {
                  const esAdjudicado = c.adjudicado?.cuit === o.cuit;
                  return (
                    <tr key={o.cuit} className="border-t border-slate-100">
                      <td className="px-4 py-3 tabular-nums text-slate-600">{o.cuit}</td>
                      <td className="px-4 py-3 font-medium text-navy">
                        {o.razonSocial}
                        {esAdjudicado && (
                          <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                            adjudicado
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">{formatARS(o.monto)}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{o.observaciones ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagos */}
      {c.pagos && c.pagos.length > 0 && (
        <>
          <h2 className="mt-10 font-serif text-2xl font-bold text-navy">Pagos efectuados</h2>
          <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Orden de pago</th>
                  <th className="px-4 py-3 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {c.pagos.map((p, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-600">{new Date(p.fecha).toLocaleDateString("es-AR")}</td>
                    <td className="px-4 py-3 font-medium text-navy">{p.orden}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatARS(p.monto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Documentos */}
      {c.documentos.length > 0 && (
        <>
          <h2 className="mt-10 font-serif text-2xl font-bold text-navy">Documentos del expediente</h2>
          <ul className="mt-3 space-y-2">
            {c.documentos.map((d, i) => (
              <li
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-navy">{d.nombre}</span>
                  <span className="text-[11px] uppercase tracking-widest text-teal">
                    {d.tipo}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Publicado: {new Date(d.publicado).toLocaleDateString("es-AR")} ·{" "}
                  {(d.bytes / 1024).toFixed(1)} KB
                </div>
                <div className="mt-1 break-all font-mono text-[11px] text-slate-400">
                  SHA-256 del archivo: {d.hashSha256}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Timeline + auditoría */}
      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-navy">Línea de tiempo</h2>
        <Link
          href={`/contrataciones/${c.id}/auditar`}
          className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Auditar la cadena criptográfica
        </Link>
      </div>
      <ol className="relative mt-4 space-y-4 border-l-2 border-coral/40 pl-6">
        {cadena.map((e, i) => (
          <li key={e.id} className="relative">
            <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full border-2 border-coral bg-white text-[10px] font-bold text-coral-dark">
              {i + 1}
            </span>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-navy">
                  {labels.evento[e.tipo] ?? e.tipo}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(e.ts).toLocaleString("es-AR")}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">Actor: {e.actor}</div>
              <pre className="mt-2 overflow-x-auto rounded bg-slate-50 p-2 text-[11px] text-slate-700">
                {JSON.stringify(e.payload, null, 2)}
              </pre>
              <div className="mt-2 break-all font-mono text-[10px] leading-relaxed text-slate-400">
                hash: {e.hash}
                <br />
                hash_previo: {e.hashPrevio}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
      <div className="text-[10px] uppercase tracking-widest text-teal">{label}</div>
      <div className="mt-0.5 font-medium text-navy">{value}</div>
    </div>
  );
}
