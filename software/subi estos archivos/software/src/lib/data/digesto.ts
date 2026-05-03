/**
 * Datos demo del Digesto y Concejo Deliberante.
 *
 * Mientras la integración con la base de datos del Concejo Municipal de Sunchales
 * no esté operativa, se muestran datos ilustrativos. Cada elemento se etiqueta
 * apropiadamente para evitar inducir a error.
 *
 * Fuentes institucionales reales:
 * - https://concejosunchales.gob.ar/
 * - https://sunchales.miportal.ar/digesto
 *
 * Marco aplicable verificado al 02/05/2026:
 * - Constitución de Santa Fe (reforma 2025)
 * - Ley Orgánica de Municipios N° 14.436 (Decreto 711/2026)
 * - Ley Nacional 27.275 (Acceso a la Información Pública)
 */

export type EstadoNorma = "vigente" | "modificada" | "derogada";
export type TipoNorma = "ordenanza" | "decreto" | "resolucion" | "declaracion";

export type Norma = {
  numero: string;
  anio: number;
  tipo: TipoNorma;
  titulo: string;
  fechaSancion: string;
  estado: EstadoNorma;
  tema: string;
  notas?: string;
};

export type Sesion = {
  fecha: string;
  hora: string;
  tipo: "ordinaria" | "extraordinaria" | "especial";
  sala: string;
  estado: "convocada" | "realizada";
  expedientes?: number;
  notas?: string;
};

export type ProyectoEnTratamiento = {
  expediente: string;
  titulo: string;
  comision: string;
  estadoLabel: string;
};

/**
 * Normas de muestra. Los números son ilustrativos para demostrar la interfaz.
 * La numeración real proviene del Digesto Municipal en sunchales.miportal.ar/digesto.
 */
export const normasDemo: Norma[] = [
  {
    numero: "2998",
    anio: 2026,
    tipo: "ordenanza",
    titulo: "Creación del Consejo Consultivo Ambiental y Observatorio Ambiental",
    fechaSancion: "2026-04-30",
    estado: "vigente",
    tema: "Ambiente"
  },
  {
    numero: "2997",
    anio: 2026,
    tipo: "ordenanza",
    titulo: "Fondo de Inversión y Desarrollo — financiamiento de obras públicas",
    fechaSancion: "2026-04-30",
    estado: "vigente",
    tema: "Hacienda"
  },
  {
    numero: "2900",
    anio: 2021,
    tipo: "ordenanza",
    titulo: "Tránsito urbano — modificación del art. 14",
    fechaSancion: "2026-04-15",
    estado: "modificada",
    tema: "Tránsito",
    notas: "Texto consolidado disponible"
  },
  {
    numero: "2612",
    anio: 2017,
    tipo: "ordenanza",
    titulo: "Tránsito (versión histórica)",
    fechaSancion: "2017-08-10",
    estado: "derogada",
    tema: "Tránsito"
  }
];

export const sesionesDemo: Sesion[] = [
  {
    fecha: "2026-05-07",
    hora: "09:00",
    tipo: "ordinaria",
    sala: 'Sala "Mirta Rodríguez"',
    estado: "convocada",
    expedientes: 9
  },
  {
    fecha: "2026-05-14",
    hora: "09:00",
    tipo: "ordinaria",
    sala: 'Sala "Mirta Rodríguez"',
    estado: "convocada",
    notas: "Orden del día a definir"
  },
  {
    fecha: "2026-04-30",
    hora: "09:00",
    tipo: "ordinaria",
    sala: 'Sala "Mirta Rodríguez"',
    estado: "realizada",
    notas: "Acta y video disponibles"
  }
];

export const proyectosDemo: ProyectoEnTratamiento[] = [
  {
    expediente: "2026-0118",
    titulo: "Actualización de la Unidad de Cuenta Municipal (UCM)",
    comision: "Hacienda",
    estadoLabel: "Despacho favorable"
  },
  {
    expediente: "2026-0119",
    titulo: "Régimen de regularización de multas de tránsito",
    comision: "Asuntos Legales",
    estadoLabel: "En comisión"
  }
];

/**
 * Jerarquía normativa aplicable a Sunchales. Datos institucionales verificados.
 */
export const jerarquia = [
  {
    nivel: 1,
    titulo: "Constitución Nacional",
    detalle: "Arts. 1, 5, 14, 31, 75 inc. 22, 123"
  },
  {
    nivel: 2,
    titulo: "Tratados internacionales",
    detalle: "Convención Americana de DDHH — art. 13 (acceso a la información)"
  },
  {
    nivel: 3,
    titulo: "Constitución de Santa Fe (reforma 2025)",
    detalle: "Autonomía municipal y Cartas Orgánicas"
  },
  {
    nivel: 4,
    titulo: "Ley Orgánica de Municipios N° 14.436",
    detalle: "Promulgada por Decreto 711 — abril 2026"
  },
  {
    nivel: 5,
    titulo: "Ordenanzas y decretos de Sunchales",
    detalle: "Cuerpo normativo local consolidado"
  }
];

/**
 * Detecciones del motor de coherencia normativa (sugerencias para revisión humana).
 * No son veredictos: la decisión normativa siempre corresponde al Concejo.
 */
export const coherenciaDemo = [
  {
    norma: "Ordenanza N° 2.612 (2017)",
    descripcion: "Posible derogación tácita por Ord. N° 2.900 (2021) sobre tránsito urbano",
    tipo: "Derogación tácita"
  },
  {
    norma: "5 ordenanzas sobre Espacios Verdes",
    descripcion: "Detectada superposición temática — candidatas a consolidación",
    tipo: "Superposición"
  },
  {
    norma: "Decreto N° 318/2019",
    descripcion: "Cita a la Ley provincial 2756 — derogada por Ley 14.436 (abril 2026)",
    tipo: "Remisión rota"
  },
  {
    norma: "Ordenanzas anteriores a 2010",
    descripcion: "Revisar adecuación a la nueva LOM N° 14.436 (vigente desde 04/2026)",
    tipo: "Adecuación legal"
  }
];

/**
 * Etapas del proceso Carta Orgánica anunciado por el intendente Pinotti
 * en la apertura de sesiones ordinarias 2026.
 */
export const etapasCartaOrganica = [
  {
    etapa: 1,
    titulo: "Convocatoria pública y aportes ciudadanos"
  },
  {
    etapa: 2,
    titulo: "Elección de convencionales constituyentes"
  },
  {
    etapa: 3,
    titulo: "Sesiones de la Convención Municipal"
  },
  {
    etapa: 4,
    titulo: "Sanción y publicación de la Carta Orgánica"
  }
];

export const fuentesDigesto = {
  concejo: {
    titulo: "Concejo Municipal de Sunchales",
    url: "https://concejosunchales.gob.ar/"
  },
  digesto: {
    titulo: "Digesto Municipal",
    url: "https://sunchales.miportal.ar/digesto"
  },
  bo: {
    titulo: "Boletín Oficial Provincia de Santa Fe",
    url: "https://www.santafe.gob.ar/boletinoficial/"
  }
};
