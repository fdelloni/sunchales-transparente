/**
 * AUTO-GENERADO desde data/concejo/_indice.json (a partir de los 924 PDFs catalogados).
 * Última generación: 2026-05-03
 *
 * Este archivo expone los metadatos transformados de los PDFs descargados
 * del sitio del Concejo Municipal de Sunchales, organizados por categoría
 * con su año, mes (cuando aplica) y tamaño.
 *
 * Cuando la GitHub Action descargue PDFs nuevos y procese sus textos,
 * ejecuta scripts/indexar-resumenes-anuales.mjs y este archivo se regenera.
 */

export type ConcejoItem = {
  etiqueta: string;
  fechaPublicacion: string | null;
  url: string;
  tamanioBytes: number;
  anio?: number | null;
  mes?: number | null;
};

export type UcmHistorico = {
  ordenanzaNumero: string | null;
  anioOrdenanza: number | null;
  fechaPublicacion: string | null;
  url: string;
  tamanioBytes: number;
};

export type ActividadAnual = Record<number, Record<string, number>>;

export const totalesConcejo: Record<string, number> = {
  "boletines-bimestrales": 66,
  "resumenes-anuales": 14,
  "ejecucion-presupuestaria": 183,
  "movimiento-saldos": 123,
  "ucm": 30,
  "proyectos-en-tratamiento": 48,
  "proyectos-perdidos": 393,
  "iniciativas-ciudadanas": 10,
  "normativa-ambiental": 52,
  "programa-fortalecimiento": 3,
  "acceso-informacion-publica": 2
};

export const actividadAnual: ActividadAnual = {
  2026: { "boletines-bimestrales": 1, "resumenes-anuales": 1, "proyectos-en-tratamiento": 5, "programa-fortalecimiento": 1 },
  2025: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-en-tratamiento": 33, "proyectos-perdidos": 7, "programa-fortalecimiento": 1 },
  2024: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-en-tratamiento": 4, "proyectos-perdidos": 36, "programa-fortalecimiento": 1 },
  2023: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-perdidos": 59 },
  2022: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-perdidos": 54, "normativa-ambiental": 2 },
  2021: { "boletines-bimestrales": 4, "resumenes-anuales": 1, "proyectos-perdidos": 49 },
  2020: { "boletines-bimestrales": 3, "resumenes-anuales": 1, "proyectos-perdidos": 41 },
  2019: { "boletines-bimestrales": 4, "resumenes-anuales": 1, "proyectos-perdidos": 48 },
  2018: { "boletines-bimestrales": 4, "resumenes-anuales": 1, "proyectos-perdidos": 28 },
  2017: { "boletines-bimestrales": 4, "resumenes-anuales": 1, "proyectos-perdidos": 8 },
  2016: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-perdidos": 5 },
  2015: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-perdidos": 13 },
  2014: { "boletines-bimestrales": 5, "resumenes-anuales": 1, "proyectos-perdidos": 7 },
  2013: { "boletines-bimestrales": 4, "resumenes-anuales": 1, "proyectos-perdidos": 2 },
  2012: { "boletines-bimestrales": 1, "proyectos-perdidos": 1, "normativa-ambiental": 2 },
  2011: { "proyectos-perdidos": 1 },
  1999: { "normativa-ambiental": 1 },
  1995: { "normativa-ambiental": 1 }
};

/**
 * Histórico completo de Ordenanzas que actualizan el Valor de la UCM.
 * 30 ordenanzas desde 2011, ordenadas de más nueva a más antigua.
 */
