import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import EstadisticasCharts from "./EstadisticasCharts";
import { totales } from "@/lib/data/presupuesto";
import { empleados } from "@/lib/data/personal";
import { contrataciones } from "@/lib/data/contrataciones";
import { datasets } from "@/lib/data/datasets";
import { brechas, totalBrechasAbiertas } from "@/lib/data/brechas";
import { normasDemo } from "@/lib/data/digesto";
import { totalPdfsConcejo, totalesConcejo } from "@/lib/data/concejo-archivos.generated";
import { formatARSCompact, formatARS, formatNumber } from "@/lib/format";

export const metadata = {
  title: "Estadísticas · Sunchales Transparente",
  description:
    "Panorama de transparencia y datos clave de la Municipalidad de Sunchales. KPIs, salud de transparencia, presupuesto y actividad legislativa."
};

export default function EstadisticasPage() {
  const totalBrechas = brechas.length;
  const brechasAbiertas = totalBrechasAbiertas();
  const brechasSubsanadas = totalBrechas - brechasAbiertas;
  const tasaTransparencia = totalBrechas
    ? Math.round((brechasSubsanadas / totalBrechas) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <span className="eyebrow">Sección · Estadísticas</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Estadísticas y panorama de transparencia
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Visión consolidada de los datos públicos de la Municipalidad de Sunchales:
        salud de transparencia, presupuesto, actividad legislativa y datos abiertos.
        Cada cifra está atada a su fuente. Lo verificado se etiqueta como tal; lo
        pendiente, también.
      </p>

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          titulo="Buscá un indicador o estadística"
          placeholder="Ej: ¿Cuántos habitantes tiene Sunchales?"
          sugerencias={[
            "¿Cuántos habitantes tiene Sunchales?",
            "¿Cuál es la tasa de transparencia?",
            "¿Cuántas brechas hay sin subsanar?",
            "¿Cuántas contrataciones se publicaron?",
          ]}
        />
      </div>

      {/* KPIs principales */}
      <h2 className="mt-10 font-serif text-2xl font-bold text-navy">
        Indicadores principales
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
        <StatCard
          value={formatNumber(totales.habitantes)}
          label="Habitantes"
          hint="Censo Nacional 2022 (INDEC)."
          verified
        />
        <StatCard
          value={formatARSCompact(totales.gastos_total)}
          label="Presupuesto 2026"
          hint="Proyecto de Ordenanza remitido al Concejo."
          verified
        />
        <StatCard
          value={formatARS(totales.gasto_per_capita)}
          label="Gasto per cápita anual"
        />
        <StatCard
          value={String(empleados.length)}
          label="Cargos públicos relevados"
          hint="Cargos verificables del organigrama."
          verified
        />
        <StatCard
          value={String(contrataciones.length)}
          label="Contrataciones registradas"
          hint="Procesos demostrativos en Fase 1."
        />
        <StatCard
          value={String(datasets.length)}
          label="Datasets abiertos"
          hint="CSV/JSON con licencia CC-BY-4.0."
          verified
        />
        <StatCard
          value={String(totalPdfsConcejo())}
          label="Documentos del Concejo"
          hint="Sincronizados diariamente desde concejosunchales.gob.ar."
          verified
        />
        <StatCard
          value={String(totalesConcejo["proyectos-en-tratamiento"] ?? 0)}
          label="Proyectos en tratamiento"
          hint="En estado parlamentario al día de hoy."
          verified
        />
        <StatCard
          value={String(totalesConcejo["ucm"] ?? 0)}
          label="Ordenanzas que actualizan la UCM"
          hint="Histórico desde 2011."
          verified
        />
      </div>

      {/* Salud de transparencia (banner amarillo) */}
      <section className="mt-10 overflow-hidden rounded-2xl border-2 border-amber-500/70 bg-gradient-to-br from-amber-50 to-white">
        <div className="relative px-5 py-5 sm:px-8 sm:py-6">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
            Salud de transparencia
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-amber-900">
            ¿Qué tan abierto está el municipio?
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-amber-900/90">
            El indicador combina las brechas de información de publicación
            obligatoria detectadas en cada módulo. Una brecha es información que la
            ley exige publicar y que aún no está disponible. Sin exponer datos de
            ciudadanos privados.
          </p>
        </div>
        <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3 sm:gap-4 sm:px-8 sm:pb-6">
          <KpiBrecha
            value={String(totalBrechas)}
            label="Brechas detectadas"
            tone="neutral"
          />
          <KpiBrecha
            value={String(brechasAbiertas)}
            label="Brechas abiertas"
            tone="bad"
          />
          <KpiBrecha
            value={`${tasaTransparencia}%`}
            label="Tasa de subsanación"
            tone={tasaTransparencia >= 50 ? "good" : "warn"}
          />
        </div>
      </section>

      {/* Gráficos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Análisis visual
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">
        Gráficos interactivos sobre las brechas, el presupuesto y la actividad
        legislativa. Tocá cada elemento para ver el detalle.
      </p>
      <div className="mt-5">
        <EstadisticasCharts />
      </div>

      {/* Resumen en bloque */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Resumen por módulo
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResumenCard
          tag="Presupuesto"
          titulo="Recursos y gastos 2026"
          valor={formatARSCompact(totales.gastos_total)}
          desc="Cifra oficial del proyecto remitido al Concejo. Ver detalle por finalidad y función."
          href="/presupuesto"
        />
        <ResumenCard
          tag="Personal"
          titulo="Padrón municipal"
          valor={`${empleados.length} cargos`}
          desc="Cargos públicos verificados con cargo, área y remuneración bruta de referencia."
          href="/personal"
        />
        <ResumenCard
          tag="Contrataciones"
          titulo="Licitaciones y compras"
          valor={`${contrataciones.length} procesos`}
          desc="Trazabilidad criptográfica SHA-256 auditable extremo a extremo."
          href="/contrataciones"
        />
        <ResumenCard
          tag="Digesto y Concejo"
          titulo="Normativa local"
          valor={`${normasDemo.length} en muestra`}
          desc="Búsqueda de ordenanzas, jerarquía normativa y análisis de coherencia."
          href="/digesto"
        />
        <ResumenCard
          tag="Juzgado de Faltas"
          titulo="Actividad sancionatoria"
          valor="Datos pendientes"
          desc="Indicadores agregados anonimizados y trazabilidad de fondos. Ver brechas."
          href="/juzgado-faltas"
        />
        <ResumenCard
          tag="Datos abiertos"
          titulo="Catálogo público"
          valor={`${datasets.length} datasets`}
          desc="CSV/JSON bajo CC-BY-4.0 reutilizables por periodismo y academia."
          href="/datos-abiertos"
        />
      </div>

      {/* Nota metodológica */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          Todas las cifras de este panel se calculan a partir de las fuentes
          declaradas en cada módulo. Los totales del Presupuesto son oficiales
          (proyecto remitido al Concejo Municipal). Los datos de Personal son
          verificables públicamente respecto a los cargos; las remuneraciones son
          referenciales hasta que se publique la nómina oficial. Las brechas
          están construidas con fundamento legal específico (Ordenanza Sunchales
          N° 1872/2009, Decreto Pcial. 0692/2009 y principio constitucional de
          publicidad de los actos de gobierno) y se subsanan cuando el municipio
          publica la información correspondiente.
        </p>
        <p className="mt-3">
          Última actualización del panel:{" "}
          <span className="font-semibold text-navy">2 de mayo de 2026</span>.
        </p>
      </section>
    </div>
  );
}

function KpiBrecha({
  value,
  label,
  tone
}: {
  value: string;
  label: string;
  tone: "good" | "warn" | "bad" | "neutral";
}) {
  const cls = {
    good: "border-emerald-300 bg-white text-emerald-700",
    warn: "border-amber-300 bg-white text-amber-700",
    bad: "border-red-300 bg-white text-red-700",
    neutral: "border-amber-200 bg-white text-amber-900"
  }[tone];
  return (
    <div className={`rounded-xl border-2 p-4 ${cls}`}>
      <div className="font-serif text-3xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

function ResumenCard({
  tag,
  titulo,
  valor,
  desc,
  href
}: {
  tag: string;
  titulo: string;
  valor: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="rounded-full bg-ice/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-deep">
        {tag}
      </span>
      <h3 className="mt-2 font-serif text-lg font-bold text-navy">{titulo}</h3>
      <div className="mt-1 font-serif text-2xl font-bold text-coral-dark">
        {valor}
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
      <span className="mt-3 inline-block text-xs font-semibold text-coral-dark group-hover:text-coral">
        Abrir →
      </span>
    </Link>
  );
}
