/**
 * Concejo Municipal de Sunchales — datos institucionales VERIFICADOS.
 *
 * Toda esta información fue extraída del sitio oficial del Concejo
 * (https://concejosunchales.gob.ar) el 03/05/2026 y representa el estado
 * institucional REAL al momento del relevamiento.
 *
 * - Concejales actuales: 6 (verificados con foto, mandato, contacto)
 * - Comisiones: 23 instancias formales donde participan los concejales,
 *   asignadas por las Resoluciones N° 878/2025 y N° 879/2025.
 * - Personal del Concejo: 3 funcionarios verificados.
 * - Marco institucional: Ordenanza N° 1872/09 (Acceso a la Información Pública).
 *
 * Si alguno de estos datos cambia (renuncia, asunción, nueva resolución de
 * comisiones), actualizar este archivo y, en lo posible, vincularlo a la
 * fuente oficial automatizada en el futuro.
 */

export type Bloque =
  | "Más para Santa Fe"
  | "La Libertad Avanza"
  | "Ahora Sunchales - Partido Socialista";

export type RolConcejal =
  | "Presidente"
  | "Vicepresidente Primero"
  | "Vicepresidente Segunda"
  | "Concejal";

export type Concejal = {
  id: string;
  nombre: string;
  rol: RolConcejal;
  bloque: Bloque;
  mandatoInicio: number;
  mandatoFin: number;
  email: string;
  telefono: string;
  facebook?: string;
  cvUrl?: string;
  fotoUrl?: string;
};

/**
 * Concejales actuales — fuente: concejosunchales.gob.ar/concejales-actuales.aspx
 * Verificado 03/05/2026.
 */
export const concejales: Concejal[] = [
  {
    id: "cattaneo-fernando",
    nombre: "Fernando Cattaneo",
    rol: "Presidente",
    bloque: "Más para Santa Fe",
    mandatoInicio: 2025,
    mandatoFin: 2029,
    email: "fc2249@gmail.com",
    telefono: "03493-15418500",
    facebook: "https://www.facebook.com/fernando.c.cattaneo",
    cvUrl:
      "https://concejosunchales.gob.ar/Archivos/Curriculum/curriculum.62.CV%20Fernando.pdf",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.62.Cattaneo.jpg"
  },
  {
    id: "balduino-laura",
    nombre: "Laura Balduino",
    rol: "Vicepresidente Primero",
    bloque: "La Libertad Avanza",
    mandatoInicio: 2023,
    mandatoFin: 2027,
    email: "laura.balduino@hotmail.com",
    telefono: "03493-15415764",
    facebook: "https://www.facebook.com/profile.php?id=100064821729857",
    cvUrl:
      "https://concejosunchales.gob.ar/Archivos/Curriculum/curriculum.76.CVLauraBalduino.pdf",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.76.Laura.jpg"
  },
  {
    id: "torriri-brenda",
    nombre: "Brenda Torriri",
    rol: "Vicepresidente Segunda",
    bloque: "Ahora Sunchales - Partido Socialista",
    mandatoInicio: 2023,
    mandatoFin: 2027,
    email: "brendatorririconcejal@gmail.com",
    telefono: "03493-15455600",
    cvUrl:
      "https://concejosunchales.gob.ar/Archivos/Curriculum/curriculum.77.CVBrendaTorriri.pdf",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.77.Brenda.jpg"
  },
  {
    id: "astor-juan-ignacio",
    nombre: "Juan Ignacio Astor",
    rol: "Concejal",
    bloque: "Ahora Sunchales - Partido Socialista",
    mandatoInicio: 2023,
    mandatoFin: 2027,
    email: "juan.astor95@gmail.com",
    telefono: "03493-15495863",
    facebook: "https://www.facebook.com/juano.astor",
    cvUrl:
      "https://concejosunchales.gob.ar/Archivos/Curriculum/curriculum.75.Cv%20JuanIgnacioAstor.pdf",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.75.Astor.jpg"
  },
  {
    id: "delmastro-jose",
    nombre: "José Delmastro",
    rol: "Concejal",
    bloque: "Ahora Sunchales - Partido Socialista",
    mandatoInicio: 2025,
    mandatoFin: 2029,
    email: "josedelmastro41@gmail.com",
    telefono: "3493-416305",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.79.Delmastro.jpg"
  },
  {
    id: "nicolau-sebastian",
    nombre: "Sebastián Nicolau",
    rol: "Concejal",
    bloque: "La Libertad Avanza",
    mandatoInicio: 2025,
    mandatoFin: 2029,
    email: "sebastian.nicolau@gmail.com",
    telefono: "3493-401164",
    fotoUrl: "https://concejosunchales.gob.ar/Archivos/foto/foto.80.Nicolau.jpg"
  }
];

