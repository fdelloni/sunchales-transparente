/**
 * exportar-datos-sincronizados.ts
 *
 * Lee las fuentes canónicas de TypeScript del repo (padrón de personal,
 * presupuesto 2026, FAQ del bot) y las serializa a JSON en `data/sincronizado/`.
 *
 * Esos JSON son consumidos por el indexer RAG (`scripts/indexar-rag.mjs`),
 * que es .mjs y por lo tanto no puede importar TS directamente.
 *
 * Antes de este script, el indexer tenía sus propias copias hardcodeadas
 * de funcionarios, partidas y FAQs, lo que causaba desincronización (el bot
 * de WhatsApp respondía con datos viejos mientras el sitio web ya tenía
 * cargada la versión actualizada). Con esta sincronización automática,
 * la fuente de verdad es siempre el .ts.
 *
 * Uso:
 *   npm run sincronizar-datos
 *
 * Salidas:
 *   data/sincronizado/funcionarios.json
 *   data/sincronizado/presupuesto.json
 *   data/sincronizado/faq.json
 *   data/sincronizado/_meta.json     (timestamp y conteos)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { empleados } from "../src/lib/data/personal";
import { totales, partidas } from "../src/lib/data/presupuesto";
import { faqCatalogo } from "../src/lib/whatsapp/data/faq";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const DEST_DIR = path.join(RAIZ, "data", "sincronizado");

function escribir(nombre: string, datos: unknown) {
  const ruta = path.join(DEST_DIR, nombre);
  writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
  console.log(`[sincronizar] ${nombre} (${JSON.stringify(datos).length} bytes)`);
}

function main() {
  mkdirSync(DEST_DIR, { recursive: true });

  // === FUNCIONARIOS ===
  // Solo los campos que el indexer necesita para construir los chunks
  const funcionariosExport = empleados.map((e) => ({
    id: e.id,
    apellidoNombre: e.apellidoNombre,
    cargo: e.cargo,
    area: e.area,
    jerarquia: e.jerarquia,
    reportaA: e.reportaA,
    fechaInicio: e.fechaInicio,
    remuneracionBruta: e.remuneracionBruta,
    fuenteRemuneracion: e.fuenteRemuneracion,
    fuenteCargo: e.fuenteCargo,
    periodoRemuneracion: e.periodoRemuneracion ?? null,
    urlPdfRemuneracion: e.urlPdfRemuneracion ?? null,
    ejercicio: e.ejercicio
  }));
  escribir("funcionarios.json", funcionariosExport);

  // === PRESUPUESTO ===
  const presupuestoExport = {
    totales,
    partidas: partidas.map((p) => ({
      id: p.id,
      finalidad: p.finalidad,
      funcion: p.funcion,
      programa: p.programa ?? null,
      presupuestado: p.presupuestado,
      ejecutado: p.ejecutado ?? null,
      ejercicio: p.ejercicio,
      verificado: p.verificado,
      sourceId: p.sourceId
    }))
  };
  escribir("presupuesto.json", presupuestoExport);

  // === FAQ ===
  const faqExport = faqCatalogo.map((f) => ({
    id: f.id,
    keywords: f.keywords,
    pregunta: f.pregunta,
    respuesta: f.respuesta,
    fuente: f.fuente ?? null,
    verificado: f.verificado
  }));
  escribir("faq.json", faqExport);

  // === META ===
  escribir("_meta.json", {
    generadoEn: new Date().toISOString(),
    fuentes: {
      funcionarios: "src/lib/data/personal.ts",
      presupuesto: "src/lib/data/presupuesto.ts",
      faq: "src/lib/whatsapp/data/faq.ts"
    },
    conteos: {
      funcionarios: funcionariosExport.length,
      partidasPresupuesto: presupuestoExport.partidas.length,
      faq: faqExport.length
    }
  });

  console.log(
    `\n[sincronizar] OK — ${funcionariosExport.length} funcionarios, ` +
      `${presupuestoExport.partidas.length} partidas, ${faqExport.length} FAQs`
  );
}

main();
