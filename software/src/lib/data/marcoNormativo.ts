/**
 * Marco Normativo Aplicable a Sunchales — Acceso a la Información Pública
 *
 * Único módulo central de fundamentos legales del proyecto.
 * Toda referencia normativa del sitio debe construirse a partir de aquí
 * para garantizar coherencia y trazabilidad.
 *
 * Las normas que figuran fueron VERIFICADAS en sitios oficiales el 2026-05-03.
 * No se incluyen normas cuya existencia no haya podido confirmarse en fuentes
 * oficiales. Esto es deliberado: el proyecto rechaza por principio citar
 * normativa que no esté efectivamente verificable.
 */

export type NormaJerarquia = "municipal" | "provincial" | "constitucional" | "convencional" | "limite";

export type Norma = {
  id: string;
  jerarquia: NormaJerarquia;
  titulo: string;
  numero: string;
  ambito: string;
  resumen: string;
  url: string;
  urlEs: "oficial" | "no-oficial";
  vigente: boolean;
  fetchedAt: string;
  articulosClave?: { numero: string; descripcion: string }[];
};

/**
 * NIVEL 1 — MARCO MUNICIPAL VINCULANTE PARA SUNCHALES
 */
export const ordenanza1872_2009: Norma = {
  id: "ordenanza1872_2009",
  jerarquia: "municipal",
  titulo: "Ordenanza Municipal de Acceso a la Información Pública",
  numero: "Ordenanza Nº 1872/2009",
  ambito: "Municipalidad de Sunchales (incluye entes autárquicos y descentralizados, Concejo Municipal, Juzgado de Faltas y empresas prestatarias de servicios públicos con participación municipal)",
  resumen:
    "Reconoce el derecho de toda persona física o jurídica, pública o privada, a solicitar y recibir información completa, veraz, adecuada y oportuna, en virtud del principio republicano de publicidad de los actos de gobierno. La información es gratuita, no requiere patrocinio letrado ni expresión de motivos. Plazo de respuesta: 10 días hábiles, prorrogable por única vez por 5 días hábiles más mediante decisión fundada. La denegatoria sólo puede ser dispuesta por funcionario de jerarquía equivalente o superior a Secretario y debe explicitar la norma en que se funda. El incumplimiento por parte del agente público constituye falta grave con responsabilidad administrativa, civil, penal, disciplinaria y/o política.",
  url: "https://concejosunchales.gob.ar/documentos/digesto/O18722009.pdf",
  urlEs: "oficial",
  vigente: true,
  fetchedAt: "2026-05-03",
  articulosClave: [
    { numero: "Art. 1°", descripcion: "Derecho de toda persona, fundado en el principio de publicidad de los actos de gobierno." },
    { numero: "Art. 2°", descripcion: "Definición amplia de información (cualquier soporte: escrito, fotográfico, magnético, digital)." },
    { numero: "Art. 3°", descripcion: "Gratuidad. Sólo costo de reproducción si se requiere." },
    { numero: "Art. 4°", descripcion: "Limitaciones taxativas: (a) intimidad y datos personales; (b) sumarios administrativos en período de secreto; (c) secreto profesional; (d) secreto bancario; (e) estrategia procesal del Municipio en defensa de sus derechos; (f) exceptuada por norma especial o de mayor jerarquía." },
    { numero: "Art. 5°", descripcion: "Información parcial: lo no limitado debe entregarse igual." },
    { numero: "Art. 6°", descripcion: "Solicitud por formulario o incluso oralmente. Sin patrocinio. Sin necesidad de motivos." },
    { numero: "Art. 7°", descripcion: "Plazo de respuesta: 10 días hábiles + 5 de prórroga única, fundada y previa al vencimiento." },
    { numero: "Art. 8°", descripcion: "Denegatoria por funcionario de jerarquía ≥ Secretario, fundada, citando norma." },
    { numero: "Art. 9°", descripcion: "Incumplimiento del agente público = falta grave (responsabilidad administrativa, civil, penal, disciplinaria y/o política)." },
  ],
};

/**
 * NIVEL 2 — MARCO PROVINCIAL SUPLETORIO
 */
export const decreto0692_2009: Norma = {
  id: "decreto0692_2009",
  jerarquia: "provincial",
  titulo: "Reglamentación del mecanismo de acceso a la información pública (Provincia de Santa Fe)",
  numero: "Decreto Provincial Nº 0692/2009",
  ambito: "Poder Ejecutivo de la Provincia de Santa Fe (estándar reglamentario aplicable de modo supletorio en el ámbito municipal)",
  resumen:
    "Regula el mecanismo provincial de acceso a la información pública. Reconoce los principios de igualdad, publicidad, celeridad, informalidad, gratuidad y máxima divulgación. Plazos del procedimiento: 15 días hábiles para opinión fundada del sujeto requerido + 5 días para decisión + prórroga eventual de 10 días por acto fundado.",
  url: "https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811",
  urlEs: "oficial",
  vigente: true,
  fetchedAt: "2026-05-03",
};

/**
 * NIVEL 3 — FUNDAMENTO CONSTITUCIONAL Y CONVENCIONAL
 *
 * Estos fundamentos son el cimiento sobre el que toda la jerarquía descansa
 * y son los que el propio Concejo Municipal de Sunchales invoca explícitamente
 * en su comunicación oficial sobre acceso a la información pública.
 */
