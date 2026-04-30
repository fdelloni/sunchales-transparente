"use client";

import { useEffect, useState } from "react";
import {
  type Evento,
  type ResultadoVerificacion,
  verificarCadena,
  genesisHash
} from "@/lib/hashchain";

type Props = {
  expediente: string;
  ejercicio: number;
  objeto: string;
  cadena: Evento[];
  eventoLabels: Record<string, string>;
};

export default function AuditClient({
  expediente,
  ejercicio,
  objeto,
  cadena,
  eventoLabels
}: Props) {
  const [resultado, setResultado] = useState<ResultadoVerificacion | null>(null);
  const [genesis, setGenesis] = useState<string>("");
  const [editado, setEditado] = useState<Evento[]>(cadena);
  const [tampering, setTampering] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setGenesis(await genesisHash(expediente, ejercicio));
      const r = await verificarCadena(expediente, ejercicio, editado);
      setResultado(r);
    })();
  }, [editado, expediente, ejercicio]);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify({ expediente, ejercicio, objeto, cadena }, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cadena-${expediente.replace(/[^A-Za-z0-9]+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const simulateTampering = (i: number) => {
    setTampering(i);
    const copia = editado.map((e, idx) =>
      idx === i
        ? { ...e, payload: { ...e.payload, _MANIPULADO: "alguien_cambio_esto_a_posteriori" } }
        : e
    );
    setEditado(copia);
  };

  const reset = () => {
    setEditado(cadena);
    setTampering(null);
  };

  return (
    <div className="mt-8">
      {/* Estado global */}
      {resultado && (
        <div
          className={`rounded-xl border p-5 shadow-sm ${
            resultado.ok
              ? "border-emerald-200 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span
              className={`font-serif text-2xl font-bold ${
                resultado.ok ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {resultado.ok ? "✓ Cadena íntegra" : "✗ Cadena rota"}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-500">
              SHA-256
            </span>
          </div>
          <p
            className={`mt-1 text-sm ${
              resultado.ok ? "text-emerald-900" : "text-rose-900"
            }`}
          >
            {resultado.ok
              ? `Se verificaron ${resultado.eventos} eventos. Ningún hash fue alterado.`
              : `Falla en el evento N.º ${resultado.indice + 1} (${resultado.eventoId}). Razón: ${
                  resultado.razon === "hash_propio"
                    ? "el contenido del evento no coincide con su hash publicado"
                    : "el hash_previo no coincide con el hash del evento anterior"
                }.`}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={downloadJSON}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
            >
              Descargar JSON de la cadena
            </button>
            {tampering !== null && (
              <button
                onClick={reset}
                className="rounded-lg bg-coral px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-amber-400"
              >
                Restaurar cadena original
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
        <div>
          <strong>Hash génesis (determinístico):</strong>
          <div className="break-all font-mono text-slate-400">{genesis}</div>
        </div>
      </div>

      {/* Detalle por evento */}
      <h3 className="mt-8 font-serif text-xl font-bold text-navy">Eventos verificados</h3>
      <ul className="mt-3 space-y-3">
        {editado.map((e, i) => {
          const fallo =
            resultado && !resultado.ok && resultado.indice === i;
          const fueAdulterado = tampering === i;
          return (
            <li
              key={e.id}
              className={`rounded-xl border p-4 shadow-sm ${
                fallo
                  ? "border-rose-300 bg-rose-50"
                  : fueAdulterado
                  ? "border-amber-300 bg-amber-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-navy">
                  {i + 1}. {eventoLabels[e.tipo] ?? e.tipo}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(e.ts).toLocaleString("es-AR")}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">Actor: {e.actor}</div>
              <pre className="mt-2 overflow-x-auto rounded bg-slate-50 p-2 text-[11px] text-slate-700">
                {JSON.stringify(e.payload, null, 2)}
              </pre>
              <div className="mt-2 break-all font-mono text-[10px] leading-relaxed text-slate-400">
                hash:        {e.hash}
                <br />
                hash_previo: {e.hashPrevio}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => simulateTampering(i)}
                  className="text-[11px] font-semibold text-rose-700 underline-offset-2 hover:underline"
                >
                  Simular manipulación de este evento →
                </button>
                <span className="ml-2 text-[11px] text-slate-500">
                  (modifica el payload en tu navegador para mostrar cómo la cadena
                  se rompe)
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
