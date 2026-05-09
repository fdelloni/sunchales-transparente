"use client";

/**
 * Explorador del Digesto Municipal oficial.
 *
 * Renderiza las 964 normas (período 2022-2026) que el proyecto indexó desde
 * sunchales.miportal.ar/digesto. El universo total publicado por el Concejo
 * Municipal es de 5.309 normas (1973-2026, ver concejosunchales.gob.ar/normativa-local);
 * la diferencia se declara como brecha "dig-normas-pre-2022" en src/lib/data/brechas.ts.
 *
 * Filtros por tipo, año y estado de vigencia + búsqueda full-text por número
 * o título. Cada norma linkea a /digesto/[id] para ver detalle completo y
 * citas textuales que justifican su estado.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  normasOficiales,
  type NormaOficial,
  type TipoNormaOficial
} from "@/lib/data/digesto-oficial.generated";
import { estadosNormas, type EstadoVigencia } from "@/lib/data/digesto-estados.generated";

const POR_PAGINA = 25;

const TIPOS: TipoNormaOficial[] = ["Ordenanza", "Decreto", "Resolución"];
const ANIOS = Array.from(
  new Set(normasOficiales.map((n) => n.anio))
).sort((a, b) => b - a);

export default function ExploradorDigesto() {
  const [tipo, setTipo] = useState<TipoNormaOficial | "todos">("todos");
  const [anio, setAnio] = useState<number | "todos">("todos");
  const [estado, setEstado] = useState<EstadoVigencia | "todos">("todos");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return normasOficiales.filter((n) => {
      if (tipo !== "todos" && n.tipo !== tipo) return false;
      if (anio !== "todos" && n.anio !== anio) return false;
      const e: EstadoVigencia = estadosNormas[n.id] ?? "vigente";
      if (estado !== "todos" && e !== estado) return false;
      if (q) {
        const txt = `${n.numero} ${n.titulo}`.toLowerCase();
        if (!txt.includes(q)) return false;
      }
      return true;
    });
  }, [tipo, anio, estado, busqueda]);

  // Reset paginación al cambiar filtros
  const filtroKey = `${tipo}|${anio}|${estado}|${busqueda}`;
  const paginaSegura = useMemo(() => {
    void filtroKey;
    return Math.min(pagina, Math.max(1, Math.ceil(filtradas.length / POR_PAGINA)));
  }, [pagina, filtradas.length, filtroKey]);

  const total = filtradas.length;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const desde = (paginaSegura - 1) * POR_PAGINA;
  const visibles = filtradas.slice(desde, desde + POR_PAGINA);

  // Conteos para mostrar arriba (sobre el universo filtrado)
  const conteosFiltrados = useMemo(() => {
    const c = { vigente: 0, modificada: 0, derogada: 0 };
    for (const n of filtradas) {
      const e: EstadoVigencia = estadosNormas[n.id] ?? "vigente";
      c[e]++;
    }
    return c;
  }, [filtradas]);

  return (
    <div>
      {/* Filtros */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Selector
          label="Tipo"
          value={tipo}
          onChange={(v) => {
            setTipo(v as typeof tipo);
            setPagina(1);
          }}
          opciones={[
            { v: "todos", l: "Todos los tipos" },
            ...TIPOS.map((t) => ({ v: t, l: t }))
          ]}
        />
        <Selector
          label="Año"
          value={String(anio)}
          onChange={(v) => {
            setAnio(v === "todos" ? "todos" : parseInt(v, 10));
            setPagina(1);
          }}
          opciones={[
            { v: "todos", l: "Todos los años" },
            ...ANIOS.map((a) => ({ v: String(a), l: String(a) }))
          ]}
        />
        <Selector
          label="Estado de vigencia"
          value={estado}
          onChange={(v) => {
            setEstado(v as typeof estado);
            setPagina(1);
          }}
          opciones={[
            { v: "todos", l: "Todos los estados" },
            { v: "vigente", l: "Vigente" },
            { v: "modificada", l: "Modificada" },
            { v: "derogada", l: "Derogada" }
          ]}
        />
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-navy">
            Buscar por número o título
          </label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
            placeholder="Ej: 2989 o presupuesto"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
          />
        </div>
      </div>

      {/* Resumen de resultados + leyenda de colores */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          <strong className="text-navy tabular-nums">{total}</strong> de{" "}
          <span className="tabular-nums">{normasOficiales.length}</span> normas
          encontradas
          {total > 0 && (
            <span className="ml-3 text-xs text-slate-500">
              <BadgeMini estado="vigente" /> {conteosFiltrados.vigente} ·{" "}
              <BadgeMini estado="modificada" /> {conteosFiltrados.modificada} ·{" "}
              <BadgeMini estado="derogada" /> {conteosFiltrados.derogada}
            </span>
          )}
        </p>
        {total > POR_PAGINA && (
          <Paginador
            pagina={paginaSegura}
            totalPaginas={totalPaginas}
            onChange={setPagina}
          />
        )}
      </div>

      {/* Tabla */}
      <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Año</th>
              <th className="px-4 py-3">Fecha sanción</th>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No hay normas que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              visibles.map((n) => {
                const e: EstadoVigencia = estadosNormas[n.id] ?? "vigente";
                return (
                  <tr key={n.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{n.tipo}</td>
                    <td className="px-4 py-3 font-medium text-navy tabular-nums">
                      <Link
                        href={`/digesto/${n.id}`}
                        className="hover:text-coral-dark hover:underline"
                      >
                        {n.numero}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600 tabular-nums">{n.anio}</td>
                    <td className="px-4 py-3 text-slate-500 tabular-nums">
                      {n.fecha ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <Link
                        href={`/digesto/${n.id}`}
                        className="line-clamp-2 hover:text-navy"
                      >
                        {n.titulo}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <EstadoBadge estado={e} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador inferior */}
      {total > POR_PAGINA && (
        <div className="mt-4 flex justify-end">
          <Paginador
            pagina={paginaSegura}
            totalPaginas={totalPaginas}
            onChange={setPagina}
          />
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------

function Selector({
  label,
  value,
  onChange,
  opciones
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  opciones: { v: string; l: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-navy">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
      >
        {opciones.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </div>
  );
}

function Paginador({
  pagina,
  totalPaginas,
  onChange
}: {
  pagina: number;
  totalPaginas: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, pagina - 1))}
        disabled={pagina <= 1}
        className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Anterior
      </button>
      <span className="tabular-nums text-xs text-slate-500">
        Página {pagina} de {totalPaginas}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPaginas, pagina + 1))}
        disabled={pagina >= totalPaginas}
        className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente →
      </button>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: EstadoVigencia }) {
  const cfg = {
    vigente: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      lbl: "Vigente"
    },
    modificada: {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      lbl: "Modificada"
    },
    derogada: { cls: "bg-red-50 text-red-700 border-red-200", lbl: "Derogada" }
  } as const;
  const c = cfg[estado];
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${c.cls}`}
    >
      {c.lbl}
    </span>
  );
}

function BadgeMini({ estado }: { estado: EstadoVigencia }) {
  const colorClass = {
    vigente: "bg-emerald-500",
    modificada: "bg-amber-500",
    derogada: "bg-red-500"
  }[estado];
  return (
    <span
      aria-hidden="true"
      className={`mr-1 inline-block h-2 w-2 rounded-full ${colorClass}`}
    />
  );
}

// Re-export para que la página de detalle pueda usar el mismo helper visual
export { EstadoBadge };

// Helper también disponible para que NormaOficial tenga importable el tipo
export type { NormaOficial };
