"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { evolucionNomina } from "@/lib/data/nomina-evolucion";

/**
 * Gráfico de barras agrupadas que muestra la evolución absoluta de cada
 * categoría período por período. Complementa al gráfico de líneas: éste se
 * lee mejor cuando hay valores ausentes (barras directamente desaparecen en
 * vez de "saltar" con conexiones discontinuas).
 *
 * Honestidad:
 *  - Si un valor es null para un período, la barra NO aparece (no es 0).
 *  - Las series Planta / Contratados / Retiro / Total directamente faltan
 *    para los 3 primeros períodos, lo cual visualiza el cambio metodológico
 *    de la municipalidad sin necesidad de leer la nota.
 */

const data = evolucionNomina.map((p) => ({
  periodo: p.label,
  "Planta Permanente": p.plantaPermanente,
  "Retiro Especial": p.retiroEspecial,
  Transitorios: p.transitorios,
  Contratados: p.contratados,
}));

export default function EvolucionNominaBarras() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="periodo"
              stroke="#64748b"
              fontSize={12}
              tick={{ fill: "#475569" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tick={{ fill: "#475569" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontSize: 12,
              }}
              labelStyle={{ color: "#cbd5e1", fontWeight: 600 }}
              formatter={(v: number | null) =>
                v == null ? "no publicado" : v
              }
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="square"
            />
            <Bar dataKey="Planta Permanente" fill="#1A6F2D" maxBarSize={40} />
            <Bar dataKey="Contratados" fill="#FCC81D" maxBarSize={40} />
            <Bar dataKey="Transitorios" fill="#0d9488" maxBarSize={40} />
            <Bar dataKey="Retiro Especial" fill="#94a3b8" maxBarSize={40}>
              {data.map((_, i) => (
                <Cell key={i} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Lectura honesta: cuando una barra no aparece para un período es porque
        ese dato <strong>no fue publicado</strong> ese mes (no significa
        cero). La tabla de abajo detalla qué valores existen y cuáles no.
      </p>
    </div>
  );
}
