/**
 * Cliente de generacion de Gemini con reintentos y fallback de modelo.
 *
 * Estrategia:
 *   1er intento  → gemini-2.5-flash (mejor calidad, mas demandado, mas 503)
 *   2do intento  → gemini-2.0-flash (mas estable, rate limit mas alto)
 *   3er intento  → gemini-flash-latest (alias rotatorio, casi siempre vivo)
 *
 * Si los tres fallan, lanza error y el handler IA muestra mensaje al usuario.
 *
 * Documentacion oficial:
 *   https://ai.google.dev/gemini-api/docs/text-generation
 */

const ENDPOINT_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Cadena de fallback ordenada de mejor a mas estable.
const MODELOS_FALLBACK = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-flash-latest"
];

export type ConfigGeneracion = {
  /** modelo principal a usar (default gemini-2.5-flash) */
  modelo?: string;
  /** maximo de tokens en la respuesta (default 600 para WhatsApp) */
  maxOutputTokens?: number;
  /** temperatura 0..2 (default 0.3 para respuestas factuales) */
  temperatura?: number;
  /** instrucciones de sistema (reglas duras del bot) */
  systemInstruction?: string;
};

/**
 * Genera respuesta con reintentos automaticos. Si el modelo principal devuelve
 * 503/429, prueba el siguiente de la cadena de fallback.
 */
export async function generar(
  pregunta: string,
  cfg: ConfigGeneracion = {},
  apiKey?: string
): Promise<string> {
  const key = apiKey ?? process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("GOOGLE_API_KEY no configurada");

  const modeloPrincipal = cfg.modelo ?? process.env.GEMINI_MODELO ?? MODELOS_FALLBACK[0];
  const cadena = [modeloPrincipal, ...MODELOS_FALLBACK.filter((m) => m !== modeloPrincipal)];

  let ultimoError: Error | null = null;

  for (let i = 0; i < cadena.length; i++) {
    const modelo = cadena[i];
    try {
      return await intentarGenerar(modelo, pregunta, cfg, key);
    } catch (err) {
      ultimoError = err as Error;
      const msg = (err as Error).message;
      const esTransitorio =
        msg.includes(" 503") || msg.includes(" 429") || msg.includes(" 500") || msg.includes(" 502");
      if (!esTransitorio) {
        // error permanente (auth, prompt invalido, etc): no tiene sentido reintentar
        throw err;
      }
      console.warn(`[gemini] modelo ${modelo} fallo (${msg.slice(0, 100)}); intentando siguiente...`);
      // breve pausa antes del siguiente intento
      if (i < cadena.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  throw ultimoError ?? new Error("Todos los modelos Gemini fallaron sin error especifico");
}

async function intentarGenerar(
  modelo: string,
  pregunta: string,
  cfg: ConfigGeneracion,
  apiKey: string
): Promise<string> {
  const url = `${ENDPOINT_BASE}/${modelo}:generateContent?key=${apiKey}`;

  const body: Record<string, unknown> = {
    contents: [{ role: "user", parts: [{ text: pregunta }] }],
    generationConfig: {
      maxOutputTokens: cfg.maxOutputTokens ?? 600,
      temperature: cfg.temperatura ?? 0.3
    }
  };

  if (cfg.systemInstruction) {
    body.systemInstruction = {
      role: "system",
      parts: [{ text: cfg.systemInstruction }]
    };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini generate ${res.status} (${modelo}): ${txt.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
    promptFeedback?: { blockReason?: string };
  };

  if (data.promptFeedback?.blockReason) {
    throw new Error(`Gemini bloqueo el prompt: ${data.promptFeedback.blockReason}`);
  }

  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!texto) throw new Error(`Gemini ${modelo} devolvio respuesta vacia`);

  return texto;
}
