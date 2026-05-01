/**
 * Recaudación Municipal — Cálculo de Recursos 2026.
 *
 * IMPORTANTE — Honestidad de datos:
 *
 *   - El TOTAL de recursos corrientes es CIFRA OFICIAL VERIFICADA del proyecto
 *     remitido al Honorable Concejo Municipal de Sunchales: $30.950.227.077.
 *   - Los TIPOS de tributos locales son verificables contra la Ordenanza
 *     Tributaria de Sunchales (TGI urbana/rural/suburbana, DReI, Contribución
 *     por Mejoras, Derecho de Ocupación del Dominio Público, Permiso de Uso,
 *     Multas).
 *   - Los IMPORTES por tipo son ESTIMACIONES referenciales con pesos
 *     relativos típicos de municipios santafesinos comparables (≈30% recursos
 *     propios tributarios + ≈62% coparticipación + ≈8% no tributarios).
 *     Se reemplazarán por los importes oficiales cuando el municipio publique
 *     el Cálculo de Recursos detallado.
 */

export type CategoriaRecurso =
  | "tributarios_propios"      // tasas/derechos/contribuciones que cobra el municipio
  | "no_tributarios_propios"   // alquileres, concesiones, multas, intereses
  | "coparticipacion_provincial"
  | "coparticipacion_nacional"
  | "recursos_capital";        // transferencias específicas, financiamiento

export type TipoRecurso = {
  id: string;
  categoria: CategoriaRecurso;
  nombre: string;
  descripcion: string;
  /** Naturaleza jurídica del tributo. Solo aplica para `tributarios_propios`. */
  contraprestacion?: string;
  presupuestado: number;       // ARS
  recaudado?: number;          // ARS — pendiente de carga
  ejercicio: number;
  verificado: boolean;
  fuenteId: string;
};

export const totalesRecaudacion = {
  ejercicio: 2026,
  recursosCorrientesTotal: 30_950_227_077,        // VERIFICADO (proyecto Ordenanza)
  recursosCapitalLey12385: 613_691_020.73,        // VERIFICADO (Ley 12.385 — Programa Obras Menores)
  habitantes: 23_416,                             // VERIFICADO (Censo 2022)
  recursosPerCapita: Math.round(30_950_227_077 / 23_416),
  fuenteRecursos: "presupuesto2026" as const,
  fuenteCapital: "fondoLey12385" as const,
  fuenteHabitantes: "censo2022_sunchales" as const
};

/**
 * Estructura clasificadora del Cálculo de Recursos 2026.
 * Pesos relativos basados en promedios de municipios santafesinos comparables.
 * Los nombres de tributos sí son verificables contra la Ordenanza local.
 */
