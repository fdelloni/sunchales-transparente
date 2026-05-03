import Link from "next/link";
import StatCard from "@/components/StatCard";
import { totales } from "@/lib/data/presupuesto";
import { empleados } from "@/lib/data/personal";
import { datasets } from "@/lib/data/datasets";
import { contrataciones } from "@/lib/data/contrataciones";
import { totalBrechasAbiertas } from "@/lib/data/brechas";
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

      {/* Banner Asistente */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-coral/30 bg-amber-50/60 p-5 sm:flex-row sm:items-center sm:gap-5">
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-coral to-coral-dark text-zinc-900">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M4 5a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3H9l-5 4v-4a3 3 0 010-3V5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-coral-dark">
              Asistente Ciudadano · IA
            </div>
            <p className="mt-1 text-sm text-slate-700">
              En la esquina inferior derecha tenés un chatbot que responde solo con datos públicos verificados.
              No inventa cifras, no opina sobre política y deriva al canal oficial cuando no sabe.
              Probá: <em className="text-navy">"¿Cuál es el presupuesto 2026?"</em>
            </p>
          </div>
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
            href="/digesto"
            tag="Digesto y Concejo"
            title="Normativa y actividad legislativa"
            desc="Búsqueda de ordenanzas, decretos y proyectos en tratamiento. Jerarquía normativa, análisis de coherencia y seguimiento de la Carta Orgánica."
          />
          <ModuleCard
            href="/juzgado-faltas"
            tag="Juzgado de Faltas"
            title="Actividad sancionatoria municipal"
            desc="Cantidad y tipos de faltas, recaudación, destino de los fondos y calidad procesal. Datos agregados que protegen al ciudadano."
          />
          <ModuleCard
            href="/datos-abiertos"
            tag="Datos Abiertos"
            title="Catálog