/**
 * Personal del Concejo (no concejales) — fuente: Personal-del-Concejo.aspx
 */
export type PersonalConcejo = {
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
};

export const personalConcejo: PersonalConcejo[] = [
  {
    nombre: "Soledad Mendoza",
    cargo: "Secretaria",
    email: "secretaria@concejosunchales.gob.ar",
    telefono: "(03493) 452793 / 452794"
  },
  {
    nombre: "Marina Mondino",
    cargo: "Responsable Área Administrativa",
    email: "secretaria@concejosunchales.gob.ar",
    telefono: "(03493) 452793 / 452794"
  },
  {
    nombre: "Micaela Bergesio",
    cargo: "Responsable Área de Comunicación Institucional",
    email: "prensa@concejosunchales.gob.ar",
    telefono: "(03493) 452793 / 452794"
  }
];

/**
 * Comisiones donde participan los concejales — fuente:
 * https://concejosunchales.gob.ar/participacion-comision.aspx
 *
 * Asignación vigente por Resoluciones N° 878/2025 y N° 879/2025.
 * Cada comisión incluye los concejales que la integran.
 */
export type Comision = {
  nombre: string;
  resolucion: string;
  integrantes: string[]; // ids de concejales
};

export const comisiones: Comision[] = [
  {
    nombre: "Comité de Cuenca Departamento Castellanos Zona Norte",
    resolucion: "Resolución N° 879/2025",
    integrantes: ["astor-juan-ignacio", "nicolau-sebastian"]
  },
  {
    nombre: "ADESu (Agencia para el Desarrollo Económico de Sunchales)",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["astor-juan-ignacio", "nicolau-sebastian"]
  },
  {
    nombre: "CAMSUA (Comisión de Acción Municipal sobre la utilización de agroquímicos)",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "astor-juan-ignacio", "nicolau-sebastian"]
  },
  {
    nombre: "Casa del Emprendedor",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "nicolau-sebastian"]
  },
  {
    nombre: "Comisión Asesora para el Desarrollo y Promoción de la Cultura y las Artes",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "balduino-laura"]
  },
  {
    nombre: "Comisión de Caminos Rurales Sunchales",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["nicolau-sebastian"]
  },
  {
    nombre: "Comisión para el tratamiento del Régimen de Retiro Especial",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["balduino-laura"]
  },
  {
    nombre: "Comisión para la Promoción de los Derechos de Niños, Niñas y Adolescentes",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "nicolau-sebastian"]
  },
  {
    nombre: "Comisión Permanente de Evaluación de Aspirantes a Viviendas Sociales",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "cattaneo-fernando", "balduino-laura"]
  },
  {
    nombre: "Consejo Asesor de Patrimonio Cultural Sunchalense",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "cattaneo-fernando", "nicolau-sebastian"]
  },
  {
    nombre: "Consejo Consultivo Ambiental",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "nicolau-sebastian"]
  },
  {
    nombre: "Consejo Consultivo de Medios de Comunicación",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "astor-juan-ignacio", "balduino-laura"]
  },
  {
    nombre: "Consejo de Arbolado Público",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "balduino-laura"]
  },
  {
    nombre: "Consejo de Inclusión para Personas con Discapacidad",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "cattaneo-fernando", "nicolau-sebastian"]
  },
  {
    nombre: "Consejo Ejecutivo de Seguridad",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "balduino-laura"]
  },
  {
    nombre: "Entidades de Bien Público",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "nicolau-sebastian"]
  },
  {
    nombre: "Instituto del Becario",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "cattaneo-fernando", "balduino-laura"]
  },
  {
    nombre: "Instituto Municipal de la Vivienda",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "astor-juan-ignacio", "balduino-laura"]
  },
  {
    nombre:
      "Mesa de Articulación para la Prevención y Abordaje de Consumos Problemáticos",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["torriri-brenda", "cattaneo-fernando", "nicolau-sebastian"]
  },
  {
    nombre: "Mesa de Coordinación Plan Integral de Género",
    resolucion: "Resolución N° 878/2025",
    integrantes: [
      "torriri-brenda",
      "cattaneo-fernando",
      "delmastro-jose",
      "astor-juan-ignacio",
      "balduino-laura",
      "nicolau-sebastian"
    ]
  },
  {
    nombre: "Mesa de Reforma del Código de Faltas o Convivencia Ciudadana Municipal",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["astor-juan-ignacio", "nicolau-sebastian"]
  },
  {
    nombre: "Mesa de trabajo Tenencia Responsable de Mascotas",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "nicolau-sebastian"]
  },
  {
    nombre: "Mesa Intersectorial por los Derechos de las Personas Mayores",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["cattaneo-fernando", "delmastro-jose", "balduino-laura"]
  },
  {
    nombre: "Observatorio de Seguridad y Siniestralidad Vial",
    resolucion: "Resolución N° 878/2025",
    integrantes: ["delmastro-jose", "nicolau-sebastian"]
  },
  {
    nombre: "Protección Civil",
    resolucion: "Resolución N° 878/2025",
    integrantes: [
      "torriri-brenda",
      "cattaneo-fernando",
      "delmastro-jose",
      "astor-juan-ignacio",
      "balduino-laura",
      "nicolau-sebastian"
    ]
  }
];

