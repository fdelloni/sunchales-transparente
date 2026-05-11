import Link from "next/link";
import StatCard from "@/components/StatCard";
import SourceTag from "@/components/SourceTag";
import BrechasTransparencia from "@/components/BrechasTransparencia";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  empleados,
  aggregadosPorArea,
  construirOrganigrama,
  type NodoOrganigrama
} from "@/lib/data/personal";
import {
  registrosPlanta,
  registrosTransitorios,
  registrosContratados,
  porSeccion,
  porModalidad,
  fuenteNomina,
} from "@/lib/data/nomina";
import {
  evolucionNomina,
  fuenteEvolucion,
} from "@/lib/data/nomina-evolucion";
import {
  evolucionLicencias,
  etiquetaTipo,
  indicadorDeQue,
  fuenteLicencias,
  tieneDatosPublicados,
  totalConLicencia,
  type ConteoLicencia,
  type TipoLicencia,
} from "@/lib/data/licencias";
import EvolucionNominaChart from "./EvolucionNominaChart";
import { formatARS, formatARSCompact, formatNumber } from "@/lib/format";

/* ------------------------------------------------------------------ */
/* Helpers de formato                                                  */
/* ------------------------------------------------------------------ */

function formatearFecha(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function colorJerarquia(j: 1 | 2 | 3 | 4): string {
  switch (j) {
    case 1:
      return "border-navy bg-navy text-white";
    case 2:
      return "border-teal bg-teal/10 text-navy";
    case 3:
      return "border-slate-300 bg-white text-navy";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

/* ------------------------------------------------------------------ */
/* Tarjeta de un nodo del organigrama                                  */
/* ------------------------------------------------------------------ */

function NodoCard({ nodo }: { nodo: NodoOrganigrama }) {
  // Tarjeta más compacta para que el árbol entre sin scroll horizontal.
  return (
    <div
      className={`w-[230px] rounded-lg border-2 px-3 py-2 shadow-sm ${colorJerarquia(
        nodo.jerarquia
      )}`}
    >
      <div className="text-[9px] font-bold uppercase leading-tight tracking-wider opacity-80">
        {nodo.cargo}
      </div>
      <div className="mt-0.5 font-serif text-[13px] font-bold leading-tight">
        {nodo.apellidoNombre}
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-1.5 text-[10px] leading-tight opacity-90">
        <span>
          Asumió:{" "}
          <strong>
            {nodo.fechaInicio ? formatearFecha(nodo.fechaInicio) : "pendiente"}
          </strong>
        </span>
        {nodo.fuenteFecha === "verificado_publico" ? (
          <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100">
            verif.
          </span>
        ) : (
          <span className="rounded-full bg-amber-500/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900">
            pdte
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Organigrama recursivo                                               */
/* ------------------------------------------------------------------ */
/*
 * Estrategia para que entre en el ancho de la página:
 *  - Si el nodo NO tiene hijos → tarjeta sola.
 *  - Si todos sus hijos son hojas (Secretaría → Subsecretarías) →
 *    los hijos se apilan VERTICALMENTE a la derecha del padre,
 *    con un conector lateral. Así la página crece para abajo.
 *  - Caso contrario (Intendente → Secretarías) → layout horizontal
 *    clásico con conectores en T.
 */

function RamaOrganigrama({ nodo }: { nodo: NodoOrganigrama }) {
  if (nodo.hijos.length === 0) {
    return <NodoCard nodo={nodo} />;
  }

  const todosHijosSonHojas = nodo.hijos.every((h) => h.hijos.length === 0);

  // Padre con sólo hijos-hoja: lista vertical lateral.
  if (todosHijosSonHojas) {
    return (
      <div className="flex flex-col items-start">
        <NodoCard nodo={nodo} />
        <div className="ml-6 mt-3 flex flex-col gap-2.5 border-l-2 border-slate-300 pl-5">
          {nodo.hijos.map((h) => (
            <div key={h.id} className="relative">
              <span
                className="absolute -left-5 top-1/2 h-0.5 w-5 bg-slate-300"
                aria-hidden
              />
              <NodoCard nodo={h} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Niveles superiores: layout horizontal con conectores en T.
  return (
    <div className="flex flex-col items-center">
      <NodoCard nodo={nodo} />
      <div className="h-6 w-0.5 bg-slate-300" aria-hidden />
      <div className="flex flex-wrap items-start justify-center gap-8 border-t-2 border-slate-300 pt-6">
        {nodo.hijos.map((h) => (
          <RamaOrganigrama key={h.id} nodo={h} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página Personal                                                     */
/* ------------------------------------------------------------------ */

export default function PersonalPage() {
  const total = empleados.length;
  const masaSalarial = empleados.reduce(
    (acc, e) => acc + (e.remuneracionBruta ?? 0),
    0
  );
  const masaSalarialAnual = masaSalarial * 13; // 12 meses + SAC
  const verificadosCargo = empleados.filter(
    (e) => e.fuenteCargo === "verificado_publico"
  ).length;
  const verificadosRem = empleados.filter(
    (e) => e.fuenteRemuneracion === "verificado_oficial"
  ).length;
  const fechasVerificadas = empleados.filter(
    (e) => e.fuenteFecha === "verificado_publico"
  ).length;
  const agg = aggregadosPorArea();
  const organigrama = construirOrganigrama();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Buscador arriba del título — entrada principal de la sección */}
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre personal del municipio…"
          ctaSinResultado={{ label: "Pedir nómina por Ord. 1872/2009", href: "/marco-normativo" }}
        />
      </div>

      <span className="eyebrow">Módulo · Personal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Personal del Municipio
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Esta sección publica la estructura del Estado municipal de Sunchales con
        cuatro miradas complementarias: el <strong>organigrama de planta política</strong>{" "}
        (cargos, nombres y fecha de asunción), el <strong>gasto en salarios</strong>{" "}
        que esa estructura representa, el <strong>personal de planta</strong> y
        el <strong>personal transitorio y contratado</strong> agregados por
        sector (sin exponer nombres individuales). Los conteos provienen del{" "}
        <a
          href={fuenteNomina.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          PDF oficial publicado por la Municipalidad
        </a>{" "}
        ({fuenteNomina.periodo}). Lo que sigue sin estar disponible —antigüedad
        por agente, fechas exactas de designación, importes reales de cada
        vinculación— queda <em>manifiestamente declarado como brecha</em>, con
        su fundamento normativo.
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatNumber(total)}
          label="Cargos políticos"
          hint="Intendente + secretarías + subsecretarías + direcciones."
        />
        <StatCard
          value={formatARSCompact(masaSalarial)}
          label="Salarios verificados Marzo 2026"
          verified
          hint="Suma de brutos extraídos del PDF oficial del Departamento Ejecutivo."
        />
        <StatCard
          value={formatARSCompact(masaSalarialAnual)}
          label="Costo anual proyectado (12 + SAC)"
          hint="13 sueldos por aguinaldo legal, sobre la base verificada de marzo."
        />
        <StatCard
          value={`${verificadosRem}/${total}`}
          label="Remuneraciones verificadas oficiales"
          verified={verificadosRem === total}
          hint={
            verificadosRem === total
              ? "Cargados desde el PDF oficial del municipio."
              : `${total - verificadosRem} cargos sin coincidencia en el último PDF.`
          }
        />
      </div>

      {/* CTA — Histórico de remuneraciones (PDFs oficiales sincronizados).
           Usa el verde institucional de Sunchales (paleta de la bandera) para
           reforzar identidad local en datos verificados. */}
      <div className="mt-8 rounded-2xl border-2 border-verde bg-gradient-to-br from-verde-soft to-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-verde-dark">
              Datos verificados · sincronizados con sunchales.gob.ar
            </span>
            <h3 className="mt-1 font-serif text-xl font-bold text-navy">
              Histórico mensual de remuneraciones de funcionarios
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">
              140 PDFs oficiales publicados por el municipio entre 2014 y
              2026, navegables mes a mes con link directo al archivo
              original. La brecha de formato (PDF cerrado, no CSV) sigue
              declarada.
            </p>
          </div>
          <Link
            href="/personal/remuneraciones"
            className="rounded-lg bg-verde-dark px-5 py-3 text-sm font-semibold text-white hover:bg-verde-dark/90"
          >
            Ver histórico →
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. Organigrama                                                */}
      {/* ============================================================ */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy">
              Organigrama de planta política
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              Estructura jerárquica del Departamento Ejecutivo Municipal. Cada
              tarjeta indica el cargo, el apellido y nombre del funcionario y la
              fecha en que asumió el cargo (cuando fue oficialmente publicada).
            </p>
          </div>
          <SourceTag id="organigramaMunicipal" />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
          <div className="flex justify-center overflow-x-auto">
            {organigrama.map((raiz) => (
              <RamaOrganigrama key={raiz.id} nodo={raiz} />
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded border-2 border-navy bg-navy" />
            Intendente
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded border-2 border-teal bg-teal/10" />
            Secretaría
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded border-2 border-slate-300 bg-white" />
            Subsecretaría
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Distribución de salarios por área                          */}
      {/* ============================================================ */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Total destinado a salarios — planta política
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Suma de las remuneraciones brutas mensuales del organigrama anterior,
          desagregadas por área. Las cifras son <strong>estimaciones referenciales</strong>{" "}
          basadas en escalas habituales del régimen municipal santafesino y se
          reemplazarán por importes oficiales una vez que el municipio publique
          la nómina salarial estructurada (ver brecha #per-remuneraciones-reales).
        </p>

        <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Área</th>
                <th className="px-4 py-3 text-right">Cargos</th>
                <th className="px-4 py-3 text-right">
                  Masa salarial mensual
                </th>
                <th className="px-4 py-3 text-right">% del total</th>
              </tr>
            </thead>
            <tbody>
              {agg.map((a) => (
                <tr key={a.area} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-navy">{a.area}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {a.cantidad}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatARS(a.masaSalarial)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                    {((a.masaSalarial / masaSalarial) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-navy/30 bg-slate-50">
                <td className="px-4 py-3 font-bold text-navy">
                  Total mensual estimado
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">
                  {total}
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">
                  {formatARS(masaSalarial)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">100,0%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-4 py-3 font-bold text-navy">
                  Total anual estimado (12 + SAC)
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-400">
                  —
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">
                  {formatARS(masaSalarialAnual)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-400">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Detalle de cargos con fecha de asunción                    */}
      {/* ============================================================ */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Detalle de cargos
          </h2>
          <a
            href="/api/v1/personal?format=csv"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Descargar CSV
          </a>
        </div>
        <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Apellido y nombre</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Área</th>
                <th className="px-4 py-3">Asumió</th>
                <th className="px-4 py-3 text-right">
                  Rem. bruta mensual
                </th>
                <th className="px-4 py-3">Estado rem.</th>
                <th className="px-4 py-3">Fuente</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((e) => (
                <tr key={e.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-navy">
                    {e.apellidoNombre}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{e.cargo}</td>
                  <td className="px-4 py-3 text-slate-600">{e.area}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="tabular-nums text-slate-700">
                        {formatearFecha(e.fechaInicio)}
                      </span>
                      <span
                        className={
                          e.fuenteFecha === "verificado_publico"
                            ? "text-[10px] font-semibold uppercase tracking-wider text-emerald-700"
                            : "text-[10px] font-semibold uppercase tracking-wider text-amber-700"
                        }
                      >
                        {e.fuenteFecha === "verificado_publico"
                          ? "verificada"
                          : "pendiente decreto"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {e.remuneracionBruta != null
                      ? formatARS(e.remuneracionBruta)
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {e.fuenteRemuneracion === "verificado_oficial" ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        verificada
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        referencial
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <SourceTag id="organigramaMunicipal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Sólo la fecha de asunción del Intendente está verificada (10/12/2023,
          inicio del período constitucional 2023-2027). El resto de las fechas
          de designación dependen de decretos del Departamento Ejecutivo cuya
          publicación sistemática y consultable aún es una brecha (ver
          #per-decretos-designacion). Verificados de cargos: {verificadosCargo}/{total}.
          Verificadas de remuneraciones: {verificadosRem}/{total}.
        </p>
      </section>

      {/* ============================================================ */}
      {/* 4. Personal de planta — datos oficiales del PDF municipal     */}
      {/* ============================================================ */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy">
              Personal de planta
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              Cuerpo estable de agentes municipales con estabilidad en el cargo
              conforme la Ley provincial 9.286 (Estatuto y Escalafón del
              Personal de Municipalidades y Comunas). Los datos que siguen{" "}
              <strong>provienen del PDF oficial publicado por el municipio</strong>{" "}
              ({fuenteNomina.periodo}) — listamos cantidad y sector{" "}
              <strong>sin exponer nombres individuales</strong>.
            </p>
          </div>
          <a
            href={fuenteNomina.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-verde-dark px-4 py-2 text-xs font-semibold text-white hover:bg-verde-dark/90"
          >
            Ver PDF oficial ↗
          </a>
        </div>

        {/* KPIs reales */}
        {(() => {
          const totalPlanta = registrosPlanta.length;
          const permanentes = registrosPlanta.filter(
            (r) => r.modalidad === "Planta Permanente"
          ).length;
          const retiroEspecial = registrosPlanta.filter(
            (r) => r.modalidad === "RETIRO ESPECIAL"
          ).length;
          const seccionesPlanta = porSeccion(
            registrosPlanta.filter((r) => r.modalidad === "Planta Permanente")
          );

          return (
            <>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Personal de planta total
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-emerald-900">
                    {formatNumber(totalPlanta)}
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    Verificado · PDF municipal {fuenteNomina.periodo}.
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Planta permanente activa
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-navy">
                    {formatNumber(permanentes)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Estables conforme Ley provincial 9.286.
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Retiro especial
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-navy">
                    {formatNumber(retiroEspecial)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Ex-agentes con haber especial vigente.
                  </div>
                </div>
              </div>

              {/* Tabla por sección */}
              <div className="-mx-6 mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Sector / Secretaría</th>
                      <th className="px-4 py-3 text-right">
                        Agentes de planta permanente
                      </th>
                      <th className="px-4 py-3 text-right">% del total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seccionesPlanta.map((s) => (
                      <tr
                        key={s.seccion}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 font-medium text-navy">
                          {s.seccion}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {s.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                          {((s.cantidad / permanentes) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-navy/30 bg-slate-50">
                      <td className="px-4 py-3 font-bold text-navy">
                        Total planta permanente
                      </td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">
                        {formatNumber(permanentes)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        100,0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Fuente:{" "}
                <a
                  href={fuenteNomina.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Nómina del Personal Municipal — {fuenteNomina.periodo}
                </a>{" "}
                (PDF oficial publicado por sunchales.gob.ar, verificado{" "}
                {fuenteNomina.fechaConsulta}). La{" "}
                <strong>antigüedad por agente</strong> no figura en el PDF
                publicado y permanece como brecha de transparencia (ver{" "}
                <a href="#brechas" className="underline">
                  brechas
                </a>
                ).
              </p>
            </>
          );
        })()}
      </section>

      {/* ============================================================ */}
      {/* 5. Personal transitorio y contratación de servicios — datos  */}
      {/*    oficiales del PDF municipal                                */}
      {/* ============================================================ */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Personal transitorio y contratación de servicios
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          El PDF oficial distingue dos categorías además de la planta:{" "}
          <strong>Personal Transitorio</strong> (vinculación temporaria) y{" "}
          <strong>Contratación de Servicios</strong> (locaciones con modalidades
          de jornada completa, parcial, media jornada o por demanda). Es la
          franja más sensible del gasto en personal porque carece de la
          estabilidad de la planta y depende de decisiones del Departamento
          Ejecutivo; por eso requiere control reforzado.
        </p>

        {(() => {
          const totT = registrosTransitorios.length;
          const totC = registrosContratados.length;
          const totalNoPerm = totT + totC;
          const seccionesT = porSeccion(registrosTransitorios);
          const seccionesC = porSeccion(registrosContratados);
          const modalidadesC = porModalidad(registrosContratados);

          return (
            <>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Total no permanente
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-emerald-900">
                    {formatNumber(totalNoPerm)}
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    Transitorios + Contratación de servicios.
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Personal Transitorio
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-navy">
                    {formatNumber(totT)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Vinculación temporaria sin estabilidad.
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Contratación de Servicios
                  </div>
                  <div className="mt-1 font-serif text-3xl font-bold text-navy">
                    {formatNumber(totC)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Locaciones de servicios y de obra.
                  </div>
                </div>
              </div>

              {/* Tabla — Transitorios por sector */}
              <h3 className="mt-8 font-serif text-lg font-bold text-navy">
                Personal Transitorio por sector
              </h3>
              <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Sector</th>
                      <th className="px-4 py-3 text-right">
                        Agentes transitorios
                      </th>
                      <th className="px-4 py-3 text-right">% del subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seccionesT.map((s) => (
                      <tr
                        key={s.seccion}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 font-medium text-navy">
                          {s.seccion}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {s.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                          {((s.cantidad / totT) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-navy/30 bg-slate-50">
                      <td className="px-4 py-3 font-bold text-navy">
                        Total transitorios
                      </td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">
                        {totT}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        100,0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tabla — Contratados por modalidad */}
              <h3 className="mt-8 font-serif text-lg font-bold text-navy">
                Contratación de Servicios por modalidad
              </h3>
              <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Modalidad</th>
                      <th className="px-4 py-3 text-right">Contratos</th>
                      <th className="px-4 py-3 text-right">% del subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalidadesC.map((m) => (
                      <tr
                        key={m.modalidad}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 font-medium text-navy">
                          {m.modalidad}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {m.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                          {((m.cantidad / totC) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-navy/30 bg-slate-50">
                      <td className="px-4 py-3 font-bold text-navy">
                        Total contratados
                      </td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">
                        {totC}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        100,0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tabla — Contratados por sector */}
              <h3 className="mt-8 font-serif text-lg font-bold text-navy">
                Contratación de Servicios por sector
              </h3>
              <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Sector</th>
                      <th className="px-4 py-3 text-right">Contratos</th>
                      <th className="px-4 py-3 text-right">% del subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seccionesC.map((s) => (
                      <tr
                        key={s.seccion}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 font-medium text-navy">
                          {s.seccion}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {s.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500 tabular-nums">
                          {((s.cantidad / totC) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-navy/30 bg-slate-50">
                      <td className="px-4 py-3 font-bold text-navy">
                        Total contratados
                      </td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">
                        {totC}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        100,0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Fuente:{" "}
                <a
                  href={fuenteNomina.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Nómina del Personal Municipal — {fuenteNomina.periodo}
                </a>{" "}
                (PDF oficial publicado por sunchales.gob.ar, verificado{" "}
                {fuenteNomina.fechaConsulta}). La{" "}
                <strong>antigüedad o vigencia de cada contrato</strong>{" "}
                (fecha de inicio, vencimiento y renovaciones) no figura en el
                PDF publicado y permanece como brecha (ver{" "}
                <a href="#brechas" className="underline">
                  brechas
                </a>
                ).
              </p>

              {/* Total general */}
              <div className="mt-8 rounded-2xl border-2 border-navy bg-navy p-5 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      Total general de personas vinculadas al municipio
                    </div>
                    <div className="mt-1 font-serif text-4xl font-bold">
                      {formatNumber(
                        registrosPlanta.length +
                          registrosTransitorios.length +
                          registrosContratados.length
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/80">
                    <div>
                      Planta: <strong>{registrosPlanta.length}</strong>
                    </div>
                    <div>
                      Transitorios:{" "}
                      <strong>{registrosTransitorios.length}</strong>
                    </div>
                    <div>
                      Contratados:{" "}
                      <strong>{registrosContratados.length}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </section>

      {/* ============================================================ */}
      {/* 6. Evolución histórica de la nómina                           */}
      {/* ============================================================ */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy">
              Evolución histórica de la nómina
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              La página oficial del municipio enlaza <strong>5 PDFs históricos</strong>{" "}
              de nómina entre agosto 2024 y abril 2026. Con esos archivos —
              parseados uno a uno y verificados por cruce de nombres — armamos
              la serie temporal real. Sin invenciones ni interpolaciones.
            </p>
          </div>
          <a
            href={fuenteEvolucion.paginaIndice}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-verde-dark px-4 py-2 text-xs font-semibold text-white hover:bg-verde-dark/90"
          >
            Ver fuente oficial ↗
          </a>
        </div>

        {/* Nota metodológica destacada */}
        <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-[13px] text-amber-900">
          <strong className="font-semibold">Cambio metodológico documentado:</strong>{" "}
          los PDFs anteriores a septiembre 2025 publicaban{" "}
          <strong>únicamente</strong> el listado de personal no permanente
          (equivalente a la categoría &ldquo;Transitorios&rdquo; del formato
          actual). Desde 2025-09 la Municipalidad amplió su transparencia
          activa y empezó a publicar la nómina <strong>completa</strong>{" "}
          (Planta Permanente + Retiro Especial + Transitorios + Contratación
          de Servicios). El cruce de nombres entre los listados antiguos y la
          sub-lista &ldquo;Transitorios&rdquo; del PDF actual confirma la
          equivalencia, por lo que la serie de Transitorios{" "}
          <strong>es comparable</strong> a lo largo de los 5 períodos. Las
          demás series sólo existen desde 2025-09.
        </div>

        {/* Gráfico */}
        <div className="mt-5">
          <EvolucionNominaChart />
        </div>

        {/* Tabla con valores y variación intermensual */}
        <h3 className="mt-8 font-serif text-lg font-bold text-navy">
          Cifras período por período
        </h3>
        <div className="-mx-6 mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Período</th>
                <th className="px-4 py-3 text-right">Planta Permanente</th>
                <th className="px-4 py-3 text-right">Retiro Especial</th>
                <th className="px-4 py-3 text-right">Transitorios</th>
                <th className="px-4 py-3 text-right">Contratados</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">PDF</th>
              </tr>
            </thead>
            <tbody>
              {evolucionNomina.map((p, i) => {
                const prev = i > 0 ? evolucionNomina[i - 1] : null;
                const renderCell = (
                  val: number | null,
                  prevVal: number | null | undefined
                ) => {
                  if (val == null) {
                    return (
                      <span className="text-[11px] italic text-slate-400">
                        no publicado
                      </span>
                    );
                  }
                  if (prevVal == null) {
                    return (
                      <span className="tabular-nums">{formatNumber(val)}</span>
                    );
                  }
                  const diff = val - prevVal;
                  const sign = diff > 0 ? "+" : "";
                  const color =
                    diff > 0
                      ? "text-emerald-700"
                      : diff < 0
                      ? "text-rose-700"
                      : "text-slate-500";
                  return (
                    <span className="tabular-nums">
                      {formatNumber(val)}{" "}
                      <span className={`text-[11px] font-semibold ${color}`}>
                        ({sign}
                        {diff})
                      </span>
                    </span>
                  );
                };
                return (
                  <tr key={p.periodo} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-navy">
                      {p.label}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderCell(p.plantaPermanente, prev?.plantaPermanente)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderCell(p.retiroEspecial, prev?.retiroEspecial)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderCell(p.transitorios, prev?.transitorios)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderCell(p.contratados, prev?.contratados)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {renderCell(p.total, prev?.total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={p.urlPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-teal-700 underline"
                      >
                        ver
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Las variaciones entre paréntesis se calculan respecto del período
          anterior <em>publicado</em> (no respecto del mes calendario
          anterior). El salto que se observa para Planta Permanente,
          Contratados, Retiro Especial y Total entre &ldquo;no publicado&rdquo;
          y un valor concreto corresponde al cambio metodológico descripto
          arriba, no a una contratación masiva real.
        </p>
      </section>

      {/* ============================================================ */}
      {/* 7. Licencias del personal — pendiente de publicación         */}
      {/* ============================================================ */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Agentes con licencia
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Cuántos empleados municipales están con licencia y de qué tipo. Este
          dato sirve para entender la salud organizacional del municipio, las
          condiciones de trabajo y el costo real del Estado (porque cuando un
          agente está con licencia su sueldo se sigue pagando pero las tareas
          no se cumplen). <strong>Nunca se publican nombres</strong>; sólo
          cantidades.
        </p>

        {/* Estado: no publicado */}
        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-dashed border-amber-400 bg-gradient-to-br from-amber-50/60 to-white">
          <div className="px-6 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
              Hoy no se publica
            </span>
            <h3 className="mt-1 font-serif text-lg font-bold text-amber-900">
              Cantidad de agentes con licencia, por tipo y por mes
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-amber-900/90">
              La Municipalidad de Sunchales{" "}
              <strong>no publica este informe</strong>. Esta sección muestra
              cómo se vería la estadística cuando se reciba la información —
              por publicación voluntaria del municipio o por pedido formal
              presentado por la ciudadanía bajo la{" "}
              <a href="/marco-normativo" className="underline">
                Ordenanza Sunchales 1872/2009
              </a>{" "}
              de acceso a la información pública.
            </p>

            {/* Tabla con las categorías. El "indicador de qué" va debajo del
                nombre, no en una columna aparte — queda más limpio y se lee
                mejor en celular. */}
            <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-amber-200 bg-white px-0 sm:mx-0">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-amber-50/60 text-left text-xs uppercase tracking-wider text-amber-800">
                  <tr>
                    <th className="px-4 py-3">Tipo de licencia · indicador de qué</th>
                    {evolucionLicencias.map((p) => (
                      <th key={p.periodo} className="px-4 py-3 text-right">
                        {p.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(etiquetaTipo) as TipoLicencia[]).map((tipo) => {
                    const esSaludMental = tipo === "salud_mental";
                    return (
                      <tr
                        key={tipo}
                        className="border-t border-amber-100 align-top"
                      >
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={
                                esSaludMental
                                  ? "font-semibold text-navy"
                                  : "font-medium text-navy"
                              }
                            >
                              {etiquetaTipo[tipo]}
                            </span>
                            {esSaludMental && (
                              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                                regla N≥5
                              </span>
                            )}
                          </div>
                          <p className="mt-1 max-w-md text-[12px] leading-snug text-slate-500">
                            {indicadorDeQue[tipo]}
                          </p>
                        </td>
                        {evolucionLicencias.map((p) => {
                          const c = p.conteos.find(
                            (x) => x.tipo === tipo
                          ) as ConteoLicencia | undefined;
                          return (
                            <td
                              key={p.periodo}
                              className="px-4 py-3 text-right"
                            >
                              {c?.cantidad == null ? (
                                <span className="text-[12px] italic text-slate-400">
                                  pendiente
                                </span>
                              ) : c.enmascarado ? (
                                <span
                                  className="tabular-nums text-slate-600"
                                  title="Menos de 5 casos: se enmascara para que no se pueda identificar a la persona."
                                >
                                  &lt;5
                                </span>
                              ) : (
                                <span className="tabular-nums">
                                  {formatNumber(c.cantidad)}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-amber-300 bg-amber-50/40">
                    <td className="px-4 py-3 font-bold text-navy">
                      Total con licencia
                    </td>
                    {evolucionLicencias.map((p) => {
                      const t = totalConLicencia(p);
                      return (
                        <td
                          key={p.periodo}
                          className="px-4 py-3 text-right font-bold"
                        >
                          {t == null ? (
                            <span className="text-[12px] italic text-slate-400">
                              pendiente
                            </span>
                          ) : (
                            <span className="tabular-nums">
                              {formatNumber(t)}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-t border-amber-100 bg-amber-50/40">
                    <td className="px-4 py-3">
                      <span className="text-[13px] italic text-slate-700">
                        % del plantel con licencia
                      </span>
                      <p className="mt-1 max-w-md text-[12px] italic text-slate-500">
                        Total con licencia ÷ plantel activo del mes.
                      </p>
                    </td>
                    {evolucionLicencias.map((p) => {
                      const t = totalConLicencia(p);
                      const pa = p.plantelActivo;
                      const tasa =
                        t == null || pa == null ? null : (t / pa) * 100;
                      return (
                        <td
                          key={p.periodo}
                          className="px-4 py-3 text-right text-slate-700"
                        >
                          {tasa == null ? (
                            <span className="text-[12px] italic text-slate-400">
                              pendiente
                            </span>
                          ) : (
                            <span className="tabular-nums">
                              {tasa.toFixed(1)}%
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-t border-amber-100 text-[12px] text-slate-500">
                    <td className="px-4 py-3">
                      <span className="italic">Plantel activo del mes</span>
                      <p className="mt-1 max-w-md text-[11px] italic text-slate-500">
                        Verificado contra el PDF oficial del mes.
                      </p>
                    </td>
                    {evolucionLicencias.map((p) => (
                      <td
                        key={p.periodo}
                        className="px-4 py-3 text-right tabular-nums italic"
                      >
                        {p.plantelActivo != null
                          ? formatNumber(p.plantelActivo)
                          : "—"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notas en lenguaje llano */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border-l-2 border-amber-500 bg-amber-50 p-3 text-[13px] text-amber-900">
                <strong>¿Esto se puede publicar sin violar la privacidad?</strong>{" "}
                Sí. Las leyes argentinas permiten expresamente publicar
                estadísticas de salud y de personal cuando son
                <strong> agregadas y sin nombres</strong> (Ley 25.326 art. 11).
                Saber cuántas personas están con licencia es información de
                gestión pública, no datos personales.
              </div>
              <div className="rounded-md border-l-2 border-emerald-500 bg-emerald-50 p-3 text-[13px] text-emerald-900">
                <strong>¿Qué es la &ldquo;regla N≥5&rdquo;?</strong> En grupos
                chicos, aunque no digamos el nombre alguien podría deducirlo.
                Por eso, cuando hay menos de 5 personas en una categoría
                sensible (por ejemplo salud mental), mostramos
                &ldquo;&lt;5&rdquo; en lugar del número exacto. Es la regla
                estándar que usa el INDEC y las agencias de estadística del
                mundo.
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/suscripciones"
                className="inline-flex min-h-[36px] items-center rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
              >
                Sumarme al pedido para que se publique
              </a>
              <a
                href="/marco-normativo"
                className="inline-flex min-h-[36px] items-center rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
              >
                Ver marco legal
              </a>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Plantel activo verificado contra los PDFs oficiales de la
              Municipalidad (septiembre 2025 y abril 2026, parseados por este
              proyecto).{" "}
              {tieneDatosPublicados()
                ? "Algunos valores de licencias ya están cargados."
                : "Las cantidades de licencias se cargarán cuando el municipio publique el informe."}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Brechas formales del módulo                                */}
      {/* ============================================================ */}
      <div id="brechas">
        <BrechasTransparencia
          modulo="personal"
          titulo="Brechas de transparencia del módulo Personal"
          intro="La municipalidad publica una nómina mensual con nombre, sector y modalidad de cada agente — gran avance respecto del estándar promedio de la provincia. Sin embargo, persisten brechas: la antigüedad por agente, las fechas exactas de designación, los importes reales de cada vinculación y la estadística agregada de licencias siguen sin ser accesibles en formato estructurado."
        />
      </div>
    </div>
  );
}