export const ucmHistorico: UcmHistorico[] = [
  { ordenanzaNumero: "3281", anioOrdenanza: 2026, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5661.O 3281 2026.pdf", tamanioBytes: 644315 },
  { ordenanzaNumero: "3276", anioOrdenanza: 2026, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5616.O 3276 2026.pdf", tamanioBytes: 167006 },
  { ordenanzaNumero: null, anioOrdenanza: 2026, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.849.VALOR UCM 4-2026.pdf", tamanioBytes: 116794 },
  { ordenanzaNumero: "3248", anioOrdenanza: 2025, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5476.O 3248 2025.pdf", tamanioBytes: 175620 },
  { ordenanzaNumero: "3241", anioOrdenanza: 2025, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5473.O 3241 2025.pdf", tamanioBytes: 170718 },
  { ordenanzaNumero: "3227", anioOrdenanza: 2025, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.5183.O%203227%202025.pdf", tamanioBytes: 133340 },
  { ordenanzaNumero: "3220", anioOrdenanza: 2024, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5319.O 3220 2024.pdf", tamanioBytes: 146746 },
  { ordenanzaNumero: "3206", anioOrdenanza: 2024, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.5244.O 3206 2024.pdf", tamanioBytes: 151714 },
  { ordenanzaNumero: "3182", anioOrdenanza: 2024, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.5028.O%203182%202024.pdf", tamanioBytes: 148953 },
  { ordenanzaNumero: "3166", anioOrdenanza: 2024, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.4970.O%203166%202024.pdf", tamanioBytes: 152305 },
  { ordenanzaNumero: "3153", anioOrdenanza: 2023, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.4935.O%203153%202023.pdf", tamanioBytes: 134920 },
  { ordenanzaNumero: "3132", anioOrdenanza: 2023, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.4862.O%203132%202023.pdf", tamanioBytes: 134092 },
  { ordenanzaNumero: "3074", anioOrdenanza: 2022, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.4660.O%203074%202022.pdf", tamanioBytes: 179360 },
  { ordenanzaNumero: "3048", anioOrdenanza: 2022, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.4572.O%203048%202022.pdf", tamanioBytes: 147036 },
  { ordenanzaNumero: "2990", anioOrdenanza: 2022, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.4276.O 2990 2022.pdf", tamanioBytes: 402676 },
  { ordenanzaNumero: "2878", anioOrdenanza: 2020, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.3834.O 2878 2020 con anexos.pdf", tamanioBytes: 288803 },
  { ordenanzaNumero: "2796", anioOrdenanza: 2019, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.3426.O 2796 2019.pdf", tamanioBytes: 438558 },
  { ordenanzaNumero: "2754", anioOrdenanza: 2018, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.3804.O%202754%202018%20con%20anexos.pdf", tamanioBytes: 3713432 },
  { ordenanzaNumero: "2739", anioOrdenanza: 2018, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.3069.O 2739 2018.pdf", tamanioBytes: 2681833 },
  { ordenanzaNumero: "2687", anioOrdenanza: 2017, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.2759.O 2687 2017 con anexos.pdf", tamanioBytes: 4566514 },
  { ordenanzaNumero: "2610", anioOrdenanza: 2016, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.2451.O 2610 2016.pdf", tamanioBytes: 5378365 },
  { ordenanzaNumero: "2574", anioOrdenanza: 2016, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.2220.O 2574 2016.pdf", tamanioBytes: 6348118 },
  { ordenanzaNumero: "2535", anioOrdenanza: 2015, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.2003.O 2535 2015.pdf", tamanioBytes: 696184 },
  { ordenanzaNumero: "2468", anioOrdenanza: 2015, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/link.1666.O 2468 2015.pdf", tamanioBytes: 440837 },
  { ordenanzaNumero: "2409", anioOrdenanza: 2014, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2409 2014..pdf", tamanioBytes: 119962 },
  { ordenanzaNumero: "2342", anioOrdenanza: 2013, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2342 2013.pdf", tamanioBytes: 8994341 },
  { ordenanzaNumero: "2291", anioOrdenanza: 2013, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2291 2013.pdf", tamanioBytes: 1622806 },
  { ordenanzaNumero: "2290", anioOrdenanza: 2013, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2290 2013.pdf", tamanioBytes: 12849 },
  { ordenanzaNumero: "2253", anioOrdenanza: 2012, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2253 2012.pdf", tamanioBytes: 9890 },
  { ordenanzaNumero: "2139", anioOrdenanza: 2011, fechaPublicacion: null, url: "https://concejosunchales.gob.ar/Archivos/Link/O 2139 2011 .PDF", tamanioBytes: 47938 }
];

/**
 * Helper: total de PDFs en el repo
 */
export function totalPdfsConcejo(): number {
  return Object.values(totalesConcejo).reduce((s, n) => s + n, 0);
}

/**
 * Helper: serie temporal de actividad por año (para gráfico)
 */
export function actividadPorAnio(): Array<{ anio: number; total: number }> {
  return Object.entries(actividadAnual)
    .map(([anio, cats]) => ({
      anio: parseInt(anio, 10),
      total: Object.values(cats).reduce((s, n) => s + n, 0)
    }))
    .sort((a, b) => a.anio - b.anio);
}
