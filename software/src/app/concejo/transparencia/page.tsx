import Link from "next/link";
import {
  totalesConcejo,
  ucmHistorico,
  totalPdfsConcejo,
  actividadAnual,
  actividadPorAnio
} from "@/lib/data/concejo-archivos.generated";
import { resumenesAnuales } from "@/lib/data/resumenes-anuales.generated";

export const metadata = {
  title: "Transparencia del Concejo · Sunchales Transparente",
  description:
    "Datos completos del Concejo Municipal de Sunchales: actividad anual, ejecución presupuestaria, movimiento de saldos, UCM histórica, proyectos, boletines, iniciativas ciudadanas. 924 documentos sincronizados."
};

const labelCategoria: Record<string, string> = {
  "boletines-bimestrales": "Boletines bimestrales",
  "resumenes-anuales": "Resúmenes anuales",
  "ejecucion-presupuestaria": "Ejecución presupuestaria",
  "movimiento-saldos": "Movimientos de saldos",
  ucm: "Ordenanzas UCM",
  "proyectos-en-tratamiento": "Proyectos en tratamiento",
  "proyectos-perdidos": "Proyectos perdidos",
  "iniciativas-ciudadanas": "Iniciativas ciudadanas",
  "normativa-ambiental": "Normativa ambiental",
  "programa-fortalecimiento": "Programa fortalecimiento",
  "acceso-informacion-publica": "Acceso a la información"
};

const urlCategoria: Record<string, string> = {
  "boletines-bimestrales": "https://concejosunchales.gob.ar/boletin-informativo-bimestral.aspx",
  "resumenes-anuales": "https://concejosunchales.gob.ar/resumen-anual.aspx",
  "ejecucion-presupuestaria":
    "https://concejosunchales.gob.ar/ejecucion-partida-presupuestaria.aspx",
  "movimiento-saldos": "https://concejosunchales.gob.ar/movimiento-de-saldos.aspx",
  ucm: "https://concejosunchales.gob.ar/valor-de-la-ucm.aspx",
  "proyectos-en-tratamiento":
    "https://concejosunchales.gob.ar/proyectos-estado-parlamentario.aspx",
  "proyectos-perdidos":
    "https://concejosunchales.gob.ar/proyectos-perdieron-estado-parlamentario.aspx",
  "iniciativas-ciudadanas":
    "https://concejosunchales.gob.ar/registro-de-iniciativas-ciudadanas.aspx",
  "normativa-ambiental": "https://concejosunchales.gob.ar/normativa-ambiental.aspx",
  "programa-fortalecimiento":
    "https://concejosunchales.gob.ar/programa-fortalecimiento.aspx",
  "acceso-informacion-publica":
    "https://concejosunchales.gob.ar/acceso-informacion-publica.aspx"
};

