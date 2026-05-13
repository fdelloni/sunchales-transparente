import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  normasCatastrales,
  oficinaCatastro,
  tramitesCatastrales,
  recursosPublicos,
  type NormaCatastral,
} from "@/lib/data/catastro";
import { brechas } from "@/lib/data/brechas";

export const metadata = {
  title: "Catastro municipal · Sunchales Transparente",
  description:
    "Hub público de catastro y ordenamiento territorial de Sunchales. Marco normativo (Ley 26.209 + Ley SF 10.921/1992 + Ord. locales), oficina municipal, trámites, recursos provinciales (SCIT) y brechas declaradas de transparencia parcelaria.",
};

const JERARQUIA_ETIQUETA: Record<NormaCatastral["jerarquia"], string> = {
  nacional: "Nacional",
  provincial: "Provincial Santa Fe",
  municipal: "Municipal Sunchales",
  limite: "Límite legítimo",
};

const JERARQUIA_BADGE: Record<NormaCatastral["jerarquia"], string> = {
  nacional: "bg-blue-100 text-blue-900 border-blue-300",
  provincial: "bg-emerald-100 text-emerald-900 border-emerald-300",
  municipal: "bg-amber-100 text-amber-900 border-amber-300",
  limite: "bg-slate-100 text-slate-700 border-slate-300",
};

