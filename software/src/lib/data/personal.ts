/**
 * Padrón de Personal — Estructura jerárquica de la Municipalidad de Sunchales.
 *
 * IMPORTANTE — Honestidad de datos:
 *
 *   - Cargos, nombres y áreas: VERIFICADOS verbatim contra
 *     https://sunchales.gob.ar/municipio/autoridades/ (verificación 2026-05-09).
 *
 *   - Remuneraciones brutas: cuando el apellido + primer nombre coincide con
 *     una fila del PDF oficial de Marzo 2026 (último período parseable),
 *     el monto se carga como `verificado_oficial`. Cuando no, se deja como
 *     `pendiente_oficial`. NO se usan estimaciones.
 *
 *   - Fechas de inicio: mayoritariamente `pendiente_oficial` porque los
 *     decretos de designación no están publicados online (brecha declarada
 *     en /brechas).
 *
 *   - El parseo del PDF de Marzo 2026 capturó "Botto Juan" en lo que sería
 *     la Coordinación de Comunicación. La lista oficial de autoridades dice
 *     "Javier Bovo" en ese cargo. La discrepancia se declara como brecha
 *     (id "per-discrepancia-nomina-autoridades") y NO se concilia
 *     automáticamente.
 */

export type EmpleadoMunicipal = {
  id: string;
  apellidoNombre: string;
  cargo: string;
  area: string;
  jerarquia: 1 | 2 | 3 | 4; // 1: Intendente, 2: Secretaría, 3: Subsecretaría, 4: Dirección/Coordinación
  /** Reporta a (id de otro empleado). Null para el Intendente. Habilita el organigrama. */
  reportaA: string | null;
  /** Fecha de asunción del cargo (ISO). Null cuando no fue oficialmente publicada. */
  fechaInicio: string | null;
  /** Trazabilidad de la fecha de inicio. */
  fuenteFecha: "verificado_publico" | "pendiente_oficial";
  remuneracionBruta: number | null; // ARS mensual; null si pendiente de informar
  fuenteCargo: "verificado_publico" | "pendiente_oficial";
  fuenteRemuneracion: "estimacion_referencial" | "verificado_oficial" | "pendiente_oficial";
  /** Período del PDF oficial del cual se tomó la remuneración. Solo si verificado_oficial. */
  periodoRemuneracion?: string;
  /** URL del PDF oficial fuente de la remuneración. Solo si verificado_oficial. */
  urlPdfRemuneracion?: string;
  ejercicio: number;
};

// URL del PDF de Marzo 2026 utilizado como fuente de remuneraciones verificadas
const URL_PDF_MAR_2026 =
  "https://sunchales.gob.ar/wp-content/uploads/2026/04/MARZO-2026.pdf";
const PERIODO_VERIFICADO = "2026-03";
const FUENTE_AUTORIDADES = "verificado_publico" as const;

/**
 * Padrón actual (gestión Pinotti) — 18 cargos del Departamento Ejecutivo.
 * Las remuneraciones marcadas verificado_oficial provienen del PDF oficial
 * del período Marzo 2026 publicado por el municipio.
 */
