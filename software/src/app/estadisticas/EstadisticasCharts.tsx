"use client";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  brechas,
  labelCategoria,
  labelEstado,
  type BrechaCategoria,
  type BrechaEstado
} from "@/lib/data/brechas";
import { partidas, totales } from "@/lib/data/presupuesto";
import { actividadPorAnio, totalesConcejo } from "@/lib/data/concejo-archivos.generated";
import {
  conteoPorTipo as conteoNormasOficiales,
  normasOficiales
} from "@/lib/data/digesto-oficial.generated";
import { conteoEstados } from "@/lib/data/digesto-estados.generated";
import { formatARSCompact } from "@/lib/format";
import ChartTooltip from "@/components/ChartTooltip";

// Mapeo de colores por estado de brecha. Debe cubrir TODAS las keys del enum
// `BrechaEstado` (Record exhaustivo, exigido por TypeScript estricto).
const COLORS_BRECHAS_ESTADO: Record<BrechaEstado, string> = {
  no_publicado: "#DC2626",
  publicado_formato_cerrado: "#D97706",
  publicado_parcial: "#F59E0B",
  pedido_presentado: "#0891B2",
  pedido_vencido: "#7C2D12",
  respondido_parcial: "#3B82F6",
  subsanado: "#16A34A"
};

// Paleta de gráficos derivada de la Bandera de Sunchales (oro + verde)
// con tonos auxiliares afines (oliva, tierra) — sin azules.
const COLORS_GENERICOS = ["#FCC81D", "#ADCF3D", "#5D7A18", "#3F9430", "#9A7400", "#1A6F2D", "#0F5E1F", "#FFD966", "#CFE08C"];

