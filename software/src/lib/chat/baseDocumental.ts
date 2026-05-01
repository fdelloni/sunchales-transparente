/**
 * Base documental del Asistente Ciudadano.
 *
 * Cada documento es una "unidad de información pública verificable" que el
 * buscador BM25 puede recuperar SIN llamar al LLM. La idea es que el 70-90%
 * de las preguntas se resuelvan con cita textual de estos documentos —
 * gratis, auditable y reproducible.
 *
 * El LLM (Claude Haiku o Gemini 2.5 Flash) queda como "techo" sólo para
 * preguntas que ningún documento cubre con score suficiente.
 *
 * Reglas de redacción de documentos:
 *   1. Cada texto cita su fuente verificable (ley, ordenanza, sitio oficial).
 *   2. NO se inventa nada. Si un dato no está confirmado, no entra acá.
 *   3. Cada documento es "auto-contenido": leerlo solo basta para entender
 *      la respuesta. El buscador devuelve el doc completo, no un fragmento.
 *   4. Texto en español rioplatense, claro y sobrio.
 */

import { totales } from "@/lib/data/presupuesto";

export type Documento = {
  id: string;
  titulo: string;
  /** Texto completo del documento, listo para devolver al ciudadano. */
  texto: string;
  /** Cita textual de la fuente para que el ciudadano pueda verificar. */
  fuente: string;
  /** URL pública opcional para profundizar. */
  url?: string;
  /** Categoría temática para mostrar en el widget. */
  categoria:
    | "identidad"
    | "presupuesto"
    | "personal"
    | "contrataciones"
    | "tramites"
    | "normativa"
    | "datos_abiertos"
    | "principios"
    | "modulos"
    | "autoridades"
    | "demografia"
    | "cooperativismo";
  /** Palabras clave que reciben un boost extra en BM25 (tema, sinónimos). */
  keywords: string[];
  /** Link del sitio interno para profundizar (módulo de la app). */
  modulo?: string;
};

/**
 * Genera el documento de presupuesto a partir de los totales calculados,
 * para que cualquier cambio en los datos numéricos se refleje sin tocar
 * el texto. Único lugar donde aceptamos "interpolación" en la base.
 */
function docPresupuesto2026(): Documento {
  return {
    id: "presupuesto_2026_general",
    titulo: "Presupuesto Municipal 2026",
    texto:
      `El Presupuesto Municipal 2026 de Sunchales prevé gastos por aproximadamente ` +
      `$${totales.gastos_total.toLocaleString("es-AR")} y recursos corrientes por ` +
      `$${totales.recursos_corrientes.toLocaleString("es-AR")}. ` +
      `Esto representa un gasto per cápita proyectado de $${totales.gasto_per_capita.toLocaleString("es-AR")} ` +
      `por habitante (calculado sobre la población del Censo INDEC 2022). ` +
      `Adicionalmente, el municipio recibe del programa provincial Ley 12.385 ` +
      `(Programa de Obras Menores) un aporte de $${totales.fondoLey12385_recibido.toLocaleString("es-AR")} en 2026.`,
    fuente: "Proyecto de Presupuesto 2026 remitido al Honorable Concejo Municipal",
    categoria: "presupuesto",
    keywords: [
      "presupuesto",
      "gasto",
      "gastos",
      "recursos",
      "ingresos",
      "plata",
      "dinero",
      "egresos",
      "ejecución",
      "ley 12385",
      "fondo provincial",
      "obras menores",
      "per cápita",
      "per capita"
    ],
    modulo: "/presupuesto"
  };
}

