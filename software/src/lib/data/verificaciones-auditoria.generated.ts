// AUTO-GENERADO por scripts/verificar-brechas-auditoria.mjs
// NO EDITAR A MANO. Para regenerar: npm run verificar-brechas-auditoria
//
// Tres verificaciones automatizadas sobre URLs oficiales marcadas por la
// auditoría manual del 2026-05-12 como "a verificar":
//   1) Concejo: ¿la página de concejales actuales refleja la jura del 03-mar-2026?
//   2) Boletín Oficial: ¿cuál es el último mes publicado en las 3 plataformas?
//   3) Farmacias de turno: ¿hay cronograma para el mes en curso?
//
// Última sincronización: 2026-05-15T11:19:15.268Z
//
// Política de honestidad: si una verificación no puede determinar el estado
// con evidencia textual del HTML servido, el resultado es "indeterminado"
// (no "ok"). Se prefiere honestidad informativa a falsa precisión.

export type ResultadoVerificacion =
  | "ok"
  | "alerta"
  | "desactualizado"
  | "indeterminado"
  | "error";

export type VerificacionAuditoria = {
  /** Identificador estable de la verificación. */
  id: string;
  /** ID de la brecha del dataset `brechas` con la que se correlaciona. */
  brechaIdRelacionada?: string;
  /** URL(s) verificada(s). Para verificación multi-URL, separadas por " | ". */
  url: string;
  /** Código HTTP del primer fetch (0 si timeout/red). */
  estadoHttp: number;
  /** Fecha-hora ISO de la verificación. */
  fechaVerificacion: string;
  /** Veredicto categórico. */
  resultado: ResultadoVerificacion;
  /** Hallazgos textuales concretos, sin parafraseo. */
  hallazgos: string[];
  /** Metadata estructurada adicional (composición detectada, plataformas, etc.). */
  meta: Record<string, unknown>;
};

export const verificacionesAuditoria: VerificacionAuditoria[] = [
  {
    "id": "concejales-actuales",
    "brechaIdRelacionada": "con-cv-concejales-incompletos",
    "url": "https://concejosunchales.gob.ar/concejales-actuales.aspx",
    "estadoHttp": 200,
    "fechaVerificacion": "2026-05-15T11:19:06.568Z",
    "resultado": "ok",
    "hallazgos": [
      "6 de 6 apellidos vigentes detectados en el HTML: Delmastro, Nicolau, Cattaneo, Astor, Torriri, Balduino.",
      "0 de 3 apellidos cesados todavía aparecen en el HTML: ninguno.",
      "Los 6 apellidos vigentes aparecen y ningún cesado figura: composición consistente con jura 03-mar-2026."
    ],
    "meta": {
      "concejalesVigentesDetectados": [
        "Delmastro",
        "Nicolau",
        "Cattaneo",
        "Astor",
        "Torriri",
        "Balduino"
      ],
      "concejalesCesadosDetectados": []
    }
  },
  {
    "id": "boletin-oficial",
    "brechaIdRelacionada": "pre-boletin-oficial-municipal",
    "url": "https://sunchales.gob.ar/boletines-oficiales | https://sunchales.miportal.ar/digesto | https://boletinoficial.sunchales.gob.ar/",
    "estadoHttp": 200,
    "fechaVerificacion": "2026-05-15T11:19:12.504Z",
    "resultado": "desactualizado",
    "hallazgos": [
      "[drupal-legacy] Último mes/año mencionado en HTML: abril de 2025. (HTTP 200)",
      "[miportal] No se encontró ningún par (mes, año) parseable en el HTML. (HTTP 200)",
      "[subdominio] HTTP 0 fetch failed (HTTP 0)",
      "Más reciente entre plataformas: abril de 2025 (drupal-legacy). Distancia al mes en curso: 13 meses."
    ],
    "meta": {
      "plataformas": [
        {
          "plataforma": "drupal-legacy",
          "url": "https://sunchales.gob.ar/boletines-oficiales",
          "estadoHttp": 200,
          "estado": "ok",
          "razon": "Último mes/año mencionado en HTML: abril de 2025.",
          "ultimoMesAnio": {
            "mes": 4,
            "anio": 2025
          }
        },
        {
          "plataforma": "miportal",
          "url": "https://sunchales.miportal.ar/digesto",
          "estadoHttp": 200,
          "estado": "indeterminado",
          "razon": "No se encontró ningún par (mes, año) parseable en el HTML.",
          "ultimoMesAnio": null
        },
        {
          "plataforma": "subdominio",
          "url": "https://boletinoficial.sunchales.gob.ar/",
          "estadoHttp": 0,
          "estado": "error",
          "razon": "HTTP 0 fetch failed",
          "ultimoMesAnio": null
        }
      ],
      "masReciente": {
        "mes": 4,
        "anio": 2025,
        "plataforma": "drupal-legacy"
      }
    }
  },
  {
    "id": "farmacias-turno",
    "brechaIdRelacionada": "sal-farmacias-turno-desactualizado",
    "url": "https://sunchales.gob.ar/farmacias-de-turno/",
    "estadoHttp": 200,
    "fechaVerificacion": "2026-05-15T11:19:15.267Z",
    "resultado": "desactualizado",
    "hallazgos": [
      "Meses mencionados en la página: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, setiembre, octubre, noviembre.",
      "Cronograma más reciente identificable por filename de imagen subida: abril de 2026.",
      "El cronograma más reciente publicado está 1 mes(es) por detrás del mes en curso."
    ],
    "meta": {
      "mesActual": {
        "anio": 2026,
        "mes": 5
      },
      "cronogramaMasReciente": {
        "anio": 2026,
        "mes": 4
      },
      "mesesDetectadosEnPagina": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    }
  }
];

export const verificacionesAuditoriaMeta = {
  sincronizadoEl: "2026-05-15T11:19:15.268Z",
  total: 3,
  resultadosPorTipo: {
    ok: 1,
    desactualizado: 2,
    indeterminado: 0,
    error: 0,
  },
} as const;

/** Búsqueda por id de la verificación correlacionada a una brecha. */
export function verificacionPorBrechaId(
  brechaId: string
): VerificacionAuditoria | undefined {
  return verificacionesAuditoria.find(
    (v) => v.brechaIdRelacionada === brechaId
  );
}
