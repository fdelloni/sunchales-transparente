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
    "/api/v1/contrataciones": {
      get: {
        summary: "Listar contrataciones (licitaciones, concursos, contrataciones directas)",
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
