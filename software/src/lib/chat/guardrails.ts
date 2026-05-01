/**
 * Guardrails de pre-procesamiento del Asistente Ciudadano.
 *
 * Antes de pasar la pregunta al buscador BM25 (paso 1 del pipeline) o al
 * LLM (paso 2), corremos detectores de intención que pueden interceptar
 * la consulta y devolver una respuesta predeterminada.
 *
 * Por qué hace falta esto: el buscador BM25 hace match por keywords.
 * Si alguien pregunta "¿qué opinás del intendente?", la palabra
 * "intendente" gana score y el buscador devuelve la bio del intendente
 * en lugar de rehusarse a opinar. Necesitamos detectar la INTENCIÓN
 * (opinión, apoyo, recomendación) antes que las keywords.
 *
 * Filosofía: ante la duda, dispará el guardrail. Es preferible un falso
 * positivo (negarse a opinar cuando podría haber respondido) que un
 * falso negativo (opinar cuando no debería). El bot puede igualmente
 * derivar al canal oficial.
 */

export type ResultadoGuardrail = {
  bloqueado: true;
  respuesta: string;
  motivo: "opinion_personal" | "recomendacion" | "prediccion" | "consejo_legal_o_medico";
} | {
  bloqueado: false;
};

/**
 * Detecta intención de opinión personal del bot. Cubre:
 *   - "qué opinás...", "qué pensás...", "qué te parece..."
 *   - "criticás...", "defendés..."
 *   - "estás de acuerdo...", "te parece bien/mal..."
 *   - "preferís X o Y"
 *   - "es bueno/malo que...", "está bien/mal que..."
 *   - "apoyás...", "votarías..."
 *
 * Lo que NO debería disparar:
 *   - "¿qué es...?" (pregunta factual)
 *   - "¿quién es...?" (pregunta factual)
 *   - "¿cómo se hace...?" (pregunta procedural)
 */
function detectarOpinion(textoNormalizado: string): boolean {
  const patrones = [
    /\bque\s+opin(as|ás|a|ais|áis)\b/,
    /\bopina(s|r)\b/,
    /\bqu[eé]\s+pens(as|ás)\b/,
    /\bqu[eé]\s+te\s+parece\b/,
    /\bte\s+parece\s+(bien|mal|correcto|incorrecto|adecuado|justo|injusto)\b/,
    /\bcritic(as|ás|a)\b/,
    /\bdefend(es|és|e)\b/,
    /\b(est[áa]s?|estoy|estamos)\s+de\s+acuerdo\b/,
    /\bprefer[íi](s|s\b)/,
    /\bes\s+(bueno|malo|correcto|incorrecto)\s+que\b/,
    /\best[áa]\s+(bien|mal)\s+que\b/,
    /\bapoy(as|ás|a)\b/,
    /\bvotar[íi]as?\b/,
    /\brecomend(as|ás|a)\b.*\b(votar|elegir|apoyar)\b/,
    /\b(a\s+favor|en\s+contra)\s+de\b/,
    /\bjuzg(as|ás|ar)\b/
  ];
  return patrones.some((p) => p.test(textoNormalizado));
}

/**
 * Detecta consejo legal o médico — el bot no es abogado ni médico.
 * (Por ahora no aplica al corpus actual, lo dejamos preparado.)
 */
function detectarConsejoLegalMedico(textoNormalizado: string): boolean {
  const legales = [
    /\bme\s+convien(e|en)\s+(demandar|denunciar|hacer\s+juicio)\b/,
    /\b(deber[íi]a|me\s+conviene)\s+(firmar|aceptar|rechazar|impugnar)\b/,
    /\b(es\s+legal|es\s+ilegal)\s+(que\s+yo|si\s+yo)\b/
  ];
  const medicos = [
    /\b(qu[eé]\s+medicamento|qu[eé]\s+tratamiento|tengo\s+s[íi]ntomas|me\s+duele)\b/,
    /\b(diagn[oó]stico|prescrib(í|i)me|recet(á|a)me)\b/
  ];
  return [...legales, ...medicos].some((p) => p.test(textoNormalizado));
}

/**
 * Detecta predicción / pronóstico (clima, resultados, futuro).
 * El corpus no tiene datos predictivos.
 */
function detectarPrediccion(textoNormalizado: string): boolean {
  const patrones = [
    /\b(qu[eé]\s+tiempo|qu[eé]\s+clima|va\s+a\s+llover|va\s+a\s+hacer\s+(fr[íi]o|calor))\b.*\b(ma[ñn]ana|hoy|esta\s+semana|el\s+pr[oó]ximo)\b/,
    /\b(qui[eé]n\s+va\s+a\s+ganar|qui[eé]n\s+ganar[áa])\b/,
    /\b(predec[íi]me|pronostic(á|a)me)\b/
  ];
  return patrones.some((p) => p.test(textoNormalizado));
}

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remueve acentos para que "opinás" matchee con /opin(as|ás)/
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Punto de entrada principal: corre todos los detectores y devuelve
 * el primer match (o `bloqueado: false` si la pregunta es libre).
 */
export function chequearGuardrails(pregunta: string): ResultadoGuardrail {
  const norm = normalizar(pregunta);

  if (detectarOpinion(norm)) {
    return {
      bloqueado: true,
      motivo: "opinion_personal",
      respuesta:
        "No emito opiniones — soy un asistente informativo, no un comentarista político ni " +
        "un opinólogo. Mi función es darte datos públicos verificables. Si querés saber qué dice " +
        "la información oficial sobre un tema (presupuesto, normativa, contrataciones, autoridades), " +
        "preguntame de nuevo en clave factual: \"¿qué dice el presupuesto sobre X?\", \"¿quién es Y?\", " +
        "\"¿cómo se hace Z?\"."
    };
  }

  if (detectarConsejoLegalMedico(norm)) {
    return {
      bloqueado: true,
      motivo: "consejo_legal_o_medico",
      respuesta:
        "No puedo darte asesoramiento legal o médico — para eso necesitás consultar a un profesional " +
        "habilitado. Si el tema es administrativo del municipio, te puedo orientar sobre el trámite o la " +
        "normativa aplicable en términos generales. ¿Querés que te derive a algún módulo específico?"
    };
  }

  if (detectarPrediccion(norm)) {
    return {
      bloqueado: true,
      motivo: "prediccion",
      respuesta:
        "No tengo información predictiva (clima, resultados, pronósticos). Mi base son datos públicos " +
        "ya publicados por el municipio o por organismos oficiales. Si querés saber algo del estado actual " +
        "de un servicio o trámite, contame."
    };
  }

  return { bloqueado: false };
}
