#!/usr/bin/env node
/**
 * Verificaciones automatizadas sobre URLs oficiales del municipio y del Concejo
 * que el informe AUDITORIA-sunchales-gob-ar-2026-05-12.md marcó como "a verificar".
 *
 * Tres verificaciones independientes, cada una con política de honestidad propia:
 *
 *   1) CONCEJALES ACTUALES — concejosunchales.gob.ar/concejales-actuales.aspx
 *      Detecta si la página refleja la composición post-jura del 03-mar-2026
 *      (Delmastro, Nicolau, Cattaneo, Astor, Torriri, Balduino) o si todavía
 *      lista a los concejales que cesaron (Giusti, Dobler, Ghiano).
 *
 *   2) BOLETÍN OFICIAL MUNICIPAL — 3 plataformas en paralelo:
 *        - sunchales.gob.ar/boletines-oficiales (Drupal legacy)
 *        - sunchales.miportal.ar/digesto (plataforma externa)
 *        - boletinoficial.sunchales.gob.ar (subdominio legacy)
 *      Detecta cuál es el último mes/año mencionado en el HTML servido.
 *
 *   3) FARMACIAS DE TURNO — sunchales.gob.ar/farmacias-de-turno/
 *      Detecta cuáles meses del año en curso tienen cronograma publicado.
 *
 * Salida única:
 *   src/lib/data/verificaciones-auditoria.generated.ts
 *
 * Política de honestidad (estricta):
 *   - Si una URL devuelve 4xx/5xx o timeout: resultado = "error" + razón.
 *   - Si una URL devuelve 200 pero no se puede parsear lo buscado: resultado =
 *     "indeterminado" y hallazgo explícito (no se infiere).
 *   - Nunca se inventan fechas ni nombres: si no están en el HTML, no se ponen.
 *   - El campo `resultado` sólo afirma "desactualizado" si la evidencia textual
 *     del HTML lo prueba (no se asume).
 *
 * Uso:
 *   npm run verificar-brechas-auditoria
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RUTA_TS = path.join(
  RAIZ,
  "src",
  "lib",
  "data",
  "verificaciones-auditoria.generated.ts"
);

const USER_AGENT =
  "Mozilla/5.0 (Sunchales Transparente · verificador público) AppleWebKit/537.36";

const TIMEOUT_MS = 20_000;

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "setiembre", "octubre",
  "noviembre", "diciembre",
];

const MES_A_NUMERO = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
  noviembre: 11, diciembre: 12,
};

/** Concejales actuales esperados tras la jura del 03-mar-2026 (período activo). */
const CONCEJALES_VIGENTES = [
  "Delmastro",
  "Nicolau",
  "Cattaneo",
  "Astor",
  "Torriri",
  "Balduino",
];

/** Concejales que cesaron mandato el 03-mar-2026 y NO deberían figurar como vigentes. */
const CONCEJALES_CESADOS = ["Giusti", "Dobler", "Ghiano"];

/**
 * Fetch con timeout y headers normalizados. No tira: devuelve estado y body.
 */
