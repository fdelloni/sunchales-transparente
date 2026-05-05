/**
 * Página de detalle de una norma del Digesto Municipal de Sunchales.
 *
 * Muestra:
 *  - metadata (tipo, número, año, fecha, título)
 *  - estado de vigencia con badge semafórico
 *  - texto completo (HTML del Digesto oficial, sanitizado)
 *  - relaciones DETECTADAS automáticamente con cita textual:
 *      * "esta norma deroga / modifica a otras"
 *      * "esta norma fue derogada / modificada por otras"
 *  - link al PDF original del Digesto
 *
 * Datos:
 *  - Metadata: src/lib/data/digesto-oficial.generated.ts
 *  - Texto completo: data/digesto-oficial/items_completos.json
 *  - Relaciones: data/digesto-oficial/relaciones.json
 *  - Estados: data/digesto-oficial/estados.json
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";
import { readFileSync, existsSync } from "node:fs";
import {
  normasOficiales,
  urlPdfDigesto,
  type NormaOficial
} from "@/lib/data/digesto-oficial.generated";
import {
  estadosNormas,
  type EstadoVigencia
} from "@/lib/data/digesto-estados.generated";

type ItemCompleto = {
  id: number;
  tipo: string;
  numero: string;
  anio: number;
  fecha: string | null;
  titulo: string;
  pdf: string | null;
  observacion: string | null;
  texto: string | null;
};

type RelacionCruda = {
  normaOrigen: { id: number; tipo: string; numero: string; anio: number };
  normaAfectada: { tipo: string; numero: string; anio: number | null };
  tipo: "deroga" | "modifica";
  alcance: "total" | "parcial";
  articulos: string[];
  citaTextual: string;
  idDestino: number | null;
};

// ---------------------------------------------------------------------------
// Carga de datos en build/server (no afecta bundle de cliente)
// ---------------------------------------------------------------------------

const RAIZ = path.resolve(process.cwd());
const RUTA_ITEMS = path.join(RAIZ, "data", "digesto-oficial", "items_completos.json");
const RUTA_REL = path.join(RAIZ, "data", "digesto-oficial", "relaciones.json");

function cargarItemsCompletos(): Record<string, ItemCompleto> {
  if (!existsSync(RUTA_ITEMS)) return {};
  return JSON.parse(readFileSync(RUTA_ITEMS, "utf-8"));
}

function cargarRelaciones(): RelacionCruda[] {
  if (!existsSync(RUTA_REL)) return [];
  const raw = JSON.parse(readFileSync(RUTA_REL, "utf-8"));
  return Array.isArray(raw.relaciones) ? raw.relaciones : [];
}

// ---------------------------------------------------------------------------
// Sanitización mínima del HTML del Digesto
//
// Permitimos sólo etiquetas de texto/estructura básicas; quitamos scripts,
// estilos inline, links externos y atributos que podrían romper el layout.
// El Digesto sirve HTML limpio, pero esto es defensa en profundidad.
// ---------------------------------------------------------------------------

const TAGS_PERMITIDAS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s",
  "ul", "ol", "li", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "table", "thead", "tbody", "tr", "td", "th",
  "div", "span"
]);

function sanitizarHtml(html: string): string {
  // 1) borrar bloques peligrosos enteros
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  // 2) quitar atributos on* (handlers de eventos) y style inline
  s = s.replace(/\s(on\w+|style|class|id)\s*=\s*"[^"]*"/gi, "");
  s = s.replace(/\s(on\w+|style|class|id)\s*=\s*'[^']*'/gi, "");

  // 3) <a href="..."> → reemplazar por <span> (los links del Digesto van a su
  //    propio sistema; preferimos no exponerlos sin haberlos verificado)
  s = s.replace(/<a\b[^>]*>/gi, "<span>");
  s = s.replace(/<\/a>/gi, "</span>");

  // 4) borrar etiquetas no whitelisted (preserva el contenido)
  s = s.replace(/<\/?([a-zA-Z0-9]+)\b[^>]*>/g, (m, tag) => {
    return TAGS_PERMITIDAS.has(String(tag).toLowerCase()) ? m : "";
  });

  return s;
}

// ---------------------------------------------------------------------------
// Generación estática
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return normasOficiales.map((n) => ({ id: String(n.id) }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const n = normasOficiales.find((x) => x.id === id);
  if (!n) return { title: "Norma no encontrada · Sunchales Transparente" };
  return {
    title: `${n.tipo} N° ${n.numero}/${n.anio} · Sunchales Transparente`,
    description: n.titulo
  };
}

// ---------------------------------------------------------------------------
// Vista
// ---------------------------------------------------------------------------

export default function NormaDetallePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) notFound();

  const norma: NormaOficial | undefined = normasOficiales.find((n) => n.id === id);
  if (!norma) notFound();

  const items = cargarItemsCompletos();
  const itemCompleto = items[String(id)];
  const todasRelaciones = cargarRelaciones();

  // Esta norma → afecta a otras
  const afectaA = todasRelaciones.filter(
    (r) => r.normaOrigen?.id === id
  );
  // Esta norma ← afectada por otras
  const afectadaPor = todasRelaciones.filter(
    (r) => r.idDestino === id
  );

  const estado: EstadoVigencia = estadosNormas[id] ?? "vigente";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500">
        <Link href="/digesto" className="hover:text-coral-dark">
          ← Volver al Digesto
        </Link>
      </nav>

      {/* Encabezado */}
      <span className="eyebrow mt-4 inline-block">{norma.tipo}</span>
      <div className="mt-1 flex flex-wrap items-baseline gap-3">
        <h1 className="font-serif text-3xl font-bold text-navy md:text-4xl">
          N° {norma.numero}/{norma.anio}
        </h1>
        <EstadoBadgeGrande estado={estado} />
      </div>
      <p className="mt-3 text-base text-slate-700 md:text-lg">{norma.titulo}</p>

      {/* Metadata + acciones */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <Pill label="Fecha de sanción" valor={norma.fecha ?? "no informada"} />
        {norma.pdf && (
          <a
            href={urlPdfDigesto(norma.pdf) ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-coral/40 bg-amber-50/40 px-3 py-1.5 text-xs font-semibold text-coral-dark hover:bg-amber-50"
          >
            📄 Ver PDF original del Digesto Municipal →
          </a>
        )}
      </div>

      {/* Relaciones detectadas */}
      {(afectaA.length > 0 || afectadaPor.length > 0) && (
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {afectaA.length > 0 && (
            <BloqueRelaciones
              titulo="Esta norma afecta a"
              tono="origen"
              relaciones={afectaA.map((r) => ({
                tipo: r.tipo,
                alcance: r.alcance,
                articulos: r.articulos,
                citaTextual: r.citaTextual,
                otra: {
                  tipo: r.normaAfectada.tipo,
                  numero: r.normaAfectada.numero,
                  anio: r.normaAfectada.anio,
                  idDestino: r.idDestino
                }
              }))}
            />
          )}
          {afectadaPor.length > 0 && (
            <BloqueRelaciones
              titulo="Esta norma fue afectada por"
              tono="destino"
              relaciones={afectadaPor.map((r) => ({
                tipo: r.tipo,
                alcance: r.alcance,
                articulos: r.articulos,
                citaTextual: r.citaTextual,
                otra: {
                  tipo: r.normaOrigen.tipo,
                  numero: r.normaOrigen.numero,
                  anio: r.normaOrigen.anio,
                  idDestino: r.normaOrigen.id
                }
              }))}
            />
          )}
        </section>
      )}

      {/* Texto completo */}
      <section className="mt-10">
        <h2 className="font-serif text-xl font-bold text-navy">Texto de la norma</h2>
        <p className="mt-1 text-xs text-slate-500">
          Texto sincronizado desde el Digesto Municipal oficial. Si hay diferencias
          con el PDF, prevalece el PDF firmado.
        </p>
        {itemCompleto?.texto ? (
          <div
            className="texto-norma mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm"
            dangerouslySetInnerHTML={{ __html: sanitizarHtml(itemCompleto.texto) }}
          />
        ) : (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            El texto completo no está disponible localmente. Podés consultarlo en el{" "}
            <a
              href={norma.pdf ? urlPdfDigesto(norma.pdf) ?? "#" : "https://sunchales.miportal.ar/digesto"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-dark underline"
            >
              PDF oficial
            </a>
            . Para descargar y procesar localmente, ejecutá{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">
              npm run sincronizar-digesto
            </code>
            .
          </div>
        )}
        {itemCompleto?.observacion && (
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50/60 p-3 text-sm text-amber-900">
            <strong className="block text-xs uppercase tracking-widest text-amber-700">
              Observación oficial
            </strong>
            <div className="mt-1" dangerouslySetInnerHTML={{ __html: sanitizarHtml(itemCompleto.observacion) }} />
          </div>
        )}
      </section>

      {/* Pie metodológico */}
      <footer className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p>
          <strong>ID interno del Digesto:</strong> {norma.id} · <strong>Fuente:</strong>{" "}
          <a
            href="https://sunchales.miportal.ar/digesto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-dark underline"
          >
            sunchales.miportal.ar/digesto
          </a>
        </p>
        <p className="mt-1">
          La clasificación de vigencia (badge superior) es algorítmica: surge del
          análisis con Gemini 2.5 Flash sobre el texto de las normas posteriores
          que cita esta. Para auditarla, mirá la sección "Esta norma fue afectada
          por" arriba — cada relación incluye la cita textual que la justifica.
        </p>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componentes auxiliares
// ---------------------------------------------------------------------------

function Pill({ label, valor }: { label: string; valor: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
      <span className="font-bold uppercase tracking-widest text-slate-500">{label}:</span>
      <span className="font-semibold text-navy tabular-nums">{valor}</span>
    </span>
  );
}

function EstadoBadgeGrande({ estado }: { estado: EstadoVigencia }) {
  const cfg = {
    vigente: {
      cls: "bg-emerald-100 text-emerald-800 border-emerald-300",
      lbl: "Vigente"
    },
    modificada: {
      cls: "bg-amber-100 text-amber-800 border-amber-300",
      lbl: "Modificada"
    },
    derogada: {
      cls: "bg-red-100 text-red-800 border-red-300",
      lbl: "Derogada"
    }
  } as const;
  const c = cfg[estado];
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${c.cls}`}
    >
      {c.lbl}
    </span>
  );
}

type RelacionVista = {
  tipo: "deroga" | "modifica";
  alcance: "total" | "parcial";
  articulos: string[];
  citaTextual: string;
  otra: { tipo: string; numero: string; anio: number | null; idDestino: number | null };
};

function BloqueRelaciones({
  titulo,
  tono,
  relaciones
}: {
  titulo: string;
  tono: "origen" | "destino";
  relaciones: RelacionVista[];
}) {
  const headerCls =
    tono === "origen"
      ? "border-blue-200 bg-blue-50 text-blue-800"
      : "border-amber-200 bg-amber-50 text-amber-800";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${headerCls}`}>
        {titulo}
      </h3>
      <ul className="mt-3 space-y-3">
        {relaciones.map((r, i) => (
          <li key={i} className="border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-baseline gap-2 text-sm">
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  r.tipo === "deroga"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {r.tipo === "deroga" ? "Deroga" : "Modifica"}
                {r.alcance === "parcial" ? " (parcial)" : ""}
              </span>
              {r.otra.idDestino ? (
                <Link
                  href={`/digesto/${r.otra.idDestino}`}
                  className="font-semibold text-navy hover:text-coral-dark hover:underline"
                >
                  {r.otra.tipo} N° {r.otra.numero}
                  {r.otra.anio ? `/${r.otra.anio}` : ""}
                </Link>
              ) : (
                <span className="font-semibold text-slate-500">
                  {r.otra.tipo} N° {r.otra.numero}
                  {r.otra.anio ? `/${r.otra.anio}` : ""}
                  <span className="ml-1 text-[10px] font-normal text-slate-400">
                    (no sincronizada — anterior a 2022)
                  </span>
                </span>
              )}
              {r.articulos.length > 0 && (
                <span className="text-xs text-slate-500">
                  art. {r.articulos.join(", ")}
                </span>
              )}
            </div>
            <blockquote className="mt-2 border-l-2 border-slate-200 pl-3 text-xs italic text-slate-600">
              “{r.citaTextual}”
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
