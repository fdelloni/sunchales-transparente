import Link from "next/link";
import BuscadorSeccion from "@/components/BuscadorSeccion";

export const metadata = {
  title: "Carta Orgánica Municipal · Sunchales Transparente",
  description:
    "Seguimiento ciudadano del proceso de sanción de la Carta Orgánica de Sunchales. Marco habilitante: Constitución de Santa Fe 2025 y Ley Orgánica de Municipios N° 14.436. Brechas de información declaradas.",
};

export default function CartaOrganicaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre la Carta Orgánica…"
          ctaSinResultado={{ label: "Pedido de información (AIP)", href: "/aip" }}
        />
      </div>

      <span className="eyebrow text-coral">Hito institucional · 2026</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Carta Orgánica de Sunchales — seguimiento ciudadano
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Sunchales avanza hacia la sanción de su primera Carta Orgánica
        Municipal. Es un paso histórico: significa pasar de una organización
        institucional regida por la ley provincial general a una organización
        constitucional propia, dictada por una Convención Constituyente
        Municipal con participación de la ciudadanía. Esta página sigue el
        proceso paso a paso, distinguiendo lo que ya fue verificado en fuentes
        oficiales de lo que aún no fue publicado.
      </p>

      {/* Marco habilitante */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Marco que habilita la Carta Orgánica
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          eyebrow="Constitucional · Santa Fe"
          titulo="Constitución de la Provincia de Santa Fe 2025"
          texto="Aprobada en septiembre de 2025. Reconoce la autonomía municipal plena para localidades de más de 10.000 habitantes y habilita expresamente a sancionar Cartas Orgánicas propias. Elimina la figura institucional de 'comuna': todas las localidades pasan a la categoría de municipio."
          chip="Verificado"
          chipColor="emerald"
        />
        <Card
          eyebrow="Legal · Provincial"
          titulo="Ley Orgánica de Municipios N° 14.436"
          texto="Promulgada por Decreto N° 711, publicada en el Boletín Oficial provincial a mediados de abril de 2026. Deroga la histórica Ley 2756 (vigente más de 60 años). 111 artículos. Vigencia inmediata; los cambios electorales rigen desde 2027."
          chip="Verificado"
          chipColor="emerald"
        />
        <Card
          eyebrow="Demográfico"
          titulo="Sunchales reúne el requisito poblacional"
          texto="Población según Censo INDEC 2022: 23.416 habitantes. Supera ampliamente el umbral de 10.000 habitantes que la Constitución de Santa Fe 2025 fija para acceder a la autonomía municipal plena."
          chip="Verificado"
          chipColor="emerald"
        />
        <Card
          eyebrow="Discurso institucional"
          titulo="Anuncio del Intendente en sesiones 2026"
          texto="En la apertura de sesiones ordinarias 2026 del Concejo Municipal —coincidente con el 140° aniversario de la ciudad—, el Intendente Pablo Pinotti anunció el inicio del proceso de elaboración de la Carta Orgánica como hito histórico para Sunchales."
          chip="Verificado"
          chipColor="emerald"
        />
      </div>

      {/* Por qué importa */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        ¿Qué cambia para el vecino una Carta Orgánica propia?
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Una Carta Orgánica es la "constitución local" del municipio. Define cómo
        se organiza el gobierno, cómo se eligen sus autoridades, qué derechos y
        garantías tienen los vecinos frente al Estado municipal, qué mecanismos
        de participación existen (audiencias públicas, presupuesto participativo,
        iniciativa popular, revocatoria de mandato, consulta popular) y qué
        controles institucionales se establecen (auditorías, defensoría del
        pueblo, transparencia activa). Habilita además la creación de tributos y
        regímenes propios en el marco constitucional.
      </p>

      {/* Brechas — lo que aún no se sabe */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Brechas de información: lo que todavía no fue publicado
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-amber-500/70 bg-gradient-to-br from-amber-50 to-white">
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-amber-500 text-2xl font-black text-white">
              !
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                Información de publicación obligatoria pendiente
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-amber-900">
                Cinco aspectos clave del proceso aún no son públicos
              </h3>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[15px] text-amber-900/90">
            Al día de hoy, este proyecto no pudo verificar en fuentes oficiales
            la siguiente información sobre el proceso de Carta Orgánica de
            Sunchales. Como en cualquier proceso constituyente, su publicidad
            es condición de legitimidad democrática.
          </p>
        </div>
        <div className="grid gap-4 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
          <BrechaItem
            titulo="Cronograma del proceso"
            descripcion="Fechas previstas de presentación del proyecto, debate, convocatoria a elección de convencionales, sesiones de la Convención y plazo de sanción."
          />
          <BrechaItem
            titulo="Composición de la comisión redactora preliminar"
            descripcion="Integrantes designados, mandato, plazo de trabajo, alcance de su tarea (proyecto de base vs. propuesta cerrada) y reglas de funcionamiento."
          />
          <BrechaItem
            titulo="Mecanismos de participación ciudadana"
            descripcion="Audiencias públicas, foros barriales, consultas digitales, mesas sectoriales, presentación de propuestas por parte de organizaciones civiles, periodismo, academia y vecinos individuales."
          />
          <BrechaItem
            titulo="Régimen de elección de los convencionales"
            descripcion="Sistema electoral, número de convencionales, requisitos de candidatura, distribución por bloques o lista única, articulación con el calendario electoral provincial."
          />
          <BrechaItem
            titulo="Texto preliminar y borradores en discusión"
            descripcion="Acceso público a los proyectos, dictámenes y versiones del articulado en debate, en formatos abiertos y con seguimiento de cambios entre versiones."
          />
        </div>
        <div className="border-t border-amber-200 bg-amber-50/60 px-6 py-4 text-[13px] text-amber-900 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              Cada uno de estos aspectos es información pública por regla del
              principio republicano y la Ord. Sunchales N° 1872/2009.
            </span>
            <Link
              href="/aip"
              className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
            >
              Generar pedido AIP por Carta Orgánica →
            </Link>
          </div>
        </div>
      </div>

      {/* Estándares mínimos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Estándares mínimos esperables del proceso
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Sin pretender prescribir contenido, hay un conjunto de estándares que
        la mejor doctrina y la práctica comparada de procesos constituyentes
        sostienen como condición de legitimidad democrática del resultado:
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Estandar
          n="01"
          t="Publicidad activa del proceso"
          d="Cronograma, comisiones, agendas y borradores accesibles en formatos abiertos durante todo el desarrollo, no sólo al final."
        />
        <Estandar
          n="02"
          t="Pluralismo en la Convención"
          d="Integración representativa de las distintas fuerzas políticas con presencia ciudadana relevante, evitando la sobrerrepresentación del oficialismo de turno."
        />
        <Estandar
          n="03"
          t="Participación ciudadana real"
          d="Audiencias públicas con efectos vinculantes para el debate (no meramente decorativas), trazabilidad de las propuestas recibidas, devolución pública sobre cuáles se incorporan y cuáles no, con argumentos."
        />
        <Estandar
          n="04"
          t="Tiempos suficientes"
          d="Plazos compatibles con un debate ciudadano serio y un proceso participativo que no se reduzca a un trámite formal."
        />
        <Estandar
          n="05"
          t="Transparencia financiera del proceso"
          d="Costos del proceso constituyente, asignación presupuestaria específica, contrataciones asociadas (logística, comunicación, asesoramiento) bajo el régimen general de contrataciones."
        />
        <Estandar
          n="06"
          t="Anclaje en la autonomía"
          d="Aprovechar la autonomía habilitada por la Constitución de Santa Fe 2025 para incorporar mecanismos modernos de transparencia, datos abiertos y rendición de cuentas como estándar permanente."
        />
      </div>

      {/* Nota metodológica */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          Esta página presenta como verificado únicamente lo que está confirmado
          en fuentes oficiales (Boletín Oficial provincial, sesiones del Concejo
          Municipal, Censo INDEC). Lo que no está oficialmente publicado se
          declara como brecha en lugar de inferirlo o suponerlo. Cuando el
          municipio publique cronograma, comisión y mecanismos de participación,
          esta página se actualizará y las brechas correspondientes pasarán a
          estado "subsanado" en el dataset público de{" "}
          <Link href="/brechas" className="underline">
            /brechas
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-navy px-6 py-8 text-white">
        <h3 className="font-serif text-2xl font-bold">
          Sumate al control ciudadano del proceso
        </h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          Si conocés información oficial sobre el proceso —comunicados, decretos,
          actas— que no esté reflejada acá, podemos sumarla con su fuente.
          También podés generar un pedido formal de acceso a la información
          dirigido al Intendente o al Concejo.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/aip"
            className="rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Generar pedido AIP →
          </Link>
          <Link
            href="/brechas"
            className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Ver todas las brechas declaradas
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  eyebrow,
  titulo,
  texto,
  chip,
  chipColor,
}: {
  eyebrow: string;
  titulo: string;
  texto: string;
  chip: string;
  chipColor: "emerald" | "amber";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
          {eyebrow}
        </span>
        <span
          className={
            chipColor === "emerald"
              ? "rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
              : "rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700"
          }
        >
          {chip}
        </span>
      </div>
      <h3 className="mt-2 font-serif text-base font-bold text-navy">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-700">{texto}</p>
    </div>
  );
}

function BrechaItem({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <article className="rounded-xl border-2 border-dashed border-amber-400 bg-white p-5">
      <h3 className="font-serif text-base font-bold text-navy">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-700">{descripcion}</p>
    </article>
  );
}

function Estandar({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border-l-4 border-coral bg-sand p-5">
      <div className="font-serif text-lg font-bold text-coral-dark">{n}</div>
      <h3 className="mt-1 font-serif text-base font-bold text-navy">{t}</h3>
      <p className="mt-1 text-sm text-slate-700">{d}</p>
    </div>
  );
}
