/**
 * Handler de menu / bienvenida.
 *
 * El primer mensaje de cada sesion abre con esto. Tambien se llega
 * escribiendo "menu" o "ayuda" en cualquier momento.
 */

import type { Handler } from "@/lib/whatsapp/types";

export const manejarMenu: Handler = async (ctx) => {
  const nombre = ctx.entrada.profileName?.split(" ")[0];
  const saludo = nombre ? `Hola ${nombre}!` : "Hola!";

  const texto =
    `${saludo} Soy el asistente virtual de la *Municipalidad de Sunchales* (versión piloto).\n\n` +
    `Puedo ayudarte con:\n` +
    `1️⃣  *Trámites y FAQ* — TGI, licencias, habilitaciones, horarios.\n` +
    `2️⃣  *Transparencia* — presupuesto, sueldos, obra pública.\n` +
    `3️⃣  *Reclamos* — bache, luminaria, recolección, etc.\n` +
    `4️⃣  *Pregunta libre* — te contesto con IA usando datos públicos.\n\n` +
    `Respondé con un número (1-4) o escribí tu consulta en lenguaje natural.\n\n` +
    `_Para terminar la conversación escribí *salir*._`;

  return {
    respuesta: { texto },
    nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
  };
};
