"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

type SerieAnual = { anio: number; total: number };

const COLORS = [
  "#0F1B3D",
  "#0C4A6E",
  "#1C7293",
  "#E8A33D",
  "#C97B1A",
  "#475569",
  "#94A3B8",
  "#7C3AED",
  "#0891B2",
  "#16A34A",
  "#DC2626"
];

export function ActividadAnualChart({ data }: { data: SerieAnual[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-serif text-base font-bold text-navy">
        Actividad anual del Concejo
      </h3>
      <p className="mb-3 mt-0.5 text-xs text-slate-500">
        Cantidad de documentos publicados por año (todas las categorías).
      </p>
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="anio"
              tick={{ fontSize: 11, fill: "#0F172A" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`${v} documentos`, "Total"]}
            />
            <Bar dataKey="total" fill="#E8A33D" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoriasChart({
  data
}: {
  data: { categoria: string; cantidad: number }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-serif text-base font-bold text-navy">
        Distribución por categoría
      </h3>
      <p className="mb-3 mt-0.5 text-xs text-slate-500">
        Cómo se reparten los {data.reduce((s, d) => s + d.cantidad, 0)} PDFs.
      </p>
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="cantidad"
              nameKey="categoria"
              outerRadius="80%"
              innerRadius="45%"
              paddingAngle={2}
              label={(d: { cantidad: number }) => d.cantidad}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconSize={10}
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function UcmFrecuenciaChart({
  data
}: {
  data: { anio: number; cantidad: number }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-serif text-base font-bold text-navy">
        Frecuencia de actualización de la UCM por año
      </h3>
      <p className="mb-3 mt-0.5 text-xs text-slate-500">
        Cantidad de ordenanzas que modificaron el valor de la Unidad de Cuenta
        Municipal en cada año.
      </p>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="anio" tick={{ fontSize: 11, fill: "#0F172A" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="cantidad" fill="#1C7293" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
