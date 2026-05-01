import {
  recursos,
  totalesRecaudacion,
  autonomiaFiscal,
  dependenciaCoparticipacion,
  agregadosPorCategoria,
  labelsCategoria
} from "@/lib/data/recaudacion";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/recaudacion
 *  ?format=json (default) | csv
 *  ?categoria=tributarios_propios|coparticipacion_provincial|...
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const categoria = searchParams.get("categoria");

  let rows = recursos;
  if (categoria) rows = rows.filter((r) => r.categoria === categoria);

  if (format === "csv") {
    return csvResponse(
      "recaudacion-2026",
      rows.map((r) => ({
        id: r.id,
        categoria: r.categoria,
        categoria_label: labelsCategoria[r.categoria],
        nombre: r.nombre,
        descripcion: r.descripcion,
        contraprestacion: r.contraprestacion ?? "",
        presupuestado_ars: r.presupuestado,
        ejercicio: r.ejercicio,
        verificado: r.verificado,
        fuente_id: r.fuenteId
      }))
    );
  }

  return jsonResponse({
    meta: {
      ejercicio: totalesRecaudacion.ejercicio,
      total_recursos_corrientes: totalesRecaudacion.recursosCorrientesTotal,
      recursos_capital_ley_12385: totalesRecaudacion.recursosCapitalLey12385,
      autonomia_fiscal: autonomiaFiscal(),
      dependencia_coparticipacion: dependenciaCoparticipacion(),
      registros: rows.length,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString()
    },
    agregados_por_categoria: agregadosPorCategoria(),
    recursos: rows
  });
}
