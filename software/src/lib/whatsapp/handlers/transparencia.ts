/**
 * Handler de transparencia — consulta datos publicos del municipio.
 *
 * Reusa los datasets ya existentes en src/lib/data/* para garantizar una
 * sola fuente de verdad: el bot dice exactamente lo que muestra la web.
 */

import type { Handler } from "@/lib/whatsapp/types";
import { totales, partidas } from "@/lib/data/presupuesto";
import { empleados, aggregadosPorArea } from "@/lib/data/personal";

const PALABRAS_TRANSPARENCIA = [
  "presupuesto", "gasto", "gastos", "recursos", "ingresos",
  "intendente", "secretario", "secretaria", "subsecretario", "subsecretaria",
  "sueldo", "sueldos", "salario", "salarios", "remuneracion", "remuneración",
  "personal", "empleado", "empleados", "planta",
  "obra publica", "obra pública", "obras", "infraestructura",
  "salud", "educacion", "educación", "cultura",
  "habitantes", "poblacion", "población",
  "fondo ley", "fondo provincial",
  "pinotti"
];

export function intentaCoincidirTransparencia(texto: string): boolean {
  const norm = texto.toLowerCase();
  return PALABRAS_TRANSPARENCIA.some((p) => norm.includes(p));
}

export const manejarTransparencia: Handler = async (ctx) => {
  const norm = ctx.entrada.body.toLowerCase();

  // Presupuesto
  if (/(presupuesto|gasto|recurso|ingreso)/.test(norm)) {
    return { respuesta: { texto: textoPresupuesto(norm) }, nuevoEstado: { intentActivo: "transparencia" } };
  }

  // Personal / sueldos / funcionarios
  if (/(intendente|secretari|subsecretari|sueldo|salario|remunera|personal|empleado|planta|pinotti)/.test(norm)) {
    return { respuesta: { texto: textoPersonal(norm) }, nuevoEstado: { intentActivo: "transparencia" } };
  }

  // Obra publica
  if (/(obra|infraestructura|pavimento|iluminacion|iluminación|girsu|ferroviario)/.test(norm)) {
    return { respuesta: { texto: textoObraPublica() }, nuevoEstado: { intentActivo: "transparencia" } };
  }

  // Habitantes / poblacion
  if (/(habitante|poblacion|población)/.test(norm)) {
    return {
      respuesta: { texto:
        `Sunchales tiene *${totales.habitantes.toLocaleString("es-AR")} habitantes* (Censo INDEC 2022).\n` +
        `Gasto presupuestado per cápita 2026: *${formatARS(totales.gasto_per_capita)}*.\n\n` +
        `📎 Fuente: INDEC, Censo Nacional 2022.`
      }
    };
  }

  // Fondo provincial
  if (/(fondo ley|fondo provincial|12385)/.test(norm)) {
    return {
      respuesta: { texto:
        `🏛️ *Fondo Federal Provincial (Ley 12.385)*\n\n` +
        `Recibido por Sunchales en 2026: *${formatARS(totales.fondoLey12385_recibido)}*.\n` +
        `Es la coparticipación que la provincia transfiere a municipios y comunas para obras y servicios.`
      }
    };
  }

  // Generico: menu de transparencia
  return {
    respuesta: { texto:
      "📊 Puedo darte info sobre:\n" +
      "• *presupuesto* — totales y desglose 2026\n" +
      "• *intendente / sueldos / personal* — planta política\n" +
      "• *obra pública* — pavimento, iluminación, GIRSU\n" +
      "• *habitantes* — datos demográficos\n" +
      "• *fondo provincial* — Ley 12.385\n\n" +
      "Escribí cualquiera de esas palabras."
    },
    nuevoEstado: { intentActivo: "transparencia" }
  };
};

// ---------- helpers ----------

