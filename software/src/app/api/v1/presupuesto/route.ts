import { partidas, totales } from "@/lib/data/presupuesto";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/presupuesto
 * @query format=json (default) | csv
 * @query finalidad=<filtro opcional por finalidad>
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const finalidad = searchParams.get("finalidad");

  let rows = partidas;
  if (finalidad) {
    rows = rows.filter((p) =>
      p.finalidad.toLowerCase().includes(finalidad.toLowerCase())
    );
  }

  if (format === "csv") {
    return csvResponse(
      "presupuesto-2026",
      rows.map((p) => ({
        id: p.id,
        finalidad: p.finalidad,
        funcion: p.funcion,
        presupuestado_ars: p.presupuestado,
        ejercicio: p.ejercicio,
        verificado: p.verificado,
        fuente_id: p.sourceId
      }))
    );
  }

  return jsonResponse({
    meta: {
      ejercicio: totales.ejercicio,
      total_gastos: totales.gastos_total,
      total_recursos_corrientes: totales.recursos_corrientes,
      registros: rows.length,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString()
    },
    partidas: rows
  });
}
