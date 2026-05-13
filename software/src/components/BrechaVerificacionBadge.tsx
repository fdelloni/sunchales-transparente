import {
  verificacionPorBrechaId,
  type ResultadoVerificacion,
} from "@/lib/data/verificaciones-auditoria.generated";

type Props = {
  /** ID de la brecha (del dataset `brechas`) cuya última verificación queremos mostrar. */
  brechaId: string;
  /**
   * "compact" → un solo chip con el resultado y la fecha.
   * "detailed" → chip + hallazgos abreviados + link a la URL verificada.
   */
  variante?: "compact" | "detailed";
};

const ETIQUETA_RESULTADO: Record<ResultadoVerificacion, string> = {
  ok: "Verificado: consistente",
  alerta: "Verificado: alerta",
  desactualizado: "Verificado: desactualizado",
  indeterminado: "Verificado: indeterminado",
  error: "Verificación con error",
};

const CLASES_RESULTADO: Record<ResultadoVerificacion, string> = {
  ok: "bg-emerald-100 text-emerald-900 border-emerald-300",
  alerta: "bg-amber-100 text-amber-900 border-amber-300",
  desactualizado: "bg-red-100 text-red-900 border-red-300",
  indeterminado: "bg-slate-100 text-slate-800 border-slate-300",
  error: "bg-slate-100 text-slate-700 border-slate-300",
};

function formatearFecha(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const yyyy = d.getUTCFullYear();
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const min = String(d.getUTCMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min} UTC`;
  } catch {
    return iso;
  }
}

/**
 * Muestra el último resultado de la verificación automatizada asociada a una
 * brecha (si existe). Cuando aún no se generó la verificación o cuando la
 * brecha no tiene correlación con ninguna, el componente no renderiza nada.
 *
 * La data viene de `src/lib/data/verificaciones-auditoria.generated.ts`,
 * que es producido por el cron diario `scrape-fuentes.yml` (job
 * `verificar-brechas-auditoria`) y reescrito cada 24 h con honestidad
 * estricta: el campo `resultado` sólo afirma "ok"/"desactualizado" cuando
 * hay evidencia textual del HTML servido; en caso de duda, "indeterminado".
 */
export default function BrechaVerificacionBadge({
  brechaId,
  variante = "compact",
}: Props) {
  const v = verificacionPorBrechaId(brechaId);
  if (!v) return null;

  const clases = CLASES_RESULTADO[v.resultado];
  const etiqueta = ETIQUETA_RESULTADO[v.resultado];
  const fecha = formatearFecha(v.fechaVerificacion);

  if (variante === "compact") {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${clases}`}
          title={`HTTP ${v.estadoHttp} · ${v.url}`}
        >
          <span aria-hidden>●</span>
          {etiqueta}
        </span>
        <span className="text-[11px] text-slate-500">
          última verificación automatizada {fecha}
        </span>
      </div>
    );
  }

  // variante "detailed"
  return (
    <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${clases}`}
          title={`HTTP ${v.estadoHttp} · ${v.url}`}
        >
          <span aria-hidden>●</span>
          {etiqueta}
        </span>
        <span className="text-[11px] text-slate-500">
          verificada el {fecha} · HTTP {v.estadoHttp}
        </span>
      </div>
      {v.hallazgos.length > 0 && (
        <ul className="mt-2 space-y-1 text-[12.5px] text-slate-700">
          {v.hallazgos.slice(0, 3).map((h, i) => (
            <li key={i} className="leading-snug">
              — {h}
            </li>
          ))}
        </ul>
      )}
      {v.url && (
        <a
          href={v.url.split(" | ")[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[11px] font-semibold text-amber-800 underline hover:text-amber-900"
        >
          Ver la URL verificada →
        </a>
      )}
    </div>
  );
}
