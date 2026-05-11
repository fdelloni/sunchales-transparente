/**
 * EVOLUCIÓN HISTÓRICA DE LA NÓMINA MUNICIPAL — Sunchales.
 *
 * Fuente única: página oficial del municipio
 * https://sunchales.gob.ar/municipio-transparente/nomina-de-personal-no-permanente/
 *
 * Esa página linkea 5 PDFs históricos (verificados el 2026-05-10):
 *
 *   2024-08 → personal_no_permanente_agosto_2024.pdf
 *   2024-10 → personal_no_permanente_octubre_2024.pdf
 *   2025-01 → personal_no_permanente_enero_2025.pdf
 *   2025-09 → nomina_pagina_web.pdf
 *   2026-04 → Nomina-Pagina-Web-2026-04.pdf
 *
 * CAMBIO METODOLÓGICO DOCUMENTADO:
 *   - Los PDFs anteriores a septiembre 2025 publicaban ÚNICAMENTE el listado de
 *     "personal no permanente" (los Transitorios del nuevo formato).
 *   - Desde 2025-09 el municipio publica la nómina COMPLETA, con tres
 *     categorías: Personal de Planta (Permanente + Retiro Especial),
 *     Personal Transitorio y Contratación de Servicios.
 *
 * Esto se verifica cruzando nombres: los listados 2024-08, 2024-10 y 2025-01
 * coinciden persona por persona con la sub-lista "Transitorios" del PDF nuevo.
 * Por tanto la serie de Transitorios es comparable a lo largo de los 5
 * períodos; las otras series (Planta Permanente, Contratados, Retiro Especial,
 * Total general) sólo existen desde 2025-09.
 *
 * NO INTERPOLAMOS valores entre meses sin PDF. Los puntos faltantes quedan en
 * blanco; cualquier curva entre dos puntos NO es trayectoria mensual real.
 */

export type PuntoEvolucion = {
  /** Período YYYY-MM. */
  periodo: string;
  /** Etiqueta legible. */
  label: string;
  /** URL del PDF oficial. */
  urlPdf: string;
  /** Personal de planta permanente. null si no figura en ese PDF. */
  plantaPermanente: number | null;
  /** Retiro Especial (jubilados con haber). null si no figura. */
  retiroEspecial: number | null;
  /** Personal Transitorio (vinculación temporaria). */
  transitorios: number;
  /** Contratación de Servicios. null si no figura. */
  contratados: number | null;
  /** Total de personas vinculadas al municipio. null si no es comparable. */
  total: number | null;
};

export const evolucionNomina: PuntoEvolucion[] = [
  {
    periodo: "2024-08",
    label: "Agosto 2024",
    urlPdf:
      "https://sunchales.gob.ar/wp-content/uploads/2025/06/personal_no_permanente_agosto_2024.pdf",
    plantaPermanente: null,
    retiroEspecial: null,
    transitorios: 72,
    contratados: null,
    total: null,
  },
  {
    periodo: "2024-10",
    label: "Octubre 2024",
    urlPdf:
      "https://sunchales.gob.ar/wp-content/uploads/2025/06/personal_no_permanente_octubre_2024.pdf",
    plantaPermanente: null,
    retiroEspecial: null,
    transitorios: 81,
    contratados: null,
    total: null,
  },
  {
    periodo: "2025-01",
    label: "Enero 2025",
    urlPdf:
      "https://sunchales.gob.ar/wp-content/uploads/2025/06/personal_no_permanente_enero_2025.pdf",
    plantaPermanente: null,
    retiroEspecial: null,
    transitorios: 80,
    contratados: null,
    total: null,
  },
  {
    periodo: "2025-09",
    label: "Septiembre 2025",
    urlPdf:
      "https://sunchales.gob.ar/wp-content/uploads/2025/09/nomina_pagina_web.pdf",
    plantaPermanente: 266,
    retiroEspecial: 9,
    transitorios: 86,
    contratados: 107,
    total: 468,
  },
  {
    periodo: "2026-04",
    label: "Abril 2026",
    urlPdf:
      "https://sunchales.gob.ar/wp-content/uploads/2026/04/Nomina-Pagina-Web-2026-04.pdf",
    plantaPermanente: 260,
    retiroEspecial: 10,
    transitorios: 93,
    contratados: 102,
    total: 465,
  },
];

export const fuenteEvolucion = {
  paginaIndice:
    "https://sunchales.gob.ar/municipio-transparente/nomina-de-personal-no-permanente/",
  fechaConsulta: "2026-05-10",
  notaMetodologica:
    "Los PDFs anteriores a septiembre 2025 publicaban únicamente el listado de personal no permanente (equivalente a la categoría Transitorios del formato actual). El cruce de nombres entre el PDF de enero 2025 y la lista de Transitorios de abril 2026 confirma la equivalencia, por lo que la serie de Transitorios es comparable a lo largo de los 5 períodos. Las demás series (Planta Permanente, Contratados, Retiro Especial, Total general) sólo existen desde septiembre 2025, cuando la Municipalidad amplió su transparencia activa. No se interpolan valores entre meses sin PDF.",
} as const;
