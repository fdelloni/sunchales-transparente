// AUTO-GENERADO por scripts/scrapear-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-remuneraciones
//
// Fuente oficial:
// https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/
//
// Última sincronización: 2026-05-16T10:13:32.024Z
// Total PDFs detectados: 140
// Cobertura: 2014 – 2026

export type RemuneracionPdf = {
  /** Identificador estable del período. Formato YYYY-MM o YYYY-MM-SAC. "desconocido" si no se pudo parsear. */
  periodo: string;
  /** Año (calendario) si pudo extraerse del filename. */
  anio: number | null;
  /** Mes (1-12) si pudo extraerse del filename. */
  mes: number | null;
  /** True si el PDF corresponde al SAC (medio aguinaldo). */
  sac: boolean;
  /** Etiqueta legible para mostrar en UI. */
  label: string;
  /** URL pública directa al PDF en sunchales.gob.ar. */
  urlPdf: string;
};

export const remuneracionesPdfs: RemuneracionPdf[] = [
  {
    "periodo": "2026-03",
    "anio": 2026,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/04/MARZO-2026.pdf"
  },
  {
    "periodo": "2026-02",
    "anio": 2026,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/04/FEBRERO-2026.pdf"
  },
  {
    "periodo": "2026-01",
    "anio": 2026,
    "mes": 1,
    "sac": false,
    "label": "Enero 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/02/Sueldo-Funcionarios-01-2026.pdf"
  },
  {
    "periodo": "2025-12",
    "anio": 2025,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/02/Sueldo-Funcionario-12-2025.pdf"
  },
  {
    "periodo": "2025-11",
    "anio": 2025,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/12/2025-11-sueldos-funcionarios.pdf"
  },
  {
    "periodo": "2025-10",
    "anio": 2025,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/11/sueldos-funcionarios-10-2025.pdf"
  },
  {
    "periodo": "2025-09",
    "anio": 2025,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/10/2025_09_sueldos_funcionarios.pdf"
  },
  {
    "periodo": "2025-08",
    "anio": 2025,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/10/2025_08_sueldos_funcionarios.pdf"
  },
  {
    "periodo": "2025-07",
    "anio": 2025,
    "mes": 7,
    "sac": false,
    "label": "Julio 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-07-sueldos-funcionarios.pdf"
  },
  {
    "periodo": "2025-06",
    "anio": 2025,
    "mes": 6,
    "sac": false,
    "label": "Junio 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-06-sueldos-funcionarios.pdf"
  },
  {
    "periodo": "2025-06-SAC",
    "anio": 2025,
    "mes": 6,
    "sac": true,
    "label": "Junio 2025 — SAC",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-06-SAC-sueldos-funcionarios.pdf"
  },
  {
    "periodo": "2025-05",
    "anio": 2025,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-05-sueldos-funcionarios.pdf"
  },
  {
    "periodo": "2025-04",
    "anio": 2025,
    "mes": 4,
    "sac": false,
    "label": "Abril 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2025.pdf"
  },
  {
    "periodo": "2025-03",
    "anio": 2025,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2025.pdf"
  },
  {
    "periodo": "2025-02",
    "anio": 2025,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2025.pdf"
  },
  {
    "periodo": "2025-01",
    "anio": 2025,
    "mes": 1,
    "sac": false,
    "label": "Enero 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2025.pdf"
  },
  {
    "periodo": "2024-12",
    "anio": 2024,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2024.pdf"
  },
  {
    "periodo": "2024-12",
    "anio": 2024,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2024.pdf"
  },
  {
    "periodo": "2024-11",
    "anio": 2024,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2024.pdf"
  },
  {
    "periodo": "2024-10",
    "anio": 2024,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2024.pdf"
  },
  {
    "periodo": "2024-09",
    "anio": 2024,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2024.pdf"
  },
  {
    "periodo": "2024-08",
    "anio": 2024,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2024.pdf"
  },
  {
    "periodo": "2024-07",
    "anio": 2024,
    "mes": 7,
    "sac": false,
    "label": "Julio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2024.pdf"
  },
  {
    "periodo": "2024-06",
    "anio": 2024,
    "mes": 6,
    "sac": false,
    "label": "Junio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2024.pdf"
  },
  {
    "periodo": "2024-06",
    "anio": 2024,
    "mes": 6,
    "sac": false,
    "label": "Junio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2024.pdf"
  },
  {
    "periodo": "2024-05",
    "anio": 2024,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2024.pdf"
  },
  {
    "periodo": "2024-04",
    "anio": 2024,
    "mes": 4,
    "sac": false,
    "label": "Abril 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2024.pdf"
  },
  {
    "periodo": "2024-03",
    "anio": 2024,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2024.pdf"
  },
  {
    "periodo": "2024-02",
    "anio": 2024,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2024.pdf"
  },
  {
    "periodo": "2024-01",
    "anio": 2024,
    "mes": 1,
    "sac": false,
    "label": "Enero 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2024.pdf"
  },
  {
    "periodo": "2023-12",
    "anio": 2023,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2023.pdf"
  },
  {
    "periodo": "2023-11",
    "anio": 2023,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2023.pdf"
  },
  {
    "periodo": "2023-10",
    "anio": 2023,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2023.pdf"
  },
  {
    "periodo": "2023-09",
    "anio": 2023,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2023.pdf"
  },
  {
    "periodo": "2023-08",
    "anio": 2023,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2023.pdf"
  },
  {
    "periodo": "2023-07",
    "anio": 2023,
    "mes": 7,
    "sac": false,
    "label": "Julio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2023.pdf"
  },
  {
    "periodo": "2023-06",
    "anio": 2023,
    "mes": 6,
    "sac": false,
    "label": "Junio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2023.pdf"
  },
  {
    "periodo": "2023-06",
    "anio": 2023,
    "mes": 6,
    "sac": false,
    "label": "Junio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2023.pdf"
  },
  {
    "periodo": "2023-05",
    "anio": 2023,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2023.pdf"
  },
  {
    "periodo": "2023-04",
    "anio": 2023,
    "mes": 4,
    "sac": false,
    "label": "Abril 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2023.pdf"
  },
  {
    "periodo": "2023-03",
    "anio": 2023,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2023.pdf"
  },
  {
    "periodo": "2023-02",
    "anio": 2023,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2023.pdf"
  },
  {
    "periodo": "2023-01",
    "anio": 2023,
    "mes": 1,
    "sac": false,
    "label": "Enero 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2023.pdf"
  },
  {
    "periodo": "2022-12",
    "anio": 2022,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2022.pdf"
  },
  {
    "periodo": "2022-11",
    "anio": 2022,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2022.pdf"
  },
  {
    "periodo": "2022-10",
    "anio": 2022,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2022.pdf"
  },
  {
    "periodo": "2022-09",
    "anio": 2022,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2022.pdf"
  },
  {
    "periodo": "2022-08",
    "anio": 2022,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2022.pdf"
  },
  {
    "periodo": "2022-07",
    "anio": 2022,
    "mes": 7,
    "sac": false,
    "label": "Julio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2022.pdf"
  },
  {
    "periodo": "2022-06",
    "anio": 2022,
    "mes": 6,
    "sac": false,
    "label": "Junio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2022.pdf"
  },
  {
    "periodo": "2022-06",
    "anio": 2022,
    "mes": 6,
    "sac": false,
    "label": "Junio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2022.pdf"
  },
  {
    "periodo": "2022-05",
    "anio": 2022,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2022.pdf"
  },
  {
    "periodo": "2022-04",
    "anio": 2022,
    "mes": 4,
    "sac": false,
    "label": "Abril 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2022.pdf"
  },
  {
    "periodo": "2022-03",
    "anio": 2022,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2022.pdf"
  },
  {
    "periodo": "2022-02",
    "anio": 2022,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2022.pdf"
  },
  {
    "periodo": "2022-01",
    "anio": 2022,
    "mes": 1,
    "sac": false,
    "label": "Enero 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2022.pdf"
  },
  {
    "periodo": "2021-12",
    "anio": 2021,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2021.pdf"
  },
  {
    "periodo": "2021-12",
    "anio": 2021,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2021.pdf"
  },
  {
    "periodo": "2021-11",
    "anio": 2021,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2021.pdf"
  },
  {
    "periodo": "2021-10",
    "anio": 2021,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2021.pdf"
  },
  {
    "periodo": "2021-09",
    "anio": 2021,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2021.pdf"
  },
  {
    "periodo": "2021-08",
    "anio": 2021,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2021.pdf"
  },
  {
    "periodo": "2021-07",
    "anio": 2021,
    "mes": 7,
    "sac": false,
    "label": "Julio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2021.pdf"
  },
  {
    "periodo": "2021-06",
    "anio": 2021,
    "mes": 6,
    "sac": false,
    "label": "Junio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2021.pdf"
  },
  {
    "periodo": "2021-06",
    "anio": 2021,
    "mes": 6,
    "sac": false,
    "label": "Junio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2021.pdf"
  },
  {
    "periodo": "2021-05",
    "anio": 2021,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2021.pdf"
  },
  {
    "periodo": "2021-04",
    "anio": 2021,
    "mes": 4,
    "sac": false,
    "label": "Abril 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2021.pdf"
  },
  {
    "periodo": "2021-03",
    "anio": 2021,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2021.pdf"
  },
  {
    "periodo": "2021-02",
    "anio": 2021,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2021.pdf"
  },
  {
    "periodo": "2021-01",
    "anio": 2021,
    "mes": 1,
    "sac": false,
    "label": "Enero 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2021.pdf"
  },
  {
    "periodo": "2020-12",
    "anio": 2020,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2020.pdf"
  },
  {
    "periodo": "2020-12",
    "anio": 2020,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2020.pdf"
  },
  {
    "periodo": "2020-04",
    "anio": 2020,
    "mes": 4,
    "sac": false,
    "label": "Abril 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2020.pdf"
  },
  {
    "periodo": "2020-03",
    "anio": 2020,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2020.pdf"
  },
  {
    "periodo": "2020-02",
    "anio": 2020,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2020.pdf"
  },
  {
    "periodo": "2019-12",
    "anio": 2019,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2019.pdf"
  },
  {
    "periodo": "2019-11",
    "anio": 2019,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2019.pdf"
  },
  {
    "periodo": "2019-10",
    "anio": 2019,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2019.pdf"
  },
  {
    "periodo": "2019-09",
    "anio": 2019,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2019.pdf"
  },
  {
    "periodo": "2019-08",
    "anio": 2019,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2019.pdf"
  },
  {
    "periodo": "2019-07",
    "anio": 2019,
    "mes": 7,
    "sac": false,
    "label": "Julio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2019.pdf"
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2019.pdf"
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2019.pdf"
  },
  {
    "periodo": "2019-05",
    "anio": 2019,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2019.pdf"
  },
  {
    "periodo": "2019-04",
    "anio": 2019,
    "mes": 4,
    "sac": false,
    "label": "Abril 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2019.pdf"
  },
  {
    "periodo": "2019-03",
    "anio": 2019,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2019.pdf"
  },
  {
    "periodo": "2019-02",
    "anio": 2019,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2019.pdf"
  },
  {
    "periodo": "2019-01",
    "anio": 2019,
    "mes": 1,
    "sac": false,
    "label": "Enero 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2019.pdf"
  },
  {
    "periodo": "2018-12",
    "anio": 2018,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12-1_remuneraciones_funcionarios_sac_diciembre_2018.pdf"
  },
  {
    "periodo": "2018-12",
    "anio": 2018,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2018.pdf"
  },
  {
    "periodo": "2018-11",
    "anio": 2018,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2018.pdf"
  },
  {
    "periodo": "2018-10",
    "anio": 2018,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2018.pdf"
  },
  {
    "periodo": "2018-09",
    "anio": 2018,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2018.pdf"
  },
  {
    "periodo": "2018-08",
    "anio": 2018,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2018.pdf"
  },
  {
    "periodo": "2018-07",
    "anio": 2018,
    "mes": 7,
    "sac": false,
    "label": "Julio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2018.pdf"
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2018.pdf"
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2018.pdf"
  },
  {
    "periodo": "2018-05",
    "anio": 2018,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2018.pdf"
  },
  {
    "periodo": "2018-04",
    "anio": 2018,
    "mes": 4,
    "sac": false,
    "label": "Abril 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2018.pdf"
  },
  {
    "periodo": "2018-03",
    "anio": 2018,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2018.pdf"
  },
  {
    "periodo": "2018-02",
    "anio": 2018,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2018.pdf"
  },
  {
    "periodo": "2018-01",
    "anio": 2018,
    "mes": 1,
    "sac": false,
    "label": "Enero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2018.pdf"
  },
  {
    "periodo": "2016-12",
    "anio": 2016,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12-1_remuneraciones_funcionarios_sac_diciembre_2016.pdf"
  },
  {
    "periodo": "2016-12",
    "anio": 2016,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2016.pdf"
  },
  {
    "periodo": "2016-11",
    "anio": 2016,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2016.pdf"
  },
  {
    "periodo": "2016-10",
    "anio": 2016,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2016.pdf"
  },
  {
    "periodo": "2016-09",
    "anio": 2016,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2016.pdf"
  },
  {
    "periodo": "2016-08",
    "anio": 2016,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2016.pdf"
  },
  {
    "periodo": "2016-07",
    "anio": 2016,
    "mes": 7,
    "sac": false,
    "label": "Julio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2016.pdf"
  },
  {
    "periodo": "2016-06",
    "anio": 2016,
    "mes": 6,
    "sac": false,
    "label": "Junio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2016.pdf"
  },
  {
    "periodo": "2016-06",
    "anio": 2016,
    "mes": 6,
    "sac": false,
    "label": "Junio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2016.pdf"
  },
  {
    "periodo": "2016-05",
    "anio": 2016,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2016.pdf"
  },
  {
    "periodo": "2016-04",
    "anio": 2016,
    "mes": 4,
    "sac": false,
    "label": "Abril 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2016.pdf"
  },
  {
    "periodo": "2016-03",
    "anio": 2016,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2016.pdf"
  },
  {
    "periodo": "2016-02",
    "anio": 2016,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2016.pdf"
  },
  {
    "periodo": "2016-01",
    "anio": 2016,
    "mes": 1,
    "sac": false,
    "label": "Enero 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2016.pdf"
  },
  {
    "periodo": "2015-12",
    "anio": 2015,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2015.pdf"
  },
  {
    "periodo": "2015-11",
    "anio": 2015,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2015.pdf"
  },
  {
    "periodo": "2015-10",
    "anio": 2015,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2015.pdf"
  },
  {
    "periodo": "2015-09",
    "anio": 2015,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2015.pdf"
  },
  {
    "periodo": "2015-08",
    "anio": 2015,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2015.pdf"
  },
  {
    "periodo": "2015-07",
    "anio": 2015,
    "mes": 7,
    "sac": false,
    "label": "Julio 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2015.pdf"
  },
  {
    "periodo": "2015-06",
    "anio": 2015,
    "mes": 6,
    "sac": false,
    "label": "Junio 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2015.pdf"
  },
  {
    "periodo": "2015-05",
    "anio": 2015,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2015.pdf"
  },
  {
    "periodo": "2015-04",
    "anio": 2015,
    "mes": 4,
    "sac": false,
    "label": "Abril 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2015.pdf"
  },
  {
    "periodo": "2015-03",
    "anio": 2015,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2015.pdf"
  },
  {
    "periodo": "2015-02",
    "anio": 2015,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2015.pdf"
  },
  {
    "periodo": "2015-01",
    "anio": 2015,
    "mes": 1,
    "sac": false,
    "label": "Enero 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2015.pdf"
  },
  {
    "periodo": "2014-12",
    "anio": 2014,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2014.pdf"
  },
  {
    "periodo": "2014-11",
    "anio": 2014,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2014.pdf"
  },
  {
    "periodo": "2014-10",
    "anio": 2014,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2014.pdf"
  },
  {
    "periodo": "2014-09",
    "anio": 2014,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2014.pdf"
  },
  {
    "periodo": "2014-08",
    "anio": 2014,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2014.pdf"
  },
  {
    "periodo": "2014-07",
    "anio": 2014,
    "mes": 7,
    "sac": false,
    "label": "Julio 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2014.pdf"
  },
  {
    "periodo": "2014-06",
    "anio": 2014,
    "mes": 6,
    "sac": false,
    "label": "Junio 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2014.pdf"
  },
  {
    "periodo": "2014-05",
    "anio": 2014,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2014.pdf"
  },
  {
    "periodo": "2014-04",
    "anio": 2014,
    "mes": 4,
    "sac": false,
    "label": "Abril 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2014.pdf"
  },
  {
    "periodo": "2014-03",
    "anio": 2014,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2014.pdf"
  },
  {
    "periodo": "2014-02",
    "anio": 2014,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2014.pdf"
  },
  {
    "periodo": "2014-01",
    "anio": 2014,
    "mes": 1,
    "sac": false,
    "label": "Enero 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2014.pdf"
  }
];

export const remuneracionesMeta = {
  fuenteUrl: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/",
  sincronizadoEl: "2026-05-16T10:13:32.024Z",
  total: 140,
  conPeriodoIdentificado: 140,
  sinPeriodo: 0,
  porAnio: {
  "2014": 12,
  "2015": 12,
  "2016": 14,
  "2018": 14,
  "2019": 13,
  "2020": 5,
  "2021": 14,
  "2022": 13,
  "2023": 13,
  "2024": 14,
  "2025": 13,
  "2026": 3
},
} as const;
