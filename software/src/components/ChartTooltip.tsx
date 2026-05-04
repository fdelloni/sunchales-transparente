"use client";

/**
 * Tooltip personalizado para gráficos Recharts.
 *
 * Reemplaza el tooltip por defecto, que muestra "<dataKey> : <valor>" — donde
 * `<dataKey>` suele ser una palabra en inglés ("value") por convención técnica.
 * Aquí solo se muestra el rótulo de la barra/segmento (en español) y el número,
 * sin contaminar la UI con identificadores internos.
 *
 * Uso:
 *   <Tooltip content={<ChartTooltip />} />
 *   <Tooltip content={<ChartTooltip formatValue={formatARSCompact} />} />
 */

type Payload = {
  value: number;
  name?: string;
  color?: string;
  payload?: { name?: string };
};

type Props = {
  active?: boolean;
  payload?: Payload[];
  label?: string | number;
  formatValue?: (v: number) => string;
};

export default function ChartTooltip({
  active,
  payload,
  label,
  formatValue,
}: Props) {
  if (!active || !payload || payload.length === 0) return null;

  const v = payload[0].value;
  // El "label" llega cuando el chart usa XAxis con dataKey (BarChart vertical
  // con categorías). Cuando es PieChart, el nombre viene en payload[0].name.
  const titulo = label ?? payload[0].name ?? payload[0].payload?.name ?? "";

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-md">
      {titulo !== "" && (
        <div className="font-semibold text-navy">{String(titulo)}</div>
      )}
      <div className="tabular-nums text-slate-700">
        {formatValue ? formatValue(v) : v}
      </div>
    </div>
  );
}
