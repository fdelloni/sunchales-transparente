/**
 * Handler de saludo / bienvenida.
 *
 * Solo se ejecuta cuando el usuario explicitamente saluda (hola, menu, ayuda,
 * buenas, etc.). El resto del tiempo, todos los mensajes van al handler IA.
 *
 * Tono cordial y conversacional. NO se muestra menu, NO se lista capacidades,
 * NO se dan instrucciones — el ciudadano escribe lo que necesita en lenguaje
 * natural y el bot responde.
 */

import type { Handler } from "@/lib/whatsapp/types";

export const manejarMenu: Handler = async () => {
  return {
    respuesta: { texto:
      "Hola! Soy el asistente virtual de la *Municipalidad de Sunchales*. ¿En qué te puedo ayudar?"
    },
    nuevoEstado: { intentActivo: "ia", pasoReclamo: null, reclamoBorrador: {} }
  };
};
