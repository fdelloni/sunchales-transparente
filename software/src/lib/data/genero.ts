/**
 * DISTRIBUCIÓN POR GÉNERO DEL PERSONAL MUNICIPAL — Sunchales.
 *
 * MÉTODO (verificado 2026-05-11):
 *
 *   El género NO figura en el PDF oficial de la nómina. Como el dato es
 *   relevante para evaluar paridad y segregación por sector (Ley 26.485
 *   art. 11 inc. 5; CEDAW), aplicamos inferencia desde el NOMBRE DE PILA
 *   con un diccionario de nombres argentinos comunes + heurística por
 *   terminación.
 *
 *   - Sobre 463 agentes activos (8 planta política + 260 planta
 *     permanente + 93 transitorios + 102 contratados), 462 se resolvieron
 *     automáticamente y 1 caso ambiguo ("RENE OLIVIO") se resolvió
 *     manualmente por el segundo nombre.
 *
 *   - La inferencia desde nombre tiene un margen de error documentado
 *     (~1-3 % en nombres claramente argentinos, mayor con apodos o nombres
 *     extranjeros). NO es dato oficial: es la mejor aproximación
 *     ciudadana hasta que la Municipalidad publique el dato real.
 *
 *   - Cualquier persona que se sienta mal representada por la inferencia
 *     puede solicitar corrección.
 *
 * Categorías incluidas (todas son empleados del municipio):
 *   1. Planta política (intendente + secretarios + subsecretarios).
 *   2. Planta permanente (modalidad "Planta Permanente" del PDF).
 *   3. Personal transitorio.
 *   4. Contratación de servicios.
 *
 * Excluimos los 10 agentes en "Retiro Especial" porque no prestan servicio
 * activo (cobran haber especial post-retiro).
 */

import { porSeccion, registrosPlanta, registrosTransitorios, registrosContratados } from "./nomina";
import { empleados } from "./personal";

export type Genero = "mujer" | "varon";

export const etiquetaGenero: Record<Genero, string> = {
  mujer: "Mujeres",
  varon: "Varones",
};

export type DistribucionSector = {
  seccion: string;
  totalAgentes: number;
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
  totalAgentes: number;
  totalPorGenero: Partial<Record<Genero, number | null>>;
  porSector: DistribucionSector[];
};

// =====================================================================
// CONTEOS INFERIDOS DESDE NOMBRE (abril 2026)
// =====================================================================

const CONTEOS: Record<
  CategoriaVinculacionGenero,
  Record<string, { mujer: number; varon: number }>
> = {
  planta_politica: {
    "Departamento Ejecutivo": { mujer: 0, varon: 1 },
    "Secretaría de Gestión": { mujer: 3, varon: 1 },
    "Secretaría de Desarrollo": { mujer: 2, varon: 1 },
  },
  planta_permanente: {
    "OBRAS Y SERV. PÚBLICOS": { mujer: 8, varon: 85 },
    "HACIENDA Y FINANZAS": { mujer: 12, varon: 4 },
    "GOBIERNO": { mujer: 29, varon: 2 },
    "ECON. SOCIAL Y SOLID.": { mujer: 6, varon: 5 },
    "SEGURIDAD CIUD. Y CONV.": { mujer: 17, varon: 15 },
    "CULTURA Y EDUCACIÓN": { mujer: 32, varon: 3 },
    "AMBIENTE Y ACCIÓN CLIM.": { mujer: 5, varon: 14 },
    "PROMOCIÓN DE DERECHOS": { mujer: 12, varon: 3 },
    "DESARROLLO ECON. Y PROD.": { mujer: 5, varon: 3 },
  },
  transitorios: {
    "OBRAS Y SERV. PÚBLICOS": { mujer: 10, varon: 33 },
    "GOBIERNO": { mujer: 10, varon: 2 },
    "CULTURA Y EDUCACIÓN": { mujer: 9, varon: 0 },
    "SEGURIDAD CIUD. Y CONV.": { mujer: 4, varon: 3 },
    "HACIENDA Y FINANZAS": { mujer: 2, varon: 4 },
    "PROMOCIÓN DE DERECHOS": { mujer: 6, varon: 0 },
    "ECON. SOCIAL Y SOLID.": { mujer: 2, varon: 2 },
    "AMBIENTE Y ACCIÓN CLIM.": { mujer: 1, varon: 2 },
    "DESARROLLO ECON. Y PROD.": { mujer: 1, varon: 0 },
    "PRODUCCION Y EMPLEO": { mujer: 2, varon: 0 },
  },
  contratados: {
    "PRODUCCIÓN Y FINANZAS": { mujer: 6, varon: 5 },
    "DES. HUMANO Y PROM. DE DER.": { mujer: 49, varon: 20 },
    "GOBIERNO": { mujer: 6, varon: 5 },
    "GEST AMBIENTAL Y TERR.": { mujer: 5, varon: 6 },
  },
};

