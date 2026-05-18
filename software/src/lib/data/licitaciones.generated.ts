// AUTO-GENERADO por scripts/scrapear-licitaciones.mjs
// NO EDITAR A MANO. Para regenerar: npm run scrapear-licitaciones
//
// Fuente oficial:
// https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/
//
// Última sincronización: 2026-05-18T12:23:48.081Z
// Total licitaciones extraídas: 64

export type ProcedimientoOficial =
  | "licitacion_publica"
  | "licitacion_privada"
  | "concurso_precios"
  | "contratacion_directa"
  | "otro";

export type DocumentoOficial = {
  /** Nombre humano del archivo (caja del link en la página oficial). */
  nombre: string;
  /** Tipo deducido del nombre: pliego | decreto | enmienda | circular | anexo | otro. */
  tipo: "pliego" | "decreto" | "enmienda" | "circular" | "anexo" | "otro";
  /** URL pública directa al archivo (PDF/RAR/ZIP). */
  url: string;
};

export type LicitacionOficial = {
  /** Identificador estable: ej. lp-04-2025. */
  id: string;
  /** Título tal como aparece en la página oficial. */
  titulo: string;
  /** Tipo de procedimiento. */
  procedimiento: ProcedimientoOficial;
  /** Numeración con barra (ej. "04/2025"). */
  numero: string;
  /** Año del proceso (extraído de la numeración). */
  anio: number;
  /** Decreto de llamado, si está citado. Null si no se publicó. */
  decreto: string | null;
  /** Objeto de la contratación (texto literal del panel). Null si no se pudo extraer. */
  objeto: string | null;
  /** Presupuesto oficial en pesos argentinos. Null si no se pudo extraer. */
  presupuestoOficial: number | null;
  /** Fecha de apertura de ofertas (ISO 8601). Null si no se publicó o no se pudo parsear. */
  fechaApertura: string | null;
  /** Archivos publicados por el municipio para este proceso. */
  documentos: DocumentoOficial[];
  /** URL de la página oficial (listado). */
  fuenteUrl: string;
};

