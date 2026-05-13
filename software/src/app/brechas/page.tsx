import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import BrechaVerificacionBadge from "@/components/BrechaVerificacionBadge";
import {
  brechas,
  labelEstado,
  labelCategoria,
  type BrechaModulo,
  type BrechaEstado
} from "@/lib/data/brechas";

export const metadata = {
  title: "Brechas de transparencia · Sunchales Transparente",
  description:
    "Índice público de la información de publicación obligatoria que el Estado municipal aún no expone. Cada brecha cita su fundamento normativo (Ord. 1872/2009, Decreto Pcial. 0692/2009, CN art. 1).",
};

const ETIQUETAS_MODULO: Record<BrechaModulo, string> = {
  digesto: "Digesto y normativa",
  "juzgado-faltas": "Juzgado de Faltas",
  presupuesto: "Presupuesto",
  personal: "Personal",
  contrataciones: "Contrataciones",
  recaudacion: "Recaudación",
  concejo: "Concejo Municipal",
  "audiencias-publicas": "Audiencias públicas",
  catastro: "Catastro",
  ambiente: "Ambiente",
  seguridad: "Seguridad",
  salud: "Salud",
  "servicios-ciudadanos": "Servicios al ciudadano",
};

type SP = { searchParams?: { modulo?: string; estado?: string } };