// =====================================================================
// CONSTRUCCIÓN DE LA DISTRIBUCIÓN
// =====================================================================

function construirCategoriaPDF(
  categoria: CategoriaVinculacionGenero,
  registros: typeof registrosPlanta
): DistribucionCategoria {
  const sectores = porSeccion(registros);
  const conteosCat = CONTEOS[categoria];
  let totM = 0,
    totV = 0;
  const porSectorList: DistribucionSector[] = sectores.map((s) => {
    const c = conteosCat[s.seccion];
    if (c) {
      totM += c.mujer;
      totV += c.varon;
    }
    return {
      seccion: s.seccion,
      totalAgentes: s.cantidad,
      conteos: c
        ? { mujer: c.mujer, varon: c.varon }
        : { mujer: null, varon: null },
    };
  });
  return {
    categoria,
    totalAgentes: registros.length,
    totalPorGenero: { mujer: totM, varon: totV },
    porSector: porSectorList,
  };
}

function construirCategoriaPolitica(): DistribucionCategoria {
  // Agrupar la planta política por área del organigrama
  const porArea = new Map<string, number>();
  for (const e of empleados) {
    porArea.set(e.area, (porArea.get(e.area) ?? 0) + 1);
  }
  const conteosCat = CONTEOS.planta_politica;
  let totM = 0,
    totV = 0;
  const porSectorList: DistribucionSector[] = Array.from(porArea.entries())
    .map(([seccion, cantidad]) => {
      const c = conteosCat[seccion];
      if (c) {
        totM += c.mujer;
        totV += c.varon;
      }
      return {
        seccion,
        totalAgentes: cantidad,
        conteos: c
          ? { mujer: c.mujer, varon: c.varon }
          : { mujer: null, varon: null },
      };
    })
    .sort((a, b) => b.totalAgentes - a.totalAgentes);
  return {
    categoria: "planta_politica",
    totalAgentes: empleados.length,
    totalPorGenero: { mujer: totM, varon: totV },
    porSector: porSectorList,
  };
}

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
  metodo: "inferencia_desde_nombre",
  notaMetodologica:
    "El género NO figura en los PDFs oficiales del municipio. Esta sección lo infiere a partir del nombre de pila con un diccionario de nombres argentinos y heurística por terminación. Sobre 463 agentes activos, 462 se resolvieron automáticamente y 1 caso ambiguo fue revisado manualmente. El margen de error esperado es del 1-3 % en nombres claramente argentinos. NO es dato oficial: es la mejor aproximación ciudadana hasta que la Municipalidad publique el dato real.",
  fundamentoPublicacion:
    "Ordenanza Sunchales 1872/2009 (acceso a la información pública municipal) · Ley 26.485 art. 11 inc. 5 (estadísticas con perspectiva de género en organismos públicos) · CEDAW (jerarquía constitucional, CN art. 75 inc. 22).",
} as const;

/** ¿Hay al menos un valor de género publicado? */
export function tieneDatosGenero(): boolean {
  return distribucionPersonalActual.some((c) =>
    Object.values(c.totalPorGenero).some((v) => v != null && v > 0)
  );
}

/** Suma total del plantel actual (denominador del gráfico agregado). */
export function totalPlantel(): number {
  return distribucionPersonalActual.reduce(
    (acc, c) => acc + c.totalAgentes,
    0
  );
}
