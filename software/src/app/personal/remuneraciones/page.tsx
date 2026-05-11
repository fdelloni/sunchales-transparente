import Link from "next/link";
import StatCard from "@/components/StatCard";
import {
  remuneracionesPdfs,
  remuneracionesMeta,
} from "@/lib/data/remuneraciones.generated";
import {
  remuneracionesDetalle,
  remuneracionesDetalleMeta,
} from "@/lib/data/remuneraciones-detalle.generated";
import {
  remuneracionesDetalleOcr,
  remuneracionesOcrMeta,
} from "@/lib/data/remuneraciones-ocr.generated";

export const metadata = {
  title: "Remuneraciones de funcionarios — Histórico mensual · Sunchales Transparente",
  description:
    "Listado completo de PDFs oficiales de remuneraciones de funcionarios municipales publicados por sunchales.gob.ar. Sincronizado contra la fuente y enlazado mes a mes.",
};

const NOMBRES_MES = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type SP = { searchParams?: { anio?: string } };

export default function RemuneracionesPage({ searchParams }: SP) {
  const total = remuneracionesPdfs.length;
  const anios = Array.from(
    new Set(remuneracionesPdfs.map((p) => p.anio).filter((a): a is number => !!a))
  ).sort((a, b) => b - a);

  const anioSel = searchParams?.anio ? Number(searchParams.anio) : anios[0];
  const items = remuneracionesPdfs
    .filter((p) => p.anio === anioSel)
    .sort((a, b) => {
      if ((a.mes ?? 0) !== (b.mes ?? 0)) return (a.mes ?? 0) - (b.mes ?? 0);
      return Number(a.sac) - Number(b.sac);
    });

  // Detección de huecos por año
  const aniosCompletos = Object.entries(remuneracionesMeta.porAnio)
    .map(([a, c]) => ({ anio: Number(a), pdfs: c }))
    .sort((a, b) => a.anio - b.anio);

  const min = aniosCompletos[0]?.anio ?? 2014;
  const max = aniosCompletos[aniosCompletos.length - 1]?.anio ?? 2026;
  const huecos: number[] = [];
  for (let y = min; y <= max; y++) {
    if (!aniosCompletos.find((a) => a.anio === y)) huecos.push(y);
  }

  const fmtFecha = (iso: string) =>
    new Date(iso).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/personal" className="text-sm text-coral-dark hover:underline">
        ← Volver a Personal
      </Link>

      <span className="eyebrow mt-4 block">Personal · Remuneraciones</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Remuneraciones de funcionarios — histórico mensual
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Listado sincronizado con el sitio oficial del municipio. Cada link
        abajo abre el PDF original publicado por la Municipalidad. El proyecto
        no edita esos archivos: simplemente los enumera, los etiqueta por
        período y los hace navegables.
      </p>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={remuneracionesMeta.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Ver listado oficial →
        </a>
        <a
          href="/api/v1/remuneraciones?format=csv"
          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Descargar CSV
        </a>
        <a
          href="/api/v1/remuneraciones"
          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          API JSON
        </a>
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          value={String(total)}
          label="PDFs sincronizados"
          hint="Cada uno enlaza al archivo oficial."
        />
        <StatCard
          value={`${remuneracionesDetalleMeta.parseados}/${total}`}
          label="Períodos con texto digital"
          hint={`${remuneracionesDetalleMeta.filasTotales} filas extraídas con parser determinístico.`}
        />
        <StatCard
          value={`+${remuneracionesOcrMeta.conFilas}`}
          label="Períodos rescatados con OCR"
          hint={`${remuneracionesOcrMeta.filasTotales} filas adicionales (marcadas como ocrNoVerificado).`}
        />
        <StatCard
          value={String(huecos.length)}
          label="Años sin publicaciones"
          hint={huecos.length === 0 ? "Sin huecos." : `Huecos: ${huecos.join(", ")}.`}
        />
      </div>

      {/* Aviso de huecos como brecha */}
      {huecos.length > 0 && (
        <div className="mt-6 rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 text-sm text-amber-900">
          <strong className="block text-amber-900">Brecha visible: hueco de publicación</strong>
          <p className="mt-2">
            El municipio no publica PDFs de remuneraciones de funcionarios
            para los años: <strong>{huecos.join(", ")}</strong>. La
            obligación de publicidad rige todo el período. La omisión queda
            declarada y se puede reclamar mediante un{" "}
            <Link className="underline" href="/aip">
              pedido formal de Acceso a la Información (AIP)
            </Link>{" "}
            bajo la Ord. 1872/2009.
          </p>
        </div>
      )}

      {/* Filtro por año */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Listado por año
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {anios.map((a) => (
          <Link
            key={a}
            href={`/personal/remuneraciones?anio=${a}`}
            className={
              anioSel === a
                ? "rounded-full border-2 border-coral bg-coral/15 px-3 py-1 text-xs font-semibold text-coral-dark"
                : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-coral/40 hover:bg-amber-50"
            }
          >
            {a} ({remuneracionesMeta.porAnio[String(a) as keyof typeof remuneracionesMeta.porAnio] ?? 0})
          </Link>
        ))}
      </div>

      <h3 className="mt-6 font-serif text-lg font-bold text-navy">
        {anioSel} — {items.length} PDFs
      </h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Período</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  Sin publicaciones para este año.
                </td>
              </tr>
            )}
            {items.map((p) => {
              const det = remuneracionesDetalle.find((d) => d.urlPdf === p.urlPdf);
              const ocr = remuneracionesDetalleOcr.find((o) => o.urlPdf === p.urlPdf);
              const parseado = !!det?.parseado;
              const tieneOcr = !!ocr && ocr.cantidadFilas > 0;
              const escaneado =
                !parseado && /sin texto digital/.test(det?.error ?? "");
              return (
                <tr key={p.urlPdf} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-navy">
                    {p.mes ? NOMBRES_MES[p.mes] : "—"} {p.anio}
                  </td>
                  <td className="px-4 py-3">
                    {p.sac ? (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        SAC
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Mensual
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {parseado ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        ✓ {det.cantidadFilas} filas
                      </span>
                    ) : tieneOcr ? (
                      <span
                        className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-700"
                        title="OCR aplicado sobre PDF escaneado. Posibles errores en montos."
                      >
                        ⚠ OCR · {ocr!.cantidadFilas} filas
                      </span>
                    ) : escaneado ? (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        ⚠ Escaneado (OCR sin filas)
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        — Sólo PDF
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {(parseado || tieneOcr) && (
                        <Link
                          href={`/personal/remuneraciones/${p.periodo}`}
                          className={
                            tieneOcr && !parseado
                              ? "rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-orange-700"
                              : "rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                          }
                        >
                          Ver detalle →
                        </Link>
                      )}
                      <a
                        href={p.urlPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-navy hover:bg-slate-50"
                      >
                        PDF ↗
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Nota metodológica */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          Este índice se genera automáticamente con el script{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5">
            npm run scrapear-remuneraciones
          </code>
          , que descarga el listado oficial y extrae año, mes y tipo (sueldo
          mensual o SAC) directamente del nombre de cada PDF. Última
          sincronización:{" "}
          <strong>{fmtFecha(remuneracionesMeta.sincronizadoEl)}</strong>.
        </p>
        <p className="mt-2">
          Brecha vigente: los archivos están en formato cerrado (PDF), no en
          CSV/JSON estructurados que permitan análisis comparativo entre
          períodos sin parseo manual. Esto limita la reutilización por parte
          de periodismo de datos, academia y organizaciones civiles. La
          brecha de "datos abiertos en formato reutilizable" sigue declarada
          en{" "}
          <Link href="/brechas" className="underline">
            /brechas
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
