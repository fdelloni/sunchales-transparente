import {
  publicacionesConcejo,
  publicacionesConcejoMeta,
  type TipoPublicacionConcejo,
} from "@/lib/data/publicaciones-concejo.generated";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/publicaciones-concejo
 *  ?format=json (default) | csv
 *  ?tipo=boletin_bimestral | resumen_anual    opcional
 *  ?anio=YYYY                                 opcional, filtra por año de publicación
 *
 * Listado sincronizado de los boletines bimestrales (2017-2026) y los
 * resúmenes anuales (2012-2025) publicados por el Concejo Municipal de
 * Sunchales en su sitio oficial. Cada registro incluye URL al PDF.
 * Licencia CC-BY-4.0.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const tipo = searchParams.get("tipo") as TipoPublicacionConcejo | null;
  const anioParam = searchParams.get("anio");
  const anio = anioParam ? Number(anioParam) : null;

  let rows = publicacionesConcejo;
  if (tipo) rows = rows.filter((p) => p.tipo === tipo);
  if (anio && Number.isFinite(anio)) {
    rows = rows.filter(
      (p) => p.fechaPublicacion && Number(p.fechaPublicacion.slice(0, 4)) === anio
    );
  }

  if (format === "csv") {
    return csvResponse(
      "publicaciones-concejo-sunchales",
      rows.map((p) => ({
        tipo: p.tipo,
        id_publicacion: p.idPublicacion,
        titulo: p.titulo,
        fecha_publicacion: p.fechaPublicacion ?? "",
        url_detalle: p.urlDetalle ?? "",
        url_pdf: p.urlPdf ?? "",
      }))
    );
  }

  return jsonResponse({
    meta: {
      ...publicacionesConcejoMeta,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString(),
    },
    filtros_aplicados: { tipo: tipo ?? "todos", anio: anio ?? "todos" },
    publicaciones: rows,
  });
}
