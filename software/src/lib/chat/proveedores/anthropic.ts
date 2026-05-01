/**
 * Proveedor Anthropic — llama a la Messages API de Claude.
 * Modelo objetivo: claude-haiku-4-5-20251001 (el más económico).
 *
 * Documentación: https://docs.anthropic.com/en/api/messages
 */

import type { Proveedor } from "@/lib/chat/proveedores/types";

export const proveedorAnthropic: Proveedor = {
  nombre: "anthropic",
  modeloPorDefecto: "claude-haiku-4-5-20251001",

  estaConfigurado() {
    return Boolean(process.env.ANTHROPIC_API_KEY);
  },

  async generar({ systemPrompt, pregunta, maxTokens = 500, modelo }) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY no está configurada");
    const modeloUsar = modelo ?? process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: modeloUsar,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: pregunta }]
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Anthropic API ${res.status}: ${errBody}`);
    }

    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const texto = data.content?.find((b) => b.type === "text")?.text ?? "";
    if (!texto) throw new Error("Anthropic devolvió respuesta vacía");
    return { texto, modelo: modeloUsar };
  }
};
