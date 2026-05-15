/**
 * Router de intents — version conversacional pura.
 *
 * Filosofia: el bot es un asistente conversacional, NO un menu numerado.
 * Por default TODO mensaje del usuario va al handler IA (RAG + Gemini 2.5 Flash).
 *
 * Excepciones (hardcoded):
 *   1. Salir / cancelar / chau / fin     → cierra la conversacion.
 *   2. "hola", "menu", "ayuda", saludos  → mensaje breve de bienvenida.
 *   3. Sub-flujo de reclamo activo       → continua el flujo guiado.
 *   4. "reclamo", "denuncia", "bache",
 *      "luminaria", etc.                  → arranca flujo de reclamo guiado.
 *   5. (Atajo) "3" → tambien dispara flujo de reclamo (compatibilidad).
 *
 * Cualquier otro texto va al handler IA. Eso permite preguntas naturales
 * tipo: "que dice la ord 1872/2009?", "quien es el intendente?",
 * "cuanto se gasta en salud?", etc.
 */

import type { ContextoHandler, Handler, Intent } from "@/lib/whatsapp/types";
import { manejarMenu } from "@/lib/whatsapp/handlers/menu";
import { manejarReclamo, esComienzoDeReclamo } from "@/lib/whatsapp/handlers/reclamos";
import { manejarIa } from "@/lib/whatsapp/handlers/ia";

const TRIGGERS_SALIR = ["salir", "cancelar", "chau", "gracias", "fin"];
const TRIGGERS_SALUDO = [
  "hola", "menu", "menú", "ayuda", "help",
  "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches",
  "/start", "inicio"
];

export async function rutearMensaje(ctx: ContextoHandler): Promise<{ handler: Handler; intent: Intent }> {
  const texto = ctx.entrada.body.trim();
  const norm = texto.toLowerCase();

  // 1. Comandos universales (salir) — cortan cualquier flujo en curso.
  if (TRIGGERS_SALIR.includes(norm)) {
    return {
      intent: "salir",
      handler: async () => ({
        respuesta: { texto: "Listo, cerramos la conversación. Cuando quieras volver, escribime de nuevo." },
        nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
      })
    };
  }

  // 2. Sub-flujo de reclamo activo: prioridad alta MIENTRAS el usuario
  // este respondiendo el flujo. Pero si el usuario manda una pregunta
  // clara (signo ?, "qu[eé]", "hay", etc.), salimos del flujo y dejamos
  // que IA responda la consulta. Esto evita el caso "abri flujo por
  // luminaria y la siguiente pregunta no se contesta".
  if (ctx.sesion.intentActivo === "reclamo" && ctx.sesion.pasoReclamo !== null) {
    const esConsultaClara =
      /[?¿]/.test(texto) ||
      /^\s*(qu[eé]|cu[aá]l|cu[aá]nto|c[oó]mo|d[oó]nde|cu[aá]ndo|qui[eé]n|por\s+qu[eé]|hay|existen?|list[ao]me|mostr[aá]me|cont[aá]me|inform[aá]me|dec[ií]me)/i.test(texto);
    if (!esConsultaClara) {
      return { intent: "reclamo", handler: manejarReclamo };
    }
    // Cae a IA y limpiamos el estado de reclamo en el handler. Lo hacemos
    // envolviendo el handler de IA en un wrapper que tambien resetea estado.
    return {
      intent: "ia",
      handler: async (ctx2) => {
        const r = await manejarIa(ctx2);
        return {
          ...r,
          nuevoEstado: {
            ...(r.nuevoEstado ?? {}),
            intentActivo: "ia",
            pasoReclamo: null,
            reclamoBorrador: {}
          }
        };
      }
    };
  }

  // 3. Saludos / pedido de menu → mensaje breve de bienvenida.
  if (TRIGGERS_SALUDO.includes(norm)) {
    return { intent: "menu", handler: manejarMenu };
  }

  // 4. Inicio explicito de reclamo (palabra clave o atajo numerico).
  if (norm === "3" || esComienzoDeReclamo(texto)) {
    return { intent: "reclamo", handler: manejarReclamo };
  }

  // 5. Default: TODO va al handler IA con RAG + Gemini.
  return { intent: "ia", handler: manejarIa };
}
