import StatCard from "@/components/StatCard";
import SourceTag from "@/components/SourceTag";
import { empleados, aggregadosPorArea } from "@/lib/data/personal";
import { formatARS, formatARSCompact, formatNumber } from "@/lib/format";

export default function PersonalPage() {
  const total = empleados.length;
  const masaSalarial = empleados.reduce((acc, e) => acc + (e.remuneracionBruta ?? 0), 0);
  const verificadosCargo = empleados.filter((e) => e.fuenteCargo === "verificado_publico").length;
  const verificadosRem = empleados.filter((e) => e.fuenteRemuneracion === "verificado_oficial").length;
  const agg = aggregadosPorArea();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="eyebrow">Módulo · Padrón de Personal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Padrón de Personal — Planta Política
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Cargos públicos del Departamento Ejecutivo Municipal de Sunchales. Los cargos y
        áreas son <strong>información pública verificada</strong> contra el organigrama
        publicado por el municipio. Las remuneraciones brutas son <strong>estimaciones
        referenciales</strong> (escalas habituales del régimen municipal santafesino) hasta
        que el municipio publique las cifras oficiales mensuales.
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatNumber(total)}
          label="Cargos publicados"
          hint="Planta política — funcionarios."
        />
        <StatCard
          value={formatARSCompact(masaSalarial)}
          label="Masa salarial mensual estimada"
          hint="Suma de remuneraciones brutas referenciales."
        />
        <StatCard
          value={`${verificadosCargo}/${total}`}
          label="Cargos verificados"
          verified={verificadosCargo === total}
        />
        <StatCard
          value={`${verificadosRem}/${total}`}
          label="Remuneraciones verificadas"
          hint="Pendientes de informar oficialmente."
          verified={verificadosRem === total}
        />
      </div>

      {/* Por área */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Distribución por área</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Área</th>
              <th className="px-4 py-3 text-right">Cargos</th>
              <th className="px-4 py-3 text-right">Masa salarial mensual</th>
              <th className="px-4 py-3 text-right">% del total</th>
            </tr>
          </thead>
          <tbody>
            {agg.map((a) => (
              <tr key={a.area} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">{a.area}</td>
                <td className="px-4 py-3 text-right tabular-nums">{a.cantidad}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatARS(a.masaSalarial)}</td>
                <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                  {((a.masaSalarial / masaSalarial) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-navy">Detalle de cargos</h2>
        <a
          href="/api/v1/personal?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Apellido y nombre</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">Área</th>
              <th className="px-4 py-3 text-right">Rem. bruta mensual</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fuente</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((e) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">{e.apellidoNombre}</td>
                <td className="px-4 py-3 text-slate-700">{e.cargo}</td>
                <td className="px-4 py-3 text-slate-600">{e.area}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {e.remuneracionBruta != null ? formatARS(e.remuneracionBruta) : "—"}
                </td>
                <td className="px-4 py-3">
                  {e.fuenteRemuneracion === "verificado_oficial" ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      verificada
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      referencial
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <SourceTag id="organigramaMunicipal" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Aclaración: los nombres y cargos se obtuvieron del organigrama municipal publicado.
        Las remuneraciones se reemplazarán por importes oficiales una vez publicada la nómina
        salarial municipal en formato estructurado.
      </p>
    </div>
  );
}
