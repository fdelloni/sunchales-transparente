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

const COLORS = ["#0F1B3D", "#0C4A6E", "#1C7293", "#E8A33D", "#C97B1A", "#475569", "#94A3B8"];

export default function BudgetCharts() {
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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Distribución por finalidad
        </h3>
        <p className="mb-3 text-xs text-slate-500">
          Total: {formatARSCompact(totales.gastos_total)}
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={porFinalidad}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={2}
              >
                {porFinalidad.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => formatARSCompact(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
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

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Top 10 funciones por monto
        </h3>
        <p className="mb-3 text-xs text-slate-500">Importes en pesos argentinos.</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top10}
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
                width={140}
                tick={{ fontSize: 11, fill: "#0F172A" }}
              />
              <Tooltip
                formatter={(v: number) => formatARSCompact(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#1C7293" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
