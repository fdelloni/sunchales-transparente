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
};
