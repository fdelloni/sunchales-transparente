/**
 * Zonificación de Sunchales — datos verificables.
 *
 * Fuente normativa primaria: Ordenanza Sunchales N° 2800/2019, sancionada por
 * el Concejo Municipal el 11/12/2019, que modifica y reemplaza el Art. 1° y el
 * Anexo I (puntos 1 y 2) de la Ordenanza N° 1294/1999.
 * URL oficial del PDF:
 * https://concejosunchales.gob.ar/documentos/digesto/digesto.3902.O%202800%202019.pdf
 *
 * Toda definición y dato listado aquí proviene textualmente de la Ordenanza.
 * Los polígonos georreferenciados de cada Área NO existen como dato vectorial
 * público — la propia Ordenanza describe sus límites de forma literaria (calle
 * por calle, lote por lote). Por eso este módulo publica las definiciones y la
 * lista de incorporaciones del Art. 4, pero no inventa coordenadas. La
 * georreferenciación a GeoJSON/SVG queda declarada como brecha catastral.
 */

export type ClaseSuelo =
  | "urbanizado"
  | "urbanizable"
  | "suburbano"
  | "rural"
  | "no_urbanizable";

export type AreaSueloDefinicion = {
  id: ClaseSuelo;
  numero: 1 | 2 | 3 | 4 | 5;
  nombre: string;
  /** Definición textual del Art. 1.2 de la Ord. 2800/2019. */
  definicion: string;
  /** Cita exacta del PDF, en español verbatim para fines de auditoría. */
  citaArtic: string;
};

/**
 * Las cinco clases de suelo del Distrito Sunchales, según Art. 1.2 de la
 * Ordenanza 2800/2019.
 */
export const clasesSuelo: AreaSueloDefinicion[] = [
  {
    id: "urbanizado",
    numero: 1,
    nombre: "Área de Suelo Urbanizado",
    definicion:
      "Sectores con ocupación efectiva o con un proyecto avanzado de ocupación de carácter urbano, considerados aptos para recibir la prestación de los servicios municipales, independientemente del grado de completamiento de su dotación de infraestructuras.",
    citaArtic: "Ord. 2800/2019, Art. 1.2 inc. 1",
  },
  {
    id: "urbanizable",
    numero: 2,
    nombre: "Área de Suelo Urbanizable",
    definicion:
      "Sectores constituidos por tierras aún no urbanizadas pero que pueden alcanzar razonables niveles de provisión de infraestructura y servicios, sobre las que el Municipio ha programado la expansión de la ciudad o que están desde hace tiempo en situación expectante de urbanización. Comprende subáreas: de completamiento, de expansión o de reserva.",
    citaArtic: "Ord. 2800/2019, Art. 1.2 inc. 2",
  },
  {
    id: "suburbano",
    numero: 3,
    nombre: "Área de Suelo Suburbano",
    definicion:
      "Suelo con un grado de subdivisión menor al exigido para la explotación primaria extensiva, destinado a servicios, producción secundaria, equipamiento, quintas o usos residenciales no permanentes. El Municipio no contempla alcanzar en él niveles plenos de provisión de infraestructura y/o servicios.",
    citaArtic: "Ord. 2800/2019, Art. 1.2 inc. 3",
  },
  {
    id: "rural",
    numero: 4,
    nombre: "Área de Suelo Rural",
    definicion:
      "Territorio destinado a la preservación de sus condiciones naturales o seminaturales, así como aquel con actividades de explotación de recursos naturales o expectante de ser explotado.",
    citaArtic: "Ord. 2800/2019, Art. 1.2 inc. 4",
  },
  {
    id: "no_urbanizable",
    numero: 5,
    nombre: "Área de Suelo No Urbanizable",
    definicion:
      "Áreas que por condiciones deficientes de saneamiento, explotación minera no saneada, actividad productiva con efluentes complejos u otras causas, no admiten subdivisión ni ocupación hasta tanto se modifiquen sus condiciones ambientales o se establezcan acciones de mitigación.",
    citaArtic: "Ord. 2800/2019, Art. 1.2 inc. 5",
  },
];

/**
 * Inmuebles incorporados al Área Urbanizada por el Art. 4° de la
 * Ord. 2800/2019. Lista textual del Art. 4 (verbatim parcelas).
 */
export type ParcelaIncorporada = {
  designacion: string;
  alias: string;
};

