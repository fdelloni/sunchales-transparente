export type Source = {
  id: string;
  title: string;
  url: string;
  fetchedAt: string;
  notes?: string;
};

export const sources: Record<string, Source> = {
  censo2022_sunchales: {
    id: "censo2022_sunchales",
    title: "Censo Nacional 2022 - Datos definitivos Sunchales",
    url: "https://pidolapalabraweb.com.ar/contenido/362/segun-el-censo-2022-sunchales-tiene-23416-habitantes",
    fetchedAt: "2026-04-29",
    notes: "23.416 habitantes; 9.710 viviendas particulares (INDEC)."
  },
  presupuesto2026: {
    id: "presupuesto2026",
    title: "Presupuesto Municipal Sunchales 2026 (proyecto)",
    url: "https://meridianodigital.com.ar/el-concejo-municipal-de-sunchales-analiza-el-proyecto-del-presupuesto-municipal-2026/",
    fetchedAt: "2026-04-29",
    notes: "Gastos $30.938.107.965 - Recursos corrientes $30.950.227.077"
  },
  fondoLey12385: {
    id: "fondoLey12385",
    title: "Ley 12.385 - Programa de Obras Menores Sunchales 2026",
    url: "https://movilquique.com/politica/sunchales-recibira-613-millones-de-recursos-provinciales/",
    fetchedAt: "2026-04-29",
    notes: "Sunchales recibe $613.691.020,73 del total departamental $7.563.065.345,66."
  },
  organigramaMunicipal: {
    id: "organigramaMunicipal",
    title: "Organigrama Municipal Sunchales - gestion Pinotti",
    url: "https://meridianodigital.com.ar/nombre-por-nombre-el-nuevo-organigrama-municipal-completo/",
    fetchedAt: "2026-04-29",
    notes: "Estructura de Secretarias y Subsecretarias con sus titulares."
  },
  ordenanza1872: {
    id: "ordenanza1872",
    title: "Ordenanza Sunchales N° 1872/2009 - Acceso a la Informacion Publica",
    url: "https://concejosunchales.gob.ar/documentos/digesto/O18722009.pdf",
    fetchedAt: "2026-05-03",
    notes: "Norma municipal vigente. Sancionada el 09/03/2009. 10 articulos. Plazo respuesta 10 dias habiles + 5 prorroga unica (Art. 7°). Limitaciones taxativas (Art. 4°). Gratuita y sin patrocinio (Arts. 3 y 6). Incumplimiento = falta grave (Art. 9°)."
  },
  decreto0692: {
    id: "decreto0692",
    title: "Decreto Provincial Santa Fe N° 0692/2009 - Mecanismo de acceso a la informacion publica",
    url: "https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811",
    fetchedAt: "2026-05-03",
    notes: "Aplicable supletoriamente. Principios de igualdad, publicidad, celeridad, informalidad, gratuidad y maxima divulgacion. Plazos: 15 + 5 + 10 dias habiles."
  },
  concejoAccesoInfoPagina: {
    id: "concejoAccesoInfoPagina",
    title: "Concejo Municipal Sunchales - Pagina oficial de Acceso a la Informacion Publica",
    url: "https://concejosunchales.gob.ar/acceso-informacion-publica.aspx",
    fetchedAt: "2026-05-03",
    notes: "Comunicacion institucional del derecho de acceso. Incluye formulario de solicitud."
  },
  ley25326: {
    id: "ley25326",
    title: "Ley Nacional 25.326 - Proteccion de Datos Personales",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790",
    fetchedAt: "2026-05-03",
    notes: "Limite legitimo a la transparencia activa cuando comprometeria intimidad o datos personales sensibles de terceros."
  },
  ley26037: {
    id: "ley26037",
    title: "Ley 26.037 - Sunchales Capital Nacional del Cooperativismo",
    url: "https://sunchales.gob.ar/ciudad/turismo/capital-nacional-del-cooperativismo/",
    fetchedAt: "2026-04-29"
  },
  ordenanzaTributaria: {
    id: "ordenanzaTributaria",
    title: "Ordenanza Tributaria Municipal Sunchales - vigente",
    url: "https://www.santafe.gob.ar/boletinoficial/ver.php?seccion=2026/2026-01-27avisospriv.html",
    fetchedAt: "2026-05-01",
    notes: "Comprende TGI Urbana/Rural/Suburbana, DReI, Contribucion por Mejoras, Derecho de Ocupacion del Dominio Publico, Permiso de Uso, Multas y derechos varios."
  },
  ley23548: {
    id: "ley23548",
    title: "Ley 23.548 - Regimen Transitorio de Coparticipacion Federal de Impuestos",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-23548-21108",
    fetchedAt: "2026-05-01",
    notes: "Marco legal de la coparticipacion federal de impuestos."
  }
};
