/**
 * AUTO-GENERADO desde análisis NLP del Digesto oficial con Gemini 2.5 Flash.
 * Fecha: 2026-05-05
 *
 * Estado computado a partir de las relaciones EXPLÍCITAS (deroga/modifica) detectadas
 * en el texto de cada norma. Las relaciones tácitas NO se incluyen.
 *
 * IMPORTANTE: Esta clasificación es ALGORÍTMICA y se sustenta en la cita textual
 * de la norma posterior que afecta a la anterior. NO reemplaza un análisis legal.
 *
 * Para regenerar: ejecutar `node scripts/analizar-derogaciones-gemini.mjs`
 */

export type EstadoVigencia = "vigente" | "modificada" | "derogada";

export const estadosNormas: Record<number, EstadoVigencia> = {"58":"derogada","63":"modificada","209":"modificada","248":"derogada","307":"derogada","386":"derogada","397":"derogada","437":"derogada","439":"modificada","441":"derogada","637":"derogada","667":"derogada","685":"derogada","730":"derogada","765":"modificada","773":"modificada","828":"modificada","892":"derogada","918":"modificada","962":"derogada","966":"derogada","969":"derogada","982":"derogada","1034":"modificada","1035":"derogada","1074":"derogada","1131":"derogada"};

export const conteoEstados: Record<EstadoVigencia, number> = {
  vigente: 937,
  modificada: 8,
  derogada: 19
};

export function estadoDeNorma(id: number): EstadoVigencia {
  return estadosNormas[id] ?? "vigente";
}
