// AUTO-GENERADO por scripts/parsear-remuneraciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run parsear-remuneraciones
//
// Fuente oficial:
// https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/
//
// Última extracción: 2026-05-09T21:41:31.985Z
// Períodos parseados con éxito: 60/140
// Períodos escaneados (PDFs sin texto digital): 7
// Otros errores (timeout, formato no soportado): 73
// Filas extraídas en total: 1088

export type FilaFuncionario = {
  /** Texto literal (Apellido y Nombre, posiblemente con cargo) tal como aparece en el PDF. */
  etiqueta: string;
  /** Sueldo bruto en pesos. Null si no estaba en el PDF. */
  bruto: number | null;
  /** Descuentos en pesos. Null si no estaba en el PDF. */
  descuentos: number | null;
  /** Sueldo neto en pesos. Null si no estaba en el PDF. */
  neto: number | null;
};

export type RemuneracionDetalle = {
  /** YYYY-MM o YYYY-MM-SAC. */
  periodo: string;
  anio: number | null;
  mes: number | null;
  sac: boolean;
  label: string;
  urlPdf: string;
  /** True si el parser pudo extraer al menos una fila. */
  parseado: boolean;
  cantidadFilas: number;
  filas: FilaFuncionario[];
  error?: string;
};

export const remuneracionesDetalle: RemuneracionDetalle[] = [
  {
    "periodo": "2026-03",
    "anio": 2026,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/04/MARZO-2026.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo",
        "bruto": 6018832.34,
        "descuentos": 2105410.51,
        "neto": 403358495
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 4815065.88,
        "descuentos": 1743577.29,
        "neto": 307148859
      },
      {
        "etiqueta": "Chamorro Fernando",
        "bruto": 3611299.4,
        "descuentos": 996841.5,
        "neto": 272857910
      },
      {
        "etiqueta": "Zamateo Luis",
        "bruto": 4769989.15,
        "descuentos": 1451239.87,
        "neto": 328795728
      },
      {
        "etiqueta": "Bernini Daniel",
        "bruto": 4815065.88,
        "descuentos": 1486974.84,
        "neto": 342089491
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 4815065.88,
        "descuentos": 1530864.65,
        "neto": 341431846
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 3611299.4,
        "descuentos": 975301.62,
        "neto": 275011898
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 3544869.67,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 3611299.4,
        "descuentos": 975301.62,
        "neto": 275011898
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 3611299.4,
        "descuentos": 975301.62,
        "neto": 275011898
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 3611299.4,
        "descuentos": 975301.62,
        "neto": 275011898
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 3611299.4,
        "descuentos": 975301.62,
        "neto": 275011898
      },
      {
        "etiqueta": "Galli José",
        "bruto": 3611299.4,
        "descuentos": 1028510.83,
        "neto": 271936032
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 3611299.4,
        "descuentos": 1021845.66,
        "neto": 271897861
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 3009416.16,
        "descuentos": 806395.01,
        "neto": 233014880
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 3009416.16,
        "descuentos": 806395.01,
        "neto": 233014880
      },
      {
        "etiqueta": "Kemmerer Pablo",
        "bruto": 2708474.56,
        "descuentos": 729298.78,
        "neto": 211280666
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 2243881.12,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 3047033.88,
        "descuentos": 1669693.37,
        "neto": 211049801
      }
    ]
  },
  {
    "periodo": "2026-02",
    "anio": 2026,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/04/FEBRERO-2026.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo 4,88",
        "bruto": 5894.96,
        "descuentos": 2050114.79,
        "neto": 384485009
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 4715971.9,
        "descuentos": 1701051.21,
        "neto": 1701051.21
      },
      {
        "etiqueta": "Chamorro Fernando",
        "bruto": 3536978.92,
        "descuentos": 975755.27,
        "neto": 256122365
      },
      {
        "etiqueta": "Zamateo Luis",
        "bruto": 4576006.84,
        "descuentos": 1330624.73,
        "neto": 324538211
      },
      {
        "etiqueta": "Bernini Daniel",
        "bruto": 4715971.9,
        "descuentos": 1446691.22,
        "neto": 326928068
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 4715971.9,
        "descuentos": 1489794.07,
        "neto": 322617783
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 4483731.38,
        "descuentos": 1114891.48,
        "neto": 336883990
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 3409654.64,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 3536978.92,
        "descuentos": 954215.4,
        "neto": 258276352
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 3536978.92,
        "descuentos": 954215.4,
        "neto": 258276352
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 3536978.92,
        "descuentos": 954215.4,
        "neto": 258276352
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 3536978.92,
        "descuentos": 954215.4,
        "neto": 258276352
      },
      {
        "etiqueta": "Galli José",
        "bruto": 3536978.92,
        "descuentos": 1006721.66,
        "neto": 253025726
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 3536978.92,
        "descuentos": 1000056.48,
        "neto": 253692244
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 2947482.44,
        "descuentos": 791363.69,
        "neto": 215611875
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 2947482.44,
        "descuentos": 791363.69,
        "neto": 215611875
      },
      {
        "etiqueta": "Kemmerer Pablo",
        "bruto": 2652734.2,
        "descuentos": 715770.6,
        "neto": 193696360
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 219557840,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 2918007.62,
        "descuentos": 956634.47,
        "neto": 196137315
      }
    ]
  },
  {
    "periodo": "2026-01",
    "anio": 2026,
    "mes": 1,
    "sac": false,
    "label": "Enero 2026",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/02/Sueldo-Funcionarios-01-2026.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo",
        "bruto": 5431876.72,
        "descuentos": 1906639.07,
        "neto": 352523765
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 4345501.38,
        "descuentos": 1547153.79,
        "neto": 279834759
      },
      {
        "etiqueta": "Chamorro Fernando",
        "bruto": 3259126.06,
        "descuentos": 899393.34,
        "neto": 235973272
      },
      {
        "etiqueta": "Zamateo Luis",
        "bruto": 4346555.74,
        "descuentos": 1229847.13,
        "neto": 3116708.61
      },
      {
        "etiqueta": "Bernini Daniel",
        "bruto": 4345501.38,
        "descuentos": 1316489.25,
        "neto": 302901213
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 4345501.38,
        "descuentos": 1375531.86,
        "neto": 296996952
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 3259126.06,
        "descuentos": 879452.66,
        "neto": 237967340
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 3272007.98,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 3259126.06,
        "descuentos": 879452.66,
        "neto": 237967340
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 3259126.06,
        "descuentos": 879452.66,
        "neto": 237967340
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 3259126.06,
        "descuentos": 879452.66,
        "neto": 237967340
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 3259126.06,
        "descuentos": 878576.3,
        "neto": 238054976
      },
      {
        "etiqueta": "Galli José",
        "bruto": 3259126.06,
        "descuentos": 931974.4,
        "neto": 232715166
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 3259126.06,
        "descuentos": 924264.12,
        "neto": 233486194
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 2715938.34,
        "descuentos": 735167.93,
        "neto": 198077041
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 2715938.34,
        "descuentos": 735167.93,
        "neto": 198077041
      },
      {
        "etiqueta": "Kemmerer Pablo",
        "bruto": 2444344.54,
        "descuentos": 665194.42,
        "neto": 177915012
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 2023574.57,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 2688778.99,
        "descuentos": 888966.17,
        "neto": 179981282
      }
    ]
  },
  {
    "periodo": "2025-12",
    "anio": 2025,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2026/02/Sueldo-Funcionario-12-2025.pdf",
    "parseado": true,
    "cantidadFilas": 18,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo",
        "bruto": 5431876.72,
        "descuentos": 2005412.26,
        "neto": 342646446
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 4345501.38,
        "descuentos": 1657426.04,
        "neto": 268807534
      },
      {
        "etiqueta": "Chamorro Fernando 2346742.30",
        "bruto": 3259126.06,
        "descuentos": null,
        "neto": 912383.76
      },
      {
        "etiqueta": "Zamateo Luis — Bernini Daniel",
        "bruto": 4345501.38,
        "descuentos": 1417582.99,
        "neto": 292791839
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 4345501.38,
        "descuentos": 1321388.8,
        "neto": 302411258
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 3259126.06,
        "descuentos": 884898.98,
        "neto": 237422708
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 2882028,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 3259126.06,
        "descuentos": 884898.98,
        "neto": 237422708
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 3259126.06,
        "descuentos": 884898.98,
        "neto": 237422708
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 3259126.06,
        "descuentos": 884271.19,
        "neto": 237485487
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 3259126.06,
        "descuentos": 884271.19,
        "neto": 237485487
      },
      {
        "etiqueta": "Galli José",
        "bruto": 3259126.06,
        "descuentos": 910360.79,
        "neto": 234876527
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 3259126.06,
        "descuentos": 917183.85,
        "neto": 234194221
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 2715938.34,
        "descuentos": 735167.93,
        "neto": 198077041
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 2715938.34,
        "descuentos": 735167.93,
        "neto": 198077041
      },
      {
        "etiqueta": "Kemmerer Pablo 1779150.12",
        "bruto": 2444344.54,
        "descuentos": null,
        "neto": 665194.42
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 2023574.57,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 2688778.99,
        "descuentos": 880052.25,
        "neto": 180872674
      }
    ]
  },
  {
    "periodo": "2025-11",
    "anio": 2025,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/12/2025-11-sueldos-funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo",
        "bruto": 5222690.2,
        "descuentos": 1829150.45,
        "neto": 339353975
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 4178152.16,
        "descuentos": 1499701.9,
        "neto": 267845026
      },
      {
        "etiqueta": "Chamorro Fernando",
        "bruto": 3133614.12,
        "descuentos": 866687.66,
        "neto": 227808377
      },
      {
        "etiqueta": "Zamateo Luis",
        "bruto": 4102862.85,
        "descuentos": 1220557.23,
        "neto": 288230562
      },
      {
        "etiqueta": "Bernini Daniel",
        "bruto": 4178152.16,
        "descuentos": 1264971.16,
        "neto": 291318100
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 4178152.16,
        "descuentos": 1158452.19,
        "neto": 301969997
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 3133614.12,
        "descuentos": 845147.78,
        "neto": 228846634
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 3133614,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 3133614.12,
        "descuentos": 845147.78,
        "neto": 228846634
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 3133614.12,
        "descuentos": 845147.78,
        "neto": 228846634
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 3133614.12,
        "descuentos": 845147.78,
        "neto": 228846634
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 3133614.12,
        "descuentos": 845147.78,
        "neto": 228846634
      },
      {
        "etiqueta": "Galli José",
        "bruto": 3133614.12,
        "descuentos": 876483.92,
        "neto": 225713020
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 3133614.12,
        "descuentos": 882641.92,
        "neto": 225097220
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 2611345.1,
        "descuentos": 707623.16,
        "neto": 190372194
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 2611345.1,
        "descuentos": 707623.16,
        "neto": 190372194
      },
      {
        "etiqueta": "Kemmerer Pablo 0",
        "bruto": 2350210.58,
        "descuentos": 640188.1,
        "neto": 171002248
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 1888388.13,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 2585231.64,
        "descuentos": 73177.41,
        "neto": 171205423
      }
    ]
  },
  {
    "periodo": "2025-10",
    "anio": 2025,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/11/sueldos-funcionarios-10-2025.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Pinotti Pablo",
        "bruto": 4942903.2,
        "descuentos": 1749450.53,
        "neto": 3193452.67
      },
      {
        "etiqueta": "Ochat Andrea",
        "bruto": 3954322.56,
        "descuentos": 1419537.55,
        "neto": 2534785.01
      },
      {
        "etiqueta": "Chamorro Fernando",
        "bruto": 3954322.56,
        "descuentos": 1196470.53,
        "neto": 2757852.03
      },
      {
        "etiqueta": "Zamateo Luis",
        "bruto": 3896107.36,
        "descuentos": 1145104.5,
        "neto": 2751002.86
      },
      {
        "etiqueta": "Bernini Daniel",
        "bruto": 3954322.56,
        "descuentos": 1196470.53,
        "neto": 2757852.03
      },
      {
        "etiqueta": "Gamero María Eugenia",
        "bruto": 2965741.92,
        "descuentos": 845452.63,
        "neto": 2120289.29
      },
      {
        "etiqueta": "Bongiovanni Fabián",
        "bruto": 2965741.92,
        "descuentos": 804405.21,
        "neto": 2161336.71
      },
      {
        "etiqueta": "García Daniel",
        "bruto": 2901121,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Cabalaro Luciano",
        "bruto": 2965741.92,
        "descuentos": 804405.21,
        "neto": 2161336.71
      },
      {
        "etiqueta": "Lattanzi José",
        "bruto": 2965741.92,
        "descuentos": 804405.21,
        "neto": 2161336.71
      },
      {
        "etiqueta": "Sinner Luciana",
        "bruto": 2965741.92,
        "descuentos": 804405.21,
        "neto": 2161336.71
      },
      {
        "etiqueta": "Ortiz Vanesa",
        "bruto": 2965741.92,
        "descuentos": 804405.21,
        "neto": 2161336.71
      },
      {
        "etiqueta": "Galli José",
        "bruto": 2965741.92,
        "descuentos": 834062.63,
        "neto": 2131679.29
      },
      {
        "etiqueta": "Riera Elisa",
        "bruto": 2965741.92,
        "descuentos": 840220.63,
        "neto": 2125521.29
      },
      {
        "etiqueta": "Botto Juan",
        "bruto": 2471451.6,
        "descuentos": 673671.01,
        "neto": 1797780.59
      },
      {
        "etiqueta": "Marti Juan Cruz",
        "bruto": 2471451.6,
        "descuentos": 673671.01,
        "neto": 1797780.59
      },
      {
        "etiqueta": "Kemmerer Pablo",
        "bruto": 2224306.44,
        "descuentos": 609631.18,
        "neto": 1614675.26
      },
      {
        "etiqueta": "Gorosito, María",
        "bruto": 1781498.24,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Moyano, Daniela",
        "bruto": 2224306.44,
        "descuentos": 745279.97,
        "neto": 1479026.47
      }
    ]
  },
  {
    "periodo": "2025-09",
    "anio": 2025,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/10/2025_09_sueldos_funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 45759955.18,
        "descuentos": 1540441.09,
        "neto": 3035514.09
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3660764.16,
        "descuentos": 1323466.83,
        "neto": 2337297.33
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3660764.16,
        "descuentos": 1088843.6,
        "neto": 2571920.56
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3444078.67,
        "descuentos": 1029054.37,
        "neto": 2533592.74
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3660764.16,
        "descuentos": 1008843.6,
        "neto": 2571920.56
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2693276.48,
        "descuentos": 776600.61,
        "neto": 1916675.87
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2693276.48,
        "descuentos": 738277.85,
        "neto": 1954998.63
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2693276.48,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2693276.48,
        "descuentos": 738277.85,
        "neto": 1954998.63
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2693276.48,
        "descuentos": 738277.85,
        "neto": 1954998.63
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2693276.48,
        "descuentos": 738277.85,
        "neto": 1954998.63
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2693276.48,
        "descuentos": 738277.85,
        "neto": 1954998.63
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2693276.48,
        "descuentos": 765210.61,
        "neto": 1928065.87
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2693276.48,
        "descuentos": 771368.61,
        "neto": 1921907.87
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 2287977.6,
        "descuentos": 629141.87,
        "neto": 1658835.73
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2287977.6,
        "descuentos": 629141.87,
        "neto": 1658835.73
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 2059179.84,
        "descuentos": 519762.94,
        "neto": 1539416.9
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 2059179.84,
        "descuentos": 569554.94,
        "neto": 1489624.9
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1489624.9,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 2059179.84,
        "descuentos": 687534.59,
        "neto": 1371645.25
      }
    ]
  },
  {
    "periodo": "2025-08",
    "anio": 2025,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/10/2025_08_sueldos_funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 4358052.56,
        "descuentos": 1411430.58,
        "neto": 294662198
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3486442,
        "descuentos": 1250005.72,
        "neto": 225629579
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3486442,
        "descuentos": 995701.01,
        "neto": 249074099
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3280074.06,
        "descuentos": 1103791.7,
        "neto": 233691850
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3486442,
        "descuentos": 995701.01,
        "neto": 249074099
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2614832,
        "descuentos": 756777.69,
        "neto": 185805431
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2614832,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2614832,
        "descuentos": 745387.69,
        "neto": 186944431
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2614832,
        "descuentos": 751545.69,
        "neto": 186328631
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 2179026,
        "descuentos": 602699.31,
        "neto": 157632669
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2179026,
        "descuentos": 602699.31,
        "neto": 157632669
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 1961124,
        "descuentos": 495964.79,
        "neto": 146515921
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 1961124,
        "descuentos": 545756.79,
        "neto": 141536721
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1465159.21,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1961124,
        "descuentos": 702110.98,
        "neto": 125901302
      }
    ]
  },
  {
    "periodo": "2025-07",
    "anio": 2025,
    "mes": 7,
    "sac": false,
    "label": "Julio 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-07-sueldos-funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 4358052.56,
        "descuentos": 1411430.58,
        "neto": 294662198
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3486442,
        "descuentos": 1250005.72,
        "neto": 225629579
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3486442,
        "descuentos": 995701.01,
        "neto": 249074099
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3280074.06,
        "descuentos": 1103791.7,
        "neto": 233691850
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3486442,
        "descuentos": 995701.01,
        "neto": 249074099
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2614832,
        "descuentos": 756777.69,
        "neto": 185805431
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2614832,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2614832,
        "descuentos": 719239.37,
        "neto": 189559263
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2614832,
        "descuentos": 745387.69,
        "neto": 186944431
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2614832,
        "descuentos": 751545.69,
        "neto": 186328631
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 2179026,
        "descuentos": 602699.31,
        "neto": 157632669
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2179026,
        "descuentos": 602699.31,
        "neto": 157632669
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 1961124,
        "descuentos": 495964.79,
        "neto": 146515921
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 1961124,
        "descuentos": 545756.79,
        "neto": 141536721
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1465159.21,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1961124,
        "descuentos": 702110.98,
        "neto": 125901302
      }
    ]
  },
  {
    "periodo": "2025-06",
    "anio": 2025,
    "mes": 6,
    "sac": false,
    "label": "Junio 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-06-sueldos-funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 4805348,
        "descuentos": 1797362.73,
        "neto": 318237269
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3960440,
        "descuentos": 1535564.8,
        "neto": 256177150
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3960440,
        "descuentos": 1309590.95,
        "neto": 278774535
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3626145.61,
        "descuentos": 1238494.63,
        "neto": 267801342
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3960440,
        "descuentos": 1309590.95,
        "neto": 278774535
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2883208,
        "descuentos": 834597.3,
        "neto": 215324317
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2883208,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2883208,
        "descuentos": 794374.22,
        "neto": 219346625
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2883208,
        "descuentos": 829365.3,
        "neto": 215847517
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 2402674,
        "descuentos": 666978.68,
        "neto": 182288903
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2402674,
        "descuentos": 666978.68,
        "neto": 182288903
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 2162410,
        "descuentos": 554816.91,
        "neto": 168606742
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 2162410,
        "descuentos": 604608.91,
        "neto": 163627542
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1686067.42,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 2162410,
        "descuentos": 730308.14,
        "neto": 151057619
      }
    ]
  },
  {
    "periodo": "2025-06-SAC",
    "anio": 2025,
    "mes": 6,
    "sac": true,
    "label": "Junio 2025 — SAC",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-06-SAC-sueldos-funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2092650,
        "descuentos": 470846.25,
        "neto": 162180375
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 1674120,
        "descuentos": 452012.4,
        "neto": 122210760
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 1674120,
        "descuentos": 359935.8,
        "neto": 131418420
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2924311.39,
        "descuentos": 899694.82,
        "neto": 2142477.8
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 1674120,
        "descuentos": 359935.8,
        "neto": 131418420
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1255590,
        "descuentos": 269951.85,
        "neto": 98563815
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1255590,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1255590,
        "descuentos": 257395.95,
        "neto": 99819405
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1255590,
        "descuentos": 269951.85,
        "neto": 98563815
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1046325,
        "descuentos": 209264.99,
        "neto": 83706001
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1046325,
        "descuentos": 209264.99,
        "neto": 83706001
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 941693,
        "descuentos": 188338.59,
        "neto": 75335441
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 941693,
        "descuentos": 188338.59,
        "neto": 75335441
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 75335441,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 941693,
        "descuentos": 235894.09,
        "neto": 70579891
      }
    ]
  },
  {
    "periodo": "2025-05",
    "anio": 2025,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/08/2025-05-sueldos-funcionarios.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3875276,
        "descuentos": 1307394.29,
        "neto": 256788171
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3042140,
        "descuentos": 1039161.72,
        "neto": 2002978.28
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3042140,
        "descuentos": 889262.09,
        "neto": 2152877.91
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2924311.39,
        "descuentos": 899694.82,
        "neto": 2142477.8
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3042140,
        "descuentos": 889262.09,
        "neto": 2152877.91
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2325166,
        "descuentos": 662189.09,
        "neto": 166297691
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2325166,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2325166,
        "descuentos": 662189.09,
        "neto": 166297691
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1937638,
        "descuentos": 534114.44,
        "neto": 140352356
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2088278,
        "descuentos": 570674.77,
        "neto": 151760323
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Función Pública Sanchez Lucía",
        "bruto": 1743874,
        "descuentos": 433238.22,
        "neto": 131063578
      },
      {
        "etiqueta": "Dirección de Cultura Kemmerer Pablo",
        "bruto": 1743874,
        "descuentos": 483030.22,
        "neto": 126084378
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1310635,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1743874,
        "descuentos": 583256.31,
        "neto": 1160617.69
      }
    ]
  },
  {
    "periodo": "2025-04",
    "anio": 2025,
    "mes": 4,
    "sac": false,
    "label": "Abril 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2025.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3875276,
        "descuentos": 1307394.28,
        "neto": 293582379
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3173976.1,
        "descuentos": 1039161.73,
        "neto": 213481437
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3321803.21,
        "descuentos": 889262.08,
        "neto": 243254113
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3074326.01,
        "descuentos": 917816.38,
        "neto": 215650963
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3215361.36,
        "descuentos": 889262.08,
        "neto": 232609928
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2325166,
        "descuentos": 662189.09,
        "neto": 166297691
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2325166,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2325166,
        "descuentos": 638937.43,
        "neto": 168622857
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2325166,
        "descuentos": 662189.09,
        "neto": 166297691
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1937638,
        "descuentos": 534114.44,
        "neto": 140352356
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2088278,
        "descuentos": 570674.77,
        "neto": 151760323
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1743874,
        "descuentos": 483030.22,
        "neto": 126084378
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1310635,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1743874,
        "descuentos": 595475.68,
        "neto": 114839832
      }
    ]
  },
  {
    "periodo": "2025-03",
    "anio": 2025,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2025.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 4176556,
        "descuentos": 1433980.84,
        "neto": 274257516
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 3225080,
        "descuentos": 1139042.17,
        "neto": 208603783
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 3225080,
        "descuentos": 984007.96,
        "neto": 224107204
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 3177168.98,
        "descuentos": 1055378.19,
        "neto": 227180541
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 3225080,
        "descuentos": 984007.96,
        "neto": 224107204
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2505934,
        "descuentos": 707869.16,
        "neto": 179806484
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2505934,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2505934,
        "descuentos": 682809.82,
        "neto": 182312418
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2505934,
        "descuentos": 707869.16,
        "neto": 179806484
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 2088278,
        "descuentos": 570674.77,
        "neto": 151760323
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 2088278,
        "descuentos": 570674.77,
        "neto": 151760323
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1879448,
        "descuentos": 515934.03,
        "neto": 136351397
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 136351397,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1879448,
        "descuentos": 645572.23,
        "neto": 123387577
      }
    ]
  },
  {
    "periodo": "2025-02",
    "anio": 2025,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2025.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3688336,
        "descuentos": 1228849.11,
        "neto": 245948689
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea , 39",
        "bruto": 2950670,
        "descuentos": 1003250.61,
        "neto": 1947419
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2950670,
        "descuentos": 855394.17,
        "neto": 209527583
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2785056.93,
        "descuentos": 854197.63,
        "neto": 203454551
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2950670,
        "descuentos": 855394.17,
        "neto": 209527583
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 157915675
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 160128677
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2213002,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 160128677
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 160128677
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 1601286.77
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 1601286.77
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 1601286.77
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 157915675
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1844168,
        "descuentos": 511429.27,
        "neto": 133273873
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1844168,
        "descuentos": 511429.27,
        "neto": 133273873
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1659752,
        "descuentos": 462613.81,
        "neto": 119713819
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 119713819,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1659752,
        "descuentos": 545325.97,
        "neto": 111442603
      }
    ]
  },
  {
    "periodo": "2025-01",
    "anio": 2025,
    "mes": 1,
    "sac": false,
    "label": "Enero 2025",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2025.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3688336,
        "descuentos": 1265732.47,
        "neto": 2422603.53
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2950670,
        "descuentos": 1003250.6,
        "neto": 1947419.4
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2950670,
        "descuentos": 884900.88,
        "neto": 206576912
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2785056.93,
        "descuentos": 882048.21,
        "neto": 2038005.5
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2950670,
        "descuentos": 2950670,
        "neto": 209527582
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2213002,
        "descuentos": 655975.27,
        "neto": 155702673
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 1579156.75
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2213002,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 1579156.75
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 1579156.75
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2213002,
        "descuentos": 611715.23,
        "neto": 1601286.77
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 1579156.75
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2213002,
        "descuentos": 633845.25,
        "neto": 1579156.75
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2213002,
        "descuentos": 655975.27,
        "neto": 1557026.73
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1844168,
        "descuentos": 529870.95,
        "neto": 1314297.05
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1844168,
        "descuentos": 529870.95,
        "neto": 1314297.05
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1659752,
        "descuentos": 412821.81,
        "neto": 1246930.19
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1246930.19,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1659752,
        "descuentos": 561923.49,
        "neto": 1097828.51
      }
    ]
  },
  {
    "periodo": "2024-12",
    "anio": 2024,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3688336,
        "descuentos": 1309600.75,
        "neto": 237873525
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2950670,
        "descuentos": 1058593.34,
        "neto": 189207666
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2950670,
        "descuentos": 920535.7,
        "neto": 203013430
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 203013430,
        "descuentos": 863468.54,
        "neto": 197519497
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2950670,
        "descuentos": 920581.25,
        "neto": 203008875
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2213002,
        "descuentos": 655575.27,
        "neto": 155742673
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2213002,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2213002,
        "descuentos": 655575.27,
        "neto": 1557426.73
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1844168,
        "descuentos": 529470.95,
        "neto": 1314697.05
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1844168,
        "descuentos": 529470.95,
        "neto": 1314697.05
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1659752,
        "descuentos": 412421.81,
        "neto": 1247330.19
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1247330.19,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1659752,
        "descuentos": 561523.49,
        "neto": 1098228.51
      }
    ]
  },
  {
    "periodo": "2024-12",
    "anio": 2024,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3688336,
        "descuentos": 1309600.75,
        "neto": 237873525
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2950670,
        "descuentos": 1058593.34,
        "neto": 189207666
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2950670,
        "descuentos": 920535.7,
        "neto": 203013430
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 203013430,
        "descuentos": 863468.54,
        "neto": 197519497
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2950670,
        "descuentos": 920581.25,
        "neto": 203008875
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2213002,
        "descuentos": 655575.27,
        "neto": 155742673
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2213002,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2213002,
        "descuentos": 633445.25,
        "neto": 1579556.75
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2213002,
        "descuentos": 655575.27,
        "neto": 1557426.73
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1844168,
        "descuentos": 529470.95,
        "neto": 1314697.05
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1844168,
        "descuentos": 529470.95,
        "neto": 1314697.05
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1659752,
        "descuentos": 412421.81,
        "neto": 1247330.19
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1247330.19,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1659752,
        "descuentos": 561523.49,
        "neto": 1098228.51
      }
    ]
  },
  {
    "periodo": "2024-11",
    "anio": 2024,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3589980,
        "descuentos": 1319090.37,
        "neto": 227088963
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2871984,
        "descuentos": 889585.34,
        "neto": 184434313
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2871984,
        "descuentos": 831028.21,
        "neto": 198239866
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2690450.93,
        "descuentos": 842313.66,
        "neto": 192038727
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2871984,
        "descuentos": 889585.34,
        "neto": 184434313
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2153988,
        "descuentos": 640072.29,
        "neto": 151391571
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2153988,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2153988,
        "descuentos": 618532.41,
        "neto": 153545559
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2153988,
        "descuentos": 640072.29,
        "neto": 151391571
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1794990,
        "descuentos": 517043.67,
        "neto": 127794633
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1794990,
        "descuentos": 517043.67,
        "neto": 127794633
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1615490,
        "descuentos": 401679.42,
        "neto": 121381058
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 121381058,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1615490,
        "descuentos": 546857.34,
        "neto": 106863266
      }
    ]
  },
  {
    "periodo": "2024-10",
    "anio": 2024,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3491624,
        "descuentos": 1307439.13,
        "neto": 218418487
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2793298,
        "descuentos": 969650.05,
        "neto": 182364795
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2793298,
        "descuentos": 831028.21,
        "neto": 196226979
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2616739.43,
        "descuentos": 807098.18,
        "neto": 188218442
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2793298,
        "descuentos": 831028.21,
        "neto": 196226979
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2094974,
        "descuentos": 612643.67,
        "neto": 148233033
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2094974,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2094974,
        "descuentos": 591693.93,
        "neto": 150328007
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2094974,
        "descuentos": 612643.67,
        "neto": 148233033
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1745812,
        "descuentos": 494578.69,
        "neto": 125123331
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo — Marti Juan Cruz",
        "bruto": 1745812,
        "descuentos": 494578.69,
        "neto": 125123331
      },
      {
        "etiqueta": "y evaluación de gestión — Dirección de Cultura Kemmerer Pablo",
        "bruto": 1571230,
        "descuentos": 374625.22,
        "neto": 119660478
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 119660478,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1571230,
        "descuentos": 508985.79,
        "neto": 106224421
      }
    ]
  },
  {
    "periodo": "2024-09",
    "anio": 2024,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3196564,
        "descuentos": 1134227.19,
        "neto": 2062336.81
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2557252,
        "descuentos": 888311.91,
        "neto": 1668940.09
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2557252,
        "descuentos": 743197.04,
        "neto": 1814054.96
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2455717.84,
        "descuentos": 719239.64,
        "neto": 180264532
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2557252,
        "descuentos": 742604.75,
        "neto": 1814647.25
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1917938,
        "descuentos": 532372.4,
        "neto": 1385565.6
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 140474498
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1917938,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 1404744.98
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 1404744.98
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 140474498
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 1404744.98
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1917938,
        "descuentos": 513193.02,
        "neto": 140474498
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1917938,
        "descuentos": 532372.4,
        "neto": 1385565.6
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1598282,
        "descuentos": 421136.51,
        "neto": 1177145.49
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1598282,
        "descuentos": 421136.51,
        "neto": 1177145.49
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Educación Gorosito, María",
        "bruto": 1179532,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 846474,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1438454,
        "descuentos": 452937.4,
        "neto": 97551660
      }
    ]
  },
  {
    "periodo": "2024-08",
    "anio": 2024,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2024.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 3344100,
        "descuentos": 977154.42,
        "neto": 231694558
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2675280,
        "descuentos": 802537.57,
        "neto": 182274243
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2675280,
        "descuentos": 667426.22,
        "neto": 195785378
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2505245.75,
        "descuentos": 687635.1,
        "neto": 183190176
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2675280,
        "descuentos": 667426.22,
        "neto": 195785378
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 2006460,
        "descuentos": 462746,
        "neto": 149371400
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 2006460,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 2006460,
        "descuentos": 442681.4,
        "neto": 151377860
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 2006460,
        "descuentos": 462746,
        "neto": 149371400
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1672050,
        "descuentos": 370261.5,
        "neto": 125178850
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1672050,
        "descuentos": 370261.5,
        "neto": 125178850
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 1504846,
        "descuentos": 334051.74,
        "neto": 112079426
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 112079426,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 846474,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1504846,
        "descuentos": 409907.69,
        "neto": 104493831
      }
    ]
  },
  {
    "periodo": "2024-07",
    "anio": 2024,
    "mes": 7,
    "sac": false,
    "label": "Julio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2024.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2967068,
        "descuentos": 815196.83,
        "neto": 215187117
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2373654,
        "descuentos": 572721.6,
        "neto": 180093240
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2373654,
        "descuentos": 572721.6,
        "neto": 180093240
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2222425.75,
        "descuentos": 616291.25,
        "neto": 166768861
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2373654,
        "descuentos": 572721.6,
        "neto": 180093240
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1780240,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1483534,
        "descuentos": 334283.46,
        "neto": 1149250.54
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1483534,
        "descuentos": 334283.46,
        "neto": 1149250.54
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 1335180,
        "descuentos": 301655.2,
        "neto": 1033524.8
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 107349580,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 846474,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1335180,
        "descuentos": 366210.35,
        "neto": 968969.65
      }
    ]
  },
  {
    "periodo": "2024-06",
    "anio": 2024,
    "mes": 6,
    "sac": false,
    "label": "Junio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2024.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2967068,
        "descuentos": 919474.36,
        "neto": 2047593.64
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2373654,
        "descuentos": 530053.26,
        "neto": 1843600.74
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2373654,
        "descuentos": 530053.26,
        "neto": 1843600.74
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 2222425.75,
        "descuentos": 616291.25,
        "neto": 1672516.25
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2373654,
        "descuentos": 530053.26,
        "neto": 1843600.74
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1780240,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1780240,
        "descuentos": 399539.6,
        "neto": 1380700.4
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1483534,
        "descuentos": 334283.46,
        "neto": 1149250.54
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1483534,
        "descuentos": 334283.46,
        "neto": 1149250.54
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 1335180,
        "descuentos": 301655.2,
        "neto": 1033524.8
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1033524.8,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 1033524.8,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1335180,
        "descuentos": 366210.35,
        "neto": 968969.65
      }
    ]
  },
  {
    "periodo": "2024-06",
    "anio": 2024,
    "mes": 6,
    "sac": false,
    "label": "Junio 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2024.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 1483534,
        "descuentos": 267036.12,
        "neto": 1216497.88
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 1186827,
        "descuentos": 213628.85,
        "neto": 973198.15
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 1186827,
        "descuentos": 213628.85,
        "neto": 973198.15
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 1111212.87,
        "descuentos": 258356.99,
        "neto": 852855.88
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 1186827,
        "descuentos": 213628.85,
        "neto": 973198.15
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 890120,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 890120,
        "descuentos": 160221.6,
        "neto": 729898.4
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 741767,
        "descuentos": 133518.06,
        "neto": 608248.94
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 741767,
        "descuentos": 133518.06,
        "neto": 608248.94
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 667590,
        "descuentos": 120166.2,
        "neto": 547423.8
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 547423.8,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 547423.8,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 667590,
        "descuentos": 120166.2,
        "neto": 547423.8
      }
    ]
  },
  {
    "periodo": "2024-05",
    "anio": 2024,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2024.pdf",
    "parseado": true,
    "cantidadFilas": 20,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo , 00",
        "bruto": 2960800,
        "descuentos": 2960800,
        "neto": 2305824
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea , 40",
        "bruto": 2368640,
        "descuentos": 524700.6,
        "neto": 1843939
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando , 40",
        "bruto": 2368640,
        "descuentos": 524700.6,
        "neto": 1843939
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis , 33",
        "bruto": 2218441.36,
        "descuentos": 610025.03,
        "neto": 1674717
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel , 40",
        "bruto": 2368640,
        "descuentos": 524700.6,
        "neto": 1843939
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1776480,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa , 80",
        "bruto": 1776480,
        "descuentos": 394425.2,
        "neto": 1382054
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan , 00",
        "bruto": 1480400,
        "descuentos": 329288,
        "neto": 1151112
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz , 00",
        "bruto": 1480400,
        "descuentos": 329288,
        "neto": 1151112
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 1332359,
        "descuentos": 296719.21,
        "neto": 1035639.79
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 1035639.79,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 1035639.79,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Salud Moyano, Daniela",
        "bruto": 1332359,
        "descuentos": 359604.46,
        "neto": 972754.54
      }
    ]
  },
  {
    "periodo": "2024-04",
    "anio": 2024,
    "mes": 4,
    "sac": false,
    "label": "Abril 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2612700,
        "descuentos": 566157,
        "neto": 2046543
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 1956283.97,
        "descuentos": 529450.87,
        "neto": 1490197.88
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1567620,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1306350,
        "descuentos": 284878.5,
        "neto": 1021471.5
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1306350,
        "descuentos": 284878.5,
        "neto": 1021471.5
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio, Micaela",
        "bruto": 1175715,
        "descuentos": 256749.85,
        "neto": 918965.15
      },
      {
        "etiqueta": "Dirección de Educación Gorosito, María",
        "bruto": 918965.15,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez, César",
        "bruto": 918965.15,
        "descuentos": null,
        "neto": null
      }
    ]
  },
  {
    "periodo": "2024-03",
    "anio": 2024,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2612700,
        "descuentos": 566157,
        "neto": 2046543
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 1956283.97,
        "descuentos": 529450.87,
        "neto": 1492936.76
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 2090160,
        "descuentos": 453645.4,
        "neto": 1636514.6
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1567620,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1567620,
        "descuentos": 341133.8,
        "neto": 1226486.2
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1306350,
        "descuentos": 284878.5,
        "neto": 1021471.5
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1306350,
        "descuentos": 284878.5,
        "neto": 1021471.5
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio , Micaela",
        "bruto": 1175715,
        "descuentos": 256749.85,
        "neto": 918965.15
      },
      {
        "etiqueta": "Dirección de Educación Gorosito , María",
        "bruto": 803653,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez , César",
        "bruto": 803653,
        "descuentos": null,
        "neto": null
      }
    ]
  },
  {
    "periodo": "2024-02",
    "anio": 2024,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 2204808,
        "descuentos": 421513.52,
        "neto": 1783294.48
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 1763846,
        "descuentos": 337730.74,
        "neto": 1426115.26
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 1763846,
        "descuentos": 337730.74,
        "neto": 1426115.26
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo Luis",
        "bruto": 1651753.33,
        "descuentos": 405050.18,
        "neto": 1284929.17
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 1763846,
        "descuentos": 337730.74,
        "neto": 1426115.26
      },
      {
        "etiqueta": "Gamero María — Subsecretaría de Gobierno",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 1322884,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 1322884,
        "descuentos": 253947.96,
        "neto": 1068936.04
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 1102404,
        "descuentos": 212056.76,
        "neto": 890347.24
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 1102404,
        "descuentos": 212056.76,
        "neto": 890347.24
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio , Micaela",
        "bruto": 992164,
        "descuentos": 191111.16,
        "neto": 801052.84
      },
      {
        "etiqueta": "Dirección de Educación Gorosito , María",
        "bruto": 803653,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez , César",
        "bruto": 803653,
        "descuentos": null,
        "neto": null
      }
    ]
  },
  {
    "periodo": "2024-01",
    "anio": 2024,
    "mes": 1,
    "sac": false,
    "label": "Enero 2024",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2024.pdf",
    "parseado": true,
    "cantidadFilas": 19,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti Pablo",
        "bruto": 1639260,
        "descuentos": 314059.4,
        "neto": 1325200.6
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat Andrea",
        "bruto": 1254636,
        "descuentos": 240980.84,
        "neto": 1013655.26
      },
      {
        "etiqueta": "Secretaría de Producción y Finanzas Chamorro Fernando",
        "bruto": 1254636,
        "descuentos": 240980.84,
        "neto": 1013655.26
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y Territorial Zamateo Luis",
        "bruto": 1228515.5,
        "descuentos": 296886.7,
        "neto": 986134.59
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini Daniel",
        "bruto": 1254636,
        "descuentos": 240980.84,
        "neto": 1013655.16
      },
      {
        "etiqueta": "Promoción de Derechos — Subsecretaría de Gobierno Gamero María Eugenia",
        "bruto": 1099188,
        "descuentos": 211445.72,
        "neto": 887742.28
      },
      {
        "etiqueta": "Subsecretaría de Seguridad Ciudadana y — Bongiovanni Fabián",
        "bruto": 1665516,
        "descuentos": 319048.04,
        "neto": 846467.96
      },
      {
        "etiqueta": "Convivencia — Subsecretaría de Hacienda y Finanzas García Daniel",
        "bruto": 983556,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo Económico y — Cabalaro Luciano",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Productivo — Subsecretaría Obras y Servicios Públicos Lattanzi José",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Subsecretaría de Ambiente y Acción — Sinner Luciana",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Subsecretaría de Economía Social y — Ortiz Vanesa",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Productiva — Subsecretaría de Cultura y Educación Galli José",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Subsecretaría de Promoción de Derechos Riera Elisa",
        "bruto": 983556,
        "descuentos": 189475.64,
        "neto": 794080.36
      },
      {
        "etiqueta": "Coordinación de Comunicación Botto Juan",
        "bruto": 819630,
        "descuentos": 158329.7,
        "neto": 661300.3
      },
      {
        "etiqueta": "Coordinación de Planificación, monitoreo y — Marti Juan Cruz",
        "bruto": 819630,
        "descuentos": 158329.7,
        "neto": 661300.3
      },
      {
        "etiqueta": "evaluación de gestión — Dirección de Cultura Bossio , Micaela",
        "bruto": 1249137,
        "descuentos": 239936.02,
        "neto": 709200.98
      },
      {
        "etiqueta": "Dirección de Educación Gorosito , María",
        "bruto": 597511,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo Comunitario Gonzalez , César",
        "bruto": 597511,
        "descuentos": null,
        "neto": null
      }
    ]
  },
  {
    "periodo": "2023-12",
    "anio": 2023,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2023.pdf",
    "parseado": true,
    "cantidadFilas": 16,
    "filas": [
      {
        "etiqueta": "Intendente Pinotti , Pablo",
        "bruto": 1045530,
        "descuentos": 200850.7,
        "neto": 844679.3
      },
      {
        "etiqueta": "Secretaría de Gobierno Ochat , Andrea",
        "bruto": 836424,
        "descuentos": 161120.56,
        "neto": 675303.44
      },
      {
        "etiqueta": "Secretaría de Producción y — Chamorro , Fernando",
        "bruto": 836424,
        "descuentos": 161120.56,
        "neto": 675303.44
      },
      {
        "etiqueta": "Secretaría de Gestión Ambiental y — Zamateo , Luis , 14",
        "bruto": 1166450.48,
        "descuentos": 281715.21,
        "neto": 911178
      },
      {
        "etiqueta": "Secretaría de Desarrollo Humano y — Bernini , Daniel , 44",
        "bruto": 836424,
        "descuentos": 161120.56,
        "neto": 675303
      },
      {
        "etiqueta": "Promoción de Derechos — Subsecretaría de Gobierno Gamero , María Eugenia , 65",
        "bruto": 522765,
        "descuentos": 101525.35,
        "neto": 421239
      },
      {
        "etiqueta": "Subsecretaría de Hacienda y — García , Daniel",
        "bruto": 627318,
        "descuentos": null,
        "neto": 43563
      },
      {
        "etiqueta": "Subsecretaría de Desarrollo — Cabalaro , Luciano , 58",
        "bruto": 627318,
        "descuentos": 121390.42,
        "neto": 505927
      },
      {
        "etiqueta": "Subsecretaría Obras y Servicios — Lattanzi , José , 58",
        "bruto": 627318,
        "descuentos": 121390.42,
        "neto": 505927
      },
      {
        "etiqueta": "Subsecretaría de Economía Social — Ortiz , Vanesa , 58",
        "bruto": 627318,
        "descuentos": 121390.42,
        "neto": 505927
      },
      {
        "etiqueta": "Subsecretaría de Cultura y — Galli , José , 58",
        "bruto": 627318,
        "descuentos": 121390.42,
        "neto": 505927
      },
      {
        "etiqueta": "Subsecretaría de Promoción de — Riera , Elisa , 58",
        "bruto": 627318,
        "descuentos": 121390.42,
        "neto": 505927
      },
      {
        "etiqueta": "Derechos — Coordinación de Comunicación Botto , Juan , 65",
        "bruto": 522765,
        "descuentos": 101525.35,
        "neto": 421239
      },
      {
        "etiqueta": "Coordinación de Planificación, — Marti , Juan Cruz , 65",
        "bruto": 522765,
        "descuentos": 101525.35,
        "neto": 421239
      },
      {
        "etiqueta": "Dirección de Cultura Bossio , Micaela — Dirección de Educación Gorosito , María",
        "bruto": 449803,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Dirección de Desarrollo — Gonzalez , César",
        "bruto": 449803,
        "descuentos": null,
        "neto": null
      }
    ]
  },
  {
    "periodo": "2023-11",
    "anio": 2023,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-10",
    "anio": 2023,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2023.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 101973.29
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 264006,
        "descuentos": null,
        "neto": 68503.49
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 469344,
        "descuentos": null,
        "neto": 181173.11
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 62481.4
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 59548
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 367636.56,
        "descuentos": null,
        "neto": 122753.4
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 72716.92
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 241303,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 469344,
        "descuentos": null,
        "neto": 173339.28
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 72437.42
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 71281.6
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 59548
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 7284492
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 264006,
        "descuentos": null,
        "neto": 53681.2
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 62481.4
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 104559.37
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 586680,
        "descuentos": null,
        "neto": 241764.32
      }
    ]
  },
  {
    "periodo": "2023-09",
    "anio": 2023,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2023.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 85439.96
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 251359.2,
        "descuentos": null,
        "neto": 62853.48
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 446860.8,
        "descuentos": null,
        "neto": 165217.45
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 56737.6
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 53944.72
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 350025.5,
        "descuentos": null,
        "neto": 111714.33
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 66580.16
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 227990.1,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 446860.8,
        "descuentos": null,
        "neto": 157733.15
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 66300.16
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 86094.62
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 53944.72
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 6670766
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 251359.2,
        "descuentos": null,
        "neto": 48638.24
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 56737.6
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 88182.13
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 558576,
        "descuentos": null,
        "neto": 224645.29
      }
    ]
  },
  {
    "periodo": "2023-08",
    "anio": 2023,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-07",
    "anio": 2023,
    "mes": 7,
    "sac": false,
    "label": "Julio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-06",
    "anio": 2023,
    "mes": 6,
    "sac": false,
    "label": "Junio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-06",
    "anio": 2023,
    "mes": 6,
    "sac": false,
    "label": "Junio 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-05",
    "anio": 2023,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-04",
    "anio": 2023,
    "mes": 4,
    "sac": false,
    "label": "Abril 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-03",
    "anio": 2023,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-02",
    "anio": 2023,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2023-01",
    "anio": 2023,
    "mes": 1,
    "sac": false,
    "label": "Enero 2023",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2023.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2022-12",
    "anio": 2022,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 415242,
        "descuentos": null,
        "neto": 130560.57
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 311432,
        "descuentos": null,
        "neto": 76313.66
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 553658,
        "descuentos": null,
        "neto": 229746.91
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 68577.02
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 65116.66
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 433679.31,
        "descuentos": null,
        "neto": 156598.72
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 51617.84
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 276250.4,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 553658,
        "descuentos": null,
        "neto": 212996.66
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 80508.53
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 415242,
        "descuentos": null,
        "neto": 101076.71
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 65113.66
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 8091603
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 311432,
        "descuentos": null,
        "neto": 58714.92
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 346036,
        "descuentos": null,
        "neto": 57677.02
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 415242,
        "descuentos": null,
        "neto": 133056.95
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 692072,
        "descuentos": null,
        "neto": 136054.04
      }
    ]
  },
  {
    "periodo": "2022-11",
    "anio": 2022,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 370978,
        "descuentos": null,
        "neto": 98483.97
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 278234,
        "descuentos": null,
        "neto": 72251.98
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 494636,
        "descuentos": null,
        "neto": 194231.79
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 66021.08
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 62929.6
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 387448.39,
        "descuentos": null,
        "neto": 105616.78
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 76699.72
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 241303,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 494636,
        "descuentos": null,
        "neto": 100027.2
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 76419.72
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 370978,
        "descuentos": null,
        "neto": 87170.06
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 62929.6
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 7682722
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 278234,
        "descuentos": null,
        "neto": 56746.8
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 309148,
        "descuentos": null,
        "neto": 66021.08
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 370978,
        "descuentos": null,
        "neto": 104003.5
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 618296,
        "descuentos": null,
        "neto": 261250.34
      }
    ]
  },
  {
    "periodo": "2022-10",
    "anio": 2022,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 101973.29
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 264006,
        "descuentos": null,
        "neto": 68503.49
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 469344,
        "descuentos": null,
        "neto": 181173.11
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 62481.4
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 59548
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 367636.56,
        "descuentos": null,
        "neto": 122753.4
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 72716.92
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 241303,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 469344,
        "descuentos": null,
        "neto": 173339.28
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 72437.42
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 71281.6
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 59548
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 7284492
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 264006,
        "descuentos": null,
        "neto": 53681.2
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 293340,
        "descuentos": null,
        "neto": 62481.4
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 352008,
        "descuentos": null,
        "neto": 104559.37
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 586680,
        "descuentos": null,
        "neto": 241764.32
      }
    ]
  },
  {
    "periodo": "2022-09",
    "anio": 2022,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 85439.96
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 251359.2,
        "descuentos": null,
        "neto": 62853.48
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 446860.8,
        "descuentos": null,
        "neto": 165217.45
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 56737.6
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 53944.72
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 350025.5,
        "descuentos": null,
        "neto": 111714.33
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Ramiro.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 66580.16
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 227990.1,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 446860.8,
        "descuentos": null,
        "neto": 157733.15
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 66300.16
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 86094.62
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 53944.72
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 6670766
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 251359.2,
        "descuentos": null,
        "neto": 48638.24
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 279288,
        "descuentos": null,
        "neto": 56737.6
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 335145.6,
        "descuentos": null,
        "neto": 88182.13
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 558576,
        "descuentos": null,
        "neto": 224645.29
      }
    ]
  },
  {
    "periodo": "2022-08",
    "anio": 2022,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 307742.4,
        "descuentos": null,
        "neto": 67976
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 230806.8,
        "descuentos": null,
        "neto": 6807.99
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 410323.2,
        "descuentos": null,
        "neto": 145636.07
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 50888.14
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 48323.62
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 321405,
        "descuentos": null,
        "neto": 87163.59
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J.",
        "bruto": 128266,
        "descuentos": null,
        "neto": 24509.21
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 227990.1,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 410323.2,
        "descuentos": null,
        "neto": 138681.14
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 59811.3
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 307742.4,
        "descuentos": null,
        "neto": 68288.38
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 48323.62
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 6021880
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta. Directora de Proyectos.",
        "bruto": 230806.8,
        "descuentos": null,
        "neto": 43579.26
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 256452,
        "descuentos": null,
        "neto": 50888.14
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 307742.4,
        "descuentos": null,
        "neto": 70714.86
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 512904,
        "descuentos": null,
        "neto": 199885.01
      }
    ]
  },
  {
    "periodo": "2022-07",
    "anio": 2022,
    "mes": 7,
    "sac": false,
    "label": "Julio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo. 4.00 4.58",
        "bruto": 297.2,
        "descuentos": null,
        "neto": 57.09
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización. 3.00 0.91",
        "bruto": 222.9,
        "descuentos": null,
        "neto": 33.76
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo. 2.00 6.46",
        "bruto": 396.27,
        "descuentos": null,
        "neto": 127.34
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 0.00 4.00",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 50.33
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 0.00 7.30",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 47.85
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 9.37 7.76",
        "bruto": 285.4,
        "descuentos": null,
        "neto": 77.5
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J. 0.00 7.30",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 47.85
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 198035.28,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión. 2.00 7,64",
        "bruto": 396.27,
        "descuentos": null,
        "neto": 121.12
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim. 0.00 1.26",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 58.91
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 4.00 8.76",
        "bruto": 297.2,
        "descuentos": null,
        "neto": 57.26
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel. 0.00 7,30",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 47.85
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 0.00 8.76",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 59.17
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta Directora de Proyectos. 3.00 2.53",
        "bruto": 222.9,
        "descuentos": null,
        "neto": 40.92
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 0.00 4.00",
        "bruto": 247.67,
        "descuentos": null,
        "neto": 50.33
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo. 4.00 3.80",
        "bruto": 297.2,
        "descuentos": null,
        "neto": 60.24
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente. 0.00 7,06",
        "bruto": 495.34,
        "descuentos": null,
        "neto": 192.52
      }
    ]
  },
  {
    "periodo": "2022-06",
    "anio": 2022,
    "mes": 6,
    "sac": false,
    "label": "Junio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 274017.6,
        "descuentos": null,
        "neto": 52863.35
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 205513.2,
        "descuentos": null,
        "neto": 52907.97
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 365356.8,
        "descuentos": null,
        "neto": 129817.54
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 228348,
        "descuentos": null,
        "neto": 46469.6
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 8,00",
        "bruto": 228.34,
        "descuentos": null,
        "neto": 42851.18
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 286183.52,
        "descuentos": null,
        "neto": 69302.54
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J. 6.12",
        "bruto": 228348,
        "descuentos": null,
        "neto": 44.18
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 179728.64,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 365356.8,
        "descuentos": null,
        "neto": 125248.55
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim. 9.60",
        "bruto": 228348,
        "descuentos": null,
        "neto": 55.98
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 274017.6,
        "descuentos": null,
        "neto": 52863.35
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 228348,
        "descuentos": null,
        "neto": 44186.12
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 228348,
        "descuentos": null,
        "neto": 5621260
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — RIVERO, Julieta Directora de Proyectos.",
        "bruto": 205513.2,
        "descuentos": null,
        "neto": 37792.37
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 228348,
        "descuentos": null,
        "neto": 46469.6
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 274017.6,
        "descuentos": null,
        "neto": 55603.53
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 456696,
        "descuentos": null,
        "neto": 108468.55
      }
    ]
  },
  {
    "periodo": "2022-06",
    "anio": 2022,
    "mes": 6,
    "sac": false,
    "label": "Junio 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2022.pdf",
    "parseado": true,
    "cantidadFilas": 16,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 137008.8,
        "descuentos": null,
        "neto": 24661.59
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 102756.6,
        "descuentos": null,
        "neto": 22082.68
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 182678.41,
        "descuentos": null,
        "neto": 32882.11
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 114174,
        "descuentos": null,
        "neto": 46469.6
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 114174,
        "descuentos": null,
        "neto": 20551.32
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 143091.77,
        "descuentos": null,
        "neto": 29333.8
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J.",
        "bruto": 114174,
        "descuentos": null,
        "neto": 20551.32
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. 4.32 -",
        "bruto": 89.86,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión. 8.41 2.11",
        "bruto": 182.67,
        "descuentos": null,
        "neto": 32.88
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim. 5.67",
        "bruto": 114174,
        "descuentos": null,
        "neto": 23.4
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 1.59",
        "bruto": 137008.8,
        "descuentos": null,
        "neto": 24.66
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 114174,
        "descuentos": null,
        "neto": 20551.32
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 5.67",
        "bruto": 114174,
        "descuentos": null,
        "neto": 23.4
      },
      {
        "etiqueta": "RIVERO, Julieta Directora de Proyectos. - - — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 3.06",
        "bruto": 114174,
        "descuentos": null,
        "neto": 21.69
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo. 1.68",
        "bruto": 137008.8,
        "descuentos": null,
        "neto": 26.03
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente. 8.00 6.12",
        "bruto": 228.34,
        "descuentos": null,
        "neto": 43.38
      }
    ]
  },
  {
    "periodo": "2022-05",
    "anio": 2022,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 265585,
        "descuentos": null,
        "neto": 61227.68
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 199190,
        "descuentos": null,
        "neto": 50117.22
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 354116,
        "descuentos": null,
        "neto": 118665.37
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. Directora de Proyectos.",
        "bruto": 199190,
        "descuentos": null,
        "neto": 36854.1
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 45064.4
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 42851.18
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 277378,
        "descuentos": null,
        "neto": 81324.86
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 42851.18
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 173072.85,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 354116,
        "descuentos": null,
        "neto": 112948.62
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 52903.92
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 265585,
        "descuentos": null,
        "neto": 62374.72
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 42851.18
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 5317142
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 221322,
        "descuentos": null,
        "neto": 45874.4
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 265586,
        "descuentos": null,
        "neto": 64236.94
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 442644,
        "descuentos": null,
        "neto": 165803.61
      }
    ]
  },
  {
    "periodo": "2022-04",
    "anio": 2022,
    "mes": 4,
    "sac": false,
    "label": "Abril 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 54461.34
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 192866.4,
        "descuentos": null,
        "neto": 48312.19
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 342873.6,
        "descuentos": null,
        "neto": 112954.71
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. Directora de Proyectos.",
        "bruto": 192866.4,
        "descuentos": null,
        "neto": 37244.61
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 43459.2
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 41316.18
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 268572.46,
        "descuentos": null,
        "neto": 72599.06
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 41316.24
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 173072.85,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 342873.6,
        "descuentos": null,
        "neto": 107312.59
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 48859.03
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 55786.6
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 41316.24
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 51282.49
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 43459.2
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 57797.23
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 428592,
        "descuentos": null,
        "neto": 158553.31
      }
    ]
  },
  {
    "periodo": "2022-03",
    "anio": 2022,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 54013.95
      },
      {
        "etiqueta": "Cooperativismo. — CARRER, Raquel A. Directora de Modernización.",
        "bruto": 192866.4,
        "descuentos": null,
        "neto": 50240.86
      },
      {
        "etiqueta": "CHETTA, Juan Carlos. Secretario de Desarrollo.",
        "bruto": 342873.6,
        "descuentos": null,
        "neto": 116196.18
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. Directora de Proyectos.",
        "bruto": 192866.4,
        "descuentos": null,
        "neto": 39173.31
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 51602.16
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 43459.2
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia.",
        "bruto": 268572.46,
        "descuentos": null,
        "neto": 63233.55
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 43452.2
      },
      {
        "etiqueta": "Subsecretaria de Educación, Salud y — HOYOS, Mónica. -",
        "bruto": 166416.2,
        "descuentos": null,
        "neto": null
      },
      {
        "etiqueta": "Convivencia. — LAMBERTI, Leandro Secretario de Gestión.",
        "bruto": 342873.6,
        "descuentos": null,
        "neto": 100053.33
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 53144.45
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 54843.29
      },
      {
        "etiqueta": "Coordinador de Cultura y Promoción — MANNING, Ariel.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 43459.2
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 53412.45
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica.",
        "bruto": 214296,
        "descuentos": null,
        "neto": 38602.1
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — SOMAGLIA, Osvaldo.",
        "bruto": 257155.2,
        "descuentos": null,
        "neto": 57164.11
      },
      {
        "etiqueta": "Finanzas. — TOSELLI, Gonzalo R.C. Intendente.",
        "bruto": 428592,
        "descuentos": null,
        "neto": 162839.24
      }
    ]
  },
  {
    "periodo": "2022-02",
    "anio": 2022,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo. 2.40 8.65",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 40.64
      },
      {
        "etiqueta": "Cooperativismo — CARRER, Raquel A. Directora de Modernización. 6.80 4.67",
        "bruto": 158.08,
        "descuentos": null,
        "neto": 40.03
      },
      {
        "etiqueta": "CHETTA, Juan Carlos Secretaria de Desarrollo. 3.20 9.44",
        "bruto": 281.04,
        "descuentos": null,
        "neto": 82.08
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. Directora de Proyectos. 6.80 6.10",
        "bruto": 158.08,
        "descuentos": null,
        "neto": 30.63
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 2.00 0.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.73
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 0.79 4.00.09",
        "bruto": 220.14,
        "descuentos": null,
        "neto": 52.08
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J. 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — HOYOS, Mónica 6.20 6.20",
        "bruto": 166.41,
        "descuentos": null,
        "neto": 166.41
      },
      {
        "etiqueta": "Convivencia Ciudadana. — LAMBERTI, Leandro Secretario de Gestión. 3.20 1.98",
        "bruto": 281.04,
        "descuentos": null,
        "neto": 82.07
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim 2.00 1.16",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 41.99
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 2.40 8.66",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 40.64
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — MANING, Ariel 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 2.00 8.66",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 42.45
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 0.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.73
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Subsecretario de Hacienda y Finanzas 2.40",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 42756.47
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 8.64",
        "bruto": 351.3,
        "descuentos": null,
        "neto": 119.35
      }
    ]
  },
  {
    "periodo": "2022-01",
    "anio": 2022,
    "mes": 1,
    "sac": false,
    "label": "Enero 2022",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2022.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Subsecretario de Producción y — CANAVESE, Marcelo. 2.40 8.65",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 40.64
      },
      {
        "etiqueta": "Cooperativismo — CARRER, Raquel A. Directora de Modernización. 6.80 4.67",
        "bruto": 158.08,
        "descuentos": null,
        "neto": 40.03
      },
      {
        "etiqueta": "CHETTA, Juan Carlos Secretaria de Desarrollo. 3.20 9.44",
        "bruto": 281.04,
        "descuentos": null,
        "neto": 82.08
      },
      {
        "etiqueta": "CIPOLATTI, Betiana. Directora de Proyectos. 6.80 6.10",
        "bruto": 158.08,
        "descuentos": null,
        "neto": 30.63
      },
      {
        "etiqueta": "ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 2.00 0.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.73
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 0.79 4.00.09",
        "bruto": 220.14,
        "descuentos": null,
        "neto": 52.08
      },
      {
        "etiqueta": "Coordinador de Comunicación y — GONZÁLEZ, Flavio J. 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — HOYOS, Mónica 6.20 6.20",
        "bruto": 166.41,
        "descuentos": null,
        "neto": 166.41
      },
      {
        "etiqueta": "Convivencia Ciudadana. — LAMBERTI, Leandro Secretario de Gestión. 3.20 1.98",
        "bruto": 281.04,
        "descuentos": null,
        "neto": 82.07
      },
      {
        "etiqueta": "Coordinador de Promoción de — LEMOS, Karim 2.00 1.16",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 41.99
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 2.40 8.66",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 40.64
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — MANING, Ariel 2.00 3.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.97
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 2.00 8.66",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 42.45
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 0.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.73
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Subsecretario de Hacienda y Finanzas 2.40",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 42756.47
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 8.64",
        "bruto": 351.3,
        "descuentos": null,
        "neto": 119.35
      }
    ]
  },
  {
    "periodo": "2021-12",
    "anio": 2021,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — CANAVESE, Marcelo. 6.00 8.68",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 15.8
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 3.40 4.33",
        "bruto": 79.04,
        "descuentos": null,
        "neto": 16.99
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 6.00",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 1580868
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 6.00 6.94",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 16.68
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 6.00",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 1580868
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 1.76 6.91",
        "bruto": 108.91,
        "descuentos": null,
        "neto": 22.32
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 0.00 9.20",
        "bruto": 93.68,
        "descuentos": null,
        "neto": 17.79
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 6.00",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 1580868
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 2.00 7.00",
        "bruto": 105.87,
        "descuentos": null,
        "neto": 19.05
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 8.00 2.52",
        "bruto": 124.9,
        "descuentos": null,
        "neto": 23.73
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 1.20 0.41",
        "bruto": 105.39,
        "descuentos": null,
        "neto": 18.97
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 1.20 0.41",
        "bruto": 105.39,
        "descuentos": null,
        "neto": 18.97
      },
      {
        "etiqueta": "Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 8.00 7.61",
        "bruto": 124.9,
        "descuentos": null,
        "neto": 23.6
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 6.00 7.33",
        "bruto": 87.82,
        "descuentos": null,
        "neto": 18
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 7.78",
        "bruto": 89.46,
        "descuentos": null,
        "neto": 16.99
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 3.40 8.24",
        "bruto": 79.04,
        "descuentos": null,
        "neto": 15.01
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 6.66",
        "bruto": 176.61,
        "descuentos": null,
        "neto": 33.55
      }
    ]
  },
  {
    "periodo": "2021-12",
    "anio": 2021,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — CANAVESE, Marcelo. 9.00 2.80",
        "bruto": 206.09,
        "descuentos": null,
        "neto": 39.68
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 6.80 5.23",
        "bruto": 158.08,
        "descuentos": null,
        "neto": 40.64
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 0.00",
        "bruto": 163.94,
        "descuentos": null,
        "neto": 3167260
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 2.80 4.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.65
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.80 7.88",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 33.89
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 8.49 7.40",
        "bruto": 267.71,
        "descuentos": null,
        "neto": 86.65
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 0.00 7.60",
        "bruto": 70.26,
        "descuentos": null,
        "neto": 18.26
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 4.00 0.55",
        "bruto": 139.13,
        "descuentos": null,
        "neto": 32.89
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 6.00 4.96",
        "bruto": 193.21,
        "descuentos": null,
        "neto": 53.75
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 1.00 0.79",
        "bruto": 93.68,
        "descuentos": null,
        "neto": 23.52
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 2.40 8.54",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 49.01
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 2.40 2.40",
        "bruto": 210.78,
        "descuentos": null,
        "neto": 40.57
      },
      {
        "etiqueta": "Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 1.00 3.44",
        "bruto": 93.68,
        "descuentos": null,
        "neto": 22.48
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 8.00 2.90",
        "bruto": 156,
        "descuentos": null,
        "neto": 38.9
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 4.40",
        "bruto": 175.65,
        "descuentos": null,
        "neto": 35.65
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 4.00 2.80",
        "bruto": 200.24,
        "descuentos": null,
        "neto": 40.57
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 7.36",
        "bruto": 351.3,
        "descuentos": null,
        "neto": 135.96
      }
    ]
  },
  {
    "periodo": "2021-11",
    "anio": 2021,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/11_remuneraciones_funcionarios_noviembre_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — CANAVESE, Marcelo. 8.00 5.52",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.16
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 9.40 5.63",
        "bruto": 150.8,
        "descuentos": null,
        "neto": 37.69
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 8.00",
        "bruto": 156,
        "descuentos": null,
        "neto": 3016552
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 5.60",
        "bruto": 156,
        "descuentos": null,
        "neto": 31.72
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 8.00 5.52",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.16
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 8.46 0.69",
        "bruto": 176.09,
        "descuentos": null,
        "neto": 46.16
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 9.20 9.04",
        "bruto": 201.07,
        "descuentos": null,
        "neto": 38.72
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 8.00 5.52",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.16
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 9.20 3.81",
        "bruto": 201.07,
        "descuentos": null,
        "neto": 52.81
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 5.60 2.19",
        "bruto": 268.1,
        "descuentos": null,
        "neto": 93.04
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 9.20 3.67",
        "bruto": 201.07,
        "descuentos": null,
        "neto": 48.53
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 9.20 9.04",
        "bruto": 201.07,
        "descuentos": null,
        "neto": 38.72
      },
      {
        "etiqueta": "Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 5.60 4.37",
        "bruto": 268.1,
        "descuentos": null,
        "neto": 57.72
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 8.00 2.82",
        "bruto": 156,
        "descuentos": null,
        "neto": 37.37
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 8.00 5.60",
        "bruto": 156,
        "descuentos": null,
        "neto": 30.31
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 9.40 5.87",
        "bruto": 150.8,
        "descuentos": null,
        "neto": 30.68
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 2.00 8.17",
        "bruto": 335.13,
        "descuentos": null,
        "neto": 126.39
      }
    ]
  },
  {
    "periodo": "2021-10",
    "anio": 2021,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/10_remuneraciones_funcionarios_octubre_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — CANAVESE, Marcelo. 8.00 5.60",
        "bruto": 156,
        "descuentos": null,
        "neto": 31.72
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 6.00 7.95",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 36.62
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 8.00",
        "bruto": 156,
        "descuentos": null,
        "neto": 3338790
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 5.68",
        "bruto": 156,
        "descuentos": null,
        "neto": 33.28
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 8.00 5.60",
        "bruto": 156,
        "descuentos": null,
        "neto": 31.72
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 4.92 9.85",
        "bruto": 214.2,
        "descuentos": null,
        "neto": 74.07
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 0.00 6.00",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 37.96
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 8.00 5.60",
        "bruto": 156,
        "descuentos": null,
        "neto": 31.72
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 0.00 1.94",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 41.03
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 3.00 5.13",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 86.27
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 0.00 0.60",
        "bruto": 187.21,
        "descuentos": null,
        "neto": 38.33
      },
      {
        "etiqueta": "Subsecretario de Infraestructura — LOPEZ, Nestor. 6.60 4.07",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 38.17
      },
      {
        "etiqueta": "Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 3.00 9.91",
        "bruto": 249.61,
        "descuentos": null,
        "neto": 86.99
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. 8.00 2.90",
        "bruto": 156,
        "descuentos": null,
        "neto": 38.9
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 8.00 6.20",
        "bruto": 156,
        "descuentos": null,
        "neto": 33.28
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 7.00 9.48",
        "bruto": 140.4,
        "descuentos": null,
        "neto": 30
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 9.00 6.84",
        "bruto": 302,
        "descuentos": null,
        "neto": 104.7
      }
    ]
  },
  {
    "periodo": "2021-09",
    "anio": 2021,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/09_remuneraciones_funcionarios_septiembre_2021.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2021-08",
    "anio": 2021,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/08_remuneraciones_funcionarios_agosto_2021.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2021-07",
    "anio": 2021,
    "mes": 7,
    "sac": false,
    "label": "Julio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/07_remuneraciones_funcionarios_julio_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — CANAVESE, Marcelo. 8.00 4.80",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 14.24
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 7.20 3.42",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 32.78
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 8.00",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 2506936
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 7.60",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 29.43
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 8.00 1.52",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 27.98
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 0.25 6.76",
        "bruto": 198.2,
        "descuentos": null,
        "neto": 64.13
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 6.60 4.63",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 33.51
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 7.20 4.96",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 25.48
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 6.60 1.63",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 33.54
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 2.80 3.19",
        "bruto": 232.97,
        "descuentos": null,
        "neto": 71.81
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 6.60 4.63",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 33.51
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 6.60 4.07",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 38.17
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 2.80 9.84",
        "bruto": 232.97,
        "descuentos": null,
        "neto": 74.59
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — MONTICONE, Yanina. $ 8.00 6.62",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 30.23
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 8.00 1.52",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 27.98
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 7.20 5.43",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 26.52
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 6.00 7.81",
        "bruto": 291.21,
        "descuentos": null,
        "neto": 99.7
      }
    ]
  },
  {
    "periodo": "2021-06",
    "anio": 2021,
    "mes": 6,
    "sac": false,
    "label": "Junio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06_remuneraciones_funcionarios_junio_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 0.00 5.60",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 29.64
      },
      {
        "etiqueta": "Coordinador de Comunicación y — CANAVESE, Marcelo. 0.00 5.60",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 29.64
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 7.20 4.50",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 35.03
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 0.00 5.60",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 29.64
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 0.00 1.68",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 31.1
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 0.00 5.60",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 29.64
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 5.25 8.04",
        "bruto": 198.24,
        "descuentos": null,
        "neto": 49.89
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 9.60 9.92",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 35.46
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 7.20 3.43",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 26.73
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 9.60 9.92",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 35.46
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 2.80 5.77",
        "bruto": 232.97,
        "descuentos": null,
        "neto": 81.13
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 9.60 9.92",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 35.46
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 9.60 7.22",
        "bruto": 174.72,
        "descuentos": null,
        "neto": 37.21
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 2.80 5.45",
        "bruto": 232.97,
        "descuentos": null,
        "neto": 79.47
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 7.20 3.90",
        "bruto": 131.04,
        "descuentos": null,
        "neto": 28.04
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 5.80 7.88",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 26.55
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 6.00 0.80",
        "bruto": 291.21,
        "descuentos": null,
        "neto": 111.25
      }
    ]
  },
  {
    "periodo": "2021-06",
    "anio": 2021,
    "mes": 6,
    "sac": false,
    "label": "Junio 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/06-1_remuneraciones_funcionarios_sac_junio_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 4.00 4.72",
        "bruto": 72.8,
        "descuentos": null,
        "neto": 13.1
      },
      {
        "etiqueta": "Coordinador de Comunicación y — CANAVESE, Marcelo. 4.00 4.12",
        "bruto": 12.13,
        "descuentos": null,
        "neto": 2.18
      },
      {
        "etiqueta": "Estrategia. — CARRER, Raquel A. Directora de Proyectos. 3.60 7.58",
        "bruto": 65.52,
        "descuentos": null,
        "neto": 14.08
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 4.00 4.72",
        "bruto": 72.8,
        "descuentos": null,
        "neto": 13.1
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 4.00 2.76",
        "bruto": 72.8,
        "descuentos": null,
        "neto": 13.83
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 4.00 4.72",
        "bruto": 72.8,
        "descuentos": null,
        "neto": 13.1
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 2.60 0.14",
        "bruto": 99.12,
        "descuentos": null,
        "neto": 20.32
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 4.80 5.67",
        "bruto": 87.36,
        "descuentos": null,
        "neto": 15.72
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 3.60 4.25",
        "bruto": 65.52,
        "descuentos": null,
        "neto": 11.79
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 4.80 5.67",
        "bruto": 87.36,
        "descuentos": null,
        "neto": 15.72
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 6.40 7.55",
        "bruto": 116.48,
        "descuentos": null,
        "neto": 20.96
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 2.40 2.83",
        "bruto": 43.68,
        "descuentos": null,
        "neto": 7.86
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 4.80 9.32",
        "bruto": 87.36,
        "descuentos": null,
        "neto": 16.59
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 6.40 2.41",
        "bruto": 116.48,
        "descuentos": null,
        "neto": 22.13
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 4.00 4.72",
        "bruto": 72.8,
        "descuentos": null,
        "neto": 13.1
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 3.60 9.49",
        "bruto": 65.52,
        "descuentos": null,
        "neto": 12.44
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 8.00 5.52",
        "bruto": 145.6,
        "descuentos": null,
        "neto": 27.66
      }
    ]
  },
  {
    "periodo": "2021-05",
    "anio": 2021,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/05_remuneraciones_funcionarios_mayo_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 2.00 9.14",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.54
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — CARRER, Raquel A. Directora de Proyectos. 5.80 6.46",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 31.67
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 2.00",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 3221144
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 8.00 4.03",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 31.61
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.00 2.22",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.34
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 6.74 9.41",
        "bruto": 185.65,
        "descuentos": null,
        "neto": 53.7
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 4.40 9.71",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.14
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 2.00 9.14",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 29.54
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 4.40 0.03",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.15
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 9.20 1.60",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 65.72
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 4.40 6.29",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 40.25
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 8.00 9.47",
        "bruto": 156.48,
        "descuentos": null,
        "neto": 35.46
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 9.20 9.03",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 64.75
      },
      {
        "etiqueta": "Coordinadora de Comunicación y — SCARAFÍA, Virginia. 2.00 3.13",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 35.58
      },
      {
        "etiqueta": "Estrategia. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 8.16",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 26.67
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 5.80 7.88",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 26.55
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 3.13",
        "bruto": 272.72,
        "descuentos": null,
        "neto": 91.89
      }
    ]
  },
  {
    "periodo": "2021-04",
    "anio": 2021,
    "mes": 4,
    "sac": false,
    "label": "Abril 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 2.00 1.09",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.53
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — CARRER, Raquel A. Directora de Proyectos. 5.80 6.46",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 31.67
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 2.00 1.09",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.53
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 2.00 4.02",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 31.61
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.00 4.14",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 29.81
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 6.74 3.38",
        "bruto": 185.65,
        "descuentos": null,
        "neto": 41.57
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 4.40 9.72",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.14
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 2.00 1.09",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.53
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 4.40 9.72",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.14
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 9.20 2.62",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 65.72
      },
      {
        "etiqueta": "Subsecretario de Hacienda y — LAMBERTI, Leandro 4.40 6.37",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 34.6
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 4.40 0.71",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 31.92
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 9.20 6.86",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 64.85
      },
      {
        "etiqueta": "Coordinadora de Comunicación y — SCARAFÍA, Virginia. 2.00 8.82",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.09
      },
      {
        "etiqueta": "Estrategia. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 5.04",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 26.45
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 5.80 8.20",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 26.48
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 3.14",
        "bruto": 272.72,
        "descuentos": null,
        "neto": 91.89
      }
    ]
  },
  {
    "periodo": "2021-03",
    "anio": 2021,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 2.00 1.77",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.51
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — BORKOWSKI, Andrea. Subsecretaria de Hacienda y Finanzas. 4.40 3.66",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 39.79
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 5.80 4.76",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 31.45
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 2.00 1.77",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.51
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 2.00 4.56",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 32.19
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 2.00 7.25",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.4
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 6.74 4.57",
        "bruto": 185.65,
        "descuentos": null,
        "neto": 56.13
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 4.40 2.04",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.05
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 2.00 1.77",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 30.51
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 4.40 2.04",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 42.05
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 9.20 5.40",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 69.01
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 4.40 4.42",
        "bruto": 163.63,
        "descuentos": null,
        "neto": 36.64
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 9.20 4.38",
        "bruto": 218.17,
        "descuentos": null,
        "neto": 64.89
      },
      {
        "etiqueta": "Coordinadora de Comunicación y — SCARAFÍA, Virginia. 2.00 6.46",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 35.06
      },
      {
        "etiqueta": "Estrategia. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 2.00 4.31",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 26.14
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 5.80 9.04",
        "bruto": 122.72,
        "descuentos": null,
        "neto": 26.19
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 4.00 3.14",
        "bruto": 272.72,
        "descuentos": null,
        "neto": 91.89
      }
    ]
  },
  {
    "periodo": "2021-02",
    "anio": 2021,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 0.72 5.59",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — BORKOWSKI, Andrea. Subsecretaria de Hacienda y Finanzas. 2.86 1.17",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 31.41
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 4.64 3.39",
        "bruto": 104,
        "descuentos": null,
        "neto": 25.52
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 0.72 5.60",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 0.72 3.42",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 24.25
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 0.72 0.18",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.13
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 5.75 2.45",
        "bruto": 157.33,
        "descuentos": null,
        "neto": 45.03
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 2.86 8.44",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 31.71
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 0.72 5.60",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 2.86 8.44",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 31.71
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 7.16 7.07",
        "bruto": 184.89,
        "descuentos": null,
        "neto": 47.73
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 2.86 3.76",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 23.99
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 7.16 1.25",
        "bruto": 184.89,
        "descuentos": null,
        "neto": 49.64
      },
      {
        "etiqueta": "Coordinadora de Comunicación y — SCARAFÍA, Virginia. 0.72 2.44",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 27.53
      },
      {
        "etiqueta": "Estrategia. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 0.72 4.99",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 21.19
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 4.64 0.72",
        "bruto": 104,
        "descuentos": null,
        "neto": 20.75
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 1.44 1.45",
        "bruto": 231.12,
        "descuentos": null,
        "neto": 71.21
      }
    ]
  },
  {
    "periodo": "2021-01",
    "anio": 2021,
    "mes": 1,
    "sac": false,
    "label": "Enero 2021",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/01_remuneraciones_funcionarios_enero_2021.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 0.72 5.59",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — BORKOWSKI, Andrea. Subsecretaria de Hacienda y Finanzas. 2.86 1.17",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 30.46
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 4.64 3.39",
        "bruto": 104,
        "descuentos": null,
        "neto": 25.52
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 0.72 5.59",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 0.72 3.42",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 24.25
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 0.72 5.58",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 5.75 7.45",
        "bruto": 157.33,
        "descuentos": null,
        "neto": 42.38
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 1.64 8.53",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 39.53
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 4.70 8.94",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 29.08
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 2.86 8.45",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 31.71
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 7.16 7.09",
        "bruto": 184.89,
        "descuentos": null,
        "neto": 47.73
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 1.64 4.07",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 31.29
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 7.16 4.71",
        "bruto": 184.89,
        "descuentos": null,
        "neto": 48.81
      },
      {
        "etiqueta": "Coordinadora de Comunicación y — SCARAFÍA, Virginia. 0.72 2.44",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 27.53
      },
      {
        "etiqueta": "Estrategia. — SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 0.72 4.99",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 21.19
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 4.64 0.72",
        "bruto": 104,
        "descuentos": null,
        "neto": 20.75
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 1.44 1.46",
        "bruto": 231.12,
        "descuentos": null,
        "neto": 71.21
      }
    ]
  },
  {
    "periodo": "2020-12",
    "anio": 2020,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12-1_remuneraciones_funcionarios_sac_diciembre_2020.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — BERGESE, Solana B. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — BORKOWSKI, Andrea. Subsecretaria de Hacienda y Finanzas. 0.00 4.20",
        "bruto": 68.18,
        "descuentos": null,
        "neto": 12.95
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 5.00 5.34",
        "bruto": 51.13,
        "descuentos": null,
        "neto": 9.71
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 7.00 5.24",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.79
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 0.00 2.95",
        "bruto": 76.99,
        "descuentos": null,
        "neto": 15.78
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 1.00 2.59",
        "bruto": 68.18,
        "descuentos": null,
        "neto": 12.27
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 1.00 2.59",
        "bruto": 68.18,
        "descuentos": null,
        "neto": 12.27
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 8.00 3.44",
        "bruto": 90.9,
        "descuentos": null,
        "neto": 16.36
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 1.00 4.90",
        "bruto": 68.13,
        "descuentos": null,
        "neto": 12.94
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 8.00 9.39",
        "bruto": 90.9,
        "descuentos": null,
        "neto": 59.42
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 7.00 7.07",
        "bruto": 56.81,
        "descuentos": null,
        "neto": 10.22
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 5.00 5.34",
        "bruto": 51.13,
        "descuentos": null,
        "neto": 9.71
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 5.00 0.66",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 21.59
      }
    ]
  },
  {
    "periodo": "2020-12",
    "anio": 2020,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/12_remuneraciones_funcionarios_diciembre_2020.pdf",
    "parseado": true,
    "cantidadFilas": 17,
    "filas": [
      {
        "etiqueta": "Coordinadora de Comunicación y — BERGESE, Solana B. 4.70 9.89",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 28.69
      },
      {
        "etiqueta": "Coordinador de la Agencia Municipal — BERNINI, Daniel R. 4.70 0.14",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 29.19
      },
      {
        "etiqueta": "de Seguridad Ciudadana y Vial. — BORKOWSKI, Andrea. Subsecretaria de Hacienda y Finanzas. 1.64 1.49",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 39.03
      },
      {
        "etiqueta": "CARRER, Raquel A. Directora de Proyectos. 1.24 3.21",
        "bruto": 102.27,
        "descuentos": null,
        "neto": 26.63
      },
      {
        "etiqueta": "Coordinadora de Promoción de — CIPOLATTI, Betiana. 4.70 0.24",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 20.77
      },
      {
        "etiqueta": "Derechos. — ESCOBIO, G. Vanesa. Coordinadora Ejecutiva. 4.70 7.35",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 30.02
      },
      {
        "etiqueta": "ÉRCOLE, Guillermo. Coordinador de Ciencia y Tecnología. 4.70 1.52",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 28.6
      },
      {
        "etiqueta": "Subsecretaria de Ambiente y — GABIANI, M. Cecilia. 9.71 4.45",
        "bruto": 153.97,
        "descuentos": null,
        "neto": 35.52
      },
      {
        "etiqueta": "Subsecretario de Educación, Salud y — GHIANO, Pablo A. 2.86 8.45",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 31.71
      },
      {
        "etiqueta": "Coordinadora de Cultura y Promoción — GIRARD, Romina M. 0.72 5.59",
        "bruto": 115.56,
        "descuentos": null,
        "neto": 23.28
      },
      {
        "etiqueta": "Subsecretario de Producción y — GONZÁLEZ, Flavio J. 1.64",
        "bruto": 136.36,
        "descuentos": null,
        "neto": 4123960
      },
      {
        "etiqueta": "Cooperativismo. — GRANDE, Marilina. Secretaria de Desarrollo. 5.52 0.20",
        "bruto": 181.81,
        "descuentos": null,
        "neto": 60.12
      },
      {
        "etiqueta": "LARROQUETE, Hernán Subsecretario de Infraestructura — 2.86",
        "bruto": 138.67,
        "descuentos": null,
        "neto": 28040.22
      },
      {
        "etiqueta": "J. Urbana y Rural. — MARTÍNEZ, Omar A. Secretario de Gestión. 5.52 9.39",
        "bruto": 181.81,
        "descuentos": null,
        "neto": 59.42
      },
      {
        "etiqueta": "SCHMIDT, Marcelo. Coordinador de Asesoría Jurídica. 4.70 5.45",
        "bruto": 113.63,
        "descuentos": null,
        "neto": 23.92
      },
      {
        "etiqueta": "SOMAGLIA, Osvaldo. Director de Modernización. 1.24 6.99",
        "bruto": 102.27,
        "descuentos": null,
        "neto": 24.82
      },
      {
        "etiqueta": "TOSELLI, Gonzalo R.C. Intendente. 9.40 2.73",
        "bruto": 227.26,
        "descuentos": null,
        "neto": 84.54
      }
    ]
  },
  {
    "periodo": "2020-04",
    "anio": 2020,
    "mes": 4,
    "sac": false,
    "label": "Abril 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/04_remuneraciones_funcionarios_abril_2020.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2020-03",
    "anio": 2020,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/03_remuneraciones_funcionarios_marzo_2020.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2020-02",
    "anio": 2020,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2020",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/04/02_remuneraciones_funcionarios_febrero_2020.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2019-12",
    "anio": 2019,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2019-11",
    "anio": 2019,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "PDF sin texto digital (probable escaneo / imagen). Requiere OCR."
  },
  {
    "periodo": "2019-10",
    "anio": 2019,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-09",
    "anio": 2019,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-08",
    "anio": 2019,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-07",
    "anio": 2019,
    "mes": 7,
    "sac": false,
    "label": "Julio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-06",
    "anio": 2019,
    "mes": 6,
    "sac": false,
    "label": "Junio 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-05",
    "anio": 2019,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-04",
    "anio": 2019,
    "mes": 4,
    "sac": false,
    "label": "Abril 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-03",
    "anio": 2019,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-02",
    "anio": 2019,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2019-01",
    "anio": 2019,
    "mes": 1,
    "sac": false,
    "label": "Enero 2019",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2019.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-12",
    "anio": 2018,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-11",
    "anio": 2018,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-10",
    "anio": 2018,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-09",
    "anio": 2018,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-08",
    "anio": 2018,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-07",
    "anio": 2018,
    "mes": 7,
    "sac": false,
    "label": "Julio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-06",
    "anio": 2018,
    "mes": 6,
    "sac": false,
    "label": "Junio 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06-1_remuneraciones_funcionarios_sac_junio_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-05",
    "anio": 2018,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-04",
    "anio": 2018,
    "mes": 4,
    "sac": false,
    "label": "Abril 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-03",
    "anio": 2018,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-02",
    "anio": 2018,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2018-01",
    "anio": 2018,
    "mes": 1,
    "sac": false,
    "label": "Enero 2018",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2018.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-12",
    "anio": 2016,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-11",
    "anio": 2016,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-10",
    "anio": 2016,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-09",
    "anio": 2016,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-08",
    "anio": 2016,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2016-04",
    "anio": 2016,
    "mes": 4,
    "sac": false,
    "label": "Abril 2016",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2016.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
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
    "error": "timeout tras 20000ms (download)"
  },
  {
    "periodo": "2015-12",
    "anio": 2015,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-11",
    "anio": 2015,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-10",
    "anio": 2015,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-09",
    "anio": 2015,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-08",
    "anio": 2015,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-07",
    "anio": 2015,
    "mes": 7,
    "sac": false,
    "label": "Julio 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-06",
    "anio": 2015,
    "mes": 6,
    "sac": false,
    "label": "Junio 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-05",
    "anio": 2015,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-04",
    "anio": 2015,
    "mes": 4,
    "sac": false,
    "label": "Abril 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-03",
    "anio": 2015,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-02",
    "anio": 2015,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2015-01",
    "anio": 2015,
    "mes": 1,
    "sac": false,
    "label": "Enero 2015",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2015.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-12",
    "anio": 2014,
    "mes": 12,
    "sac": false,
    "label": "Diciembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/12_remuneraciones_funcionarios_diciembre_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-11",
    "anio": 2014,
    "mes": 11,
    "sac": false,
    "label": "Noviembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/11_remuneraciones_funcionarios_noviembre_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-10",
    "anio": 2014,
    "mes": 10,
    "sac": false,
    "label": "Octubre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10_remuneraciones_funcionarios_octubre_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-09",
    "anio": 2014,
    "mes": 9,
    "sac": false,
    "label": "Septiembre 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/09_remuneraciones_funcionarios_septiembre_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-08",
    "anio": 2014,
    "mes": 8,
    "sac": false,
    "label": "Agosto 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/08_remuneraciones_funcionarios_agosto_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-07",
    "anio": 2014,
    "mes": 7,
    "sac": false,
    "label": "Julio 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/07_remuneraciones_funcionarios_julio_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-06",
    "anio": 2014,
    "mes": 6,
    "sac": false,
    "label": "Junio 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/06_remuneraciones_funcionarios_junio_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-05",
    "anio": 2014,
    "mes": 5,
    "sac": false,
    "label": "Mayo 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/05_remuneraciones_funcionarios_mayo_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-04",
    "anio": 2014,
    "mes": 4,
    "sac": false,
    "label": "Abril 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/04_remuneraciones_funcionarios_abril_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-03",
    "anio": 2014,
    "mes": 3,
    "sac": false,
    "label": "Marzo 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_remuneraciones_funcionarios_marzo_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-02",
    "anio": 2014,
    "mes": 2,
    "sac": false,
    "label": "Febrero 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/02_remuneraciones_funcionarios_febrero_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  },
  {
    "periodo": "2014-01",
    "anio": 2014,
    "mes": 1,
    "sac": false,
    "label": "Enero 2014",
    "urlPdf": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_remuneraciones_funcionarios_enero_2014.pdf",
    "parseado": false,
    "cantidadFilas": 0,
    "filas": [],
    "error": "0 filas detectadas (formato no soportado por el parser actual)."
  }
];

export const remuneracionesDetalleMeta = {
  generadoEl: "2026-05-09T21:41:31.985Z",
  totalPeriodos: 140,
  parseados: 60,
  escaneados: 7,
  otrosErrores: 73,
  filasTotales: 1088,
} as const;
