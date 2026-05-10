import {
  normasConcejo,
  digestoConcejoMeta,
} from "@/lib/data/digesto-concejo.generated";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/digesto-concejo
 *  ?format=json (default) | csv
 *  ?anio=YYYY            opcional, filtra por año
 *  ?tipo=Ordenanza|Decreto|Resolución|Declaración|Minuta  opcional
 *
 * Listado sincronizado del digesto del Concejo Municipal de Sunchales,
 * obtenido via paginación pública del sitio oficial. El conteo del Concejo
 * declara 5.309 normas; la paginación pública expone 3.261. La diferencia
 * se declara como brecha 'dig-concejo-paginacion-incompleta'. Licencia CC-BY-4.0.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const anioParam = searchParams.get("anio");
  const tipo = searchParams.get("tipo");
  const anio = anioParam ? Number(anioParam) : null;

  let rows = normasConcejo;
  if (anio && Number.isFinite(anio)) rows = rows.filter((n) => n.anio === anio);
  if (tipo) rows = rows.filter((n) => n.tipo?.toLowerCase() === tipo.toLowerCase());

  if (format === "csv") {
    return csvResponse(
      "digesto-concejo-sunchales",
      rows.map((n) => ({
        id_digesto: n.idDigesto,
        titulo: n.titulo,
        anio: n.anio ?? "",
        fecha: n.fecha ?? "",
        tipo: n.tipo ?? "",
        area: n.area ?? "",
        autor: n.autor ?? "",
        descripcion: n.descripcion,
        url_detalle: n.urlDetalle,
        url_pdf: n.urlPdf ?? "",
      }))
    );
  }

  return jsonResponse({
    meta: {
      ...digestoConcejoMeta,
      licencia: "CC-BY-4.0",
      brechas_relacionadas: [
        {
          id: "dig-concejo-paginacion-incompleta",
          descripcion:
            "El sitio del Concejo declara 5.309 normas pero la paginación pública sólo expone 3.261 (~62%).",
        },
      ],
      generado: new Date().toISOString(),
    },
    filtros_aplicados: { anio: anio ?? "todos", tipo: tipo ?? "todos" },
    normas: rows,
  });
}
