import {
  licitacionesOficiales,
  licitacionesMeta,
  type ProcedimientoOficial,
} from "@/lib/data/licitaciones.generated";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/licitaciones
 *  ?format=json (default) | csv
 *  ?anio=YYYY            opcional, filtra por año
 *  ?procedimiento=licitacion_publica | licitacion_privada | concurso_precios | contratacion_directa
 *
 * Listado sincronizado de licitaciones publicadas por la Municipalidad de
 * Sunchales en su sitio oficial. Incluye número, decreto, objeto, presupuesto
 * oficial, fecha de apertura y links a pliegos. Los oferentes, montos
 * adjudicados y decretos de adjudicación NO se publican por el municipio
 * (brecha 'contr-adjudicaciones'). Licencia CC-BY-4.0.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const anioParam = searchParams.get("anio");
  const proc = searchParams.get("procedimiento") as ProcedimientoOficial | null;
  const anio = anioParam ? Number(anioParam) : null;

  let rows = licitacionesOficiales;
  if (anio && Number.isFinite(anio)) rows = rows.filter((l) => l.anio === anio);
  if (proc) rows = rows.filter((l) => l.procedimiento === proc);

  if (format === "csv") {
    return csvResponse(
      "licitaciones-oficiales-sunchales",
      rows.map((l) => ({
        id: l.id,
        titulo: l.titulo,
        procedimiento: l.procedimiento,
        numero: l.numero,
        anio: l.anio,
        decreto: l.decreto ?? "",
        objeto: l.objeto ?? "",
        presupuesto_oficial_ars: l.presupuestoOficial ?? "",
        fecha_apertura: l.fechaApertura ?? "",
        documentos_count: l.documentos.length,
        fuente_url: l.fuenteUrl,
      }))
    );
  }

  return jsonResponse({
    meta: {
      ...licitacionesMeta,
      licencia: "CC-BY-4.0",
      brechas_relacionadas: [
        {
          id: "contr-adjudicaciones",
          descripcion:
            "Adjudicaciones, oferentes y montos finales contratados no son publicados por el municipio.",
        },
      ],
      generado: new Date().toISOString(),
    },
    filtros_aplicados: {
      anio: anio ?? "todos",
      procedimiento: proc ?? "todos",
    },
    licitaciones: rows,
  });
}
