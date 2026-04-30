import { datasets } from "@/lib/data/datasets";
import { sources } from "@/lib/data/sources";
import { jsonResponse } from "@/lib/csv";

/**
 * GET /api/v1/datasets
 * Catálogo del Portal de Datos Abiertos + fuentes citadas.
 */
export async function GET() {
  return jsonResponse({
    meta: {
      total_datasets: datasets.length,
      licencia: "CC-BY-4.0",
      contacto: "datos@sunchalestransparente.org",
      generado: new Date().toISOString()
    },
    datasets,
    fuentes: Object.values(sources)
  });
}
