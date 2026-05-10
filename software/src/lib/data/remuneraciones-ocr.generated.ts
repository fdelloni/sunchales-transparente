// AUTO-GENERADO por scripts/ocr-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run ocr-remuneraciones
//
// Última extracción: 2026-05-10T04:21:53.963Z
// PDFs procesados: 42
// Períodos con filas extraídas por OCR: 33
// Filas totales (todas marcadas ocrNoVerificado: true): 391
//
// ⚠ ADVERTENCIA: estos datos provienen de OCR sobre PDFs escaneados.
// Tesseract puede confundir dígitos similares (8↔0, 1↔7, comas↔puntos).
// Antes de citar un monto, verificar contra el PDF original (urlPdf).

export type FilaOcr = {
  etiqueta: string;
  bruto: number | null;
  descuentos: number | null;
  neto: number | null;
  ocrNoVerificado: true;
};

export type RemuneracionDetalleOcr = {
  periodo: string;
  anio: number | null;
  mes: number | null;
  sac: boolean;
  label: string;
  urlPdf: string;
  ocrAplicado: true;
  cantidadFilas: number;
  filas: FilaOcr[];
  /** Campo heredado del catálogo de origen (siempre false; se conserva por compatibilidad). */
  parseado?: boolean;
  error?: string;
};

