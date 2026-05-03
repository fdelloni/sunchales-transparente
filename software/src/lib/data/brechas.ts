/**
 * Brechas de Transparencia — datos centralizados.
 *
 * Una "brecha" es información de publicación obligatoria que el Estado municipal
 * aún no expone públicamente. Hacer visible la omisión —con su fundamento normativo—
 * es parte del deber estatal de publicidad de los actos de gobierno y refuerza el
 * principio de máxima divulgación (Ley 27.275, CADH art. 13, CN arts. 1, 14 y 75
 * inc. 22; Constitución de Santa Fe reforma 2025; Ley Orgánica de Municipios
 * N° 14.436). NO expone datos personales de ciudadanos privados.
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
  | "recaudacion";

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
  | "actividad_legislativa";

export type BrechaEstado =
  | "no_publicado"
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
};

export const brechas: Brecha[] = [
  // ===== DIGESTO Y CONCEJO =====
  {
    id: "dig-votaciones-nominales",
    modulo: "digesto",
    titulo: "Votaciones nominales del Concejo",
    descripcion:
      "No se publica en formato estructurado el voto individual de cada concejal en cada proyecto. El ciudadano no puede saber con facilidad cómo votó su representante.",
    categoria: "actividad_legislativa",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. h (informes, dictámenes y todo tipo de actos administrativos) · principio republicano de responsabilidad de los representantes (CN art. 1).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-asistencia-concejales",
    modulo: "digesto",
    titulo: "Asistencia de concejales",
    descripcion:
      "No se publica un registro estructurado de asistencias y ausencias de cada concejal a sesiones y comisiones, ni la justificación de las ausencias.",
    categoria: "actividad_legislativa",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · principio constitucional de responsabilidad de los funcionarios públicos.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-ddjj-patrimoniales",
    modulo: "digesto",
    titulo: "Declaraciones juradas patrimoniales",
    descripcion:
      "Las declaraciones juradas patrimoniales de concejales y funcionarios alcanzados no están públicamente disponibles en su versión pública (sin datos sensibles).",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. p · estándares anti-corrupción CICC y MESICIC.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-orden-del-dia",
    modulo: "digesto",
    titulo: "Orden del día anticipado",
    descripcion:
      "No se publica con anticipación suficiente y de forma sistemática el orden del día de cada sesión con los proyectos que se tratarán y sus textos. Limita la posibilidad real de control ciudadano.",
    categoria: "participacion_ciudadana",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · derecho de participación ciudadana derivado del art. 1 CN (forma representativa y republicana).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-version-taquigrafica",
    modulo: "digesto",
    titulo: "Versiones taquigráficas o transcripciones de sesiones",
    descripcion:
      "Las actas no contienen el debate completo y verbatim. No hay versión taquigráfica ni transcripción accesible para que el ciudadano siga los argumentos esgrimidos en la deliberación.",
    categoria: "actividad_legislativa",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · principio republicano de publicidad del debate legislativo.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-texto-consolidado",
    modulo: "digesto",
    titulo: "Texto consolidado vigente de las normas",
    descripcion:
      "El digesto publica los textos originales pero no el texto consolidado con todas las modificaciones incorporadas. Para saber qué dice una ordenanza hoy hay que rastrear varias normas posteriores.",
    categoria: "marco_normativo",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 32 · principio de seguridad jurídica · accesibilidad efectiva (no formal) de las normas.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-audiencias-publicas",
    modulo: "digesto",
    titulo: "Audiencias públicas y participación ciudadana",
    descripcion:
      "No hay un registro público estructurado de audiencias públicas convocadas, oradores anotados, intervenciones y resoluciones adoptadas tras la audiencia.",
    categoria: "participacion_ciudadana",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · estándares de participación ciudadana del Acuerdo de Escazú (Ley nacional 27.566).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "dig-datos-abiertos-concejo",
    modulo: "digesto",
    titulo: "Datos abiertos del Concejo",
    descripcion:
      "Dataset estructurado en formatos abiertos (CSV, JSON) con normas, proyectos, sesiones y votaciones, reutilizable por terceros.",
    categoria: "datos_abiertos",
    estado: "no_publicado",
    fundamento: "Ley 27.275 art. 32 (formatos abiertos por defecto).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },

  // ===== JUZGADO DE FALTAS =====
  {
    id: "juz-estadisticas-actas",
    modulo: "juzgado-faltas",
    titulo: "Estadísticas agregadas de actas labradas y resueltas",
    descripcion:
      "No se publica la cantidad anual y mensual de actas labradas, resueltas, archivadas o prescriptas, desagregadas por tipo de falta. Son datos agregados que no exponen a ningún ciudadano individual.",
    categoria: "actividad_sancionatoria",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 1 y 5 · principio constitucional de publicidad de los actos de gobierno.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-recaudacion",
    modulo: "juzgado-faltas",
    titulo: "Recaudación por multas y sanciones",
    descripcion:
      "No se publica el monto recaudado mensual y anual por multas y sanciones aplicadas, ni la tasa de cobrabilidad o los montos pendientes.",
    categoria: "recursos_publicos",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · Constitución de Santa Fe (publicidad de la hacienda pública).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-destino-fondos",
    modulo: "juzgado-faltas",
    titulo: "Destino y afectación de los fondos recaudados",
    descripcion:
      "No se publica si la recaudación de multas tiene afectación específica (por ejemplo, seguridad vial) o se imputa a Rentas Generales, ni el rastreo desde el ingreso hasta la ejecución.",
    categoria: "trazabilidad_fondos",
    estado: "no_publicado",
    fundamento:
      "Constitución Nacional (forma republicana) · Ley 27.275 · principio de rendición de cuentas inherente a la administración pública.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-ordenanza-organica",
    modulo: "juzgado-faltas",
    titulo: "Ordenanza orgánica del Juzgado de Faltas",
    descripcion:
      "La ordenanza que organiza el Juzgado, fija su competencia, designa al juez y establece garantías de imparcialidad no se encuentra en buscadores estándar.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. b (estructura orgánica) · art. 2 Código Civil y Comercial (publicidad de las normas).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-regimen-faltas",
    modulo: "juzgado-faltas",
    titulo: "Régimen Municipal de Faltas consolidado",
    descripcion:
      "El catálogo de faltas municipales con tipología, escalas de sanciones, plazos y procedimientos no está consolidado y disponible públicamente.",
    categoria: "marco_normativo",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · principio de legalidad sancionatoria (CN art. 18) — no se puede aplicar una sanción sin ley previa, accesible y conocida.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-convenio-apsv",
    modulo: "juzgado-faltas",
    titulo: "Convenio con la Agencia Provincial de Seguridad Vial",
    descripcion:
      "No se publica si el Juzgado está habilitado bajo Ley provincial 13.133 ni el texto del convenio que delimita competencias y reparto de fondos.",
    categoria: "convenios_publicos",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. f (convenios y contratos celebrados por el Estado).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-calidad-procesal",
    modulo: "juzgado-faltas",
    titulo: "Indicadores de calidad procesal",
    descripcion:
      "Tiempos medios de tramitación, tasa de recursos interpuestos, tasa de revocaciones por la justicia ordinaria. Indicadores de calidad institucional —no de productividad sancionatoria—.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · estándares interamericanos de transparencia activa.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },
  {
    id: "juz-datos-abiertos",
    modulo: "juzgado-faltas",
    titulo: "Datos abiertos del Juzgado",
    descripcion:
      "Dataset agregado y anonimizado en formatos abiertos (CSV/JSON, CC-BY-4.0) reutilizable por periodismo de datos, academia y organizaciones civiles.",
    categoria: "datos_abiertos",
    estado: "no_publicado",
    fundamento: "Ley 27.275 art. 32 · principio de máxima divulgación.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-02"
  },

  // ===== PERSONAL =====
  {
    id: "per-decretos-designacion",
    modulo: "personal",
    titulo: "Decretos de designación con fecha exacta",
    descripcion:
      "No se publica de forma sistemática y consultable el decreto de designación de cada funcionario con la fecha precisa de asunción del cargo, su número, fundamento y rango remunerativo asignado.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. b (estructura orgánica y funciones) y art. 5 inc. c (escala salarial y nómina con cargos y remuneraciones) · art. 2 Código Civil y Comercial (publicidad de los actos administrativos).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-remuneraciones-reales",
    modulo: "personal",
    titulo: "Remuneraciones reales por cargo (planta política)",
    descripcion:
      "Los importes brutos y netos efectivamente liquidados a cada cargo de planta política no se publican mes a mes en formato estructurado. Lo que hoy se exhibe son estimaciones referenciales, no datos oficiales.",
    categoria: "recursos_publicos",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. c (escala salarial completa, categorías y remuneraciones de todos los cargos) · principio republicano de publicidad de la hacienda pública.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-planta-permanente",
    modulo: "personal",
    titulo: "Nómina de planta permanente (cantidad, antigüedad, sector)",
    descripcion:
      "No se publica el número total de agentes de planta permanente, su antigüedad individual (sin nombre) y el sector / dependencia donde prestan funciones. Es el padrón estructural del Estado municipal y debe ser público en formato agregado y respetando datos sensibles.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. c (nómina, escala salarial y categorías de personal) · Constitución de Santa Fe (publicidad de la hacienda pública) · Ley Orgánica de Municipios N° 14.436. La publicación agregada por sector y antigüedad no expone datos personales y es la regla en estándares OGP/Escazú.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-planta-no-permanente",
    modulo: "personal",
    titulo: "Nómina de planta no permanente y contratados",
    descripcion:
      "No se publica la cantidad de agentes de planta no permanente y de personal contratado (locaciones de servicios y de obra), su antigüedad, modalidad de vinculación y sector. Tampoco la fecha de inicio y fin de cada contrato ni su renovación. Esta información es de las más sensibles para el control del gasto público y de la rotación funcional.",
    categoria: "recursos_publicos",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. c (toda forma de vinculación con el Estado, incluidas contrataciones) · Ley Orgánica de Municipios N° 14.436 · estándares MESICIC y OGP sobre transparencia de la fuerza laboral pública.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-masa-salarial-total",
    modulo: "personal",
    titulo: "Masa salarial total mensual y anual del municipio",
    descripcion:
      "No se publica de forma estructurada el monto total liquidado mensual y anualmente en concepto de personal (planta política + permanente + no permanente + contratados), discriminado por escalafón y por dependencia. Es el dato que permite ciudadanizar la pregunta de cuánto cuesta operar el Estado municipal.",
    categoria: "recursos_publicos",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 art. 5 inc. c y art. 5 inc. e (presupuesto y ejecución detallada) · principio republicano de rendición de cuentas.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-concursos-y-acceso",
    modulo: "personal",
    titulo: "Concursos públicos e ingresos a la administración",
    descripcion:
      "No se publica el listado de concursos públicos abiertos y cerrados, las bases, los jurados, los puntajes obtenidos por cada postulante (sin datos sensibles) ni los actos de designación derivados.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento:
      "Ley 27.275 · principio constitucional de idoneidad para el acceso al empleo público (CN art. 16) · Constitución de Santa Fe.",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
  },
  {
    id: "per-datos-abiertos",
    modulo: "personal",
    titulo: "Datos abiertos de personal",
    descripcion:
      "Dataset estructurado en formatos abiertos (CSV/JSON, CC-BY-4.0) con organigrama, planta permanente y no permanente agregados por sector y antigüedad, y serie histórica de masa salarial.",
    categoria: "datos_abiertos",
    estado: "no_publicado",
    fundamento: "Ley 27.275 art. 32 (formatos abiertos por defecto).",
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    detectadaEl: "2026-05-03"
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
  actividad_legislativa: "Actividad legislativa"
};
