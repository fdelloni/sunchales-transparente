/**
 * Catastro Municipal — datos centralizados.
 *
 * Módulo de transparencia catastral y de ordenamiento territorial para Sunchales.
 *
 * MARCO NORMATIVO REAL (verificado 2026-05-10):
 *
 *   NACIONAL
 *   - Ley 26.209 — Catastro Nacional (2007). Art. 1 inc. b establece que la
 *     publicidad del estado parcelario es una de las funciones esenciales de
 *     los catastros territoriales. URL:
 *     https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto
 *
 *   PROVINCIAL SANTA FE
 *   - Ley 10.921/1992 — Servicio de Catastro e Información Territorial (SCIT).
 *     Crea el organismo provincial administrador del catastro territorial.
 *     URL: https://www.santafe.gob.ar/index.php/web/content/view/full/100820
 *
 *   - Ley 2.996 (texto ordenado) — Avaluación y Catastro de la Propiedad Raíz
 *     (1941, sucesivas reformas). URL:
 *     https://www.santafe.gov.ar/index.php/web/content/view/full/6950
 *
 *   MUNICIPAL — Sunchales
 *   - Ord. 1294/1999 — Plano de zonificación urbana original.
 *   - Ord. 1933/2009 — Modificaciones a la zonificación.
 *   - Ord. 2789/2019 — Régimen catastral/tributario. URL:
 *     https://portalril.org/contenido/_documentos_digesto_digesto.3860.O%202789%202019%20con%20decreto.pdf
 *   - Ord. 2800/2019 — Plano de Áreas de Sunchales. URL:
 *     https://concejosunchales.gob.ar/documentos/digesto/digesto.3902.O%202800%202019.pdf
 *   - Ord. 2989 — Sobretasa a terrenos baldíos (en disputa pública 2026).
 *   - Ord. 3266 — Suspensión sobretasa baldíos, VETADA por el DEM. Sesión
 *     extraordinaria 27/02/2026.
 *
 *   PRIVACIDAD (límite legítimo)
 *   - Ley Nacional 25.326. Protege titular registral, DNI, domicilio fiscal
 *     del propietario. NO se extiende a geometría parcelaria, nomenclador,
 *     superficie, valuación fiscal ni zonificación — esos son datos sobre
 *     cosas, no sobre personas, y son publicables sin restricción.
 *
 * ALUCIONES IDENTIFICADAS QUE NO USAR:
 *   - "Ley provincial 12.296" como ley del SCIT: NO. Es la 10.921/1992.
 *   - "Ley provincial 13.747" como ley catastral: NO existe en ese rol.
 */

export type NormaCatastral = {
  id: string;
  jerarquia: "nacional" | "provincial" | "municipal" | "limite";
  numero: string;
  titulo: string;
  resumen: string;
  url: string;
  fetchedAt: string;
};

