/**
 * LICENCIAS DEL PERSONAL MUNICIPAL — Sunchales.
 *
 * ESTADO ACTUAL (verificado 2026-05-10):
 *   La Municipalidad NO publica un informe periódico ni un dataset estructurado
 *   con la cantidad agregada de agentes con licencia, desagregada por tipo y
 *   por período. Por tanto este módulo expone hoy únicamente la ESTRUCTURA
 *   que tendrá la estadística cuando esté disponible; todos los valores
 *   están en null. La información se cargará cuando ingrese vía publicación
 *   voluntaria del municipio o pedido formal de acceso a la información
 *   (Ord. Sunchales 1872/2009).
 *
 * CRITERIO DE SELECCIÓN DE CATEGORÍAS:
 *   Sólo se incluyen tipos de licencia que son INDICADORES DE GESTIÓN —
 *   permiten detectar situaciones que conviene monitorear (salud
 *   organizacional, accidentes laborales, ausentismo no justificado por
 *   derecho legal, situaciones sin asignación de tareas).
 *
 *   Se EXCLUYEN deliberadamente las licencias que son derechos previstos por
 *   ley y por tanto NO son irregularidades a "controlar":
 *     - Familiares (maternidad / paternidad / cuidado / duelo).
 *     - Particulares CON goce de haberes (vacaciones, examen, casamiento,
 *       trámites previstos en el estatuto).
 *     - Gremiales, por estudio, por mandato público electivo.
 *
 *   El objetivo es transparencia útil al ciudadano, no curiosidad invasiva
 *   sobre la vida privada del personal.
 *
 * RESGUARDO DE PRIVACIDAD — REGLA N MÍNIMO DE 5:
 *   El agregado anónimo es lícito (Ley 25.326 art. 11 permite tratamiento
 *   estadístico con disociación). Sin embargo, en grupos chicos puede haber
 *   REIDENTIFICACIÓN accidental: si publicamos "1 agente con licencia por
 *   salud mental en una subsecretaría de 8 personas", el resto de la
 *   oficina puede deducir de quién se trata.
 *
 *   Por eso aplicamos la regla habitual del INDEC y de agencias estadísticas
 *   internacionales (minimum cell size): cuando una celda tiene menos de 5
 *   casos, se reporta como "<5" en lugar del número exacto. Esto rige sobre
 *   todo para la categoría "salud mental".
 */

export type TipoLicencia =
  /** Por afecciones de salud de corta duración (hasta 30 días, generalmente sin junta médica). */
  | "salud_corta"
  /** Por afecciones de salud de larga duración (>30 días, suele requerir junta médica). */
  | "salud_larga"
  /**
   * Específicamente afecciones de salud mental. Se trata como categoría
   * propia para hacer visible la salud ocupacional, no para estigmatizar.
   * Aplica regla N ≥ 5 anti-reidentificación.
   */
  | "salud_mental"
  /** Por accidente de trabajo o enfermedad profesional (cobertura ART, Ley 24.557). */
  | "accidente_trabajo"
  /** Particular SIN goce de haberes — ausencia voluntaria prolongada sin sueldo. */
  | "particular_sin_goce"
  /** Sin asignación de tareas (sumario abierto, junta médica pendiente, situación irregular). */
  | "sin_asignacion";

export const etiquetaTipo: Record<TipoLicencia, string> = {
  salud_corta: "Salud — corta duración (hasta 30 días)",
  salud_larga: "Salud — larga duración (más de 30 días)",
  salud_mental: "Salud mental",
  accidente_trabajo: "Accidente de trabajo / ART",
  particular_sin_goce: "Particular sin goce de sueldo",
  sin_asignacion: "Sin asignación de tareas",
};

/**
 * "Indicador de qué" — texto corto que explica al ciudadano POR QUÉ esa
 * categoría es relevante (no qué es la licencia en sí). Se muestra debajo del
 * nombre, en gris chico, para que cualquier lector entienda de un vistazo
 * para qué sirve mirar ese número.
 */
