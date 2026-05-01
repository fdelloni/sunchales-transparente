/**
 * Proveedor Google — llama a la API de Gemini.
 * Modelo objetivo: gemini-2.5-flash (rápido y económico, con tier gratuito
 * generoso en Google AI Studio).
 *
 * Documentación: https://ai.google.dev/api/generate-content
 *
 * El formato de la API es distinto al de Anthropic: el system prompt va en
 * `systemInstruction` y los mensajes en `contents` con estructura `parts`.
 * Lo aislamos acá para que el endpoint /api/v1/chat sea agnóstico al proveedor.
 */

import type { Proveedor } from "@/lib/chat/proveedores/types";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  promptFeedback?: { blockReason?: string };
};

export const proveedorGoogle: Proveedor = {
  nombre: "google",
  modeloPorDefecto: "gemini-2.5-flash",

  estaConfigurado() {
    return Boolean(process.env.GOOGLE_API_KEY);
  },

  async generar({ systemPrompt, pregunta, maxTokens = 500, modelo }) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY no está configurada");
    const modeloUsar = modelo ?? process.env.GOOGLE_MODEL ?? "gemini-2.5-flash";

    const url = `${ENDPOINT}/${modeloUsar}:generateContent`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Mandamos la key por header (más seguro que ?key= en la URL: no
        // queda en logs de proxies, ni en el history del navegador, ni en
        // referers accidentales).
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: pregunta }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          // Temperatura baja: queremos respuestas factuales, no creativas.
          temperature: 0.2
        },
        // Bloqueamos contenido "harm" alto (default). Para chatbot ciudadano
        // los defaults de Google son apropiados.
        safetySettings: []
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Google Gemini API ${res.status}: ${errBody}`);
    }

    const data = (await res.json()) as GeminiResponse;

    if (data.promptFeedback?.blockReason) {
      throw new Error(`Gemini bloqueó la respuesta: ${data.promptFeedback.blockReason}`);
    }

    const texto =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    if (!texto.trim()) throw new Error("Gemini devolvió respuesta vacía");
    return { texto: texto.trim(), modelo: modeloUsar };
  }
};
