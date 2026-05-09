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
  },
  hubTransparenciaSunchales: {
    id: "hubTransparenciaSunchales",
    title: "Sunchales — hub Municipio Transparente",
    url: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/",
    fetchedAt: "2026-05-09",
    notes: "Indice oficial de transparencia: remuneraciones, presupuesto, boletin oficial, nomina, audiencias publicas, licitaciones."
  },
  remuneracionesFuncionariosOficial: {
    id: "remuneracionesFuncionariosOficial",
    title: "Sunchales — Remuneraciones de funcionarios municipales (mensual 2014-2026)",
    url: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/",
    fetchedAt: "2026-05-09",
    notes: "Aprox. 140 PDFs mensuales desde enero 2014 hasta marzo 2026 (incluye SAC). Formato cerrado: PDF, no CSV."
  },
  presupuestoEjecucionOficial: {
    id: "presupuestoEjecucionOficial",
    title: "Sunchales — Presupuesto y ejecuciones presupuestarias",
    url: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/presupuesto/",
    fetchedAt: "2026-05-09",
    notes: "Aprox. 338 PDFs de ejecucion mensual y acumulada 2018-2026 (CAIF, egresos por destino, gasto total por objeto). Desglose por unidad para 2025."
  },
  licitacionesOficial: {
    id: "licitacionesOficial",
    title: "Sunchales — Licitaciones y contrataciones",
    url: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/",
    fetchedAt: "2026-05-09",
    notes: "Listado HTML con ~80 procesos 2015-2025. Incluye decretos, presupuestos oficiales y pliegos en PDF/RAR. NO publica adjudicaciones, oferentes ni montos finales contratados."
  },
  audienciasPublicasOficial: {
    id: "audienciasPublicasOficial",
    title: "Sunchales — Audiencias públicas",
    url: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/audiencias-publicas/",
    fetchedAt: "2026-05-09",
    notes: "Solo dos audiencias documentadas: 05/09/2019 (Complejo Ambiental) y 25/10/2022 (caso Caglieris c/ Municipalidad). Sin actividad 2020/2021/2023/2024/2025/2026."
  },
  autoridadesMunicipales: {
    id: "autoridadesMunicipales",
    title: "Sunchales — Autoridades municipales",
    url: "https://sunchales.gob.ar/municipio/autoridades/",
    fetchedAt: "2026-05-09",
    notes: "Nomina de Intendente, Secretarios, Subsecretarios y Directores. No incluye DNI, fecha de designacion, decreto de nombramiento ni DDJJ."
  },
  concejoNormativaLocal: {
    id: "concejoNormativaLocal",
    title: "Concejo Sunchales — Normativa local (digesto completo del Concejo)",
    url: "https://concejosunchales.gob.ar/normativa-local.aspx",
    fetchedAt: "2026-05-09",
    notes: "5.309 normas totales: 465 Declaraciones + 1.039 Minutas + 3.273 Ordenanzas + 532 Resoluciones. Cobertura 1973-2026. Patron de URL listado: /normativa-local-resultados.aspx?anio=YYYY"
  },
  concejoBoletinBimestral: {
    id: "concejoBoletinBimestral",
    title: "Concejo Sunchales — Boletín informativo bimestral",
    url: "https://concejosunchales.gob.ar/boletin-informativo-bimestral.aspx",
    fetchedAt: "2026-05-09",
    notes: "Cobertura completa marzo 2017 — enero 2026. PDFs por bimestre."
  },
  concejoResumenAnual: {
    id: "concejoResumenAnual",
    title: "Concejo Sunchales — Resumen anual",
    url: "https://concejosunchales.gob.ar/resumen-anual.aspx",
    fetchedAt: "2026-05-09",
    notes: "14 ediciones anuales 2012-2025. Ultimo: Resumen Legislativo Anual 2025 publicado el 20/03/2026."
  },
  concejoEjecucionPartida: {
    id: "concejoEjecucionPartida",
    title: "Concejo Sunchales — Ejecución de partida presupuestaria",
    url: "https://concejosunchales.gob.ar/ejecucion-partida-presupuestaria.aspx",
    fetchedAt: "2026-05-09",
    notes: "Aprox. 150 entradas mensuales enero 2014 — marzo 2026."
  },
  concejoMovimientoSaldos: {
    id: "concejoMovimientoSaldos",
    title: "Concejo Sunchales — Movimiento de saldos",
    url: "https://concejosunchales.gob.ar/movimiento-de-saldos.aspx",
    fetchedAt: "2026-05-09",
    notes: "Mensual 2017-2022 + cierres anuales 2020/21/22. NO publica 2023, 2024, 2025 ni 2026 (gap de 4 años)."
  },
  concejoConcejalesActuales: {
    id: "concejoConcejalesActuales",
    title: "Concejo Sunchales — Concejales actuales (mandatos 2023-2027 y 2025-2029)",
    url: "https://concejosunchales.gob.ar/concejales-actuales.aspx",
    fetchedAt: "2026-05-09",
    notes: "6 concejales: Cattaneo (Pres., Mas para Santa Fe), Balduino (VP1, LLA), Torriri (VP2, Ahora Sunchales-PS), Astor, Delmastro y Nicolau. CV publico para 4 de 6."
  },
  concejoPersonal: {
    id: "concejoPersonal",
    title: "Concejo Sunchales — Personal del Concejo",
    url: "https://concejosunchales.gob.ar/personal-del-concejo.aspx",
    fetchedAt: "2026-05-09",
    notes: "Solo 3 personas listadas: Soledad Mendoza (Secretaria), Marina Mondino (Resp. Adm.), Micaela Bergesio (Resp. Comunicacion). Faltan asesores y contratado."
  }
};
