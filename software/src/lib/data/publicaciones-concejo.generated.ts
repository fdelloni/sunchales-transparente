// AUTO-GENERADO por scripts/scrapear-publicaciones-concejo.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-publicaciones-concejo
//
// Fuentes oficiales:
//   https://concejosunchales.gob.ar/boletin-informativo-bimestral.aspx
//   https://concejosunchales.gob.ar/resumen-anual.aspx
//
// Última sincronización: 2026-05-15T11:15:18.064Z
// Boletines bimestrales: 66
// Resúmenes anuales: 14

export type TipoPublicacionConcejo = "boletin_bimestral" | "resumen_anual";

export type PublicacionConcejo = {
  /** "boletin_bimestral" | "resumen_anual". */
  tipo: TipoPublicacionConcejo;
  /** Identificador estable que usa el sitio del Concejo. */
  idPublicacion: number;
  titulo: string;
  /** ISO 8601 (YYYY-MM-DD) — fecha de publicación según el Concejo. */
  fechaPublicacion: string | null;
  urlDetalle: string | null;
  urlPdf: string | null;
};

export const publicacionesConcejo: PublicacionConcejo[] = [
  {
    "tipo": "resumen_anual",
    "idPublicacion": 5658,
    "titulo": "Resumen Anual 2025",
    "fechaPublicacion": "2026-03-20",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=5658",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5658.Resumen Legislativo Anual 2025.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5615,
    "titulo": "Boletín informativo correspondiente al período Noviembre - Diciembre",
    "fechaPublicacion": "2026-01-19",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5615",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5615.Boletín Informativo Período Noviembre Diciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5565,
    "titulo": "Boletín informativo correspondiente al período Septiembre - Octubre",
    "fechaPublicacion": "2025-11-25",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5565",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5565.Boletín Informativo Período Septiembre - Octubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5532,
    "titulo": "Boletín informativo correspondiente al período Julio - Agosto",
    "fechaPublicacion": "2025-09-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5532",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5532.Boletín Informativo Período Julio - Agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5443,
    "titulo": "Boletín informativo correspondiente al período Mayo - Junio",
    "fechaPublicacion": "2025-07-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5443",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5443.Boletín Informativo Período Mayo - Junio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5434,
    "titulo": "Boletín informativo correspondiente al período Enero - Abril",
    "fechaPublicacion": "2025-06-30",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5434",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5434.Boletín Informativo Período Enero - Abril (1).pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 5325,
    "titulo": "Resumen Anual 2024",
    "fechaPublicacion": "2025-02-04",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=5325",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5325.Resumen Anual 2024.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5324,
    "titulo": "Boletín informativo correspondiente al período Noviembre - Diciembre",
    "fechaPublicacion": "2025-01-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5324",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5324.Boletín Informativo Período noviembre - diciembre 2024.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5289,
    "titulo": "Boletín informativo correspondiente al período Septiembre - Octubre",
    "fechaPublicacion": "2024-11-27",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5289",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5289.Boletín Informativo Período septiembre - octubre 2024.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5246,
    "titulo": "Boletín informativo correspondiente al período Julio - Agosto",
    "fechaPublicacion": "2024-10-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5246",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5246.Boletín Informativo Período julio - agosto 2024.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5172,
    "titulo": "Boletín informativo correspondiente al período Mayo - Junio",
    "fechaPublicacion": "2024-07-24",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5172",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5172.Boletín Informativo Período mayo - junio 2024.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5121,
    "titulo": "Boletín informativo correspondiente al período Enero - Abril",
    "fechaPublicacion": "2024-05-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5121",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5121.Boletín Informativo Período enero - abril 2024.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 5019,
    "titulo": "Resumen Anual 2023",
    "fechaPublicacion": "2024-02-20",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=5019",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5019.Resumen Anual 2023.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 5010,
    "titulo": "Boletín informativo correspondiente al período Noviembre - Diciembre",
    "fechaPublicacion": "2024-01-11",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=5010",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.5010.Boletín Informativo Noviembre - Diciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4974,
    "titulo": "Boletín informativo correspondiente al período Septiembre - Octubre",
    "fechaPublicacion": "2023-11-12",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4974",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4974.Boletín Informativo Septiembre - Octubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4875,
    "titulo": "Boletín informativo correspondiente al período Julio - Agosto",
    "fechaPublicacion": "2023-09-14",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4875",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4875.Boletín Informativo Julio - Agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4860,
    "titulo": "Boletín informativo correspondiente al período Mayo - Junio",
    "fechaPublicacion": "2023-07-11",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4860",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4860.Boletín Informativo Mayo - Junio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4834,
    "titulo": "Boletín informativo correspondiente al período Enero - Abril",
    "fechaPublicacion": "2023-05-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4834",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4834.Boletín Informativo Enero Abril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 4671,
    "titulo": "Resumen Anual 2022",
    "fechaPublicacion": "2023-02-28",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=4671",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4671.ResumenAnual2022.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4644,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre",
    "fechaPublicacion": "2023-02-03",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4644",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4644.BoletinNoviembre-Diciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4616,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre",
    "fechaPublicacion": "2022-11-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4616",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4616.BoletinSeptiembre-Octubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4615,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto",
    "fechaPublicacion": "2022-09-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4615",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4615.BoletinJulio-Agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4429,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio",
    "fechaPublicacion": "2022-07-11",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4429",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4429.BoletinMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4385,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril 2022",
    "fechaPublicacion": "2022-05-30",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4385",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4385.BoletinMarzoAbril2022 .pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 4291,
    "titulo": "Resumen Anual 2021",
    "fechaPublicacion": "2022-01-31",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=4291",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4291.Informe de Gestion 2021 Final.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4267,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre",
    "fechaPublicacion": "2022-01-03",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4267",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4267.BoletínNoviembreDiciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4215,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre 2021",
    "fechaPublicacion": "2021-11-09",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4215",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4215.BoletinSeptiembreOctubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4166,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto 2021",
    "fechaPublicacion": "2021-09-29",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4166",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4166.BoletínJulioAgosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4085,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio 2021",
    "fechaPublicacion": "2021-07-06",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4085",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4085.BoletínMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 4084,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril y Sesiones Extraordinarias de inicio de año 2021",
    "fechaPublicacion": "2021-05-03",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=4084",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4084.BoletínMarzoAbril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 4082,
    "titulo": "Resumen Anual 2020",
    "fechaPublicacion": "2021-02-01",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=4082",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.4082.Resumen Anual 2020.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3841,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre de 2020",
    "fechaPublicacion": "2021-01-07",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3841",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3841.BoletínNoviembreDiciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3783,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre de 2020",
    "fechaPublicacion": "2020-11-09",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3783",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3783.BoletinSeptiembreOctubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3714,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto de 2020",
    "fechaPublicacion": "2020-09-02",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3714",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3714.BoletinJulioAgosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3682,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio de 2020",
    "fechaPublicacion": "2020-07-28",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3682",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3682.BoletinMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3681,
    "titulo": "Boletín informativo correspondiente a Marzo - Abril de 2020 y Sesiones Extraordinarias de inicio de año",
    "fechaPublicacion": "2020-07-27",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3681",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3681.BoletinMarzoAbril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 3538,
    "titulo": "Resumen Anual 2019",
    "fechaPublicacion": "2020-01-20",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=3538",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3538.Resumen2019.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3537,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre de 2019",
    "fechaPublicacion": "2020-01-14",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3537",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3537.BoletínNoviembreDiciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3476,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre de 2019",
    "fechaPublicacion": "2019-11-05",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3476",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3476.BoletínSeptiembreOctubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3407,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto de 2019",
    "fechaPublicacion": "2019-09-04",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3407",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3407.BoletínJulioAgosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3343,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio de 2019",
    "fechaPublicacion": "2019-07-16",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3343",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3343.BoletínMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3293,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril de 2019 / Sesiones Extraordinarias de inicio de año",
    "fechaPublicacion": "2019-05-16",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3293",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3293.BoletínMarzoAbril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 3211,
    "titulo": "Resumen Anual 2018",
    "fechaPublicacion": "2019-01-21",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=3211",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3211.Resumen anual 2018.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3197,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre de 2018",
    "fechaPublicacion": "2019-01-08",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3197",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3197.BoletinNoviembreDiciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3134,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre de 2018",
    "fechaPublicacion": "2018-11-06",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3134",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3134.BoletínSeptiembreOctubre2018.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 3062,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto de 2018",
    "fechaPublicacion": "2018-09-17",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=3062",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.3062.BoletínJulioAgosto2018.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2998,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio de 2018",
    "fechaPublicacion": "2018-07-12",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2998",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2998.BoletinMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2951,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril de 2018",
    "fechaPublicacion": "2018-05-29",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2951",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2951.Boletín informativo bimestral Marzo - Abril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 2790,
    "titulo": "Resumen Anual 2017",
    "fechaPublicacion": "2018-01-08",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=2790",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2790.Resumen2017.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2788,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre de 2017",
    "fechaPublicacion": "2018-01-02",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2788",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2788.BoletinNoviembreDiciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2737,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre de 2017",
    "fechaPublicacion": "2017-11-13",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2737",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2737.BoletinSeptiembreOctubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2678,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto de 2017",
    "fechaPublicacion": "2017-09-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2678",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2678.BoletínJulioAgosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2621,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio de 2017",
    "fechaPublicacion": "2017-07-05",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2621",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2621.BoletínMayoJunio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2620,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril de 2017 / Sesiones Extraordinarias de inicio de año",
    "fechaPublicacion": "2017-05-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2620",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2620.BoletínMarzoAbril.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2467,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre de 2016",
    "fechaPublicacion": "2017-01-29",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2467",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2467.Boletín informativo noviembre-diciembre.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 2468,
    "titulo": "Resumen Anual 2016",
    "fechaPublicacion": "2017-01-29",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=2468",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2468.Resumen anual 2016.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2410,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre de 2016",
    "fechaPublicacion": "2016-11-21",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2410",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2410.Boletin informativo septiembre-octubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2250,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto de 2016",
    "fechaPublicacion": "2016-09-19",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2250",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2250.Boletín informativo julio-agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2172,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio de 2016",
    "fechaPublicacion": "2016-07-14",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2172",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2172.Boletín informativo mayo-junio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2127,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril de 2016",
    "fechaPublicacion": "2016-05-12",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2127",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2127.Boletín bimestral marzo-abril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 2027,
    "titulo": "Resumen Anual 2015",
    "fechaPublicacion": "2016-01-12",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=2027",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2027.Resumen anual 2015.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 2020,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre 2015",
    "fechaPublicacion": "2016-01-05",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=2020",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.2020.Boletín bimestral noviembre - diciembre docx.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1980,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre 2015",
    "fechaPublicacion": "2015-11-16",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1980",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1980.Boletin bimestral septiembre - octubre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1875,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto 2015",
    "fechaPublicacion": "2015-09-09",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1875",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1875.Boletín bimestral julio - agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1816,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio 2015",
    "fechaPublicacion": "2015-07-14",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1816",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1816.Boletín bimestral mayo-junio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1746,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril 2015",
    "fechaPublicacion": "2015-05-11",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1746",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1746.Boletín bimestral marzo- abril 2015.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 1661,
    "titulo": "Resumen Anual 2014",
    "fechaPublicacion": "2015-01-20",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=1661",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1661.Resumen Anual 2014.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1660,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre 2014",
    "fechaPublicacion": "2015-01-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1660",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1660.Boletín Noviembre Diciembre.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 1612,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre 2014",
    "fechaPublicacion": "2014-11-21",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=1612",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/link.1612.Boletin Septiembre Octubre 2014.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 876,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto 2014",
    "fechaPublicacion": "2014-09-15",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=876",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin Julio Agosto.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 875,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio 2014",
    "fechaPublicacion": "2014-07-23",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=875",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin bimestral Mayo Junio.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 874,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril 2014",
    "fechaPublicacion": "2014-05-19",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=874",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin bimestral Marzo Abril.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 878,
    "titulo": "Resumen Anual 2013",
    "fechaPublicacion": "2014-01-24",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=878",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin Anual 2013.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 873,
    "titulo": "Boletín informativo correspondiente al bimestre Noviembre - Diciembre 2013",
    "fechaPublicacion": "2014-01-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=873",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin bimestral NOVIEMBRE-DICIEMBRE.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 872,
    "titulo": "Boletín informativo correspondiente al bimestre Septiembre - Octubre 2013",
    "fechaPublicacion": "2013-11-12",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=872",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin septiembre - octubre 2013.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 871,
    "titulo": "Boletín informativo correspondiente al bimestre Julio - Agosto 2013",
    "fechaPublicacion": "2013-09-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=871",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Boletin julio-agosto_2013.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 870,
    "titulo": "Boletín informativo correspondiente al bimestre Mayo - Junio 2013",
    "fechaPublicacion": "2013-07-05",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=870",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Resumen mayo-junio 2013.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 869,
    "titulo": "Boletín informativo correspondiente al bimestre Marzo - Abril 2013",
    "fechaPublicacion": "2013-05-10",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=869",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Resumen MAR-ABR 2013.pdf"
  },
  {
    "tipo": "resumen_anual",
    "idPublicacion": 877,
    "titulo": "Resumen Anual 2012",
    "fechaPublicacion": "2013-01-09",
    "urlDetalle": "https://concejosunchales.gob.ar/resumen-anual-detalle.aspx?id=877",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/Resumen_anual_del_Concejo_Municipal_de_Sunchales_2012.pdf"
  },
  {
    "tipo": "boletin_bimestral",
    "idPublicacion": 868,
    "titulo": "Boletín informativo correspondiente al bimestre Octubre - Noviembre 2012",
    "fechaPublicacion": "2012-12-24",
    "urlDetalle": "https://concejosunchales.gob.ar/boletin-informativo-bimestral-detalle.aspx?id=868",
    "urlPdf": "https://concejosunchales.gob.ar/Archivos/Link/BOLETIN BIMESTRAL octubre-noviembre2012.pdf"
  }
];

export const publicacionesConcejoMeta = {
  fuenteBoletines: "https://concejosunchales.gob.ar/boletin-informativo-bimestral.aspx",
  fuenteResumenes: "https://concejosunchales.gob.ar/resumen-anual.aspx",
  sincronizadoEl: "2026-05-15T11:15:18.064Z",
  totalBoletines: 66,
  totalResumenes: 14,
} as const;
