/**
 * Brechas de Transparencia — datos centralizados.
 *
 * Una "brecha" es información de publicación obligatoria que el Estado municipal
 * aún no expone públicamente. Hacer visible la omisión —con su fundamento normativo—
 * es parte del deber estatal de publicidad de los actos de gobierno y refuerza el
 * principio de máxima divulgación.
 *
 * MARCO NORMATIVO REAL aplicable a Sunchales (verificado contra fuentes oficiales):
 *
 *  1. Ordenanza Sunchales N° 1872/2009 (vinculante local) — Acceso a la Información
 *     Pública. Sancionada el 09/03/2009. 10 artículos. Plazo: 10 días hábiles + 5
 *     de prórroga (Art. 7). Sujetos obligados: Municipalidad, entes autárquicos
 *     o descentralizados, Concejo Municipal, Juzgado de Faltas, prestatarias de
 *     servicios públicos con participación municipal. Gratuita, sin patrocinio,
 *     sin necesidad de motivos (Arts. 3 y 6).
 *     PDF: https://concejosunchales.gob.ar/documentos/digesto/O18722009.pdf
 *     Página oficial: https://concejosunchales.gob.ar/acceso-informacion-publica.aspx
 *
 *  2. Decreto Pcial. Santa Fe N° 0692/2009 (supletorio provincial) — plazos
 *     15+5+10 días hábiles. Principios: igualdad, publicidad, celeridad,
 *     informalidad, gratuidad, máxima divulgación.
 *     URL: https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811
 *
 *  3. Fundamento constitucional general — Constitución Nacional Art. 1 (forma
 *     republicana de gobierno → publicidad de los actos de gobierno), Art. 33
 *     (derechos no enumerados), Art. 75 inc. 22 (CADH Art. 13 y DUDH con jerarquía
 *     constitucional).
 *
 *  4. Límite legítimo: Ley Nacional 25.326 (Protección de Datos Personales).
 *
 * NO se cita la Ley 27.275 porque su jurisdicción es el sector público NACIONAL,
 * no rige para municipios — citarla como obligación local sería un error técnico-jurídico.
 *
 * Cada brecha aquí declarada se publica como dato abierto bajo CC-BY-4.0
 * y se sirve por la API REST en /api/v1/brechas (futuro).
 */

export type BrechaModulo =
  | "digesto"
  | "juzgado-faltas"
  | "presupuesto"
  | "personal"
  | "contrataciones"
  | "recaudacion"
  | "concejo"
  | "audiencias-publicas";

export type BrechaCategoria =
  | "actividad_sancionatoria"
  | "recursos_publicos"
  | "trazabilidad_fondos"
  | "marco_normativo"
  | "convenios_publicos"
  | "calidad_institucional"
  | "datos_abiertos"
  | "estructura_organica"
  | "participacion_ciudadana"
  | "actividad_legislativa"
  | "contrataciones"
  | "presupuesto"
  | "boletin_oficial";

export type BrechaEstado =
  | "no_publicado"
  | "publicado_formato_cerrado" // existe pero solo en PDF/HTML, no en formatos abiertos
  | "publicado_parcial" // existe pero le faltan dimensiones clave
  | "pedido_presentado"
  | "pedido_vencido"
  | "respondido_parcial"
  | "subsanado";

export type Brecha = {
  id: string;
  modulo: BrechaModulo;
  titulo: string;
  descripcion: string;
  categoria: BrechaCategoria;
  estado: BrechaEstado;
  fundamento: string;
  fundamentoUrl?: string;
  detectadaEl: string; // ISO date
  ultimoSeguimiento?: string;
  /**
   * Si la información parcial existe, link a donde se publica hoy.
   * Útil para demostrar honestidad: NO se acusa lo que ya está publicado.
   */
  publicacionParcialUrl?: string;
};

const FUND_LOCAL =
  "Ordenanza Sunchales 1872/2009 (acceso a la información pública municipal). Plazo de respuesta 10 días hábiles + 5 de prórroga.";
const FUND_PROV =
  "Decreto Pcial. Santa Fe 0692/2009 (supletorio): principios de máxima divulgación, gratuidad, celeridad, informalidad.";
const FUND_CONST =
  "Constitución Nacional art. 1 (publicidad de los actos de gobierno) · art. 75 inc. 22 (CADH art. 13).";

