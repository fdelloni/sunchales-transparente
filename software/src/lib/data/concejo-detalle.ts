/**
 * Lectura dinámica del índice de archivos del Concejo (`_indice.json`),
 * con transformaciones para uso en componentes React.
 *
 * Este módulo es la fuente única de verdad para todas las páginas que
 * muestran detalle de los 924 PDFs descargados. NO duplica datos en TS:
 * lee del JSON que la GitHub Action regenera diariamente.
 *
 * Si el JSON no existe (build sin descarga previa), exporta arrays vacíos
 * para que el build no falle.
 */

import indiceJson from "../../../data/concejo/_indice.json";
import type { ConcejoItem } from "./concejo-archivos.generated";

type IndicePdf = {
  urlOriginal: string;
  categoria: string;
  categoriaDescripcion?: string;
  rutaLocal: string;
  nombreArchivo: string;
  textoEnlace: string | null;
  fechaContexto: string | null;
  tamanioBytes: number;
  hashSha256?: string | null;
  textoExtraido?: boolean;
  tamanioTextoBytes?: number;
};

type Indice = {
  actualizado: string | null;
  pdfs: IndicePdf[];
  totalPdfs?: number;
  procesado?: string | null;
  totalConTexto?: number;
};

const indice: Indice = (indiceJson as unknown as Indice) ?? { actualizado: null, pdfs: [] };

/**
 * Limpia un nombre de archivo para mostrar como etiqueta:
 * - Quita prefijo "link.NNNN."  o "digesto.NNNN."
 * - Quita extensión .pdf/.PDF
 * - Reemplaza barras invertidas accidentales (Archivos\Link\)
 */
function nombreLimpio(meta: IndicePdf): string {
  let n = (meta.nombreArchivo ?? "").replace(/\\/g, "_");
  n = n.replace(/^(link|digesto)\.\d+\./i, "");
  n = n.replace(/\.(pdf|PDF)$/, "");
  n = n.replace(/_+/g, " ").trim();
  return n || "(sin nombre)";
}

/**
 * Detecta el año más probable del documento a partir del nombre.
 * Ignora el ID interno "link.NNNN."
 */
function detectarAnio(meta: IndicePdf): number | null {
  const sin = (meta.nombreArchivo ?? "").replace(/^(link|digesto)\.\d+\./i, "");
  const m = sin.match(/(20\d{2}|19\d{2})/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Detecta el mes (1-12) si el nombre lo menciona.
 */
function detectarMes(meta: IndicePdf): number | null {
  const meses = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ];
  const lower = (meta.nombreArchivo ?? "").toLowerCase();
  for (let i = 0; i < meses.length; i++) {
    if (lower.includes(meses[i])) return i + 1;
  }
  return null;
}

function aItem(meta: IndicePdf): ConcejoItem {
  return {
    etiqueta: nombreLimpio(meta),
    fechaPublicacion: meta.fechaContexto,
    url: meta.urlOriginal,
    tamanioBytes: meta.tamanioBytes,
    anio: detectarAnio(meta),
    mes: detectarMes(meta)
  };
}

function porCategoria(cat: string): ConcejoItem[] {
  return indice.pdfs.filter((p) => p.categoria === cat).map(aItem);
}

// ============== EXPORTS POR CATEGORÍA ==============

export const boletinesBimestrales: ConcejoItem[] = porCategoria("boletines-bimestrales");

export const iniciativasCiudadanas: ConcejoItem[] = porCategoria("iniciativas-ciudadanas");

export const normativaAmbiental: ConcejoItem[] = porCategoria("normativa-ambiental");

export const proyectosEnTratamiento: ConcejoItem[] = porCategoria("proyectos-en-tratamiento");

export const proyectosPerdidos: ConcejoItem[] = porCategoria("proyectos-perdidos");

export const ejecucionesPresupuestariasDetalle: ConcejoItem[] = porCategoria("ejecucion-presupuestaria")
  .sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0) || (b.mes ?? 0) - (a.mes ?? 0));

export const movimientosSaldosDetalle: ConcejoItem[] = porCategoria("movimiento-saldos")
  .sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0) || (b.mes ?? 0) - (a.mes ?? 0));

export const programaFortalecimiento: ConcejoItem[] = porCategoria("programa-fortalecimiento");

export const accesoInformacionPublicaDocs: ConcejoItem[] = porCategoria("acceso-informacion-publica");

// ============== AGREGADOS ==============

export const ultimaActualizacion: string | null = indice.actualizado;
export const totalPdfsRegistrados: number = indice.pdfs.length;
export const totalConTextoExtraido: number = indice.totalConTexto ?? 0;

/**
 * Mapa categoría → cantidad
 */
export const conteoCategorias: Record<string, number> = indice.pdfs.reduce<Record<string, number>>(
  (acc, p) => {
    acc[p.categoria] = (acc[p.categoria] ?? 0) + 1;
    return acc;
  },
  {}
);

/**
 * Búsqueda simple full-text sobre etiquetas. Devuelve hasta `limit` items.
 */
export function buscarConcejo(query: string, limit = 50): ConcejoItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = indice.pdfs.map(aItem);
  return all
    .filter((it) => it.etiqueta.toLowerCase().includes(q))
    .slice(0, limit);
}

/**
 * Retorna las etiquetas (categoría → label legible).
 */
export const labelCategoriaConcejo: Record<string, string> = {
  "boletines-bimestrales": "Boletines bimestrales",
  "resumenes-anuales": "Resúmenes anuales",
  "ejecucion-presupuestaria": "Ejecución presupuestaria",
  "movimiento-saldos": "Movimientos de saldos",
  ucm: "Ordenanzas UCM",
  "proyectos-en-tratamiento": "Proyectos en tratamiento",
  "proyectos-perdidos": "Proyectos perdidos",
  "iniciativas-ciudadanas": "Iniciativas ciudadanas",
  "normativa-ambiental": "Normativa ambiental",
  "programa-fortalecimiento": "Programa fortalecimiento",
  "acceso-informacion-publica": "Acceso a la información"
};
