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
  CartesianGrid,
  Legend
} from "recharts";
import {
  brechas,
  labelCategoria,
  labelEstado,
  type BrechaCategoria,
  type BrechaEstado
} from "@/lib/data/brechas";
import { partidas, totales } from "@/lib/data/presupuesto";
import { normasDemo } from "@/lib/data/digesto";
import { actividadPorAnio, totalesConcejo } from "@/lib/data/concejo-archivos.generated";
import { formatARSCompact } from "@/lib/format";

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

const COLORS_GENERICOS = ["#0F1B3D", "#0C4A6E", "#1C7293", "#E8A33D", "#C97B1A", "#475569", "#94A3B8", "#7C3AED", "#0891B2"];

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

  // Normas por estado (vista demo)
  const normasPorEstado = Object.entries(
    normasDemo.reduce<Record<string, number>>((acc, n) => {
      acc[n.estado] = (acc[n.estado] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([estado, value]) => ({
    name: estado.charAt(0).toUpperCase() + estado.slice(1),
    value
  }));

  // Actividad legislativa anual (Concejo): documentos publicados por año
  const actividadConcejo = actividadPorAnio()
    .filter((s) => s.anio >= 2011)
    .map((s) => ({ name: String(s.anio), value: s.total }));

  // Distribución de PDFs del Concejo por categoría
  const distribucionConcejo = Object.entries(totalesConcejo)
    .map(([k, v]) => ({ name: k.replace(/-/g, " "), value: v }))
    .sort((a, b) => b.value - a.value);

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
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
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
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#D97706" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Brechas por módulo + Normas por estado */}
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
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#1C7293" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          titulo="Normas en el digesto por estado (vista demo)"
          hint="Vigentes, modificadas y derogadas — datos ilustrativos"
        >
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={normasPorEstado} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#0F172A" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#0F1B3D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Actividad legislativa anual del Concejo */}
      <div className="grid gap-6 lg:grid-cols-2">
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
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#E8A33D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

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
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#1C7293" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

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
              <Tooltip
                formatter={(v: number) => formatARSCompact(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#1C7293" radius={[0, 6, 6, 0]}>
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
