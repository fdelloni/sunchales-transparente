"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  evolucionNomina,
  fuenteEvolucion,
} from "@/lib/data/nomina-evolucion";

/**
 * Gráfico de evolución de la nómina municipal.
 *
 * Reglas de honestidad:
 *  - Los puntos con valor null (Planta Permanente / Contratados / Retiro
 *    Especial / Total para los períodos anteriores a 2025-09) no se conectan
 *    con líneas porque NO hay PDF que respalde un valor en esos meses.
 *  - Una línea de referencia indica el momento en que la municipalidad pasó
 *    de publicar sólo "no permanentes" a publicar la nómina completa.
 */

const data = evolucionNomina.map((p) => ({
  periodo: p.label,
  Transitorios: p.transitorios,
  "Planta Permanente": p.plantaPermanente,
  "Contratación de Servicios": p.contratados,
  "Retiro Especial": p.retiroEspecial,
  "Total general": p.total,
}));

// Calculamos el índice del primer punto donde aparece la nómina completa.
const idxNominaCompleta = evolucionNomina.findIndex(
  (p) => p.plantaPermanente !== null
);
const labelCambio =
  idxNominaCompleta >= 0
    ? evolucionNomina[idxNominaCompleta].label
    : null;

export default function EvolucionNominaChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Altura mayor en mobile para que XAxis con labels de período (5 valores
          tipo "ago-24") no se solapen al estar la Legend abajo. */}
      <div className="h-[300px] w-full sm:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="periodo"
              stroke="#64748b"
              fontSize={11}
              tick={{ fill: "#475569" }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tick={{ fill: "#475569" }}
              allowDecimals={false}
              width={36}
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
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="circle"
            />
            {labelCambio && (
              <ReferenceLine
                x={labelCambio}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: "↑ Nómina completa",
                  position: "insideTopRight",
                  fill: "#92400e",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="Total general"
              stroke="#0f172a"
              strokeWidth={3}
              dot={{ r: 5, fill: "#0f172a" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="Planta Permanente"
              stroke="#1A6F2D"
              strokeWidth={2}
              dot={{ r: 4, fill: "#1A6F2D" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="Contratación de Servicios"
              stroke="#FCC81D"
              strokeWidth={2}
              dot={{ r: 4, fill: "#FCC81D" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="Transitorios"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ r: 4, fill: "#0d9488" }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="Retiro Especial"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ r: 3, fill: "#64748b" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Línea naranja punteada: período en el que la Municipalidad amplió su
        transparencia activa (de publicar sólo Transitorios a publicar la
        nómina completa). Los puntos faltantes para Planta / Contratados /
        Retiro Especial / Total en períodos previos NO se interpolan — sólo se
        muestra el dato real cuando el PDF oficial lo respalda.
      </p>
      <p className="mt-1 text-[11px] text-slate-500">
        Fuente:{" "}
        <a
          href={fuenteEvolucion.paginaIndice}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Nómina de Personal No Permanente — sunchales.gob.ar
        </a>{" "}
        (consultado {fuenteEvolucion.fechaConsulta}).
      </p>
    </div>
  );
}
