import Link from "next/link";
import BrechasTransparencia from "@/components/BrechasTransparencia";
import {
  normasDemo,
  sesionesDemo,
  proyectosDemo,
  jerarquia,
  coherenciaDemo,
  etapasCartaOrganica,
  fuentesDigesto
} from "@/lib/data/digesto";
import {
  concejales,
  comisiones,
  comisionesPorConcejal,
  personalConcejo,
  tiposDeNorma,
  aipLocal,
  concejoInfo
} from "@/lib/data/concejo";

export const metadata = {
  title: "Digesto y Concejo Deliberante · Sunchales Transparente",
  description:
    "Toda la actividad legislativa local, el cuerpo normativo vigente y el marco constitucional y legal que rige sobre Sunchales — en un solo punto de acceso público y auditable."
};

export default function DigestoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
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
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
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
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Próximas sesiones del Concejo
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
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
          <h2 className="font-serif text-2xl font-bold text-navy">
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
          <h2 className="font-serif text-2xl font-bold text-navy">
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

      {/* Últimas normas */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Últimas normas (vista demo)
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Norma</th>
              <th className="px-4 py-3">Tema</th>
              <th className="px-4 py-3">Sanción</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {normasDemo.map((n, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">
                  Ord. N° {n.numero}
                </td>
                <td className="px-4 py-3 text-slate-600">{n.titulo}</td>
                <td className="px-4 py-3 text-slate-600">{n.fechaSancion}</td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={n.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Los números son ilustrativos. La numeración real proviene del{" "}
        <Link
          href={fuentesDigesto.digesto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          Digesto Municipal
        </Link>{" "}
        y del sitio del{" "}
        <Link
          href={fuentesDigesto.concejo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          Concejo Municipal
        </Link>
        .
      </p>

      {/* Proyectos en tratamiento */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
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

      {/* CONCEJALES ACTUALES (datos reales verificados) */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Concejales actuales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Los 6 integrantes actuales del Concejo Municipal de Sunchales, con su
        bloque, mandato y datos públicos de contacto. Información verificada el
        03/05/2026 contra{" "}
        <Link
          href="https://concejosunchales.gob.ar/concejales-actuales.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          el sitio oficial del Concejo
        </Link>
        .
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {concejales.map((c) => {
          const cms = comisionesPorConcejal(c.id);
          return (
            <article
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {c.fotoUrl && (
                  <img
                    src={c.fotoUrl}
                    alt={c.nombre}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base font-bold text-navy">
                    {c.nombre}
                  </h3>
                  <p className="text-xs font-semibold text-coral-dark">
                    {c.rol}
                  </p>
                  <p className="text-xs text-slate-500">{c.bloque}</p>
                  <p className="text-xs text-slate-500">
                    Mandato {c.mandatoInicio}–{c.mandatoFin}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="truncate">
                  <span className="font-semibold">✉ </span>
                  <Link href={`mailto:${c.email}`} className="text-coral-dark">
                    {c.email}
                  </Link>
                </div>
                <div>
                  <span className="font-semibold">☏ </span>
                  {c.telefono}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.cvUrl && (
                  <Link
                    href={c.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-navy hover:bg-slate-50"
                  >
                    CV (PDF)
                  </Link>
                )}
                {c.facebook && (
                  <Link
                    href={c.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-navy hover:bg-slate-50"
                  >
                    Facebook
                  </Link>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Integra <strong>{cms.length}</strong>{" "}
                {cms.length === 1 ? "comisión" : "comisiones"}.
              </p>
            </article>
          );
        })}
      </div>

      {/* COMISIONES (datos reales verificados) */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Comisiones donde participan los concejales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {comisiones.length} instancias formales de participación de concejales
        en comisiones, consejos consultivos, mesas de articulación y
        observatorios. Asignación vigente por Resoluciones N° 878/2025 y
        N° 879/2025 del Concejo.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Comisión / Mesa / Consejo</th>
              <th className="px-4 py-3">Concejales que integran</th>
            </tr>
          </thead>
          <tbody>
            {comisiones.map((cm) => (
              <tr key={cm.nombre} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-navy">
                  {cm.nombre}
                  <div className="text-[11px] font-normal text-slate-500">
                    {cm.resolucion}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {cm.integrantes
                    .map((id) => concejales.find((c) => c.id === id)?.nombre ?? id)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TIPOS DE NORMAS */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Tipos de normas que sanciona el Concejo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Conforme al Reglamento Interno del Concejo, todo asunto que un concejal
        presente toma una de estas cuatro formas.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {tiposDeNorma.map((t) => (
          <div
            key={t.tipo}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="font-serif text-lg font-bold text-navy">{t.tipo}</h3>
            <p className="mt-2 text-sm text-slate-600">{t.descripcion}</p>
          </div>
        ))}
      </div>

      {/* AIP LOCAL */}
      <section className="mt-12 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
          Acceso a la Información Pública — Sunchales
        </span>
        <h3 className="mt-1 font-serif text-xl font-bold text-emerald-900">
          Ordenanza N° {aipLocal.ordenanza}
        </h3>
        <p className="mt-2 text-sm text-emerald-900/90">{aipLocal.alcance}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
              Plazo de respuesta
            </div>
            <div className="mt-1 font-serif text-2xl font-bold text-emerald-900">
              {aipLocal.plazoRespuestaDiasHabiles} días hábiles
            </div>
            <div className="text-xs text-slate-600">
              Prorrogable por única vez por {aipLocal.plazoProrrogaDiasHabiles}{" "}
              días hábiles más.
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
              Cómo solicitar
            </div>
            <p className="mt-1 text-xs text-slate-700">{aipLocal.formaSolicitud}</p>
          </div>
        </div>
      </section>

      {/* PERSONAL DEL CONCEJO */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Personal del Concejo
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {personalConcejo.map((p) => (
          <div
            key={p.nombre}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-serif font-bold text-navy">{p.nombre}</h3>
            <p className="text-xs text-coral-dark">{p.cargo}</p>
            <p className="mt-2 text-xs text-slate-600">
              <Link href={`mailto:${p.email}`} className="text-coral-dark">
                {p.email}
              </Link>
            </p>
            <p className="text-xs text-slate-600">{p.telefono}</p>
          </div>
        ))}
      </div>

      {/* INFO INSTITUCIONAL CONCEJO */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-navy">
          Concejo Municipal de Sunchales · información de contacto
        </h3>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>
            <strong>Dirección:</strong> {concejoInfo.direccion}, {concejoInfo.ciudad},{" "}
            {concejoInfo.provincia}
          </li>
          <li>
            <strong>Teléfonos:</strong> {concejoInfo.telefonos.join(" · ")}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <Link href={`mailto:${concejoInfo.email}`} className="text-coral-dark">
              {concejoInfo.email}
            </Link>
          </li>
          <li>
            <strong>Sitio oficial:</strong>{" "}
            <Link
              href={concejoInfo.sitioWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral-dark"
            >
              {concejoInfo.sitioWeb}
            </Link>
          </li>
        </ul>
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
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-ice/60 font-serif font-black text-deep">
        {letra}
      </div>
      <h3 className="mt-2 font-serif text-lg font-bold text-navy">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: "vigente" | "modificada" | "derogada" }) {
  const cfg = {
    vigente: { cls: "bg-emerald-50 text-emerald-700", lbl: "Vigente" },
    modificada: { cls: "bg-amber-50 text-amber-700", lbl: "Modificada" },
    derogada: { cls: "bg-red-50 text-red-700", lbl: "Derogada" }
  } as const;
  const c = cfg[estado];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.cls}`}>
      {c.lbl}
    </span>
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
      return "#E8A33D";
  }
}
