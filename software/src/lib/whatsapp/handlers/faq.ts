/**
 * Handler de FAQ — responde tramites comunes desde el catalogo curado.
 *
 * Si no encuentra una coincidencia razonable, devuelve un texto que invita
 * al usuario a usar el modo "pregunta libre" (IA), pero NO inventa datos.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { buscarFaq, faqCatalogo } from "@/lib/whatsapp/data/faq";

export function intentaCoincidirFaq(texto: string): boolean {
  return buscarFaq(texto) !== null;
}

export const manejarFaq: Handler = async (ctx) => {
  const entrada = buscarFaq(ctx.entrada.body);

  if (!entrada) {
    return {
      respuesta: {
        texto:
          "No tengo una respuesta verificada para esa consulta. Podés:\n" +
          "• Reformularla con otras palabras.\n" +
          "• Escribir *4* para que la responda con IA (basada en datos públicos).\n" +
          "• Escribir *menú* para volver al inicio.\n\n" +
          "Trámites que conozco bien: " + faqCatalogo.slice(0, 5).map((e) => `_${e.pregunta}_`).join(" · ")
      },
      nuevoEstado: { intentActivo: "faq" }
    };
  }

  const aclaracion = entrada.verificado
    ? ""
    : "\n\n_⚠ Información de referencia. Confirmar en sunchales.gob.ar antes de hacer el trámite._";

  const fuente = entrada.fuente ? `\n\n📎 Fuente: ${entrada.fuente}` : "";

  return {
    respuesta: { texto: `*${entrada.pregunta}*\n\n${entrada.respuesta}${aclaracion}${fuente}` },
    nuevoEstado: { intentActivo: "faq" }
  };
};