export const indicadorDeQue: Record<TipoLicencia, string> = {
  salud_corta:
    "Salud laboral común. Si sube de forma sostenida puede indicar problemas de ambiente o carga de trabajo.",
  salud_larga:
    "Cuántos agentes están temporalmente fuera por motivos serios de salud.",
  salud_mental:
    "Categoría visible y propia, con regla N≥5 para no estigmatizar.",
  accidente_trabajo: "Condiciones de seguridad e higiene.",
  particular_sin_goce:
    "Vínculo activo sin prestación — cuando se prolonga sin razón puede indicar irregularidad.",
  sin_asignacion:
    "Sumarios sin resolver, juntas médicas estancadas. La más sensible para auditar.",
};

export type ConteoLicencia = {
  tipo: TipoLicencia;
  /** Cantidad de agentes con esa licencia en el período. null si no publicado. */
  cantidad: number | null;
  /** True cuando el valor real es < 5 y se reporta enmascarado por anti-reidentificación. */
  enmascarado?: boolean;
};

export type PuntoEvolucionLicencias = {
  /** Período YYYY-MM. */
  periodo: string;
  label: string;
  /** Plantel activo en ese mes (denominador para tasa de ausentismo). */
  plantelActivo: number | null;
  /** Conteos por tipo. Todos null por ahora. */
  conteos: ConteoLicencia[];
  /** URL del informe oficial si llegara a publicarse. */
  urlInforme: string | null;
  /** Anotaciones sobre cobertura, cambios metodológicos, etc. */
  nota?: string;
};

function crearTipos(): ConteoLicencia[] {
  return (
    [
      "salud_corta",
      "salud_larga",
      "salud_mental",
      "accidente_trabajo",
      "particular_sin_goce",
      "sin_asignacion",
    ] as TipoLicencia[]
  ).map((tipo) => ({ tipo, cantidad: null }));
}

export const evolucionLicencias: PuntoEvolucionLicencias[] = [
  {
    periodo: "2026-04",
    label: "Abril 2026",
    plantelActivo: 465, // verificado contra PDF oficial 2026-04
    conteos: crearTipos(),
    urlInforme: null,
    nota: "Plantel activo verificado contra PDF oficial 2026-04. Cantidades de licencias no publicadas por el municipio.",
  },
  {
    periodo: "2025-09",
    label: "Septiembre 2025",
    plantelActivo: 468,
    conteos: crearTipos(),
    urlInforme: null,
    nota: "Plantel activo verificado contra PDF oficial 2025-09. Cantidades de licencias no publicadas por el municipio.",
  },
];

export const fuenteLicencias = {
  paginaPotencial:
    "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/",
  notaMetodologica:
    "Categorías seleccionadas por su valor como indicadores de gestión, no por curiosidad sobre la vida personal del agente. Se aplica regla de N mínimo de 5 (estándar INDEC) para evitar que en grupos chicos alguien pueda deducir quién es la persona detrás del número. La categoría 'salud mental' tiene esta protección reforzada.",
  fundamentoPublicacion:
    "Ordenanza Sunchales 1872/2009 — acceso a la información pública municipal · Ley 25.326 art. 11 — autoriza el tratamiento estadístico con disociación · principio republicano de control del gasto público.",
} as const;

/** ¿Hay al menos un valor real cargado en la serie? */
export function tieneDatosPublicados(): boolean {
  return evolucionLicencias.some((p) =>
    p.conteos.some((c) => c.cantidad !== null)
  );
}

/** Suma de todas las categorías para un período. */
export function totalConLicencia(p: PuntoEvolucionLicencias): number | null {
  if (p.conteos.every((c) => c.cantidad === null)) return null;
  return p.conteos.reduce((acc, c) => acc + (c.cantidad ?? 0), 0);
}