export const principioPublicidadActosGobierno: Norma = {
  id: "principio_publicidad_actos_gobierno",
  jerarquia: "constitucional",
  titulo: "Principio republicano de publicidad de los actos de gobierno",
  numero: "Constitución Nacional Arts. 1°, 33° y 75 inc. 22",
  ambito: "Toda la República Argentina — fundamento constitucional inderogable",
  resumen:
    "La forma republicana de gobierno adoptada por la Nación (Art. 1° CN) tiene como uno de sus pilares ineludibles la publicidad de los actos de gobierno y el control ciudadano de la administración. Los derechos no enumerados (Art. 33°) y los tratados con jerarquía constitucional (Art. 75 inc. 22) refuerzan ese mandato. El acceso a la información pública es así un derecho operativo derivado directamente de la Constitución, exigible aún cuando no exista una ley específica que lo regule. La propia Ordenanza Sunchales 1872/2009 reconoce expresamente este principio como su fundamento jurídico primario.",
  url: "https://www.argentina.gob.ar/normativa/nacional/constitucion-nacional-804",
  urlEs: "oficial",
  vigente: true,
  fetchedAt: "2026-05-03",
};

export const cadhArt13: Norma = {
  id: "cadh_art13",
  jerarquia: "convencional",
  titulo: "Convención Americana sobre Derechos Humanos — Libertad de pensamiento y expresión",
  numero: "CADH Art. 13 (jerarquía constitucional por Art. 75 inc. 22 CN)",
  ambito: "Derecho internacional vinculante incorporado al bloque de constitucionalidad federal",
  resumen:
    "El derecho de toda persona a la libertad de pensamiento y expresión comprende la libertad de buscar, recibir y difundir información e ideas de toda índole. La Corte Interamericana de Derechos Humanos (caso 'Claude Reyes y otros vs. Chile', 2006) interpretó este artículo como base autónoma del derecho de acceso a la información pública en poder del Estado.",
  url: "https://www.oas.org/dil/esp/tratados_b-32_convencion_americana_sobre_derechos_humanos.htm",
  urlEs: "oficial",
  vigente: true,
  fetchedAt: "2026-05-03",
};

/**
 * NIVEL 4 — LÍMITES LEGÍTIMOS A LA TRANSPARENCIA
 *
 * Estas no son normas que obligan a publicar, sino normas que el municipio
 * puede invocar legítimamente para denegar parcialmente información.
 * Se publican aquí en el sitio para que el ciudadano sepa exactamente
 * bajo qué fundamentos puede ser denegado un pedido — y bajo cuáles NO.
 */
export const ley25326: Norma = {
  id: "ley25326",
  jerarquia: "limite",
  titulo: "Ley Nacional de Protección de Datos Personales",
  numero: "Ley Nacional Nº 25.326",
  ambito: "Toda la República Argentina",
  resumen:
    "Protege la intimidad y los datos personales sensibles de las personas físicas y jurídicas. Es el fundamento legítimo para que el municipio anonimice o reserve datos que, de publicarse, comprometerían la privacidad de terceros (por ejemplo: salud, orientación sexual, situación financiera personal). NO habilita a denegar información sobre el ejercicio de funciones públicas: la remuneración, cargo, área y trayectoria de un funcionario son información pública, no dato personal protegido.",
  url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790",
  urlEs: "oficial",
  vigente: true,
  fetchedAt: "2026-05-03",
};

/**
 * Lista ordenada de las limitaciones taxativas según Ord. 1872/2009 Art. 4°.
 * Útil para construir una sección "qué pueden y qué NO pueden negarte".
 */
export const limitacionesAccesoOrd1872: { letra: string; descripcion: string; alcance: string }[] = [
  {
    letra: "a)",
    descripcion: "Intimidad de las personas o bases de datos personales.",
    alcance: "Sólo aplica a personas físicas en su esfera privada; NO se extiende al ejercicio de funciones públicas.",
  },
  {
    letra: "b)",
    descripcion: "Sumarios administrativos durante el período de secreto.",
    alcance: "Una vez vencido el plazo de secreto, la información debe entregarse dentro de los 10 días hábiles siguientes.",
  },
  {
    letra: "c)",
    descripcion: "Información protegida por secreto profesional.",
    alcance: "Aplica a casos donde un profesional (ej. médico, abogado) actúa como tal en relación con un tercero.",
  },
  {
    letra: "d)",
    descripcion: "Información protegida por secreto bancario.",
    alcance: "Aplica a operaciones financieras de terceros, no al manejo de fondos públicos del municipio.",
  },
  {
    letra: "e)",
    descripcion: "Estrategia del Municipio en la defensa de sus derechos en reclamos administrativos o procesos judiciales.",
    alcance: "Aplica únicamente a documentos cuya divulgación afectaría la posición procesal del municipio en una causa específica en trámite.",
  },
  {
    letra: "f)",
    descripcion: "Información exceptuada por ordenanzas especiales o normas de mayor jerarquía.",
    alcance: "Requiere norma específica vigente que la exceptúe; debe ser citada en la denegatoria.",
  },
];

/**
 * Helper: marco completo en orden jerárquico, listo para iterar en componentes.
 */
export const marcoNormativoCompleto: Norma[] = [
  ordenanza1872_2009,
  decreto0692_2009,
  principioPublicidadActosGobierno,
  cadhArt13,
  ley25326,
];

/**
 * Helper: cita corta para usar en módulos cuando hay que poner un fundamento
 * de transparencia en una sola línea.
 */
export const fundamentoCorto =
  "Ordenanza Sunchales N° 1872/2009 (acceso a la información pública) en concordancia con el principio constitucional de publicidad de los actos de gobierno (Art. 1° CN) y la CADH Art. 13.";

export const fundamentoUrl = ordenanza1872_2009.url;