export const empleados: EmpleadoMunicipal[] = [
  // ===== Departamento Ejecutivo =====
  {
    id: "emp_001",
    apellidoNombre: "Pinotti, Pablo",
    cargo: "Intendente Municipal",
    area: "Departamento Ejecutivo",
    jerarquia: 1,
    reportaA: null,
    fechaInicio: "2023-12-10",
    fuenteFecha: "verificado_publico",
    remuneracionBruta: 6_018_832.34,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },

  // ===== Subsecretarías y áreas que reportan directo al Intendente =====
  {
    id: "emp_garcia",
    apellidoNombre: "García, Daniel",
    cargo: "Subsecretario de Hacienda y Finanzas",
    area: "Subsecretaría de Hacienda y Finanzas",
    jerarquia: 3,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_544_869.67,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_bongiovanni",
    apellidoNombre: "Bongiovanni, Fabián",
    cargo: "Subsecretario a cargo de la Agencia Municipal de Seguridad",
    area: "Agencia Municipal de Seguridad",
    jerarquia: 3,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },

  // ===== Secretaría de Gobierno =====
  {
    id: "emp_ochat",
    apellidoNombre: "Ochat, Andrea",
    cargo: "Secretaria de Gobierno",
    area: "Secretaría de Gobierno",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 4_815_065.88,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_chamorro",
    apellidoNombre: "Chamorro, Fernando",
    cargo: "Subsecretario de Gestión y Desarrollo",
    area: "Secretaría de Gobierno",
    jerarquia: 3,
    reportaA: "emp_ochat",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_marti",
    apellidoNombre: "Marti, Juan Cruz",
    cargo: "Coordinador de Planificación, Monitoreo y Evaluación",
    area: "Secretaría de Gobierno",
    jerarquia: 4,
    reportaA: "emp_ochat",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_009_416.16,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_bovo",
    apellidoNombre: "Bovo, Javier",
    cargo: "Coordinador de Comunicación",
    area: "Secretaría de Gobierno",
    jerarquia: 4,
    reportaA: "emp_ochat",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: null,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "pendiente_oficial",
    ejercicio: 2026
  },
  {
    id: "emp_sanchez",
    apellidoNombre: "Sánchez, Lucía",
    cargo: "Directora de Función Pública",
    area: "Secretaría de Gobierno",
    jerarquia: 4,
    reportaA: "emp_ochat",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: null,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "pendiente_oficial",
    ejercicio: 2026
  },

  // ===== Secretaría de Producción y Empleo =====
  {
    id: "emp_gamero",
    apellidoNombre: "Gamero, María Eugenia",
    cargo: "Secretaria de Producción y Empleo",
    area: "Secretaría de Producción y Empleo",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 4_815_065.88,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_cabalaro",
    apellidoNombre: "Cabalaro, Luciano",
    cargo: "Subsecretario de Desarrollo Productivo",
    area: "Secretaría de Producción y Empleo",
    jerarquia: 3,
    reportaA: "emp_gamero",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_ortiz",
    apellidoNombre: "Ortiz, Vanesa",
    cargo: "Subsecretaria de Economía Social y Solidaria",
    area: "Secretaría de Producción y Empleo",
    jerarquia: 3,
    reportaA: "emp_gamero",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },

  // ===== Secretaría de Gestión Ambiental y Territorial =====
  {
    id: "emp_zamateo",
    apellidoNombre: "Zamateo, Luis",
    cargo: "Secretario de Gestión Ambiental y Territorial",
    area: "Secretaría de Gestión Ambiental y Territorial",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 4_769_989.15,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_lattanzi",
    apellidoNombre: "Lattanzi, José",
    cargo: "Subsecretario de Obras y Servicios Públicos",
    area: "Secretaría de Gestión Ambiental y Territorial",
    jerarquia: 3,
    reportaA: "emp_zamateo",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_sinner",
    apellidoNombre: "Sinner, Luciana",
    cargo: "Subsecretaria de Ambiente y Acción Climática",
    area: "Secretaría de Gestión Ambiental y Territorial",
    jerarquia: 3,
    reportaA: "emp_zamateo",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    // Pueyo aparece referenciado como responsable de la Oficina de Catastro en
    // el listado oficial de trámites municipales (sunchales.gob.ar/gestion/
    // sunchales-impulsa/tramites/) — categorizado como "pendiente_oficial"
    // porque no figura individualizado en el listado oficial de autoridades
    // (/municipio/autoridades/) ni en el PDF de remuneraciones Marzo 2026.
    // Su cargo se reporta como dependiente de la Subdirección de Obras
    // Privadas, jerárquicamente bajo la Secretaría de Gestión Ambiental y
    // Territorial. La discrepancia de no estar individualizado en autoridades
    // es la brecha cat-pagina-institucional declarada en /brechas.
    id: "emp_pueyo",
    apellidoNombre: "Pueyo, Pablo",
    cargo: "Encargado de la Oficina de Catastro (Subdirección de Obras Privadas)",
    area: "Secretaría de Gestión Ambiental y Territorial",
    jerarquia: 4,
    reportaA: "emp_zamateo",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: null,
    fuenteCargo: "pendiente_oficial",
    fuenteRemuneracion: "pendiente_oficial",
    ejercicio: 2026
  },

  // ===== Secretaría de Desarrollo Humano y Promoción de Derechos =====
  {
    id: "emp_bernini",
    apellidoNombre: "Bernini, Daniel",
    cargo: "Secretario de Desarrollo Humano y Promoción de Derechos",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 4_815_065.88,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_galli",
    apellidoNombre: "Galli, José",
    cargo: "Subsecretario de Cultura y Educación",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 3,
    reportaA: "emp_bernini",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_riera",
    apellidoNombre: "Riera, Elisa",
    cargo: "Subsecretaria de Promoción de Derechos",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 3,
    reportaA: "emp_bernini",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_611_299.40,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_gorosito",
    apellidoNombre: "Gorosito, María de los Ángeles",
    cargo: "Directora de Educación",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 4,
    reportaA: "emp_bernini",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_243_881.12,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_kemmerer",
    apellidoNombre: "Kemmerer, Pablo",
    cargo: "Director de Cultura",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 4,
    reportaA: "emp_bernini",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_708_474.56,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  },
  {
    id: "emp_moyano",
    apellidoNombre: "Moyano, Daniela",
    cargo: "Directora de Salud",
    area: "Secretaría de Desarrollo Humano y Promoción de Derechos",
    jerarquia: 4,
    reportaA: "emp_bernini",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_047_033.88,
    fuenteCargo: FUENTE_AUTORIDADES,
    fuenteRemuneracion: "verificado_oficial",
    periodoRemuneracion: PERIODO_VERIFICADO,
    urlPdfRemuneracion: URL_PDF_MAR_2026,
    ejercicio: 2026
  }
];

