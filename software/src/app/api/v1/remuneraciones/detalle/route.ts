import {
  remuneracionesDetalle,
  remuneracionesDetalleMeta,
} from "@/lib/data/remuneraciones-detalle.generated";
import {
  remuneracionesDetalleOcr,
  remuneracionesOcrMeta,
} from "@/lib/data/remuneraciones-ocr.generated";
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

  // Combinamos los dos orígenes: parser determinístico (texto digital) y OCR.
  // Cuando un período tiene texto digital, ignoramos el OCR (más confiable).
  const periodosConTexto = new Set(
    remuneracionesDetalle.filter((d) => d.parseado).map((d) => d.periodo + "::" + d.urlPdf)
  );
  const desdeOcr = remuneracionesDetalleOcr
    .filter((o) => !periodosConTexto.has(o.periodo + "::" + o.urlPdf))
    .map((o) => ({
      periodo: o.periodo,
      anio: o.anio,
      mes: o.mes,
      sac: o.sac,
      label: o.label,
      urlPdf: o.urlPdf,
      parseado: o.cantidadFilas > 0,
      cantidadFilas: o.cantidadFilas,
      filas: o.filas,
      origen: "ocr" as const,
      error: o.error,
    }));
  const desdeTexto = remuneracionesDetalle.map((d) => ({
    ...d,
    origen: "texto_digital" as const,
  }));
  let detalles: Array<(typeof desdeTexto)[number] | (typeof desdeOcr)[number]> = [
    ...desdeTexto,
    ...desdeOcr,
  ];

  if (periodo) detalles = detalles.filter((d) => d.periodo === periodo);
  if (anio && Number.isFinite(anio)) detalles = detalles.filter((d) => d.anio === anio);

  if (format === "csv") {
    const filas = detalles.flatMap((d) =>
      d.filas.map((f) => ({
        periodo: d.periodo,
        anio: d.anio ?? "",
        mes: d.mes ?? "",
        sac: d.sac ? "true" : "false",
        origen: d.origen,
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
      ocr: remuneracionesOcrMeta,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString(),
      advertencia_ocr:
        "Las filas con origen=ocr provienen de Tesseract sobre PDFs escaneados. Los montos individuales pueden contener errores; verificar contra el PDF original antes de citar.",
    },
    filtros_aplicados: { periodo: periodo ?? "todos", anio: anio ?? "todos" },
    detalles,
  });
}
