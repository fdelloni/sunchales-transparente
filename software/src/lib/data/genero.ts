/**
 * DISTRIBUCIÓN POR GÉNERO DEL PERSONAL MUNICIPAL — Sunchales.
 *
 * MÉTODO (verificado 2026-05-11):
 *
 *   El género NO figura en el PDF oficial de la nómina. Como el dato es
 *   relevante para evaluar paridad y segregación por sector (Ley 26.485
 *   art. 11 inc. 5; CEDAW), aplicamos inferencia desde el NOMBRE DE PILA
 *   con un diccionario de nombres argentinos comunes + heurística por
 *   terminación.
 *
 *   - Sobre 463 agentes activos (8 planta política + 260 planta
 *     permanente + 93 transitorios + 102 contratados), 462 se resolvieron
 *     automáticamente y 1 caso ambiguo ("RENE OLIVIO") se resolvió
 *     manualmente por el segundo nombre.
 *
 *   - La inferencia desde nombre tiene un margen de error documentado
 *     (~1-3 % en nombres claramente argentinos, mayor con apodos o nombres
 *     extranjeros). NO es dato oficial: es la mejor aproximación
 *     ciudadana hasta que la Municipalidad publique el dato real.
 *
 *   - Cualquier persona que se sienta mal representada por la inferencia
 *     puede solicitar corrección.
 *
 * Categorías incluidas (todas son empleados del municipio):
 *   1. Planta política (intendente + secretarios + subsecretarios).
 *   2. Planta permanente (modalidad "Planta Permanente" del PDF).
 *   3. Personal transitorio.
 *   4. Contratación de servicios.
 *
 * Excluimos los 10 agentes en "Retiro Especial" porque no prestan servicio
 * activo (cobran haber especial post-retiro).
 */

import { porSeccion, registrosPlanta, registrosTransitorios, registrosContratados } from "./nomina";
import { empleados } from "./personal";

export type Genero = "mujer" | "varon";

export const etiquetaGenero: Record<Genero, string> = {
  mujer: "Mujeres",
  varon: "Varones",
};

export type DistribucionSector = {
  seccion: string;
  totalAgentes: number;
  conteos: Partial<Record<Genero, number | null>>;
};

export type CategoriaVinculacionGenero =
  | "planta_politica"
  | "planta_permanente"
  | "transitorios"
  | "contratados";

export const etiquetaCategoria: Record<CategoriaVinculacionGenero, string> = {
  planta_politica: "Planta política",
  planta_permanente: "Planta Permanente",
  transitorios: "Personal Transitorio",
  contratados: "Contratación de Servicios",
};

export type DistribucionCategoria = {
  categoria: CategoriaVinculacionGenero;
  totalAgentes: number;
  totalPorGenero: Partial<Record<Genero, number | null>>;
  porSector: DistribucionSector[];
};

// =====================================================================
// INFERENCIA DINÁMICA DE GÉNERO (para planta política)
// =====================================================================
//
// Como los nombres de la planta política están en código (personal.ts),
// inferimos el género en runtime cuando se construye la distribución.
// Así, cuando se agreguen o quiten cargos, el cálculo se actualiza solo.
//
// Para las otras 3 categorías (planta permanente, transitorios, contratados)
// los nombres NO están en código (los borramos por privacidad), así que
// usamos los conteos pre-calculados desde la inferencia Python.