async function fetchSeguro(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: ctrl.signal,
    });
    const html = await res.text();
    return { ok: res.ok, status: res.status, statusText: res.statusText, html };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      statusText: err?.name === "AbortError" ? "timeout" : String(err?.message ?? err),
      html: "",
    };
  } finally {
    clearTimeout(t);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// VERIFICACIÓN 1: CONCEJALES ACTUALES
// ────────────────────────────────────────────────────────────────────────────

async function verificarConcejales() {
  const url = "https://concejosunchales.gob.ar/concejales-actuales.aspx";
  const r = await fetchSeguro(url);
  const hallazgos = [];
  const meta = { concejalesVigentesDetectados: [], concejalesCesadosDetectados: [] };

  if (!r.ok) {
    return {
      id: "concejales-actuales",
      brechaIdRelacionada: "con-cv-concejales-incompletos",
      url,
      estadoHttp: r.status,
      fechaVerificacion: new Date().toISOString(),
      resultado: "error",
      hallazgos: [
        `No se pudo acceder a la página: HTTP ${r.status} ${r.statusText}.`,
      ],
      meta,
    };
  }

  const html = r.html.toLowerCase();

  for (const apellido of CONCEJALES_VIGENTES) {
    if (html.includes(apellido.toLowerCase())) {
      meta.concejalesVigentesDetectados.push(apellido);
    }
  }
  for (const apellido of CONCEJALES_CESADOS) {
    if (html.includes(apellido.toLowerCase())) {
      meta.concejalesCesadosDetectados.push(apellido);
    }
  }

  const cuentaVigentes = meta.concejalesVigentesDetectados.length;
  const cuentaCesados = meta.concejalesCesadosDetectados.length;

  hallazgos.push(
    `${cuentaVigentes} de ${CONCEJALES_VIGENTES.length} apellidos vigentes detectados en el HTML: ${meta.concejalesVigentesDetectados.join(", ") || "ninguno"}.`
  );
  hallazgos.push(
    `${cuentaCesados} de ${CONCEJALES_CESADOS.length} apellidos cesados todavía aparecen en el HTML: ${meta.concejalesCesadosDetectados.join(", ") || "ninguno"}.`
  );

  // Lógica del veredicto:
  //   - "ok" sólo si están los 6 vigentes Y no quedan cesados (o están explícitamente
  //      etiquetados como "anteriores"/"saliente" — heurística simple).
  //   - "desactualizado" si quedan cesados visibles sin contexto de "anteriores".
  //   - "indeterminado" en cualquier otro caso.
  let resultado = "indeterminado";

  if (cuentaCesados > 0) {
    // Verifico si los cesados aparecen junto a la palabra "anteriores" o "saliente"
    // dentro de los primeros 200 caracteres alrededor del apellido.
    let contextoAnterior = true;
    for (const apellido of meta.concejalesCesadosDetectados) {
      const idx = html.indexOf(apellido.toLowerCase());
      const ventana = html.slice(Math.max(0, idx - 200), idx + 200);
      if (!/anterior|saliente|cesad|finalizado|anteriormente/i.test(ventana)) {
        contextoAnterior = false;
        break;
      }
    }
    if (!contextoAnterior) {
      resultado = "desactualizado";
      hallazgos.push(
        "Al menos un apellido cesado aparece SIN contexto de 'anteriores/saliente' cerca: la página probablemente no refleja la jura del 03-mar-2026."
      );
    }
  }

  if (cuentaVigentes === CONCEJALES_VIGENTES.length && cuentaCesados === 0) {
    resultado = "ok";
    hallazgos.push(
      "Los 6 apellidos vigentes aparecen y ningún cesado figura: composición consistente con jura 03-mar-2026."
    );
  }

  return {
    id: "concejales-actuales",
    brechaIdRelacionada: "con-cv-concejales-incompletos",
    url,
    estadoHttp: r.status,
    fechaVerificacion: new Date().toISOString(),
    resultado,
    hallazgos,
    meta,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// VERIFICACIÓN 2: BOLETÍN OFICIAL (3 plataformas)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extrae todos los pares (mes, año) del texto, devolviendo el más reciente.
 * Soporta "abril de 2025", "Abril 2025", "boletin_completo_abril_2025.pdf",
 * "boletin-oficial-ndeg-39-fecha-publicacion-mayo-2024", etc.
 * Retorna null si no encuentra ningún par.
 */
function ultimoMesAnioEn(texto) {
  const t = texto.toLowerCase();
  const pares = [];
  for (const mes of MESES) {
    const re = new RegExp(
      `${mes}[^a-z0-9]{0,8}(?:de[^a-z0-9]{0,3})?(20\\d{2})`,
      "g"
    );
    let m;
    while ((m = re.exec(t)) !== null) {
      pares.push({ mes: MES_A_NUMERO[mes], anio: Number(m[1]) });
    }
  }
  if (pares.length === 0) return null;
  pares.sort((a, b) => (b.anio - a.anio) || (b.mes - a.mes));
  return pares[0];
}

async function verificarUnaPlataformaBO(id, url) {
  const r = await fetchSeguro(url);
  if (!r.ok) {
    return {
      plataforma: id,
      url,
      estadoHttp: r.status,
      estado: "error",
      razon: `HTTP ${r.status} ${r.statusText}`,
      ultimoMesAnio: null,
    };
  }
  const ultimo = ultimoMesAnioEn(r.html);
  return {
    plataforma: id,
    url,
    estadoHttp: r.status,
    estado: ultimo ? "ok" : "indeterminado",
    razon: ultimo
      ? `Último mes/año mencionado en HTML: ${MESES[ultimo.mes - 1]} de ${ultimo.anio}.`
      : "No se encontró ningún par (mes, año) parseable en el HTML.",
    ultimoMesAnio: ultimo,
  };
}

async function verificarBoletinOficial() {
  const plataformas = [
    { id: "drupal-legacy", url: "https://sunchales.gob.ar/boletines-oficiales" },
    { id: "miportal", url: "https://sunchales.miportal.ar/digesto" },
    { id: "subdominio", url: "https://boletinoficial.sunchales.gob.ar/" },
  ];

  const resultadosPorPlataforma = [];
  for (const p of plataformas) {
    // Secuencial a propósito para no martillar al servidor en la misma ráfaga.
    resultadosPorPlataforma.push(await verificarUnaPlataformaBO(p.id, p.url));
  }

  const hallazgos = [];
  let masReciente = null;
  for (const p of resultadosPorPlataforma) {
    hallazgos.push(`[${p.plataforma}] ${p.razon} (HTTP ${p.estadoHttp})`);
    if (p.ultimoMesAnio) {
      if (
        !masReciente ||
        p.ultimoMesAnio.anio > masReciente.anio ||
        (p.ultimoMesAnio.anio === masReciente.anio && p.ultimoMesAnio.mes > masReciente.mes)
      ) {
        masReciente = { ...p.ultimoMesAnio, plataforma: p.plataforma };
      }
    }
  }

  // Veredicto: si la más reciente está a >= 3 meses del mes en curso → desactualizado.
  const ahora = new Date();
  const anioActual = ahora.getUTCFullYear();
  const mesActual = ahora.getUTCMonth() + 1;
  let resultado = "indeterminado";
  if (masReciente) {
    const distanciaMeses =
      (anioActual - masReciente.anio) * 12 + (mesActual - masReciente.mes);
    hallazgos.push(
      `Más reciente entre plataformas: ${MESES[masReciente.mes - 1]} de ${masReciente.anio} (${masReciente.plataforma}). Distancia al mes en curso: ${distanciaMeses} meses.`
    );
    if (distanciaMeses >= 3) resultado = "desactualizado";
    else if (distanciaMeses <= 1) resultado = "ok";
    else resultado = "indeterminado";
  } else {
    hallazgos.push(
      "Ninguna de las 3 plataformas devolvió HTML con par (mes, año) parseable."
    );
  }

  return {
    id: "boletin-oficial",
    brechaIdRelacionada: "pre-boletin-oficial-municipal",
    url: plataformas.map((p) => p.url).join(" | "),
    estadoHttp: resultadosPorPlataforma[0]?.estadoHttp ?? 0,
    fechaVerificacion: new Date().toISOString(),
    resultado,
    hallazgos,
    meta: { plataformas: resultadosPorPlataforma, masReciente },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// VERIFICACIÓN 3: FARMACIAS DE TURNO
// ────────────────────────────────────────────────────────────────────────────

async function verificarFarmaciasDeTurno() {
  const url = "https://sunchales.gob.ar/farmacias-de-turno/";
  const r = await fetchSeguro(url);
  const hallazgos = [];

  if (!r.ok) {
    return {
      id: "farmacias-turno",
      brechaIdRelacionada: "sal-farmacias-turno-desactualizado",
      url,
      estadoHttp: r.status,
      fechaVerificacion: new Date().toISOString(),
      resultado: "error",
      hallazgos: [`No se pudo acceder a la página: HTTP ${r.status} ${r.statusText}.`],
      meta: {},
    };
  }

  // Detectamos referencias a meses dentro de URLs de imágenes (Enero-2.png, etc.)
  // y dentro del texto HTML. Sólo nos interesan meses del año en curso.
  const ahora = new Date();
  const anioActual = ahora.getUTCFullYear();
  const mesActual = ahora.getUTCMonth() + 1;

  const html = r.html;
  const mesesDetectados = new Set();

  // Patrón 1: filename con mes capitalizado y sufijo (Enero-2.png, Abril.png, etc.)
  for (let i = 0; i < MESES.length; i++) {
    const mes = MESES[i];
    const reFilename = new RegExp(
      `${mes.charAt(0).toUpperCase() + mes.slice(1)}[-_.]?\\d*\\.(png|jpg|jpeg|webp)`,
      "i"
    );
    if (reFilename.test(html)) {
      mesesDetectados.add(MES_A_NUMERO[mes]);
    }
  }

  // Patrón 2: mención textual del mes en el texto visible.
  const textoMinus = html.toLowerCase();
  for (const mes of MESES) {
    if (textoMinus.includes(mes)) {
      mesesDetectados.add(MES_A_NUMERO[mes]);
    }
  }

  const mesesDelAnioActual = [...mesesDetectados].sort((a, b) => a - b);
  // Heurística: el último mes referenciado en URLs de imágenes con sufijo de año
  // actual o reciente probablemente es el último cronograma publicado.
  // Para mayor precisión, buscamos URLs de uploads con año/mes y mes textual.
  const reUploads = new RegExp(
    `wp-content/uploads/(20\\d{2})/(\\d{2})/([A-Za-zÁÉÍÓÚáéíóú]+)`,
    "g"
  );
  const subidas = [];
  let m;
  while ((m = reUploads.exec(html)) !== null) {
    const anioSubida = Number(m[1]);
    const mesSubidaNum = Number(m[2]);
    const filenameMes = m[3].toLowerCase();
    const mesFilenameNum = MES_A_NUMERO[filenameMes] ?? null;
    if (mesFilenameNum) {
      subidas.push({ anioSubida, mesSubida: mesSubidaNum, anioCronograma: anioSubida, mesCronograma: mesFilenameNum });
    }
  }

  // El cronograma más reciente: max(anioCronograma, mesCronograma).
  let mesCronogramaMasReciente = null;
  for (const s of subidas) {
    if (
      !mesCronogramaMasReciente ||
      s.anioCronograma > mesCronogramaMasReciente.anio ||
      (s.anioCronograma === mesCronogramaMasReciente.anio &&
        s.mesCronograma > mesCronogramaMasReciente.mes)
    ) {
      mesCronogramaMasReciente = { anio: s.anioCronograma, mes: s.mesCronograma };
    }
  }

  hallazgos.push(
    `Meses mencionados en la página: ${mesesDelAnioActual.map((m) => MESES[m - 1]).join(", ") || "ninguno"}.`
  );
  if (mesCronogramaMasReciente) {
    hallazgos.push(
      `Cronograma más reciente identificable por filename de imagen subida: ${MESES[mesCronogramaMasReciente.mes - 1]} de ${mesCronogramaMasReciente.anio}.`
    );
  } else {
    hallazgos.push(
      "No se pudo identificar el mes del cronograma más reciente desde URLs de imágenes."
    );
  }

  let resultado = "indeterminado";
  if (mesCronogramaMasReciente) {
    if (
      mesCronogramaMasReciente.anio === anioActual &&
      mesCronogramaMasReciente.mes >= mesActual
    ) {
      resultado = "ok";
      hallazgos.push("El cronograma cubre el mes en curso o un mes futuro.");
    } else {
      const distancia =
        (anioActual - mesCronogramaMasReciente.anio) * 12 +
        (mesActual - mesCronogramaMasReciente.mes);
      resultado = "desactualizado";
      hallazgos.push(
        `El cronograma más reciente publicado está ${distancia} mes(es) por detrás del mes en curso.`
      );
    }
  }

  return {
    id: "farmacias-turno",
    brechaIdRelacionada: "sal-farmacias-turno-desactualizado",
    url,
    estadoHttp: r.status,
    fechaVerificacion: new Date().toISOString(),
    resultado,
    hallazgos,
    meta: {
      mesActual: { anio: anioActual, mes: mesActual },
      cronogramaMasReciente: mesCronogramaMasReciente,
      mesesDetectadosEnPagina: mesesDelAnioActual,
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("→ Verificando 3 brechas marcadas como 'a verificar' por la auditoría 2026-05-12...");

  const resultados = [];
  resultados.push(await verificarConcejales());
  console.log(
    `  [concejales-actuales] resultado: ${resultados[0].resultado}`
  );
  resultados.push(await verificarBoletinOficial());
  console.log(`  [boletin-oficial]      resultado: ${resultados[1].resultado}`);
  resultados.push(await verificarFarmaciasDeTurno());
  console.log(`  [farmacias-turno]      resultado: ${resultados[2].resultado}`);

  const ahora = new Date().toISOString();
  const ts = `// AUTO-GENERADO por scripts/verificar-brechas-auditoria.mjs
// NO EDITAR A MANO. Para regenerar: npm run verificar-brechas-auditoria
//
// Tres verificaciones automatizadas sobre URLs oficiales marcadas por la
// auditoría manual del 2026-05-12 como "a verificar":
//   1) Concejo: ¿la página de concejales actuales refleja la jura del 03-mar-2026?
//   2) Boletín Oficial: ¿cuál es el último mes publicado en las 3 plataformas?
//   3) Farmacias de turno: ¿hay cronograma para el mes en curso?
//
// Última sincronización: ${ahora}
//
// Política de honestidad: si una verificación no puede determinar el estado
// con evidencia textual del HTML servido, el resultado es "indeterminado"
// (no "ok"). Se prefiere honestidad informativa a falsa precisión.

export type ResultadoVerificacion =
  | "ok"
  | "alerta"
  | "desactualizado"
  | "indeterminado"
  | "error";

export type VerificacionAuditoria = {
  /** Identificador estable de la verificación. */
  id: string;
  /** ID de la brecha del dataset \`brechas\` con la que se correlaciona. */
  brechaIdRelacionada?: string;
  /** URL(s) verificada(s). Para verificación multi-URL, separadas por " | ". */
  url: string;
  /** Código HTTP del primer fetch (0 si timeout/red). */
  estadoHttp: number;
  /** Fecha-hora ISO de la verificación. */
  fechaVerificacion: string;
  /** Veredicto categórico. */
  resultado: ResultadoVerificacion;
  /** Hallazgos textuales concretos, sin parafraseo. */
  hallazgos: string[];
  /** Metadata estructurada adicional (composición detectada, plataformas, etc.). */
  meta: Record<string, unknown>;
};

export const verificacionesAuditoria: VerificacionAuditoria[] = ${JSON.stringify(
    resultados,
    null,
    2
  )};

export const verificacionesAuditoriaMeta = {
  sincronizadoEl: ${JSON.stringify(ahora)},
  total: ${resultados.length},
  resultadosPorTipo: {
    ok: ${resultados.filter((r) => r.resultado === "ok").length},
    desactualizado: ${resultados.filter((r) => r.resultado === "desactualizado").length},
    indeterminado: ${resultados.filter((r) => r.resultado === "indeterminado").length},
    error: ${resultados.filter((r) => r.resultado === "error").length},
  },
} as const;

/** Búsqueda por id de la verificación correlacionada a una brecha. */
export function verificacionPorBrechaId(
  brechaId: string
): VerificacionAuditoria | undefined {
  return verificacionesAuditoria.find(
    (v) => v.brechaIdRelacionada === brechaId
  );
}
`;

  await writeFile(RUTA_TS, ts, "utf8");
  console.log("✓ Escrito:", path.relative(RAIZ, RUTA_TS));
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
