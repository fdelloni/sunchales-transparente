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
  | "audiencias-publicas"
  | "catastro";

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
  | "boletin_oficial"
  | "ordenamiento_territorial"
  | "tributos_inmobiliarios";

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
  {
    id: "per-antiguedad-agentes",
    modulo: "personal",
    titulo: "Antigüedad (años de servicio) por agente",
    descripcion:
      "La Nómina del Personal Municipal publicada en sunchales.gob.ar (abril 2026) informa nombre, sector y modalidad de vinculación de cada agente, pero NO incluye su antigüedad en el cargo ni fecha de ingreso al municipio. La antigüedad es un dato estructural del régimen escalafonario (Ley provincial 9.286) y condiciona adicionales remunerativos, derechos jubilatorios y promociones; su publicación agregada por sector no expone datos personales sensibles y permite control ciudadano sobre la rotación funcional y la estabilidad del Estado municipal.",
    categoria: "estructura_organica",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · Ley provincial 9.286 (Estatuto y Escalafón del Personal de Municipalidades y Comunas) — la antigüedad determina derechos remunerativos y previsionales y no constituye dato sensible bajo Ley 25.326.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/wp-content/uploads/2026/04/Nomina-Pagina-Web-2026-04.pdf"
  },
  {
    id: "per-decretos-designacion",
    modulo: "personal",
    titulo: "Decretos de designación con número y fecha por agente",
    descripcion:
      "Aunque la nómina publica el cargo y la modalidad de vinculación de cada agente, no se publica el decreto de designación (número, fecha y acto administrativo que lo respalda) que permite trazar cuándo asumió cada persona su cargo y bajo qué fundamento. La publicación del acto administrativo —no de datos sensibles— es la regla en estándares de transparencia activa.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · art. 2 Código Civil y Comercial (publicidad de los actos administrativos) · ${FUND_CONST}`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-nomina-formato-cerrado",
    modulo: "personal",
    titulo: "Nómina del personal sólo en PDF (no en CSV / JSON)",
    descripcion:
      "La municipalidad publica mensualmente la nómina completa del personal en formato PDF (sunchales.gob.ar/wp-content/uploads/...). Es un avance importante respecto del estándar promedio de la provincia. Sin embargo, el PDF no permite procesamiento automatizado: para auditar series temporales, comparar evoluciones por sector o cruzar con remuneraciones, periodistas y academia deben re-extraer los datos manualmente cada mes. El formato abierto reutilizable es el estándar de transparencia activa moderna.",
    categoria: "datos_abiertos",
    estado: "publicado_formato_cerrado",
    fundamento: `${FUND_LOCAL} · ${FUND_PROV} (principio de máxima divulgación: la publicación debe ser efectiva y reutilizable, no meramente formal).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/wp-content/uploads/2026/04/Nomina-Pagina-Web-2026-04.pdf"
  },
  {
    id: "per-remuneracion-por-agente",
    modulo: "personal",
    titulo: "Remuneración individualizada por agente (planta permanente, transitorios, contratados)",
    descripcion:
      "El municipio publica masivamente las remuneraciones de cargos políticos y de algunas coordinaciones jerárquicas (planta política). Pero no se publica la remuneración bruta y neta mensual de cada agente de planta permanente, transitorio o contratado por servicios, ni siquiera de forma agregada por escalafón y categoría dentro de cada sector. Es el dato que permite ciudadanizar el costo real del Estado municipal por función.",
    categoria: "recursos_publicos",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} · Constitución de Santa Fe (publicidad de la hacienda pública) · CSJN Fallos 335:2393 (Cippolini): la remuneración pagada con fondos públicos es información pública, no dato sensible.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/"
  },
  {
    id: "per-vigencia-contratos",
    modulo: "personal",
    titulo: "Vigencia, plazos y renovaciones de contratos (transitorios y por servicios)",
    descripcion:
      "Para los 93 agentes Transitorios y los 102 contratos por Servicios (PDF abril 2026), no se publica la fecha de inicio del contrato, fecha de vencimiento ni historial de renovaciones. Sin estos datos, el ciudadano no puede auditar si la contratación temporaria se está usando dentro de los límites legales (carácter excepcional de la planta no permanente conforme Ley 9.286) o si se ha desnaturalizado en una vinculación de hecho permanente.",
    categoria: "recursos_publicos",
    estado: "publicado_parcial",
    fundamento: `${FUND_LOCAL} · Ley provincial 9.286 (carácter excepcional de la planta no permanente) · principio republicano de control del gasto público.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl:
      "https://sunchales.gob.ar/wp-content/uploads/2026/04/Nomina-Pagina-Web-2026-04.pdf"
  },
  {
    id: "per-concursos-publicos",
    modulo: "personal",
    titulo: "Concursos públicos de ingreso y promociones",
    descripcion:
      "No se publica el listado de concursos públicos abiertos y cerrados para ingreso o promoción en la planta permanente, las bases, los jurados, los puntajes obtenidos por cada postulante (con resguardo de datos sensibles) ni los actos de designación derivados. Es un déficit que impacta directamente sobre el principio constitucional de idoneidad para el acceso al empleo público.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Constitución Nacional art. 16 (idoneidad como condición de admisibilidad en empleos públicos) · Ley provincial 9.286 · ${FUND_CONST}`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-licencias-tipos",
    modulo: "personal",
    titulo: "Agentes con licencia, agregados por tipo (salud, salud mental, ART, sin goce, sin asignación)",
    descripcion:
      "No se publica cuántos agentes municipales están con licencia, ni de qué tipo. Lo que pedimos publicar son cantidades agregadas (sin nombres) en categorías que son indicadores de gestión: salud corta y larga duración, salud mental, accidente de trabajo, licencias particulares sin goce de sueldo y agentes sin asignación de tareas. NO pedimos información sobre licencias familiares (maternidad/paternidad/cuidado), por estudio, ni vacaciones, porque son derechos previstos por ley y no situaciones a controlar. El agregado anónimo no es dato sensible: la Ley 25.326 art. 11 autoriza expresamente el tratamiento estadístico con disociación.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Ley 25.326 art. 11 (tratamiento estadístico con disociación está permitido) · principio republicano de control del costo real del Estado: el ausentismo es un componente del costo.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-licencias-evolucion",
    modulo: "personal",
    titulo: "Evolución mensual de licencias y tasa de ausentismo",
    descripcion:
      "No se publica una serie mensual que muestre cómo evolucionan las licencias en el tiempo, ni el cálculo derivado de la tasa de ausentismo (porcentaje del plantel que está con licencia cada mes). Sin esa serie es imposible detectar picos atípicos, problemas de salud organizacional o impactos de cambios de gestión.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · estándares de transparencia laboral del sector público (Open Government Partnership).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-licencias-salud-mental",
    modulo: "personal",
    titulo: "Licencias por salud mental — cantidad agregada, con regla anti-reidentificación",
    descripcion:
      "No se publica cuántos agentes municipales están con licencia específicamente por afecciones de salud mental. Este dato es de alto valor para diseño de políticas de salud ocupacional. Para que la publicación sea respetuosa y no estigmatice, debe aplicarse la regla habitual de la estadística pública: cuando hay menos de 5 casos en el mes se reporta '<5' en lugar del número exacto, evitando que alguien pueda deducir de quién se trata. Cuando hay 5 o más se publica el número real.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Ley Nacional 26.657 de Salud Mental art. 3 (el trabajo es uno de los determinantes sociales de la salud mental) · Ley 25.326 (autoriza el tratamiento estadístico anónimo) · estándares INDEC sobre estadísticas de salud agregadas.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-sin-asignacion",
    modulo: "personal",
    titulo: "Agentes en planta sin asignación de tareas",
    descripcion:
      "No se publica la cantidad de agentes que figuran en la planta municipal pero no están cumpliendo funciones, sea por sumario administrativo en curso, junta médica abierta sin definir, o cualquier otra situación administrativa. Esta es la categoría de licencia más sensible para auditar porque puede esconder casos de irregularidad que afectan la calidad institucional y el gasto público.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · principio republicano de control del costo real del Estado · Ley Nacional 24.557 art. 9 (reasignación de tareas tras junta médica).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-genero-distribucion",
    modulo: "personal",
    titulo: "Distribución por género del personal municipal (mujeres / varones / no binario)",
    descripcion:
      "El PDF oficial de la nómina no incluye el género del personal. Sin ese dato no es posible analizar brecha de género en la composición de la planta, ni el acceso a cargos jerárquicos, ni la segregación por sector (por ejemplo, predominio masculino en Obras y Servicios Públicos o femenino en Cultura y Educación). La publicación debe respetar la Ley Nacional 26.743 de Identidad de Género (categorías: mujer, varón, identidad no binaria, sin declarar), no inferirse desde el nombre, y publicarse agregada por categoría y sector.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Ley Nacional 26.485 art. 11 inc. 5 (estadísticas con perspectiva de género en todos los organismos públicos) · Ley Nacional 26.743 de Identidad de Género · Convención CEDAW (jerarquía constitucional, CN art. 75 inc. 22) · Ley provincial 13.348 (adhesión a Ley 26.485).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-genero-cargos-jerarquicos",
    modulo: "personal",
    titulo: "Brecha de género en cargos jerárquicos",
    descripcion:
      "No se publica la distribución por género de los cargos jerárquicos (secretarías, subsecretarías, direcciones, coordinaciones). Es el indicador clave para evaluar si la Municipalidad cumple con los compromisos de paridad asumidos por el Estado argentino tras la adhesión a CEDAW y la Ley 26.485. Permite ver el llamado 'techo de cristal' a nivel municipal.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · CEDAW (jerarquía constitucional) · Ley 26.485 art. 11 inc. 5 · Plan Nacional de Igualdad en la Diversidad.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "per-genero-remuneracion",
    modulo: "personal",
    titulo: "Brecha salarial de género en el municipio",
    descripcion:
      "No se publica la diferencia agregada entre remuneraciones promedio percibidas por mujeres y por varones dentro del municipio, ni desagregada por categoría y por sector. Es el indicador que permite verificar la implementación efectiva del principio constitucional de 'igual remuneración por igual tarea' (CN art. 14 bis) y los compromisos de CEDAW.",
    categoria: "calidad_institucional",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · CN art. 14 bis · CEDAW · Ley Nacional 26.485 art. 11 inc. 5 (estadísticas con perspectiva de género).`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
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
  },

  // ===== CATASTRO =====
  // Marco normativo de respaldo específico para este módulo:
  //   - Ley nacional 26.209 (Catastro Nacional), Art. 1 inc. b: publicidad del
  //     estado parcelario como función esencial de los catastros.
  //   - Ley provincial Santa Fe 10.921/1992: crea el SCIT.
  //   - Ley provincial Santa Fe 2.996 (t.o.): avaluación de la propiedad raíz.
  //   - Ord. Sunchales 1294/1999, 2789/2019, 2800/2019, 2989 y 3266 (vetada).
  // El límite legítimo es la Ley 25.326 sobre datos del titular registral;
  // NO se extiende a geometría parcelaria, nomenclador, superficie, valuación
  // fiscal ni zonificación.
  {
    id: "cat-pagina-institucional",
    modulo: "catastro",
    titulo: "Catastro municipal sin página institucional propia",
    descripcion:
      "La Oficina de Catastro (Subdirección de Obras Privadas, Secretaría de Gestión Ambiental y Territorial) no tiene una página institucional propia en sunchales.gob.ar. Su existencia se infiere únicamente del listado de trámites. Eso impide al ciudadano conocer su estructura, su domicilio, su normativa de actuación y los canales de contacto en forma unificada.",
    categoria: "estructura_organica",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Ley 26.209 Art. 1 inc. b (publicidad del estado parcelario) · ${FUND_CONST}.`,
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto",
    detectadaEl: "2026-05-10"
  },
  {
    id: "cat-plano-parcelario",
    modulo: "catastro",
    titulo: "Plano parcelario municipal no publicado",
    descripcion:
      "La Municipalidad de Sunchales no publica un plano parcelario navegable que muestre las parcelas del ejido con su nomenclador, superficie y zonificación. El visualizador IDESF del SCIT provincial cubre parte de esta función, pero no está linkeado desde el sitio municipal, y la integración del nomenclador municipal con el provincial requiere convenio que no consta publicado.",
    categoria: "ordenamiento_territorial",
    estado: "no_publicado",
    fundamento: `Ley 26.209 Art. 1 inc. b (publicidad del estado parcelario es función esencial del catastro). ${FUND_LOCAL}.`,
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto",
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://www.santafe.gob.ar/idesf/visualizador/"
  },
  {
    id: "cat-zonificacion-pdf",
    modulo: "catastro",
    titulo: "Zonificación urbana sólo en PDFs sueltos",
    descripcion:
      "La zonificación vigente (Ord. 1294/1999, Ord. 2800/2019 — Plano de Áreas, y modificatorias) se publica como PDFs sueltos del digesto. No hay versión consolidada, consultable por dirección o por nomenclador, ni dataset en formato abierto (GeoJSON, shapefile). El ciudadano que quiere saber qué se puede construir en su parcela debe rastrear varias ordenanzas separadas.",
    categoria: "ordenamiento_territorial",
    estado: "publicado_formato_cerrado",
    fundamento: `${FUND_LOCAL} · accesibilidad efectiva de las normas (art. 2 CCyCN) · ${FUND_PROV}.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://concejosunchales.gob.ar/documentos/digesto/digesto.3902.O%202800%202019.pdf"
  },
  {
    id: "cat-valuaciones-agregadas",
    modulo: "catastro",
    titulo: "Valuaciones fiscales agregadas por zona no publicadas",
    descripcion:
      "El municipio aplica tributos inmobiliarios (TGI, sobretasa baldíos) basados en valuaciones fiscales, pero no publica estadísticas agregadas de valuación por zona, ni la metodología para fijarlas, ni la evolución temporal. La valuación fiscal individual de cada parcela queda protegida sólo en lo que respecta al titular; los agregados por zona o por categoría son publicables sin restricción.",
    categoria: "tributos_inmobiliarios",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · Ley provincial 2.996 (avaluación de la propiedad raíz) · ${FUND_CONST}.`,
    fundamentoUrl: "https://www.santafe.gov.ar/index.php/web/content/view/full/6950",
    detectadaEl: "2026-05-10"
  },
  {
    id: "cat-alicuotas-tgi",
    modulo: "catastro",
    titulo: "Alícuotas de la Tasa General de Inmuebles por zona no publicadas",
    descripcion:
      "Las alícuotas de la TGI desagregadas por zona, categoría y destino del inmueble no están publicadas en un dataset accesible. Eso impide al ciudadano calcular su tributo de manera transparente y dificulta el control sobre eventuales asimetrías o privilegios diferenciales.",
    categoria: "tributos_inmobiliarios",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · principio republicano de publicidad tributaria · ${FUND_CONST}.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "cat-baldios-opacos",
    modulo: "catastro",
    titulo: "Catastro de terrenos baldíos sometidos a sobretasa: opaco en pleno debate",
    descripcion:
      "La Ord. 2989 establece sobretasa sobre terrenos baldíos y es objeto de disputa pública activa en 2026 (Ord. 3266 fue vetada por el DEM, sesión extraordinaria del Concejo del 27/02/2026). Sin embargo, no se publica el listado o mapa de parcelas efectivamente calificadas como baldíos a efectos de la sobretasa, ni los criterios técnicos de aplicación. Es información de interés público manifiesto porque la propia norma decide sobre clases de inmuebles; publicarla obliga a explicitar y defender los criterios.",
    categoria: "ordenamiento_territorial",
    estado: "no_publicado",
    fundamento: `${FUND_LOCAL} · ${FUND_CONST} (forma republicana → publicidad de los actos de gobierno) · principio de igualdad tributaria.`,
    fundamentoUrl: URL_OAIP_LOCAL,
    detectadaEl: "2026-05-10"
  },
  {
    id: "cat-info-arancelada",
    modulo: "catastro",
    titulo: "Consulta de dato catastral arancelada (10 UCM por consulta)",
    descripcion:
      "La consulta puntual del dato catastral asociado a un inmueble se cobra 10 UCM por trámite individual a través del portal municipal. Cobrar por cada acceso individual al dato básico —en vez de publicar el plano parcelario en formato abierto— configura una forma de publicidad arancelada que tensiona con el Art. 1 inc. b de la Ley 26.209 (la publicidad del estado parcelario es función esencial del catastro, no un servicio facturable). La consulta paga se justifica para certificaciones formales con valor probatorio; no para la información catastral básica.",
    categoria: "ordenamiento_territorial",
    estado: "publicado_parcial",
    fundamento: `Ley 26.209 Art. 1 inc. b (publicidad del estado parcelario como función esencial). ${FUND_LOCAL} (gratuidad del acceso a la información, art. 3 Ord. 1872/2009).`,
    fundamentoUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto",
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://sunchales.gob.ar/gestion/sunchales-impulsa/tramites/solicitar-datos-catastrales/"
  },
  {
    id: "cat-sin-link-scit",
    modulo: "catastro",
    titulo: "Sitio municipal no linkea al visualizador SCIT provincial",
    descripcion:
      "El SCIT (Servicio de Catastro e Información Territorial, Ley provincial 10.921/1992) ofrece un visualizador público de capas parcelarias y un buscador de parcelas por nomenclador, ambos sin login. La Municipalidad de Sunchales no enlaza estos recursos desde su sitio, pese a que cubren parte sustancial del estándar nacional de publicidad parcelaria.",
    categoria: "datos_abiertos",
    estado: "no_publicado",
    fundamento: `Ley 26.209 (Catastro Nacional) · Ley provincial 10.921/1992 (SCIT) · ${FUND_LOCAL}.`,
    fundamentoUrl: "https://www.santafe.gob.ar/idesf/visualizador/",
    detectadaEl: "2026-05-10",
    publicacionParcialUrl: "https://www.santafe.gob.ar/idesf/buscadorparcela/tramite.php"
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
  ordenamiento_territorial: "Ordenamiento territorial",
  tributos_inmobiliarios: "Tributos inmobiliarios",
};
