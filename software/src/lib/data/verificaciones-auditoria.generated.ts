// AUTO-GENERADO por scripts/verificar-brechas-auditoria.mjs
// NO EDITAR A MANO. Para regenerar: npm run verificar-brechas-auditoria
//
// PLACEHOLDER INICIAL (2026-05-12):
// El array `verificacionesAuditoria` queda vacío hasta que la primera
// corrida del cron diario (06:00 ART) o una ejecución manual del scraper
// lo sobreescriba con los resultados reales. El tipo y el contrato del
// módulo están definidos para que la página /brechas y los componentes
// embebidos puedan importarlo desde ya sin romper el typecheck.

export type ResultadoVerificacion =
  | "ok"
  | "alerta"
  | "desactualizado"
  | "indeterminado"
  | "error";

export type VerificacionAuditoria = {
  /** Identificador estable de la verificación. */
  id: string;
  /** ID de la brecha del dataset `brechas` con la que se correlaciona. */
  brechaIdRelacionada?: string;
  /** URL(s) verificada(s). Para verificación multi-URL, separadas por " | ". */
  url: string;
  /** Código HTTP del primer fetch (0 si timeout/red). */
  estadoHttp: number;
  /** Fecha-hora ISO de la verificación. */
  fechaVerificacion: string;
  /** Veredicto categórico. */
  resultado: ResultadoVerificacion;
  /** Hallazgos textuales concretos, sin parafraseo. */
  hallazgos: string[];
  /** Metadata estructurada adicional (composición detectada, plataformas, etc.). */
  meta: Record<string, unknown>;
};

export const verificacionesAuditoria: VerificacionAuditoria[] = [];

export const verificacionesAuditoriaMeta = {
  sincronizadoEl: null as string | null,
  total: 0,
  resultadosPorTipo: {
    ok: 0,
    desactualizado: 0,
    indeterminado: 0,
    error: 0,
  },
} as const;

/** Búsqueda por id de la verificación correlacionada a una brecha. */
export function verificacionPorBrechaId(
  brechaId: string
): VerificacionAuditoria | undefined {
  return verificacionesAuditoria.find(
    (v) => v.brechaIdRelacionada === brechaId
  );
}
