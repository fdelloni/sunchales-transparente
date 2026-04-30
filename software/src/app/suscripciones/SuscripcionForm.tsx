"use client";

import { useState } from "react";

type Opcion = { value: string; label: string };

export default function SuscripcionForm({
  opcionesProcedimiento,
  opcionesCategoria
}: {
  opcionesProcedimiento: Opcion[];
  opcionesCategoria: Opcion[];
}) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [procedimientos, setProcedimientos] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [montoMinimo, setMontoMinimo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; mensaje: string } | null>(null);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !whatsapp) {
      setResultado({ ok: false, mensaje: "Completá al menos un canal de contacto." });
      return;
    }
    setLoading(true);
    setResultado(null);
    try {
      const r = await fetch("/api/v1/suscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || null,
          whatsapp: whatsapp || null,
          filtros: { procedimientos, categorias, montoMinimo }
        })
      });
      const data = (await r.json()) as { ok: boolean; mensaje: string; suscripcion_id?: string };
      setResultado(data);
    } catch {
      setResultado({ ok: false, mensaje: "Error de red. Probá de nuevo en unos segundos." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
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

      {/* Procedimiento */}
      <Field label="Tipos de procedimiento">
        <div className="flex flex-wrap gap-2">
          {opcionesProcedimiento.map((o) => (
            <Chip
              key={o.value}
              activo={procedimientos.includes(o.value)}
              onClick={() => toggle(procedimientos, o.value, setProcedimientos)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
      </Field>

      {/* Categoría */}
      <Field label="Categorías">
        <div className="flex flex-wrap gap-2">
          {opcionesCategoria.map((o) => (
            <Chip
              key={o.value}
              activo={categorias.includes(o.value)}
              onClick={() => toggle(categorias, o.value, setCategorias)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
      </Field>

      {/* Monto mínimo */}
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

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400 disabled:opacity-60"
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
  children
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
