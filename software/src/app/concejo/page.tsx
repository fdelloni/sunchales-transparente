import Link from "next/link";
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
  title: "Concejo Municipal · Sunchales Transparente",
  description:
    "Información institucional del Concejo Municipal de Sunchales: concejales actuales, comisiones, personal, marco institucional, contacto y régimen local de Acceso a la Información Pública."
};

export default function ConcejoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <span className="eyebrow">Sección · Concejo Municipal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Concejo Municipal de Sunchales
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Información institucional verificada del cuerpo legislativo de la ciudad:
        sus 6 concejales actuales, las 23 comisiones donde participan, el personal
        del Concejo, el marco institucional y los canales de contacto. Datos
        relevados el 03/05/2026 contra{" "}
        <Link
          href={concejoInfo.sitioWeb}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          el sitio oficial
        </Link>
        .
      </p>

      {/* QUE ES EL CONCEJO */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-navy">
          Qué es el Concejo
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          El Concejo de la ciudad es el encargado de legislar. Junto al
          Departamento Ejecutivo —encabezado por el Intendente— conforma el
          gobierno local. Es el foro permanente de debate y de decisión para el
          desarrollo de la ciudad, y el contralor del poder ejecutivo municipal.
          Los concejales debaten proyectos, se informan con especialistas y
          analizan la viabilidad de las iniciativas para mejorar la calidad de
          vida de la ciudadanía.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Fuente:{" "}
          <Link
            href="https://concejosunchales.gob.ar/que-es-el-concejo.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-dark"
          >
            concejosunchales.gob.ar/que-es-el-concejo
          </Link>
        </p>
      </section>

      {/* CONCEJALES ACTUALES */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Concejales actuales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Los 6 integrantes actuales del Concejo Municipal de Sunchales con su
        bloque, mandato y datos públicos de contacto.
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
                  // eslint-disable-next-line @next/next/no-img-element
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
                  <p className="text-xs font-semibold text-coral-dark">{c.rol}</p>
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

      {/* COMISIONES */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Comisiones, consejos y mesas
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
        Conforme al Reglamento Interno, todo asunto que un concejal presente
        toma una de estas cuatro formas.
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

      {/* INFO INSTITUCIONAL */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-navy">
          Información institucional
        </h3>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>
            <strong>Dirección:</strong> {concejoInfo.direccion},{" "}
            {concejoInfo.ciudad}, {concejoInfo.provincia}
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
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={concejoInfo.redes.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
          >
            Facebook
          </Link>
          <Link
            href={concejoInfo.redes.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
          >
            Twitter
          </Link>
          <Link
            href={concejoInfo.redes.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
          >
            YouTube
          </Link>
          <Link
            href={concejoInfo.redes.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-50"
          >
            Instagram
          </Link>
        </div>
      </section>
    </div>
  );
}
