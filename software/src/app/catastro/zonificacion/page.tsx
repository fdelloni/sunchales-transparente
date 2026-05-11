import dynamic from "next/dynamic";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import BuscadorParcelaSCIT from "@/components/BuscadorParcelaSCIT";
import {
  clasesSuelo,
  parcelasArt4,
  poligonosArea,
  URL_ORD_2800,
  URL_IDESF_PORTAL,
  URL_IDESF_BUSCADOR,
  type ClaseSuelo,
} from "@/lib/data/zonificacion";
import {
  manzanas,
  radios,
  centroSunchales,
} from "@/lib/data/sunchales-manzanas.generated";

// Leaflet usa window/document — sólo cliente.
const MapaLeafletSunchales = dynamic(
  () => import("@/components/MapaLeafletSunchales"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[560px] w-full place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Cargando mapa de Sunchales…
      </div>
    ),
  }
);

export const metadata = {
  title: "Zonificación urbana · Catastro · Sunchales Transparente",
  description:
    "Áreas de suelo de Sunchales según la Ordenanza 2800/2019 (Urbanizado, Urbanizable, Suburbano, Rural, No Urbanizable) y mapa de manzanas reales con datos del IPEC Santa Fe (Censo 2022).",
};

const COLOR_AREA: Record<ClaseSuelo, string> = {
  urbanizado: "bg-amber-200 text-amber-900 border-amber-400",
  urbanizable: "bg-emerald-100 text-emerald-900 border-emerald-400",
  suburbano: "bg-sky-100 text-sky-900 border-sky-400",
  rural: "bg-lime-100 text-lime-900 border-lime-400",
  no_urbanizable: "bg-slate-200 text-slate-700 border-slate-400",
};

