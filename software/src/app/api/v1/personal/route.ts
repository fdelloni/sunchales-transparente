import { empleados } from "@/lib/data/personal";
import { csvResponse, jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/personal
 * @query format=json (default) | csv
 * @query area=<filtro opcional por área>
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const area = searchParams.get("area");

  let rows = empleados;
  if (area) {
    rows = rows.filter((e) => e.area.toLowerCase().includes(area.toLowerCase()));
  }

  if (format === "csv") {
    return csvResponse(
      "personal-municipal-2026",
      rows.map((e) => ({
        id: e.id,
        apellido_nombre: e.apellidoNombre,
        cargo: e.cargo,
        area: e.area,
        jerarquia: e.jerarquia,
        remuneracion_bruta_ars: e.remuneracionBruta ?? "",
        fuente_cargo: e.fuenteCargo,
        fuente_remuneracion: e.fuenteRemuneracion,
        ejercicio: e.ejercicio
      }))
    );
  }

  return jsonResponse({
    meta: {
      registros: rows.length,
      licencia: "CC-BY-4.0",
      aclaracion:
        "Cargos y áreas verificados públicamente. Remuneraciones marcadas como 'estimacion_referencial' hasta publicación oficial.",
      generado: new Date().toISOString()
    },
    empleados: rows
  });
}
