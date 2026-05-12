/**
 * exportar-datos-sincronizados.ts
 *
 * Lee las fuentes canónicas de TypeScript del repo (padrón de personal,
 * presupuesto 2026, FAQ del bot, Concejo Municipal, Juzgado de Faltas,
 * contrataciones, brechas de transparencia, marco normativo completo,
 * catastro, zonificación, licencias y recaudación) y las serializa a JSON
 * en `data/sincronizado/`.
 *
 * Esos JSON son consumidos por el indexer RAG (`scripts/indexar-rag.mjs`),
 * que es .mjs y por lo tanto no puede importar TS directamente.
 *
 * La fuente de verdad ES SIEMPRE el .ts del repo. Cualquier cambio en estos
 * datos se sincroniza automáticamente al correr `npm run sincronizar-datos`
 * o el GitHub Action `reindex-rag.yml` (que se dispara en cada push a main).
 *
 * Uso:
 *   npm run sincronizar-datos
 *
 * Salidas (en data/sincronizado/):
 *   funcionarios.json
 *   presupuesto.json
 *   faq.json
 *   concejo.json
 *   juzgado.json
 *   contrataciones.json
 *   brechas.json
 *   marco-normativo.json
 *   catastro.json
 *   zonificacion.json
 *   licencias.json
 *   recaudacion.json
 *   _meta.json
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { empleados } from "../src/lib/data/personal";
import { totales, partidas } from "../src/lib/data/presupuesto";
import { faqCatalogo } from "../src/lib/whatsapp/data/faq";
import {
  concejales,
  comisiones,
  personalConcejo,
  concejoInfo,
  tiposDeNorma,
  aipLocal
} from "../src/lib/data/concejo";
import {
  juzgadoInfo,
  marcoJuzgado,
  loYaPublicado,
  tensionesDeDiseno,
  planConstruccion
} from "../src/lib/data/juzgado";
import { contrataciones, labels as labelsContrataciones } from "../src/lib/data/contrataciones";
import { brechas, labelEstado, labelCategoria } from "../src/lib/data/brechas";
import {
  marcoNormativoCompleto,
  limitacionesAccesoOrd1872
} from "../src/lib/data/marcoNormativo";
import { normasCatastrales, oficinaCatastro, tramitesCatastrales } from "../src/lib/data/catastro";
import {
  clasesSuelo,
  parcelasArt4,
  poligonosArea,
  URL_ORD_2800,
  URL_DIGESTO_CONCEJO
} from "../src/lib/data/zonificacion";
import { evolucionLicencias, fuenteLicencias, etiquetaTipo, indicadorDeQue } from "../src/lib/data/licencias";
import { totalesRecaudacion, recursos, labelsCategoria } from "../src/lib/data/recaudacion";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const DEST_DIR = path.join(RAIZ, "data", "sincronizado");

function escribir(nombre: string, datos: unknown) {
  const ruta = path.join(DEST_DIR, nombre);
  writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
  const tamaño = JSON.stringify(datos).length;
  console.log(`[sincronizar] ${nombre} (${tamaño.toLocaleString()} bytes)`);
}

function main() {
  mkdirSync(DEST_DIR, { recursive: true });

  // === 1. FUNCIONARIOS ===
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

  // === 2. PRESUPUESTO ===
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

  // === 3. FAQ ===
  const faqExport = faqCatalogo.map((f) => ({
    id: f.id,
    keywords: f.keywords,
    pregunta: f.pregunta,
    respuesta: f.respuesta,
    fuente: f.fuente ?? null,
    verificado: f.verificado
  }));
  escribir("faq.json", faqExport);

  // === 4. CONCEJO MUNICIPAL ===
  // Mapeo de id de concejal -> nombre, para enriquecer las comisiones
  const nombrePorId = new Map(concejales.map((c) => [c.id, c.nombre]));
  const concejoExport = {
    institucional: concejoInfo,
    concejales: concejales.map((c) => ({
      id: c.id,
      nombre: c.nombre,
      rol: c.rol,
      bloque: c.bloque,
      mandato: `${c.mandatoInicio}-${c.mandatoFin}`,
      email: c.email,
      telefono: c.telefono
    })),
    personalConcejo,
    comisiones: comisiones.map((com) => ({
      nombre: com.nombre,
      resolucion: com.resolucion,
      integrantes: com.integrantes.map((id) => nombrePorId.get(id) ?? id)
    })),
    tiposDeNorma,
    accesoInfoLocal: aipLocal
  };
  escribir("concejo.json", concejoExport);

  // === 5. JUZGADO DE FALTAS ===
  const juzgadoExport = {
    institucional: juzgadoInfo,
    marcoNormativo: marcoJuzgado,
    loYaPublicado,
    tensionesDeDiseno,
    planConstruccion
  };
  escribir("juzgado.json", juzgadoExport);

  // === 6. CONTRATACIONES ===
  const contratacionesExport = contrataciones.map((c) => ({
    id: c.id,
    expediente: c.expediente,
    ejercicio: c.ejercicio,
    procedimiento: c.procedimiento,
    numero: c.numero,
    objeto: c.objeto,
    categoria: c.categoria,
    area: c.area,
    presupuestoOficial: c.presupuestoOficial,
    estado: c.estado,
    fechaApertura: c.fechaApertura,
    fechaAdjudicacion: c.fechaAdjudicacion,
    cantidadOferentes: (c.oferentes ?? []).length,
    oferentes: (c.oferentes ?? []).map((o) => ({
      razonSocial: o.razonSocial,
      monto: o.monto
    })),
    adjudicado: c.adjudicado
      ? {
          razonSocial: c.adjudicado.razonSocial,
          monto: c.adjudicado.monto,
          resolucion: c.adjudicado.resolucion
        }
      : null,
    cantidadDocumentos: (c.documentos ?? []).length,
    verificado: c.verificado ?? false
  }));
  escribir("contrataciones.json", { items: contratacionesExport, labels: labelsContrataciones });

  // === 7. BRECHAS DE TRANSPARENCIA ===
  const brechasExport = brechas.map((b) => ({
    id: b.id,
    modulo: b.modulo,
    titulo: b.titulo,
    descripcion: b.descripcion,
    categoria: b.categoria,
    estado: b.estado,
    fundamento: b.fundamento,
    fundamentoUrl: b.fundamentoUrl ?? null,
    detectadaEl: b.detectadaEl,
    publicacionParcialUrl: b.publicacionParcialUrl ?? null
  }));
  escribir("brechas.json", {
    items: brechasExport,
    labelEstado,
    labelCategoria
  });

  // === 8. MARCO NORMATIVO COMPLETO ===
  const marcoExport = {
    normas: marcoNormativoCompleto.map((n) => ({
      id: n.id,
      jerarquia: n.jerarquia,
      titulo: n.titulo,
      numero: n.numero,
      ambito: n.ambito,
      resumen: n.resumen,
      url: n.url,
      urlEs: n.urlEs,
      vigente: n.vigente,
      fetchedAt: n.fetchedAt,
      articulosClave: n.articulosClave ?? []
    })),
    limitacionesAccesoOrd1872
  };
  escribir("marco-normativo.json", marcoExport);

  // === 9. CATASTRO ===
  const catastroExport = {
    normas: normasCatastrales,
    oficina: oficinaCatastro,
    tramites: tramitesCatastrales
  };
  escribir("catastro.json", catastroExport);

  // === 10. ZONIFICACIÓN ===
  const zonificacionExport = {
    clasesSuelo,
    parcelasArt4,
    poligonosArea: poligonosArea.map((p) => ({
      area: p.area,
      nombre: p.nombre,
      referencia: p.referencia
    })),
    fuentes: {
      ordenanza2800: URL_ORD_2800,
      digestoConcejo: URL_DIGESTO_CONCEJO
    }
  };
  escribir("zonificacion.json", zonificacionExport);

  // === 11. LICENCIAS DE CONDUCIR ===
  const licenciasExport = {
    evolucion: evolucionLicencias,
    fuente: fuenteLicencias,
    etiquetas: etiquetaTipo,
    indicadores: indicadorDeQue
  };
  escribir("licencias.json", licenciasExport);

  // === 12. RECAUDACIÓN ===
  const recaudacionExport = {
    totales: totalesRecaudacion,
    recursos: recursos.map((r) => ({
      id: r.id,
      categoria: r.categoria,
      nombre: r.nombre,
      descripcion: r.descripcion,
      contraprestacion: r.contraprestacion ?? null,
      presupuestado: r.presupuestado,
      ejercicio: r.ejercicio,
      verificado: r.verificado,
      fuenteId: r.fuenteId
    })),
    labelsCategoria
  };
  escribir("recaudacion.json", recaudacionExport);

  // === META ===
  escribir("_meta.json", {
    generadoEn: new Date().toISOString(),
    fuentes: {
      funcionarios: "src/lib/data/personal.ts",
      presupuesto: "src/lib/data/presupuesto.ts",
      faq: "src/lib/whatsapp/data/faq.ts",
      concejo: "src/lib/data/concejo.ts",
      juzgado: "src/lib/data/juzgado.ts",
      contrataciones: "src/lib/data/contrataciones.ts",
      brechas: "src/lib/data/brechas.ts",
      marcoNormativo: "src/lib/data/marcoNormativo.ts",
      catastro: "src/lib/data/catastro.ts",
      zonificacion: "src/lib/data/zonificacion.ts",
      licencias: "src/lib/data/licencias.ts",
      recaudacion: "src/lib/data/recaudacion.ts"
    },
    conteos: {
      funcionarios: funcionariosExport.length,
      partidasPresupuesto: presupuestoExport.partidas.length,
      faq: faqExport.length,
      concejales: concejoExport.concejales.length,
      comisiones: concejoExport.comisiones.length,
      personalConcejo: concejoExport.personalConcejo.length,
      contrataciones: contratacionesExport.length,
      brechas: brechasExport.length,
      normasMarcoCompleto: marcoExport.normas.length,
      normasCatastrales: catastroExport.normas.length,
      clasesSuelo: zonificacionExport.clasesSuelo.length,
      tiposLicencia: Object.keys(licenciasExport.etiquetas).length,
      recursos: recaudacionExport.recursos.length
    }
  });

  console.log("\n[sincronizar] OK — exportados 12 rubros");
}

main();
