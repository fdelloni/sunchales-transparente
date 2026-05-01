/**
 * Catalogo de FAQ y tramites del Municipio de Sunchales.
 *
 * Datos verificados desde fuentes oficiales:
 *   - sunchales.gob.ar (sitio oficial)
 *   - Carta organica nacional cooperativa: Ley 26.037
 *
 * Las respuestas que no esten verificadas estan marcadas con `verificado: false`
 * y derivan al usuario al canal oficial. NO se inventa informacion.
 *
 * Cuando una FAQ requiera dato dinamico (ej: vencimiento mensual de TGI), el
 * handler la enriquece desde la base. Aca solo va el texto base.
 */

export type EntradaFaq = {
  id: string;
  /** Palabras clave normalizadas (minusculas, sin acentos) que disparan esta entrada */
  keywords: string[];
  pregunta: string;
  respuesta: string;
  fuente?: string;
  verificado: boolean;
};

export const faqCatalogo: EntradaFaq[] = [
  {
    id: "tgi_pago",
    keywords: ["tgi", "tasa", "pagar tgi", "pagar tasa", "como pago", "donde pago"],
    pregunta: "¿Cómo pago la TGI (Tasa General de Inmuebles)?",
    respuesta:
      "Podés pagar la TGI por:\n" +
      "• Sitio oficial: sunchales.gob.ar (sección Trámites Tributarios).\n" +
      "• Plataforma SIAC (Munidigital).\n" +
      "• Pago Mis Cuentas, Rapipago, Pago Fácil con tu código de pago.\n\n" +
      "Si necesitás el código de pago o consultar saldo, ingresá al SIAC con tu CUIL.",
    fuente: "sunchales.gob.ar",
    verificado: true
  },
  {
    id: "horarios_palacio",
    keywords: ["horario", "horarios", "atencion", "atención", "abre", "abren", "palacio"],
    pregunta: "¿Cuáles son los horarios del Palacio Municipal?",
    respuesta:
      "Atención al público en el Palacio Municipal:\n" +
      "• Lunes a viernes de 7:00 a 13:00.\n\n" +
      "Para consultas fuera de ese horario podés usar este chat o el sitio sunchales.gob.ar. Algunos trámites (TGI, licencias) se hacen 100% online.",
    fuente: "sunchales.gob.ar",
    verificado: false
  },
  {
    id: "licencia_conducir",
    keywords: ["licencia", "carnet", "manejar", "conducir", "registro de conducir"],
    pregunta: "¿Cómo saco o renuevo la licencia de conducir?",
    respuesta:
      "El trámite de licencia de conducir se gestiona en el CETOS (Centro de Emisión de Licencias Municipal).\n\n" +
      "Pasos generales:\n" +
      "1) Sacar turno previo (sitio municipal o telefónico).\n" +
      "2) Presentar DNI y constancia de pago de la tasa.\n" +
      "3) Examen psicofísico, teórico y práctico (según el caso).\n\n" +
      "Confirmá requisitos vigentes en sunchales.gob.ar antes de ir.",
    fuente: "sunchales.gob.ar",
    verificado: false
  },
  {
    id: "habilitacion_comercio",
    keywords: ["habilitacion", "habilitación", "comercio", "negocio", "abrir un comercio", "habilitar"],
    pregunta: "¿Cómo habilito un comercio nuevo?",
    respuesta:
      "Para habilitar un comercio en Sunchales necesitás:\n" +
      "• Inscripción en AFIP y Rentas Santa Fe.\n" +
      "• Constancia de libre deuda municipal del inmueble.\n" +
      "• Plano del local y, según rubro, certificado de bromatología o habilitación de bomberos.\n\n" +
      "El expediente se inicia en la Subsecretaría de Hacienda y Finanzas. Te conviene pedir asesoramiento previo para que te indiquen qué aplica a tu rubro.",
    fuente: "sunchales.gob.ar",
    verificado: false
  },
  {
    id: "licencia_caza",
    keywords: ["caza", "pesca", "licencia de caza", "licencia de pesca"],
    pregunta: "¿Dónde tramito licencia de caza o pesca?",
    respuesta:
      "Las licencias de caza y pesca son competencia provincial (Ministerio de Ambiente de Santa Fe), no municipal. " +
      "Más info: santafe.gob.ar / Ambiente.",
    verificado: true
  },
  {
    id: "presupuesto_general",
    keywords: ["presupuesto", "cuanto gasta el municipio", "gasto municipal", "plata del municipio"],
    pregunta: "¿Cuál es el presupuesto del municipio?",
    respuesta:
      "El Presupuesto Municipal 2026 prevé gastos por aproximadamente $30.938 millones y recursos por $30.950 millones. " +
      "Para el desglose por finalidad (salud, educación, obra pública, etc.) escribí *transparencia* y te muestro las opciones.",
    fuente: "Proyecto de Presupuesto 2026 al HCM",
    verificado: true
  },
  {
    id: "intendente",
    keywords: ["intendente", "quien es el intendente", "pinotti"],
    pregunta: "¿Quién es el intendente?",
    respuesta:
      "El intendente actual es Pablo Pinotti. Asumió la gestión tras la sucesión de Gonzalo Toselli. " +
      "Más info en sunchales.gob.ar.",
    fuente: "Información pública oficial",
    verificado: true
  },
  {
    id: "cooperativismo",
    keywords: ["cooperativismo", "capital cooperativismo", "cooperativa"],
    pregunta: "¿Por qué Sunchales es Capital Nacional del Cooperativismo?",
    respuesta:
      "Sunchales fue declarada Capital Nacional del Cooperativismo por la Ley Nacional 26.037 (sancionada en 2005), " +
      "en reconocimiento al ecosistema cooperativo histórico de la ciudad (SanCor, La Segunda, etc.).",
    fuente: "Ley Nacional 26.037",
    verificado: true
  }
];

/**
 * Busca la mejor coincidencia por palabras clave.
 * Algoritmo simple: cuenta cuantas keywords del catalogo aparecen en el texto
 * (normalizado), y devuelve el de mayor score si supera el umbral.
 */
export function buscarFaq(textoUsuario: string): EntradaFaq | null {
  const norm = normalizar(textoUsuario);
  let mejor: { entrada: EntradaFaq; score: number } | null = null;
  for (const e of faqCatalogo) {
    let score = 0;
    for (const kw of e.keywords) {
      if (norm.includes(normalizar(kw))) score += kw.split(" ").length; // multi-palabra pesa mas
    }
    if (score > 0 && (!mejor || score > mejor.score)) {
      mejor = { entrada: e, score };
    }
  }
  return mejor ? mejor.entrada : null;
}

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita marcas combinatorias (acentos)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
