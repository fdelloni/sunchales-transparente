"use client";

/**
 * Formulario de Alertas Ciudadanas.
 *
 * El ciudadano elige a qué TIPOS de alertas quiere suscribirse, y para cada
 * uno define filtros propios. Las categorías marcadas como "en desarrollo"
 * NO disparan alertas todavía — pero se capturan en el modelo para que el
 * municipio sepa qué demanda existe (transparencia activa de la propia
 * roadmap).
 *
 * Cada categoría tiene un flag `disponible` que controla si los disparadores
 * están conectados. Cuando Fase 2 conecte el resto, basta cambiar el flag.
 */

import { useState } from "react";

type Opcion = { value: string; label: string };

type CategoriaAlertaId =
  | "contrataciones"
  | "concejo"
  | "presupuesto"
  | "juzgado"
  | "brechas";

type CategoriaAlerta = {
  id: CategoriaAlertaId;
  titulo: string;
  descripcion: string;
  disponible: boolean; // false = capturamos preferencia pero aún no disparamos
};

const CATEGORIAS: CategoriaAlerta[] = [
  {
    id: "contrataciones",
    titulo: "Contrataciones y licitaciones",
    descripcion:
      "Avisame cuando se publique una nueva licitación, concurso de precios o contratación directa que coincida con mis filtros.",
    disponible: true,
  },
  {
    id: "concejo",
    titulo: "Concejo Municipal",
    descripcion:
      "Avisame cuando haya nueva sesión del Concejo (con orden del día), nueva ordenanza o cambio en una existente.",
    disponible: false,
  },
  {
    id: "presupuesto",
    titulo: "Presupuesto y recaudación",
    descripcion:
      "Avisame ante modificaciones del Presupuesto, cambios en la UCM (Unidad de Cuenta Municipal) o ajustes de tasas.",
    disponible: false,
  },
  {
    id: "juzgado",
    titulo: "Juzgado de Faltas",
    descripcion:
      "Avisame cuando cambie la escala de multas, se publiquen estadísticas o se modifique el régimen de faltas.",
    disponible: false,
  },
  {
    id: "brechas",
    titulo: "Brechas de transparencia subsanadas",
    descripcion:
      "Avisame cada vez que el municipio publique información que antes estaba marcada como brecha (avance positivo).",
    disponible: false,
  },
];

