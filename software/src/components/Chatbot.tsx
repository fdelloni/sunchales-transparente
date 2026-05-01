"use client";

/**
 * Widget flotante del Asistente Ciudadano. Conversa con /api/v1/chat.
 *
 * Diseño:
 *   - Botón circular en la esquina inferior derecha (z-index alto, no tapa nada).
 *   - Panel desplegable de ~360x520 px (responsive: full-width en mobile).
 *   - Conversación efímera (no se persiste; al cerrar el panel queda igual,
 *     al recargar la página se borra). Esto refuerza el principio de
 *     privacidad por diseño del proyecto.
 *
 * Etiquetado honesto:
 *   - Si el endpoint reporta modo "demo", el header lo dice explícitamente:
 *     "Modo demo (sin IA activa)". Nunca pretendemos tener IA cuando no la hay.
 *   - Se incluye disclaimer corto: "Información pública verificada. No reemplaza
 *     al canal oficial."
 */

import { useEffect, useRef, useState } from "react";

type Mensaje =
  | {
      rol: "asistente";
      texto: string;
      links?: { label: string; href: string }[];
      fuente?: string;
      url?: string;
      aviso?: string;
      origen?: "documento" | "ia" | "demo" | "sin_respuesta" | "guardrail";
      modelo?: string;
      proveedor?: string;
    }
  | { rol: "usuario"; texto: string };