function textoPresupuesto(norm: string): string {
  // Si pregunta por una finalidad especifica, filtramos
  const finalidades = [
    { key: "salud", label: "Salud" },
    { key: "educacion", label: "Educación" },
    { key: "educación", label: "Educación" },
    { key: "obra", label: "Obra Pública" },
    { key: "seguridad", label: "Servicios de Seguridad" },
    { key: "cultura", label: "Cultura, deporte y comunidad" },
    { key: "ambiente", label: "Ambiente" }
  ];
  const elegido = finalidades.find((f) => norm.includes(f.key));

  if (elegido) {
    const filas = partidas.filter((p) => p.finalidad.includes(elegido.label) || p.funcion.includes(elegido.label));
    if (filas.length) {
      const total = filas.reduce((acc, p) => acc + p.presupuestado, 0);
      const lineas = filas.map((p) => `  • ${p.funcion}: ${formatARS(p.presupuestado)}${p.verificado ? "" : " *"}`);
      const aclaracion = filas.some((f) => !f.verificado)
        ? "\n\n_* desglose ejemplificador, pendiente de carga oficial. Total general sí está verificado._"
        : "";
      return `*Presupuesto 2026 — ${elegido.label}*\n` +
             `Subtotal: ${formatARS(total)}\n\n` +
             `${lineas.join("\n")}${aclaracion}\n\n📎 Fuente: Proyecto de Presupuesto 2026 al HCM.`;
    }
  }

  return (
    `*Presupuesto Municipal 2026* (cifras verificadas)\n\n` +
    `• Gastos totales: ${formatARS(totales.gastos_total)}\n` +
    `• Recursos corrientes: ${formatARS(totales.recursos_corrientes)}\n` +
    `• Fondo provincial Ley 12.385: ${formatARS(totales.fondoLey12385_recibido)}\n` +
    `• Habitantes (INDEC 2022): ${totales.habitantes.toLocaleString("es-AR")}\n` +
    `• Gasto per cápita: ${formatARS(totales.gasto_per_capita)}\n\n` +
    `Para ver el desglose pedime, por ejemplo: _"presupuesto salud"_, _"presupuesto obra pública"_.\n\n` +
    `📎 Fuente: Proyecto de Presupuesto 2026 remitido al HCM.`
  );
}

function textoPersonal(norm: string): string {
  // Busqueda por nombre o cargo especifico
  const candidatos = empleados.filter((e) =>
    e.apellidoNombre.toLowerCase().includes(norm) ||
    e.cargo.toLowerCase().includes(norm) ||
    norm.split(" ").some((w) => w.length > 3 && e.apellidoNombre.toLowerCase().includes(w))
  );

  if (candidatos.length === 1) {
    const e = candidatos[0];
    const sueldo = e.remuneracionBruta
      ? `${formatARS(e.remuneracionBruta)} brutos/mes${e.fuenteRemuneracion === "estimacion_referencial" ? " *" : ""}`
      : "no informado oficialmente";
    return `*${e.apellidoNombre}*\n` +
           `Cargo: ${e.cargo}\n` +
           `Área: ${e.area}\n` +
           `Remuneración: ${sueldo}\n\n` +
           (e.fuenteRemuneracion === "estimacion_referencial"
             ? "_* estimación referencial basada en escalas habituales del régimen municipal santafesino. NO es dato oficial publicado por Sunchales._"
             : "");
  }

  // Resumen agregado
  const agregados = aggregadosPorArea();
  const lineas = agregados
    .slice(0, 8)
    .map((a) => `  • ${a.area}: ${a.cantidad} personas — masa ${formatARS(a.masaSalarial)}`);

  return (
    `*Personal de planta política* (datos cargados al sistema)\n\n` +
    `${lineas.join("\n")}\n\n` +
    `Total cargado: ${empleados.length} personas.\n` +
    `Para ver una persona específica escribí su apellido o cargo (ej: _"intendente"_, _"Pinotti"_).\n\n` +
    `_⚠ Las remuneraciones mostradas son estimaciones referenciales. Pendiente publicación oficial del municipio._`
  );
}

function textoObraPublica(): string {
  const obras = partidas.filter((p) => p.finalidad.includes("Obra Pública"));
  const total = obras.reduce((acc, p) => acc + p.presupuestado, 0);
  const lineas = obras.map((p) => `  • ${p.funcion}: ${formatARS(p.presupuestado)}${p.verificado ? " ✓" : " *"}`);
  return (
    `*Obra Pública — Presupuesto 2026*\n` +
    `Subtotal: ${formatARS(total)}\n\n` +
    `${lineas.join("\n")}\n\n` +
    `_✓ verificado · * desglose ejemplificador, pendiente de carga oficial._\n\n` +
    `📎 Fuente: Proyecto de Presupuesto 2026 al HCM.`
  );
}

function formatARS(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(n);
}
