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
  recursos,
  agregadosPorCategoria,
  labelsCategoria,
  totalesRecaudacion
} from "@/lib/data/recaudacion";
import { formatARSCompact } from "@/lib/format";

const COLORS_CATEGORIA: Record<string, string> = {
  tributarios_propios: "#10B981",         // emerald
  no_tributarios_propios: "#1C7293",      // teal
  coparticipacion_provincial: "#E8A33D",  // coral / amber
  coparticipacion_nacional: "#C97B1A",    // dark amber
  recursos_capital: "#0F1B3D"             // navy
};

export default function RecaudacionCharts() {
  // Agregado por categoría (excluyendo recursos de capital del comparativo principal)
  const porCategoria = agregadosPorCategoria()
    .filter((a) => a.categoria !== "recursos_capital")
    .map((a) => ({
      name: labelsCategoria[a.categoria],
      value: a.total,
      categoria: a.categoria
    }));

  // Top tributos locales (para mostrar peso de cada tasa)
  const tributosLocales = recursos
    .filter((r) => r.categoria === "tributarios_propios")
    .sort((a, b) => b.presupuestado - a.presupuestado)
    .map((r) => ({
      name: r.nombre.replace("Tasa General de Inmuebles", "TGI").replace("Derecho de Registro e Inspección", "DReI"),
      value: r.presupuestado
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pie por categoría */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Origen de los recursos corrientes
        </h3>
        <p className="mb-3 text-xs text-slate-500">
          Total: {formatARSCompact(totalesRecaudacion.recursosCorrientesTotal)}
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={porCategoria}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={2}
              >
                {porCategoria.map((entry) => (
                  <Cell key={entry.categoria} fill={COLORS_CATEGORIA[entry.categoria] ?? "#94A3B8"} />
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
          {porCategoria.map((c) => (
            <li key={c.categoria} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: COLORS_CATEGORIA[c.categoria] ?? "#94A3B8" }}
              />
              <span className="flex-1 truncate">{c.name}</span>
              <span className="tabular-nums">{formatARSCompact(c.value)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bar chart de tributos locales */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-serif text-base font-bold text-navy">
          Tributos locales (recursos propios)
        </h3>
        <p className="mb-3 text-xs text-slate-500">
          Tasas y derechos que cobra el municipio. Cada uno tiene una
          contraprestación específica.
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={tributosLocales}
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
                width={150}
                tick={{ fontSize: 11, fill: "#0F172A" }}
              />
              <Tooltip
                formatter={(v: number) => formatARSCompact(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#10B981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