/**
 * Tipos de normas que sanciona el Concejo (fuente: tipos-de-normas.aspx)
 */
export type TipoNormaInfo = {
  tipo: "Ordenanza" | "Resolución" | "Minuta de Comunicación" | "Declaración";
  descripcion: string;
};

export const tiposDeNorma: TipoNormaInfo[] = [
  {
    tipo: "Ordenanza",
    descripcion:
      "Dictámen o proyecto destinado a legislar o dictar disposiciones de carácter permanente, o a reformar, abolir o suspender otra Ordenanza, instrucción o regla general."
  },
  {
    tipo: "Resolución",
    descripcion:
      'Proposición de carácter denegatorio sobre solicitudes particulares o proyectos, o de adopción de medidas relativas a la organización interna del Concejo. No requiere "Cúmplase" del Departamento Ejecutivo.'
  },
  {
    tipo: "Minuta de Comunicación",
    descripcion:
      "Proposición destinada a requerir informes, recomendar, solicitar o exponer algo al Departamento Ejecutivo."
  },
  {
    tipo: "Declaración",
    descripcion:
      "Proposición que tiene por objeto expresar la opinión del Concejo sobre cualquier asunto de carácter público."
  }
];

/**
 * Régimen local de Acceso a la Información Pública.
 * Fuente: https://concejosunchales.gob.ar/acceso-informacion-publica.aspx
 */
export const aipLocal = {
  ordenanza: "1872/2009",
  alcance:
    "Toda persona tiene derecho a solicitar y recibir información completa, veraz, adecuada y oportuna de cualquier órgano de la Municipalidad de Sunchales, entes autárquicos o descentralizados, Concejo Municipal, Juzgado de Faltas y empresas privadas o prestatarias de servicios públicos donde la Municipalidad tenga participación.",
  formaSolicitud:
    "Mediante formulario suscripto suministrado gratuitamente por la Municipalidad. También puede realizarse oralmente. No requiere expresar motivos ni patrocinio letrado.",
  plazoRespuestaDiasHabiles: 10,
  plazoProrrogaDiasHabiles: 5,
  fundamentos: [
    "Declaración Universal de los Derechos Humanos",
    "Convención Americana sobre Derechos Humanos",
    "Constitución Nacional Art. 75"
  ]
};

/**
 * Datos institucionales del Concejo (fuente: pie del sitio oficial).
 */
export const concejoInfo = {
  direccion: "Av. Belgrano 103 - 2° piso",
  ciudad: "Sunchales",
  provincia: "Santa Fe",
  pais: "Argentina",
  telefonos: ["(03493) 452793", "(03493) 452794", "(03493) 452845"],
  email: "concejo@concejosunchales.gob.ar",
  sitioWeb: "https://concejosunchales.gob.ar",
  redes: {
    facebook: "https://www.facebook.com/concejomunicipaldesunchales",
    twitter: "https://twitter.com/ConcejoSunch",
    youtube: "https://www.youtube.com/user/ConcSunch",
    instagram: "https://www.instagram.com/concejosunchales/"
  }
};

/**
 * Helpers
 */
export function concejalPorId(id: string): Concejal | undefined {
  return concejales.find((c) => c.id === id);
}

export function comisionesPorConcejal(concejalId: string): Comision[] {
  return comisiones.filter((c) => c.integrantes.includes(concejalId));
}

export function concejalesPorBloque(): Record<Bloque, Concejal[]> {
  const result: Record<Bloque, Concejal[]> = {
    "Más para Santa Fe": [],
    "La Libertad Avanza": [],
    "Ahora Sunchales - Partido Socialista": []
  };
  for (const c of concejales) result[c.bloque].push(c);
  return result;
}