/**
 * Construye el árbol jerárquico (organigrama) a partir de la lista plana
 * usando el campo `reportaA`. Útil para renderizar visualmente.
 */
export type NodoOrganigrama = EmpleadoMunicipal & { hijos: NodoOrganigrama[] };

export function construirOrganigrama(): NodoOrganigrama[] {
  const mapa = new Map<string, NodoOrganigrama>();
  for (const e of empleados) mapa.set(e.id, { ...e, hijos: [] });

  const raices: NodoOrganigrama[] = [];
  for (const nodo of mapa.values()) {
    if (nodo.reportaA == null) {
      raices.push(nodo);
    } else {
      const padre = mapa.get(nodo.reportaA);
      if (padre) padre.hijos.push(nodo);
      else raices.push(nodo); // huérfano: lo subimos a raíz para no perderlo
    }
  }
  // Ordenamos hijos por jerarquía y luego por apellido
  const ordenar = (nodos: NodoOrganigrama[]) => {
    nodos.sort((a, b) => a.jerarquia - b.jerarquia || a.apellidoNombre.localeCompare(b.apellidoNombre, "es"));
    nodos.forEach((n) => ordenar(n.hijos));
  };
  ordenar(raices);
  return raices;
}

/**
 * Estadísticas agregadas (sin exponer datos individuales sensibles).
 * Estas las construimos de la propia colección y son útiles para KPI cards.
 */
export function aggregadosPorArea() {
  const map = new Map<string, { area: string; cantidad: number; masaSalarial: number }>();
  for (const e of empleados) {
    const m = map.get(e.area) ?? { area: e.area, cantidad: 0, masaSalarial: 0 };
    m.cantidad += 1;
    m.masaSalarial += e.remuneracionBruta ?? 0;
    map.set(e.area, m);
  }
  return Array.from(map.values()).sort((a, b) => b.masaSalarial - a.masaSalarial);
}
