import Link from "next/link";
import StatCard from "@/components/StatCard";
import { totales } from "@/lib/data/presupuesto";
import { empleados } from "@/lib/data/personal";
import { datasets } from "@/lib/data/datasets";
import { contrataciones } from "@/lib/data/contrataciones";
import { formatARSCompact, formatNumber } from "@/lib/format";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-coral to-coral-dark" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="eyebrow text-coral">Plataforma cívica · Fase 1</span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
            Cada peso público, cada acto y cada cronograma trazables por cualquier vecino.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Versión 0.1 del Portal de Transparencia de la Municipalidad de Sunchales.
            Construido con principios de máxima divulgación, privacidad por diseño y código abierto auditable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/presupuesto"
              className="rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Explorar el presupuesto
            </Link>
            <Link
              href="/datos-abiertos"
              className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Datos abiertos + API
            </Link>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value={formatARSCompact(totales.gastos_total)}
            label="Presupuesto 2026 — Gastos"
            hint="Cifra extraída del proyecto remitido al Concejo Municipal."
            verified
          />
          <StatCard
            value={formatARSCompact(totales.recursos_corrientes)}
            label="Recursos corrientes 2026"
            hint="Proyecto de Ordenanza del Departamento Ejecutivo."
            verified
          />
          <StatCard
            value={formatARSCompact(totales.fondoLey12385_recibido)}
            label="Aporte provincial Ley 12.385"
            hint="Programa de Obras Menores 2026 — destino Sunchales."
            verified
          />
          <StatCard
            value={formatNumber(totales.habitantes)}
            label="Habitantes (Censo 2022)"
            hint="Resultados definitivos INDEC."
            verified
          />
        </div>
      </section>

      {/* Módulos */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-2 font-serif text-2xl font-bold text-navy">
          Módulos disponibles en esta prueba
        </h2>
        <p className="mb-6 max-w-3xl text-slate-600">
          Cuatro módulos navegables. Cada uno entrega valor de manera independiente.
          Los datos verificados se etiquetan; lo que aún no es oficial se marca como pendiente.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ModuleCard
            href="/presupuesto"
            tag="Presupuesto"
            title="Explorador de Presupuesto"
            desc="Navegación por finalidad-función con visualización gráfica y exportación."
          />
          <ModuleCard
            href="/recaudacion"
            tag="Recaudación"
            title="Cálculo de Recursos"
            desc="TGI, DReI, Contribución por Mejoras y demás tributos locales + coparticipación."
          />
          <ModuleCard
            href="/personal"
            tag="Personal"
            title="Padrón de Personal"
            desc={`${empleados.length} cargos públicos verificados con cargo, área y remuneración bruta.`}
          />
          <ModuleCard
            href="/contrataciones"
            tag="Contrataciones"
            title="Licitaciones y Compras"
            desc={`${contrataciones.length} procesos con trazabilidad criptográfica SHA-256 auditable por cualquier vecino.`}
          />
          <ModuleCard
            href="/datos-abiertos"
            tag="Datos Abiertos"
            title="Catálogo de Datos"
            desc={`${datasets.length} datasets en CSV/JSON con licencia CC-BY-4.0.`}
          />
          <ModuleCard
            href="/suscripciones"
            tag="Alertas"
            title="Suscripciones por email/WhatsApp"
            desc="Recibí cada nueva contratación que coincida con tus filtros, opt-in y revocable en un click."
          />
          <ModuleCard
            href="/api/v1/openapi"
            tag="Para desarrolladores"
            title="API REST documentada"
            desc="Endpoints públicos con especificación OpenAPI 3.0."
          />
        </div>
      </section>

      {/* Principios */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 font-serif text-2xl font-bold text-navy">Cómo abordamos los datos</h2>
          <p className="mb-6 max-w-3xl text-slate-600">
            Tres reglas que toda fila respeta:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Principle
              n="01"
              t="Trazabilidad total"
              d="Cada dato muestra su fuente verificable con fecha de consulta y URL."
            />
            <Principle
              n="02"
              t="Honestidad de etiquetado"
              d="Lo verificado se marca como tal. Lo pendiente se marca como pendiente. No se inventa nada."
            />
            <Principle
              n="03"
              t="Privacidad protegida"
              d="No se publican datos personales sensibles. La granularidad se ajusta al fin público."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ModuleCard({ href, tag, title, desc }: { href: string; tag: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="rounded-full bg-ice/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-deep">
        {tag}
      </span>
      <h3 className="mt-2 font-serif text-lg font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
      <span className="mt-3 inline-block text-xs font-semibold text-coral-dark group-hover:text-coral">
        Abrir →
      </span>
    </Link>
  );
}

function Principle({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border-l-4 border-coral bg-sand p-5">
      <div className="font-serif text-lg font-bold text-coral-dark">{n}</div>
      <h3 className="mt-1 font-serif text-base font-bold text-navy">{t}</h3>
      <p className="mt-1 text-sm text-slate-700">{d}</p>
    </div>
  );
}