export const licitacionesOficiales: LicitacionOficial[] = [
  {
    "id": "lp-04-2025",
    "titulo": "Licitación Pública N° 04/2025",
    "procedimiento": "licitacion_publica",
    "numero": "04/2025",
    "anio": 2025,
    "decreto": "Decreto N° 3537/2025",
    "objeto": "adquisición de 261 luminarias NAOS 220W, en un todo conforme con las Características Técnicas de la Sección III del Pliego de Bases y Condiciones.-",
    "presupuestoOficial": 56714843.25,
    "fechaApertura": "2025-12-04T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/11/Pliego-de-Bases-y-Condiciones-1.pdf"
      },
      {
        "nombre": "Decreto 3537-2025",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/11/Decreto-3537-2025.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2025",
    "titulo": "Licitación Pública N° 03/2025",
    "procedimiento": "licitacion_publica",
    "numero": "03/2025",
    "anio": 2025,
    "decreto": "Decreto N° 3523/2025",
    "objeto": "adquisición de una excavadora sobre orugas con hoja topadora frontal, en un todo conforme con las Características Técnicas de la Sección III del Pliego de Bases y Condiciones.",
    "presupuestoOficial": 230000000,
    "fechaApertura": "2025-11-19T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/10/Pliego-de-Bases-y-Condiciones.pdf"
      },
      {
        "nombre": "Decreto 3523-2025",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/10/Decreto-3523-2025.pdf"
      },
      {
        "nombre": "Enmienda y Aclaración sin consulta N° 1",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/11/Enmienda-y-Aclaracion-sin-consulta-N°-1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2025",
    "titulo": "Licitación Pública N° 02/2025",
    "procedimiento": "licitacion_publica",
    "numero": "02/2025",
    "anio": 2025,
    "decreto": "Decreto N° 3467/2025",
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2025-04-29T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3467-2025",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3467-2025.pdf"
      },
      {
        "nombre": "Pliego Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/LP_02-2025_pliego_bases_y_condiciones.pdf"
      },
      {
        "nombre": "Aclaración sin consulta N° 1",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/LP_02-2025_aclaracion_sin_consulta_ndeg_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2025",
    "titulo": "Licitación Pública N° 01/2025 – CONSORCIO GIRSU DEL ÁREA METROPOLITANA DE SUNCHALES",
    "procedimiento": "licitacion_publica",
    "numero": "01/2025",
    "anio": 2025,
    "decreto": null,
    "objeto": "ejecución de obras civiles de movimiento de suelo, consistentes en:1) Realización de alcantarilla en el bajo natural con cinco tubos de 1 (un) metro de diámetro y tapas premoldeadas.2) Realización de alcantarilla aliviadora con dos tubos de 0,80 (cero con ochenta) metros de diámetro y tapas premoldeadas, frente al predio del Complejo Ambiental sobre camino de acceso este-oeste.3) Rectificación de cunetas lado oeste del camino de acceso norte-sur desde la ruta provincial Nº 280-S hasta el bajo natural. El suelo extraído será acopiado en el predio.4) Conformación y terraplenamiento de camino de acceso norte-sur desde la ruta provincial Nº 280-S hasta predio del proyecto y camino este-oeste ubicado frente al predio. El mismo se eleva hasta cota rasante 95,30. El suelo seleccionado para terraplenar el camino será aportado por el Contratista.5) Rectificación y ampliación de capacidad de drenaje del bajo natural en inmediaciones del camino de acceso norte-sur.6) Construcción de un retardador pluvial de 30.000 m2 de superficie por 0.70 m de profundidad y revancha de 0.30 m, obras de control consistentes en un descargador de fondo circular de 0.40 m de diámetro y vertedero de excedencia. El excedente será acopiado dentro del predio para su uso futuro.7) Provisión, transporte, descarga, distribución y colocación de ripio granítico con granulometría 0-20 mm para ser utilizado en calzadas rurales. El material deberá cumplir con las características físicas y de tamaño definidas en este pliego. Espesor = 0.15m",
    "presupuestoOficial": 270000000,
    "fechaApertura": "2025-09-03T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego de Bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/Pliego-de-bases-y-condiciones.pdf"
      },
      {
        "nombre": "Plano N.º 1",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 2",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-2.pdf"
      },
      {
        "nombre": "Plano N.º 3",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 4",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 5",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 6",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 7",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 8",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Plano N.º 9",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/08/PLANO-1.pdf"
      },
      {
        "nombre": "Enmienda N° 1",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/09/enmienda_ndeg_1_-_licitacion_publica_ndeg_1-2025_girsu.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2024",
    "titulo": "Licitación Pública N° 03/2024 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "03/2024",
    "anio": 2024,
    "decreto": "Decreto N° 3411/2024",
    "objeto": null,
    "presupuestoOficial": 29265600,
    "fechaApertura": "2024-11-06T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/LP_03-2024_pliego_de_bases_y_condiciones_-_2do_llamado.pdf"
      },
      {
        "nombre": "Decreto N° 3411-2024",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3411-2024.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2024",
    "titulo": "Licitación Pública N° 02/2024",
    "procedimiento": "licitacion_publica",
    "numero": "02/2024",
    "anio": 2024,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 19685490,
    "fechaApertura": "2024-03-13T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego, bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/LP_02-2024_pliego_de_bases_y_condiciones_1.pdf"
      },
      {
        "nombre": "Decreto N° 3357-2024",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3357-2024_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2024",
    "titulo": "Licitación Pública N° 01/2024",
    "procedimiento": "licitacion_publica",
    "numero": "01/2024",
    "anio": 2024,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 11735659.89,
    "fechaApertura": "2024-03-07T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego, bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/LP_01-2024_pliego_bases_y_condiciones_-_decreto_3354-2024_1.pdf"
      },
      {
        "nombre": "Decreto N° 3354-2024",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3354-2024.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2023",
    "titulo": "Licitación Pública N° 08/2023",
    "procedimiento": "licitacion_publica",
    "numero": "08/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 4160000,
    "fechaApertura": "2023-12-05T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego bases y condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_general_de_bases_y_condiciones_hormigon_elaborado_1.pdf"
      },
      {
        "nombre": "Decreto N°3301-23.",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3301-23_28nov_1.pdf"
      },
      {
        "nombre": "Pliego de condiciones particulares y especificaciones técnicas.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_condiciones_particulares_y_especificaciones_tecnicas_hormigon_elaborado_28nov.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2023",
    "titulo": "Licitación Pública N° 07/2023 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "07/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2023-11-29T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Segundo llamado – Pliego Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/segundo_llamado_-_pliego_de_bases_y_condiciones_adquisicion_equipamiento_y_bienes_area_industrial.pdf"
      },
      {
        "nombre": "Decreto N°3309-23",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3309-23_segundo_llamado_lic._pca._ndeg_07-23.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2023",
    "titulo": "Licitación Pública N° 06/2023",
    "procedimiento": "licitacion_publica",
    "numero": "06/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2023-07-19T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_-_licitacion_publica_ndeg_06-23.pdf"
      },
      {
        "nombre": "Decreto 3261/23",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3261-23_llamado_lic._pca._ndeg_06-23.pdf"
      },
      {
        "nombre": "Planos",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_iii_-_planos_de_obra_-_lote_2_parque_de_skate.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2023",
    "titulo": "Licitación Pública N° 05/2023 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "05/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2023-11-02T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.1._decreto_ndeg_3094-23_-_pliego_de_bases_y_condiciones_compra_macizo.pdf"
      },
      {
        "nombre": "Decreto 3300-23.",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3300-23_segundo_llamado_lic._pca._compra_hectarea.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2023",
    "titulo": "Licitación Pública N° 03/2023 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "03/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2023-10-10T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_-_lic-pca_06-23_-segundo_llamado.pdf"
      },
      {
        "nombre": "Decreto 3282/23",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3282-23_-_segundo_llamado_licitacion_publica_06-23.pdf"
      },
      {
        "nombre": "Planos",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/planos.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2023",
    "titulo": "Licitación Pública N° 02/2023",
    "procedimiento": "licitacion_publica",
    "numero": "02/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 4000000,
    "fechaApertura": "2023-02-14T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3211/23 – Licitación Pública Adquisición de Cámara",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1._decreto_ndeg_3211-23_-_licitacion_publica_adquisicion_camaras_1.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones Adquisición de Cámara",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2._pliego_de_bases_y_condiciones_adquisicion_camaras_1.pdf"
      },
      {
        "nombre": "Aclaración sin Consulta",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lic_pca_2_2023-_aclaracion_sin_consulta_ndeg_2-1.pdf"
      },
      {
        "nombre": "Aclaración sin Consulta",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/licitacion_pca_2_2023-_aclaracion_sin_consulta_ndeg_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2023",
    "titulo": "Licitación Pública N° 01/2023",
    "procedimiento": "licitacion_publica",
    "numero": "01/2023",
    "anio": 2023,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 2900000,
    "fechaApertura": "2023-02-07T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3210-23 – Licitación pública adquisición máquina demarcación vial",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1._decreto_ndeg_3210-23_-_licitacion_publica_adquisicion_maquina_demarcacion_vial_0.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones adquisición máquina demarcación vial",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2._pliego_de_bases_y_condiciones_adquisicion_maquina_demarcacion_vial.pdf"
      },
      {
        "nombre": "Aclaración sin consulta N° 1-23",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/aclaracion_sin_consulta_ndeg_1-231.pdf"
      },
      {
        "nombre": "Aclaración sin consulta N° 2-23",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/aclaracion_sin_consulta_ndeg_2-23.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2022",
    "titulo": "Licitación Pública N° 08/2022 – Ordenanza 3070/22",
    "procedimiento": "licitacion_publica",
    "numero": "08/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 9931000,
    "fechaApertura": "2022-12-27T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Licitación Pública 8-22 Pliego y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/licitacion_publica_8-22.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2022",
    "titulo": "Licitación Pública N° 07/2022",
    "procedimiento": "licitacion_publica",
    "numero": "07/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 61613157.46,
    "fechaApertura": "2022-10-31T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Ordenanza N° 3055-22",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_3055-22.pdf"
      },
      {
        "nombre": "Pliego Condiciones Generales",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_condiciones_generales.pdf"
      },
      {
        "nombre": "PLIEGO DE ESPECIFICACIONES TÉCNICAS",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_especificaciones_tecnicas-_pavimento_de_hormigon-calle_balbin.pdf"
      },
      {
        "nombre": "Planos",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_ii_planos_cr.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2022",
    "titulo": "Licitación Pública N° 06/2022 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "06/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 47379000,
    "fechaApertura": "2022-10-25T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3178-22 (Rechaza oferta – 2do. llamado)",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3178-22_rechaza_oferta_-_2do._llamado.pdf"
      },
      {
        "nombre": "Pliego general de bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_general_de_bases_y_condiciones_0.pdf"
      },
      {
        "nombre": "Informe Productivo y Social",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.2._plano.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2022",
    "titulo": "Licitación Pública N° 05/2022",
    "procedimiento": "licitacion_publica",
    "numero": "05/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 133727000,
    "fechaApertura": "2022-08-17T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Llamado a Licitación",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3153-22_0.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2._pliego_de_bases_y_condiciones.pdf"
      },
      {
        "nombre": "Anexo 8 Lic Pca 5 2022",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_8_lic_pca_5_2022.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2022",
    "titulo": "Licitación Pública N° 04/2022 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "04/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 8200000,
    "fechaApertura": "2022-07-05T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto 3145-22",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3145-22_declara_desierto_-_segundo_llamado.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones generales",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2._pliego_complemenario_de_bases_y_condiciones.pdf"
      },
      {
        "nombre": "Pliego Complementario",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2._pliego_complemenario_de_bases_y_condiciones_0.pdf"
      },
      {
        "nombre": "Pliego Técnico",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/3._pliego_tecnico.pdf"
      },
      {
        "nombre": "Planilla de Computo y presupuesto",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_ii_-_requisitos_presentacion_computo_y_presupuesto_6.pdf"
      },
      {
        "nombre": "Requisitos presentación Cómputos y Presupuesto",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_ii_-_requisitos_presentacion_computo_y_presupuesto_6_0.pdf"
      },
      {
        "nombre": "Plan de trabajo",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_iii_-_plan_de_trabajo_2.pdf"
      },
      {
        "nombre": "Instrucciones confección Plan de trabajo",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_iv_-_instrucciones_confeccion_plan_de_trabajo_3.pdf"
      },
      {
        "nombre": "Anexo V",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_v_-_identificacion_de_obra_3.pdf"
      },
      {
        "nombre": "Anexo VI",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_vi_-_modelo_formulario_oferta_4.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2022",
    "titulo": "Licitación Pública N° 03/2022 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "03/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 33600000,
    "fechaApertura": "2022-05-24T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Pliego de Bases y Condiciones Generales y Especificaciones Técnicas",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_recambio_caneria_de_cloaca._2o_llamado.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2022",
    "titulo": "Licitación Pública N° 02/2022",
    "procedimiento": "licitacion_publica",
    "numero": "02/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 4800000,
    "fechaApertura": "2022-09-01T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3154-22 (Postergación fecha apertura)",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.decreto_ndeg_3170-22_-_licitacion_publica_adquisicion_ripio_0.pdf"
      },
      {
        "nombre": "Ordenanza N° 3017-2022 y Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.1._pliego_general_de_bases_y_condiciones_0.pdf"
      },
      {
        "nombre": "«Pliego especificaciones técnicas»",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.2._plano_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2022",
    "titulo": "Licitación Pública N° 01/2022",
    "procedimiento": "licitacion_publica",
    "numero": "01/2022",
    "anio": 2022,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 31200000,
    "fechaApertura": "2022-03-23T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3097/22",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1._decreto_ndeg_3097-22_llamado_lic._pca._01-22.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones Generales y Especificaciones Técnicas",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1._pliego_de_bases_y_condiciones_lic._pca._ndeg_01-22.pdf"
      },
      {
        "nombre": "Plano Calles",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_sunchales_2020rural_1-a3.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-09-2021",
    "titulo": "Licitación Pública N° 09/2021",
    "procedimiento": "licitacion_publica",
    "numero": "09/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Decreto N° 3071/21",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_3071_21.pdf"
      },
      {
        "nombre": "Pliego Único de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_licitacion_09_21.pdf"
      },
      {
        "nombre": "Circular Sin Consulta N°1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_sin_consulta_ndeg_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2021",
    "titulo": "Licitación Pública N° 08/2021 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "08/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": 98301976.64,
    "fechaApertura": "2022-01-26T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Decreto N° 3090/22",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3090-22.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones Generales y Especificaciones Técnicas",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_generales_y_especificaciones_tecnicas_1.pdf"
      },
      {
        "nombre": "Anexo Planos – Red Cloacales Barriales – Etapa 1",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/10.2._anexo_planos-_redes_cloacales_barriales_etapa_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2021",
    "titulo": "Licitación Pública N° 07/2021",
    "procedimiento": "licitacion_publica",
    "numero": "07/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2022-01-28T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "(i) Ordenanza N° 2988/22 con Pliego de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2988-2022_con_pliego_de_bases_y_condiciones.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2021",
    "titulo": "Licitación Pública N° 05/2021",
    "procedimiento": "licitacion_publica",
    "numero": "05/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 3043/21",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3043-2021_llamado_licitacion_publica_pavimento_altos_de_la_villa_2deg_sub_etapa.pdf"
      },
      {
        "nombre": "(ii) Pliego de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones.pdf"
      },
      {
        "nombre": "(iii) Circular sin consulta N° 1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_sin_consulta_ndeg_1_-_modificacion_equipamiento_a_proveer_por_contratista.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2021",
    "titulo": "Licitación Pública N° 04/2021",
    "procedimiento": "licitacion_publica",
    "numero": "04/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Ordenanza N° 2927/21",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2927-2021_y_pliego_de_bases_y_condiciones_lic._pca._ndeg_04-21.pdf"
      },
      {
        "nombre": "(ii) Pliego de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2021",
    "titulo": "Licitación Pública N° 03/2021",
    "procedimiento": "licitacion_publica",
    "numero": "03/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Ordenanza N° 2908/21.",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2908-2021_desmonte_alteo_y_conformacion_caminos_rurales.pdf"
      },
      {
        "nombre": "(ii) Pliego General de Bases y Condiciones.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_general_de_bases_y_condiciones.pdf"
      },
      {
        "nombre": "(iii) Pliego Especificaciones Técnicas.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_especificaciones_tecnicas.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2021",
    "titulo": "Licitación Pública N° 02/2021",
    "procedimiento": "licitacion_publica",
    "numero": "02/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 3028/21.",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_3028-20_llamado_lic._pca._ndeg_04-20_pavimentacion_sector_1_2_3_y_calle_mitre_0.pdf"
      },
      {
        "nombre": "(ii) Pliego General de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones-lic._pca._ndeg_02-2021_pavimento_asfalto_sectores_1_2_3_y_calle_mitre_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2021",
    "titulo": "Licitación Pública N° 01/2021",
    "procedimiento": "licitacion_publica",
    "numero": "01/2021",
    "anio": 2021,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": "2021-04-05T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Digesto",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/digesto.4170.o_2900_2021_con_anexo.pdf"
      },
      {
        "nombre": "Licitación Final",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/licitacion_final.pdf"
      },
      {
        "nombre": "Planilla Rubros",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/planilla_rubros.pdf"
      },
      {
        "nombre": "Red agua potable",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ra_01_red_agua_potable.pdf"
      },
      {
        "nombre": "Vinculación agua potable",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ra_02_vinculacion_agua_potable.pdf"
      },
      {
        "nombre": "Plano 1",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no1_cloacas._traza_y_br.pdf"
      },
      {
        "nombre": "Plano 2",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no2_cloacas._niveles.pdf"
      },
      {
        "nombre": "Plano 3",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no3._cloacas._o_y_pendientes.pdf"
      },
      {
        "nombre": "Plano 4",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no4_cloacas._detalles.pdf"
      },
      {
        "nombre": "Reglamento extensión de redes",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/epe._reglamento_de_extension_de_redes.pdf"
      },
      {
        "nombre": "Red baja tensión",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/re_01_red_baja_tension.pdf"
      },
      {
        "nombre": "Red media tensión",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/re_02_red_media_tension.pdf"
      },
      {
        "nombre": "Factibilidad Empresa Provincial de energia",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/0_factibilidad_2020_empresa_provincial_de_energia.pdf"
      },
      {
        "nombre": "Plano 1",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no1._ubicacion.pdf"
      },
      {
        "nombre": "Plano 2",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no2_topografia.pdf"
      },
      {
        "nombre": "Plano 3",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no3._niveles_tn.pdf"
      },
      {
        "nombre": "Plano 3",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_no16_detalle_cordon_cuneta.pdf"
      },
      {
        "nombre": "Nota aclaratoria 1",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/nota_aclaratoria_1.pdf"
      },
      {
        "nombre": "Nota aclaratoria 2",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/nota_aclaratoria_2.pdf"
      },
      {
        "nombre": "Nota aclaratoria 3",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/nota_aclaratoria_3.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2020",
    "titulo": "Licitación Pública N° 03/2020",
    "procedimiento": "licitacion_publica",
    "numero": "03/2020",
    "anio": 2020,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 2992/20",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2992-20_lic._pca._03-2020_adquisicion_200m3_hormigon_0.pdf"
      },
      {
        "nombre": "(ii) Pliego General de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_general_de_bases_y_condiciones_hormigon_elaborado_0.pdf"
      },
      {
        "nombre": "(iii) Pliego de Condiciones Particulares",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_condiciones_particulares_y_especificaciones_tecnicas_hormigon_elaborado.pdf"
      },
      {
        "nombre": "(iv) Aclaración sin consulta N° 1",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/aclaracion_sin_consulta_ndeg_1_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2020",
    "titulo": "Licitación Pública N° 02/2020",
    "procedimiento": "licitacion_publica",
    "numero": "02/2020",
    "anio": 2020,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Ordenanza N° 2866/20.",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2866-2020_0.pdf"
      },
      {
        "nombre": "(ii) Pliego General de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_2.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2020",
    "titulo": "Licitación Pública N° 01/2020",
    "procedimiento": "licitacion_publica",
    "numero": "01/2020",
    "anio": 2020,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Ordenanza N° 2840/20 (ii) Pliego de Bases y Condiciones (iii) Anexos",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2840-2020_lic._pca._examenes_psicofisicos.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-10-2019",
    "titulo": "Licitación Pública N° 10/2019 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "10/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "DECRETO 2.901/20",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2904-20_segundo_llamado_licitacion_publica.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones Generales",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_generales_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-09-2019",
    "titulo": "Licitación Pública N° 09/2019",
    "procedimiento": "licitacion_publica",
    "numero": "09/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(ii) Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_de_condiciones_0.pdf"
      },
      {
        "nombre": "(iii) Anexos",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo.pdf"
      },
      {
        "nombre": "Plano 1",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina_1_pavimento_altos_de_la_villa.pdf"
      },
      {
        "nombre": "Plano 2",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina_2_pavimento_altos_de_la_villa.pdf"
      },
      {
        "nombre": "Corte transversal",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/corte_transversal.pdf"
      },
      {
        "nombre": "Planilla sectores 1-3",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/planilla_sectores_1-3_pavimento_altos_de_la_villa.pdf"
      },
      {
        "nombre": "Circular sin consulta N° 1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_1.pdf"
      },
      {
        "nombre": "Circular sin consulta N° 2",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_2.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2019",
    "titulo": "Licitación Pública N° 08/2019",
    "procedimiento": "licitacion_publica",
    "numero": "08/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Ordenanza Nº 2805/ 2019",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_licitacion_publica_ndeg_2805-2019_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2019",
    "titulo": "Licitación Pública N° 07/2019",
    "procedimiento": "licitacion_publica",
    "numero": "07/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Decreto 2.810/19",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2810-19_-_llamado_licitacion_publica_adquisicion_arena.pdf"
      },
      {
        "nombre": "Pliego general de bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_general_de_bases_y_condiciones_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2019",
    "titulo": "Licitación Pública N° 06/2019 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "06/2019",
    "anio": 2019,
    "decreto": "Decreto N° 2851/2019",
    "objeto": null,
    "presupuestoOficial": 1052160,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_de_bases_y_condiciones_-_anexos_2.pdf"
      },
      {
        "nombre": "Decreto N° 2851/2019",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2851-19_declara_desierta_y_segundo_llamado_licitacion_publica.pdf"
      },
      {
        "nombre": "Circular sin consulta N° 1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/img114_1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2019",
    "titulo": "Licitación Pública N° 05/2019 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "05/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": "venta de un (1) lote municipal baldío ubicado frente a calle Mario Vecchioli, entre las de J. V. Gonzalez y calle pública sin nombre, identificado como lote Nro. 29 en el Plano de Mensura N° 204.016; de la Manzana N° 6; conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Pliego de bases y condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_6.pdf"
      },
      {
        "nombre": "Decreto 2.811/19",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2811-19_declara_desierta_y_segundo_llamado_licitacion_publica_venta_1_terreno.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2019",
    "titulo": "Licitación Pública N° 04/2019",
    "procedimiento": "licitacion_publica",
    "numero": "04/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 2780/19",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2780-19.pdf"
      },
      {
        "nombre": "Condiciones generales",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/01_pliego_condiciones_generales.pdf"
      },
      {
        "nombre": "Especificaciones técnicas y particulares",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/03_pliego_especificaciones_tecnicas_generales_y_particulares.pdf"
      },
      {
        "nombre": "1",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina1.pdf"
      },
      {
        "nombre": "2",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina2.pdf"
      },
      {
        "nombre": "3",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina3.pdf"
      },
      {
        "nombre": "4",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina4.pdf"
      },
      {
        "nombre": "5",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina5.pdf"
      },
      {
        "nombre": "6",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina6.pdf"
      },
      {
        "nombre": "7",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina7.pdf"
      },
      {
        "nombre": "8",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina8.pdf"
      },
      {
        "nombre": "9",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina9.pdf"
      },
      {
        "nombre": "10",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina10.pdf"
      },
      {
        "nombre": "11",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina11.pdf"
      },
      {
        "nombre": "12",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina12.pdf"
      },
      {
        "nombre": "13",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina13.pdf"
      },
      {
        "nombre": "14",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/lamina14.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2019",
    "titulo": "Licitación Pública N° 03/2019",
    "procedimiento": "licitacion_publica",
    "numero": "03/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 2779/19",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2779-19_-_licitacion_publica_primera_etapa_-_centro_civico_0.pdf"
      },
      {
        "nombre": "Generales",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_generales_0.pdf"
      },
      {
        "nombre": "Complementarios",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_complemenario_de_bases_y_condiciones_3.pdf"
      },
      {
        "nombre": "Técnicas",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_condiciones_tecnicas_modificado.pdf"
      },
      {
        "nombre": "I – Planilla de cotización",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_i_-_planilla_de_cotizacion.pdf"
      },
      {
        "nombre": "III – Plan de Trabajo",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_iii_-_plan_de_trabajo.pdf"
      },
      {
        "nombre": "IV – Instrucciones confección plan de trabajo",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_iv_-_instrucciones_confeccion_plan_de_trabajo_0.pdf"
      },
      {
        "nombre": "V – Identificación de obra",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_v_-_identificacion_de_obra_0.pdf"
      },
      {
        "nombre": "VI – Modelo formulario oferta",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_vi_-_modelo_formulario_oferta_0.pdf"
      },
      {
        "nombre": "I",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/centro_civico-ejecutivo_det.nucleo_estructura_01.pdf"
      },
      {
        "nombre": "II",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/centro_civico-ejecutivo_det.nucleo_plantas_sector_01.pdf"
      },
      {
        "nombre": "III",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/centro_civico-ejecutivo_det.nucleo_plantas_sector_02.pdf"
      },
      {
        "nombre": "IV",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/centro_civico-ejecutivo_det.nucleo_premarcos_01_5.pdf"
      },
      {
        "nombre": "V",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_v_-_identificacion_de_obra_0_0.pdf"
      },
      {
        "nombre": "VI",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexo_vi_-_modelo_formulario_oferta_0_0.pdf"
      },
      {
        "nombre": "VII",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/centro_civico-ejecutivo_det.nucleo_vistas_cortes_03.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2019",
    "titulo": "Licitación Pública N° 02/2019",
    "procedimiento": "licitacion_publica",
    "numero": "02/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "(i) Decreto N° 2771/19.",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2771-19_sector_situacion_urgencia_ordenanza_2764-19.pdf"
      },
      {
        "nombre": "(ii) Pliego Único de Condiciones con anexos.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_de_condiciones_-_sector_situacion_urgencia_ordenanza_2764-19.pdf"
      },
      {
        "nombre": "(iii) Planilla de medidas, plano de calles y perfil de asfalto.",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/planilla_sector_situacion_urgencia_ordenanza_2754-19_reconstruccion_pavimento_urbano.pdf"
      },
      {
        "nombre": "Plano sector situación urgencia",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_sector_situacion_urgencia_ordenanza_2754-19_reconstruccion_pavimento_urbano.pdf"
      },
      {
        "nombre": "Perfil asfalto",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/perfil_asfalto_-_sector_situacion_urgencia_ordenanza_2754-19.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2019",
    "titulo": "Licitación Pública N° 01/2019 – Consorcio GIRSU del Area Metropolitana Sunchales",
    "procedimiento": "licitacion_publica",
    "numero": "01/2019",
    "anio": 2019,
    "decreto": null,
    "objeto": "Adquisición y montaje de una (1) planta de clasificación de residuos capacidad de procesamiento cinco (5) toneladas hora.",
    "presupuestoOficial": 12000000,
    "fechaApertura": "2019-05-29T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "(i) Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/111_0.pdf"
      },
      {
        "nombre": "Aclaración (con consulta) N° 1",
        "tipo": "enmienda",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/girsu.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2018",
    "titulo": "Licitación Pública N° 08/2018",
    "procedimiento": "licitacion_publica",
    "numero": "08/2018",
    "anio": 2018,
    "decreto": null,
    "objeto": "venta de tres (3) lotes municipales baldíos ubicados frente a calle Mario Vecchioli, entre las de Bolivar y Pasteur, identificados como lotes Nros. 39, 40 y 41 en el Plano de Mensura N° 203637; todos ellos de la Manzana N° 3; conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": "2019-02-05T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Ordenanza N° 2762/19",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2762-2019.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_2_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2018",
    "titulo": "Licitación Pública N° 07/2018",
    "procedimiento": "licitacion_publica",
    "numero": "07/2018",
    "anio": 2018,
    "decreto": "Decreto N° 2731/2018",
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Decreto N°2731/2018",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2731-18_licitacion_publica_cordon_cuneta_y_entubado_altos_de_la_villa_1deg_etapa.pdf"
      },
      {
        "nombre": "Circular N°1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_ndeg_1_con_consulta.pdf"
      },
      {
        "nombre": "Pliego de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_-_cordon_cuneta_y_entubado-_altos_de_la_villa.pdf"
      },
      {
        "nombre": "Pliego Técnico",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliegotecnico_cordon_cuneta_y_badenes_altos_de_la_villa.pdf"
      },
      {
        "nombre": "Hoja 1 Sector",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_1_sector.pdf"
      },
      {
        "nombre": "Hoja 2 Anteproyecto",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_2_anteproyecto.pdf"
      },
      {
        "nombre": "Hoja 3 Corte transversal",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_3_corte_transversal.pdf"
      },
      {
        "nombre": "Hoja 4 Detalle",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_4_detalle_de_boca_de_tormenta.pdf"
      },
      {
        "nombre": "Hoja 5",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_5.pdf"
      },
      {
        "nombre": "Hoja 6",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_6.pdf"
      },
      {
        "nombre": "Hoja 7",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_7.pdf"
      },
      {
        "nombre": "Hoja 8",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_8.pdf"
      },
      {
        "nombre": "Hoja 9",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_9_0.pdf"
      },
      {
        "nombre": "Hoja 10",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_10_0.pdf"
      },
      {
        "nombre": "Hoja 11",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/hoja_11_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2018",
    "titulo": "Licitación Pública N° 06/2018",
    "procedimiento": "licitacion_publica",
    "numero": "06/2018",
    "anio": 2018,
    "decreto": null,
    "objeto": "Contratación del servicio de gestión y cobro extrajudicial de las deudas generadas por el Impuesto Provincial de Patente Única sobre Vehículos en la Municipalidad de Sunchales.",
    "presupuestoOficial": null,
    "fechaApertura": "2018-10-15T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Ordenanza N°2738/2018",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2738-2018_llamado_licitacion_publica_ndeg_06-2018.pdf"
      },
      {
        "nombre": "Pliego Único de Bases y Condiciones",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_de_bases_y_condiciones_-_gestion_y_cobro_extrajudicial_patentes.pdf"
      },
      {
        "nombre": "Circular sin consulta N° 1 – Nueva fecha presentación de ofertas y apertura",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_sin_consulta_ndeg_1_-_nueva_fecha_presentacion_de_ofertas_y_apertura.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2018",
    "titulo": "Licitación Pública N° 05/2018",
    "procedimiento": "licitacion_publica",
    "numero": "05/2018",
    "anio": 2018,
    "decreto": null,
    "objeto": "contratación de la provisión, distribución, compactación, alisado y terminación de cinco mil ciento setenta y ocho con sesenta metros cuadrados (5.178,60 m2) de carpeta asfáltica en caliente con un espesor de 5 cm.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Ordenanza N° 2729/18.",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_ndeg_2729-18_llamado_licitacion_publica.pdf"
      },
      {
        "nombre": "Pliego Unico de Bases y Condiciones – Anexos.",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_de_bases_y_condiciones_-_anexos.pdf"
      },
      {
        "nombre": "Detalle Pórtico",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/detalle_portico.pdf"
      },
      {
        "nombre": "Perfil Transversal Calle",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/perfil_transversal_calle.pdf"
      },
      {
        "nombre": "Plano Calles a Intervenir",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_calles_a_intervenir.pdf"
      },
      {
        "nombre": "Plano Sector",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_sectores1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2018",
    "titulo": "Licitación Pública N° 04/2018",
    "procedimiento": "licitacion_publica",
    "numero": "04/2018",
    "anio": 2018,
    "decreto": "Decreto N° 2712/2018",
    "objeto": "ejecución de la obra pública «Revitalización y puesta en valor Avda. Independencia – cambio de veredas, pavimento articulado, iluminación», conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal. 26 de junio de 2018, a las 10:30 hs.,",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Circular (sin consulta) N° 1",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_sin_consulta_ndeg1.pdf"
      },
      {
        "nombre": "Decreto N°2712/2018",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_ndeg_2712-18_-_licitacion_publica_avda._independencia.pdf"
      },
      {
        "nombre": "PLIEGO ÚNICO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_bases_y_condiciones_2.pdf"
      },
      {
        "nombre": "PLIEGO COMPLEMENTARIO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_complementario_de_bases_y_condiciones_0.pdf"
      },
      {
        "nombre": "PLIEGO DE ESPECIFICACIONES TÉCNICAS",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_tecnico.pdf"
      },
      {
        "nombre": "ANEXOS Y DECLARACIONES JURADAS",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexos_y_declaraciones_juradas_0.pdf"
      },
      {
        "nombre": "PLANO I",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_1.pdf"
      },
      {
        "nombre": "II",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_2.pdf"
      },
      {
        "nombre": "avenida_independencia-plano_3.pdf",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/sites/default/files/avenida_independencia-plano_3.pdf"
      },
      {
        "nombre": "III",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_3.pdf"
      },
      {
        "nombre": "IV",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_4_0.pdf"
      },
      {
        "nombre": "V",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_5.pdf"
      },
      {
        "nombre": "VI",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_6.pdf"
      },
      {
        "nombre": "VII",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_7.pdf"
      },
      {
        "nombre": "VIII",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_8.pdf"
      },
      {
        "nombre": "IX",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_9.pdf"
      },
      {
        "nombre": "X",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_10.pdf"
      },
      {
        "nombre": "XI",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_11.pdf"
      },
      {
        "nombre": "XII",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/avenida_independencia-plano_12.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2018",
    "titulo": "Licitación Pública N° 03/2018",
    "procedimiento": "licitacion_publica",
    "numero": "03/2018",
    "anio": 2018,
    "decreto": null,
    "objeto": "ejecución de la obra pública «Electrificación – Área de Servicios», conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": "2018-06-08T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "Ordenanza N° 2709/2018",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/ordenanza_licitacion_publica_electrificacion_area_servicios_0.pdf"
      },
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_unico_bases_y_condiciones_1.pdf"
      },
      {
        "nombre": "PLIEGO COMPLEMENTARIO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_complemenario_de_bases_y_condiciones_1.pdf"
      },
      {
        "nombre": "PLIEGO DE ESPECIFICACIONES TÉCNICOS",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_especificaciones_tecnicas_0.pdf"
      },
      {
        "nombre": "ANEXOS Y DECLARACIONES JURADAS",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/anexos_y_declaraciones_juradas.pdf"
      },
      {
        "nombre": "I",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2.1.pdf"
      },
      {
        "nombre": "II",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/2.2.pdf"
      },
      {
        "nombre": "ANEXO",
        "tipo": "anexo",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/1.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2018",
    "titulo": "Licitación Pública N° 01/2018 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "01/2018",
    "anio": 2018,
    "decreto": "Decreto N° 2726/2018",
    "objeto": "pavimentación, cordón cuneta, acequia de mampostería, cerco perimetral, electrificación y forestación – Área Municipal de Promoción Industrial.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "Decreto N°2726/2018",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2726-18_-_prorroga_segundo_llamado_licitacion.pdf"
      },
      {
        "nombre": "Circular N°1 – Prórroga llamado a licitación",
        "tipo": "circular",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/circular_sin_consulta_ndeg_1_prorroga.pdf"
      },
      {
        "nombre": "DECRETO 2.709/18",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2709-18.pdf"
      },
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_0_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-10-2017",
    "titulo": "Licitación Pública N° 10/2017",
    "procedimiento": "licitacion_publica",
    "numero": "10/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2017",
    "titulo": "Licitación Pública N° 08/2017",
    "procedimiento": "licitacion_publica",
    "numero": "08/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": "licitación, adjudicación, contratación y ejecución de la Obra Edificio Lazos – Parque de los Encuentros (ciudad de Sunchales, departamento Castellanos).",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "PLIEGO COMPLEMENTARIO",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_complemenario_de_bases_y_condiciones_1_0.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2017",
    "titulo": "Licitación Pública N° 07/2017",
    "procedimiento": "licitacion_publica",
    "numero": "07/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": "Ejecución de: (i) Dos mil quinientos quince con treinta y seis metros cuadrados ( 2.515,36 m2) de pavimento de hormigón de resistencia característica mínima igual a 300 kg/cm², sin armar, de 0,18 mts. de espesor; (ii) 120,00 mts. lineales de desagüe de hormigón y mampostería y; (iii) La reparación de 339, 93 mts. lineales de cerco perimetral existente (en el lateral adyacente a la ruta N°34) y la realización de 254,70 mts. lineales de cerco perimetral nuevo; conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": "2017-07-17T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "PLIEGO ÚNICO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/sites/default/files/pliego_condiciones_generales_pav.pdf"
      },
      {
        "nombre": "FORMULARIO DE OFERTA",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/formulario_de_oferta_anr.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2017",
    "titulo": "Licitación Pública N° 06/2017",
    "procedimiento": "licitacion_publica",
    "numero": "06/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": "Contratar los materiales y los trabajos de distribución, compactado, alisado y terminación de 7.566,00 metros cuadrados de pavimento asfáltico en caliente correspondiente a la Obra “Plan de Pavimentación de 152 cuadras».",
    "presupuestoOficial": null,
    "fechaApertura": "2017-07-26T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "PLIEGO ÚNICO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego.pdf"
      },
      {
        "nombre": "FORMULARIO DE OFERTA",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/planilla_de_oferta.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2017",
    "titulo": "Licitación Pública N° 05/2017",
    "procedimiento": "licitacion_publica",
    "numero": "05/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_7.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2017",
    "titulo": "Licitación Pública N° 04/2017",
    "procedimiento": "licitacion_publica",
    "numero": "04/2017",
    "anio": 2017,
    "decreto": null,
    "objeto": "contratación de los servicios para el desarrollo y puesta en marcha del Estacionamiento Medido y Pago en calles del sector centro de Sunchales, conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": "2017-06-26T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/digesto.3576.o_2655_2017_con_anexos.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-08-2016",
    "titulo": "Licitación Pública N° 08/2016",
    "procedimiento": "licitacion_publica",
    "numero": "08/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "contratación del servicio de conectividad para el sistema de monitoreo urbano.",
    "presupuestoOficial": null,
    "fechaApertura": "2016-01-17T00:00:00.000Z",
    "documentos": [],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-07-2016",
    "titulo": "Licitación Pública N° 07/2016",
    "procedimiento": "licitacion_publica",
    "numero": "07/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "adquisición de hasta seiscientos metros cúbicos (600 m3) de hormigón elaborado, H-21, resistencia 210 Kg./cm2 a 28 días, asentamiento de 3 a 5 cm., para obra de pavimentación;.",
    "presupuestoOficial": null,
    "fechaApertura": "2016-12-13T00:00:00.000Z",
    "documentos": [
      {
        "nombre": "DOCUMENTO",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_condiciones_particulares_y_especificaciones_tecnicas.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-06-2016",
    "titulo": "Licitación Pública N° 06/2016 – Segundo llamado",
    "procedimiento": "licitacion_publica",
    "numero": "06/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "adquisición de terrenos destinado a la construcción de viviendas y/o venta de lotes.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "DOCUMENTO",
        "tipo": "decreto",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/decreto_2526-16_segundo_llamado_licitacion_publica_compra_hectarea.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-05-2016",
    "titulo": "Licitación Pública N° 05/2016",
    "procedimiento": "licitacion_publica",
    "numero": "05/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "adquisición de (i) Veinte (20) cámaras de seguridad fijas 1080p, conforme características técnicas Item 1 de la Sección V – A del Pliego de Bases y Condiciones; (ii) Cuatro (4) cámaras de seguridad fijas 1080p video analítico, conforme características técnicas Item 2 de la Sección V – A del Pliego de Bases y Condiciones; y (iii) Siete (7) cámaras de seguridad domos, conforme características técnicas Item 3 de la Sección V – A del Pliego de Bases y Condiciones, el cual se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "DOCUMENTO",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/licitacion_camaras.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-04-2016",
    "titulo": "Licitación Pública N° 04/2016",
    "procedimiento": "licitacion_publica",
    "numero": "04/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "contratación de la provisión de mano de obra, materiales y equipos necesarios para la ejecución de un mil ochocientos catorce metros lineales (1.814 ml) de cordón cuneta, los cuales incluyen catorce (14) curvas y seis (6) badenes, conforme al pliego de bases y condiciones que se encuentra a disposición en la sede de la administración municipal.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "DOCUMENTO",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/sllp251216.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-03-2016",
    "titulo": "Licitación Pública N° 03/2016",
    "procedimiento": "licitacion_publica",
    "numero": "03/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-02-2016",
    "titulo": "Licitación Pública N° 02/2016",
    "procedimiento": "licitacion_publica",
    "numero": "02/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": "compra de maquinarias y vehículos.",
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [
      {
        "nombre": "DOCUMENTO",
        "tipo": "otro",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/edicto_boletin_oficial.pdf"
      },
      {
        "nombre": "PLIEGO DE BASES Y CONDICIONES",
        "tipo": "pliego",
        "url": "https://sunchales.gob.ar/wp-content/uploads/2025/06/pliego_de_bases_y_condiciones_adquisicion_equipamiento_y_automotores.pdf"
      }
    ],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  },
  {
    "id": "lp-01-2016",
    "titulo": "Licitación Pública N° 01/2016",
    "procedimiento": "licitacion_publica",
    "numero": "01/2016",
    "anio": 2016,
    "decreto": null,
    "objeto": null,
    "presupuestoOficial": null,
    "fechaApertura": null,
    "documentos": [],
    "fuenteUrl": "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/"
  }
];

export const licitacionesMeta = {
  fuenteUrl: "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/",
  sincronizadoEl: "2026-05-18T12:23:48.081Z",
  total: 64,
  porAnio: {
  "2016": 8,
  "2017": 6,
  "2018": 7,
  "2019": 10,
  "2020": 3,
  "2021": 8,
  "2022": 8,
  "2023": 7,
  "2024": 3,
  "2025": 4
},
  porProcedimiento: {
  "licitacion_publica": 64
},
} as const;