export const normasCatastrales: NormaCatastral[] = [
  {
    id: "ley26209",
    jerarquia: "nacional",
    numero: "Ley 26.209",
    titulo: "Catastro Nacional",
    resumen:
      "Marco general de los catastros territoriales en la República Argentina. Art. 1 inc. b: la publicidad del estado parcelario es función esencial de los catastros. Sirve de fundamento al derecho ciudadano de acceder a la información parcelaria.",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto",
    fetchedAt: "2026-05-10",
  },
  {
    id: "leysf10921",
    jerarquia: "provincial",
    numero: "Ley provincial 10.921/1992",
    titulo: "Servicio de Catastro e Información Territorial (SCIT) — Santa Fe",
    resumen:
      "Crea el SCIT como organismo administrador del catastro territorial de la provincia de Santa Fe. Sus funciones incluyen la formación, conservación y publicación del estado parcelario provincial.",
    url: "https://www.santafe.gob.ar/index.php/web/content/view/full/100820",
    fetchedAt: "2026-05-10",
  },
  {
    id: "leysf2996",
    jerarquia: "provincial",
    numero: "Ley provincial 2.996 (t.o.)",
    titulo: "Avaluación y Catastro de la Propiedad Raíz — Santa Fe",
    resumen:
      "Norma histórica (1941, con sucesivas reformas) que regula la avaluación fiscal de los inmuebles y los procedimientos catastrales provinciales. Base legal de las valuaciones que luego utilizan los municipios para sus tributos inmobiliarios.",
    url: "https://www.santafe.gov.ar/index.php/web/content/view/full/6950",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ord2800-2019",
    jerarquia: "municipal",
    numero: "Ord. Sunchales 2800/2019",
    titulo: "Plano de Áreas de Sunchales",
    resumen:
      "Define las áreas urbanas del ejido de Sunchales. Base para la zonificación municipal vigente y para la aplicación diferencial de tributos como la TGI y la sobretasa a baldíos.",
    url: "https://concejosunchales.gob.ar/documentos/digesto/digesto.3902.O%202800%202019.pdf",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ord2789-2019",
    jerarquia: "municipal",
    numero: "Ord. Sunchales 2789/2019",
    titulo: "Régimen catastral/tributario",
    resumen:
      "Componente del régimen tributario municipal aplicable a inmuebles. Texto disponible con su decreto promulgatorio adjunto.",
    url: "https://portalril.org/contenido/_documentos_digesto_digesto.3860.O%202789%202019%20con%20decreto.pdf",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ord1294-1999",
    jerarquia: "municipal",
    numero: "Ord. Sunchales 1294/1999",
    titulo: "Plano de zonificación urbana original",
    resumen:
      "Primera norma de zonificación urbana que estableció el plano de niveles y usos del suelo del ejido. Sucesivas ordenanzas la modificaron parcialmente (1933/2009 y siguientes).",
    url: "https://concejosunchales.gob.ar/Normativa-local.aspx",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ord2989",
    jerarquia: "municipal",
    numero: "Ord. Sunchales 2989",
    titulo: "Sobretasa a terrenos baldíos",
    resumen:
      "Establece sobretasa diferencial sobre terrenos baldíos como instrumento de política urbana (desincentivar especulación, promover ocupación efectiva). En disputa pública activa durante 2026.",
    url: "https://concejosunchales.gob.ar/Normativa-local.aspx",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ord3266-vetada",
    jerarquia: "municipal",
    numero: "Ord. Sunchales 3266 (VETADA)",
    titulo: "Suspensión sobretasa baldíos — vetada por el DEM",
    resumen:
      "Sanciona la suspensión de la sobretasa de la Ord. 2989. Fue vetada por el Departamento Ejecutivo Municipal. La cuestión se trató en sesión extraordinaria del Concejo el 27/02/2026.",
    url: "https://concejosunchales.gob.ar/Normativa-local.aspx",
    fetchedAt: "2026-05-10",
  },
  {
    id: "ley25326-catastro",
    jerarquia: "limite",
    numero: "Ley Nacional 25.326",
    titulo: "Protección de Datos Personales — límite legítimo",
    resumen:
      "Protege titular registral, DNI, domicilio fiscal del propietario. NO se extiende a la geometría parcelaria, el nomenclador (sección/manzana/parcela), la superficie, la valuación fiscal ni la zonificación: esos son datos sobre cosas, no sobre personas, y por regla son publicables.",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790",
    fetchedAt: "2026-05-10",
  },
];

/**
 * Oficina de Catastro municipal — datos de contacto verificables.
 */
export const oficinaCatastro = {
  nombre: "Oficina de Catastro",
  dependencia:
    "Subdirección de Obras Privadas — Secretaría de Gestión Ambiental y Territorial",
  encargado: "Arq. Pablo Pueyo",
  domicilio: "Av. Belgrano 103, Sunchales (Santa Fe)",
  email: "catastro@sunchales.gov.ar",
  arancelConsulta: "10 UCM (Unidades Catastro Municipal) por consulta de dato catastral",
  fuenteVerbatim:
    "Información declarada en el listado oficial de trámites del Municipio (sunchales.gob.ar/gestion/sunchales-impulsa/tramites/) que individualiza a la Oficina de Catastro como área tramitadora.",
} as const;

/**
 * Trámites catastrales que el ciudadano puede iniciar.
 * URLs base del portal municipal de trámites.
 */
export type TramiteCatastral = {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
};

const URL_TRAMITES_BASE = "https://sunchales.gob.ar/gestion/sunchales-impulsa/tramites";

