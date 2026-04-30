import { contrataciones } from "@/lib/data/contrataciones";
import { sellarCadena } from "@/lib/hashchain";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/contrataciones
 *  ?format=json (default) | csv
 *  ?procedimiento=licitacion_publica|...
 *  ?estado=ejecucion|...
 *  ?incluir_cadena=true   (sella la hash-chain de cada contratación; útil para auditar)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const procedimiento = searchParams.get("procedimiento");
  const estado = searchParams.get("estado");
  const incluirCadena = searchParams.get("incluir_cadena") === "true";

  let rows = contrataciones;
  if (procedimiento) rows = rows.filter((c) => c.procedimiento === procedimiento);
  if (estado) rows = rows.filter((c) => c.estado === estado);

  if (format === "csv") {
    return csvResponse(
      "contrataciones-2026",
      rows.map((c) => ({
        id: c.id,
        expediente: c.expediente,
        ejercicio: c.ejercicio,
        procedimiento: c.procedimiento,
        numero: c.numero,
        objeto: c.objeto,
        categoria: c.categoria,
        area: c.area,
        presupuesto_oficial_ars: c.presupuestoOficial,
        estado: c.estado,
        fecha_apertura: c.fechaApertura ?? "",
        fecha_adjudicacion: c.fechaAdjudicacion ?? "",
        adjudicatario_cuit: c.adjudicado?.cuit ?? "",
        adjudicatario_razon_social: c.adjudicado?.razonSocial ?? "",
        monto_adjudicado_ars: c.adjudicado?.monto ?? "",
        oferentes: c.oferentes.length,
        documentos: c.documentos.length
      }))
    );
  }

  const payload = await Promise.all(
    rows.map(async (c) => {
      const base = { ...c, cadenaSinSellar: undefined as never };
      if (!incluirCadena) {
        return { ...base, cadena: undefined };
      }
      const cadena = await sellarCadena(c.expediente, c.ejercicio, c.cadenaSinSellar);
      return { ...base, cadena };
    })
  );

  return jsonResponse({
    meta: {
      total: rows.length,
      licencia: "CC-BY-4.0",
      generado: new Date().toISOString()
    },
    contrataciones: payload
  });
}
