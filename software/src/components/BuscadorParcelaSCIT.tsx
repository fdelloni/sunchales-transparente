"use client";

/**
 * Buscador integrado de parcela del SCIT (Santa Fe).
 *
 * El buscador oficial del SCIT
 * (https://www.santafe.gob.ar/idesf/buscadorparcela/tramite.php) no acepta
 * pre-carga vía query params: su formulario es interactivo y la comunicación
 * con el visualizador embebido se hace por mensajería postMessage. Tampoco se
 * puede embeber como iframe porque su CSP es `frame-ancestors 'self'`.
 *
 * Por eso este componente NO pretende replicar el buscador; en cambio:
 *   - Guía al ciudadano sobre cómo se compone el nomenclador catastral
 *   - Le permite armar el código (provincia/depto/distrito/sección/manzana/parcela)
 *   - Le abre el buscador oficial en una pestaña nueva para que pegue/ingrese
 *     los valores con la información ya copiada al portapapeles si es posible
 *
 * Si el ciudadano no conoce su nomenclador, lo orientamos al trámite municipal
 * "Solicitar datos catastrales" (con su arancel declarado).
 */

import { useState } from "react";

const SCIT_BUSCADOR =
  "https://www.santafe.gob.ar/idesf/buscadorparcela/tramite.php";

const SCIT_PROVINCIA = "82"; // Santa Fe
const SCIT_DEPTO = "021"; // Castellanos
const SCIT_DISTRITO = "681"; // Sunchales

export default function BuscadorParcelaSCIT() {
  const [seccion, setSeccion] = useState("");
  const [manzana, setManzana] = useState("");
  const [parcela, setParcela] = useState("");
  const [copiado, setCopiado] = useState<string | null>(null);

  const nomenclador = [
    SCIT_PROVINCIA,
    SCIT_DEPTO,
    SCIT_DISTRITO,
    seccion.padStart(2, "0") || "—",
    manzana.padStart(3, "0") || "—",
    parcela.padStart(5, "0") || "—",
  ].join("-");

  const completo = seccion && manzana && parcela;

  async function copiarAlPortapapeles() {
    if (!completo) return;
    try {
      await navigator.clipboard.writeText(nomenclador);
      setCopiado(nomenclador);
      setTimeout(() => setCopiado(null), 2500);
    } catch {
      setCopiado(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
        <h3 className="font-serif text-lg font-bold text-navy">
          Buscar mi parcela en el SCIT
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Arma tu nomenclador catastral y abre el buscador oficial provincial
        </p>
      </div>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-2">
        {/* Form */}
        <div>
          <p className="text-sm text-slate-700">
            El nomenclador catastral identifica a tu parcela en el sistema
            provincial. Para Sunchales los tres primeros campos están fijos:
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-2">
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Provincia
              </div>
              <div className="font-mono text-sm font-semibold text-navy">
                {SCIT_PROVINCIA}
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-2">
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Depto
              </div>
              <div className="font-mono text-sm font-semibold text-navy">
                {SCIT_DEPTO}
              </div>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-2">
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Distrito
              </div>
              <div className="font-mono text-sm font-semibold text-navy">
                {SCIT_DISTRITO}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <label className="block text-sm">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Sección (2 dígitos)
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={seccion}
                onChange={(e) => setSeccion(e.target.value.replace(/\D/g, ""))}
                placeholder="ej. 09"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-mono shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Manzana (3 dígitos)
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={3}
                value={manzana}
                onChange={(e) => setManzana(e.target.value.replace(/\D/g, ""))}
                placeholder="ej. 025"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-mono shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Parcela (hasta 5 dígitos)
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={parcela}
                onChange={(e) => setParcela(e.target.value.replace(/\D/g, ""))}
                placeholder="ej. 00568"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-mono shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </label>
          </div>
        </div>

        {/* Resultado / acciones */}
        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Tu nomenclador armado
          </span>
          <div
            className={`mt-2 break-all rounded-md border bg-white px-3 py-2 font-mono text-sm ${
              completo
                ? "border-emerald-400 text-navy"
                : "border-slate-200 text-slate-400"
            }`}
          >
            {nomenclador}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              disabled={!completo}
              onClick={copiarAlPortapapeles}
              className={
                completo
                  ? "rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-navy hover:bg-slate-100"
                  : "cursor-not-allowed rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400"
              }
            >
              {copiado ? `Copiado: ${copiado}` : "Copiar al portapapeles"}
            </button>
            <a
              href={SCIT_BUSCADOR}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md bg-coral px-3 py-2 text-center text-xs font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Abrir buscador oficial SCIT →
            </a>
          </div>

          <div className="mt-4 rounded-md border-l-2 border-amber-400 bg-amber-50 p-3 text-[11px] text-amber-900">
            <strong className="block font-semibold">
              ¿No conocés tu nomenclador?
            </strong>
            <p className="mt-1">
              Aparece en tu boleta de TGI / Tasa General de Inmuebles. También
              podés solicitarlo en la Oficina de Catastro municipal (Av.
              Belgrano 103, arancel 10 UCM).{" "}
              <a
                href="https://sunchales.gob.ar/gestion/sunchales-impulsa/tramites/solicitar-datos-catastrales/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Trámite municipal →
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white px-5 py-3 text-[11px] text-slate-500">
        <strong className="text-navy">Por qué no se embebe el buscador acá:</strong>{" "}
        el SCIT envía el header <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">Content-Security-Policy: frame-ancestors 'self'</code>,
        que impide su carga como iframe desde otro dominio. La integración
        directa requeriría un convenio formal con la provincia. Mientras tanto,
        este formulario te ayuda a armar el nomenclador y abrir el buscador
        oficial sin que pierdas el contexto.
      </div>
    </div>
  );
}
