/**
 * Especificación OpenAPI 3.0 de la API pública.
 * Servida en JSON; herramientas como Swagger UI o Redoc pueden consumirla.
 */
const spec = {
  openapi: "3.0.3",
  info: {
    title: "Sunchales Transparente — API Pública",
    version: "0.1.0",
    description:
      "API REST de datos del Portal de Transparencia Municipal de Sunchales. " +
      "Todos los recursos retornan JSON por defecto y CSV con `?format=csv`. " +
      "Licencia de los datos: CC-BY-4.0.",
    contact: { name: "Proyecto Sunchales Transparente" },
    license: { name: "CC-BY-4.0", url: "https://creativecommons.org/licenses/by/4.0/" }
  },
  servers: [{ url: "/", description: "Servidor actual" }],
  paths: {
    "/api/v1/presupuesto": {
      get: {
        summary: "Listar partidas presupuestarias",
        parameters: [
          {
            name: "format",
            in: "query",
            schema: { type: "string", enum: ["json", "csv"], default: "json" }
          },
          { name: "finalidad", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": {
            description: "Listado de partidas",
            content: { "application/json": { schema: { $ref: "#/components/schemas/PresupuestoResponse" } } }
          }
        }
      }
    },
    "/api/v1/personal": {
      get: {
        summary: "Listar personal municipal (planta política)",
        parameters: [
          {
            name: "format",
            in: "query",
            schema: { type: "string", enum: ["json", "csv"], default: "json" }
          },
          { name: "area", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": {
            description: "Listado de empleados",
            content: { "application/json": { schema: { $ref: "#/components/schemas/PersonalResponse" } } }
          }
        }
      }
    },
    "/api/v1/datasets": {
      get: {
        summary: "Catálogo de datasets y fuentes citadas",
        responses: {
          "200": {
            description: "Catálogo + fuentes",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/recaudacion": {
      get: {
        summary: "Cálculo de Recursos: tributos locales, coparticipación y recursos de capital",
        parameters: [
          {
            name: "format",
            in: "query",
            schema: { type: "string", enum: ["json", "csv"], default: "json" }
          },
          {
            name: "categoria",
            in: "query",
            schema: {
              type: "string",
              enum: [
                "tributarios_propios",
                "no_tributarios_propios",
                "coparticipacion_provincial",
                "coparticipacion_nacional",
                "recursos_capital"
              ]
            }
          }
        ],
        responses: {
          "200": {
            description: "Recursos clasificados con KPIs de autonomía fiscal y dependencia de coparticipación",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/licitaciones": {
      get: {
        summary: "Listar licitaciones oficiales sincronizadas con sunchales.gob.ar",
        description:
          "Listado real publicado por la Municipalidad. Cada registro incluye número, decreto de llamado, objeto, presupuesto oficial, fecha de apertura y links a pliegos/decretos. Los oferentes y la adjudicación NO se publican por el municipio (brecha contr-adjudicaciones).",
        parameters: [
          { name: "format", in: "query", schema: { type: "string", enum: ["json", "csv"], default: "json" } },
          { name: "anio", in: "query", schema: { type: "integer" } },
          { name: "procedimiento", in: "query", schema: { type: "string", enum: ["licitacion_publica", "licitacion_privada", "concurso_precios", "contratacion_directa", "otro"] } }
        ],
        responses: {
          "200": {
            description: "Listado de licitaciones reales con metadatos.",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/remuneraciones": {
      get: {
        summary: "Listar PDFs oficiales de remuneraciones de funcionarios (mensual 2014-2026)",
        description:
          "Listado sincronizado de los archivos publicados por sunchales.gob.ar. Cada registro incluye período, año, mes, indicador SAC y URL directa al PDF.",
        parameters: [
          { name: "format", in: "query", schema: { type: "string", enum: ["json", "csv"], default: "json" } },
          { name: "anio", in: "query", schema: { type: "integer" } }
        ],
        responses: {
          "200": {
            description: "Listado de PDFs con metadatos.",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/remuneraciones/detalle": {
      get: {
        summary: "Detalle estructurado de remuneraciones extraído mes a mes de los PDFs oficiales",
        description:
          "Extrae mediante parser pdfjs-dist la lista de funcionarios y sus columnas Bruto / Descuentos / Neto. Los PDFs escaneados (sin texto digital) quedan reportados como tales.",
        parameters: [
          { name: "format", in: "query", schema: { type: "string", enum: ["json", "csv"], default: "json" } },
          { name: "periodo", in: "query", schema: { type: "string", description: "YYYY-MM o YYYY-MM-SAC" } },
          { name: "anio", in: "query", schema: { type: "integer" } }
        ],
        responses: {
          "200": {
            description: "Detalle estructurado.",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/contrataciones": {
      get: {
        summary: "Listar contrataciones — casos demostrativos con cadena hash-chain (no es el listado oficial; usar /licitaciones)",
        parameters: [
          { name: "format", in: "query", schema: { type: "string", enum: ["json", "csv"], default: "json" } },
          { name: "procedimiento", in: "query", schema: { type: "string", enum: ["licitacion_publica", "licitacion_privada", "concurso_precios", "contratacion_directa"] } },
          { name: "estado", in: "query", schema: { type: "string" } },
          {
            name: "incluir_cadena",
            in: "query",
            description: "Si true, devuelve la cadena hash-chain de cada contratación con eventos sellados.",
            schema: { type: "boolean", default: false }
          }
        ],
        responses: {
          "200": {
            description: "Listado de contrataciones",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/digesto-concejo": {
      get: {
        summary: "Listar el digesto del Concejo Municipal sincronizado (1973-2026)",
        description:
          "3.261 normas extraídas de la paginación pública del sitio del Concejo. Cada norma incluye su id estable, título, año, fecha, tipo, área, autor, descripción y URL del PDF cuando está disponible.",
        parameters: [
          { name: "format", in: "query", schema: { type: "string", enum: ["json", "csv"], default: "json" } },
          { name: "anio", in: "query", schema: { type: "integer" } },
          { name: "tipo", in: "query", schema: { type: "string", description: "Ordenanza | Decreto | Resolución | Declaración | Minuta" } }
        ],
        responses: {
          "200": {
            description: "Listado de normas con metadatos.",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/brechas": {
      get: {
        summary: "Listar brechas de transparencia (información de publicación obligatoria aún no expuesta)",
        description:
          "Dataset abierto de las brechas detectadas por el proyecto. Cada brecha cita su fundamento normativo (Ord. Sunchales 1872/2009, Decreto Pcial. SF 0692/2009, Constitución Nacional art. 1, CADH art. 13).",
        parameters: [
          {
            name: "format",
            in: "query",
            schema: { type: "string", enum: ["json", "csv"], default: "json" }
          },
          {
            name: "modulo",
            in: "query",
            schema: {
              type: "string",
              enum: [
                "digesto",
                "juzgado-faltas",
                "presupuesto",
                "personal",
                "contrataciones",
                "recaudacion",
                "concejo",
                "audiencias-publicas"
              ]
            }
          },
          {
            name: "estado",
            in: "query",
            schema: {
              type: "string",
              enum: [
                "no_publicado",
                "publicado_formato_cerrado",
                "publicado_parcial",
                "pedido_presentado",
                "pedido_vencido",
                "respondido_parcial",
                "subsanado"
              ]
            }
          }
        ],
        responses: {
          "200": {
            description: "Listado de brechas con fundamento normativo y vías de pedido formal.",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/v1/suscripciones": {
      post: {
        summary: "Crear una suscripción opt-in para alertas de contrataciones",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", nullable: true, format: "email" },
                  whatsapp: { type: "string", nullable: true },
                  filtros: {
                    type: "object",
                    properties: {
                      procedimientos: { type: "array", items: { type: "string" } },
                      categorias: { type: "array", items: { type: "string" } },
                      montoMinimo: { type: "number", minimum: 0 }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Suscripción creada — se envía mensaje de confirmación opt-in al canal indicado.",
            content: { "application/json": { schema: { type: "object" } } }
          },
          "400": { description: "Validación fallida" }
        }
      }
    }
  },
  components: {
    schemas: {
      Partida: {
        type: "object",
        properties: {
          id: { type: "string" },
          finalidad: { type: "string" },
          funcion: { type: "string" },
          presupuestado: { type: "number" },
          ejercicio: { type: "integer" },
          verificado: { type: "boolean" },
          sourceId: { type: "string" }
        }
      },
      Empleado: {
        type: "object",
        properties: {
          id: { type: "string" },
          apellidoNombre: { type: "string" },
          cargo: { type: "string" },
          area: { type: "string" },
          jerarquia: { type: "integer", minimum: 1, maximum: 4 },
          remuneracionBruta: { type: "number", nullable: true },
          fuenteCargo: { type: "string", enum: ["verificado_publico", "pendiente_oficial"] },
          fuenteRemuneracion: {
            type: "string",
            enum: ["estimacion_referencial", "verificado_oficial", "pendiente_oficial"]
          }
        }
      },
      PresupuestoResponse: {
        type: "object",
        properties: {
          meta: { type: "object" },
          partidas: { type: "array", items: { $ref: "#/components/schemas/Partida" } }
        }
      },
      PersonalResponse: {
        type: "object",
        properties: {
          meta: { type: "object" },
          empleados: { type: "array", items: { $ref: "#/components/schemas/Empleado" } }
        }
      }
    }
  }
} as const;

export async function GET() {
  return Response.json(spec, {
    headers: { "Cache-Control": "public, max-age=3600" }
  });
}