const NOMBRES_VARON = new Set([
  "PABLO","DANIEL","FABIAN","FERNANDO","JUAN","JAVIER","LUCIANO","LUIS",
  "JOSE","ROBERTO","CARLOS","MIGUEL","RICARDO","HECTOR","RAUL","JORGE",
  "MARIO","DIEGO","SANTIAGO","ALEJANDRO","FRANCO","MARTIN","SEBASTIAN",
  "GABRIEL","CRISTIAN","NICOLAS","HUGO","NORBERTO","WALTER","OSCAR",
  "MATIAS","RODRIGO","LUCAS","TOMAS","FACUNDO","JOAQUIN","MAURICIO",
  "EMANUEL","LEONARDO","HERNAN","GUSTAVO","CESAR","RAMON","DANTE",
  "ESTEBAN","AGUSTIN","RAFAEL","ARIEL","MARCELO","EZEQUIEL","ANGEL",
  "VICTOR","SERGIO","EDUARDO","ENRIQUE","RUBEN","DARIO","FRANCISCO",
  "ADRIAN","CLAUDIO","ELI","DAMIAN","GERMAN","MAURO","IGNACIO",
  "JESUS","NAHUEL","JONATAN","EMILIANO","BRUNO","BENJAMIN","ALAN",
  "GUILLERMO","ROMAN","ALBERTO","ARMANDO","ALDO","ADOLFO","GERARDO",
  "EDGARDO","JOSHUA","MAXIMILIANO","ABRAHAM","BENITO","ROMULO","RODOLFO",
  "AVELINO","ALCIDE","ALEXIS","ALDO","ANIBAL","BAUTISTA","CONRADO",
  "DAVID","DOMINGO","ELIAS","ENZO","ERIC","ERICO","ESTEFANO","EUGENIO",
  "FELIPE","FLAVIO","ISAAC","ISAIAS","IVAN","JACINTO","JOSE LUIS",
  "JONATHAN","LAUTARO","LEANDRO","LEONEL","LIONEL","LISANDRO","LORENZO",
  "MANUEL","MARCO","MARCOS","MATEO","MIJAIL","MILTON","MOISES","NESTOR",
  "OMAR","OSVALDO","PATRICIO","PAULO","PEDRO","RAMIRO","RENATO",
  "SAMUEL","SANTINO","SAUL","SIMON","TADEO","TIAGO","TULIO","ULISES",
  "VALENTIN","VICENTE","YAMIL","ALFONSO","ALVARO","AMERICO","ANTONIO",
  "ARTURO","ATILIO","AUGUSTO","AXEL","CIRO",
]);

const NOMBRES_MUJER = new Set([
  "ANDREA","LUCIA","VANESA","LUCIANA","ELISA","DANIELA","MARIA",
  "MARILINA","CECILIA","MAGALI","CAROLINA","FABRINA","SILVIA","NATALIA",
  "ADRIANA","SOFIA","VALERIA","ANALIA","CAMILA","ALEJANDRA","LAURA",
  "CRISTINA","SUSANA","MONICA","MARTA","ROSA","BLANCA","ANA",
  "MARIANA","MARIANELA","MARIELA","MARICEL","MARIA EUGENIA","MIRIAM",
  "PATRICIA","VERONICA","VIVIANA","JUANA","ISABEL","ELENA","TERESA",
  "MELINA","MELISA","MICAELA","NOELIA","PAOLA","MARINA","ROCIO",
  "ROMINA","SABRINA","SOLEDAD","TAMARA","VICTORIA","YANINA","YESICA",
  "BELEN","BEATRIZ","CECILIA","CINTIA","ELIANA","ESTELA","ESTER",
  "EVA","FABIANA","FLORENCIA","FRANCESCA","GABRIELA","GISELA","GISELLE",
  "GRACIELA","GUADALUPE","GUILLERMINA","IVANA","JESSICA","JESICA",
  "JIMENA","JULIA","JULIANA","JULIETA","KARINA","KAREN","LEILA",
  "LILIANA","LORENA","LOURDES","LUCRECIA","LUDMILA","LUISA","LUISINA",
  "MABEL","MAGDALENA","MARCELA","MARGARITA","MARISA","MARISOL","MAGALI",
  "MILAGROS","MIRTA","MIRTHA","NANCY","NATIVIDAD","NIDIA","NIEVES",
  "NILDA","NIRVIA","NOEMI","NORA","NORMA","OFELIA","OLGA","OLIVIA",
  "ORIANA","PALMIRA","PAULA","PERLA","RAFAELA","RAMONA","RAQUEL",
  "REBECA","REGINA","RITA","ROMELIA","ROSARIO","RUTH","SAMANTA",
  "SAMANTHA","SANDRA","SARA","SHIRLEY","SHIRLI","SILVANA","SOL",
  "SOLANGE","SOLANA","SONIA","SORAYA","STEFANIA","STELLA","TANIA",
  "TATIANA","TELMA","TRINIDAD","ZAIRA","ZULEMA","ZULMA","WANDA",
  "XIMENA","YAEL","YAMILA","YAZMIN","YESMIN","YOHANA","YOLANDA",
  "ABRIL","ADELINA","AGOSTINA","AGUSTINA","AILEN","AYELEN","AYLEN",
  "AZUL","ANGELES","ANGELINA","ANTONELLA","ANTONELA","ARACELI",
  "AZUCENA","BARBARA","BETIANA","BIANCA","BRENDA","BRISA","CANDELA",
  "CARLA","CATALINA","CELESTE","CELINA","CLAUDIA","CONSTANZA","CORINA",
  "DAIANA","DALMA","DELFINA","DIANA","DIANELA","DOLORES","EDITH",
  "ELBA","ELISA","ELISABET","ELOISA","EMILIA","EMMA","ESPERANZA",
  "ESTEFANIA","ETELVINA","EUGENIA","EVELIN","EVELYN","FATIMA","FELICIANA",
  "FELISA","FLAVIA","FLOR","HEBE","HILDA","HORTENSIA","INES","INGRID",
  "IRENE","IRIS","ITATI","IVONNE","JANINA","JESSI","JOHANA","JOSEFA",
  "JOSEFINA","JOYCE","KARLA","LAILA","LEONOR","LETICIA","LIA",
  "LIBERTAD","LINA","LIVIA","LOLA","LUNA","LUZ","LYDIA","MAIRA",
  "MALENA","MARA","MARLEN","MARLENE","MATILDE","MELANI","MELANIE",
  "MERCEDES","MOIRA","MORENA","NADIA","NAOMI","NICOLE","NOEMI",
  "NORA","NURIA","PAMELA","PAULINA","PETRONA","PIA","PILAR","RENEE",
  "ROSALIA","ROSALINA","ROSALINDA","ROSANA","ROSAURA","ROSITA","RUBI",
]);

