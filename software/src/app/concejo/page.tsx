import Link from "next/link";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  concejales,
  comisiones,
  comisionesPorConcejal,
  personalConcejo,
  tiposDeNorma,
  aipLocal,
  concejoInfo
} from "@/lib/data/concejo";
import { resumenesAnuales } from "@/lib/data/resumenes-anuales.generated";

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

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          titulo="Consultá sobre el Concejo Municipal"
          placeholder="Ej: ¿Quiénes son los concejales?"
          sugerencias={[
            "¿Quiénes son los concejales actuales?",
            "¿Qué comisiones existen?",
            "¿Cómo se ejerce el acceso a la información en el Concejo?",
            "¿Cuáles son los canales de contacto?",
          ]}
        />
      </div>

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
                <Avatar nombre={c.nombre} />
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

      {/* CTA Transparencia */}
      <section className="mt-12 overflow-hidden rounded-2xl border-2 border-coral/40 bg-gradient-to-br from-amber-50 to-white p-6">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
          Datos completos
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-navy">
          Toda la actividad del Concejo en un panel
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          924 documentos sincronizados desde concejosunchales.gob.ar — actividad
          anual desde 2011, ejecución presupuestaria mensual, 30 ordenanzas que
          actualizan la UCM, proyectos en tratamiento, boletines, iniciativas
          ciudadanas, resúmenes anuales y más.
        </p>
        <Link
          href="/concejo/transparencia"
          className="mt-4 inline-block rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy-soft"
        >
          Ver panel de transparencia completo →
        </Link>
      </section>

      {/* TRANSPARENCIA ECONÓMICA */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Transparencia económica del Concejo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        El Concejo publica mensualmente la ejecución de su partida
        presupuestaria, los movimientos de saldos y las ordenanzas que
        actualizan la Unidad de Cuenta Municipal (UCM). Datos descargados
        diariamente desde el sitio oficial.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Link
          href="https://concejosunchales.gob.ar/ejecucion-partida-presupuestaria.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Mensual
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold text-navy">
            Ejecución partida presupuestaria
          </h3>
          <div className="mt-2 font-serif text-3xl font-bold text-navy">
            183
          </div>
          <p className="text-xs text-slate-500">PDFs sincronizados (mensual desde 2010)</p>
        </Link>
        <Link
          href="https://concejosunchales.gob.ar/movimiento-de-saldos.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Mensual
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold text-navy">
            Movimientos de saldos
          </h3>
          <div className="mt-2 font-serif text-3xl font-bold text-navy">
            123
          </div>
          <p className="text-xs text-slate-500">Estados de Ejecución del Presupuesto</p>
        </Link>
        <Link
          href="https://concejosunchales.gob.ar/valor-de-la-ucm.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Histórico
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold text-navy">
            Valor de la UCM
          </h3>
          <div className="mt-2 font-serif text-3xl font-bold text-navy">
            30
          </div>
          <p className="text-xs text-slate-500">Ordenanzas que actualizan la UCM (última: 3281/2026)</p>
        </Link>
      </div>

      {/* RESÚMENES ANUALES */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Resúmenes anuales del Concejo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        El Concejo Municipal publica un resumen oficial de su actividad cada
        año desde 2012. Acceso directo a los {resumenesAnuales.length}{" "}
        resúmenes con su fecha de publicación oficial.
      </p>
      {resumenesAnuales[0] && (
        <article className="mt-5 rounded-2xl border-2 border-coral/40 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Más reciente
          </span>
          <h3 className="mt-1 font-serif text-2xl font-bold text-navy">
            {resumenesAnuales[0].titulo}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Publicado el {resumenesAnuales[0].fechaPublicacion} ·{" "}
            {(resumenesAnuales[0].tamanioBytes / 1024 / 1024).toFixed(1)} MB
          </p>
          {resumenesAnuales[0].fragmento && (
            <p className="mt-3 text-sm text-slate-700 line-clamp-4">
              {resumenesAnuales[0].fragmento}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={resumenesAnuales[0].urlOriginal}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Descargar PDF
            </Link>
          </div>
        </article>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resumenesAnuales.slice(1).map((r) => (
          <Link
            key={r.id}
            href={r.urlOriginal}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-serif text-2xl font-bold text-navy">
              {r.anio}
            </div>
            <div className="mt-0.5 text-xs text-slate-500">
              Publicado el {r.fechaPublicacion}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {(r.tamanioBytes / 1024 / 1024).toFixed(1)} MB · PDF
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Los resúmenes se sincronizan automáticamente cada día desde{" "}
        <Link
          href="https://concejosunchales.gob.ar/resumen-anual.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark"
        >
          concejosunchales.gob.ar/resumen-anual.aspx
        </Link>
        .
      </p>

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

function Avatar({ nombre }: { nombre: string }) {
  // Iniciales: primera letra del primer nombre + primera letra del último apellido
  const partes = nombre.trim().split(/\s+/);
  const ini =
    partes.length === 1
      ? partes[0][0]
      : (partes[0][0] ?? "") + (partes[partes.length - 1][0] ?? "");
  return (
    <div
      aria-label={nombre}
      className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-coral to-coral-dark font-serif text-xl font-black text-zinc-900"
    >
      {ini.toUpperCase()}
    </div>
  );
}