const URL_OAIP_LOCAL =
  "https://concejosunchales.gob.ar/acceso-informacion-publica.aspx";

export const brechas: Brecha[] = [
  // ===== DIGESTO Y CONCEJO =====
  {
    id: "dig-datos-abiertos",
    modulo: "digesto",
    titulo: "Datos abiertos en formato reutilizable (CSV/JSON)",
    descripcion:
      "El Concejo publica abundante información (boletines, resúmenes, ejecución presupuestaria, normativa, comisiones), pero exclusivamente en PDF y HTML. No existen datasets en formatos abiertos (CSV, JSON, GeoJSON) reutilizables por periodismo de datos, academia y organizaciones civiles.",
    categoria: "datos_abiertos",
    estado: "publicado_formato_cerrado",
    fundamento: `${FUND_LOCAL} · ${FUND_PROV} · ${FUND_CONST}`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/"
  },
  {
    id: "dig-texto-consolidado",
    modulo: "digesto",
    titulo: "Texto consolidado vigente de las normas",
    descripcion:
      "El digesto publica los textos originales de cada ordenanza, pero no el texto consolidado con todas las modificaciones posteriores incorporadas. Para saber qué dice una ordenanza hoy hay que rastrear sucesivas modificaciones por separado, lo que dificulta la accesibilidad efectiva del derecho.",
    categoria: "marco_normativo",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · principio de seguridad jurídica · accesibilidad efectiva (no formal) de las normas (art. 2 Código Civil y Comercial).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03",
    publicacionParcialUrl:
      "https://concejosunchales.gob.ar/Normativa-local.aspx"
  },
  {
    id: "dig-voto-nominal-estructurado",
    modulo: "digesto",
    titulo: "Voto nominal individual estructurado por concejal y proyecto",
    descripcion:
      "No se publica en formato estructurado y consultable el voto individual de cada concejal en cada proyecto. La información puede estar dispersa en actas y diarios de sesiones, pero no hay un dataset agregado que permita al ciudadano ver de un vistazo cómo votó su representante.",
    categoria: "actividad_legislativa",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · principio republicano de responsabilidad de los representantes.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "dig-ddjj-patrimoniales",
    modulo: "digesto",
    titulo: "Declaraciones juradas patrimoniales",
    descripcion:
      "Las declaraciones juradas patrimoniales de concejales y funcionarios alcanzados no están públicamente disponibles en una versión pública (sin datos sensibles) accesible al ciudadano.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · estándares anti-corrupción CICC y MESICIC · Convención Interamericana contra la Corrupción.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "dig-normas-pre-2022",
    modulo: "digesto",
    titulo: "Normas anteriores a 2022 no sincronizadas en el Digesto oficial",
    descripcion:
      'El Concejo Municipal publica un universo total de 5.309 normas en su digesto (concejosunchales.gob.ar/normativa-local.aspx): 465 Declaraciones, 1.039 Minutas, 3.273 Ordenanzas y 532 Resoluciones, con cobertura 1973-2026. El portal del Departamento Ejecutivo (sunchales.miportal.ar/digesto) sólo refleja 964 normas reales del período 2022-2026 (Decretos, Ordenanzas y Resoluciones). El análisis algorítmico del texto detectó 87 relaciones de derogación o modificación entre las 964 indexadas, de las cuales 51 (58%) apuntan a normas anteriores a 2022 que NO están sincronizadas en el sistema oficial del Ejecutivo. Cualquier ciudadano que quiera saber el texto consolidado de una ordenanza histórica vigente debe rastrearla en PDFs sueltos del sitio del Concejo, fuera de un buscador unificado. Es un déficit de accesibilidad efectiva del derecho.',
    categoria: "marco_normativo",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · principio de seguridad jurídica · accesibilidad efectiva (no formal) de las normas (art. 2 CCyCN) · publicidad y máxima divulgación de los actos de gobierno.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-05",
    publicacionParcialUrl: "https://sunchales.miportal.ar/digesto"
  },

  {
    id: "dig-concejo-paginacion-incompleta",
    modulo: "digesto",
    titulo: "Paginación pública del digesto del Concejo expone sólo el 62% del listado declarado",
    descripcion:
      "El sitio del Concejo (concejosunchales.gob.ar/normativa-local.aspx) declara en su contador de fachada un total de 5.309 normas. La paginación pública, sin embargo, sólo expone 3.261 normas únicas accesibles antes de que el botón 'Siguiente' deje de aparecer. Es decir, ~38% del universo declarado no es navegable por el ciudadano. Eso impide auditar derogaciones y modificaciones que puedan apuntar a normas históricas no expuestas. Verificado por sincronización automática del proyecto el 2026-05-10.",
    categoria: "marco_normativo",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · principio de seguridad jurídica · accesibilidad efectiva (no formal) de las normas (art. 2 CCyCN) · publicidad y máxima divulgación de los actos de gobierno.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/normativa-local.aspx"
  },

  // ===== JUZGADO DE FALTAS =====
  // El sitio del Juzgado en sunchales.gob.ar/juzgado-faltas publica solo
  // trámites individuales (comparecencia, certificados de libre multa), no
  // datos agregados sobre actividad sancionatoria, recaudación y destino.
  // El Juzgado de Faltas es sujeto obligado expreso de la Ord. 1872/2009.
  {
    id: "juz-estadisticas-actas",
    modulo: "juzgado-faltas",
    titulo: "Estadísticas agregadas de actas labradas y resueltas",
    descripcion:
      "No se publica la cantidad anual y mensual de actas labradas, resueltas, archivadas o prescriptas, desagregadas por tipo de falta. Son datos agregados que no exponen a ningún ciudadano individual.",
    categoria: "actividad_sancionatoria",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} (Juzgado de Faltas es sujeto obligado expreso) · ${FUND_CONST}`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-recaudacion",
    modulo: "juzgado-faltas",
    titulo: "Recaudación por multas y sanciones",
    descripcion:
      "No se publica el monto recaudado mensual y anual por multas y sanciones aplicadas, ni la tasa de cobrabilidad o los montos pendientes.",
    categoria: "recursos_publicos",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · principio de rendición de cuentas.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-destino-fondos",
    modulo: "juzgado-faltas",
    titulo: "Destino y afectación de los fondos recaudados",
    descripcion:
      "No se publica si la recaudación de multas tiene afectación específica (por ejemplo, seguridad vial) o se imputa a Rentas Generales, ni el rastreo desde el ingreso hasta la ejecución.",
    categoria: "trazabilidad_fondos",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} (forma republicana → rendición de cuentas).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-ordenanza-organica",
    modulo: "juzgado-faltas",
    titulo: "Ordenanza orgánica del Juzgado de Faltas",
    descripcion:
      "La ordenanza que organiza el Juzgado, fija su competencia, designa al juez y establece garantías de imparcialidad no se encuentra fácilmente accesible en buscadores ni en una sección dedicada del sitio del Juzgado.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · publicidad de las normas (art. 2 Código Civil y Comercial).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-regimen-faltas",
    modulo: "juzgado-faltas",
    titulo: "Régimen Municipal de Faltas consolidado",
    descripcion:
      "El catálogo de faltas municipales con tipología, escalas de sanciones, plazos y procedimientos no está consolidado y disponible públicamente en una sección integrada del sitio del Juzgado.",
    categoria: "marco_normativo",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · principio de legalidad sancionatoria (CN art. 18) — no se puede aplicar sanción sin ley previa, accesible y conocida.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-convenio-apsv",
    modulo: "juzgado-faltas",
    titulo: "Convenio con la Agencia Provincial de Seguridad Vial",
    descripcion:
      "No se publica si el Juzgado está habilitado bajo Ley provincial 13.133 ni el texto del convenio que delimita competencias y reparto de fondos.",
    categoria: "convenios_publicos",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · convenios y contratos celebrados por el Estado son información pública por regla.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-calidad-procesal",
    modulo: "juzgado-faltas",
    titulo: "Indicadores de calidad procesal",
    descripcion:
      "Tiempos medios de tramitación, tasa de recursos interpuestos, tasa de revocaciones por la justicia ordinaria. Indicadores de calidad institucional —no de productividad sancionatoria—.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · estándares interamericanos de transparencia activa.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },
  {
    id: "juz-datos-abiertos",
    modulo: "juzgado-faltas",
    titulo: "Datos abiertos del Juzgado",
    descripcion:
      "Dataset agregado y anonimizado en formatos abiertos (CSV/JSON, CC-BY-4.0) reutilizable por periodismo de datos, academia y organizaciones civiles.",
    categoria: "datos_abiertos",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · ${FUND_PROV} (principio de máxima divulgación).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-03"
  },

  // ===== PERSONAL =====
  {
    id: "per-discrepancia-nomina-autoridades",
    modulo: "personal",
    titulo: "Discrepancia entre nómina de remuneraciones y listado oficial de autoridades",
    descripcion:
      "El PDF oficial de remuneraciones de Marzo 2026 lista a 'Botto Juan' percibiendo sueldo bruto de $3.009.416,16 (mismo monto que la Coordinación de Planificación). En el listado oficial de autoridades publicado en sunchales.gob.ar/municipio/autoridades, el cargo de Coordinación de Comunicación figura a nombre de 'Javier Bovo'. La discrepancia entre ambas fuentes oficiales del propio municipio impide al ciudadano saber con certeza quién ocupa el cargo y desde cuándo. Requiere acto administrativo de aclaración.",
    categoria: "estructura_organica",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · principio republicano de publicidad y trazabilidad de quienes perciben remuneración del Estado.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl: "https://sunchales.gob.ar/municipio/autoridades/"
  },

  // ===== AUDIENCIAS PÚBLICAS =====
  {
    id: "aud-hueco-2020-2026",
    modulo: "audiencias-publicas",
    titulo: "Audiencias públicas: hueco de 4 años (2020-2026)",
    descripcion:
      "El sitio oficial sólo documenta dos audiencias públicas: una del 05/09/2019 (proyecto Complejo Ambiental) y otra del 25/10/2022 (caso 'Caglieris c/ Municipalidad' por basural a cielo abierto, ordenada judicialmente). No hay registro de audiencias en 2020, 2021, 2023, 2024, 2025 ni 2026. La sección funciona como archivo histórico, no como mecanismo activo de participación ciudadana.",
    categoria: "participacion_ciudadana",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · principio republicano de participación previa en decisiones que afectan derechos colectivos (urbanismo, ambiente, tarifas, servicios públicos).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/audiencias-publicas/"
  },

  // ===== CONCEJO MUNICIPAL =====
  {
    id: "con-asesores-no-listados",
    modulo: "concejo",
    titulo: "Asesores y contratados del Concejo no individualizados",
    descripcion:
      "El sitio del Concejo (concejosunchales.gob.ar/personal-del-concejo.aspx) lista únicamente a 3 personas: la Secretaria, la Responsable Administrativa y la Responsable de Comunicación. Según el proyecto de presupuesto 2026 trascendido a prensa, el Concejo cuenta con 3 empleadas + 1 contratado + 6 asesores (10 personas). Faltan publicar nombres, cargos, área de asignación y vínculo laboral de 7 personas que perciben remuneración del Estado municipal.",
    categoria: "estructura_organica",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · publicidad de la nómina de quienes perciben remuneración del Estado municipal.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/personal-del-concejo.aspx"
  },
  {
    id: "con-cv-concejales-incompletos",
    modulo: "concejo",
    titulo: "CV públicos de concejales incompletos",
    descripcion:
      "La página de concejales actuales ofrece un botón de descarga de CV; está disponible para 4 de los 6 concejales (Cattaneo, Balduino, Torriri, Astor) y vacío para los otros 2 (Delmastro, Nicolau). Es asimetría sin fundamento normativo claro y debilita la trazabilidad pública de la representación.",
    categoria: "estructura_organica",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · principio republicano de responsabilidad de los representantes.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/concejales-actuales.aspx"
  },
  {
    id: "con-saldos-2023-2026",
    modulo: "concejo",
    titulo: "Movimiento de saldos del Concejo: gap 2023-2026",
    descripcion:
      "El Concejo publica su 'movimiento de saldos' mensual entre 2017 y 2022, con cierres anuales 2020/21/22; no hay publicación posterior. En contraste, el Departamento Ejecutivo publica ejecución mensual hasta febrero de 2026 y el propio Concejo publica su 'ejecución de partida presupuestaria' hasta marzo de 2026. La asimetría dentro del mismo cuerpo institucional no tiene fundamento aparente y hace opaco el manejo financiero del Concejo en los últimos 4 años.",
    categoria: "trazabilidad_fondos",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} (forma republicana → rendición de cuentas).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/movimiento-de-saldos.aspx"
  },

  // ===== CONTRATACIONES =====
  {
    id: "contr-adjudicaciones",
    modulo: "contrataciones",
    titulo: "Adjudicaciones, oferentes y montos finales contratados",
    descripcion:
      "El listado oficial de licitaciones publica pliegos, decretos de llamado y presupuestos oficiales. No publica el resultado del procedimiento: oferentes presentados, ofertas recibidas y montos, decreto de adjudicación, monto final contratado, plazo de ejecución comprometido y, eventualmente, ampliaciones. Sin esa segunda mitad, la trazabilidad termina antes del momento más relevante para el control ciudadano.",
    categoria: "contrataciones",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · principio de competencia y publicidad en contrataciones públicas (Ley provincial de obras públicas y reglamentación local concordante).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },

  // ===== PRESUPUESTO Y BOLETÍN OFICIAL =====
  {
    id: "pre-ord-2026-texto",
    modulo: "presupuesto",
    titulo: "Texto íntegro de la Ordenanza de Presupuesto 2026 con anexo de partidas",
    descripcion:
      "Las cifras macro del Presupuesto 2026 ($30.938 M de gastos, $30.950 M de recursos) circulan por prensa local y discursos institucionales. La sección oficial /presupuesto/ del Departamento Ejecutivo expone ejecuciones mensuales, pero no se ubicó publicada la Ordenanza completa con sus anexos clasificadores (estructura por finalidad, función, jurisdicción, programa y partida) que permitirían al ciudadano leer el plan financiero original aprobado por el Concejo.",
    categoria: "presupuesto",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · publicidad de las normas (art. 2 CCyCN) · principio de legalidad presupuestaria (toda erogación debe estar en una ley/ordenanza pública).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/presupuesto/"
  },
  {
    id: "pre-boletin-oficial-municipal",
    modulo: "presupuesto",
    titulo: "Boletín Oficial Municipal sin canal accesible",
    descripcion:
      "El hub 'Municipio Transparente' lista 'Boletín Oficial' como uno de sus seis ejes, pero al día de hoy no se ubicó una URL accesible que permita consultar y descargar los decretos del Departamento Ejecutivo en forma ordenada (por número, fecha o materia). Los decretos sólo aparecen citados de forma fragmentaria en el listado de licitaciones (ej.: 3537/2025) y en algunos PDFs sueltos. La inexistencia de un Boletín Oficial Municipal navegable es una brecha estructural: el ciudadano no tiene un punto único donde leer la actividad reglamentaria del Ejecutivo.",
    categoria: "boletin_oficial",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · publicidad de los actos administrativos como condición de su vigencia (principio general de derecho administrativo) · ${FUND_CONST}.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-09"
  }
];

export function brechasPorModulo(modulo: BrechaModulo): Brecha[] {
  return brechas.filter((b) => b.modulo === modulo);
}

export function totalBrechasAbiertas(): number {
  return brechas.filter((b) => b.estado !== "subsanado").length;
}

export const labelEstado: Record<BrechaEstado, string> = {
  no_publicado: "No publicado",
  publicado_formato_cerrado: "Publicado solo en PDF (formato cerrado)",
  publicado_parcial: "Publicado parcial",
  pedido_presentado: "Pedido presentado",
  pedido_vencido: "Plazo vencido sin respuesta",
  respondido_parcial: "Respondido parcialmente",
  subsanado: "Subsanado"
};

export const labelCategoria: Record<BrechaCategoria, string> = {
  actividad_sancionatoria: "Actividad sancionatoria",
  recursos_publicos: "Recursos públicos",
  trazabilidad_fondos: "Trazabilidad de fondos",
  marco_normativo: "Marco normativo",
  convenios_publicos: "Convenios públicos",
  calidad_institucional: "Calidad institucional",
  datos_abiertos: "Datos abiertos",
  estructura_organica: "Estructura orgánica",
  participacion_ciudadana: "Participación ciudadana",
  actividad_legislativa: "Actividad legislativa",
  contrataciones: "Contrataciones públicas",
  presupuesto: "Presupuesto y rendición",
  boletin_oficial: "Boletín Oficial Municipal",
};
