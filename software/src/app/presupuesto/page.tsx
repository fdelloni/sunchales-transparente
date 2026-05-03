import StatCard from "@/components/StatCard";
import SourceTag from "@/components/SourceTag";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import BudgetCharts from "./BudgetCharts";
import { partidas, totales } from "@/lib/data/presupuesto";
import { formatARS, formatARSCompact } from "@/lib/format";

export default function PresupuestoPage() {
  // Agrupado por finalidad
  const porFinalidad = Object.values(
    partidas.reduce<Record<string, { finalidad: string; total: number }>>((acc, p) => {
      acc[p.finalidad] ??= { finalidad: p.finalidad, total: 0 };
      acc[p.finalidad].total += p.presupuestado;
      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="eyebrow">Módulo · Explorador de Presupuesto</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Presupuesto Municipal 2026
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Cifras del proyecto de Ordenanza remitido al Honorable Concejo Municipal de Sunchales.
        Los totales generales son <strong>oficiales y verificables</strong>; el desglose por
        finalidad-función es una <strong>estructura ejemplificadora</strong> hasta tanto se
        publique el desglose oficial.
      </p>

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          placeholder="Buscar sobre presupuesto…"
          sugerencias={[
            "¿Cuál es el total del presupuesto 2026?",
            "¿Cuánto se destina a personal?",
            "¿Cuánto recibe por Ley 12.385?",
            "¿Cuál es el gasto per cápita?",
          ]}
          ctaSinResultado={{ label: "Ver datasets de presupuesto", href: "/datos-abiertos" }}
        />
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatARSCompact(totales.gastos_total)}
          label="Total Gastos 2026"
          hint="Cifra oficial (proyecto de Ordenanza)."
          verified
        />
        <StatCard
          value={formatARSCompact(totales.recursos_corrientes)}
          label="Recursos corrientes"
          verified
        />
        <StatCard
          value={formatARSCompact(totales.fondoLey12385_recibido)}
          label="Fondo provincial Ley 12.385"
          hint="Programa de Obras Menores 2026."
          verified
        />
        <StatCard
          value={formatARS(totales.gasto_per_capita)}
          label="Gasto per cápita anual"
          hint={`Calculado sobre ${totales.habitantes.toLocaleString("es-AR")} habitantes.`}
        />
      </div>

      {/* Gráficos */}
      <div className="mt-10">
        <BudgetCharts />
      </div>

      {/* Tabla agrupada */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Distribución por finalidad
      </h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Finalidad</th>
              <th className="px-4 py-3 text-right">Presupuestado</th>
              <th className="px-4 py-3 text-right">% del total</th>
            </tr>
          </thead>
          <tbody>
            {porFinalidad.map((row) => (
              <tr key={row.finalidad} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">{row.finalidad}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatARS(row.total)}</td>
                <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                  {((row.total / totales.gastos_total) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle por partida */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-navy">Detalle por función</h2>
        <a
          href="/api/v1/presupuesto?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Finalidad</th>
              <th className="px-4 py-3">Función</th>
              <th className="px-4 py-3 text-right">Presupuestado</th>
              <th className="px-4 py-3 text-right">Verificación</th>
              <th className="px-4 py-3">Fuente</th>
            </tr>
          </thead>
          <tbody>
            {partidas.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-600">{p.finalidad}</td>
                <td className="px-4 py-3 font-medium text-navy">{p.funcion}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatARS(p.presupuestado)}
                </td>
                <td className="px-4 py-3 text-right">
                  {p.verificado ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      verificado
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      pendiente
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <SourceTag id={p.sourceId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Nota metodológica: las filas marcadas como <strong>pendiente</strong> reflejan la
        estructura clasificadora estándar municipal argentina con pesos relativos que
        suman el total oficial. Se reemplazarán por los importes oficiales cuando el
        municipio publique el desglose detallado.
      </p>
    </div>
  );
}