export default function ZonificacionPage() {
  const totalManzanas = manzanas.length;
  const totalRadios = radios.length;
  const totalEspaciosVerdes = manzanas.filter((m) => m.espacioVerde).length;
  const totalParcelasArt4 = parcelasArt4.length;
  const totalPoligonos = poligonosArea.length;

  // Link al visualizador IDESF centrado en Sunchales (lng,lat)
  const idesfCentrado = `${URL_IDESF_PORTAL}?lng=${centroSunchales.lng}&lat=${centroSunchales.lat}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6">
        <BuscadorSeccion
          placeholder="Buscar sobre zonificación urbana…"
          ctaSinResultado={{
            label: "Pedido AIP por zonificación",
            href: "/aip?brecha=cat-zonificacion-pdf",
          }}
        />
      </div>

      {/* Breadcrumb simple */}
      <nav className="mb-3 text-xs text-slate-500">
        <Link href="/catastro" className="hover:text-navy hover:underline">
          ← Catastro
        </Link>
      </nav>

      <span className="eyebrow">Ordenamiento territorial</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Zonificación urbana
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Las áreas de suelo del Distrito Sunchales están definidas por la{" "}
        <a
          href={URL_ORD_2800}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-amber-500 underline-offset-2"
        >
          Ordenanza 2800/2019
        </a>{" "}
        — sancionada el 11/12/2019, modifica el Art. 1° y el Anexo I de la
        Ord. 1294/1999. Esta página publica las cinco clases de suelo con su
        definición verbatim, la lista del Art. 4° (parcelas incorporadas al
        Área Urbanizada), un mapa con las manzanas reales del ejido —según el
        shapefile IPEC del Censo 2022—, y el inventario de polígonos descriptos
        en el Anexo I-2. Los polígonos del Anexo I-2 están descriptos en la
        Ordenanza por calles y lotes, no por coordenadas; la conversión a
        formato vector queda declarada como brecha catastral pendiente.
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value="5" label="Clases de suelo (Ord. 2800/2019)" />
        <StatCard value={String(totalParcelasArt4)} label="Parcelas Art. 4° incorporadas" />
        <StatCard value={String(totalPoligonos)} label="Polígonos en Anexo I-2" />
        <StatCard value={String(totalManzanas)} label="Manzanas reales (IPEC 2022)" />
      </div>

      {/* Mapa Leaflet */}
      <section className="mt-10">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Mapa de manzanas y radios censales
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          {totalManzanas} manzanas y {totalRadios} radios censales del ejido
          urbano. Los espacios verdes y plazas ({totalEspaciosVerdes}) se
          distinguen en verde. Mapa interactivo con tiles de OpenStreetMap como
          base — click en cualquier manzana para ver detalles y usar el zoom
          para acercarte al detalle parcelario.
        </p>
        <div className="mt-4">
          <MapaLeafletSunchales />
        </div>
        <div className="mt-3 rounded-md border-l-2 border-amber-400 bg-amber-50 p-3 text-xs text-amber-900">
          <strong className="block font-semibold">Importante:</strong> Este mapa
          muestra la <em>geometría parcelaria</em> publicada por IPEC sobre
          tiles de OpenStreetMap, no la <em>zonificación urbanística</em>. No
          se pintan las cinco Áreas de suelo de la Ord. 2800/2019 porque su
          descripción es literaria (calle por calle) y no hay GeoJSON oficial
          disponible. Quien quiera ver el plano de zonificación oficial debe
          consultar el PDF de la Ordenanza.
        </div>
      </section>

      {/* Buscador integrado SCIT */}
      <section className="mt-10">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Buscar mi parcela en el catastro provincial
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          El catastro de Santa Fe (SCIT, Ley 10.921/1992) ofrece un buscador
          oficial de parcelas. Por restricciones de seguridad del servidor
          provincial (header CSP <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">frame-ancestors 'self'</code>),
          no se puede embeber acá como iframe. En su lugar, este formulario te
          ayuda a armar el nomenclador catastral correcto y a abrir el
          buscador oficial en una pestaña nueva.
        </p>
        <div className="mt-4">
          <BuscadorParcelaSCIT />
        </div>
      </section>

      {/* 5 clases de suelo */}
      <section className="mt-10">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Las 5 clases de suelo del Distrito
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Definiciones textuales del Art. 1.2 de la Ord. 2800/2019. Cada
          clasificación determina los instrumentos de regulación aplicables
          (subdivisión, edificación, dotación de servicios, tributación).
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {clasesSuelo.map((c) => (
            <article
              key={c.id}
              className={`rounded-xl border p-4 ${COLOR_AREA[c.id]}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-base font-bold">
                  {c.numero}. {c.nombre}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                  {c.citaArtic}
                </span>
              </div>
              <p className="mt-2 text-sm">{c.definicion}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Polígonos del Anexo I-2 */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Polígonos descriptos en el Anexo I-2
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          La Ord. 2800/2019 delimita {totalPoligonos} polígonos en su Anexo I-2,
          describiendo cada uno por las calles, rutas y lotes que conforman su
          contorno. No incluye coordenadas, por lo cual no se puede reconstruir
          en GeoJSON sin trabajo de cartógrafo. El listado:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold">Área de suelo</th>
                <th className="px-3 py-2 font-semibold">Polígono</th>
                <th className="px-3 py-2 font-semibold">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {poligonosArea.map((p, i) => {
                const claseDef = clasesSuelo.find((c) => c.id === p.area);
                return (
                  <tr
                    key={`${p.area}-${p.nombre}-${i}`}
                    className="border-b border-slate-100"
                  >
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${COLOR_AREA[p.area]}`}
                      >
                        {claseDef?.nombre ?? p.area}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-medium text-navy">
                      {p.nombre}
                    </td>
                    <td className="px-3 py-2 text-slate-500">{p.referencia}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <a
          href={URL_ORD_2800}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs font-semibold text-amber-700 hover:text-amber-800"
        >
          Ver descripción textual completa de los polígonos (PDF oficial) →
        </a>
      </section>

      {/* Parcelas Art. 4 */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Inmuebles incorporados al Área Urbanizada (Art. 4°)
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          La Ord. 2800/2019 incorpora expresamente {totalParcelasArt4} inmuebles
          al Área de Suelo Urbanizado. Cada uno se identifica por su designación
          catastral y alias coloquial (entre paréntesis en el texto original).
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold">#</th>
                <th className="px-3 py-2 font-semibold">Designación catastral</th>
                <th className="px-3 py-2 font-semibold">Alias</th>
              </tr>
            </thead>
            <tbody>
              {parcelasArt4.map((p, i) => (
                <tr
                  key={`art4-${i}`}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-3 py-2 text-navy">{p.designacion}</td>
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {p.alias}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visualizador SCIT — accesos directos */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Acceso al visualizador parcelario provincial (SCIT)
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Para consultar perfil edificado, capas catastrales y datos
          territoriales completos, el SCIT (Ley 10.921/1992) publica un
          visualizador oficial. No se incrusta aquí como iframe por el CSP{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
            frame-ancestors 'self'
          </code>{" "}
          del servidor provincial, ni como tile-layer porque su WMS no expone
          CORS. Los enlaces directos abren los recursos en pestaña nueva:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={idesfCentrado}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Abrir IDESF (visualizador) →
          </a>
          <a
            href={URL_IDESF_BUSCADOR}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Abrir buscador SCIT →
          </a>
        </div>
        <p className="mt-3 text-[11px] text-slate-500">
          Centroide aproximado de Sunchales (calculado a partir del shapefile
          IPEC):{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">
            {centroSunchales.lat.toFixed(6)}, {centroSunchales.lng.toFixed(6)}
          </code>
        </p>
      </section>

      {/* Brechas declaradas */}
      <section className="mt-10 rounded-2xl border-2 border-dashed border-amber-400 bg-white p-6">
        <h2 className="section-heading font-serif text-2xl font-bold text-navy">
          Brechas declaradas de esta sección
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Hacer visible lo que falta publicar es parte del deber de publicidad
          de los actos de gobierno. Estas son las brechas que afectan
          puntualmente la zonificación urbana de Sunchales:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong className="text-navy">Polígonos no georreferenciados:</strong>{" "}
            la Ord. 2800/2019 describe sus 12 polígonos por calles y lotes; no
            existe GeoJSON ni shapefile oficial que los represente como
            geometría vectorial reutilizable.
          </li>
          <li>
            <strong className="text-navy">Plano parcelario municipal sin publicar:</strong>{" "}
            el municipio no publica plano parcelario propio navegable. La
            geometría utilizada en este sitio proviene del SCIT/IPEC provincial,
            no de fuente municipal.
          </li>
          <li>
            <strong className="text-navy">Zonificación sólo en PDFs sueltos:</strong>{" "}
            las modificaciones a la zonificación se rastrean leyendo
            ordenanzas separadas (Ord. 1294/1999 + 2800/2019 + sucesivas). No
            hay texto consolidado vigente publicado.
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/brechas?modulo=catastro"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Ver brechas catastrales completas →
          </Link>
          <Link
            href="/aip?brecha=cat-plano-parcelario"
            className="rounded-lg bg-amber-500 px-4 p