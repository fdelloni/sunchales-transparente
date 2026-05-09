import {
  brechas,
  labelEstado,
  labelCategoria,
  type BrechaModulo,
  type BrechaEstado
} from "@/lib/data/brechas";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/brechas
 *  ?format=json (default) | csv
 *  ?modulo=digesto|juzgado-faltas|presupuesto|personal|contrataciones|recaudacion
 *  ?estado=no_publicado|publicado_parcial|publicado_formato_cerrado|...
 *
 * Dataset abierto bajo licencia CC-BY-4.0.
 *
 * Una "brecha" es información de publicación obligatoria que el Estado
 * municipal aún no expone públicamente. Hacer visible la omisión es parte
 * del deber estatal de publicidad de los actos de gobierno (CN art. 1,
 * CADH art. 13, Ord. Sunchales 1872/2009, Decreto Pcial. SF 0692/2009).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const modulo = searchParams.get("modulo") as BrechaModulo | null;
  const estado = searchParams.get("estado") as BrechaEstado | null;

  let rows = brechas;
  if (modulo) rows = rows.filter((b) => b.modulo === modulo);
  if (estado) rows = rows.filter((b) => b.estado === estado);

  if (format === "csv") {
    return csvResponse(
      "brechas-transparencia-sunchales",
      rows.map((b) => ({
        id: b.id,
        modulo: b.modulo,
        titulo: b.titulo,
        descripcion: b.descripcion,
        categoria: b.categoria,
        categoria_label: labelCategoria[b.categoria],
        estado: b.estado,
        estado_label: labelEstado[b.estado],
        fundamento: b.fundamento,
        fundamento_url: b.fundamentoUrl ?? "",
        publicacion_parcial_url: b.publicacionParcialUrl ?? "",
        detectada_el: b.detectadaEl,
        ultimo_seguimiento: b.ultimoSeguimiento ?? ""
      }))
    );
  }

  return jsonResponse({
    meta: {
      total: rows.length,
      total_universo: brechas.length,
      licencia: "CC-BY-4.0",
      fundamento_normativo:
        "Constitución Nacional arts. 1, 33, 75 inc. 22 · CADH art. 13 · Ord. Sunchales 1872/2009 · Decreto Pcial. SF 0692/2009",
      vias_pedido_formal: {
        municipio: "https://concejosunchales.gob.ar/acceso-informacion-publica.aspx",
        provincial_supletorio:
          "https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811",
        plazo_municipal: "10 días hábiles + 5 de prórroga (Art. 7° Ord. 1872/2009)",
        gratuidad: true,
        requiere_patrocinio_letrado: false,
        requiere_motivos: false
      },
      generado: new Date().toISOString()
    },
    filtros_aplicados: {
      modulo: modulo ?? "todos",
      estado: estado ?? "todos"
    },
    brechas: rows
  });
}
