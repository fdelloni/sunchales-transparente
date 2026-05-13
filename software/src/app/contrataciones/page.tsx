import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  contrataciones,
  labels,
  totalesContrataciones
} from "@/lib/data/contrataciones";
import {
  licitacionesOficiales,
  licitacionesMeta,
} from "@/lib/data/licitaciones.generated";
import { formatARS, formatARSCompact, formatNumber } from "@/lib/format";

const ESTADO_COLOR: Record<string, string> = {
  preparacion: "bg-slate-100 text-slate-700",
  convocatoria: "bg-emerald-50 text-emerald-700",
  apertura: "bg-sky-50 text-sky-700",
  evaluacion: "bg-amber-50 text-amber-700",
  adjudicacion: "bg-indigo-50 text-indigo-700",
  ejecucion: "bg-blue-50 text-blue-700",
  ampliacion: "bg-orange-50 text-orange-700",
  cierre: "bg-zinc-100 text-zinc-700",
  desierta: "bg-rose-50 text-rose-700",
  fracasada: "bg-rose-50 text-rose-700",
  cancelada: "bg-zinc-100 text-zinc-500"
};

export default function ContratacionesPage() {
  const t = totalesContrataciones();

  return (
    <div className="container-page py-12">
      {/* Buscador arriba del título — entrada principal de la sección */}
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre contrataciones y licitaciones…"
          ctaSinResultado={{ label: "Suscribirme a alertas", href: "/suscripciones" }}
        />
      </div>

      <span className="eyebrow">Módulo · Licitaciones y Contrataciones</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Contrataciones del Estado Municipal
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Cada licitación pública, licitación privada, concurso de precios y
        contratación directa se registra con una <strong>cadena de hashes
        SHA-256</strong> de eventos. Cualquier vecino puede descargar el JSON,
        recalcular los hashes en su computadora y verificar que nada fue
        modificado a posteriori. Las suscripciones por email o WhatsApp
        permiten enterarse al instante de cada nueva publicación.
      </p>

      <div className="mt-4 inline-flex flex-wrap gap-3">
        <Link
          href="/suscripciones"
          className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Suscribirme a alertas
        </Link>
        <a
          href="/api/v1/contrataciones?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={formatNumber(t.cantidad)} label="Procesos publicados" />
        <StatCard value={formatARSCompact(t.adjudicadoARS)} label="Monto adjudicado total" />
        <StatCard value={formatARSCompact(t.abiertoARS)} label="Presupuesto en convocatoria abierta" />
        <StatCard value="SHA-256" label="Trazabilidad criptográfica" verified />
      </div>

      {/* Tabla */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Procesos en curso y finalizados
      </h2>
      <div className="-mx-4 sm:-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full sm:min-w-[820px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Número</th>
              <th className="px-4 py-3">Procedimiento</th>
              <th className="px-4 py-3">Objeto</th>
              <th className="px-4 py-3 text-right">Presupuesto oficial</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Auditar</th>
            </tr>
          </thead>
          <tbody>
            {contrataciones.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-navy">{c.numero}</td>
                <td className="px-4 py-3 text-slate-700">
                  {labels.procedimiento[c.procedimiento]}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/contrataciones/${c.id}`}
                    className="text-navy underline-offset-2 hover:underline"
                  >
                    {c.objeto}
                  </Link>
                  <div className="text-xs text-slate-500">{c.area}</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatARS(c.presupuestoOficial)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      ESTADO_COLOR[c.estado]
                    }`}
                  >
                    {labels.estado[c.estado]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/contrataciones/${c.id}/auditar`}
                    className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-navy hover:bg-slate-50"
                  >
                    Verificar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Los 4 procesos de la tabla son <strong>ejemplos demostrativos</strong>{" "}
        que ilustran cómo funciona la cadena hash-chain (oferentes,
        adjudicaciones, ampliaciones, pagos y auditoría criptográfica). La
        estructura sigue la lógica de la Ley provincial N° 12.510 y la
        práctica habitual del régimen municipal santafesino.
      </p>

      {/* ============================================================ */}
      {/*  Listado oficial sincronizado                                  */}
      {/* ============================================================ */}
      <h2 id="oficiales" className="section-heading mt-16 font-serif text-2xl font-bold text-navy">
        Listado oficial sincronizado — {licitacionesOficiales.length} procesos
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Sincronizado con el listado oficial del municipio. Cada fila incluye
        número, decreto de llamado, objeto, presupuesto oficial, fecha de
        apertura y links directos a los pliegos publicados. Lo que el
        municipio no publica (oferentes, monto final adjudicado, decreto de
        adjudicación) se declara como{" "}
        <Link href="/brechas?modulo=contrataciones" className="underline">
          brecha de contrataciones
        </Link>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={licitacionesMeta.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          Ver listado oficial →
        </a>
        <a
          href="/api/v1/licitaciones?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
        <a
          href="/api/v1/licitaciones"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          API JSON
        </a>
      </div>

      <div className="-mx-4 sm:-mx-6 mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full sm:min-w-[820px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Número</th>
              <th className="px-4 py-3">Decreto</th>
              <th className="px-4 py-3">Objeto</th>
              <th className="px-4 py-3 text-right">Presup. oficial</th>
              <th className="px-4 py-3">Apertura</th>
              <th className="px-4 py-3 text-right">Pliego</th>
            </tr>
          </thead>
          <tbody>
            {licitacionesOficiales.map((l) => (
              <tr key={l.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3 font-medium text-navy whitespace-nowrap">
                  {l.numero}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                  {l.decreto ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {l.objeto ?? (
                    <span className="text-slate-400">
                      Objeto no extraído (ver pliego)
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {l.presupuestoOficial !== null ? (
                    formatARS(l.presupuestoOficial)
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                  {l.fechaApertura
                    ? new Date(l.fechaApertura).toLocaleDateString("es-AR")
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  {l.documentos.length > 0 ? (
                    <div className="flex flex-col items-end gap-1">
                      {l.documentos
                        .filter(
                          (d) => d.tipo === "pliego" || d.tipo === "decreto"
                        )
                        .slice(0, 2)
                        .map((d) => (
                          <a
                            key={d.url}
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-navy hover:bg-slate-50"
                          >
                            {d.tipo === "pliego" ? "Pliego" : "Decreto"} ↗
                          </a>
                        ))}
                      {l.documentos.length > 2 && (
                        <span className="text-[10px] text-slate-500">
                          +{l.documentos.length - 2} más
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Sincronizado por{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5">
          npm run scrapear-licitaciones
        </code>{" "}
        contra{" "}
        <a
          href={licitacionesMeta.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          el listado oficial
        </a>
        . Última corrida:{" "}
        {new Date(licitacionesMeta.sincronizadoEl).toLocaleString("es-AR")}.
        Cobertura {Object.keys(licitacionesMeta.porAnio).sort()[0]}–
        {
          Object.keys(licitacionesMeta.porAnio)
            .sort()
            .slice(-1)[0]
        }
        .
      </p>
    </div>
  );
}