export default function ConcejoTransparenciaPage() {
  const total = totalPdfsConcejo();
  const serie = actividadPorAnio();
  const maxAnio = Math.max(...serie.map((s) => s.total));

  // Top 5 años con más actividad
  const topAnios = [...serie].sort((a, b) => b.total - a.total).slice(0, 5);

  // UCM agrupada por año
  const ucmPorAnio = ucmHistorico.reduce<Record<number, number>>((acc, u) => {
    if (u.anioOrdenanza) acc[u.anioOrdenanza] = (acc[u.anioOrdenanza] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="text-xs text-slate-500">
        <Link href="/concejo" className="hover:underline">
          ← Volver a Concejo Municipal
        </Link>
      </div>
      <span className="eyebrow mt-2 block">
        Transparencia del Concejo · {total} documentos sincronizados
      </span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Toda la actividad del Concejo, en un solo lugar
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        El proyecto sincroniza diariamente los documentos públicos del Concejo
        Municipal de Sunchales (concejosunchales.gob.ar). Esta página muestra
        toda la información agregada: actividad por año, ejecución
        presupuestaria mes a mes, evolución de la UCM, proyectos en
        tratamiento, boletines y más.
      </p>

      {/* KPIs principales */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(totalesConcejo).map(([cat, n]) => (
          <Link
            key={cat}
            href={urlCategoria[cat] ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-serif text-3xl font-bold text-navy">{n}</div>
            <div className="mt-1 text-xs text-slate-500">
              {labelCategoria[cat] ?? cat}
            </div>
          </Link>
        ))}
      </div>

      {/* Actividad por año - bar chart manual */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Actividad anual del Concejo
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Cantidad de documentos publicados por año (todas las categorías
        combinadas). Refleja el ritmo de trabajo legislativo desde 2011.
      </p>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-2">
          {serie
            .filter((s) => s.anio >= 2011)
            .reverse()
            .map((s) => {
              const pct = Math.round((s.total / maxAnio) * 100);
              return (
                <div key={s.anio} className="flex items-center gap-3">
                  <div className="w-12 font-mono text-sm text-slate-600">
                    {s.anio}
                  </div>
                  <div className="relative flex-1">
                    <div
                      className="h-7 rounded-md bg-gradient-to-r from-coral to-coral-dark"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                  <div className="w-12 text-right font-mono text-sm font-semibold text-navy">
                    {s.total}
                  </div>
                </div>
              );
            })}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Año más activo: <strong>{topAnios[0]?.anio}</strong> con{" "}
          {topAnios[0]?.total} documentos. Total histórico: {total} documentos.
        </p>
      </div>

      {/* UCM histórica */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Evolución de la UCM (Unidad de Cuenta Municipal)
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        La UCM es la unidad usada por el municipio para fijar tasas, multas y
        derechos. Estas {ucmHistorico.length} ordenanzas la actualizaron desde
        2011. Cada actualización es un cambio de valor que impacta directamente
        en los tributos municipales.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Ordenanza</th>
              <th className="px-4 py-3">Año</th>
              <th className="px-4 py-3 text-right">Tamaño PDF</th>
              <th className="px-4 py-3">Acceso</th>
            </tr>
          </thead>
          <tbody>
            {ucmHistorico.map((u, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-navy">
                  {u.ordenanzaNumero ? `Ord. N° ${u.ordenanzaNumero}` : "(sin número)"}
                </td>
                <td className="px-4 py-2 text-slate-600">{u.anioOrdenanza}</td>
                <td className="px-4 py-2 text-right tabular-nums text-slate-500">
                  {(u.tamanioBytes / 1024).toFixed(0)} KB
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={u.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-dark hover:underline"
                  >
                    PDF →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UCM agrupada por año */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-serif text-base font-bold text-navy">
          Frecuencia de actualización de la UCM
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Cuántas veces se modificó la UCM en cada año. La frecuencia más alta
          refleja años de mayor inflación o ajustes tributarios.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {Object.entries(ucmPorAnio)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            .map(([anio, n]) => (
              <div
                key={anio}
                className="rounded-lg border border-slate-200 p-2 text-center"
              >
                <div className="font-mono text-sm text-slate-600">{anio}</div>
                <div className="font-serif text-xl font-bold text-coral-dark">
                  {n}
                </div>
                <div className="text-[10px] text-slate-500">
                  {n === 1 ? "ordenanza" : "ordenanzas"}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Lectura del dato */}
      <section className="mt-10 rounded-2xl border border-coral/40 bg-gradient-to-br from-amber-50 to-white p-6">
        <h3 className="font-serif text-lg font-bold text-coral-dark">
          📈 Lecturas posibles de los datos
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Pico de actividad:</strong> {topAnios[0]?.anio} fue el año
            con más actividad publicada ({topAnios[0]?.total} documentos),
            seguido por {topAnios[1]?.anio} ({topAnios[1]?.total}) y{" "}
            {topAnios[2]?.anio} ({topAnios[2]?.total}).
          </li>
          <li>
            <strong>Ajustes de UCM acelerados:</strong> en{" "}
            {Object.entries(ucmPorAnio).filter(([, n]) => n >= 3).length}{" "}
            año(s) hubo 3 o más actualizaciones de UCM. Eso suele coincidir
            con escenarios inflacionarios o reformas tributarias profundas.
          </li>
          <li>
            <strong>Proyectos perdidos:</strong> el Concejo registra 393
            proyectos que perdieron estado parlamentario (los más de 2023 con
            59 proyectos).
          </li>
          <li>
            <strong>Continuidad institucional:</strong> publicación
            ininterrumpida de Resúmenes Anuales desde 2012 (14 años) y de
            Ejecución Presupuestaria mensual desde 2011.
          </li>
        </ul>
      </section>

      {/* Resúmenes anuales como atajo */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Acceso rápido a los Resúmenes Anuales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Los {resumenesAnuales.length} resúmenes oficiales del Concejo (2012 a 2025).
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {resumenesAnuales.map((r) => (
          <Link
            key={r.id}
            href={r.urlOriginal}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-serif text-2xl font-bold text-navy">
              {r.anio}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500">PDF</div>
          </Link>
        ))}
      </div>

      {/* Brechas explícitas */}
      <section className="mt-12 overflow-hidden rounded-2xl border-2 border-amber-500/70 bg-gradient-to-br from-amber-50 to-white p-6">
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Brechas detectadas en estos datos
        </h2>
        <p className="mt-2 max-w-3xl text-amber-900/90">
          A pesar del esfuerzo de publicación del Concejo, persisten estas
          brechas que conviene declarar abiertamente:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-amber-900">
          <li>
            <strong>Formato cerrado:</strong> los {total} documentos están en
            PDF, no en CSV/JSON. No son reutilizables por periodismo de datos.
          </li>
          <li>
            <strong>Sin metadatos estructurados:</strong> ninguna ordenanza
            tiene tags, materias normalizadas ni links a las normas que
            modifica/deroga.
          </li>
          <li>
            <strong>Sin texto extraído:</strong> los PDFs no son fácilmente
            buscables. La GitHub Action del proyecto extrae el texto y lo guarda
            en .txt al lado del PDF, pero el sitio oficial no provee esa
            funcionalidad.
          </li>
          <li>
            <strong>Páginas con buscador vacío:</strong> Acta de sesiones,
            Diario de sesiones y Orden del día tienen formularios pero no
            muestran resultados sin un POST con parámetros del buscador.
          </li>
        </ul>
        <p className="mt-4 text-xs text-amber-900/80">
          Fundamento normativo: Ordenanza Sunchales 1872/2009 + Decreto Pcial
          0692/2009 + Constitución Nacional art. 1 y 75 inc. 22 (CADH art. 13).
        </p>
      </section>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-500">
        Actualización automática diaria desde concejosunchales.gob.ar.
        Última generación de este índice: 03/05/2026.
      </p>
    </div>
  );
}
