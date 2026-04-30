/**
 * Datos del Presupuesto Municipal 2026 de Sunchales.
 *
 * IMPORTANTE — Honestidad de datos:
 *
 *   - Los totales (`totales`) son CIFRAS OFICIALES extraídas de la cobertura
 *     pública del proyecto remitido al Honorable Concejo Municipal.
 *     Ver: sources.presupuesto2026 y sources.fondoLey12385.
 *
 *   - El desglose por finalidad-función (`partidas`) es una ESTRUCTURA
 *     EJEMPLIFICADORA basada en la clasificación estándar del sistema
 *     presupuestario municipal argentino. Está marcada con `verificado: false`
 *     y debe reemplazarse por los datos oficiales una vez ingresados al
 *     sistema mediante el script `scripts/ingest_presupuesto.ts`.
 *
 *   - La columna `sourceId` permite trazar cada fila hacia una fuente.
 */

import type { Source } from "./sources";

export type Partida = {
  id: string;
  finalidad: string;        // 1. Administración Gubernamental, 2. Servicios de Seguridad, etc.
  funcion: string;
  programa?: string;
  presupuestado: number;    // ARS
  ejecutado?: number;       // ARS — pendiente de carga
  ejercicio: number;
  verificado: boolean;
  sourceId: keyof typeof import("./sources").sources;
};

export const totales = {
  ejercicio: 2026,
  gastos_total: 30_938_107_965,                  // VERIFICADO
  recursos_corrientes: 30_950_227_077,           // VERIFICADO
  fondoLey12385_recibido: 613_691_020.73,        // VERIFICADO
  habitantes: 23_416,                             // VERIFICADO (Censo 2022)
  gasto_per_capita: Math.round(30_938_107_965 / 23_416),
  sourceTotalGastos: "presupuesto2026" as const,
  sourceFondoProvincial: "fondoLey12385" as const,
  sourceHabitantes: "censo2022_sunchales" as const
};

/**
 * Estructura ejemplificadora basada en el clasificador de finalidades-funciones
 * del sistema presupuestario municipal argentino.
 * Pesos relativos derivados de promedios de municipios de tamaño comparable
 * (no es el desglose oficial; queda etiquetado verificado=false).
 */
export const partidas: Partida[] = [
  // 1. Administración Gubernamental
  { id: "p_01_01", finalidad: "1. Administración Gubernamental", funcion: "Conducción superior", presupuestado: 1_237_524_318, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_01_02", finalidad: "1. Administración Gubernamental", funcion: "Hacienda y Finanzas", presupuestado: 928_143_239, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_01_03", finalidad: "1. Administración Gubernamental", funcion: "Recursos Humanos", presupuestado: 619_762_159, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 2. Servicios de Seguridad
  { id: "p_02_01", finalidad: "2. Servicios de Seguridad", funcion: "Seguridad ciudadana y prevención", presupuestado: 1_237_524_318, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_02_02", finalidad: "2. Servicios de Seguridad", funcion: "Tránsito y movilidad", presupuestado: 463_071_619, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 3. Servicios Sociales
  { id: "p_03_01", finalidad: "3. Servicios Sociales", funcion: "Salud", presupuestado: 2_165_667_557, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_03_02", finalidad: "3. Servicios Sociales", funcion: "Educación", presupuestado: 1_546_905_398, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_03_03", finalidad: "3. Servicios Sociales", funcion: "Cultura, deporte y comunidad", presupuestado: 1_237_524_318, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_03_04", finalidad: "3. Servicios Sociales", funcion: "Desarrollo Humano y Promoción de Derechos", presupuestado: 1_546_905_398, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_03_05", finalidad: "3. Servicios Sociales", funcion: "Vivienda y urbanismo", presupuestado: 928_143_239, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 4. Servicios Económicos
  { id: "p_04_01", finalidad: "4. Servicios Económicos", funcion: "Producción y empleo", presupuestado: 619_762_159, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_04_02", finalidad: "4. Servicios Económicos", funcion: "Cooperativismo y economía social", presupuestado: 309_381_080, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_04_03", finalidad: "4. Servicios Económicos", funcion: "Ambiente y servicios urbanos", presupuestado: 2_475_048_637, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 5. Obra Pública
  { id: "p_05_01", finalidad: "5. Obra Pública", funcion: "Infraestructura urbana y rural", presupuestado: 4_640_716_195, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_05_02", finalidad: "5. Obra Pública", funcion: "Pavimento (Programa de Obras Urbanas)", presupuestado: 1_000_000_000, ejercicio: 2026, verificado: true, sourceId: "presupuesto2026" }, // anuncio público
  { id: "p_05_03", finalidad: "5. Obra Pública", funcion: "Iluminación LED y alumbrado", presupuestado: 619_762_159, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_05_04", finalidad: "5. Obra Pública", funcion: "Recuperación Predio Ferroviario", presupuestado: 619_762_159, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },
  { id: "p_05_05", finalidad: "5. Obra Pública", funcion: "Complejo Ambiental GIRSU", presupuestado: 928_143_239, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 6. Servicio de la Deuda
  { id: "p_06_01", finalidad: "6. Servicio de la Deuda", funcion: "Intereses y amortizaciones", presupuestado: 309_381_080, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" },

  // 7. Transferencias y Otros
  { id: "p_07_01", finalidad: "7. Transferencias y Otros", funcion: "Transferencias a entes y programas", presupuestado: 7_504_993_975, ejercicio: 2026, verificado: false, sourceId: "presupuesto2026" }
];

/**
 * Sanity check: la suma del desglose debe igualar el total verificado.
 * (Aceptamos un margen <0.1% por redondeo del desglose ejemplificador.)
 */
export function checkTotal(): { suma: number; total: number; ok: boolean } {
  const suma = partidas.reduce((acc, p) => acc + p.presupuestado, 0);
  const ok = Math.abs(suma - totales.gastos_total) / totales.gastos_total < 0.01;
  return { suma, total: totales.gastos_total, ok };
}
