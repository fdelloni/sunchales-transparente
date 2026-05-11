/**
 * DISTRIBUCIÓN POR GÉNERO DEL PERSONAL MUNICIPAL — Sunchales.
 *
 * ESTADO ACTUAL (verificado 2026-05-10):
 *   La Municipalidad NO publica el género del personal en ninguno de los PDFs
 *   oficiales (Nómina del Personal Municipal). El proyecto deliberadamente
 *   NO infiere género a partir del nombre porque:
 *
 *     1. Nombres ambiguos generan errores (Camilo/Camila, René, Daniel/iel,
 *        Cris, nombres de origen extranjero, abreviaturas).
 *     2. Personas trans o no binarias pueden tener nombre que no corresponde
 *        a la identidad de género auto-percibida — inferir desde un padrón
 *        las invisibiliza o las identifica forzosamente.
 *     3. La inferencia algorítmica tiene un margen de error documentado de
 *        5-10 % (Argentina) y presentar ese número como exacto sería
 *        engañoso para la lectura ciudadana.
 *
 *   Por tanto este módulo expone hoy únicamente la ESTRUCTURA que tendría la
 *   estadística cuando se reciba la información: por publicación voluntaria
 *   del municipio o por respuesta a pedido formal de acceso a la información
 *   (Ord. Sunchales 1872/2009).
 *
 *   La categorización de género que el municipio debe respetar:
 *     - Mujer
 *     - Varón
 *     - Identidad de género no binaria (Ley Nacional 26.743 art. 2)
 *     - Sin declarar / sin dato
 *
 *   La Ley de Identidad de Género (26.743) reconoce expresamente identidades
 *   no binarias y obliga al Estado a respetar la auto-percepción.
 */

export type Genero = "mujer" | "varon" | "no_binario" | "sin_dato";

export const etiquetaGenero: Record<Genero, string> = {
  mujer: "Mujeres",
  varon: "Varones",
  no_binario: "Identidad no binaria",
  sin_dato: "Sin declarar / sin dato",
};

/**
 * Distribución de género por sector dentro de una categoría de vinculación.
 */
export type DistribucionSector = {
  /** Sector como figura en el PDF (ej. "OBRAS Y SERV. PÚBLICOS"). */
  seccion: string;
  /** Total de agentes en ese sector (denominador). Tomado de la nómina oficial. */
  totalAgentes: number;
  /** Conteo por género. null = no publicado todavía. */
  conteos: Partial<Record<Genero, number | null>>;
};

export type CategoriaVinculacionGenero =
  | "planta_permanente"
  | "transitorios"
  | "contratados";

export const etiquetaCategoria: Record<CategoriaVinculacionGenero, string> = {
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

/**
 * Datos verificados para abril 2026 — los totales por categoría y por sector
 * SÍ son verificables contra el PDF oficial (los parseamos en este proyecto).
 * Los conteos por género están en null porque el municipio no los publica.
 */
import {
  registrosPlanta,
  registrosTransitorios,
  registrosContratados,
  porSeccion,
} from "./nomina";

function construirCategoria(
  categoria: CategoriaVinculacionGenero,
  registros: typeof registrosPlanta
): DistribucionCategoria {
  const totalAgentes = registros.length;
  const sectores = porSeccion(registros);
  return {
    categoria,
    totalAgentes,
    totalPorGenero: {
      mujer: null,
      varon: null,
      no_binario: null,
      sin_dato: null,
    },
    porSector: sectores.map((s) => ({
      seccion: s.seccion,
      totalAgentes: s.cantidad,
      conteos: {
        mujer: null,
        varon: null,
        no_binario: null,
        sin_dato: null,
      },
    })),
  };
}

export const distribucionPersonalActual: DistribucionCategoria[] = [
  construirCategoria(
    "planta_permanente",
    registrosPlanta.filter((r) => r.modalidad === "Planta Permanente")
  ),
  construirCategoria("transitorios", registrosTransitorios),
  construirCategoria("contratados", registrosContratados),
];

export const fuenteGenero = {
  periodoReferencia: "Abril 2026",
  notaMetodologica:
    "Los totales por categoría y por sector están verificados contra el PDF oficial del municipio. El género de cada agente NO figura en el PDF y deliberadamente no se infiere desde el nombre, porque la inferencia tiene un margen de error documentado y puede invisibilizar identidades trans o no binarias protegidas por la Ley 26.743 de Identidad de Género.",
  fundamentoPublicacion:
    "Ordenanza Sunchales 1872/2009 (acceso a la información pública municipal) · Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres art. 11 inc. 5 (estadísticas con perspectiva de género en organismos públicos) · Ley 26.743 de Identidad de Género · Convención CEDAW (jerarquía constitucional CN art. 75 inc. 22).",
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