export const baseDocumental: Documento[] = [
  // ====== IDENTIDAD DEL PROYECTO ======
  {
    id: "que_es_sunchales_transparente",
    titulo: "¿Qué es Sunchales Transparente?",
    texto:
      "Sunchales Transparente es una plataforma cívica de transparencia y eficiencia operativa para la Municipalidad de " +
      "Sunchales (Santa Fe, Argentina). Está construida con principios de máxima divulgación, privacidad por diseño y código abierto " +
      "auditable. Permite consultar presupuesto, padrón de personal, contrataciones públicas con verificación criptográfica SHA-256, " +
      "datos abiertos en CSV/JSON y suscribirse a alertas opt-in cuando se publica algo de interés.",
    fuente: "Documento de presentación del proyecto Sunchales Transparente",
    categoria: "identidad",
    keywords: [
      "que es",
      "qué es",
      "sunchales transparente",
      "para que sirve",
      "para qué sirve",
      "objetivo",
      "proposito",
      "propósito",
      "plataforma",
      "proyecto cívico",
      "proyecto civico"
    ]
  },

  // ====== DEMOGRAFÍA ======
  {
    id: "poblacion_censo_2022",
    titulo: "Población de Sunchales (Censo 2022)",
    texto:
      `Sunchales cuenta con ${totales.habitantes.toLocaleString("es-AR")} habitantes según los resultados definitivos del ` +
      `Censo Nacional 2022 publicados por el INDEC. Es la cuarta ciudad del Departamento Castellanos en la provincia de Santa Fe.`,
    fuente: "INDEC — Censo Nacional de Población, Hogares y Viviendas 2022",
    url: "https://www.indec.gob.ar/",
    categoria: "demografia",
    keywords: [
      "habitantes",
      "poblacion",
      "población",
      "censo",
      "indec",
      "cuanta gente",
      "cuánta gente",
      "demografía",
      "demografia",
      "cuantos",
      "cuántos",
      "tiene"
    ]
  },

  // ====== PRESUPUESTO ======
  docPresupuesto2026(),

  // ====== AUTORIDADES ======
  {
    id: "intendente_actual",
    titulo: "Intendente actual",
    texto:
      "El intendente actual de la Municipalidad de Sunchales es Pablo Pinotti, quien asumió la gestión tras la sucesión " +
      "de Gonzalo Toselli. Información oficial disponible en el sitio sunchales.gob.ar.",
    fuente: "Información pública oficial de la Municipalidad de Sunchales",
    url: "https://sunchales.gob.ar/",
    categoria: "autoridades",
    keywords: ["intendente", "quien gobierna", "quién gobierna", "pinotti", "toselli", "ejecutivo municipal", "alcalde"]
  },

  // ====== COOPERATIVISMO ======
  {
    id: "capital_nacional_cooperativismo",
    titulo: "Capital Nacional del Cooperativismo",
    texto:
      "Sunchales fue declarada Capital Nacional del Cooperativismo por la Ley Nacional 26.037, sancionada en 2005, " +
      "en reconocimiento al ecosistema cooperativo histórico de la ciudad. Sunchales es sede de cooperativas históricas " +
      "como SanCor, La Segunda y el Instituto Cooperativo de Enseñanza Superior (ICES), única experiencia de este tipo " +
      "a nivel nacional.",
    fuente: "Ley Nacional 26.037 (sancionada en 2005)",
    categoria: "cooperativismo",
    keywords: [
      "cooperativismo",
      "capital nacional",
      "ley 26037",
      "ley 26.037",
      "cooperativa",
      "sancor",
      "la segunda",
      "ices",
      "instituto cooperativo"
    ]
  },

  // ====== AUTONOMÍA MUNICIPAL ======
  {
    id: "autonomia_carta_organica",
    titulo: "Autonomía municipal y Carta Orgánica",
    texto:
      "Un eje destacado de la gestión 2026 es el avance hacia la autonomía municipal de Sunchales mediante el dictado " +
      "de una Carta Orgánica propia. La autonomía municipal es un marco institucional clave para consolidar herramientas " +
      "de transparencia y participación ciudadana, reconocido por la Constitución Nacional y la reforma constitucional " +
      "santafesina de 2025.",
    fuente: "Información pública oficial · Reforma Constitución Santa Fe 2025",
    categoria: "normativa",
    keywords: ["autonomia", "autonomía", "carta organica", "carta orgánica", "constitución municipal", "constitucion municipal"]
  },

  // ====== NORMATIVA DE TRANSPARENCIA ======
  {
    id: "ley_27275_acceso_informacion",
    titulo: "Ley nacional 27.275 — Acceso a la Información Pública",
    texto:
      "La Ley 27.275 de Acceso a la Información Pública garantiza el derecho de toda persona a buscar, recibir y difundir " +
      "información en poder del Estado. Establece el principio de máxima divulgación, el carácter gratuito del acceso, " +
      "y plazos máximos de respuesta. Aplica formalmente al Estado nacional; los municipios pueden adherir o adoptar " +
      "estándares equivalentes.",
    fuente: "Ley 27.275 — Boletín Oficial República Argentina",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    categoria: "normativa",
    keywords: [
      "transparencia",
      "ley 27275",
      "ley 27.275",
      "acceso informacion",
      "acceso información",
      "máxima divulgación",
      "maxima divulgacion",
      "derecho a saber"
    ]
  },
  {
    id: "decreto_692_2009_santa_fe",
    titulo: "Decreto provincial Santa Fe 0692/2009",
    texto:
      "El Decreto provincial Santa Fe 0692/2009 establece el mecanismo de acceso a la información pública en el ámbito " +
      "del Poder Ejecutivo provincial. Sirve como antecedente y referencia de buenas prácticas para los municipios de la " +
      "provincia que quieran implementar mecanismos análogos.",
    fuente: "Decreto provincial Santa Fe 0692/2009",
    categoria: "normativa",
    keywords: ["decreto 692", "decreto 0692", "santa fe", "provincial", "acceso provincial"]
  },
  {
    id: "reforma_constitucional_santa_fe_2025",
    titulo: "Reforma constitucional Santa Fe 2025",
    texto:
      "La reforma de la Constitución de Santa Fe de 2025 incorpora expresamente el principio de máxima divulgación: " +
      "la información pública debe ser suministrada sin dilaciones, de manera clara, completa y concreta. Es uno de los " +
      "pilares normativos de Sunchales Transparente y abre un marco favorable a iniciativas govtech municipales.",
    fuente: "Constitución de la Provincia de Santa Fe (texto reformado 2025)",
    categoria: "normativa",
    keywords: ["reforma constitucional", "santa fe 2025", "constitucion provincial", "constitución provincial", "máxima divulgación"]
  },

  // ====== TRÁMITES ======
  {
    id: "tramite_tgi",
    titulo: "Cómo pagar la TGI (Tasa General de Inmuebles)",
    texto:
      "Podés pagar la TGI de Sunchales por los siguientes canales:\n" +
      "• Sitio oficial sunchales.gob.ar — sección Trámites Tributarios.\n" +
      "• Plataforma SIAC (provista por Munidigital) con tu CUIL.\n" +
      "• Pago Mis Cuentas, Rapipago, Pago Fácil con el código de pago de tu boleta.\n\n" +
      "Para consultar saldo o reimprimir el código de pago, ingresá al SIAC con tu CUIL.",
    fuente: "sunchales.gob.ar — Trámites Tributarios",
    url: "https://sunchales.gob.ar/",
    categoria: "tramites",
    keywords: ["tgi", "tasa general", "pago tgi", "como pago", "cómo pago", "donde pago", "dónde pago", "siac", "munidigital"]
  },
  {
    id: "tramite_licencia_conducir",
    titulo: "Licencia de conducir",
    texto:
      "El trámite de licencia de conducir en Sunchales se gestiona en el CETOS (Centro de Emisión de Licencias Municipal). " +
      "Pasos generales: 1) Sacar turno previo (sitio municipal o telefónico). 2) Presentar DNI y constancia de pago de la tasa. " +
      "3) Examen psicofísico, teórico y práctico según el caso. Conviene confirmar requisitos vigentes en sunchales.gob.ar antes de ir.",
    fuente: "sunchales.gob.ar — CETOS",
    url: "https://sunchales.gob.ar/",
    categoria: "tramites",
    keywords: ["licencia", "carnet", "conducir", "manejar", "registro", "cetos"]
  },
  {
    id: "tramite_habilitacion_comercial",
    titulo: "Habilitación de un comercio nuevo",
    texto:
      "Para habilitar un comercio en Sunchales necesitás: inscripción previa en AFIP y Rentas Santa Fe; constancia de " +
      "libre deuda municipal del inmueble; plano del local y, según rubro, certificado de bromatología o habilitación de " +
      "bomberos. El expediente se inicia en la Subsecretaría de Hacienda y Finanzas. Conviene pedir asesoramiento previo " +
      "sobre los requisitos específicos del rubro.",
    fuente: "sunchales.gob.ar — Habilitaciones",
    url: "https://sunchales.gob.ar/",
    categoria: "tramites",
    keywords: ["habilitacion", "habilitación", "comercio", "negocio", "abrir comercio", "habilitar"]
  },
  {
    id: "tramite_caza_pesca",
    titulo: "Licencia de caza o pesca",
    texto:
      "Las licencias de caza y pesca son competencia provincial (Ministerio de Ambiente de Santa Fe), no municipal. " +
      "Más información en santafe.gob.ar — sección Ambiente.",
    fuente: "Ministerio de Ambiente de la Provincia de Santa Fe",
    url: "https://www.santafe.gob.ar/",
    categoria: "tramites",
    keywords: ["caza", "pesca", "licencia caza", "licencia pesca", "ambiente provincial"]
  },

  // ====== MÓDULOS DE LA PLATAFORMA ======
  {
    id: "modulo_contrataciones_sha256",
    titulo: "Contrataciones con cadena SHA-256",
    texto:
      "El módulo de Contrataciones registra cada licitación, concurso de precios y contratación directa con una cadena " +
      "de hashes SHA-256 que encadena todos los eventos del expediente: creación, publicación del pliego, apertura de " +
      "ofertas, adjudicación, ampliaciones y pagos. Si alguien modifica un evento histórico, su hash cambia y todos los " +
      "siguientes también — la manipulación se detecta en segundos. Cualquier ciudadano puede descargar el JSON y " +
      "recalcular los hashes en su propia computadora con openssl, shasum, hashlib (Python) o crypto (Node).",
    fuente: "Sunchales Transparente — Módulo Contrataciones",
    categoria: "contrataciones",
    keywords: [
      "contrataciones",
      "contratación",
      "licitacion",
      "licitación",
      "sha-256",
      "sha256",
      "hash",
      "auditar contratacion",
      "auditar contratación",
      "verificar contratacion",
      "verificar contratación",
      "verifico",
      "verificar",
      "verificación",
      "verificacion",
      "compra publica",
      "compra pública",
      "ley 12510"
    ],
    modulo: "/contrataciones"
  },
  {
    id: "modulo_personal",
    titulo: "Padrón de Personal Municipal",
    texto:
      "El módulo Personal publica cargo, área y remuneración bruta de cada puesto público del municipio. NO se publican " +
      "datos personales sensibles como DNI o domicilio. La información expuesta es la mínima necesaria para que la " +
      "ciudadanía pueda auditar el gasto en personal, en estricto cumplimiento de la Ley 25.326 de Protección de Datos Personales.",
    fuente: "Sunchales Transparente — Módulo Personal · Ley 25.326",
    categoria: "personal",
    keywords: ["personal", "empleado", "empleados", "salario", "sueldo", "padrón", "padron", "remuneracion", "remuneración"],
    modulo: "/personal"
  },
  {
    id: "modulo_recaudacion",
    titulo: "Recaudación municipal",
    texto:
      "El módulo Recaudación detalla los principales tributos locales: TGI (Tasa General de Inmuebles), DReI (Derecho de " +
      "Registro e Inspección), Contribución por Mejoras y demás tributos, junto con los fondos por coparticipación provincial " +
      "y los aportes del programa Ley 12.385 (Obras Menores).",
    fuente: "Sunchales Transparente — Módulo Recaudación",
    categoria: "presupuesto",
    keywords: ["recaudacion", "recaudación", "tributo", "tributos", "tasa", "tasas", "drei", "coparticipacion", "coparticipación"],
    modulo: "/recaudacion"
  },
  {
    id: "modulo_datos_abiertos",
    titulo: "Datos abiertos y API REST",
    texto:
      "Sunchales Transparente publica un catálogo de datasets en CSV y JSON con licencia CC-BY-4.0, junto con una API REST " +
      "documentada en OpenAPI 3.0. Está pensada para periodistas de datos, investigadores académicos, desarrolladores cívicos " +
      "y otros municipios cooperativos que quieran reutilizar los datos.",
    fuente: "Sunchales Transparente — Módulo Datos Abiertos",
    categoria: "datos_abiertos",
    keywords: ["api", "datos abiertos", "csv", "json", "openapi", "desarrollador", "rest", "endpoint", "open data", "cc-by"],
    modulo: "/datos-abiertos"
  },
  {
    id: "modulo_suscripciones",
    titulo: "Suscripciones y alertas opt-in",
    texto:
      "Podés suscribirte por email, WhatsApp o ambos para recibir alertas cada vez que se publica una contratación que " +
      "coincida con tus filtros (categoría, área, monto mínimo). El sistema usa doble opt-in con confirmación explícita " +
      "según Ley 25.326. Cada notificación incluye un enlace de baja en un click. No se ceden datos personales a terceros.",
    fuente: "Sunchales Transparente — Módulo Suscripciones · Ley 25.326",
    categoria: "modulos",
    keywords: [
      "alerta",
      "alertas",
      "suscribir",
      "suscribirme",
      "suscribirse",
      "suscribo",
      "suscripcion",
      "suscripción",
      "notificacion",
      "notificación",
      "opt-in",
      "baja"
    ],
    modulo: "/suscripciones"
  },

  // ====== PRINCIPIOS Y PRIVACIDAD ======
  {
    id: "principios_proyecto",
    titulo: "Principios del proyecto",
    texto:
      "Sunchales Transparente se rige por seis principios técnicos: 1) máxima divulgación; 2) privacidad por diseño; " +
      "3) datos abiertos en formatos reutilizables; 4) trazabilidad inmutable mediante hashes criptográficos; " +
      "5) software auditable de código abierto; 6) interoperabilidad mediante API REST documentada con OpenAPI 3.0.",
    fuente: "Sunchales Transparente — Carta de principios",
    categoria: "principios",
    keywords: ["principios", "valores", "criterios", "filosofia", "filosofía", "fundamentos"]
  },
  {
    id: "privacidad_ley_25326",
    titulo: "Privacidad y Ley 25.326",
    texto:
      "El proyecto sigue el principio de privacidad por diseño y la Ley 25.326 de Protección de Datos Personales. Solo se " +
      "publica información pública necesaria para auditoría ciudadana, con disociación de datos personales y minimización " +
      "(se publica lo necesario, en la granularidad necesaria). NO se ceden datos personales a terceros. Las suscripciones " +
      "usan doble opt-in con baja en un click.",
    fuente: "Ley Nacional 25.326 de Protección de Datos Personales",
    categoria: "principios",
    keywords: [
      "privacidad",
      "datos personales",
      "ley 25326",
      "ley 25.326",
      "proteccion datos",
      "protección datos",
      "habeas data"
    ]
  },

  // ====== CHATBOT — META-INFORMACIÓN ======
  {
    id: "como_funciona_chatbot",
    titulo: "Cómo funciona este asistente",
    texto:
      "El Asistente Ciudadano usa una arquitectura híbrida en tres capas: (1) busca primero en una base documental local de " +
      "información pública verificada — sin tocar IA — y devuelve la cita textual con su fuente; (2) si la búsqueda local no " +
      "alcanza, llama a un modelo de lenguaje (Claude Haiku 4.5 o Gemini 2.5 Flash, configurable) con un system prompt de " +
      "reglas duras: cero invención, apolítico, deriva al canal oficial cuando no sabe; (3) NO persiste preguntas ni respuestas. " +
      "Esto reduce el costo de la IA al mínimo y refuerza la auditabilidad: cada respuesta cita textualmente un documento público.",
    fuente: "Sunchales Transparente — Documento técnico 08_CHATBOT_WEB_SETUP.md",
    categoria: "identidad",
    keywords: [
      "chatbot",
      "asistente",
      "como funciona",
      "cómo funciona",
      "ia",
      "inteligencia artificial",
      "claude",
      "gemini",
      "rag",
      "modelo lenguaje"
    ]
  },

  // ====== RECLAMOS ======
  {
    id: "reclamos_ciudadanos",
    titulo: "Cómo abrir un reclamo (bache, luminaria, otros)",
    texto:
      "Para reclamos ciudadanos sobre servicios urbanos (baches, luminaria, recolección, espacios públicos), el canal " +
      "oficial es la Municipalidad de Sunchales en sunchales.gob.ar o telefónicamente. Sunchales Transparente no " +
      "intermedia reclamos — su rol es transparentar la operación y permitir que el ciudadano siga el expediente. " +
      "En una próxima fase del proyecto se contempla un módulo de reclamos con trazabilidad y SLA público.",
    fuente: "Sunchales Transparente — Hoja de Ruta · Fase 2",
    categoria: "modulos",
    keywords: ["reclamo", "reclamos", "bache", "luminaria", "denuncia", "queja", "atencion", "atención"]
  }
];

/**
 * Atajo conveniente: dada una categoría, devuelve sus documentos.
 * Útil para facetar resultados en el widget en una iteración futura.
 */
export function porCategoria(cat: Documento["categoria"]): Documento[] {
  return baseDocumental.filter((d) => d.categoria === cat);
}
