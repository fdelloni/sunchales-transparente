import Link from "next/link";
import { notFound } from "next/navigation";
import StatCard from "@/components/StatCard";
import { remuneracionesDetalle } from "@/lib/data/remuneraciones-detalle.generated";
import { remuneracionesDetalleOcr } from "@/lib/data/remuneraciones-ocr.generated";
import { formatARS, formatARSCompact } from "@/lib/format";

const NOMBRES_MES = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function generateStaticParams() {
  const set = new Set<string>();
  for (const r of remuneracionesDetalle) set.add(r.periodo);
  for (const r of remuneracionesDetalleOcr) set.add(r.periodo);
  return Array.from(set).map((periodo) => ({ periodo }));
}

type Props = { params: { periodo: string } };

function buscarPeriodo(periodo: string) {
  const det = remuneracionesDetalle.find((x) => x.periodo === periodo);
  if (det) return { tipo: "texto" as const, det };
  const ocr = remuneracionesDetalleOcr.find((x) => x.periodo === periodo);
  if (ocr) return { tipo: "ocr" as const, det: ocr };
  return null;
}

export function generateMetadata({ params }: Props) {
  const found = buscarPeriodo(params.periodo);
  if (!found) return { title: "Período no encontrado" };
  return {
    title: `Remuneraciones — ${found.det.label} · Sunchales Transparente`,
    description: `Detalle de remuneraciones de funcionarios del período ${found.det.label}, extraído del PDF oficial publicado por sunchales.gob.ar${found.tipo === "ocr" ? " (vía OCR sobre PDF escaneado)" : ""}.`,
  };
}

