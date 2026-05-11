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
import {
  distribucionPersonalActual,
  etiquetaCategoria,
  etiquetaGenero,
  fuenteGenero,
  tieneDatosGenero,
  totalPlantel,
  type CategoriaVinculacionGenero,
  type Genero,
} from "@/lib/data/genero";

/**
 * Sección de distribución por género. El municipio NO publica este dato,
 * así que los gráficos van con placeholders honestos. Cuando lleguen los
 * conteos (vía publicación oficial o respuesta a pedido de acceso), basta
 * con cargarlos en genero.ts y la sección se pueblan sola.
 *
 * Categorías de personal incluidas (4):
 *   1. Planta política
 *   2. Planta permanente
 *   3. Personal transitorio
 *   4. Contratación de servicios
 */

const GENEROS: Genero[] = ["mujer", "varon"];

const COLOR_GENERO: Record<Genero, string> = {
  mujer: "#7E22CE", // morado
  varon: "#2563EB", // azul
};

const COLOR_PENDIENTE = "#fde68a";

function BarrasPorSector({
  categoria,
}: {
  categoria: CategoriaVinculacionGenero;
}) {
  const datos = distribucionPersonalActual.find(
    (c) => c.categoria === categoria
  );
  if (!datos) return null;

  const data = datos.porSector.map((s) => {
    const fila: Record<string, number | string> = { seccion: s.seccion };
    let asignado = 0;
    for (const g of GENEROS) {
      const v = s.conteos[g];
      if (v != null) {
        fila[etiquetaGenero[g]] = v;
        asignado += v;
      }
    }
    const sinDato = s.totalAgentes - asignado;
    if (sinDato > 0) fila["Pendiente de publicar"] = sinDato;
    return fila;
  });

  const hayDato = datos.porSector.some((s) =>
    Object.values(s.conteos).some((v) => v != null)
  );

  return (
    <div>
      <h4 className="font-serif text-base font-bold text-navy">
        {etiquetaCategoria[categoria]}{" "}
        <span className="ml-1 text-xs font-normal text-slate-500">
          {datos.totalAgentes} {datos.totalAgentes === 1 ? "agente" : "agentes"}
        </span>
      </h4>
      <div className="mt-2 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 20, left: 30, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={11}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="seccion"
              stroke="#64748b"
              fontSize={10}
              width={140}
              tick={{ fill: "#475569" }}
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
              wrapperStyle={{ fontSize: 11, paddingTop: 6 }}
              iconType="square"
            />
            {hayDato &&
              GENEROS.map((g) => (
                <Bar
                  key={g}
                  dataKey={etiquetaGenero[g]}
                  stackId="genero"
                  fill={COLOR_GENERO[g]}
                  maxBarSize={28}
                />
              ))}
            <Bar
              dataKey="Pendiente de publicar"
              stackId="genero"
              fill={COLOR_PENDIENTE}
              maxBarSize={28}
            >
              {data.map((_, i) => (
                <Cell key={i} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ResumenAgregado() {
  const total = totalPlantel();
  const sumPorGenero: Record<Genero, number> = { mujer: 0, varon: 0 };
  let asignado = 0;
  for (const c of distribucionPersonalActual) {
    for (const g of GENEROS) {
      const v = c.totalPorGenero[g];
      if (v != null) {
        sumPorGenero[g] += v;
        asignado += v;
      }
    }
  }
  const pendiente = total - asignado;

  return (
    <div className="rounded-2xl border-2 border-navy bg-navy p-5 text-white">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-serif text-base font-bold">
          Distribución agregada — todo el personal municipal
        </h4>
        <span className="rounded-md bg-amber-400/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-950">
          Inferido desde nombre
        </span>
      </div>
      <p className="mt-1 text-[12px] text-white/70">
        Total verificado: <strong>{total}</strong> personas (planta política +
        planta permanente + transitorios + contratación de servicios). Los
        agentes en Retiro Especial se excluyen porque no prestan servicio
        activo.
      </p>

      <div className="mt-4 flex h-9 w-full overflow-hidden rounded-lg bg-white/10">
        {GENEROS.map((g) =>
          sumPorGenero[g] > 0 ? (
            <div
              key={g}
              className="flex items-center justify-center text-[11px] font-semibold"
              style={{
                width: `${(sumPorGenero[g] / total) * 100}%`,
                backgroundColor: COLOR_GENERO[g],
              }}
              title={`${etiquetaGenero[g]}: ${sumPorGenero[g]}`}
            >
              {sumPorGenero[g]}
            </div>
          ) : null
        )}
        {pendiente > 0 ? (
          <div
            className="flex items-center justify-center text-[11px] font-semibold text-amber-900"
            style={{
              width: `${(pendiente / total) * 100}%`,
              backgroundColor: COLOR_PENDIENTE,
            }}
            title={`Pendiente de publicar: ${pendiente}`}
          >
            {pendiente} pendiente de publicar
          </div>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {GENEROS.map((g) => (
          <div
            key={g}
            className="flex items-center gap-2 rounded-lg bg-white/5 p-2"
          >
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLOR_GENERO[g] }}
            />
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-white/60">
                {etiquetaGenero[g]}
              </div>
              <div className="font-serif text-base font-bold">
                {sumPorGenero[g] > 0 ? sumPorGenero[g] : "—"}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-lg bg-amber-100/20 p-2">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: COLOR_PENDIENTE }}
          />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-wider text-amber-100/80">
              Pendiente
            </div>
            <div className="font-serif text-base font-bold">{pendiente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneroSection() {
  return (
    <div className="space-y-6">
      <ResumenAgregado />

      <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-[13px] text-amber-900">
        <strong>Importante — método de cálculo.</strong> La Municipalidad de
        Sunchales <strong>no publica</strong> el género del personal. Los
        números que se muestran son <strong>inferidos a partir del nombre de
        pila</strong> de cada agente (con un diccionario de nombres argentinos
        comunes y heurística por terminación). Sobre 463 personas, 462 se
        resolvieron automáticamente y 1 caso ambiguo fue revisado manualmente.
        El margen de error esperado es del 1–3 %. <strong>No es dato oficial</strong>
        ; es la mejor aproximación ciudadana hasta que el municipio publique
        el dato real bajo la Ord. 1872/2009. Cualquier persona que se sienta
        mal representada puede solicitar corrección.
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
        <BarrasPorSector categoria="planta_politica" />
        <BarrasPorSector categoria="planta_permanente" />
        <BarrasPorSector categoria="transitorios" />
        <BarrasPorSector categoria="contratados" />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-[12px] text-slate-600">
        <strong>Nota metodológica:</strong> {fuenteGenero.notaMetodologica}
      </div>
    </div>
  );
}
