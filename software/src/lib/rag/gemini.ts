/**
 * Cliente de generacion de Gemini 2.5 Flash.
 *
 * Modelo: gemini-2.5-flash (rapido, barato, multimodal, free tier generoso).
 *
 * Documentacion oficial:
 *   https://ai.google.dev/gemini-api/docs/text-generation
 */

const ENDPOINT_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODELO_DEFAULT = "gemini-2.5-flash";

export type ConfigGeneracion = {
  /** modelo a usar (default gemini-2.5-flash) */
  modelo?: string;
  /** maximo de tokens en la respuesta (default 600 para WhatsApp) */
  maxOutputTokens?: number;
  /** temperatura 0..2 (default 0.3 para respuestas factuales) */
  temperatura?: number;
  /** instrucciones de sistema (reglas duras del bot) */
  systemInstruction?: string;
};

/**
 * Genera respuesta a una pregunta. Bloquea hasta tener la respuesta
 * completa (no streaming).
 */
export async function generar(
  pregunta: string,
  cfg: ConfigGeneracion = {},
  apiKey?: string
): Promise<string> {
  const key = apiKey ?? process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("GOOGLE_API_KEY no configurada");

  const modelo = cfg.modelo ?? process.env.GEMINI_MODELO ?? MODELO_DEFAULT;
  const url = `${ENDPOINT_BASE}/${modelo}:generateContent?key=${key}`;

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
    throw new Error(`Gemini generate ${res.status}: ${txt}`);
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
  if (!texto) throw new Error("Gemini devolvio respuesta vacia");

  return texto;
}
