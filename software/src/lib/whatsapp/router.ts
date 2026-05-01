/**
 * Router de intents.
 *
 * Estrategia:
 *   1) Si el usuario tiene un sub-flujo activo (ej: alta de reclamo),
 *      esa conversacion mantiene la prioridad hasta que termine o cancele.
 *   2) Comandos explicitos (numeros 1-5, "menu", "ayuda", "salir") se
 *      atienden primero.
 *   3) Despues, matching de palabras clave para FAQ y transparencia.
 *   4) Fallback: handler de IA con Claude.
 *
 * Mantenemos el clasificador deliberadamente simple y deterministico para
 * que el comportamiento sea auditable. La IA es solo el ultimo recurso.
 */

import type { ContextoHandler, Handler, Intent } from "@/lib/whatsapp/types";
import { manejarMenu } from "@/lib/whatsapp/handlers/menu";
import { manejarFaq, intentaCoincidirFaq } from "@/lib/whatsapp/handlers/faq";
import { manejarTransparencia, intentaCoincidirTransparencia } from "@/lib/whatsapp/handlers/transparencia";
import { manejarReclamo, esComienzoDeReclamo } from "@/lib/whatsapp/handlers/reclamos";
import { manejarIa } from "@/lib/whatsapp/handlers/ia";

const TRIGGERS_MENU = ["menu", "menú", "ayuda", "help", "hola", "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "/start"];
const TRIGGERS_SALIR = ["salir", "cancelar", "chau", "gracias", "fin"];

export async function rutearMensaje(ctx: ContextoHandler): Promise<{ handler: Handler; intent: Intent }> {
  const texto = ctx.entrada.body.trim();
  const norm = texto.toLowerCase();

  // 0. Comandos universales que rompen cualquier flujo en curso.
  if (TRIGGERS_SALIR.includes(norm)) {
    return {
      intent: "salir",
      handler: async (c) => ({
        respuesta: { texto: "Listo, salimos del flujo. Escribí *menú* cuando quieras volver." },
        nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
      })
    };
  }

  // 1. Sub-flujo activo (alta de reclamo) tiene prioridad
  if (ctx.sesion.intentActivo === "reclamo" && ctx.sesion.pasoReclamo !== null) {
    return { intent: "reclamo", handler: manejarReclamo };
  }

  // 2. Menu / ayuda explicito
  if (TRIGGERS_MENU.includes(norm)) {
    return { intent: "menu", handler: manejarMenu };
  }

  // 3. Opciones numeradas del menu
  switch (norm) {
    case "1":
      return { intent: "faq", handler: async () => ({
        respuesta: { texto: "Decime tu consulta sobre *trámites* (TGI, licencias, habilitaciones, horarios). Por ejemplo: \"¿cómo pago la TGI?\"" },
        nuevoEstado: { intentActivo: "faq" }
      })};
    case "2":
      return { intent: "transparencia", handler: async () => ({
        respuesta: { texto:
          "📊 *Transparencia* — escribí lo que querés saber:\n" +
          "• \"presupuesto\" — totales 2026 y desglose\n" +
          "• \"intendente\" o un nombre de funcionario\n" +
          "• \"sueldos\" o \"personal\"\n" +
          "• \"obra pública\"" },
        nuevoEstado: { intentActivo: "transparencia" }
      })};
    case "3":
      return { intent: "reclamo", handler: manejarReclamo };
    case "4":
      return { intent: "ia", handler: async () => ({
        respuesta: { texto: "Hacé tu pregunta en lenguaje natural y te respondo con la información del municipio que tengo cargada. Para volver al menú escribí *menú*." },
        nuevoEstado: { intentActivo: "ia" }
      })};
  }

  // 4. Inicio de reclamo por keyword
  if (esComienzoDeReclamo(texto)) {
    return { intent: "reclamo", handler: manejarReclamo };
  }

  // 5. Match de transparencia (presupuesto, sueldos, etc.)
  if (intentaCoincidirTransparencia(texto)) {
    return { intent: "transparencia", handler: manejarTransparencia };
  }

  // 6. Match de FAQ
  if (intentaCoincidirFaq(texto)) {
    return { intent: "faq", handler: manejarFaq };
  }

  // 7. Si no tenemos nada, primer turno → menu; turno siguiente → IA
  if (ctx.sesion.intentActivo === null) {
    return { intent: "menu", handler: manejarMenu };
  }

  return { intent: "ia", handler: manejarIa };
}
