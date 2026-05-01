/**
 * Handler de reclamos ciudadanos — flujo multi-paso.
 *
 * Pasos:
 *   1) esperando_categoria → usuario elige tipo de reclamo
 *   2) esperando_descripcion → texto libre describiendo el problema
 *   3) esperando_direccion → ubicacion (calle y altura, o referencia)
 *   4) esperando_confirmacion → resumen para que confirme con SI/NO
 *
 * Al confirmar, el reclamo se persiste con un numero de caso devuelto
 * al ciudadano para seguimiento posterior.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { supabase } from "@/lib/supabase";

const CATEGORIAS = [
  { id: "1", label: "Bache / pavimento" },
  { id: "2", label: "Luminaria pública" },
  { id: "3", label: "Recolección de residuos" },
  { id: "4", label: "Espacio verde / arbolado" },
  { id: "5", label: "Agua / desagüe" },
  { id: "6", label: "Tránsito / señalización" },
  { id: "7", label: "Ruido / convivencia" },
  { id: "8", label: "Otro" }
];

const PALABRAS_RECLAMO = [
  "reclamo", "reclamar", "denuncia", "denunciar",
  "bache", "luminaria", "luz que no anda", "no anda la luz",
  "no pasa el camion", "basura sin levantar",
  "se inundo", "ruido", "molesta"
];

export function esComienzoDeReclamo(texto: string): boolean {
  const n = texto.toLowerCase();
  return PALABRAS_RECLAMO.some((p) => n.includes(p));
}

export const manejarReclamo: Handler = async (ctx) => {
  const paso = ctx.sesion.pasoReclamo;
  const texto = ctx.entrada.body.trim();

  // ---- Inicio: presentar categorias ----
  if (paso === null) {
    return {
      respuesta: { texto:
        "📝 *Nuevo reclamo ciudadano*\n\n" +
        "¿De qué se trata? Respondé con el número:\n" +
        CATEGORIAS.map((c) => `${c.id}️⃣  ${c.label}`).join("\n") +
        "\n\n_Escribí *salir* en cualquier momento para cancelar._"
      },
      nuevoEstado: { intentActivo: "reclamo", pasoReclamo: "esperando_categoria", reclamoBorrador: {} }
    };
  }

  // ---- Paso 1: categoria ----
  if (paso === "esperando_categoria") {
    const elegida = CATEGORIAS.find((c) => c.id === texto);
    if (!elegida) {
      return {
        respuesta: { texto: "No entendí. Respondé con un número del 1 al 8 (o *salir* para cancelar)." },
        nuevoEstado: {}
      };
    }
    return {
      respuesta: { texto:
        `Anotado: *${elegida.label}*.\n\n` +
        "Ahora describí el problema en un mensaje (qué pasa, desde cuándo, etc.)."
      },
      nuevoEstado: {
        pasoReclamo: "esperando_descripcion",
        reclamoBorrador: { categoria: elegida.label }
      }
    };
  }

  // ---- Paso 2: descripcion ----
  if (paso === "esperando_descripcion") {
    if (texto.length < 8) {
      return { respuesta: { texto: "Necesito una descripción un poco más larga (al menos 8 caracteres)." }, nuevoEstado: {} };
    }
    return {
      respuesta: { texto: "Recibido. Ahora indicame la *dirección o referencia* (ej: \"Belgrano 850\" o \"esquina San Martín y Mitre\")." },
      nuevoEstado: { pasoReclamo: "esperando_direccion", reclamoBorrador: { descripcion: texto } }
    };
  }

  // ---- Paso 3: direccion ----
  if (paso === "esperando_direccion") {
    if (texto.length < 4) {
      return { respuesta: { texto: "Indicame al menos calle y altura, o una referencia clara." }, nuevoEstado: {} };
    }
    const r = { ...ctx.sesion.reclamoBorrador, direccion: texto };
    return {
      respuesta: { texto:
        "Confirmá tu reclamo:\n\n" +
        `📂 Categoría: ${r.categoria}\n` +
        `📍 Dirección: ${r.direccion}\n` +
        `📝 Descripción: ${r.descripcion}\n\n` +
        "Respondé *SI* para registrarlo o *NO* para cancelar."
      },
      nuevoEstado: { pasoReclamo: "esperando_confirmacion", reclamoBorrador: { direccion: texto } }
    };
  }

  // ---- Paso 4: confirmacion ----
  if (paso === "esperando_confirmacion") {
    const respUser = texto.toLowerCase();
    if (/^(si|sí|s|ok|dale|confirmo)$/.test(respUser)) {
      const numeroCaso = await registrarReclamo({
        from: ctx.entrada.from,
        nombre: ctx.entrada.profileName ?? "anonimo",
        categoria: ctx.sesion.reclamoBorrador.categoria ?? "otro",
        descripcion: ctx.sesion.reclamoBorrador.descripcion ?? "",
        direccion: ctx.sesion.reclamoBorrador.direccion ?? ""
      });
      return {
        respuesta: { texto:
          `✅ Reclamo registrado.\n\n` +
          `*Número de caso: ${numeroCaso}*\n\n` +
          `Guardalo para hacer seguimiento. El área correspondiente lo va a revisar.\n\n` +
          `_Escribí *menú* para hacer otra consulta._`
        },
        nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
      };
    }
    if (/^(no|n|cancelar)$/.test(respUser)) {
      return {
        respuesta: { texto: "Reclamo cancelado. Escribí *menú* cuando quieras." },
        nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
      };
    }
    return { respuesta: { texto: "Respondé *SI* para confirmar o *NO* para cancelar." }, nuevoEstado: {} };
  }

  // Estado inesperado: reseteo
  return {
    respuesta: { texto: "Hubo un problema con el flujo. Volvamos a empezar — escribí *3* o *reclamo* para reiniciar." },
    nuevoEstado: { intentActivo: null, pasoReclamo: null, reclamoBorrador: {} }
  };
};

/**
 * Persiste el reclamo. Si Supabase no esta configurado, genera un numero
 * de caso local (no persistido) y registra advertencia. Esto permite que
 * el flujo demo funcione end-to-end sin DB.
 */
async function registrarReclamo(r: {
  from: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  direccion: string;
}): Promise<string> {
  const numero = `R-${new Date().getFullYear()}-${randomCode(6)}`;

  if (!supabase) {
    console.warn("[reclamos] Supabase no configurado; reclamo NO persistido:", { numero, ...r });
    return numero;
  }

  const { error } = await supabase.from("reclamos_ciudadanos").insert({
    numero_caso: numero,
    from_number: r.from,
    nombre_contacto: r.nombre,
    categoria: r.categoria,
    descripcion: r.descripcion,
    direccion: r.direccion,
    estado: "recibido",
    canal: "whatsapp"
  });

  if (error) {
    console.error("[reclamos] error al persistir:", error);
    // No abortamos: igual devolvemos numero para que el ciudadano tenga referencia.
  }
  return numero;
}

function randomCode(n: number): string {
  const alfa = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin O/0/I/1 para que sea legible
  let r = "";
  for (let i = 0; i < n; i++) r += alfa[Math.floor(Math.random() * alfa.length)];
  return r;
}
