/**
 * Datos institucionales del Juzgado Municipal de Faltas de Sunchales.
 *
 * Información institucional VERIFICADA (al 02/05/2026) contra la página
 * oficial del Municipio: https://www.sunchales.gob.ar/juzgado-faltas
 *
 * Los indicadores estadísticos son DEMO mientras no exista integración con
 * la base de datos del Juzgado. Se etiquetan apropiadamente.
 */

export const juzgadoInfo = {
  sede: "25 de Mayo 431",
  cp: "2322",
  telefono: "03493-425500",
  telefonoAlt: "15437127",
  horario: "Lunes a viernes de 7 a 13 hs",
  sitio: "https://www.sunchales.gob.ar/juzgado-faltas",
  modernizacion2026: "Incorporación de tótems de pago para abonar multas en forma autónoma."
};

/**
 * Marco normativo aplicable al Juzgado Municipal de Faltas de Sunchales.
 * Cada referencia se cita a su norma original.
 */
export type MarcoNormativo = {
  origen: "provincial" | "municipal";
  ambito: string;
  norma: string;
  tipos: string;
  regimen: string;
};

export const marcoJuzgado: MarcoNormativo[] = [
  {
    origen: "provincial",
    ambito: "Provincial delegado",
    norma:
      "Código de Faltas Ley 10.703 · Tránsito Ley 13.169 · Convenio bajo Ley 13.133",
    tipos:
      "Tránsito provincial, contravenciones generales, seguridad vial",
    regimen:
      'Multas en "jus" provincial · destino regulado por norma provincial'
  },
  {
    origen: "municipal",
    ambito: "Municipal propio",
    norma: "Código Municipal de Faltas y ordenanzas locales",
    tipos:
      "Habilitaciones, construcciones, ambiente, bromatología, espacio público, ordenanzas locales de convivencia",
    regimen:
      "Multas en UCM (Unidad de Cuenta Municipal) · destino regulado por ordenanza local"
  }
];

/**
 * Información que SÍ está publicada por el Municipio. Se exhibe para no
 * proyectar una imagen distorsionada de la situación.
 */
export const loYaPublicado: string[] = [
  "Información institucional básica (sede, horario, contacto telefónico).",
  'Trámite "Comparecencia ante el Juzgado de Faltas" con instructivo.',
  'Trámite "Otorgamiento de Certificados de Libre Multa".',
  "Modernización 2026: incorporación de tótems de pago para abonar multas de manera autónoma."
];

/**
 * Tres tensiones que se resuelven por diseño en el módulo.
 */
export const tensionesDeDiseno = [
  {
    n: "01",
    titulo: "Privacidad del infractor",
    descripcion:
      "Ley 25.326 protegida por diseño: solo datos agregados, microagregación bajo umbral mínimo de casos para evitar reidentificación, nombres y dominios no se publican jamás."
  },
  {
    n: "02",
    titulo: "Independencia del juez",
    descripcion:
      'Se exponen datos administrativos, no contenido decisorio individual. Estadísticas, no "calificaciones". Acuerdo escrito con el Juzgado sobre alcance del módulo.'
  },
  {
    n: "03",
    titulo: "Trazabilidad de fondos",
    descripcion:
      "Conexión directa con Cuentas Públicas: ingreso por multas, afectación normativa (si la hay) y ejecución. Si no hay afectación específica, se declara explícitamente."
  }
];

/**
 * Plan de construcción del módulo.
 */
export const planConstruccion = [
  {
    n: 1,
    titulo: "Reunión técnica con el Juzgado",
    descripcion:
      "Validar alcance, conseguir ordenanza orgánica vigente, identificar fuentes de datos internas."
  },
  {
    n: 2,
    titulo: "Diagnóstico de cobertura",
    descripcion:
      "Hasta dónde llegan los registros digitalizados. Definir punto de corte realista para publicar."
  },
  {
    n: 3,
    titulo: "Tablero piloto",
    descripcion:
      "Primero indicadores de actividad y económicos. Microagregación con umbral acordado con asesoría legal."
  },
  {
    n: 4,
    titulo: "Datos abiertos y API",
    descripcion:
      "Dataset público, endpoint REST y plan de actualización mensual. Apertura completa."
  }
];