type MetaChat = {
  modo: "ia" | "rag" | "demo";
  proveedor: string | null;
  modelo: string | null;
  sugeridas: string[];
  aviso?: string;
};

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [meta, setMeta] = useState<MetaChat | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  // Tooltip que invita a abrir el chat en el primer ingreso a la página.
  // Aparece a los 3s, se queda 8s visible, y se va sola si no se interactúa.
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  // Si el usuario ya cerró el tooltip o abrió el chat, no lo volvemos a mostrar.
  const [yaInteractuo, setYaInteractuo] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  // Timer del tooltip de bienvenida.
  useEffect(() => {
    if (yaInteractuo || abierto) return;
    const tIn = setTimeout(() => setMostrarTooltip(true), 3000);
    const tOut = setTimeout(() => setMostrarTooltip(false), 11000);
    return () => {
      clearTimeout(tIn);
      clearTimeout(tOut);
    };
  }, [yaInteractuo, abierto]);

  function abrirChat() {
    setAbierto(true);
    setMostrarTooltip(false);
    setYaInteractuo(true);
  }
  function cerrarTooltip() {
    setMostrarTooltip(false);
    setYaInteractuo(true);
  }

  // Cargar meta cuando se abre por primera vez (lazy: ahorra tiempo de carga inicial).
  useEffect(() => {
    if (abierto && !meta) {
      fetch("/api/v1/chat")
        .then((r) => r.json())
        .then((d: MetaChat) => {
          setMeta(d);
          const saludo =
            d.modo === "ia"
              ? `Hola, soy el Asistente Ciudadano. Primero busco en una base documental verificada (gratis); si no encuentro, consulto a la IA (${d.proveedor === "google" ? "Gemini 2.5 Flash" : "Claude Haiku"}). ¿En qué puedo ayudarte?`
              : d.modo === "rag"
                ? "Hola, soy el Asistente Ciudadano. Respondo desde una base documental pública verificada — cada respuesta cita su fuente. Probá:"
                : "Hola, soy el Asistente Ciudadano. Estoy en modo demo (respuestas pregrabadas). Probá:";
          setMensajes([{ rol: "asistente", texto: saludo }]);
        })
        .catch(() => {
          setMeta({ modo: "demo", proveedor: null, modelo: null, sugeridas: [] });
          setMensajes([
            {
              rol: "asistente",
              texto: "No puedo conectarme al servicio. Probá recargar la página."
            }
          ]);
        });
    }
  }, [abierto, meta]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, cargando, abierto]);

  async function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio || cargando) return;
    setMensajes((prev) => [...prev, { rol: "usuario", texto: limpio }]);
    setInput("");
    setCargando(true);
    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pregunta: limpio })
      });
      const data = await res.json();
      if (!res.ok) {
        setMensajes((prev) => [
          ...prev,
          { rol: "asistente", texto: data.error ?? "Error inesperado." }
        ]);
      } else {
        setMensajes((prev) => [
          ...prev,
          {
            rol: "asistente",
            texto: data.respuesta,
            links: data.links,
            fuente: data.fuente,
            url: data.url,
            aviso: data.aviso,
            origen: data.modo,
            modelo: data.modelo,
            proveedor: data.proveedor
          }
        ]);
      }
    } catch (err) {
      setMensajes((prev) => [
        ...prev,
        {
          rol: "asistente",
          texto: "Tuve un problema de red. Probá de nuevo en un momento."
        }
      ]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      {/* Tooltip de bienvenida — aparece a los 3s la primera vez */}
      {mostrarTooltip && !abierto && (
        <div
          className="fixed bottom-[5.5rem] right-5 z-40 flex max-w-[260px] animate-fade-in items-center gap-2 rounded-2xl rounded-br-sm border border-coral/30 bg-white px-4 py-3 shadow-xl shadow-coral/20 sm:bottom-24 sm:right-6"
          role="status"
        >
          <div className="flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-coral-dark">
              Asistente Ciudadano
            </div>
            <div className="mt-0.5 text-sm text-navy">
              ¿Tenés una consulta? Preguntame acá.
            </div>
          </div>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={cerrarTooltip}
            className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          {/* Punta del globo apuntando al botón */}
          <span className="absolute -bottom-1 right-6 h-3 w-3 rotate-45 border-b border-r border-coral/30 bg-white" />
        </div>
      )}

      {/* Botón flotante con pulse sutil de respiración + badge de "no leído" */}
      <button
        type="button"
        aria-label={abierto ? "Cerrar asistente" : "Abrir Asistente Ciudadano"}
        onClick={() => (abierto ? setAbierto(false) : abrirChat())}
        className="group fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-coral text-zinc-900 shadow-xl shadow-coral/40 transition-transform duration-200 hover:scale-110 hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-coral/40 sm:bottom-6 sm:right-6"
      >
        {/* Halo animado: dos anillos pulsantes detrás del botón. Solo cuando NO está abierto. */}
        {!abierto && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-coral/40 opacity-60"
              style={{ animationDuration: "2.6s" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-coral/30 opacity-50"
              style={{ animationDuration: "3.4s", animationDelay: "0.7s" }}
            />
          </>
        )}

        {abierto ? (
          // Icono X (cerrar)
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="relative z-10">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          // Icono chat con 3 puntitos (más reconocible como "preguntale")
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" className="relative z-10">
            <path
              d="M4 6.5A3.5 3.5 0 017.5 3h9A3.5 3.5 0 0120 6.5v6a3.5 3.5 0 01-3.5 3.5H10l-4 3.5v-3.5H7.5A3.5 3.5 0 014 12.5v-6z"
              fill="currentColor"
            />
            <circle cx="9" cy="9.5" r="1.2" fill="white" />
            <circle cx="12" cy="9.5" r="1.2" fill="white" />
            <circle cx="15" cy="9.5" r="1.2" fill="white" />
          </svg>
        )}

        {/* Punto de notificación: solo mientras el usuario no haya interactuado */}
        {!abierto && !yaInteractuo && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 z-20 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-rose-500"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          </span>
        )}
      </button>

      {/* Panel */}
      {abierto && (
        <div
          role="dialog"
          aria-label="Asistente Ciudadano"
          className="fixed bottom-24 right-3 z-50 flex h-[78vh] max-h-[600px] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-white">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br from-coral to-coral-dark font-black text-zinc-900">
                S
              </div>
              <div>
                <div className="font-serif text-sm font-bold">Asistente Ciudadano</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-300">
                  {meta?.modo === "ia" ? (
                    <>
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      RAG + {meta.proveedor === "google" ? "Gemini Flash" : "Claude Haiku"}
                    </>
                  ) : meta?.modo === "rag" ? (
                    <>
                      <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                      Base documental verificada
                    </>
                  ) : (
                    <>
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                      Modo demo
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="rounded p-1 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3 text-sm">
            {mensajes.map((m, i) => (
              <Burbuja key={i} mensaje={m} />
            ))}
            {cargando && (
              <div className="flex items-center gap-2 text-slate-500">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]" />
              </div>
            )}

            {/* Sugerencias (solo si nadie escribió aún) */}
            {meta && mensajes.filter((m) => m.rol === "usuario").length === 0 && meta.sugeridas.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                {meta.sugeridas.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => enviar(s)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-[13px] text-navy transition hover:border-coral hover:bg-amber-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={finRef} />
          </div>

          {/* Disclaimer */}
          <div className="border-t border-slate-200 bg-white px-3 py-1.5 text-[10.5px] leading-tight text-slate-500">
            Solo información pública verificada. No reemplaza canales oficiales.
            No guardamos tus mensajes.
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta…"
              maxLength={600}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-navy outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
              disabled={cargando}
            />
            <button
              type="submit"
              disabled={!input.trim() || cargando}
              className="grid h-9 w-9 place-items-center rounded-lg bg-coral text-zinc-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Enviar"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M3 12l18-9-7 18-2-7-9-2z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Burbuja({ mensaje }: { mensaje: Mensaje }) {
  if (mensaje.rol === "usuario") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-3 py-2 text-white">
          {mensaje.texto}
        </div>
      </div>
    );
  }

  const origenLabel =
    mensaje.origen === "documento"
      ? { texto: "Documento verificado", color: "bg-sky-50 text-sky-700 border-sky-200" }
      : mensaje.origen === "ia"
        ? {
            texto: `IA generativa · ${mensaje.proveedor === "google" ? "Gemini Flash" : "Claude Haiku"}`,
            color: "bg-emerald-50 text-emerald-700 border-emerald-200"
          }
        : mensaje.origen === "guardrail"
          ? { texto: "Política del asistente", color: "bg-slate-100 text-slate-700 border-slate-300" }
          : null;

  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] space-y-1.5">
        <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3 py-2 text-slate-800 whitespace-pre-line">
          {mensaje.texto}
        </div>
        {origenLabel && (
          <div
            className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${origenLabel.color}`}
          >
            {origenLabel.texto}
          </div>
        )}
        {mensaje.aviso && (
          <div className="rounded border-l-2 border-amber-400 bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
            {mensaje.aviso}
          </div>
        )}
        {mensaje.fuente && (
          <div className="px-1 text-[10.5px] text-slate-500">
            Fuente: {mensaje.fuente}
            {mensaje.url && (
              <>
                {" — "}
                <a
                  href={mensaje.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coral-dark hover:underline"
                >
                  ver
                </a>
              </>
            )}
          </div>
        )}
        {mensaje.links && mensaje.links.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {mensaje.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-coral/40 bg-amber-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-dark hover:bg-amber-100"
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
