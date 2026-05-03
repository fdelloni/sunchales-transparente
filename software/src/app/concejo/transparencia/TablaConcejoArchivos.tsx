"use client";

import { useMemo, useState } from "react";
import type { ConcejoItem } from "@/lib/data/concejo-archivos.generated";

type Props = {
  items: ConcejoItem[];
  /** Cantidad por página. Por defecto 25. */
  pageSize?: number;
  /** Permite buscar en el campo etiqueta. */
  conBusqueda?: boolean;
  /** Filtra por año (autodetecta valores). */
  conFiltroAnio?: boolean;
  /** CSV download (etiqueta + url). */
  conDescargaCsv?: boolean;
  /** Etiqueta del lote para el CSV. */
  csvNombre?: string;
};

export default function TablaConcejoArchivos({
  items,
  pageSize = 25,
  conBusqueda = true,
  conFiltroAnio = true,
  conDescargaCsv = true,
  csvNombre = "concejo"
}: Props) {
  const [q, setQ] = useState("");
  const [anio, setAnio] = useState<number | "">("");
  const [pagina, setPagina] = useState(0);

  const aniosDisponibles = useMemo(() => {
    const set = new Set<number>();
    for (const it of items) if (it.anio != null) set.add(it.anio);
    return [...set].sort((a, b) => b - a);
  }, [items]);

  const filtrados = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return items.filter((it) => {
      if (anio !== "" && it.anio !== anio) return false;
      if (ql && !it.etiqueta.toLowerCase().includes(ql)) return false;
      return true;
    });
  }, [items, q, anio]);

  const totalPaginas = Math.ceil(filtrados.length / pageSize);
  const paginaActual = Math.min(pagina, Math.max(0, totalPaginas - 1));
  const visibles = filtrados.slice(
    paginaActual * pageSize,
    (paginaActual + 1) * pageSize
  );

  function descargarCsv() {
    const cabecera = "etiqueta;fechaPublicacion;anio;mes;tamanioBytes;url";
    const filas = filtrados.map((it) =>
      [
        '"' + it.etiqueta.replace(/"/g, '""') + '"',
        it.fechaPublicacion ?? "",
        it.anio ?? "",
        it.mes ?? "",
        it.tamanioBytes,
        it.url
      ].join(";")
    );
    const csv = "﻿" + [cabecera, ...filas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${csvNombre}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
        No hay archivos en esta categoría todavía.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-3">
        {conBusqueda && (
          <input
            type="search"
            placeholder="Buscar por nombre..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPagina(0);
            }}
            className="flex-1 min-w-[160px] rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-coral focus:outline-none"
          />
        )}
        {conFiltroAnio && aniosDisponibles.length > 0 && (
          <select
            value={anio}
            onChange={(e) => {
              setAnio(e.target.value === "" ? "" : parseInt(e.target.value, 10));
              setPagina(0);
            }}
            className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          >
            <option value="">Todos los años</option>
            {aniosDisponibles.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        )}
        <span className="text-xs text-slate-500">
          {filtrados.length} de {items.length}
        </span>
        {conDescargaCsv && filtrados.length > 0 && (
          <button
            type="button"
            onClick={descargarCsv}
            className="ml-auto rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
          >
            Descargar CSV
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Documento</th>
              <th className="px-3 py-2">Año</th>
              <th className="px-3 py-2">Publicado</th>
              <th className="px-3 py-2 text-right">Tamaño</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((it, i) => (
              <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-3 py-2 font-medium text-navy">{it.etiqueta}</td>
                <td className="px-3 py-2 text-slate-600">{it.anio ?? "—"}</td>
                <td className="px-3 py-2 text-slate-600">{it.fechaPublicacion ?? "—"}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-500">
                  {(it.tamanioBytes / 1024).toFixed(0)} KB
                </td>
                <td className="px-3 py-2 text-right">
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-dark hover:underline"
                  >
                    PDF →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 p-3 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setPagina((p) => Math.max(0, p - 1))}
            disabled={paginaActual === 0}
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span>
            Página {paginaActual + 1} de {totalPaginas}
          </span>
          <button
            type="button"
            onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
            disabled={paginaActual >= totalPaginas - 1}
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