/**
 * Infiere género desde el nombre completo. Toma el primer nombre relevante,
 * busca en diccionario y, en su defecto, aplica heurística por terminación.
 * Devuelve null cuando no puede decidir.
 */
function inferirGenero(apellidoNombre: string): Genero | null {
  // Quitar tildes y pasar a mayúsculas
  const norm = apellidoNombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
  // Separar "Apellido, Nombre" o "Apellido Nombre"
  let nombresParte: string;
  if (norm.includes(",")) {
    nombresParte = norm.split(",")[1].trim();
  } else {
    const tokens = norm.split(/\s+/);
    nombresParte = tokens.slice(1).join(" ");
  }
  // Primer nombre que tenga sentido (más de 2 letras y no termine en punto)
  const palabras = nombresParte.split(/\s+/).filter((p) => p.length > 1 && !p.endsWith("."));
  if (palabras.length === 0) return null;
  const primer = palabras[0].replace(/\./g, "");

  // Compuestos típicos
  // María Eugenia / María José / María de... → mujer si arranca con MARIA
  if (primer === "MARIA") return "mujer";
  // José María / José Luis / etc. → varón si arranca con JOSE
  if (primer === "JOSE") return "varon";
  // Juan Cruz / Juan Carlos → varón
  if (primer === "JUAN") return "varon";
  // Ana María → mujer
  if (primer === "ANA") return "mujer";

  if (NOMBRES_VARON.has(primer)) return "varon";
  if (NOMBRES_MUJER.has(primer)) return "mujer";

  // Heurística por terminación
  if (primer.endsWith("A")) return "mujer";
  if (primer.endsWith("O")) return "varon";
  if (/[LRNSDZTXY]$/.test(primer)) return "varon"; // mayoría masculino terminado en consonante

  return null;
}

// =====================================================================
// CONTEOS PRE-CALCULADOS (categorías sin nombres en código)
// =====================================================================

const CONTEOS: Record<
  Exclude<CategoriaVinculacionGenero, "planta_politica">,
  Record<string, { mujer: number; varon: number }>
> = {
  planta_permanente: {
    "OBRAS Y SERV. PÚBLICOS": { mujer: 8, varon: 85 },
    "HACIENDA Y FINANZAS": { mujer: 12, varon: 4 },
    "GOBIERNO": { mujer: 29, varon: 2 },
    "ECON. SOCIAL Y SOLID.": { mujer: 6, varon: 5 },
    "SEGURIDAD CIUD. Y CONV.": { mujer: 17, varon: 15 },
    "CULTURA Y EDUCACIÓN": { mujer: 32, varon: 3 },
    "AMBIENTE Y ACCIÓN CLIM.": { mujer: 5, varon: 14 },
    "PROMOCIÓN DE DERECHOS": { mujer: 12, varon: 3 },
    "DESARROLLO ECON. Y PROD.": { mujer: 5, varon: 3 },
  },
  transitorios: {
    "OBRAS Y SERV. PÚBLICOS": { mujer: 10, varon: 33 },
    "GOBIERNO": { mujer: 10, varon: 2 },
    "CULTURA Y EDUCACIÓN": { mujer: 9, varon: 0 },
    "SEGURIDAD CIUD. Y CONV.": { mujer: 4, varon: 3 },
    "HACIENDA Y FINANZAS": { mujer: 2, varon: 4 },
    "PROMOCIÓN DE DERECHOS": { mujer: 6, varon: 0 },
    "ECON. SOCIAL Y SOLID.": { mujer: 2, varon: 2 },
    "AMBIENTE Y ACCIÓN CLIM.": { mujer: 1, varon: 2 },
    "DESARROLLO ECON. Y PROD.": { mujer: 1, varon: 0 },
    "PRODUCCION Y EMPLEO": { mujer: 2, varon: 0 },
  },
  contratados: {
    "PRODUCCIÓN Y FINANZAS": { mujer: 6, varon: 5 },
    "DES. HUMANO Y PROM. DE DER.": { mujer: 49, varon: 20 },
    "GOBIERNO": { mujer: 6, varon: 5 },
    "GEST AMBIENTAL Y TERR.": { mujer: 5, varon: 6 },
  },
};

