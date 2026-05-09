import {
  remuneracionesPdfs,
  remuneracionesMeta,
} from "@/lib/data/remuneraciones.generated";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/remuneraciones
 *  ?format=json (default) | csv
 *  ?anio=YYYY            opcional, filtra por año
 *
 * Listado sincronizado de los PDFs de remuneraciones de funcionarios
 * municipales publicados por sunchales.gob.ar. Cada registro incluye URL
 * directa al PDF oficial. Licencia CC-BY-4.0.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const anioParam = searchParams.get("anio");
  const anio = anioParam ? Number(anioParam) : null;

  let rows = remuneracionesPdfs;
  if (anio && Number.isFinite(anio)) rows = rows.filter((p) => p.anio === anio);

  if (format === "csv") {
    return csvResponse(
      "remuneraciones-funcionarios-sunchales",
      rows.map((p) => ({
        periodo: p.periodo,
        anio: p.anio ?? "",
        mes: p.mes ?? "",
        sac: p.sac ? "true" : "false",
        label: p.label,
        url_pdf: p.urlPdf,
      }))
    );
  }

  return jsonResponse({
    meta: {
      ...remuneracionesMeta,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString(),
    },
    filtros_aplicados: { anio: anio ?? "todos" },
    remuneraciones: rows,
  });
}