export const recursos: TipoRecurso[] = [
  // ====================================================================
  // 1. RECURSOS PROPIOS TRIBUTARIOS (TASAS, DERECHOS, CONTRIBUCIONES)
  // ====================================================================
  // Las tasas tienen contraprestación específica (lo que las distingue
  // de los impuestos provinciales/nacionales).
  {
    id: "tgi_urbana",
    categoria: "tributarios_propios",
    nombre: "Tasa General de Inmuebles (TGI) — Urbana",
    descripcion: "Por servicios de alumbrado, barrido, limpieza, recolección de residuos, conservación de calles y arbolado urbano.",
    contraprestacion: "Servicios urbanos (alumbrado, barrido, limpieza, recolección, conservación)",
    presupuestado: 4_642_534_061,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "tgi_rural",
    categoria: "tributarios_propios",
    nombre: "Tasa General de Inmuebles (TGI) — Rural",
    descripcion: "Por servicios prestados a inmuebles rurales (mantenimiento de caminos rurales, drenajes, etc.).",
    contraprestacion: "Mantenimiento de caminos rurales y servicios al sector rural",
    presupuestado: 928_506_812,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "tgi_suburbana",
    categoria: "tributarios_propios",
    nombre: "Tasa General de Inmuebles — Suburbana",
    descripcion: "Para inmuebles ubicados en zonas de transición urbano-rural.",
    contraprestacion: "Servicios mixtos urbano-rurales",
    presupuestado: 464_253_406,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "drei",
    categoria: "tributarios_propios",
    nombre: "Derecho de Registro e Inspección (DReI)",
    descripcion: "Tributo a comercios, industrias y prestadores de servicios por la inspección y registro de su actividad económica en el ejido municipal.",
    contraprestacion: "Inspección municipal de actividades económicas y mantenimiento del registro de contribuyentes",
    presupuestado: 2_321_267_031,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "contribucion_mejoras",
    categoria: "tributarios_propios",
    nombre: "Contribución por Mejoras",
    descripcion: "Contribución de los frentistas beneficiados por obras de pavimento, cordón cuneta, agua, cloacas u otras obras de infraestructura.",
    contraprestacion: "Obras de mejora directa al inmueble del contribuyente",
    presupuestado: 464_253_406,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "ocupacion_dominio_publico",
    categoria: "tributarios_propios",
    nombre: "Derecho de Ocupación del Dominio Público",
    descripcion: "Por el uso del espacio público (mesas y sillas en veredas, postes, ductos subterráneos, antenas, etc.).",
    contraprestacion: "Uso del dominio público municipal",
    presupuestado: 278_552_044,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "permiso_uso",
    categoria: "tributarios_propios",
    nombre: "Permiso de Uso",
    descripcion: "Habilitaciones de comercios, eventos, espectáculos y permisos especiales.",
    contraprestacion: "Tramitación y otorgamiento del permiso o habilitación",
    presupuestado: 92_850_681,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "derechos_construccion",
    categoria: "tributarios_propios",
    nombre: "Derechos de Construcción y Edificación",
    descripcion: "Aranceles por aprobación de planos, permisos de obra y final de obra.",
    contraprestacion: "Revisión técnica e inspección de obras particulares",
    presupuestado: 185_701_362,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "derechos_cementerio",
    categoria: "tributarios_propios",
    nombre: "Derechos de Cementerio",
    descripcion: "Concesiones, renovaciones, traslados y servicios en el cementerio municipal.",
    contraprestacion: "Servicios y mantenimiento del cementerio",
    presupuestado: 92_850_681,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },

  // ====================================================================
  // 2. RECURSOS PROPIOS NO TRIBUTARIOS
  // ====================================================================
  {
    id: "multas_recargos",
    categoria: "no_tributarios_propios",
    nombre: "Multas y recargos",
    descripcion: "Multas de tránsito, infracciones a ordenanzas municipales, recargos por mora.",
    presupuestado: 309_502_271,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "ordenanzaTributaria"
  },
  {
    id: "alquileres_concesiones",
    categoria: "no_tributarios_propios",
    nombre: "Alquileres y concesiones",
    descripcion: "Alquileres de bienes municipales, concesiones de servicios (terminal de ómnibus, espacios deportivos, kioscos en plazas).",
    presupuestado: 619_004_542,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },
  {
    id: "intereses_financieros",
    categoria: "no_tributarios_propios",
    nombre: "Intereses financieros",
    descripcion: "Rentabilidad de fondos municipales colocados en plazos fijos y rendimientos similares.",
    presupuestado: 309_502_271,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },
  {
    id: "venta_servicios",
    categoria: "no_tributarios_propios",
    nombre: "Venta de servicios y bienes",
    descripcion: "Servicios prestados a vecinos (publicaciones oficiales, certificados, copias, productos del vivero municipal).",
    presupuestado: 154_751_135,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ====================================================================
  // 3. COPARTICIPACIÓN PROVINCIAL
  // ====================================================================
  {
    id: "copart_provincial",
    categoria: "coparticipacion_provincial",
    nombre: "Coparticipación Provincial Santa Fe",
    descripcion: "Recursos provinciales coparticipados a municipios y comunas según la ley provincial vigente. Incluye porcentaje sobre Ingresos Brutos, Impuesto Inmobiliario y otros tributos provinciales.",
    presupuestado: 14_520_970_022,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },
  {
    id: "fondo_obras_menores",
    categoria: "coparticipacion_provincial",
    nombre: "Fondo de Obras Menores (Ley 12.385)",
    descripcion: "Aporte específico para obras y equipamiento. Para Sunchales 2026 se confirmó un monto de $613.691.020,73 sobre un total departamental de $7.563.065.345 al Departamento Castellanos.",
    presupuestado: 613_691_020,
    ejercicio: 2026,
    verificado: true,
    fuenteId: "fondoLey12385"
  },

  // ====================================================================
  // 4. COPARTICIPACIÓN NACIONAL (vía Provincia)
  // ====================================================================
  {
    id: "copart_nacional",
    categoria: "coparticipacion_nacional",
    nombre: "Coparticipación Federal de Impuestos",
    descripcion: "Recursos coparticipados de Nación a Provincia y de Provincia a Municipios, conforme la Ley 23.548 y normativa complementaria.",
    presupuestado: 4_023_529_521,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ====================================================================
  // 5. RECURSOS DE CAPITAL Y FINANCIAMIENTO
  // ====================================================================
  {
    id: "transferencias_capital",
    categoria: "recursos_capital",
    nombre: "Transferencias de capital específicas",
    descripcion: "Aportes para obras puntuales (BID, CAF, Nación, Provincia) cuando estén comprometidos.",
    presupuestado: 928_506_812,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },
  {
    id: "uso_credito",
    categoria: "recursos_capital",
    nombre: "Uso del crédito",
    descripcion: "Endeudamiento autorizado por ordenanza, líneas de crédito específicas para obra pública.",
    presupuestado: 309_502_271,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ====================================================================
  // 6. OTROS
  // ====================================================================
  {
    id: "otros_recursos",
    categoria: "no_tributarios_propios",
    nombre: "Otros recursos",
    descripcion: "Recursos varios no clasificados específicamente en las categorías anteriores.",
    presupuestado: 928_506_811,
    ejercicio: 2026,
    verificado: false,
    fuenteId: "presupuesto2026"
  }
];

/**
 * Etiquetas legibles para los códigos.
 */
export const labelsCategoria: Record<CategoriaRecurso, string> = {
  tributarios_propios: "Tributos locales (recursos propios)",
  no_tributarios_propios: "Recursos no tributarios propios",
  coparticipacion_provincial: "Coparticipación Provincial",
  coparticipacion_nacional: "Coparticipación Federal",
  recursos_capital: "Recursos de capital y financiamiento"
};

/** Resumen agregado por categoría. */
export function agregadosPorCategoria() {
  const map = new Map<CategoriaRecurso, { categoria: CategoriaRecurso; total: number; cantidad: number }>();
  for (const r of recursos) {
    const m = map.get(r.categoria) ?? { categoria: r.categoria, total: 0, cantidad: 0 };
    m.total += r.presupuestado;
    m.cantidad += 1;
    map.set(r.categoria, m);
  }
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

/**
 * Indicador clave: % de autonomía fiscal del municipio.
 * Mide qué porcentaje de los recursos corrientes provienen de tributos
 * que el propio municipio recauda (sin depender de coparticipación).
 */
export function autonomiaFiscal() {
  const propios = recursos
    .filter((r) => r.categoria === "tributarios_propios" || r.categoria === "no_tributarios_propios")
    .reduce((acc, r) => acc + r.presupuestado, 0);
  const corrientes = recursos
    .filter((r) => r.categoria !== "recursos_capital")
    .reduce((acc, r) => acc + r.presupuestado, 0);
  return {
    recursosPropios: propios,
    recursosCorrientes: corrientes,
    porcentajeAutonomia: corrientes === 0 ? 0 : (propios / corrientes) * 100
  };
}

/**
 * Indicador clave: % de dependencia de coparticipación.
 * Lo opuesto a autonomía fiscal.
 */
export function dependenciaCoparticipacion() {
  const copart = recursos
    .filter(
      (r) =>
        r.categoria === "coparticipacion_provincial" ||
        r.categoria === "coparticipacion_nacional"
    )
    .reduce((acc, r) => acc + r.presupuestado, 0);
  const corrientes = recursos
    .filter((r) => r.categoria !== "recursos_capital")
    .reduce((acc, r) => acc + r.presupuestado, 0);
  return {
    coparticipacion: copart,
    porcentaje: corrientes === 0 ? 0 : (copart / corrientes) * 100
  };
}

/** Sanity check: la suma de corrientes debe igualar el total verificado. */
export function checkTotalRecursos(): { suma: number; total: number; ok: boolean } {
  const suma = recursos
    .filter((r) => r.categoria !== "recursos_capital")
    .reduce((acc, r) => acc + r.presupuestado, 0);
  const ok = Math.abs(suma - totalesRecaudacion.recursosCorrientesTotal) /
    totalesRecaudacion.recursosCorrientesTotal < 0.01;
  return { suma, total: totalesRecaudacion.recursosCorrientesTotal, ok };
}
