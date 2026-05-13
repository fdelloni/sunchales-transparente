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
import { partidas, totales } from "@/lib/data/presupuesto";
import { formatARSCompact } from "@/lib/format";
import ChartTooltip from "@/components/ChartTooltip";
import { useIsMobile } from "@/lib/useIsMobile";

// Paleta Bandera de Sunchales (oro + verde) con auxiliares afines.
const COLORS = ["#FCC81D", "#ADCF3D", "#5D7A18", "#3F9430", "#9A7400", "#1A6F2D", "#0F5E1F"];

export default function BudgetCharts() {
  const esMobile = useIsMobile();
  const porFinalidad = Object.values(
    partidas.reduce<Record<string, { name: string; value: number }>>((acc, p) => {
      acc[p.finalidad] ??= { name: p.finalidad, value: 0 };
      acc[p.finalidad].value += p.presupuestado;
      return acc;
    }, {})
  ).sort((a, b) => b.value - a.value);

  const top10 = [...partidas]
    .sort((a, b) => b.presupuestado - a.presupuestado)
    .slice(0, 10)
    .map((p) => ({ name: p.funcion, value: p.presupuestado }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Distribución por finalidad
        </h3>
        <p className="mb-3 text-xs text-slate-500">
          Total: {formatARSCompact(totales.gastos_total)}
        </p>
        {/* En mobile el chart se achica (h-56 = 224px) y el radio del Pie se
            reduce; en sm+ vuelve a 288px (h-72). */}
        <div className="h-56 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={porFinalidad}
                dataKey="value"
                nameKey="name"
                outerRadius={esMobile ? 80 : 100}
                innerRadius={esMobile ? 40 : 50}
                paddingAngle={2}
              >
                {porFinalidad.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip formatValue={formatARSCompact} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 space-y-1 text-xs text-slate-600">
          {porFinalidad.slice(0, 4).map((f, i) => (
            <li key={f.name} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="tabular-nums">{formatARSCompact(f.value)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Top 10 funciones por monto
        </h3>
        <p className="mb-3 text-xs text-slate-500">Importes en pesos argentinos.</p>
        {/* Altura aumenta en mobile porque YAxis tiene 10 labels apilados —
            si dejamos 288px, las labels se solapan ilegibles. */}
        <div className="h-[360px] w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top10}
              layout="vertical"
              margin={{
                top: 5,
                right: esMobile ? 12 : 24,
                bottom: 5,
                left: esMobile ? 0 : 8,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                type="number"
                tickFormatter={(v) => formatARSCompact(v)}
                tick={{ fontSize: esMobile ? 10 : 11, fill: "#64748B" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={esMobile ? 100 : 140}
                tick={{ fontSize: esMobile ? 10 : 11, fill: "#0F172A" }}
              />
              <Tooltip content={<ChartTooltip formatValue={formatARSCompact} />} />
              <Bar dataKey="value" fill="#3F9430" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