export default function SuscripcionForm({
  opcionesProcedimiento,
  opcionesCategoria,
}: {
  opcionesProcedimiento: Opcion[];
  opcionesCategoria: Opcion[];
}) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Categorías de alerta que el ciudadano marcó.
  const [seleccionadas, setSeleccionadas] = useState<Set<CategoriaAlertaId>>(
    new Set()
  );

  // Filtros específicos de Contrataciones.
  const [procedimientos, setProcedimientos] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [montoMinimo, setMontoMinimo] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; mensaje: string } | null>(
    null
  );

  function toggleCategoria(id: CategoriaAlertaId) {
    setSeleccionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleArr(arr: string[], v: string, set: (a: string[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email && !whatsapp) {
      setResultado({ ok: false, mensaje: "Completá al menos un canal de contacto." });
      return;
    }
    if (seleccionadas.size === 0) {
      setResultado({
        ok: false,
        mensaje: "Marcá al menos una categoría de alertas que querés recibir.",
      });
      return;
    }

    setLoading(true);
    setResultado(null);

    // Armado del payload nuevo: lista de alertas con sus filtros.
    const alertas = Array.from(seleccionadas).map((id) => {
      if (id === "contrataciones") {
        return {
          tipo: id,
          filtros: { procedimientos, categorias, montoMinimo },
        };
      }
      // Las otras categorías no tienen filtros específicos todavía.
      return { tipo: id, filtros: {} };
    });

    try {
      const r = await fetch("/api/v1/suscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || null,
          whatsapp: whatsapp || null,
          // Compatibilidad hacia atrás: si solo seleccionaron contrataciones,
          // mantenemos también el shape legacy `filtros` por si el endpoint
          // todavía no fue actualizado.
          filtros: { procedimientos, categorias, montoMinimo },
          alertas,
        }),
      });
      const data = (await r.json()) as { ok: boolean; mensaje: string };
      setResultado(data);
    } catch {
      setResultado({ ok: false, mensaje: "Error de red. Probá de nuevo en unos segundos." });
    } finally {
      setLoading(false);
    }
  }

  const contratacionesActiva = seleccionadas.has("contrataciones");
  const algunaSeleccionada = seleccionadas.size > 0;
  const cantEnDesarrollo = Array.from(seleccionadas).filter(
    (id) => !CATEGORIAS.find((c) => c.id === id)?.disponible
  ).length;

  return (
    <form onSubmit={submit} className="grid gap-6">
      {/* Contactos */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Correo electrónico">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vecino@correo.com"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
          />
        </Field>
        <Field label="WhatsApp (con código de país)">
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+54 9 3493 ..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
          />
        </Field>
      </div>

      {/* Categorías de alertas */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-navy">
          Tipos de alertas que querés recibir
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Marcá una o varias. Las categorías "en desarrollo" capturan tu interés
          aunque todavía no disparen alertas: nos ayudan a priorizar qué conectar
          primero.
        </p>
        <div className="mt-3 grid gap-3">
          {CATEGORIAS.map((cat) => {
            const activa = seleccionadas.has(cat.id);
            return (
              <label
                key={cat.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  activa
                    ? "border-coral bg-amber-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={activa}
                  onChange={() => toggleCategoria(cat.id)}
                  className="mt-1 h-4 w-4 cursor-pointer accent-coral"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-sm font-bold text-navy">
                      {cat.titulo}
                    </span>
                    {cat.disponible ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Disponible
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        En desarrollo
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{cat.descripcion}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filtros específicos de CONTRATACIONES (solo si está marcada) */}
      {contratacionesActiva && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-navy">
            Filtros para Contrataciones
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            Si dejás todos los filtros vacíos, vas a recibir <strong>todas</strong>{" "}
            las nuevas contrataciones publicadas.
          </p>

          <div className="mt-3 grid gap-4">
            <Field label="Tipos de procedimiento">
              <div className="flex flex-wrap gap-2">
                {opcionesProcedimiento.map((o) => (
                  <Chip
                    key={o.value}
                    activo={procedimientos.includes(o.value)}
                    onClick={() => toggleArr(procedimientos, o.value, setProcedimientos)}
                  >
                    {o.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Categorías">
              <div className="flex flex-wrap gap-2">
                {opcionesCategoria.map((o) => (
                  <Chip
                    key={o.value}
                    activo={categorias.includes(o.value)}
                    onClick={() => toggleArr(categorias, o.value, setCategorias)}
                  >
                    {o.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Monto mínimo (ARS)">
              <input
                type="number"
                min={0}
                step={1_000_000}
                value={montoMinimo}
                onChange={(e) => setMontoMinimo(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 sm:max-w-xs"
              />
            </Field>
          </div>
        </div>
      )}

      {/* Aviso si seleccionó alguna categoría "en desarrollo" */}
      {cantEnDesarrollo > 0 && (
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3 text-sm text-amber-900">
          <strong>Aviso:</strong> seleccionaste {cantEnDesarrollo}{" "}
          {cantEnDesarrollo === 1 ? "categoría que está" : "categorías que están"} "en
          desarrollo". Vamos a registrar tu preferencia para activar esos
          disparadores en cuanto estén listos. Mientras tanto, no recibirás alertas
          de esas categorías.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading || !algunaSeleccionada}
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Enviando…" : "Quiero recibir alertas"}
        </button>
        <span className="text-xs text-slate-500">
          Al suscribirte aceptás recibir un correo/mensaje de confirmación opt-in.
        </span>
      </div>

      {resultado && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            resultado.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          {resultado.mensaje}
        </div>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-navy">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
        activo
          ? "border-coral bg-coral/15 text-coral-dark"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}
