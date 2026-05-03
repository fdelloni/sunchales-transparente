"use client";

/**
 * Buscador embebido por sección.
 *
 * Reusa el endpoint /api/v1/chat (pipeline RAG + Gemini) y muestra:
 *  - la respuesta con etiqueta visual de origen (BM25 verificado vs IA con contexto),
 *  - la fuente citada cuando existe,
 *  - un link "Ver fuente completa →" hacia el doc/sección original,
 *  - cuando no se encuentra: CTA al pedido formal de acceso (Ord. 1872/2009).
 *
 * Diseño coherente con el sistema de etiquetado honesto del sitio:
 *  - Verde "Verificado" = match directo en base documental.
 *  - Amarillo "Generado con IA" = LLM con contexto RAG (puede contener síntesis).
 *  - Gris "Sin información publicada" = no hay doc; sugerimos pedido formal.
 */

import { useState } from "react";
import Link from "next/link";

type RespuestaApi =
  | {
      modo: "documento";
      respuesta: string;
      fuente?: string;
      url?: string;
      categoria?: string;
      confianza?: number;
      doc_id?: string;
      links?: Array<{ label: string; href: string }>;
    }
  | {
      modo: "ia";
      respuesta: string;
      proveedor?: string;
      modelo?: string;
      contexto_usado?: string[];
    }
  | {
      modo: "demo";
      respuesta: string;
      fuente?: string;
      links?: Array<{ label: string; href: string }>;
    }
  | {
      modo: "guardrail";
      respuesta: string;
      motivo?: string;
      links?: Array<{ label: string; href: string }>;
    }
  | {
      modo: "sin_respuesta";
      respuesta: string;
      links?: Array<{ label: string; href: string }>;
    }
  | { error: string };

type Props = {
  /** Título arriba del buscador (opcional). Si se omite, no se muestra. */
  titulo?: string;
  /** Texto introductorio (opcional). Si se omite, no se muestra. */
  descripcion?: string;
  /** Placeholder del input */
  placeholder?: string;
  /** Preguntas sugeridas para mostrar como botones */
  sugerencias?: string[];
  /** Link a la sección "completa" cuando no encuentra (override del CTA) */
  ctaSinResultado?: { label: string; href: string };
  /** Variante visual: "default" (caja con borde coral) o "compacto" (sin caja, más sobrio) */
  variante?: "default" | "compacto";
};

