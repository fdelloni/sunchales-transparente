/**
 * Tipos compartidos del chatbot de WhatsApp.
 *
 * Modelo conversacional:
 *   - El bot mantiene un `EstadoSesion` por número de WhatsApp.
 *   - Cada `Intent` se atiende con un `Handler` puro (entrada → salida)
 *     que puede mutar el estado.
 *   - La salida es siempre uno o varios `MensajeSaliente` que el webhook
 *     serializa a TwiML.
 */

export type Intent =
  | "menu"
  | "faq"
  | "transparencia"
  | "reclamo"
  | "ia"
  | "salir"
  | "ayuda";

/**
 * Sub-flujo dentro de "reclamo": el alta es multi-paso.
 */
export type PasoReclamo =
  | null
  | "esperando_categoria"
  | "esperando_descripcion"
  | "esperando_direccion"
  | "esperando_confirmacion";

export type EstadoSesion = {
  /** Numero WhatsApp en formato E.164 con prefijo "whatsapp:" (ej: "whatsapp:+5493493xxxxxx") */
  from: string;
  /** Intent actualmente activo (para flujos multi-turno). null = libre. */
  intentActivo: Intent | null;
  /** Estado del sub-flujo de reclamo. */
  pasoReclamo: PasoReclamo;
  /** Datos parciales del reclamo en construccion. */
  reclamoBorrador: {
    categoria?: string;
    descripcion?: string;
    direccion?: string;
  };
  /** Marca temporal de la ultima interaccion. */
  ultimaActualizacion: number;
};

export type MensajeEntrante = {
  from: string;            // "whatsapp:+5493493xxxxxx"
  to: string;              // "whatsapp:+14155238886"
  body: string;            // texto crudo enviado por el usuario
  numMedia: number;        // cantidad de adjuntos (0 si solo texto)
  mediaUrls: string[];     // URLs publicas a los adjuntos (Twilio las firma)
  profileName?: string;    // nombre publico del contacto en WhatsApp
};

export type MensajeSaliente = {
  texto: string;
};

export type ContextoHandler = {
  entrada: MensajeEntrante;
  sesion: EstadoSesion;
};

export type ResultadoHandler = {
  respuesta: MensajeSaliente;
  /** El handler puede pedir que se actualice el estado de la sesion. */
  nuevoEstado?: Partial<EstadoSesion>;
};

export type Handler = (ctx: ContextoHandler) => Promise<ResultadoHandler>;
