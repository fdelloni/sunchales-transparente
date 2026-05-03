import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  contrataciones,
  labels,
  totalesContrataciones
} from "@/lib/data/contrataciones";
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
    <div className="mx-auto max-w-6xl px-6 py-12">
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

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          placeholder="Buscar sobre contrataciones y licitaciones…"
          sugerencias={[
            "¿Cuántas contrataciones están abiertas?",
            "¿Qué es la cadena SHA-256 de auditoría?",
            "¿Cómo me suscribo a alertas?",
            "¿Qué debe publicarse sobre contratos?",
          ]}
          ctaSinResultado={{ label: "Suscribirme a alertas", href: "/suscripciones" }}
        />
      </div>

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
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Procesos en curso y finalizados
      </h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
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
        Los casos listados son <strong>ejemplos demostrativos</strong> que
        ilustran el funcionamiento del módulo (procedimientos, oferentes,
        adjudicaciones, ampliaciones, pagos y auditoría criptográfica). Se
        reemplazarán por los expedientes reales del municipio en cuanto se
        conecte la fuente oficial. La estructura sigue la lógica de la Ley
        provincial N.º 12.510 y la práctica habitual del régimen municipal
        santafesino.
      </p>
    </div>
  );
}