export const parcelasArt4: ParcelaIncorporada[] = [
  { designacion: "Parcela 6 del plano n° 141225", alias: "Hurra" },
  { designacion: "Lote 1 del plano n° 141.225", alias: "Puntogob" },
  { designacion: "Lote 1 al 9 de la manzana C del plano n° 47321", alias: "B° Colón" },
  { designacion: "Fracción sobrante con la PII 060500/0000", alias: "Villa" },
  { designacion: "Fracción sobrante con la PII 060501/0000", alias: "Villa" },
  { designacion: "Lote 1 del plano n° 40419", alias: "Tiro" },
  { designacion: "Lote 1 del plano n° 140.418", alias: "SanCor" },
  { designacion: "Lote I del plano n° 16.049", alias: "Smurfit" },
  { designacion: "Lote A del plano n° 112.873", alias: "Smurfit" },
  { designacion: "Lote B del plano n° 112.873", alias: "Otoño" },
  { designacion: "Parcela 00589 del plano n° 75.453", alias: "Lagunas" },
  { designacion: "Lote 1 del plano n° 129.132", alias: "Casa fundador" },
  { designacion: "Lote 1 del plano n° 171.291", alias: "Casa fundador" },
  { designacion: "Parcela 00568 del plano n° 124.649", alias: "Crac" },
  { designacion: "Lote C del plano n° 60.167", alias: "Crac" },
  { designacion: "Lote D del plano n° 60.167", alias: "EPE" },
  { designacion: "Parcela 00567 del plano n° 120.101", alias: "EPE" },
  { designacion: "Lote 1, 2, 3 y 4 del plano n° 140.895", alias: "Favial" },
  { designacion: "Lote I b del plano n° 126.649", alias: "SOEM" },
  { designacion: "Lote 1 al 9 del plano n° 139.115", alias: "Chavazza" },
  { designacion: "Manzana 1 del plano n° 158.649", alias: "Servicios" },
  { designacion: "Lote 1, A, B, C y D del plano n° 166.154", alias: "Servicios" },
  { designacion: "Lotes 1 al 5 de la manzana 2 del plano 180.960", alias: "Servicios" },
  { designacion: "Lotes 1 al 6 de la manzana 3 del plano n° 180.962", alias: "Servicios" },
  { designacion: "Lotes 1 al 6 de la manzana 4 del plano n° 166.154", alias: "Servicios" },
  { designacion: "Lote 1 de la manzana 5 del plano n° 166.154", alias: "Servicios" },
  { designacion: "Lote 1 y 2 del plano n° 140.894", alias: "Servicios" },
  { designacion: "Lote b del plano n° 158.649", alias: "Esc. Técnica" },
  { designacion: "Parcela 00917 del plano n° 155793", alias: "Corralón" },
  { designacion: "Remanente del plano n° 155.793", alias: "Encuentros" },
  { designacion: "Lote 1 del plano n° 155.793", alias: "CEF n° 27" },
  { designacion: "Lote 1 del plano n° 168684", alias: "Corroto" },
  { designacion: "Parcela 00002 del Plano 70451", alias: "Richiger" },
  { designacion: "Lote A del Plano 69595", alias: "Cipollatti" },
  { designacion: "Lote A del Plano 142047", alias: "Cipollatti" },
  { designacion: "Parcela 00598 del plano n° 57818", alias: "Low" },
  { designacion: "Lote I a, I b, I c y I d del plano 118.858, II y III del 104.920", alias: "Semillero" },
  { designacion: "Parcela 00558 (sin plano) con la PII 060805/0000", alias: "Cementerio" },
  { designacion: "Lote I del plano n° 86.851", alias: "Cementerio" },
  { designacion: "Lote II a del plano n° 123.437", alias: "Libertad" },
  { designacion: "Lote 4 del plano n° 209.001", alias: "Viotti" },
  { designacion: "Lote 10 del plano n° 209.001", alias: "Municipalidad" },
  { designacion: "Lote 2B del Plano de Mensura n° 51099", alias: "Richiger" },
  { designacion: "Lote 1 del plano n° 200.760", alias: "Midget" },
  { designacion: "Lote 2 del plano n° 155.227", alias: "GSS" },
];

/**
 * Polígonos definidos en el Anexo I-2 de la Ord. 2800/2019.
 * La Ordenanza describe cada polígono por calles, rutas y lotes — no por
 * coordenadas. Estos registros sólo conservan el nombre del polígono, la
 * Área a la que pertenecen y el artículo donde se describe, para que el
 * sitio pueda enviar al ciudadano al texto oficial sin reproducirlo en bloque.
 */
export type PoligonoArea = {
  area: ClaseSuelo;
  nombre: string;
  /** Indica la referencia normativa que define al polígono. */
  referencia: string;
};

export const poligonosArea: PoligonoArea[] = [
  { area: "urbanizado", nombre: "Polígono A", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "urbanizado", nombre: "Polígono B", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "urbanizable", nombre: "Polígono A", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "urbanizable", nombre: "Polígono B", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "urbanizable", nombre: "Polígono C", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "urbanizable", nombre: "Polígono D", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "suburbano", nombre: "Polígono CLAAS", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "suburbano", nombre: "Polígono Presser / Aeroclub", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "suburbano", nombre: "Polígono CET", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "suburbano", nombre: "Polígono Borgogno", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "no_urbanizable", nombre: "Polígono A", referencia: "Anexo I-2 — Ord. 2800/2019" },
  { area: "no_urbanizable", nombre: "Polígono B", referencia: "Anexo I-2 — Ord. 2800/2019" },
];

/**
 * URLs de la normativa relevante (referencias completas en lib/data/catastro.ts).
 */
export const URL_ORD_2800 =
  "https://concejosunchales.gob.ar/documentos/digesto/digesto.3902.O%202800%202019.pdf";

export const URL_DIGESTO_CONCEJO =
  "https://concejosunchales.gob.ar/Normativa-local.aspx";

/**
 * URL del visualizador IDESF del SCIT centrado aproximadamente en Sunchales.
 * El SCIT no tiene CORS habilitado, por lo que no se puede consumir como
 * tile-layer del lado del cliente. Pero sí se puede linkear y embeber en
 * iframe el portal oficial.
 */
export const URL_IDESF_PORTAL = "https://www.santafe.gob.ar/idesf/visualizador/";
export const URL_IDESF_BUSCADOR =
  "https://www.santafe.gob.ar/idesf/buscadorparcela/tramite.php";

export const efectoOrd2989 = {
  norma: "Ord. Sunchales 2989",
  asunto:
    "Sobretasa a terrenos baldíos. La calificación de una parcela como baldío depende de los datos catastrales municipales (uso, edificación efectiva). El listado de inmuebles efectivamente alcanzados no está publicado, lo que dificulta la verificación ciudadana del criterio de aplicación.",
} as const;
