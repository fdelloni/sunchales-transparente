/**
 * Contrataciones — Licitaciones públicas, privadas, concursos de precios
 * y contrataciones directas de la Municipalidad de Sunchales.
 *
 * IMPORTANTE — Honestidad de datos:
 *
 *   - Los procedimientos de contratación, sus tipos y umbrales se basan en
 *     el marco normativo provincial vigente (Ley N.º 12.510 y modificatorias)
 *     y la práctica habitual del régimen municipal santafesino.
 *
 *   - Los CASOS individuales aquí listados son EJEMPLOS DEMOSTRATIVOS para
 *     ilustrar el funcionamiento del módulo. Están etiquetados con
 *     `verificado: false` y se reemplazarán por los expedientes reales del
 *     municipio en cuanto se conecte la fuente oficial.
 *
 *   - Cada contratación trae una cadena de eventos (hash-chain) que cualquier
 *     ciudadano puede recalcular y verificar offline (ver lib/hashchain.ts).
 */

import type { Evento } from "@/lib/hashchain";

export type ProcedimientoTipo =
  | "licitacion_publica"
  | "licitacion_privada"
  | "concurso_precios"
  | "contratacion_directa";

export type EstadoContratacion =
  | "preparacion"
  | "convocatoria"
  | "apertura"
  | "evaluacion"
  | "adjudicacion"
  | "ejecucion"
  | "ampliacion"
  | "cierre"
  | "desierta"
  | "fracasada"
  | "cancelada";

export type Categoria =
  | "obra_publica"
  | "bienes"
  | "servicios"
  | "consultoria"
  | "alquileres"
  | "informatica";

export type Oferente = {
  cuit: string;
  razonSocial: string;
  monto: number;
  observaciones?: string;
};

export type Documento = {
  nombre: string;
  tipo: "pliego" | "circular" | "oferta" | "acta" | "resolucion" | "factura" | "informe";
  publicado: string; // ISO date
  hashSha256: string; // hash del archivo (los archivos no se publican en esta demo)
  bytes: number;
};

export type Contratacion = {
  id: string;
  expediente: string;
  ejercicio: number;
  procedimiento: ProcedimientoTipo;
  numero: string;
  objeto: string;
  categoria: Categoria;
  area: string;
  presupuestoOficial: number;
  estado: EstadoContratacion;
  fechaApertura: string | null;
  fechaAdjudicacion: string | null;
  oferentes: Oferente[];
  adjudicado?: { cuit: string; razonSocial: string; monto: number; resolucion: string };
  ampliaciones?: { fecha: string; monto: number; resolucion: string }[];
  pagos?: { fecha: string; monto: number; orden: string }[];
  documentos: Documento[];
  /** Cadena hash-chain. Se sella en runtime; al cargar el módulo está vacía y
   *  se completa con `getContratacionesSelladas()`. */
  cadenaSinSellar: Array<Omit<Evento, "hashPrevio" | "hash">>;
  verificado: boolean;
  fuenteId: string;
};

/* =========================================================================
 *  Casos demostrativos — etiquetados verificado=false
 *  ========================================================================= */

const ahora = new Date();
const dia = (n: number) => {
  const d = new Date(ahora);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString();
};

