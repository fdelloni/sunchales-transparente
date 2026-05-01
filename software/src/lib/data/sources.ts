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
  ley27275: {
    id: "ley27275",
    title: "Ley 27.275 - Derecho de Acceso a la Informacion Publica",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949",
    fetchedAt: "2026-04-29"
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
