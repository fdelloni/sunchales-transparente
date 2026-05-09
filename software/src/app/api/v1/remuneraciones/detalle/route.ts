import {
  remuneracionesDetalle,
  remuneracionesDetalleMeta,
} from "@/lib/data/remuneraciones-detalle.generated";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/remuneraciones/detalle
 *  ?format=json (default) | csv
 *  ?periodo=YYYY-MM[-SAC]   opcional, filtra por período exacto
 *  ?anio=YYYY               opcional, filtra por año
 *
 * Filas estructuradas extraídas mes a mes de los PDFs oficiales de
 * remuneraciones de funcionarios. Licencia CC-BY-4.0.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const periodo = searchParams.get("periodo");
  const anioParam = searchParams.get("anio");
  const anio = anioParam ? Number(anioParam) : null;

  let detalles = remuneracionesDetalle;
  if (periodo) detalles = detalles.filter((d) => d.periodo === periodo);
  if (anio && Number.isFinite(anio)) detalles = detalles.filter((d) => d.anio === anio);

  if (format === "csv") {
    const filas = detalles.flatMap((d) =>
      d.filas.map((f) => ({
        periodo: d.periodo,
        anio: d.anio ?? "",
        mes: d.mes ?? "",
        sac: d.sac ? "true" : "false",
        etiqueta: f.etiqueta,
        bruto: f.bruto ?? "",
        descuentos: f.descuentos ?? "",
        neto: f.neto ?? "",
        url_pdf: d.urlPdf,
      }))
    );
    return csvResponse("remuneraciones-detalle-sunchales", filas);
  }

  return jsonResponse({
    meta: {
      ...remuneracionesDetalleMeta,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString(),
    },
    filtros_aplicados: { periodo: periodo ?? "todos", anio: anio ?? "todos" },
    detalles,
  });
}