export default function BuscadorSeccion({
  titulo,
  descripcion,
  placeholder = "¿Qué querés saber?",
  sugerencias = [],
  ctaSinResultado,
  variante = "default",
}: Props) {
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resp, setResp] = useState<RespuestaApi | null>(null);
  const [errorRed, setErrorRed] = useState<string | null>(null);

  async function consultar(texto: string) {
    setCargando(true);
    setResp(null);
    setErrorRed(null);
    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pregunta: texto }),
      });
      const data: RespuestaApi = await res.json();
      setResp(data);
    } catch (e) {
      setErrorRed(
        "No se pudo conectar con el buscador. Probá nuevamente en unos segundos."
      );
    } finally {
      setCargando(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = pregunta.trim();
    if (!texto) return;
    consultar(texto);
  }

  function usarSugerencia(s: string) {
    setPregunta(s);
    consultar(s);
  }

  const esCompacto = variante === "compacto";
  const wrapperCls = esCompacto
    ? ""
    : "relative overflow-hidden rounded-xl bg-navy p-4 shadow-lg ring-1 ring-coral/30 sm:p-5";

  return (
    <div>
    <section className={wrapperCls}>
      {/* Acento coral lateral, igual que el hero */}
      {!esCompacto && (
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-coral to-coral-dark" />
      )}

      {(titulo || descripcion) && (
        <div className={esCompacto ? "mb-2" : "relative mb-3 flex items-start gap-3"}>
          {!esCompacto && (
            <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-coral text-lg font-black text-zinc-900 shadow-md">
              ?
            </div>
          )}
          <div>
            {titulo && (
              <h2 className={`font-serif text-lg font-bold ${esCompacto ? "text-navy" : "text-white"}`}>
                {titulo}
              </h2>
            )}
            {descripcion && (
              <p className={`mt-0.5 text-xs ${esCompacto ? "text-slate-700" : "text-slate-300"}`}>
                {descripcion}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="relative flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          {!esCompacto && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-coral-dark">
              🔍
            </span>
          )}
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder={placeholder}
            maxLength={600}
            className={
              esCompacto
                ? "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
                : "w-full rounded-md border border-coral/40 bg-white px-3 py-2 pl-10 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-coral focus:ring-2 focus:ring-coral/40"
            }
            disabled={cargando}
          />
        </div>
        <button
          type="submit"
          disabled={cargando || !pregunta.trim()}
          className={
            esCompacto
              ? "rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              : "rounded-md bg-coral px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-sm hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          {cargando ? "Buscando…" : "Buscar"}
        </button>
      </form>

      {sugerencias.length > 0 && !resp && !cargando && (
        <div className="relative mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-semibold uppercase tracking-widest ${esCompacto ? "text-slate-500" : "text-coral"}`}>
              Probá:
            </span>
            {sugerencias.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => usarSugerencia(s)}
                className={
                  esCompacto
                    ? "rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-[11px] text-slate-700 hover:border-coral hover:text-coral-dark"
                    : "rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] text-slate-100 transition hover:border-coral hover:bg-coral/20 hover:text-white"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {errorRed && (
        <div className="relative mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {errorRed}
        </div>
      )}
    </section>

    {/* Resultado FUERA del wrapper navy: así no lo recorta el overflow-hidden
        y la respuesta puede tener cualquier longitud. */}
    {resp && <ResultadoCard resp={resp} ctaSinResultado={ctaSinResultado} />}
    </div>
  );
}

function ResultadoCard({
  resp,
  ctaSinResultado,
}: {
  resp: RespuestaApi;
  ctaSinResultado?: { label: string; href: string };
}) {
  if ("error" in resp) {
    return (
      <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
        {resp.error}
      </div>
    );
  }

  // Caso 1: documento verificado (BM25 con confianza alta)
  if (resp.modo === "documento") {
    return (
      <article className="mt-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-5">
        <Etiqueta tono="verde" texto="Información verificada en base documental" />
        <p className="mt-2 text-sm leading-relaxed text-slate-800">{resp.respuesta}</p>
        <Fuente fuente={resp.fuente} url={resp.url} />
        {resp.confianza !== undefined && (
          <p className="mt-2 text-[11px] text-slate-500">
            Confianza del match: {(resp.confianza * 100).toFixed(0)}%
          </p>
        )}
        {resp.links && resp.links.length > 0 && <ListaLinks links={resp.links} />}
      </article>
    );
  }

  // Caso 2: respuesta sintetizada por IA con contexto RAG
  if (resp.modo === "ia") {
    return (
      <article className="mt-4 rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-5">
        <Etiqueta
          tono="amarillo"
          texto={`Resumen generado por IA (${resp.modelo ?? resp.proveedor ?? "Gemini"}) con base en documentos del corpus`}
        />
        <p className="mt-2 text-sm leading-relaxed text-slate-800">{resp.respuesta}</p>
        <p className="mt-3 text-[11px] text-amber-900">
          ⚠ Esta respuesta fue sintetizada por una IA usando los documentos verificados
          del proyecto. Te recomendamos validar contra las fuentes originales antes de
          usarla en un trámite o publicación.
        </p>
      </article>
    );
  }

  // Caso 3: pregunta bloqueada por guardrails (opinión, consejo legal/médico, etc.)
  if (resp.modo === "guardrail") {
    return (
      <article className="mt-4 rounded-2xl border-2 border-slate-300 bg-slate-50 p-5">
        <Etiqueta tono="gris" texto="Esta consulta está fuera del alcance del buscador" />
        <p className="mt-2 text-sm leading-relaxed text-slate-800">{resp.respuesta}</p>
        {resp.links && resp.links.length > 0 && <ListaLinks links={resp.links} />}
      </article>
    );
  }

  // Caso 4: fallback FAQ
  if (resp.modo === "demo") {
    return (
      <article className="mt-4 rounded-2xl border-2 border-slate-200 bg-white p-5">
        <Etiqueta tono="gris" texto="Respuesta de la base de preguntas frecuentes" />
        <p className="mt-2 text-sm leading-relaxed text-slate-800">{resp.respuesta}</p>
        <Fuente fuente={resp.fuente} />
        {resp.links && resp.links.length > 0 && <ListaLinks links={resp.links} />}
      </article>
    );
  }

  // Caso 5: sin respuesta — invitamos al pedido formal con Ord. 1872/2009
  return (
    <article className="mt-4 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/40 p-5">
      <Etiqueta tono="amarillo" texto="No hay información publicada sobre esa consulta" />
      <p className="mt-2 text-sm leading-relaxed text-amber-900">
        {resp.respuesta}
      </p>
      <p className="mt-3 text-sm text-amber-900">
        <strong>Tu derecho:</strong> podés solicitar formalmente esta información al
        municipio invocando la <strong>Ordenanza Sunchales N° 1872/2009</strong>. El
        plazo legal de respuesta es de 10 días hábiles (más 5 de prórroga
        excepcional). El trámite es <strong>gratuito</strong>, sin necesidad de
        patrocinio letrado y sin tener que justificar el motivo.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/marco-normativo"
          className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
        >
          Cómo ejercer mi derecho
        </Link>
        {ctaSinResultado && (
          <Link
            href={ctaSinResultado.href}
            className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
          >
            {ctaSinResultado.label}
          </Link>
        )}
        {resp.links?.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

function Etiqueta({
  tono,
  texto,
}: {
  tono: "verde" | "amarillo" | "gris";
  texto: string;
}) {
  const cls =
    tono === "verde"
      ? "bg-emerald-600 text-white"
      : tono === "amarillo"
        ? "bg-amber-500 text-zinc-900"
        : "bg-slate-500 text-white";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest ${cls}`}
    >
      {texto}
    </span>
  );
}

function Fuente({ fuente, url }: { fuente?: string; url?: string }) {
  if (!fuente && !url) return null;
  return (
    <p className="mt-3 text-xs text-slate-600">
      <strong className="text-slate-700">Fuente: </strong>
      {fuente && <span>{fuente}</span>}
      {url && (
        <>
          {" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-dark underline hover:text-coral"
          >
            ver fuente completa →
          </a>
        </>
      )}
    </p>
  );
}

function ListaLinks({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          {l.label} →
        </Link>
      ))}
    </div>
  );
}