export const remuneracionesDetalleOcr: RemuneracionDetalleOcr[] = [
  {
    "periodo": "2021-09",
    "anio": 2021,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2021.pdf",
    "parseado": false,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "NS _— — CANAVESE, Marcelo.» Coordinador de Comunicación y - 4156008.00 5.44",
        "bruto": 28.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 7.00 5.81",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 33.81,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "CPOLATE, Salma, — |COmimin de Tomiónde 8.00 7.74",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.26,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "erechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 7.52",
        "bruto": 156,
        "descuentos": null,
        "neto": 36.45,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. | 8.00 5.44",
        "bruto": 156,
        "descuentos": null,
        "neto": 28.7,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GABIANI, M. Cecilia. — Subsecretaria de Ambiente y 4.92 6.26",
        "bruto": 212.4,
        "descuentos": null,
        "neto": 63.74,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Servicios a la Comunidad. — GHIANO, Pablo A. Subsecretario de Educación, Salud y ¿93 cos 00 9.09",
        "bruto": 20.64,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Convivencia Ciudadana. — GIRARD, Romina M. — Coordinadora de Cultura y Promoción |< 56 008.00 7.27",
        "bruto": 25.79,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Territorial. — GONZÁLEZ, Flavio J. — Subsecretario de Producción y 0.00 1.80",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 34.22,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 3.00 2.74",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 81.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "LAMBERT, Leandro — Subsecretario de Hacienda y 0.00 1.80",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 34.22,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "inanzas. — LOPEZ, Nestor D. Subsecretario de Infraestructura 0.00 1.80",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 34.22,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 3.00 2.74",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 81.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", Coordinador de la Agencia Municipal — MONTICONE, Yanina P. co Seguridad Ciudadana y Vial. 8.00 2.74",
        "bruto": 156,
        "descuentos": null,
        "neto": 35.81,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 8.00 5.52",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.16,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 7.00 1.34",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 27.2,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 6.00 5.34",
        "bruto": 312.01,
        "descuentos": null,
        "neto": 113.11,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2021-08",
    "anio": 2021,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2021.pdf",
    "parseado": false,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de Comunicación y — CANAVESE, Marcelo. Estrategia. 8.00 8.00 5.48",
        "bruto": 156,
        "descuentos": 156,
        "neto": 29.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 7.00 7.85",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 34.51,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. — Coordinadora de Promoción de 8.00 5.48",
        "bruto": 156,
        "descuentos": null,
        "neto": 29.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 5.56",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.94,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. | 8.00 5.48",
        "bruto": 156,
        "descuentos": null,
        "neto": 29.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "_ Subsecretaria de Ambiente y — GABIANI, M. Cecilia. Servicios a la Comunidad. 5.07 6.05",
        "bruto": 212.4,
        "descuentos": null,
        "neto": 62.19,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. Canvivencia Ciiidadana, 0.00 7.85",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 35.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GIRARD, Romina M. — ¡Coordinadora de Cultura y Promoción | ¿1 40 407.00 9.31",
        "bruto": 26.49,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Territorial. — GONZÁLEZ, Flavio J. Subsecretario de Producción y 0.00 7.85",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 35.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "'ooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 3.00 0.91",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 82.53,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "LAMBERTI, Leandro — | Subsecretario de Hacienda y 0.00 7.85",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 35.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Finanzas. — LOPEZ, Nestor D. Subsecretario de Infraestructura 0.00 835,157.85",
        "bruto": 187.21,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Urbana y Rural. — xMARTÍNEZ, Omar A. 3.00 3.77",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 73.5,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ": Coordinador de la Agencia Municipal — MONTICONE, Yanina P. de Seguridad Ciudadana y Vial. 8.00 9.78",
        "bruto": 156,
        "descuentos": null,
        "neto": 36.52,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 8.00 5.48",
        "bruto": 156,
        "descuentos": null,
        "neto": 29.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. — | Director de Modernización. 7.00 3.38",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 27.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. 6.00 5.39",
        "bruto": 312.01,
        "descuentos": null,
        "neto": 113.11,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2020-04",
    "anio": 2020,
    "mes": 4,
    "sac": false,
    "label": "Abril 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2020.pdf",
    "parseado": false,
    "cantidadFilas": 15,
    "filas": [
      {
        "etiqueta": "ven BRUTA NETA | 7 — TOSELLI, GONZALO R. F. 193362,2 88121,82",
        "bruto": 105240.38,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "MARTINEZ, OMAR ANGEL 154080,96 32217,26",
        "bruto": 121863.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GRANDE, MARILINA 154080,96 42288,48",
        "bruto": 111792.48,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "BERGESE, SOLANA BELEN 86670,54 18186,96",
        "bruto": 68483.58,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ESCOBIO, GISELA VANESA 96300,6 25542,62",
        "bruto": 70757.98,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "BERNINI, DANIEL 96300,6 21568,96",
        "bruto": 74731.64,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ERCOLE, GUILLERMO 96300,6 20023,06",
        "bruto": 76277.54,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GABIANI, MARIA CECILIA 128934,52 36772,3",
        "bruto": 92162.22,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "LARROQUETTE, HERNAN J 115820,72 29973,86",
        "bruto": 85846.86,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| por la Ordenanza / — GASSER, AGOSTINA 926300,6 21072,42",
        "bruto": 75228.18,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Art.12) Dispónese la publicación mensual, en — EVENT ESTO 5 | la página web oficial de la Municipalidad de",
        "bruto": 86670.54,
        "descuentos": null,
        "neto": 67790.46,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GIRARD, ROMINA MELISA 96300,6 20998,55 Sunchales y del Concejo Municipal, junto a los",
        "bruto": 75302.05,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "PRADOS, ANDREA CAROLINA 124869,54 32058,71 datos personales, de las retribuciones brutas y",
        "bruto": 92810.83,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GHIANO, PABLO ANDRES 115560,72 28801,06 | cargos públicos, de los las funcionarios/as de",
        "bruto": 86759.66,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SCHMIDT, MARCELO 106998,72 18613,12 gobierno así como de los las concejales/las",
        "bruto": 88385.6,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2020-03",
    "anio": 2020,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2020.pdf",
    "parseado": false,
    "cantidadFilas": 15,
    "filas": [
      {
        "etiqueta": "BRUTA NETA 7 — TOSELLI, GONZALO R. F.",
        "bruto": 193362.2,
        "descuentos": 102901.85,
        "neto": 90460.35,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "MARTINEZ, OMAR ANGEL | | | 0 <S",
        "bruto": 154080.96,
        "descuentos": null,
        "neto": 50689,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GRANDE, MARILINA | | | 0-0",
        "bruto": 154080.96,
        "descuentos": null,
        "neto": 47639.08,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GASSER, AGOSTINA | |",
        "bruto": 96300.6,
        "descuentos": 23122.05,
        "neto": 73178.55,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SOMAGLIA, OSVALDO | | | 77 O",
        "bruto": 86670.54,
        "descuentos": null,
        "neto": 19660.49,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "PRADOS, ANDREA CAROLINA |",
        "bruto": 115560.72,
        "descuentos": 23428.15,
        "neto": 92132.57,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GHIANO, PABLO ANDRÉS | | PU 7",
        "bruto": 115560.72,
        "descuentos": null,
        "neto": 31436.05,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "BERGESE, SOLANA BELEN | |",
        "bruto": 86670.54,
        "descuentos": 18976.99,
        "neto": 67693.55,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ESCOBIO, GISELA VANESA | |",
        "bruto": 96300.6,
        "descuentos": 19576.13,
        "neto": 76724.47,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "BERNINI, DANIEL | | | 7 7 Según lo dispuesto",
        "bruto": 96300.6,
        "descuentos": null,
        "neto": 22625.51,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ERCOLE, GUILLERMO | | | por la Ordenanza 2079/2011",
        "bruto": 96300.6,
        "descuentos": null,
        "neto": 22918.12,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GABIANI, MARIA CECILIA | | | AUD eN Dime",
        "bruto": 128934.52,
        "descuentos": null,
        "neto": 42733.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "la página web oficial de la Municipalidad de — LARROQUETTE, HERNAN J | | Sunchales y del Concejo Municipal, junto a los",
        "bruto": 115820.72,
        "descuentos": 23428.15,
        "neto": 92392.57,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GONZALEZ, FLAVIO JORGE | | | 7/7 datos personales, de las retribuciones brutas y",
        "bruto": 96680.6,
        "descuentos": null,
        "neto": 23196.02,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "cargos públicos, de los las funcionarios/as de — SCHMIDT, MARCELO | | CI gobierno así como de los las concejales/las",
        "bruto": 97757.6,
        "descuentos": null,
        "neto": 23195.84,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2020-02",
    "anio": 2020,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2020.pdf",
    "parseado": false,
    "cantidadFilas": 8,
    "filas": [
      {
        "etiqueta": "— BRUTA - NETA | == — TOSELLI, GONZALO R. F.",
        "bruto": 96520.73,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "MARTINEZ, OMAR ANGEL | | 1-7",
        "bruto": 158547.33,
        "descuentos": null,
        "neto": 51582.27,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GRANDE, MARILINA | | 1",
        "bruto": 162685.5,
        "descuentos": null,
        "neto": 49273.95,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "mano romNAMEZSA | veremos] ame D6ieam — PRADOS, ANDREA CAROLINA | — | | por la Ordenanza /",
        "bruto": 118680.72,
        "descuentos": null,
        "neto": 2011,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "GHIANO, PABLO ANDRÉS 12105372) — 32479,72| | Art.12) Dispónese la publicación mensual, en",
        "bruto": 88574,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SCHMIDT, MARCELO 10313457) 24217,47| la página web oficial de la Municipalidad de",
        "bruto": 78917.1,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "BERGESE, SOLANA BELEN 89010,9 | 19a21,65| | Sunchales y del Concejo Municipal, junto a los",
        "bruto": 69589.25,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ESCOBIO, GISELA VANESA | 747 - — BERNINI, DANIEL 98886,18 | 23116,77 | | cargos públicos, de los las funcionarios/as de",
        "bruto": 75769.41,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-12",
    "anio": 2019,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 183543.52,
        "descuentos": 137981.78,
        "neto": 48184.74,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 123620.32,
        "descuentos": 46350.15,
        "neto": 77270.17,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borkowsky Andrea Silvana |",
        "bruto": 95117.88,
        "descuentos": 37279.65,
        "neto": 57838.23,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina |",
        "bruto": 148344.4,
        "descuentos": 67343.1,
        "neto": 81001.3,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Escobio, Gisela Vanesa |",
        "bruto": 61810.66,
        "descuentos": 16015.14,
        "neto": 45794.52,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gasser, Agostina |",
        "bruto": 98896.76,
        "descuentos": 38496.91,
        "neto": 60399.85,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ércole, Guillermo | 177107 0073",
        "bruto": 98896.76,
        "descuentos": null,
        "neto": 36692.7,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 37086.1,
        "descuentos": 1196221,
        "neto": 30012.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia |",
        "bruto": 111592.09,
        "descuentos": 37349.15,
        "neto": 74242.94,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | E T::5:74 .",
        "bruto": 92715.26,
        "descuentos": null,
        "neto": 32426.39,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gomde fio | 9971526 | o dm",
        "bruto": 322639,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "'onzalez, Flavio R 60656,87 por la Ordenanza 2079/2011",
        "bruto": 9271526,
        "descuentos": null,
        "neto": 3242639,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo | , _.",
        "bruto": 105077.28,
        "descuentos": 33402.98,
        "neto": 71674.3,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "7 87417200) Art.12) Dispónese la publicación mensual, en",
        "bruto": 19155.44,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Prados, Andrea Carolina | la página web oficial de la Municipalidad de",
        "bruto": 74172,
        "descuentos": 19155.44,
        "neto": 55016.76,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | Sunchales y del Concejo Municipal, junto a los",
        "bruto": 92715.26,
        "descuentos": 25903.28,
        "neto": 68113.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bernini, Daniel Enrique | datos personales, de las retribuciones brutas y",
        "bruto": 61810.66,
        "descuentos": 15397.03,
        "neto": 46413.63,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "cargos públicos, de los las funcionarios/as de — Bergese, Solana Belén | gobierno así como de los las concejales/las",
        "bruto": 55620,
        "descuentos": 13886.8,
        "neto": 41733.2,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Martinez, Omar Ángel | dt TU",
        "bruto": 98896,
        "descuentos": 25435.2,
        "neto": 73460.8,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 49448.12,
        "descuentos": 34014.62,
        "neto": 19096.99,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-11",
    "anio": 2019,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 14,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 183543.52,
        "descuentos": 103259.1,
        "neto": 81020.42,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 146834.8,
        "descuentos": 54138.95,
        "neto": 92515.85,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 146834.8,
        "descuentos": 78385.66,
        "neto": 68449.14,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina |",
        "bruto": 146834.8,
        "descuentos": 55052.43,
        "neto": 91782.37,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| , 18 ETA 17",
        "bruto": 110126.1,
        "descuentos": null,
        "neto": 36784,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ércole, Guillermo | 17077 1)",
        "bruto": 110126.1,
        "descuentos": null,
        "neto": 42501.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 110126.1,
        "descuentos": 30695.96,
        "neto": 79538.14,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia , 15|",
        "bruto": 108594,
        "descuentos": 32927.88,
        "neto": 77718.73,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "O ARTE + sl den — 'onzalez, rlavio R 64798,25 por la Ordenanza 2079/2011",
        "bruto": 91771.76,
        "descuentos": null,
        "neto": 27341.51,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo | , o",
        "bruto": 82594.56,
        "descuentos": 22651.78,
        "neto": 59942.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky,liia —— | — | | la vaina ab efical dela Manicooldad do",
        "bruto": 91771.76,
        "descuentos": null,
        "neto": 25500.67,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, Lilia la página web oficial de la Municipalidad de",
        "bruto": 91771.76,
        "descuentos": 25500.67,
        "neto": 66271.09,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | Sunchales y del Concejo Municipal, junto a los",
        "bruto": 91771.76,
        "descuentos": 22341.23,
        "neto": 70732.53,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Nuñez, Ma. Florencia | datos personales, de las retribuciones brutas y",
        "bruto": 91771.76,
        "descuentos": 27341.51,
        "neto": 64430.25,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-10",
    "anio": 2019,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo",
        "bruto": 92942.67,
        "descuentos": 2723945,
        "neto": 73438.04,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 145627.16,
        "descuentos": 53688.51,
        "neto": 94745.48,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 145627.16,
        "descuentos": 83601.92,
        "neto": 64181.87,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina | 46634,23",
        "bruto": 145627.16,
        "descuentos": null,
        "neto": 100970.43,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| PEZ)",
        "bruto": 109220.34,
        "descuentos": null,
        "neto": 35824.37,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ércole, Guillermo | 776",
        "bruto": 81915.24,
        "descuentos": null,
        "neto": 21964.25,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 109220.34,
        "descuentos": 32702.28,
        "neto": 82667.3,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia |",
        "bruto": 59695.19,
        "descuentos": 15548.16,
        "neto": 45320.79,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| PIT 5 .",
        "bruto": 91016.96,
        "descuentos": null,
        "neto": 26604.47,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Come ee 59101696 | o dm",
        "bruto": 260047,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "'onzalez, Flavio R 68824,35 por la Ordenanza 2079/2011",
        "bruto": 92101626,
        "descuentos": null,
        "neto": 2660447,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo | , o",
        "bruto": 81915.24,
        "descuentos": 21964.25,
        "neto": 62945.87,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, lia — | — | | la vino mb ofcial de la Muricoalidad de",
        "bruto": 5093546,
        "descuentos": null,
        "neto": 13504.39,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, Lilia | la página web oficial de la Municipalidad de",
        "bruto": 50935.48,
        "descuentos": 13504.39,
        "neto": 37431.09,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | Sunchales y del Concejo Municipal, junto a los",
        "bruto": 91016.96,
        "descuentos": 22160.07,
        "neto": 70483.28,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Nuñez, Ma. Florencia | datos personales, de las retribuciones brutas y",
        "bruto": 91016.96,
        "descuentos": 2660447,
        "neto": 68456.35,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Geninanti, Caralina | 7775 AT O LT",
        "bruto": 91016.96,
        "descuentos": null,
        "neto": 26604.47,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-09",
    "anio": 2019,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 3,
    "filas": [
      {
        "etiqueta": "Leo -— Segúnlo dispuesto — Ml e",
        "bruto": 6977002,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.19 Dispónese la publicación mensual, en la",
        "bruto": 61793.73,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "semoso Mr — personales, de las retribuciones brutas y de los",
        "bruto": 66952.55,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-08",
    "anio": 2019,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2019.pdf",
    "parseado": false,
    "cantidadFilas": 10,
    "filas": [
      {
        "etiqueta": "BRUTA NETA — Toselli, Gonzalo",
        "bruto": 66013.79,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina",
        "bruto": 79985.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 59092.37,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina",
        "bruto": 8592847,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ercole, Guillermo",
        "bruto": 4482701,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia",
        "bruto": 65554.52,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio ESPE porta Ordenanza /01 — Ghiano, Pablo Art.19) Dispónese la publicación mensual, en la",
        "bruto": 50904.21,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, Lilia página web mel de la Munic palidad de Sun-",
        "bruto": 58126.24,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "chales y del Concejo Municipal, junto a los datos — Schmidt, Marcelo personales, de las retribuciones brutas y de los",
        "bruto": 60147.25,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Geninatti, Carolina públicos, de los las funcionarios/as de gobierno",
        "bruto": 55155.62,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-07",
    "anio": 2019,
    "mes": 7,
    "sac": false,
    "label": "Julio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 4,
    "filas": [
      {
        "etiqueta": "REMUNERACIONES de FUNCIONARIOS PÚBLICOS ..0. = ts Ú — Art.19) Dispónese la publicación mensual, en la",
        "bruto": 57514.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "página web mel de la Munic palidad de Sun-",
        "bruto": 5270143,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "- chales y del Concejo Municipal, junto a los datos — personales, de las retribuciones brutas y de los",
        "bruto": 58126.24,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "públicos, de los las LEO de gobierno",
        "bruto": 57157.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 3,
    "filas": [
      {
        "etiqueta": "CUE -— Segúnlodispuesto — Art.19 Dispónese la publicación mensual, en la",
        "bruto": 47674.61,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ssmere Mr — personales, de las retribuciones brutas y de los",
        "bruto": 5701645,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "así como de los las concejales/las municipales — Eee SaLEo due respectivamente.",
        "bruto": 74660.89,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 13,
    "filas": [
      {
        "etiqueta": "BRUTA — — Toselli,Gonzalo -",
        "bruto": 74914.44,
        "descuentos": null,
        "neto": 60680.7,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina",
        "bruto": 59931.55,
        "descuentos": null,
        "neto": 48544.56,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 59931.55,
        "descuentos": null,
        "neto": 48544.56,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 59931.55,
        "descuentos": null,
        "neto": 49143.88,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gasser, Agostina",
        "bruto": 44948.66,
        "descuentos": null,
        "neto": 36857.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ércole, Guillermo",
        "bruto": 37457.21,
        "descuentos": null,
        "neto": 30714.91,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 44948.66,
        "descuentos": null,
        "neto": 36408.41,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia",
        "bruto": 44323.39,
        "descuentos": null,
        "neto": 35237.1,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio > 3071492",
        "bruto": 3745722,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina",
        "bruto": 59931.55,
        "descuentos": null,
        "neto": 49143.88,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, Lilia Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 37457.22,
        "descuentos": null,
        "neto": 30340.35,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo Art.19) Dispónese la publicación mensual, en la página web",
        "bruto": 37457.22,
        "descuentos": null,
        "neto": 30714.92,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ganan, Canina Municipal, junto a los datos personales, de las retribuciones",
        "bruto": 37457.22,
        "descuentos": null,
        "neto": 30714.92,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2019-01",
    "anio": 2019,
    "mes": 1,
    "sac": false,
    "label": "Enero 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2019.pdf",
    "parseado": false,
    "cantidadFilas": 3,
    "filas": [
      {
        "etiqueta": "EC -— Segúnlo dispuesto — Art.12) Dispónese la publicación mensual, en",
        "bruto": 39112.3,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "la página web oficial de la Municipalidad de — Sunchales y del Concejo Municipal, junto a los",
        "bruto": 3547716,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Eco públicos, de los las fines de",
        "bruto": 39112.3,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-12",
    "anio": 2018,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12-1_remuneraciones_funcionarios_sac_diciembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-12",
    "anio": 2018,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 5,
    "filas": [
      {
        "etiqueta": "BRUTA NETA — Según lo dispuesto",
        "bruto": 56498.26,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "pora Ordenanza 2079/2011",
        "bruto": 4021478,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.19) Dispónese la publicación mensual, en la",
        "bruto": 4054978,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "página web ome de la Munic paliar de Sun-",
        "bruto": 35900.33,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "- Chales y del Concejo Municipal, junto a los datos — personales, de las retribuciones brutas y de los",
        "bruto": 39413.71,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-11",
    "anio": 2018,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 3,
    "filas": [
      {
        "etiqueta": "REMUNERACIONES de FUNCIONARIOS PÚBLICOS e e e A A — Art.12) Dispónese la publicación mensual, en",
        "bruto": 38346.34,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Sunchales y del Concejo Municipal, junto a los — datos personales, de las retribuciones brutas y",
        "bruto": 38658.12,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Eco públicos, de los las fines de",
        "bruto": 38015.34,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-10",
    "anio": 2018,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 109959.92,
        "descuentos": 67387.06,
        "neto": 43226.86,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 87967.96,
        "descuentos": 33071.17,
        "neto": 54896.79,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 87967.96,
        "descuentos": 69485.8,
        "neto": 18482.16,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 87967.96,
        "descuentos": 29898.15,
        "neto": 58069.81,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| ETE\"",
        "bruto": 87967.96,
        "descuentos": null,
        "neto": 32936.92,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| MY TEDET",
        "bruto": 65975.94,
        "descuentos": null,
        "neto": 21142.56,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BYE",
        "bruto": 65976.14,
        "descuentos": null,
        "neto": 20681.57,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 65975.94,
        "descuentos": 21609.34,
        "neto": 44366.6,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | ,",
        "bruto": 64435.25,
        "descuentos": 18011.54,
        "neto": 47690.67,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | [E denia",
        "bruto": 54979.5,
        "descuentos": null,
        "neto": 15769.04,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | 39210,92 por la Ordenanza 2079/2011",
        "bruto": 54979.96,
        "descuentos": null,
        "neto": 15769.04,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio | Flavio | LATE _ 16700,04 Art.12) Dispónese la publicación mensual, en",
        "bruto": 5497996,
        "descuentos": 16219.04,
        "neto": 40019.13,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina % | la página web oficial de la Municipalidad de",
        "bruto": 54979.9,
        "descuentos": 10686.19,
        "neto": 44293.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 54979.26,
        "descuentos": 15006.22,
        "neto": 39973.74,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | , 19 MY IE 74 datos personales, de las retribuciones brutas y",
        "bruto": 54979.96,
        "descuentos": null,
        "neto": 13435,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "[Geninatti, Carolina —_| — | | TT e",
        "bruto": 54979.96,
        "descuentos": null,
        "neto": 15769.04,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Geninatti, Carolina gobierno así como de los las concejales/las",
        "bruto": 54979.96,
        "descuentos": 15769.04,
        "neto": 39210.92,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 49481.94,
        "descuentos": 13263.39,
        "neto": 36218.55,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BEI",
        "bruto": 49481.94,
        "descuentos": null,
        "neto": 13263.39,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-09",
    "anio": 2018,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 18,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 101870.96,
        "descuentos": 66956.69,
        "neto": 35562.27,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 81496.76,
        "descuentos": 29693.04,
        "neto": 51803.72,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 814926.76,
        "descuentos": 65267.49,
        "neto": 16229.27,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 81496.76,
        "descuentos": 26563,
        "neto": 54933.76,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| ME",
        "bruto": 81496.76,
        "descuentos": null,
        "neto": 29151.76,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| ME YET)",
        "bruto": 61122.58,
        "descuentos": null,
        "neto": 18813.66,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BYT-5A:",
        "bruto": 6112258,
        "descuentos": null,
        "neto": 18488.62,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 61122.58,
        "descuentos": 19246.11,
        "neto": 41876.47,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | .",
        "bruto": 59695.19,
        "descuentos": 15548.16,
        "neto": 45320.79,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | | Ce Ordena",
        "bruto": 50935.48,
        "descuentos": null,
        "neto": 14115.7,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | por la Ordenanza 2079/2011",
        "bruto": 50935.48,
        "descuentos": 14115.7,
        "neto": 36819.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio Flavio | SL | 177007] Art.12) Dispónese la publicación mensual, en",
        "bruto": 5099548,
        "descuentos": 1711571,
        "neto": 34143.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina la página web oficial de la Municipalidad de",
        "bruto": 50935.48,
        "descuentos": 9917.73,
        "neto": 41017.75,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| EEZEINOS Sunchales y del Concejo Municipal, junto a los",
        "bruto": 50935.48,
        "descuentos": null,
        "neto": 13504.39,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | datos personales, de las retribuciones brutas y",
        "bruto": 50935.48,
        "descuentos": 12464.5,
        "neto": 38470.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", 7 : cargos públicos, de los las funcionarios/as de — gobierno así como de los las concejales/las",
        "bruto": 50935.48,
        "descuentos": null,
        "neto": 36819.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 45841.94,
        "descuentos": 12001.75,
        "neto": 33840.19,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BE EXT AL)",
        "bruto": 45841.94,
        "descuentos": null,
        "neto": 12001.75,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-08",
    "anio": 2018,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2018.pdf",
    "parseado": false,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 111603.02,
        "descuentos": 69928.08,
        "neto": 42319.94,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 89282.45,
        "descuentos": 33757.36,
        "neto": 55525.09,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 89282.45,
        "descuentos": 54066.5,
        "neto": 35215.5,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 89282.45,
        "descuentos": 21667.79,
        "neto": 76828.17,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| PESTO",
        "bruto": 89282.45,
        "descuentos": null,
        "neto": 33164.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| YE\"",
        "bruto": 66961.83,
        "descuentos": null,
        "neto": 21532.45,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| EAT",
        "bruto": 66961.83,
        "descuentos": null,
        "neto": 21126.95,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 66961.83,
        "descuentos": 21837.57,
        "neto": 45124.26,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | .",
        "bruto": 65398.01,
        "descuentos": 17634.79,
        "neto": 48988.46,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard,Romina —_| — | | me",
        "bruto": 55801.51,
        "descuentos": null,
        "neto": 16704.89,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | por la Ordenanza 2079/2011",
        "bruto": 55801.51,
        "descuentos": 16104.89,
        "neto": 39696.62,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina | la página web oficial de la Municipalidad de",
        "bruto": 55317.01,
        "descuentos": 10750.24,
        "neto": 44566.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 55801.51,
        "descuentos": 15105.22,
        "neto": 40696.29,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo datos personales, de las retribuciones brutas y",
        "bruto": 13632.37,
        "descuentos": null,
        "neto": 42169.14,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", 7 : cargos públicos, de los las funcionarios/as de — gobierno así como de los las concejales/las",
        "bruto": 15986.48,
        "descuentos": null,
        "neto": 39815.03,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 50221.36,
        "descuentos": 13519.66,
        "neto": 36701.7,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| E EZ",
        "bruto": 50221.36,
        "descuentos": null,
        "neto": 13519.66,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-07",
    "anio": 2018,
    "mes": 7,
    "sac": false,
    "label": "Julio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 18,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 100944.04,
        "descuentos": 58192.92,
        "neto": 44029.12,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 80755.21,
        "descuentos": 28591.15,
        "neto": 52164.06,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 80755.24,
        "descuentos": 4643344,
        "neto": 34321.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 80755.21,
        "descuentos": 28582,
        "neto": 52173.21,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Y=AZ",
        "bruto": 60566.4,
        "descuentos": null,
        "neto": 18264.64,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| YT:",
        "bruto": 60566.4,
        "descuentos": null,
        "neto": 18464.84,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz Cintia Magalí | MEET",
        "bruto": 60566.4,
        "descuentos": null,
        "neto": 18720,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | ,",
        "bruto": 59152.07,
        "descuentos": 15113.37,
        "neto": 45188.18,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | EZ Mol",
        "bruto": 50472.02,
        "descuentos": null,
        "neto": 1371471,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | 36757,31 por la Ordenanza 2079/2011",
        "bruto": 50472.02,
        "descuentos": null,
        "neto": 13714.71,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio Flavio | | E _ | 1374470 Art.12) Dispónese la publicación mensual, en",
        "bruto": 50472.02,
        "descuentos": 13714.7,
        "neto": 37076.82,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina la página web oficial de la Municipalidad de",
        "bruto": 50275.41,
        "descuentos": 9760.32,
        "neto": 40515.09,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 50472.02,
        "descuentos": 13290.64,
        "neto": 37181.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | datos personales, de las retribuciones brutas y",
        "bruto": 50472.02,
        "descuentos": 12321.29,
        "neto": 38150.73,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "[Geninahi, Carolina | — | TT e",
        "bruto": 5047202,
        "descuentos": null,
        "neto": 1366031,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Geninatti, Carolina | gobierno así como de los las concejales/las",
        "bruto": 50472.02,
        "descuentos": 13660.31,
        "neto": 36811.71,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 45424.77,
        "descuentos": 11743.32,
        "neto": 33681.45,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| EXI",
        "bruto": 45424.77,
        "descuentos": null,
        "neto": 11743.32,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 92686.56,
        "descuentos": 81758.92,
        "neto": 11563.64,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 74149.24,
        "descuentos": 28383.44,
        "neto": 45765.79,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 74149.24,
        "descuentos": 52961.4,
        "neto": 21187.84,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 74149.24,
        "descuentos": 27363.78,
        "neto": 46785.46,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BEY",
        "bruto": 74149.24,
        "descuentos": null,
        "neto": 27899.25,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| PEC)",
        "bruto": 55611.94,
        "descuentos": null,
        "neto": 17647.41,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| METI",
        "bruto": 55611.94,
        "descuentos": null,
        "neto": 17444.5,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 55611.94,
        "descuentos": 18064,
        "neto": 37547.94,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | ,",
        "bruto": 54313.25,
        "descuentos": 14140.79,
        "neto": 41240.4,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | MEE Ode",
        "bruto": 4634328,
        "descuentos": null,
        "neto": 1942565,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | 32917, por la Ordenanza 2079/2011",
        "bruto": 46343.28,
        "descuentos": null,
        "neto": 13425.65,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio | . o",
        "bruto": 46343.28,
        "descuentos": 13425.65,
        "neto": 33235.63,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "_ Art.12) Dispónese la publicación mensual, en — Grande, Marilina la página web oficial de la Municipalidad de",
        "bruto": 46343.28,
        "descuentos": 9013.22,
        "neto": 37330.06,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 46343.28,
        "descuentos": 13155.8,
        "neto": 33187.48,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | BE IeEL71607) datos personales, de las retribuciones brutas y",
        "bruto": 46343.28,
        "descuentos": null,
        "neto": 12488.96,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "[Geninatti, Carolina —_| — | | ee tE ere",
        "bruto": 46343.28,
        "descuentos": null,
        "neto": 1546434,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Geninatti, Carolina | gobierno así como de los las concejales/las",
        "bruto": 46343.28,
        "descuentos": 13464.34,
        "neto": 32878.94,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo | municipales respectivamente.",
        "bruto": 41708.96,
        "descuentos": 11608.59,
        "neto": 30100.37,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BET 7",
        "bruto": 41708.96,
        "descuentos": null,
        "neto": 11608.59,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 12,
    "filas": [
      {
        "etiqueta": "BRUTA d=— — Toselli, Gonzalo »",
        "bruto": 46343.28,
        "descuentos": null,
        "neto": 8805.22,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina",
        "bruto": 37074.62,
        "descuentos": null,
        "neto": 7044.18,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 37074.62,
        "descuentos": null,
        "neto": 7044.18,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 37074.62,
        "descuentos": null,
        "neto": 6673.43,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Cipolatti, Verónica",
        "bruto": 37074.62,
        "descuentos": null,
        "neto": 6673.43,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí , 14",
        "bruto": 27805.97,
        "descuentos": null,
        "neto": 5283,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia",
        "bruto": 27156.63,
        "descuentos": null,
        "neto": 5567.11,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio",
        "bruto": 23171.64,
        "descuentos": null,
        "neto": 4170.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 15447.76,
        "descuentos": null,
        "neto": 2780.6,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Yacomosky, Lilia Art.12) Dispónese la publicación mensual, en la página",
        "bruto": 23171.64,
        "descuentos": null,
        "neto": 4402.62,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Nuñez, Ma, Alerencia cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 2317146,
        "descuentos": null,
        "neto": 4170.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo gobierno así como de los las concejales/las municipales",
        "bruto": 20854.48,
        "descuentos": null,
        "neto": 3753.81,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-05",
    "anio": 2018,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2018.pdf",
    "parseado": false,
    "cantidadFilas": 18,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 92686.56,
        "descuentos": 52066.64,
        "neto": 48628.5,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 74149.24,
        "descuentos": 27377.42,
        "neto": 47975.01,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 74149.24,
        "descuentos": 38671.1,
        "neto": 41648.1,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 74149.24,
        "descuentos": 28023.65,
        "neto": 46125.59,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| EY",
        "bruto": 74149.24,
        "descuentos": null,
        "neto": 27019.3,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| , 12 IZ ESTO",
        "bruto": 55611.94,
        "descuentos": null,
        "neto": 17166,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| YE",
        "bruto": 55611.94,
        "descuentos": null,
        "neto": 16759.79,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 55611.94,
        "descuentos": 17571.08,
        "neto": 42985.14,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | ,",
        "bruto": 54313.25,
        "descuentos": 12562.47,
        "neto": 48828.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | | denia",
        "bruto": 46343.28,
        "descuentos": null,
        "neto": 12743.74,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | por la Ordenanza 2079/2011",
        "bruto": 46343.28,
        "descuentos": 12743.74,
        "neto": 34856.95,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio Flavio | AE _ /74| 12720,74 Art.12) Dispónese la publicación mensual, en",
        "bruto": 4634328,
        "descuentos": 12743,
        "neto": 3391754,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina la página web oficial de la Municipalidad de",
        "bruto": 46343.28,
        "descuentos": 8977.22,
        "neto": 37366.06,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 46343.28,
        "descuentos": 12095.55,
        "neto": 44013.61,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | datos personales, de las retribuciones brutas y",
        "bruto": 46343.28,
        "descuentos": 31294.38,
        "neto": 15161.92,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", 7 - cargos públicos, de los las funcionarios/as de — | gobierno así como de los las concejales/las",
        "bruto": 46343.28,
        "descuentos": 12687.68,
        "neto": 33655.6,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo , 926 municipales respectivamente.",
        "bruto": 41708,
        "descuentos": 10806.38,
        "neto": 30902.58,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BE E",
        "bruto": 41708.96,
        "descuentos": null,
        "neto": 10806.38,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-04",
    "anio": 2018,
    "mes": 4,
    "sac": false,
    "label": "Abril 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2018.pdf",
    "parseado": false,
    "cantidadFilas": 18,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 101112.6,
        "descuentos": 95255.67,
        "neto": 6492.93,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 80890.08,
        "descuentos": 30323.28,
        "neto": 50566.8,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 80890.44,
        "descuentos": 48198.54,
        "neto": 32691.9,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 80890.08,
        "descuentos": 32616.01,
        "neto": 48274.07,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| ESTE",
        "bruto": 80890.08,
        "descuentos": null,
        "neto": 29750.99,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| YT",
        "bruto": 60667.58,
        "descuentos": null,
        "neto": 19523.71,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 60667.58,
        "descuentos": 20216.54,
        "neto": 40451.04,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | ,",
        "bruto": 59250.82,
        "descuentos": 17937.24,
        "neto": 42478.61,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | — | | denia",
        "bruto": 50556.3,
        "descuentos": null,
        "neto": 15321.12,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | por la Ordenanza 2079/2011",
        "bruto": 50556.3,
        "descuentos": 15321.12,
        "neto": 35235.18,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "[Gonzalez Flavio | Flavio | | 50556,30 | | 15121,11 Art-18) Dispónese la publicación mensual, en",
        "bruto": 50556.3,
        "descuentos": 15121.11,
        "neto": 35753.19,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina | la página web oficial de la Municipalidad de",
        "bruto": 50556.3,
        "descuentos": 11277.69,
        "neto": 39278.61,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 50556.3,
        "descuentos": 16417.58,
        "neto": 34896.1,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo | datos personales, de las retribuciones brutas y",
        "bruto": 50556.3,
        "descuentos": 11277.69,
        "neto": 41806.43,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Nuñez, Ma. Florencia | ECT EL las elraicnies Eb Cy res maes eb",
        "bruto": 50556.3,
        "descuentos": null,
        "neto": 16641.83,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", 7 - cargos públicos, de los las funcionarios/as de — | gobierno así como de los las concejales/las",
        "bruto": 50556.3,
        "descuentos": 15035.42,
        "neto": 35520.88,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 45500.7,
        "descuentos": 13104.03,
        "neto": 32396.67,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| E EE",
        "bruto": 45500.7,
        "descuentos": null,
        "neto": 13104.03,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-03",
    "anio": 2018,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2018.pdf",
    "parseado": false,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN REMUNERACIÓN — Ma — Toselli, Gonzalo |",
        "bruto": 84886.52,
        "descuentos": 59233.7,
        "neto": 25652.82,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Fabrina |",
        "bruto": 92686.55,
        "descuentos": 45447.87,
        "neto": 47238.68,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo |",
        "bruto": 67408.04,
        "descuentos": 36115.8,
        "neto": 31292.24,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio |",
        "bruto": 67408.4,
        "descuentos": 21073.93,
        "neto": 46334.47,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| YT 2/4",
        "bruto": 92686.55,
        "descuentos": null,
        "neto": 31928.98,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| IE?\"",
        "bruto": 50556.3,
        "descuentos": null,
        "neto": 13906.72,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí |",
        "bruto": 50556.3,
        "descuentos": 14308.93,
        "neto": 36247.37,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gabiani, Ma. Cecilia | , 14 ,",
        "bruto": 50346.53,
        "descuentos": 12599.39,
        "neto": 37747,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina —__| — | | re",
        "bruto": 42130.26,
        "descuentos": null,
        "neto": 10656.13,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Girard, Romina | por la Ordenanza 2079/2011",
        "bruto": 42130.26,
        "descuentos": 10656.13,
        "neto": 31474.13,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gonzalez, Flavio Flavio | ZE _ | 10738,77 Art.12) Dispónese la publicación mensual, en",
        "bruto": 4270326,
        "descuentos": 10169.77,
        "neto": 32533.49,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina la página web oficial de la Municipalidad de",
        "bruto": 42130.26,
        "descuentos": 8176.75,
        "neto": 33953.51,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| Sunchales y del Concejo Municipal, junto a los",
        "bruto": 42130.26,
        "descuentos": 13550.48,
        "neto": 28579.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt Marcelo | datos personales, de las retribuciones brutas y",
        "bruto": 42130.26,
        "descuentos": 12811.08,
        "neto": 29319.18,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": ", 7 - cargos públicos, de los las funcionarios/as de — | gobierno así como de los las concejales/las",
        "bruto": 46343.3,
        "descuentos": 11507.65,
        "neto": 34835.65,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Ghiano, Pablo municipales respectivamente.",
        "bruto": 37917.22,
        "descuentos": 9329.79,
        "neto": 28587.43,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "| BETTA",
        "bruto": 37917.22,
        "descuentos": null,
        "neto": 9329.79,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-02",
    "anio": 2018,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2018.pdf",
    "parseado": false,
    "cantidadFilas": 4,
    "filas": [
      {
        "etiqueta": "E - O — E Y 4",
        "bruto": 41668.46,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "SIE -— segúnlo dispuesto — Art.12) Dispónese la publicación mensual, en",
        "bruto": 31982.19,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "la página web oficial E la miei de",
        "bruto": 31409.19,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Sunchales y del Concejo Municipal, junto a los — datos personales, de las retribuciones brutas y",
        "bruto": 31150.5,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2018-01",
    "anio": 2018,
    "mes": 1,
    "sac": false,
    "label": "Enero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2018.pdf",
    "parseado": false,
    "cantidadFilas": 4,
    "filas": [
      {
        "etiqueta": "ET NA — dm.é",
        "bruto": 46820.7,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "EII MEN ponia Ordenanza / — Art.12) Dispónese la publicación mensual, en",
        "bruto": 32827.18,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "la página web oficial E la miei de",
        "bruto": 31683.18,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Sunchales y del Concejo Municipal, junto a los — datos personales, de las retribuciones brutas y",
        "bruto": 31265.47,
        "descuentos": null,
        "neto": null,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-12",
    "anio": 2016,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12-1_remuneraciones_funcionarios_sac_diciembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-12",
    "anio": 2016,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 11,
    "filas": [
      {
        "etiqueta": "BRUTA — Toselli, Gonzalo",
        "bruto": 65267.64,
        "descuentos": null,
        "neto": 23082.67,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 16286.25,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 14265.01,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Carrer, Raquel",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 17444.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 39160.58,
        "descuentos": null,
        "neto": 11121.87,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Scandalo, Virginia Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8232.86,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.12) Dispónese la publicación mensual, en la página",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8232.86,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Gramco. Merilime cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 823286,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Castillo, Walter ño d óbli —",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8232.86,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ño de cargos públicos, de los las funcionarios/as de — Yacomosky, Lilia gobierno así como de los las concejales/las municipales",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 7446.1,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Smith, Marcelo respectivamente.",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 7167.09,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-11",
    "anio": 2016,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 10,
    "filas": [
      {
        "etiqueta": "REMUNERACIÓN N LA — Toselli, Gonzalo",
        "bruto": 65267.64,
        "descuentos": null,
        "neto": 24785.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 21727.26,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 17859.12,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Carrer, Raquel",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18039.28,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 39160.58,
        "descuentos": null,
        "neto": 11636,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Mendoza, Soledad Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9622.62,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.12) Dispónese la publicación mensual, en la página",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8944.6,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 35633.82,
        "descuentos": null,
        "neto": 7882.11,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "— ño de cargos públicos, de los las funcionarios/as de — Scandalo, Virginia gobierno así como de los las concejales/las municipales",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8305.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Castillo, Walter respectivamente.",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 788211,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-10",
    "anio": 2016,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 10,
    "filas": [
      {
        "etiqueta": "BRUTA === — Toselli, Gonzalo",
        "bruto": 65267.64,
        "descuentos": null,
        "neto": 24785.38,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 13103.81,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 17859.12,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Carrer, Raquel",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18039.28,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 39160.58,
        "descuentos": null,
        "neto": 11636,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Mendoza, Soledad Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9535.84,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.19) Dispónese la publicación mensual, en la página",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8885.89,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marilina cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 35633.82,
        "descuentos": null,
        "neto": 7882.11,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "— ño de cargos públicos, de los las funcionarios/as de — Scandalo, Virginia gobierno así como de los las concejales/las municipales",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 8252.64,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Castillo, Walter respectivamente.",
        "bruto": 47745.36,
        "descuentos": null,
        "neto": 11508.88,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-09",
    "anio": 2016,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 9,
    "filas": [
      {
        "etiqueta": "BRUTA — Toselli, Gonzalo",
        "bruto": 65267.64,
        "descuentos": null,
        "neto": 25438.05,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 19374.83,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18381.25,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Carrer, Raquel",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18561.42,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 39160.58,
        "descuentos": null,
        "neto": 11916.87,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9828.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Mendoza, Soledad Art.12) Dispónese la publicación mensual, en la página",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9828.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Pelosi, Federico cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 9024.3,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "- ño de cargos públicos, de los las funcionarios/as de — Schmidt, Marcelo gobierno así como de los las concejales/las municipales",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 7392.6,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-08",
    "anio": 2016,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2016.pdf",
    "parseado": false,
    "cantidadFilas": 10,
    "filas": [
      {
        "etiqueta": "BRUTA — Toselli, Gonzalo",
        "bruto": 65267.64,
        "descuentos": null,
        "neto": 25438.05,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 19374.83,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18381.25,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Carrer, Raquel",
        "bruto": 52214.1,
        "descuentos": null,
        "neto": 18561.42,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "s3916058 | —$T1607,1 — Diaz, Cintia Magalí",
        "bruto": 39160.58,
        "descuentos": null,
        "neto": 11916.87,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Mendoza, Soledad Según lo dispuesto por la Ordenanza 2079/2011",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9828.15,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.18) Dispónese la publicación mensual, en la página",
        "bruto": 32633.82,
        "descuentos": null,
        "neto": 9055.47,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Grande, Marina | | — | en dervenos deleyoo descaoo",
        "bruto": 2997042,
        "descuentos": null,
        "neto": 739260,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo ño de cargos públicos, de los las funcionarios/as de",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 7392.6,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Scandalo, Virginia gobierno así como de los las concejales/las municipales",
        "bruto": 29370.42,
        "descuentos": null,
        "neto": 7392.6,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-07",
    "anio": 2016,
    "mes": 7,
    "sac": false,
    "label": "Julio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-06",
    "anio": 2016,
    "mes": 6,
    "sac": false,
    "label": "Junio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-06",
    "anio": 2016,
    "mes": 6,
    "sac": false,
    "label": "Junio 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-05",
    "anio": 2016,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-04",
    "anio": 2016,
    "mes": 4,
    "sac": false,
    "label": "Abril 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2016.pdf",
    "parseado": false,
    "cantidadFilas": 10,
    "filas": [
      {
        "etiqueta": "BRUTA === — Toselli, Gonzalo",
        "bruto": 60247.04,
        "descuentos": null,
        "neto": 21482.85,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Bauducco, Leopoldo",
        "bruto": 48197.64,
        "descuentos": null,
        "neto": 15843.82,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Borra, Claudio",
        "bruto": 48197.64,
        "descuentos": null,
        "neto": 15142.39,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Diaz, Cintia Magalí",
        "bruto": 36148.22,
        "descuentos": null,
        "neto": 9712.73,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Mendoza, Soledad Según lo dispuesto por Ordenanza 2079/2011",
        "bruto": 30123.52,
        "descuentos": null,
        "neto": 8124.77,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Art.12) Dispónese la publicación mensual, en la página",
        "bruto": 30123.52,
        "descuentos": null,
        "neto": 7570.88,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Crande Marlin cejo Municipal, junto a los datos personales, de las retri-",
        "bruto": 27111.18,
        "descuentos": null,
        "neto": 6817.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Schmidt, Marcelo E óbli de | A",
        "bruto": 27111.18,
        "descuentos": null,
        "neto": 6817.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "ño de cargos públicos, de los/las funcionarios/as de — gobierno así como de los/las concejales/las municipales",
        "bruto": 27111.18,
        "descuentos": null,
        "neto": 6817.78,
        "ocrNoVerificado": true
      },
      {
        "etiqueta": "Scándalo, Virginia respectivamente.",
        "bruto": 27111.18,
        "descuentos": null,
        "neto": 6817.78,
        "ocrNoVerificado": true
      }
    ],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR.",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-03",
    "anio": 2016,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-02",
    "anio": 2016,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  },
  {
    "periodo": "2016-01",
    "anio": 2016,
    "mes": 1,
    "sac": false,
    "label": "Enero 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "OCR aplicado pero sin filas válidas detectadas",
    "ocrAplicado": true
  }
];

export const remuneracionesOcrMeta = {
  generadoEl: "2026-05-10T04:21:53.963Z",
  totalProcesados: 42,
  conFilas: 33,
  filasTotales: 391,
} as const;
