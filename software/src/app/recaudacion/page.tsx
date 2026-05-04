import StatCard from "@/components/StatCard";
import SourceTag from "@/components/SourceTag";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import RecaudacionCharts from "./RecaudacionCharts";
import {
  recursos,
  totalesRecaudacion,
  agregadosPorCategoria,
  autonomiaFiscal,
  dependenciaCoparticipacion,
  labelsCategoria,
  type CategoriaRecurso
} from "@/lib/data/recaudacion";
import { formatARS, formatARSCompact, formatNumber } from "@/lib/format";

const COLOR_CATEGORIA: Record<CategoriaRecurso, string> = {
  tributarios_propios: "bg-emerald-50 text-emerald-700",
  no_tributarios_propios: "bg-teal-50 text-teal-700",
  coparticipacion_provincial: "bg-amber-50 text-amber-700",
  coparticipacion_nacional: "bg-orange-50 text-orange-700",
  recursos_capital: "bg-indigo-50 text-indigo-700"
};

export default function RecaudacionPage() {
  const af = autonomiaFiscal();
  const dc = dependenciaCoparticipacion();
  const agregados = agregadosPorCategoria();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Buscador arriba del título — entrada principal de la sección */}
      <div className="mb-8">
        <BuscadorSeccion placeholder="Buscar sobre recaudación y recursos…" />
      </div>

      <span className="eyebrow">Módulo · Recaudación municipal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Cálculo de Recursos 2026
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Detalle de los recursos del Presupuesto Municipal 2026 clasificados por
        origen: tributos locales (con contraprestación específica), recursos no
        tributarios propios, coparticipación provincial y federal, y recursos
        de capital. <strong>Los totales son cifras oficiales verificadas</strong>;
        el desglose por tipo es una estructura ejemplificadora con pesos
        relativos típicos hasta tanto el municipio publique el detalle del
        Cálculo de Recursos.
      </p>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Nota jurídica:</strong> los municipios argentinos cobran{" "}
        <em>tasas, derechos y contribuciones</em> (con contraprestación
        específica), <strong>no impuestos</strong>. Los impuestos son facultad
        de Nación y de las Provincias. Por eso el rubro "tributos locales" del
        municipio tiene esa naturaleza jurídica particular.
      </div>

      {/* KPIs principales */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatARSCompact(totalesRecaudacion.recursosCorrientesTotal)}
          label="Recursos corrientes 2026"
          hint="Cifra oficial del proyecto de Ordenanza."
          verified
        />
        <StatCard
          value={`${af.porcentajeAutonomia.toFixed(1)}%`}
          label="Autonomía fiscal"
          hint={`Recursos propios sobre el total: ${formatARSCompact(af.recursosPropios)}.`}
        />
        <StatCard
          value={`${dc.porcentaje.toFixed(1)}%`}
          label="Dependencia de coparticipación"
          hint={`Recursos provenientes de Provincia/Nación: ${formatARSCompact(dc.coparticipacion)}.`}
        />
        <StatCard
          value={formatARS(totalesRecaudacion.recursosPerCapita)}
          label="Recursos per cápita anuales"
          hint={`Sobre ${formatNumber(totalesRecaudacion.habitantes)} habitantes.`}
        />
      </div>

      {/* Gráficos */}
      <div className="mt-10">
        <RecaudacionCharts />
      </div>

      {/* Resumen por categoría */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Resumen por origen
      </h2>
      <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Tipos</th>
              <th className="px-4 py-3 text-right">Presupuestado</th>
              <th className="px-4 py-3 text-right">% del total corriente</th>
            </tr>
          </thead>
          <tbody>
            {agregados.map((a) => (
              <tr key={a.categoria} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">
                  {labelsCategoria[a.categoria]}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{a.cantidad}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatARS(a.total)}</td>
                <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                  {((a.total / totalesRecaudacion.recursosCorrientesTotal) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-navy">Detalle por tipo de recurso</h2>
        <a
          href="/api/v1/recaudacion?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
      </div>
      <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Recurso</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Presupuestado</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fuente</th>
            </tr>
          </thead>
          <tbody>
            {recursos.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="font-medium text-navy">{r.nombre}</div>
                  <div className="mt-1 text-xs text-slate-500">{r.descripcion}</div>
                  {r.contraprestacion && (
                    <div className="mt-1 text-xs italic text-teal">
                      Contraprestación: {r.contraprestacion}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      COLOR_CATEGORIA[r.categoria]
                    }`}
                  >
                    {labelsCategoria[r.categoria]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatARS(r.presupuestado)}
                </td>
                <td className="px-4 py-3">
                  {r.verificado ? (
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
                  <SourceTag id={r.fuenteId as Parameters<typeof SourceTag>[0]["id"]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Aclaración metodológica: las filas marcadas como{" "}
        <strong>pendiente</strong> reflejan la estructura clasificadora típica
        del régimen municipal santafesino con pesos relativos que suman el total
        oficial. Se reemplazarán por los importes oficiales cuando el municipio
        publique el detalle del Cálculo de Recursos. Los nombres de los tributos
        locales son verificables contra la Ordenanza Tributaria Municipal vigente.
      </p>
    </div>
  );
}