export default function BrechasPage({ searchParams }: SP) {
  const filtroModulo = (searchParams?.modulo ?? "todos") as BrechaModulo | "todos";
  const filtroEstado = (searchParams?.estado ?? "todos") as BrechaEstado | "todos";

  const filtradas = brechas.filter((b) => {
    if (filtroModulo !== "todos" && b.modulo !== filtroModulo) return false;
    if (filtroEstado !== "todos" && b.estado !== filtroEstado) return false;
    return true;
  });

  const total = brechas.length;
  const noPublicado = brechas.filter((b) => b.estado === "no_publicado").length;
  const parcial = brechas.filter(
    (b) => b.estado === "publicado_parcial" || b.estado === "respondido_parcial"
  ).length;
  const formatoCerrado = brechas.filter(
    (b) => b.estado === "publicado_formato_cerrado"
  ).length;
  const subsanadas = brechas.filter((b) => b.estado === "subsanado").length;

  const modulosPresentes = Array.from(new Set(brechas.map((b) => b.modulo))) as BrechaModulo[];
  const estadosPresentes = Array.from(new Set(brechas.map((b) => b.estado))) as BrechaEstado[];

  // Conteo por módulo (sobre el universo completo, no el filtrado)
  const conteoPorModulo = modulosPresentes
    .map((m) => ({
      modulo: m,
      total: brechas.filter((b) => b.modulo === m).length,
      label: ETIQUETAS_MODULO[m],
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre brechas de transparencia…"
          ctaSinResultado={{ label: "Presentar pedido AIP", href: "/aip" }}
        />
      </div>

      <span className="eyebrow text-amber-700">Principio rector · Brechas</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Información de publicación obligatoria que aún no se expone
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Cada brecha lista información que el Estado municipal está jurídicamente
        obligado a publicar y que al día de hoy no está accesible al ciudadano. La
        omisión no es un dato neutral: es un incumplimiento del deber estatal de
        publicidad de los actos de gobierno. Hacer visible la brecha refuerza el
        principio de máxima divulgación y nunca expone datos personales de
        ciudadanos privados.
      </p>

      {/* Marco normativo */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong className="block text-amber-900">Fundamento normativo de la obligación de publicar</strong>
        <p className="mt-2">
          Constitución Nacional arts. 1°, 33° y 75 inc. 22 (forma republicana →
          publicidad de los actos de gobierno) · CADH art. 13 ·{" "}
          <Link href="/marco-normativo" className="underline">
            Ordenanza Sunchales N° 1872/2009
          </Link>{" "}
          (acceso a la información pública municipal — gratuita, sin patrocinio,
          sin necesidad de expresar motivos; plazo 10 días hábiles + 5 de prórroga)
          · Decreto Provincial Santa Fe N° 0692/2009 (mecanismo provincial supletorio).
          La negativa o demora en publicar configura incumplimiento del deber
          estatal y habilita acciones administrativas y judiciales del ciudadano
          (Art. 9° de la Ord. 1872/2009).
        </p>
      </div>

      {/* CTA principal */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/aip"
          className="rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Presentar un pedido formal de acceso (AIP) →
        </Link>
        <a
          href="/api/v1/brechas?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar dataset (CSV)
        </a>
        <a
          href="/api/v1/brechas"
          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          API JSON
        </a>
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value={String(total)} label="Brechas detectadas" />
        <StatCard value={String(noPublicado)} label="No publicadas" />
        <StatCard value={String(parcial)} label="Publicación parcial" />
        <StatCard value={String(formatoCerrado)} label="Sólo formato cerrado (PDF/HTML)" />
      </div>

      {/* Conteo por módulo (también funciona como atajo de filtro) */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Distribución por módulo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Cada chip filtra esta página por módulo. La cantidad refleja el universo
        completo, no el filtro aplicado.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <FiltroChip
          href="/brechas"
          activo={filtroModulo === "todos"}
          label={`Todas (${total})`}
        />
        {conteoPorModulo.map((c) => (
          <FiltroChip
            key={c.modulo}
            href={`/brechas?modulo=${c.modulo}`}
            activo={filtroModulo === c.modulo}
            label={`${c.label} (${c.total})`}
          />
        ))}
      </div>

      {/* Filtro por estado */}
      <h2 className="mt-10 font-serif text-xl font-bold text-navy">
        Filtrar por estado
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <FiltroChip
          href={
            filtroModulo === "todos"
              ? "/brechas"
              : `/brechas?modulo=${filtroModulo}`
          }
          activo={filtroEstado === "todos"}
          label="Todos los estados"
        />
        {estadosPresentes.map((e) => (
          <FiltroChip
            key={e}
            href={
              filtroModulo === "todos"
                ? `/brechas?estado=${e}`
                : `/brechas?modulo=${filtroModulo}&estado=${e}`
            }
            activo={filtroEstado === e}
            label={labelEstado[e]}
          />
        ))}
      </div>

      {/* Listado */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        {filtradas.length === total
          ? `${filtradas.length} brechas declaradas`
          : `${filtradas.length} de ${total} brechas (filtradas)`}
      </h2>

      {filtradas.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          No hay brechas que coincidan con los filtros seleccionados.
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtradas.map((b) => (
          <article
            key={b.id}
            className="rounded-xl border-2 border-dashed border-amber-400 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {ETIQUETAS_MODULO[b.modulo]} · {labelCategoria[b.categoria]}
                </span>
                <h3 className="mt-1 font-serif text-base font-bold text-navy">
                  {b.titulo}
                </h3>
              </div>
              <span
                className={
                  b.estado === "subsanado"
                    ? "shrink-0 rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800"
                    : b.estado === "pedido_presentado" ||
                      b.estado === "respondido_parcial"
                    ? "shrink-0 rounded-md bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800"
                    : "shrink-0 rounded-md bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-800"
                }
              >
                {labelEstado[b.estado]}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{b.descripcion}</p>
            <div className="mt-3 rounded-md border-l-2 border-amber-500 bg-amber-50 p-2.5 text-[12.5px] text-amber-900">
              <strong className="text-amber-900">Obliga a publicar: </strong>
              {b.fundamento}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/aip?brecha=${b.id}`}
                className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
              >
                Generar pedido AIP por esta brecha →
              </Link>
              {b.publicacionParcialUrl && (
                <Link
                  href={b.publicacionParcialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver lo que sí se publica →
                </Link>
              )}
              {b.fundamentoUrl && (
                <Link
                  href={b.fundamentoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
                >
                  Ver fundamento legal →
                </Link>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>Detectada: {b.detectadaEl}</span>
              {b.ultimoSeguimiento && (
                <span>Último seguimiento: {b.ultimoSeguimiento}</span>
              )}
              <code className="font-mono text-slate-400">{b.id}</code>
            </div>
            <BrechaVerificacionBadge brechaId={b.id} variante="detailed" />
          </article>
        ))}
      </div>

      {subsanadas > 0 && (
        <p className="mt-6 text-sm text-emerald-800">
          {subsanadas}{" "}
          {subsanadas === 1 ? "brecha subsanada" : "brechas subsanadas"} (información
          que el municipio ya publicó tras este seguimiento). Demuestra que el
          mecanismo funciona.
        </p>
      )}

      {/* Nota metodológica */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          Este registro se construye contrastando lo que el municipio publica hoy
          contra los estándares de publicación obligatoria derivados del marco
          normativo citado. Cada brecha incluye un identificador estable, una
          descripción precisa, su fundamento normativo, la fecha en que se detectó
          y, cuando existe, un link a la publicación parcial existente para no
          acusar de no publicar lo que sí se publica. El dataset se ofrece bajo
          licencia CC-BY-4.0 a través de{" "}
          <a className="underline" href="/api/v1/brechas">/api/v1/brechas</a>.
        </p>
        <p className="mt-2">
          No se citan leyes ni decretos no verificados en fuentes oficiales. En
          particular, no se invoca la Ley 27.275 porque su jurisdicción es el
          sector público nacional y no rige para municipios; el régimen aplicable
          a Sunchales es la Ord. 1872/2009 con el Decreto Pcial. 0692/2009 como
          supletorio.
        </p>
      </section>
    </div>
  );
}

function FiltroChip({
  href,
  activo,
  label,
}: {
  href: string;
  activo: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={
        activo
          ? "rounded-full border-2 border-coral bg-coral/15 px-3 py-1 text-xs font-semibold text-coral-dark"
          : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-coral/40 hover:bg-amber-50"
      }
    >
      {label}
    </Link>
  );
}
