/**
 * DISTRIBUCIÓN POR GÉNERO DEL PERSONAL MUNICIPAL — Sunchales.
 *
 * ESTADO ACTUAL (verificado 2026-05-11):
 *   La Municipalidad NO publica el género del personal en ninguno de los PDFs
 *   oficiales. El proyecto deliberadamente NO infiere género a partir del
 *   nombre porque:
 *
 *     1. Nombres ambiguos generan errores (Camilo/Camila, René, Cris, etc.).
 *     2. La inferencia algorítmica tiene un margen de error documentado
 *        del 5-10 % (Argentina) — presentarlo como exacto sería engañoso.
 *
 *   Por tanto este módulo expone hoy únicamente la ESTRUCTURA que tendrá la
 *   estadística cuando se reciba la información: por publicación voluntaria
 *   del municipio o por respuesta a pedido formal bajo la Ord. 1872/2009.
 *
 *   CATEGORÍAS DE PERSONAL incluidas (las 4 — todas son empleados del municipio):
 *     - Planta política (intendente, secretarías, subsecretarías).
 *     - Planta permanente.
 *     - Personal transitorio.
 *     - Contratación de servicios.
 */

import {
  registrosPlanta,
  registrosTransitorios,
  registrosContratados,
  porSeccion,
} from "./nomina";
import { empleados } from "./personal";

export type Genero = "mujer" | "varon";

export const etiquetaGenero: Record<Genero, string> = {
  mujer: "Mujeres",
  varon: "Varones",
};

export type DistribucionSector = {
  /** Sector como figura en el PDF (ej. "OBRAS Y SERV. PÚBLICOS"). */
  seccion: string;
  /** Total de agentes en ese sector (denominador). Tomado de la nómina oficial. */
  totalAgentes: number;
  /** Conteo por género. null = no publicado todavía. */
  conteos: Partial<Record<Genero, number | null>>;
};

export type CategoriaVinculacionGenero =
  | "planta_politica"
  | "planta_permanente"
  | "transitorios"
  | "contratados";

export const etiquetaCategoria: Record<CategoriaVinculacionGenero, string> = {
  planta_politica: "Planta política",
  planta_permanente: "Planta Permanente",
  transitorios: "Personal Transitorio",
  contratados: "Contratación de Servicios",
};

export type DistribucionCategoria = {
  categoria: CategoriaVinculacionGenero;
  /** Total de agentes en esa categoría (denominador). */
  totalAgentes: number;
  /** Distribución agregada por género en toda la categoría. null = no publicado. */
  totalPorGenero: Partial<Record<Genero, number | null>>;
  /** Desglose por sector. */
  porSector: DistribucionSector[];
};

/** Construye la distribución para una categoría no política (usa registros del PDF). */
function construirCategoriaPDF(
  categoria: CategoriaVinculacionGenero,
  registros: typeof registrosPlanta
): DistribucionCategoria {
  const totalAgentes = registros.length;
  const sectores = porSeccion(registros);
  return {
    categoria,
    totalAgentes,
    totalPorGenero: { mujer: null, varon: null },
    porSector: sectores.map((s) => ({
      seccion: s.seccion,
      totalAgentes: s.cantidad,
      conteos: { mujer: null, varon: null },
    })),
  };
}

/**
 * Construye la distribución para la planta política. La planta política se
 * estructura por área (Departamento Ejecutivo, Secretaría de Gestión,
 * Secretaría de Desarrollo, etc.) — no usa secciones de la nómina.
 */
function construirCategoriaPolitica(): DistribucionCategoria {
  const totalAgentes = empleados.length;
  // Agrupamos por área del organigrama
  const porArea = new Map<string, number>();
  for (const e of empleados) {
    porArea.set(e.area, (porArea.get(e.area) ?? 0) + 1);
  }
  const sectores: DistribucionSector[] = Array.from(porArea.entries())
    .map(([seccion, cantidad]) => ({
      seccion,
      totalAgentes: cantidad,
      conteos: { mujer: null, varon: null } as Partial<
        Record<Genero, number | null>
      >,
    }))
    .sort((a, b) => b.totalAgentes - a.totalAgentes);
  return {
    categoria: "planta_politica",
    totalAgentes,
    totalPorGenero: { mujer: null, varon: null },
    porSector: sectores,
  };
}

/**
 * Distribución vigente — totales verificados contra el PDF oficial abril 2026
 * y contra el organigrama público para la planta política. Los conteos por
 * género están en null porque el municipio no los publica.
 */
export const distribucionPersonalActual: DistribucionCategoria[] = [
  construirCategoriaPolitica(),
  construirCategoriaPDF(
    "planta_permanente",
    registrosPlanta.filter((r) => r.modalidad === "Planta Permanente")
  ),
  construirCategoriaPDF("transitorios", registrosTransitorios),
  construirCategoriaPDF("contratados", registrosContratados),
];

export const fuenteGenero = {
  periodoReferencia: "Abril 2026",
  notaMetodologica:
    "Los totales por categoría y por sector están verificados contra el PDF oficial del municipio (planta permanente, transitorios y contratados) y contra el organigrama público (planta política). El género de cada agente NO figura en el PDF y deliberadamente no se infiere desde el nombre.",
  fundamentoPublicacion:
    "Ordenanza Sunchales 1872/2009 (acceso a la información pública municipal) · Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres art. 11 inc. 5 (estadísticas con perspectiva de género en organismos públicos) · Convención CEDAW (jerarquía constitucional CN art. 75 inc. 22).",
} as const;

/** ¿Hay al menos un valor de género publicado? */
export function tieneDatosGenero(): boolean {
  return distribucionPersonalActual.some((c) =>
    Object.values(c.totalPorGenero).some((v) => v != null)
  );
}

/** Suma total del plantel actual (denominador del gráfico agregado). */
export function totalPlantel(): number {
  return distribucionPersonalActual.reduce(
    (acc, c) => acc + c.totalAgentes,
    0
  );
}