export const tramitesCatastrales: TramiteCatastral[] = [
  {
    id: "datos-catastrales",
    nombre: "Solicitar datos catastrales",
    descripcion:
      "Consulta del dato catastral asociado a un inmueble. Arancel: 10 UCM por consulta.",
    url: `${URL_TRAMITES_BASE}/solicitar-datos-catastrales/`,
  },
  {
    id: "actualizacion-datos",
    nombre: "Solicitar actualización de datos catastrales",
    descripcion:
      "Pedido de actualización en la base catastral municipal por modificación dominial o física.",
    url: `${URL_TRAMITES_BASE}/`,
  },
  {
    id: "certificado-final-obra",
    nombre: "Solicitar certificado final de obra",
    descripcion:
      "Acto administrativo que acredita la finalización de una obra conforme al permiso de construcción otorgado.",
    url: `${URL_TRAMITES_BASE}/`,
  },
  {
    id: "permiso-construccion",
    nombre: "Solicitar permiso de construcción",
    descripcion:
      "Autorización municipal previa para construir, reformar o ampliar inmuebles, sujeta a la zonificación vigente.",
    url: `${URL_TRAMITES_BASE}/`,
  },
  {
    id: "cambio-domicilio-tgi",
    nombre: "Solicitar cambio de domicilio para TGI",
    descripcion:
      "Actualización del domicilio fiscal del contribuyente para la Tasa General de Inmuebles.",
    url: `${URL_TRAMITES_BASE}/`,
  },
  {
    id: "visado-previo",
    nombre: "Solicitar visado previo a planos de obra",
    descripcion:
      "Revisión técnica previa al ingreso formal del expediente de permiso de construcción.",
    url: `${URL_TRAMITES_BASE}/`,
  },
  {
    id: "regularizacion-dominial",
    nombre: "Solicitar regularización dominial",
    descripcion:
      "Gestión para regularizar inmuebles cuya situación dominial es irregular (Programa Nacional/Provincial de regularización).",
    url: `${URL_TRAMITES_BASE}/`,
  },
];

/**
 * Recursos públicos provinciales y nacionales que ya cubren parte de la
 * publicidad parcelaria y que Sunchales debería linkear desde su sitio.
 */
export type RecursoPublico = {
  id: string;
  ambito: "provincial" | "nacional" | "comparado";
  titulo: string;
  descripcion: string;
  url: string;
};

export const recursosPublicos: RecursoPublico[] = [
  {
    id: "idesf-visualizador",
    ambito: "provincial",
    titulo: "Visualizador IDESF (SCIT Santa Fe)",
    descripcion:
      "Visualizador público de capas parcelarias provinciales (parcelas, perfil edificado, manzanas, distritos). No requiere login.",
    url: "https://www.santafe.gob.ar/idesf/visualizador/",
  },
  {
    id: "idesf-buscador-parcela",
    ambito: "provincial",
    titulo: "Buscador de parcelas por nomenclador (SCIT)",
    descripcion:
      "Permite consultar la geometría y los datos básicos de una parcela ingresando su nomenclador catastral.",
    url: "https://www.santafe.gob.ar/idesf/buscadorparcela/tramite.php",
  },
  {
    id: "ipec-plantas-urbanas",
    ambito: "provincial",
    titulo: "IPEC — Plantas urbanas (descarga de planos y shapefile)",
    descripcion:
      "Repositorio del Instituto Provincial de Estadística y Censos con planos urbanos y shapefiles por localidad. Falta verificar inclusión específica de Sunchales en el set descargable.",
    url: "https://www.estadisticasantafe.gob.ar/contenido/plantas-urbanas-descarga-de-planos-y-shapefile/",
  },
  {
    id: "idecor",
    ambito: "comparado",
    titulo: "IDECOR (Córdoba) — referente nacional",
    descripcion:
      "Infraestructura de Datos Espaciales de Córdoba: publica desde 2018 las parcelas urbanas y rurales con valuaciones históricas bajo Ley provincial 10.454.",
    url: "https://www.idecor.gob.ar/",
  },
  {
    id: "usig-caba",
    ambito: "comparado",
    titulo: "USIG / Datos Abiertos CABA — API parcelas",
    descripcion:
      "Buenos Aires publica las parcelas con interfaz pública y datasets abiertos bajo Ley 6.437 de la Ciudad.",
    url: "https://data.buenosaires.gob.ar/dataset/parcelas",
  },
];