export const contrataciones: Contratacion[] = [
  // ---- 1. Licitación Pública: Pavimento (alineado con anuncio público de POU 2026 ~$1.000M) ----
  {
    id: "lp-2026-001",
    expediente: "EX-2026-001/SG",
    ejercicio: 2026,
    procedimiento: "licitacion_publica",
    numero: "LP N.º 01/2026",
    objeto: "Pavimento urbano — Plan POU 2026, sectores barrio Norte y barrio Sur",
    categoria: "obra_publica",
    area: "Subsecretaría de Infraestructura Urbana y Rural",
    presupuestoOficial: 1_000_000_000,
    estado: "ejecucion",
    fechaApertura: dia(-45),
    fechaAdjudicacion: dia(-25),
    oferentes: [
      { cuit: "30-71234567-8", razonSocial: "Vialidad del Centro S.A.", monto: 985_400_000 },
      { cuit: "30-69876543-2", razonSocial: "Constructora Castellanos SRL", monto: 998_700_000 },
      { cuit: "30-66789012-1", razonSocial: "Pavimentos Litoral S.A.", monto: 1_012_300_000, observaciones: "Oferta superior al presupuesto oficial." }
    ],
    adjudicado: {
      cuit: "30-71234567-8",
      razonSocial: "Vialidad del Centro S.A.",
      monto: 985_400_000,
      resolucion: "Resolución DEM N.º 142/2026"
    },
    pagos: [
      { fecha: dia(-15), monto: 197_080_000, orden: "OP N.º 220/2026" }
    ],
    documentos: [
      { nombre: "Pliego de Bases y Condiciones Particulares", tipo: "pliego", publicado: dia(-75), hashSha256: "demo_hash_pliego_001", bytes: 482310 },
      { nombre: "Acta de Apertura de Ofertas", tipo: "acta", publicado: dia(-45), hashSha256: "demo_hash_acta_001", bytes: 96412 },
      { nombre: "Resolución de Adjudicación 142/2026", tipo: "resolucion", publicado: dia(-25), hashSha256: "demo_hash_res_142_2026", bytes: 88241 }
    ],
    cadenaSinSellar: [
      { id: "ev-1", ts: dia(-90), tipo: "creacion_expediente", actor: "secretaria_gestion", payload: { expediente: "EX-2026-001/SG", presupuesto_oficial: 1_000_000_000 } },
      { id: "ev-2", ts: dia(-75), tipo: "publicacion_pliego", actor: "secretaria_gestion", payload: { documento: "Pliego de Bases y Condiciones Particulares", hash_pliego: "demo_hash_pliego_001" } },
      { id: "ev-3", ts: dia(-45), tipo: "apertura_ofertas", actor: "comision_apertura", payload: { oferentes: 3, monto_minimo: 985_400_000, monto_maximo: 1_012_300_000 } },
      { id: "ev-4", ts: dia(-30), tipo: "evaluacion", actor: "comision_evaluadora", payload: { recomendacion: "30-71234567-8", motivo: "menor precio cumpliendo pliego" } },
      { id: "ev-5", ts: dia(-25), tipo: "adjudicacion", actor: "departamento_ejecutivo", payload: { resolucion: "Resolución DEM N.º 142/2026", adjudicatario: "30-71234567-8", monto: 985_400_000 } },
      { id: "ev-6", ts: dia(-20), tipo: "orden_compra", actor: "secretaria_gestion", payload: { orden: "OC N.º 088/2026", monto: 985_400_000 } },
      { id: "ev-7", ts: dia(-15), tipo: "pago_anticipo", actor: "subsecretaria_hacienda", payload: { orden_pago: "OP N.º 220/2026", monto: 197_080_000, porcentaje: 20 } }
    ],
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ---- 2. Licitación Privada: Iluminación LED ----
  {
    id: "lpr-2026-002",
    expediente: "EX-2026-014/SG",
    ejercicio: 2026,
    procedimiento: "licitacion_privada",
    numero: "LPR N.º 02/2026",
    objeto: "Provisión e instalación de 350 luminarias LED para alumbrado público",
    categoria: "bienes",
    area: "Subsecretaría de Infraestructura Urbana y Rural",
    presupuestoOficial: 142_000_000,
    estado: "evaluacion",
    fechaApertura: dia(-12),
    fechaAdjudicacion: null,
    oferentes: [
      { cuit: "30-67891234-5", razonSocial: "Iluminar SRL", monto: 138_750_000 },
      { cuit: "30-71112223-3", razonSocial: "LED Sunchales Cooperativa", monto: 141_900_000, observaciones: "Cooperativa local; preferencia normativa potencial." }
    ],
    documentos: [
      { nombre: "Pliego LPR 02/2026", tipo: "pliego", publicado: dia(-35), hashSha256: "demo_hash_pliego_002", bytes: 312094 },
      { nombre: "Acta de Apertura LPR 02/2026", tipo: "acta", publicado: dia(-12), hashSha256: "demo_hash_acta_002", bytes: 41208 }
    ],
    cadenaSinSellar: [
      { id: "ev-1", ts: dia(-40), tipo: "creacion_expediente", actor: "secretaria_gestion", payload: { expediente: "EX-2026-014/SG", presupuesto_oficial: 142_000_000 } },
      { id: "ev-2", ts: dia(-35), tipo: "publicacion_pliego", actor: "secretaria_gestion", payload: { invitados: 5, hash_pliego: "demo_hash_pliego_002" } },
      { id: "ev-3", ts: dia(-12), tipo: "apertura_ofertas", actor: "comision_apertura", payload: { oferentes: 2, monto_minimo: 138_750_000, monto_maximo: 141_900_000 } }
    ],
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ---- 3. Concurso de Precios: equipamiento informático ----
  {
    id: "cp-2026-003",
    expediente: "EX-2026-031/SG",
    ejercicio: 2026,
    procedimiento: "concurso_precios",
    numero: "CP N.º 03/2026",
    objeto: "Adquisición de 25 equipos informáticos para áreas administrativas",
    categoria: "informatica",
    area: "Subsecretaría de Hacienda y Finanzas",
    presupuestoOficial: 18_500_000,
    estado: "convocatoria",
    fechaApertura: dia(7),
    fechaAdjudicacion: null,
    oferentes: [],
    documentos: [
      { nombre: "Pliego CP 03/2026", tipo: "pliego", publicado: dia(-3), hashSha256: "demo_hash_pliego_003", bytes: 184022 }
    ],
    cadenaSinSellar: [
      { id: "ev-1", ts: dia(-7), tipo: "creacion_expediente", actor: "subsecretaria_hacienda", payload: { expediente: "EX-2026-031/SG", presupuesto_oficial: 18_500_000 } },
      { id: "ev-2", ts: dia(-3), tipo: "publicacion_pliego", actor: "subsecretaria_hacienda", payload: { invitados: 4, hash_pliego: "demo_hash_pliego_003" } }
    ],
    verificado: false,
    fuenteId: "presupuesto2026"
  },

  // ---- 4. Contratación Directa por urgencia: reparación bomba EDS ----
  {
    id: "cd-2026-004",
    expediente: "EX-2026-052/SG",
    ejercicio: 2026,
    procedimiento: "contratacion_directa",
    numero: "CD N.º 12/2026",
    objeto: "Reparación de urgencia de bomba en Estación de Depuración de Sunchales",
    categoria: "servicios",
    area: "Subsecretaría de Ambiente y Servicios a la Comunidad",
    presupuestoOficial: 4_200_000,
    estado: "cierre",
    fechaApertura: null,
    fechaAdjudicacion: dia(-9),
    oferentes: [
      { cuit: "20-12345678-9", razonSocial: "Hidráulica del Centro", monto: 4_180_000 }
    ],
    adjudicado: {
      cuit: "20-12345678-9",
      razonSocial: "Hidráulica del Centro",
      monto: 4_180_000,
      resolucion: "Resolución DEM N.º 178/2026"
    },
    pagos: [{ fecha: dia(-3), monto: 4_180_000, orden: "OP N.º 245/2026" }],
    documentos: [
      { nombre: "Solicitud de presupuesto único", tipo: "informe", publicado: dia(-12), hashSha256: "demo_hash_informe_004", bytes: 27110 },
      { nombre: "Resolución 178/2026", tipo: "resolucion", publicado: dia(-9), hashSha256: "demo_hash_res_178_2026", bytes: 31280 },
      { nombre: "Factura B-0001-00001234", tipo: "factura", publicado: dia(-3), hashSha256: "demo_hash_factura_004", bytes: 22890 }
    ],
    cadenaSinSellar: [
      { id: "ev-1", ts: dia(-13), tipo: "declaracion_urgencia", actor: "subsecretaria_ambiente", payload: { motivo: "rotura crítica bomba EDS — riesgo sanitario" } },
      { id: "ev-2", ts: dia(-12), tipo: "presupuesto_recibido", actor: "subsecretaria_ambiente", payload: { proveedor: "20-12345678-9", monto: 4_180_000 } },
      { id: "ev-3", ts: dia(-9), tipo: "adjudicacion", actor: "departamento_ejecutivo", payload: { resolucion: "Resolución DEM N.º 178/2026", monto: 4_180_000 } },
      { id: "ev-4", ts: dia(-5), tipo: "ejecucion", actor: "subsecretaria_ambiente", payload: { detalle: "trabajo realizado y verificado" } },
      { id: "ev-5", ts: dia(-3), tipo: "pago_total", actor: "subsecretaria_hacienda", payload: { orden_pago: "OP N.º 245/2026", monto: 4_180_000 } }
    ],
    verificado: false,
    fuenteId: "presupuesto2026"
  }
];

/** Helper: agrega importes adjudicados y abiertos. */
export function totalesContrataciones() {
  const adjudicado = contrataciones.reduce((acc, c) => acc + (c.adjudicado?.monto ?? 0), 0);
  const abierto = contrataciones
    .filter((c) => ["convocatoria", "apertura", "evaluacion"].includes(c.estado))
    .reduce((acc, c) => acc + c.presupuestoOficial, 0);
  return {
    cantidad: contrataciones.length,
    adjudicadoARS: adjudicado,
    abiertoARS: abierto
  };
}

/** Etiquetas legibles para los códigos. */
export const labels = {
  procedimiento: {
    licitacion_publica: "Licitación Pública",
    licitacion_privada: "Licitación Privada",
    concurso_precios: "Concurso de Precios",
    contratacion_directa: "Contratación Directa"
  } as Record<ProcedimientoTipo, string>,
  estado: {
    preparacion: "En preparación",
    convocatoria: "Convocatoria abierta",
    apertura: "Apertura de ofertas",
    evaluacion: "En evaluación",
    adjudicacion: "Adjudicada",
    ejecucion: "En ejecución",
    ampliacion: "Ampliación en curso",
    cierre: "Finalizada",
    desierta: "Desierta",
    fracasada: "Fracasada",
    cancelada: "Cancelada"
  } as Record<EstadoContratacion, string>,
  categoria: {
    obra_publica: "Obra pública",
    bienes: "Bienes",
    servicios: "Servicios",
    consultoria: "Consultoría",
    alquileres: "Alquileres",
    informatica: "Informática"
  } as Record<Categoria, string>,
  evento: {
    creacion_expediente: "Creación del expediente",
    publicacion_pliego: "Publicación del pliego",
    apertura_ofertas: "Apertura de ofertas",
    evaluacion: "Evaluación de ofertas",
    adjudicacion: "Adjudicación",
    orden_compra: "Orden de compra emitida",
    ejecucion: "Ejecución",
    declaracion_urgencia: "Declaración de urgencia",
    presupuesto_recibido: "Presupuesto recibido",
    pago_anticipo: "Pago — anticipo",
    pago_parcial: "Pago — parcial",
    pago_total: "Pago — total",
    ampliacion: "Ampliación adjudicada",
    cierre: "Cierre del expediente"
  } as Record<string, string>
};
