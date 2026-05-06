/**
 * Handler de saludo / bienvenida.
 *
 * Solo se ejecuta cuando el usuario explicitamente saluda (hola, menu, ayuda,
 * buenas, etc.). El resto del tiempo, todos los mensajes van al handler IA.
 *
 * Por eso este handler NO muestra menu numerado — el bot es conversacional
 * puro, el ciudadano pregunta lo que quiera en lenguaje natural.
 */

import type { Handler } from "@/lib/whatsapp/types";

export const manejarMenu: Handler = async (ctx) => {
  const nombre = ctx.entrada.profileName?.split(" ")[0];
  const saludo = nombre ? `Hola ${nombre}!` : "Hola!";

  const texto =
    `${saludo} Soy el asistente virtual de la *Municipalidad de Sunchales* (versión piloto).\n\n` +
    `Preguntame en lenguaje natural lo que quieras saber del municipio: presupuesto, normativa del Digesto, funcionarios, obra pública, trámites o cualquier consulta.\n\n` +
    `_Para abrir un reclamo (bache, luminaria, recolección, etc.) escribí *reclamo*._\n` +
    `_Para terminar la conversación escribí *salir*._`;

  return {
    respuesta: { texto },
    nuevoEstado: { intentActivo: "ia", pasoReclamo: null, reclamoBorrador: {} }
  };
};