export default function EstadisticasCharts() {
  // Brechas por estado
  const porEstado = Object.entries(
    brechas.reduce<Record<BrechaEstado, number>>((acc, b) => {
      acc[b.estado] = (acc[b.estado] ?? 0) + 1;
      return acc;
    }, {} as Record<BrechaEstado, number>)
  ).map(([estado, value]) => ({
    name: labelEstado[estado as BrechaEstado],
    value,
    estado: estado as BrechaEstado
  }));

  // Brechas por categoría
  const porCategoria = Object.entries(
    brechas.reduce<Record<BrechaCategoria, number>>((acc, b) => {
      acc[b.categoria] = (acc[b.categoria] ?? 0) + 1;
      return acc;
    }, {} as Record<BrechaCategoria, number>)
  )
    .map(([categoria, value]) => ({
      name: labelCategoria[categoria as BrechaCategoria],
      value
    }))
    .sort((a, b) => b.value - a.value);

  // Brechas por módulo
  const porModulo = Object.entries(
    brechas.reduce<Record<string, number>>((acc, b) => {
      acc[b.modulo] = (acc[b.modulo] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([modulo, value]) => ({
    name: modulo === "digesto" ? "Digesto y Concejo" : "Juzgado de Faltas",
    value
  }));

  // Top finalidades del presupuesto (top 5)
  const topFinalidades = Object.values(
    partidas.reduce<Record<string, { name: string; value: number }>>((acc, p) => {
      acc[p.finalidad] ??= { name: p.finalidad, value: 0 };
      acc[p.finalidad].value += p.presupuestado;
      return acc;
    }, {})
  )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Actividad legislativa anual (Concejo): documentos publicados por año
  const actividadConcejo = actividadPorAnio()
    .filter((s) => s.anio >= 2011)
    .map((s) => ({ name: String(s.anio), value: s.total }));

  // Distribución de PDFs del Concejo por categoría
  const distribucionConcejo = Object.entries(totalesConcejo)
    .map(([k, v]) => ({ name: k.replace(/-/g, " "), value: v }))
    .sort((a, b) => b.value - a.value);

  // Normas en el Digesto oficial por tipo (datos REALES sincronizados desde
  // sunchales.miportal.ar/digesto)
  const normasOficialesPorTipo = (
    Object.entries(conteoNormasOficiales) as [string, number][]
  )
    .map(([tipo, value]) => ({ name: tipo, value }))
    .sort((a, b) => b.value - a.value);

  // Estado de vigencia (computado por análisis NLP de Gemini sobre el TEXTO
  // de las normas: detecta "Derógase la Ord. N° X" y "Modifícase el art. Y de…")
  const normasPorEstado = [
    { name: "Vigentes", value: conteoEstados.vigente },
    { name: "Modificadas", value: conteoEstados.modificada },
    { name: "Derogadas", value: conteoEstados.derogada }
  ];

  return (
    <div className="space-y-6">
      {/* Salud de transparencia: brechas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          titulo="Brechas por estado"
          hint={`${brechas.length} brechas detectadas en total`}
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={porEstado}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  innerRadius="50%"
                  paddingAngle={2}
                  label={({ value }) => value}
                >
                  {porEstado.map((d) => (
                    <Cell key={d.estado} fill={COLORS_BRECHAS_ESTADO[d.estado]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-slate-600">
            {porEstado.map((d) => (
              <li key={d.estado} className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: COLORS_BRECHAS_ESTADO[d.estado] }}
                />
                <span className="flex-1 truncate">{d.name}</span>
                <span className="tabular-nums font-semibold">{d.value}</span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard
          titulo="Brechas por categoría"
          hint="Áreas donde el municipio aún no publica información obligatoria"
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={porCategoria}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={140}
                  tick={{ fontSize: 10, fill: "#0F172A" }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#D97706" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Brechas por módulo + Actividad legislativa anual del Concejo */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          titulo="Brechas por módulo"
          hint="Distribución entre los módulos que aplican el principio"
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porModulo} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#0F172A" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#3F9430" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          titulo="Actividad legislativa anual del Concejo"
          hint="Documentos publicados por año (todas las categorías)"
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actividadConcejo} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#0F172A" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#FCC81D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Documentos del Concejo por categoría + Normas oficiales del Digesto por tipo */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          titulo="Documentos del Concejo por categoría"
          hint={`${distribucionConcejo.reduce((s, d) => s + d.value, 0)} PDFs sincronizados`}
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distribucionConcejo}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fontSize: 10, fill: "#0F172A" }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#3F9430" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          titulo="Normas en el Digesto oficial por tipo"
          hint={`${normasOficiales.length} normas sincronizadas desde el Digesto Municipal (2022 — actualidad)`}
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normasOficialesPorTipo}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#0F172A" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#0F5E1F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Estado de vigencia (análisis IA) */}
      <ChartCard
        titulo="Normas por estado de vigencia"
        hint={`Clasificación algorítmica con Gemini 2.5 Flash sobre el texto de cada norma. Detecta derogaciones y modificaciones EXPLÍCITAS (ej. "Derógase la Ord. N° X"). Las relaciones tácitas no se cuentan.`}
      >
        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={normasPorEstado}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#0F172A" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {normasPorEstado.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.name === "Vigentes"
                        ? "#16A34A"
                        : d.name === "Modificadas"
                        ? "#F59E0B"
                        : "#DC2626"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          ⚠ El Digesto oficial cubre 2022 — actualidad. Muchas normas anteriores
          no están sincronizadas, por lo que las modificaciones/derogaciones que
          afectan a normas pre-2022 no aparecen acá.
        </p>
      </ChartCard>

      {/* Top finalidades del presupuesto */}
      <ChartCard
        titulo="Top 5 finalidades del Presupuesto 2026"
        hint={`Total: ${formatARSCompact(totales.gastos_total)}`}
      >
        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topFinalidades}
              layout="vertical"
              margin={{ top: 5, right: 24, bottom: 5, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                type="number"
                tickFormatter={(v) => formatARSCompact(v)}
                tick={{ fontSize: 11, fill: "#64748B" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={130}
                tick={{ fontSize: 10, fill: "#0F172A" }}
              />
              <Tooltip content={<ChartTooltip formatValue={formatARSCompact} />} />
              <Bar dataKey="value" fill="#3F9430" radius={[0, 6, 6, 0]}>
                {topFinalidades.map((_, i) => (
                  <Cell key={i} fill={COLORS_GENERICOS[i % COLORS_GENERICOS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  titulo,
  hint,
  children
}: {
  titulo: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-serif text-base font-bold text-navy">{titulo}</h3>
      {hint && <p className="mb-3 mt-0.5 text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}