// =====================================================================
// CONSTRUCCIÓN DE LA DISTRIBUCIÓN
// =====================================================================

function construirCategoriaPDF(
  categoria: Exclude<CategoriaVinculacionGenero, "planta_politica">,
  registros: typeof registrosPlanta
): DistribucionCategoria {
  const sectores = porSeccion(registros);
  const conteosCat = CONTEOS[categoria];
  let totM = 0,
    totV = 0;
  const porSectorList: DistribucionSector[] = sectores.map((s) => {
    const c = conteosCat[s.seccion];
    if (c) {
      totM += c.mujer;
      totV += c.varon;
    }
    return {
      seccion: s.seccion,
      totalAgentes: s.cantidad,
      conteos: c
        ? { mujer: c.mujer, varon: c.varon }
        : { mujer: null, varon: null },
    };
  });
  return {
    categoria,
    totalAgentes: registros.length,
    totalPorGenero: { mujer: totM, varon: totV },
    porSector: porSectorList,
  };
}

function construirCategoriaPolitica(): DistribucionCategoria {
  // Inferimos género agente por agente y agrupamos por área del organigrama.
  // Así, cuando se agregue/quite un cargo en personal.ts, el cálculo se
  // actualiza automáticamente sin tocar genero.ts.
  const porArea = new Map<
    string,
    { total: number; mujer: number; varon: number }
  >();
  let totM = 0,
    totV = 0;
  for (const e of empleados) {
    const slot = porArea.get(e.area) ?? { total: 0, mujer: 0, varon: 0 };
    slot.total += 1;
    const g = inferirGenero(e.apellidoNombre);
    if (g === "mujer") {
      slot.mujer += 1;
      totM += 1;
    } else if (g === "varon") {
      slot.varon += 1;
      totV += 1;
    }
    porArea.set(e.area, slot);
  }
  const porSectorList: DistribucionSector[] = Array.from(porArea.entries())
    .map(([seccion, s]) => ({
      seccion,
      totalAgentes: s.total,
      conteos: { mujer: s.mujer, varon: s.varon },
    }))
    .sort((a, b) => b.totalAgentes - a.totalAgentes);
  return {
    categoria: "planta_politica",
    totalAgentes: empleados.length,
    totalPorGenero: { mujer: totM, varon: totV },
    porSector: porSectorList,
  };
}

export const distribucionPersonalActual: DistribucionCategoria[] = [
  construirCategoriaPolitica(),
  construirCategoriaPDF(
    "planta_permanente",
    registrosPlanta.filter((r) => r.modalidad === "Planta Permanente")
  ),
  construirCategoriaPDF("transitorios", registrosTransitorios),
  construirCategoriaPDF("contratados", registrosContratados),
];

export const fuenteGenero = {
  periodoReferencia: "Abril 2026",
  metodo: "inferencia_desde_nombre",
  notaMetodologica:
    "El género NO figura en los PDFs oficiales del municipio. Esta sección lo infiere a partir del nombre de pila con un diccionario de nombres argentinos y heurística por terminación. Sobre 463 agentes activos, 462 se resolvieron automáticamente y 1 caso ambiguo fue revisado manualmente. El margen de error esperado es del 1-3 % en nombres claramente argentinos. NO es dato oficial: es la mejor aproximación ciudadana hasta que la Municipalidad publique el dato real.",
  fundamentoPublicacion:
    "Ordenanza Sunchales 1872/2009 (acceso a la información pública municipal) · Ley 26.485 art. 11 inc. 5 (estadísticas con perspectiva de género en organismos públicos) · CEDAW (jerarquía constitucional, CN art. 75 inc. 22).",
} as const;

/** ¿Hay al menos un valor de género publicado? */
export function tieneDatosGenero(): boolean {
  return distribucionPersonalActual.some((c) =>
    Object.values(c.totalPorGenero).some((v) => v != null && v > 0)
  );
}

/** Suma total del plantel actual (denominador del gráfico agregado). */
export function totalPlantel(): number {
  return distribucionPersonalActual.reduce(
    (acc, c) => acc + c.totalAgentes,
    0
  );
}
