/**
 * Contrato común para todos los proveedores de LLM.
 * Mantener esta interfaz simple es lo que permite agregar/cambiar proveedor
 * sin tocar el endpoint /api/v1/chat ni el system prompt.
 */

export type EntradaGeneracion = {
  systemPrompt: string;
  pregunta: string;
  /** Tope de tokens de la respuesta. Default 500. */
  maxTokens?: number;
  /** Override del modelo. Cada proveedor tiene un modelo por defecto. */
  modelo?: string;
};

export type SalidaGeneracion = {
  texto: string;
  modelo: string;
};

export interface Proveedor {
  /** Identificador estable (anthropic | google | otro). */
  nombre: string;
  /** Nombre del modelo por defecto que usa el proveedor. */
  modeloPorDefecto: string;
  /** Devuelve true si el proveedor tiene su API key seteada en env. */
  estaConfigurado(): boolean;
  /** Genera la respuesta. Throwea en error de red/auth/etc. */
  generar(entrada: EntradaGeneracion): Promise<SalidaGeneracion>;
}
