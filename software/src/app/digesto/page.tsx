import Link from "next/link";
import BrechasTransparencia from "@/components/BrechasTransparencia";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  sesionesDemo,
  proyectosDemo,
  jerarquia,
  coherenciaDemo,
  etapasCartaOrganica,
  fuentesDigesto
} from "@/lib/data/digesto";
import { normasOficiales } from "@/lib/data/digesto-oficial.generated";
import { conteoEstados } from "@/lib/data/digesto-estados.generated";
import {
  normasConcejo,
  digestoConcejoMeta,
} from "@/lib/data/digesto-concejo.generated";
import ExploradorDigesto from "./ExploradorDigesto";

export const metadata = {
  title: "Digesto y Concejo Deliberante · Sunchales Transparente",
  description:
    "Toda la actividad legislativa local, el cuerpo normativo vigente y el marco constitucional y legal que rige sobre Sunchales — en un solo punto de acceso público y auditable."
};

export default function DigestoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Buscador arriba del título — entrada principal de la sección */}
      <div className="mb-8">
        <BuscadorSeccion placeholder="Buscar una norma o tema legislativo…" />
      </div>

      <span className="eyebrow">Módulo · Digesto y Concejo Deliberante</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Digesto Normativo y Concejo Deliberante
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Toda la actividad legislativa local, el cuerpo normativo vigente y el marco
        constitucional y legal que rige sobre Sunchales en un solo punto de acceso
        público, auditable y abierto. Construido sobre la nueva Constitución de
        Santa Fe (2025) y la Ley Orgánica de Municipios N° 14.436 (vigente desde
        abril de 2026).
      </p>

      {/* Submódulos */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Qué encontrás en este módulo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Siete componentes que se complementan y comparten una misma fuente de
        verdad: el cuerpo normativo local actualizado y trazable.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Submodulo
          letra="A"
          titulo="Concejo Deliberante en vivo"
          desc="Calendario de sesiones, orden del día, transmisión, actas, votaciones nominales y seguimiento de proyectos."
        />
        <Submodulo
          letra="B"
          titulo="Digesto consolidado"
          desc="Búsqueda full-text de ordenanzas, decretos y resoluciones. Texto en HTML accesible, versionado y lenguaje claro."
        />
        <Submodulo
          letra="C"
          titulo="Marco supramunicipal"
          desc="Constitución Nacional, Constitución de Santa Fe (2025), Ley Orgánica de Municipios N° 14.436 y leyes provinciales aplicables."
        />
        <Submodulo
          letra="D"
          titulo="Análisis de coherencia"
          desc="Detección automatizada de derogaciones tácitas, superposiciones y referencias rotas. Sugerencias para el Concejo."
        />
        <Submodulo
          letra="E"
          titulo="Alertas y suscripciones"
          desc="Recibí avisos cuando cambia una norma de tu interés o cuando un cambio provincial obliga a actualizar el cuerpo normativo local."
        />
        <Submodulo
          letra="F"
          titulo="Participación ciudadana"
          desc="Comentarios públicos sobre proyectos, audiencias públicas digitales, encuestas de prioridades e iniciativas populares."
        />
      </div>

      {/* Carta Orgánica */}
      <section className="mt-10 overflow-hidden rounded-2xl border-2 border-dashed border-coral bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-coral-dark">
          ★ Proceso Carta Orgánica de Sunchales
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">
          En la apertura de sesiones ordinarias 2026 el intendente Pablo Pinotti
          anunció el inicio del proceso para que Sunchales dicte su propia Carta
          Orgánica, posibilidad habilitada por la reforma constitucional provincial
          de 2025 y la Ley Orgánica de Municipios N° 14.436. Este submódulo
          acompañará el proceso en vivo.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {etapasCartaOrganica.map((e) => (
            <div
              key={e.etapa}
              className="rounded-xl border border-amber-200 bg-white p-3"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-coral-dark">
                Etapa {e.etapa}
              </div>
              <div className="mt-1 text-sm text-navy">{e.titulo}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximas sesiones */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Próximas sesiones del Concejo
      </h2>
      <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Sala</th>
              <th className="px-4 py-3">Notas</th>
            </tr>
          </thead>
          <tbody>
            {sesionesDemo.map((s, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="font-medium text-navy">{s.fecha}</div>
                  <div className="text-xs text-slate-500">{s.hora}</div>
                </td>
                <td className="px-4 py-3">
                  {s.estado === "realizada" ? (
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                      Realizada
                    </span>
                  ) : (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      {s.tipo}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{s.sala}</td>
                <td className="px-4 py-3 text-slate-600">
                  {s.expedientes
                    ? `${s.expedientes} expedientes en tratamiento`
                    : s.notas ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        La sala "Mirta Rodríguez" es la sede confirmada de las sesiones del Concejo
        Municipal de Sunchales.
      </p>

      {/* Coherencia + Jerarquía */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="section-heading font-serif text-2xl font-bold text-navy">
            Tablero de salud normativa
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Análisis automatizado del cuerpo normativo. Cada detección es una{" "}
            <strong>sugerencia para revisión humana</strong> — la decisión normativa
            siempre corresponde al Concejo Municipal.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {coherenciaDemo.map((c, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 last:border-b-0"
              >
                <div>
                  <div className="font-semibold text-navy">{c.norma}</div>
                  <p className="mt-0.5 text-xs text-slate-500">{c.descripcion}</p>
                </div>
                <span className="shrink-0 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  {c.tipo}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-heading font-serif text-2xl font-bold text-navy">
            Jerarquía normativa
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Cualquier ordenanza local debe respetar este orden. Para cada norma del
            digesto se mostrará qué normas superiores la condicionan.
          </p>
          <div className="mt-4 space-y-2">
            {jerarquia.map((n) => (
              <div
                key={n.nivel}
                className="rounded-lg border border-slate-200 bg-white p-3 pl-4 shadow-sm"
                style={{ borderLeftColor: jerarquiaColor(n.nivel), borderLeftWidth: 4 }}
              >
                <div className="font-semibold text-navy">{n.titulo}</div>
                <div className="text-xs text-slate-500">{n.detalle}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Explorador del Digesto oficial — datos REALES sincronizados */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Explorador del Digesto oficial
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">
        <strong className="text-navy tabular-nums">{normasOficiales.length}</strong>{" "}
        normas indexadas (período 2022-2026) sobre un universo total de{" "}
        <strong className="text-navy tabular-nums">5.309</strong> normas que
        publica el Concejo Municipal en{" "}
        <a
          href="https://concejosunchales.gob.ar/normativa-local.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          su digesto público
        </a>{" "}
        con cobertura 1973-2026. De las indexadas hay{" "}
        <strong className="text-emerald-700">{conteoEstados.vigente} vigentes</strong>,{" "}
        <strong className="text-amber-700">{conteoEstados.modificada} modificadas</strong>{" "}
        y <strong className="text-red-700">{conteoEstados.derogada} derogadas</strong>{" "}
        según análisis algorítmico del texto. Hacé click sobre el número o el
        título para ver el detalle, el texto completo y la cita textual de
        quién la afecta. La diferencia entre lo indexado y lo publicado se
        declara como brecha en{" "}
        <Link href="/brechas?modulo=digesto" className="underline">
          /brechas
        </Link>
        .
      </p>

      <div className="mt-6">
        <ExploradorDigesto />
      </div>

      <div className="mt-3 rounded-lg border-l-4 border-slate-300 bg-slate-50 p-3 text-xs text-slate-600">
        <p>
          <strong>Fuente:</strong>{" "}
          <Link
            href={fuentesDigesto.digesto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-dark underline"
          >
            Digesto Municipal de Sunchales
          </Link>{" "}
          (sunchales.miportal.ar/digesto). Sincronizado vía API pública del sistema
          de e-gobierno municipal. Re-sincronizable corriendo{" "}
          <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px]">
            npm run sincronizar-digesto
          </code>
          .
        </p>
        <p className="mt-1.5">
          <strong>Clasificación de vigencia:</strong> análisis algorítmico con IA
          sobre el texto de cada norma. Detecta derogaciones y modificaciones
          <strong> EXPLÍCITAS</strong> (ej. <em>"Derógase la Ord. N° X"</em>,
          <em>"Modifícase el art. Y de la Ord. Z"</em>). Las relaciones tácitas
          requieren revisión legal humana y no se cuentan acá.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  Digesto del Concejo Municipal — listado completo sincronizado */}
      {/* ============================================================ */}
      <h2 className="section-heading mt-16 font-serif text-2xl font-bold text-navy">
        Digesto del Concejo Municipal — {normasConcejo.length.toLocaleString("es-AR")} normas
        sincronizadas
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Listado completo extraído de la paginación pública del{" "}
        <a
          href={digestoConcejoMeta.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          digesto del Concejo
        </a>{" "}
        con cobertura{" "}
        <strong>
          {Math.min(...Object.keys(digestoConcejoMeta.porAnio).map(Number))}–
          {Math.max(...Object.keys(digestoConcejoMeta.porAnio).map(Number))}
        </strong>
        . Es el universo más amplio que el ciudadano puede consultar hoy y un
        super-conjunto de las {normasOficiales.length} normas indexadas más
        arriba (que son sólo del período 2022-2026 del portal del Ejecutivo).
      </p>

      <div className="mt-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong className="block font-semibold text-amber-900">
          Brecha visible — el Concejo declara más normas de las que expone
        </strong>
        <p className="mt-2">
          El contador de fachada del sitio del Concejo declara <strong>5.309</strong>{" "}
          normas totales (Decl. + Min. + Ord. + Res.). La paginación pública
          deja de avanzar al llegar a <strong>{normasConcejo.length.toLocaleString("es-AR")}</strong>{" "}
          (~{Math.round((normasConcejo.length / 5309) * 100)}% del declarado).
          Esto significa que ~{(5309 - normasConcejo.length).toLocaleString("es-AR")} normas
          no son navegables sin pedido formal de acceso.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={digestoConcejoMeta.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          Ver listado oficial →
        </a>
        <a
          href="/api/v1/digesto-concejo?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
        <a
          href="/api/v1/digesto-concejo"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
        >
          API JSON
        </a>
      </div>

      <h3 className="mt-8 font-serif text-lg font-bold text-navy">
        Distribución por año
      </h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex min-w-[760px] items-end gap-1.5">
          {Object.entries(digestoConcejoMeta.porAnio)
            .map(([a, c]) => ({ anio: Number(a), cantidad: Number(c) }))
            .sort((a, b) => a.anio - b.anio)
            .map(({ anio, cantidad }) => {
              const max = Math.max(
                ...Object.values(digestoConcejoMeta.porAnio).map(Number)
              );
              const altura = Math.max(4, Math.round((cantidad / max) * 80));
              return (
                <div
                  key={anio}
                  className="group flex flex-col items-center"
                  title={`${anio}: ${cantidad} normas`}
                >
                  <div
                    className="w-3 rounded-sm bg-coral/70 group-hover:bg-coral"
                    style={{ height: `${altura}px` }}
                  />
                  <div className="mt-1 -rotate-45 text-[8px] tabular-nums text-slate-500">
                    {anio}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Sincronizado por{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5">
          npm run scrapear-digesto-concejo
        </code>{" "}
        contra el sitio oficial del Concejo. Última corrida:{" "}
        {new Date(digestoConcejoMeta.sincronizadoEl).toLocaleString("es-AR")}.
      </p>

      {/* Proyectos en tratamiento */}
      <h2 className="section-heading mt-16 font-serif text-2xl font-bold text-navy">
        Proyectos en tratamiento
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {proyectosDemo.map((p) => (
          <div
            key={p.expediente}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-coral-dark">
              Expediente {p.expediente}
            </div>
            <h3 className="mt-1 font-serif text-lg font-bold text-navy">
              {p.titulo}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Comisión: {p.comision} · {p.estadoLabel}
            </p>
          </div>
        ))}
      </div>

      {/* CTA a la sección Concejo */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
          Sección complementaria
        </span>
        <h2 className="section-heading mt-1 font-serif text-2xl font-bold text-navy">
          Concejo Municipal
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Concejales actuales con su bloque y mandato, las 23 comisiones donde
          participan, personal del Concejo, régimen local de Acceso a la
          Información Pública (Ord. 1872/09) y datos institucionales completos.
        </p>
        <Link
          href="/concejo"
          className="mt-4 inline-block rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy-soft"
        >
          Ir a la sección Concejo Municipal →
        </Link>
      </section>

      {/* BRECHAS DE TRANSPARENCIA */}
      <BrechasTransparencia
        modulo="digesto"
        titulo="Información legislativa de publicación obligatoria que aún no se expone"
        intro="Tras un mapeo sistemático del sitio del Concejo Municipal (03/05/2026), confirmamos que el Concejo publica abundante información (boletines, resúmenes anuales, ejecución presupuestaria, normativa, comisiones). Sin embargo, persisten estas brechas concretas, que se mantienen hasta tanto el municipio las subsane."
      />
    </div>
  );
}

function Submodulo({
  letra,
  titulo,
  desc
}: {
  letra: string;
  titulo: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid h-9 w-9 place-items-center rounded-lg border border-oro/40 bg-oro/30 font-serif font-black text-navy">
        {letra}
      </div>
      <h3 className="mt-2 font-serif text-lg font-bold text-navy">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function jerarquiaColor(nivel: number): string {
  switch (nivel) {
    case 1:
      return "#7C3AED";
    case 2:
      return "#2563EB";
    case 3:
      return "#0891B2";
    case 4:
      return "#0F766E";
    default:
      return "#FCC81D";
  }
}
