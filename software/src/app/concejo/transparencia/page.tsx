import Link from "next/link";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  totalesConcejo,
  ucmHistorico,
  totalPdfsConcejo,
  actividadPorAnio,
  type ConcejoItem
} from "@/lib/data/concejo-archivos.generated";
import {
  boletinesBimestrales,
  iniciativasCiudadanas,
  normativaAmbiental,
  proyectosEnTratamiento,
  proyectosPerdidos,
  ejecucionesPresupuestariasDetalle,
  movimientosSaldosDetalle,
  totalConTextoExtraido,
  ultimaActualizacion,
  totalPdfsRegistrados
} from "@/lib/data/concejo-detalle";
import { resumenesAnuales } from "@/lib/data/resumenes-anuales.generated";
import {
  ActividadAnualChart,
  CategoriasChart,
  UcmFrecuenciaChart
} from "./ConcejoCharts";
import TablaConcejoArchivos from "./TablaConcejoArchivos";

export const metadata = {
  title: "Transparencia del Concejo · Sunchales Transparente",
  description:
    "Datos completos del Concejo Municipal de Sunchales: actividad anual, ejecución presupuestaria, movimiento de saldos, UCM histórica, proyectos, boletines, iniciativas ciudadanas. Sincronización diaria."
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
  const serie = actividadPorAnio().filter((s) => s.anio >= 2011);
  const topAnios = [...serie].sort((a, b) => b.total - a.total).slice(0, 3);

  // UCM agrupada por año
  const ucmPorAnio = ucmHistorico.reduce<Record<number, number>>((acc, u) => {
    if (u.anioOrdenanza) acc[u.anioOrdenanza] = (acc[u.anioOrdenanza] ?? 0) + 1;
    return acc;
  }, {});
  const ucmFreqData = Object.entries(ucmPorAnio)
    .map(([a, n]) => ({ anio: parseInt(a, 10), cantidad: n }))
    .sort((a, b) => a.anio - b.anio);

  // Distribución por categoría
  const categoriasData = Object.entries(totalesConcejo)
    .map(([k, v]) => ({ categoria: labelCategoria[k] ?? k, cantidad: v }))
    .sort((a, b) => b.cantidad - a.cantidad);

  // % cobertura texto extraído
  const pctTexto = totalPdfsRegistrados
    ? Math.round((totalConTextoExtraido / totalPdfsRegistrados) * 100)
    : 0;

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
        la información agregada con tablas filtrables, búsqueda y descarga
        en CSV.
      </p>
      {ultimaActualizacion && (
        <p className="mt-1 text-xs text-slate-500">
          Última sincronización: {new Date(ultimaActualizacion).toLocaleString("es-AR")}
          {" · "}
          {totalConTextoExtraido > 0 && (
            <>
              {totalConTextoExtraido} de {totalPdfsRegistrados} con texto
              extraído ({pctTexto}%).
            </>
          )}
        </p>
      )}

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          placeholder="Buscar en el archivo del Concejo…"
          sugerencias={[
            "¿Qué documentos publica el Concejo?",
            "¿Qué iniciativas ciudadanas se presentaron?",
            "¿Qué normativa ambiental está vigente?",
            "¿Cuál es la ejecución presupuestaria?",
          ]}
        />
      </div>

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

      {/* Gráficos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Análisis visual
      </h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ActividadAnualChart data={serie} />
        <CategoriasChart data={categoriasData} />
      </div>
      <div className="mt-5">
        <UcmFrecuenciaChart data={ucmFreqData} />
      </div>

      {/* Lectura del dato */}
      <section className="mt-8 rounded-2xl border border-coral/40 bg-gradient-to-br from-amber-50 to-white p-6">
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
            <strong>Ajustes de UCM acelerados:</strong>{" "}
            {Object.entries(ucmPorAnio).filter(([, n]) => n >= 3).length} año(s)
            con 3 o más actualizaciones de UCM. Suele coincidir con escenarios
            inflacionarios o reformas tributarias profundas.
          </li>
          <li>
            <strong>Continuidad institucional:</strong> publicación
            ininterrumpida de Resúmenes Anuales desde 2012 (14 años) y
            ejecución presupuestaria mensual desde 2011.
          </li>
          <li>
            <strong>Carga legislativa:</strong> {proyectosPerdidos.length}{" "}
            proyectos perdieron estado parlamentario; {proyectosEnTratamiento.length}{" "}
            están actualmente en tratamiento.
          </li>
        </ul>
      </section>

      {/* UCM histórica - tabla resumida */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Evolución de la UCM (Unidad de Cuenta Municipal)
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Las {ucmHistorico.length} ordenanzas que actualizaron la UCM desde
        2011, ordenadas de la más nueva a la más antigua. Cada actualización
        impacta directamente en las tasas, multas y derechos municipales.
      </p>
      <div className="-mx-4 mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Ordenanza</th>
              <th className="px-3 py-2">Año</th>
              <th className="px-3 py-2 text-right">Tamaño</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {ucmHistorico.map((u, i) => (
              <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-3 py-2 font-medium text-navy">
                  {u.ordenanzaNumero ? `Ord. N° ${u.ordenanzaNumero}` : "(sin número)"}
                </td>
                <td className="px-3 py-2 text-slate-600">{u.anioOrdenanza}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-500">
                  {(u.tamanioBytes / 1024).toFixed(0)} KB
                </td>
                <td className="px-3 py-2 text-right">
                  <a
                    href={u.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-dark hover:underline"
                  >
                    PDF →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ejecución presupuestaria - tabla filtrable */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Ejecución partida presupuestaria mensual
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {ejecucionesPresupuestariasDetalle.length} reportes mensuales del
        Concejo desde 2011. Filtrables por año y exportables a CSV.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={ejecucionesPresupuestariasDetalle}
          csvNombre="ejecucion-presupuestaria"
        />
      </div>

      {/* Movimientos de saldos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Movimientos de saldos del presupuesto
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {movimientosSaldosDetalle.length} estados de ejecución del presupuesto.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={movimientosSaldosDetalle}
          csvNombre="movimientos-saldos"
        />
      </div>

      {/* Proyectos en tratamiento */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Proyectos en estado parlamentario
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {proyectosEnTratamiento.length} proyectos actualmente en tratamiento
        en el Concejo (proyectos de ordenanza, resolución, declaración o minuta
        de comunicación).
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={proyectosEnTratamiento}
          csvNombre="proyectos-en-tratamiento"
        />
      </div>

      {/* Proyectos perdidos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Proyectos que perdieron estado parlamentario
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {proyectosPerdidos.length} proyectos que perdieron estado parlamentario
        (no fueron tratados dentro del plazo legal). Búsqueda y filtro por
        año disponibles.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={proyectosPerdidos}
          csvNombre="proyectos-perdidos"
        />
      </div>

      {/* Boletines */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Boletines bimestrales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {boletinesBimestrales.length} boletines informativos publicados desde
        2012, periodicidad bimestral.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={boletinesBimestrales}
          csvNombre="boletines-bimestrales"
        />
      </div>

      {/* Normativa ambiental */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Normativa ambiental
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {normativaAmbiental.length} ordenanzas, decretos, resoluciones y
        sentencias judiciales locales de jurisdicción ambiental.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={normativaAmbiental}
          csvNombre="normativa-ambiental"
        />
      </div>

      {/* Iniciativas ciudadanas */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Iniciativas ciudadanas
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        {iniciativasCiudadanas.length} notas y propuestas presentadas por
        ciudadanos al Concejo Municipal.
      </p>
      <div className="mt-5">
        <TablaConcejoArchivos
          items={iniciativasCiudadanas}
          csvNombre="iniciativas-ciudadanas"
          conFiltroAnio={false}
        />
      </div>

      {/* Resúmenes anuales como atajo */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Acceso rápido a los Resúmenes Anuales
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Los {resumenesAnuales.length} resúmenes oficiales del Concejo (2012 a
        2025).
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
            PDF, no en CSV/JSON. Este sitio publica CSV derivado por
            categoría como mejora respecto al original.
          </li>
          <li>
            <strong>Sin metadatos estructurados:</strong> ninguna ordenanza
            tiene tags, materias normalizadas ni links a las normas que
            modifica/deroga.
          </li>
          <li>
            <strong>Texto extraído:</strong>{" "}
            {totalConTextoExtraido > 0
              ? `${pctTexto}% de los PDFs ya tienen su texto disponible para búsqueda. La GitHub Action procesa los nuevos automáticamente.`
              : "los PDFs aún no tienen texto extraído. La GitHub Action lo procesará en la próxima corrida."}
          </li>
          <li>
            <strong>Páginas con buscador vacío:</strong> Acta de sesiones,
            Diario de sesiones y Orden del día tienen formularios pero no
            muestran resultados sin un POST con parámetros del buscador (no
            extraíbles vía scraping simple).
          </li>
        </ul>
        <p className="mt-4 text-xs text-amber-900/80">
          Fundamento normativo: Ordenanza Sunchales 1872/2009 + Decreto
          Provincial 0692/2009 + Constitución Nacional Art. 1° y 75 inc. 22
          (CADH Art. 13).
        </p>
      </section>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-500">
        Actualización automática diaria desde concejosunchales.gob.ar.
        {ultimaActualizacion &&
          ` Última generación de este índice: ${new Date(ultimaActualizacion).toLocaleDateString("es-AR")}.`}
      </p>
    </div>
  );
}
