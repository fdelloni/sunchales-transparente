import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import { datasets } from "@/lib/data/datasets";
import { sources } from "@/lib/data/sources";
import { formatNumber } from "@/lib/format";

export default function DatosAbiertosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="eyebrow">Módulo · Datos Abiertos</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Catálogo de Datos Abiertos
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Datasets publicados con licencia <strong>CC-BY-4.0</strong>, disponibles en formatos
        abiertos (CSV, JSON) y consumibles vía API REST. Cualquier persona puede reutilizar
        estos datos respetando la atribución.
      </p>

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          titulo="Buscá un dataset o explicación"
          placeholder="Ej: ¿Hay dataset de presupuesto en CSV?"
          sugerencias={[
            "¿Qué datasets están publicados?",
            "¿Cómo uso la API REST?",
            "¿Qué es la licencia CC-BY-4.0?",
            "¿De dónde vienen los datos?",
          ]}
          ctaSinResultado={{ label: "Ver especificación OpenAPI", href: "/api/v1/openapi" }}
        />
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={formatNumber(datasets.length)} label="Datasets publicados" />
        <StatCard
          value={formatNumber(datasets.reduce((acc, d) => acc + d.totalRegistros, 0))}
          label="Registros totales"
        />
        <StatCard value={formatNumber(Object.keys(sources).length)} label="Fuentes citadas" />
        <StatCard value="CC-BY-4.0" label="Licencia por defecto" />
      </div>

      {/* Listado */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Datasets disponibles</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {datasets.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ice/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-deep"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="mt-3 font-serif text-lg font-bold text-navy">{d.titulo}</h3>
            <p className="mt-1 text-sm text-slate-600">{d.descripcion}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-500">
              <div>
                <span className="block uppercase tracking-widest">Registros</span>
                <span className="font-medium text-navy">{formatNumber(d.totalRegistros)}</span>
              </div>
              <div>
                <span className="block uppercase tracking-widest">Actualizado</span>
                <span className="font-medium text-navy">{d.actualizado}</span>
              </div>
              <div>
                <span className="block uppercase tracking-widest">Licencia</span>
                <span className="font-medium text-navy">{d.licencia}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.formatos.includes("CSV") && (
                <Link
                  href={`${d.endpoint}?format=csv`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
                >
                  Descargar CSV
                </Link>
              )}
              {d.formatos.includes("JSON") && (
                <Link
                  href={`${d.endpoint}?format=json`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
                >
                  Descargar JSON
                </Link>
              )}
              <Link
                href={d.endpoint}
                className="rounded-lg bg-coral px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-amber-400"
              >
                Probar endpoint
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Fuentes */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Fuentes citadas</h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Cada dato del portal trae su trazabilidad explícita. Esta es la lista de fuentes
        consultadas para alimentar la versión 0.1 de la plataforma.
      </p>
      <ul className="mt-4 space-y-3">
        {Object.values(sources).map((s) => (
          <li
            key={s.id}
            className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
          >
            <div className="font-semibold text-navy">{s.title}</div>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-xs text-coral-dark hover:underline"
            >
              {s.url}
            </a>
            <div className="mt-1 text-xs text-slate-500">
              Consultada el {s.fetchedAt}
              {s.notes ? ` · ${s.notes}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
