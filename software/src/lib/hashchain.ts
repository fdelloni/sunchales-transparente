/**
 * ============================================================
 *  Hash-chain SHA-256 — Trazabilidad inmutable de contrataciones
 * ============================================================
 *
 *  Cada evento del ciclo de vida de una contratación (publicación,
 *  recepción de ofertas, adjudicación, ampliación, pago, etc.)
 *  produce un registro con:
 *
 *      hash_actual = SHA-256( ts || tipo || payload || hash_previo )
 *
 *  El primer evento de cada contratación referencia un hash "génesis"
 *  determinístico calculado a partir del expediente.
 *
 *  Si CUALQUIER campo de un evento histórico se modifica, el hash de
 *  ese evento cambia y, por la cadena, también lo hacen todos los
 *  hashes posteriores. Cualquier ciudadano puede descargar la cadena,
 *  recalcular en su computadora con esta misma función (o con
 *  `openssl`/`shasum` en línea de comandos) y detectar la manipulación
 *  sin necesidad de confiar en el servidor.
 *
 *  Este módulo NO depende de Supabase ni de ningún backend: usa la
 *  Web Crypto API estándar disponible en Node 18+ y todos los
 *  navegadores modernos.
 *  ============================================================
 */

export type Evento = {
  id: string;
  ts: string; // ISO 8601 (UTC)
  tipo: string; // p.ej. "publicacion_pliego", "apertura_ofertas"...
  actor: string; // usuario o "sistema"
  payload: Record<string, unknown>;
  /** Hash del evento inmediato anterior. Para el primer evento es el hash génesis. */
  hashPrevio: string;
  /** Hash del propio evento. Calculado, no escribible manualmente. */
  hash: string;
};

/** Texto canónico determinístico (claves ordenadas) para que el hash sea reproducible. */
function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonicalize).join(",") + "]";
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + canonicalize(obj[k])).join(",") + "}";
}

/** SHA-256 hex de un string. Funciona en Node 18+ y en navegadores. */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Hash génesis determinístico para una contratación: depende solo del expediente y del año. */
export async function genesisHash(expediente: string, ejercicio: number): Promise<string> {
  return sha256Hex(`GENESIS::${expediente}::${ejercicio}`);
}

/** Calcula el hash de un evento dado su contenido + el hash del previo. */
export async function calcularHashEvento(args: {
  id: string;
  ts: string;
  tipo: string;
  actor: string;
  payload: Record<string, unknown>;
  hashPrevio: string;
}): Promise<string> {
  const canonical = canonicalize({
    id: args.id,
    ts: args.ts,
    tipo: args.tipo,
    actor: args.actor,
    payload: args.payload,
    hashPrevio: args.hashPrevio
  });
  return sha256Hex(canonical);
}

/**
 * Sella una secuencia de eventos en orden cronológico.
 * Devuelve la cadena con cada `hashPrevio` y `hash` correctamente calculados.
 */
export async function sellarCadena(
  expediente: string,
  ejercicio: number,
  eventos: Array<Omit<Evento, "hashPrevio" | "hash">>
): Promise<Evento[]> {
  let prev = await genesisHash(expediente, ejercicio);
  const out: Evento[] = [];
  for (const e of eventos) {
    const hash = await calcularHashEvento({
      id: e.id,
      ts: e.ts,
      tipo: e.tipo,
      actor: e.actor,
      payload: e.payload,
      hashPrevio: prev
    });
    out.push({ ...e, hashPrevio: prev, hash });
    prev = hash;
  }
  return out;
}

/**
 * Verifica una cadena de eventos. Devuelve OK si todos los hashes son
 * coherentes con su contenido y con el hash previo. En caso contrario
 * devuelve el primer evento donde se rompió la cadena.
 */
export type ResultadoVerificacion =
  | { ok: true; eventos: number; genesis: string }
  | { ok: false; razon: "hash_previo" | "hash_propio"; eventoId: string; indice: number };

export async function verificarCadena(
  expediente: string,
  ejercicio: number,
  eventos: Evento[]
): Promise<ResultadoVerificacion> {
  let esperadoPrev = await genesisHash(expediente, ejercicio);
  for (let i = 0; i < eventos.length; i++) {
    const e = eventos[i];
    if (e.hashPrevio !== esperadoPrev) {
      return { ok: false, razon: "hash_previo", eventoId: e.id, indice: i };
    }
    const hashRecalculado = await calcularHashEvento({
      id: e.id,
      ts: e.ts,
      tipo: e.tipo,
      actor: e.actor,
      payload: e.payload,
      hashPrevio: e.hashPrevio
    });
    if (hashRecalculado !== e.hash) {
      return { ok: false, razon: "hash_propio", eventoId: e.id, indice: i };
    }
    esperadoPrev = e.hash;
  }
  return { ok: true, eventos: eventos.length, genesis: await genesisHash(expediente, ejercicio) };
}