export default function PeriodoDetalle({ params }: Props) {
  const found = buscarPeriodo(params.periodo);
  if (!found) notFound();
  const esOcr = found.tipo === "ocr";
  const r =
    found.tipo === "texto"
      ? { ...found.det, parseado: found.det.parseado, error: found.det.error }
      : { ...found.det, parseado: found.det.cantidadFilas > 0, error: found.det.error };

  const totalBruto = r.filas.reduce((acc, f) => acc + (f.bruto ?? 0), 0);
  const totalNeto = r.filas.reduce((acc, f) => acc + (f.neto ?? 0), 0);
  const totalDescuentos = r.filas.reduce((acc, f) => acc + (f.descuentos ?? 0), 0);

  return (
    <div className="container-page py-12">
      <Link
        href="/personal/remuneraciones"
        className="text-sm text-coral-dark hover:underline"
      >
        ← Volver al histórico
      </Link>

      <span className="eyebrow mt-4 block">Personal · Remuneraciones</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        {r.label}{" "}
        {esOcr && (
          <span className="ml-2 align-middle text-base font-bold uppercase tracking-wider text-orange-700">
            · vía OCR
          </span>
        )}
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Detalle extraído automáticamente del{" "}
        <a
          href={r.urlPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          PDF oficial
        </a>{" "}
        publicado por la Municipalidad. Los textos de cada fila quedan tal
        como aparecen en el archivo original (incluso errores tipográficos
        del PDF), porque "limpiarlos" sería interpretación y no transparencia.
        Cada celda vacía indica que ese campo no figura en el PDF.
      </p>

      {esOcr && (
        <div className="mt-6 rounded-2xl border-2 border-orange-400 bg-orange-50 p-5 text-sm text-orange-900">
          <strong className="block text-base text-orange-900">
            ⚠ Datos obtenidos por OCR — verificar contra el PDF original
          </strong>
          <p className="mt-2">
            El PDF de este período es un escaneo (no tiene texto digital).
            Para extraer los datos se aplicó OCR con Tesseract.js (modelo
            español). Esta tecnología puede confundir dígitos visualmente
            similares (8 ↔ 0, 1 ↔ 7, comas ↔ puntos), nombres mal
            reconocidos, o fragmentar filas. <strong>Antes de citar
            cualquier monto puntual, contrastar contra el PDF oficial</strong>.
            La cobertura agregada (cantidad de funcionarios, suma global)
            tiende a ser confiable; los valores individuales no.
          </p>
        </div>
      )}

      {!r.parseado ? (
        <div className="mt-8 rounded-2xl border-2 border-amber-400 bg-amber-50 p-6 text-sm text-amber-900">
          <strong className="block text-base text-amber-900">
            Este período no pudo ser parseado automáticamente
          </strong>
          <p className="mt-2">
            <strong>Motivo:</strong> {r.error ?? "desconocido"}.
          </p>
          <p className="mt-3">
            Los PDFs sin texto digital son escaneos / imágenes y requerirían
            OCR para extraer la tabla. La inexistencia de versiones en
            formato abierto (CSV/JSON) es brecha de la fuente y se declara
            en{" "}
            <Link className="underline" href="/brechas">
              /brechas
            </Link>
            . El archivo original sigue siendo accesible:
          </p>
          <p className="mt-3">
            <a
              href={r.urlPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
            >
              Abrir PDF oficial →
            </a>
          </p>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              value={String(r.cantidadFilas)}
              label="Funcionarios listados"
              hint="Filas extraídas del PDF."
            />
            <StatCard
              value={formatARSCompact(totalBruto)}
              label="Total bruto del mes"
              hint="Suma de la columna sueldo bruto."
            />
            <StatCard
              value={formatARSCompact(totalDescuentos)}
              label="Total descuentos"
              hint="Suma de la columna descuentos."
            />
            <StatCard
              value={formatARSCompact(totalNeto)}
              label="Total neto"
              hint="Suma de la columna sueldo neto."
            />
          </div>

          {/* Tabla de filas */}
          <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
            Detalle por funcionario
          </h2>
          <div className="-mx-4 sm:-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
            <table className="w-full sm:min-w-[820px] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Cargo / Apellido y Nombre (texto literal del PDF)</th>
                  <th className="px-4 py-3 text-right">Bruto</th>
                  <th className="px-4 py-3 text-right">Descuentos</th>
                  <th className="px-4 py-3 text-right">Neto</th>
                </tr>
              </thead>
              <tbody>
                {r.filas.map((f: { etiqueta: string; bruto: number | null; descuentos: number | null; neto: number | null }, i: number) => (
                  <tr key={i} className={esOcr ? "border-t border-orange-100" : "border-t border-slate-100"}>
                    <td className="px-4 py-3 text-xs text-slate-500 tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{f.etiqueta}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {f.bruto !== null ? (
                        formatARS(f.bruto)
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                      {f.descuentos !== null ? (
                        formatARS(f.descuentos)
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-navy">
                      {f.neto !== null ? (
                        formatARS(f.neto)
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={r.urlPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
            >
              Ver PDF original ↗
            </a>
            <a
              href={`/api/v1/remuneraciones/detalle?periodo=${r.periodo}`}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
            >
              JSON estructurado
            </a>
            <a
              href={`/api/v1/remuneraciones/detalle?periodo=${r.periodo}&format=csv`}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50"
            >
              CSV
            </a>
          </div>
        </>
      )}

      {/* Nota metodológica */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 sm:p-6">
        <strong className="block font-semibold text-navy">Nota metodológica</strong>
        <p className="mt-2">
          La extracción se realiza con{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5">pdfjs-dist</code>{" "}
          a partir del archivo oficial. El parser identifica filas con monto
          y reconstruye las columnas Bruto / Descuentos / Neto en el orden en
          que aparecen. No se aplica OCR: cualquier PDF escaneado queda
          declarado como brecha de calidad de la fuente, no del proyecto.
        </p>
        <p className="mt-2">
          Este detalle complementa pero no reemplaza al{" "}
          <a
            className="underline"
            href={r.urlPdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF oficial
          </a>
          : ante cualquier discrepancia, el archivo original es la fuente de
          verdad.
        </p>
      </section>
    </div>
  );
}