export default function CatastroPage() {
  const brechasCatastro = brechas.filter((b) => b.modulo === "catastro");
  const totalBrechas = brechasCatastro.length;
  const totalTramites = tramitesCatastrales.length;
  const totalNormas = normasCatastrales.length;

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre catastro y ordenamiento territorial…"
          ctaSinResultado={{
            label: "Presentar pedido AIP catastral",
            href: "/aip?modulo=catastro",
          }}
        />
      </div>

      <span className="eyebrow">Ordenamiento territorial</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Catastro municipal
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        El catastro es uno de los registros públicos más antiguos del Estado: lista
        las parcelas del ejido, su geometría, su valuación fiscal y su zonificación.
        La{" "}
        <a
          href="https://www.argentina.gob.ar/normativa/nacional/ley-26209-124298/texto"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-amber-500 underline-offset-2"
        >
          Ley nacional 26.209
        </a>{" "}
        establece que la publicidad del estado parcelario es función esencial de
        los catastros (Art. 1° inc. b). La geometría parcelaria, el nomenclador,
        la superficie, la valuación fiscal y la zonificación son datos sobre cosas
        — no sobre personas — y son publicables sin restricción. Solo el titular
        registral, su DNI y su domicilio fiscal quedan protegidos por la{" "}
        <a
          href="https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-slate-400 underline-offset-2"
        >
          Ley 25.326
        </a>
        .
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={String(totalBrechas)} label="Brechas catastrales declaradas" />
        <StatCard value={String(totalTramites)} label="Trámites catastrales documentados" />
        <StatCard value={String(totalNormas)} label="Normas en el marco legal" />
        <StatCard value="10 UCM" label="Arancel por consulta de dato catastral" />
      </div>

      {/* Oficina municipal */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Oficina de Catastro municipal
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Dependencia jerárquica</dt>
                <dd className="text-slate-800">{oficinaCatastro.dependencia}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Encargado</dt>
                <dd className="text-slate-800">{oficinaCatastro.encargado}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Domicilio</dt>
                <dd className="text-slate-800">{oficinaCatastro.domicilio}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Correo</dt>
                <dd>
                  <a
                    href={`mailto:${oficinaCatastro.email}`}
                    className="text-navy underline decoration-amber-500 underline-offset-2"
                  >
                    {oficinaCatastro.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Arancel de consulta</dt>
                <dd className="text-slate-800">{oficinaCatastro.arancelConsulta}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-md border-l-2 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
            <strong className="block font-semibold">Tensión con la Ley 26.209</strong>
            <p className="mt-2">
              La Ley nacional 26.209 establece la publicidad del estado parcelario
              como función esencial del catastro. Cobrar 10 UCM por cada consulta
              individual al ciudadano para acceder al dato catastral —en vez de
              publicar el plano parcelario en formato abierto y reutilizable— es
              una forma de publicidad <em>arancelada</em>, no de publicidad
              efectiva. La consulta puntual con costo se justifica para
              certificaciones formales; no para el dato catastral básico.
            </p>
          </div>
        </div>
      </section>

      {/* Trámites */}
      <section className="mt-10">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Trámites catastrales municipales
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Listado de trámites identificados en el portal municipal de trámites
          (sunchales.gob.ar). Los trámites se inician en mostrador o por correo
          electrónico de la oficina; el portal municipal no expone un sistema
          íntegro en línea.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {tramitesCatastrales.map((t) => (
            <a
              key={t.id}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:bg-amber-50"
            >
              <div className="text-sm font-semibold text-navy">{t.nombre}</div>
              <p className="mt-1 text-xs text-slate-600">{t.descripcion}</p>
              <span className="mt-2 inline-block text-[11px] font-medium text-amber-700">
                Ir al portal municipal →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Marco normativo */}
      <section className="mt-10">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Marco normativo verificado
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Toda la normativa citada acá fue verificada en fuentes oficiales el
          2026-05-10. El proyecto rechaza por principio invocar normas no
          verificables; en particular, no se cita la "Ley provincial 12.296" ni
          la "Ley 13.747" porque no corresponden a la materia catastral. La ley
          provincial vigente para el SCIT es la 10.921/1992.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {normasCatastrales.map((n) => (
            <article
              key={n.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${JERARQUIA_BADGE[n.jerarquia]}`}
                  >
                    {JERARQUIA_ETIQUETA[n.jerarquia]}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-bold text-navy">
                    {n.numero}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">{n.titulo}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-700">{n.resumen}</p>
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                Ver texto oficial →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Recursos provinciales y comparados */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Recursos públicos provinciales y comparados
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          La provincia de Santa Fe administra el catastro vía SCIT y publica
          visualizador y buscador de parcelas sin login. El sitio municipal de
          Sunchales no linkea actualmente a estos recursos: es una brecha
          declarada de la que también se encarga este módulo.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {recursosPublicos.map((r) => (
            <li
              key={r.id}
              className="rounded-md border border-slate-200 bg-white p-3 text-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {r.ambito === "provincial"
                  ? "Provincial"
                  : r.ambito === "nacional"
                  ? "Nacional"
                  : "Comparado"}
              </span>
              <div className="font-semibold text-navy">{r.titulo}</div>
              <p className="mt-1 text-xs text-slate-600">{r.descripcion}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                Abrir recurso →
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Brechas declaradas — link al módulo central */}
      <section className="mt-10 rounded-2xl border-2 border-dashed border-amber-400 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Brechas catastrales declaradas
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Hay <strong>{totalBrechas} brechas</strong> de transparencia catastral
          identificadas hoy en Sunchales. Cada una cita su fundamento normativo y
          tiene un CTA para generar un pedido AIP específico. Hacer visible la
          omisión es parte del deber estatal de publicidad de los actos de
          gobierno.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {brechasCatastro.map((b) => (
            <article
              key={b.id}
              className="rounded-xl border border-amber-200 bg-amber-50 p-4"
            >
              <h3 className="font-serif text-sm font-bold text-navy">
                {b.titulo}
              </h3>
              <p className="mt-1 text-xs text-slate-700">{b.descripcion}</p>
              <Link
                href={`/aip?brecha=${b.id}`}
                className="mt-3 inline-block rounded-md bg-amber-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-amber-600"
              >
                Generar pedido AIP por esta brecha →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/brechas?modulo=catastro"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Ver brechas catastrales en el índice central →
          </Link>
          <Link
            href="/aip?modulo=catastro"
            className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Presentar pedido AIP catastral →
          </Link>
        </div>
      </section>

      {/* Subpágina: zonificación */}
      <section className="mt-10 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="section-heading font-serif text-2xl font-bold text-navy">
            Zonificación urbana
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Fase 2 — publicada
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">
          Las cinco clases de suelo del Distrito (Urbanizado, Urbanizable,
          Suburbano, Rural, No Urbanizable) están definidas en la Ord. 2800/2019
          y publicadas con cita verbatim. La página complementaria incluye además
          la lista del Art. 4° (44 inmuebles incorporados al Área Urbanizada), el
          inventario de los 12 polígonos del Anexo I-2, y un mapa SVG con las{" "}
          <strong>727 manzanas reales</strong> del ejido — generado a partir del
          shapefile oficial del IPEC Santa Fe (Censo 2022), reproyectado a WGS84.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/catastro/zonificacion"
            className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Abrir mapa de zonificación →
          </Link>
        </div>
      </section>

      {/* Hoja de ruta */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Hoja de ruta del módulo
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            <strong className="text-navy">Fase 1 — Publicada:</strong> hub
            institucional + marco normativo + oficina + trámites + recursos
            provinciales + brechas declaradas. Sin geometría parcelaria propia.
          </li>
          <li>
            <strong className="text-navy">Fase 2 — Publicada:</strong>{" "}
            <Link
              href="/catastro/zonificacion"
              className="underline decoration-amber-500 underline-offset-2"
            >
              página de zonificación
            </Link>{" "}
            con definiciones de la Ord. 2800/2019, polígonos del Anexo I-2 y
            las 44 parcelas del Art. 4°.
          </li>
          <li>
            <strong className="text-navy">Fase 3 — Publicada:</strong> mapa
            Leaflet interactivo con tiles OSM y overlays GeoJSON de las 727
            manzanas y 29 radios censales del IPEC, más buscador integrado de
            nomenclador catastral para abrir el SCIT con contexto. El embed
            directo del visualizador IDESF quedó descartado por el header CSP{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
              frame-ancestors 'self'
            </code>{" "}
            del servidor provincial — esa imposibilidad técnica está declarada
            en la propia página.
          </li>
          <li>
            <strong className="text-navy">Fase 4 — A evaluar:</strong> convenio
            formal con SCIT para integrar el nomenclador municipal con el
            provincial, lo que habilitaría un visualizador propio con la capa
            parcelaria oficial vía API negociada (no vía WMS sin CORS).
            Requiere acto administrativo expreso.
          </li>
        </ol>
      </section>

      {/* Nota metodológica */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          Los datos de oficina, encargado y trámites se basan en la información
          declarada en el portal municipal de trámites
          (sunchales.gob.ar/gestion/sunchales-impulsa/tramites/) y en el listado
          oficial de autoridades. Las normas citadas fueron verificadas en sitios
          oficiales el 2026-05-10. Si alguna información debe corregirse, se
          recibe corrección formal y se actualiza la fuente.
        </p>
        <p className="mt-2">
          Este módulo no expone datos personales del titular registral, su DNI ni
          su domicilio fiscal: esos datos están protegidos por la Ley 25.326. Sí
          se promueve la publicidad de los datos parcelarios objetivos
          (geometría, nomenclador, superficie, valuación fiscal, zonificación),
          por aplicación directa del Art. 1° inc. b de la Ley 26.209.
        </p>
      </section>
    </div>
  );
}
