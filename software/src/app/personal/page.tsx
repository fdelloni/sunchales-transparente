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
      <span className="eyebrow">Módulo · Personal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Personal del Municipio
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Esta sección publica la estructura del Estado municipal de Sunchales con
        tres miradas complementarias: el <strong>organigrama de planta política</strong>{" "}
        (cargos, nombres y fecha de asunción), el <strong>gasto en salarios</strong>{" "}
        que esa estructura representa, y la <strong>nómina agregada de planta
        permanente y de planta no permanente / contratados</strong> (cantidad,
        antigüedad y sector, sin exponer nombres). Lo que está oficialmente
        publicado se marca como <em>verificado</em>; lo que aún no está disponible
        queda <em>manifiestamente declarado como brecha de transparencia</em>, con
        su fundamento normativo.
      </p>

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          placeholder="Buscar sobre personal del municipio…"
          sugerencias={[
            "¿Quién es el intendente actual?",
            "¿Cuántos cargos políticos hay?",
            "¿Qué información NO se publica?",
            "¿Cuál es la masa salarial estimada?",
          ]}
          ctaSinResultado={{ label: "Pedir nómina por Ord. 1872/2009", href: "/marco-normativo" }}
        />
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatNumber(total)}
          label="Cargos políticos"
          hint="Intendente + secretarías + subsecretarías."
        />
        <StatCard
          value={formatARSCompact(masaSalarial)}
          label="Salarios mensuales (planta política)"
          hint="Suma referencial; aún no publicada oficialmente."
        />
        <StatCard
          value={formatARSCompact(masaSalarialAnual)}
          label="Costo anual estimado (12 + SAC)"
          hint="13 sueldos por aguinaldo legal."
        />
        <StatCard
          value={`${fechasVerificadas}/${total}`}
          label="Fechas de asunción verificadas"
          verified={fechasVerificadas === total}
          hint="Decretos de designación pendientes de publicar."
        />
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

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
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
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
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
      {/* 4. Planta permanente — brecha declarada                       */}
      {/* ============================================================ */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Planta permanente
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          La planta permanente es el cuerpo estable de agentes municipales con
          estabilidad en el cargo conforme la Ley provincial 9.286 (Estatuto y
          Escalafón del Personal de Municipalidades y Comunas). Lo que el ciudadano
          tiene derecho a saber sin que se exponga el nombre de cada agente es:
          cuántos son, hace cuánto trabajan y en qué sector.
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-dashed border-amber-400 bg-gradient-to-br from-amber-50/60 to-white">
          <div className="px-6 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
              Información no publicada por la Municipalidad
            </span>
            <h3 className="mt-1 font-serif text-lg font-bold text-amber-900">
              Cantidad de agentes, antigüedad por agente y sector de
              prestación
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-amber-900/90">
              Al día de hoy <strong>no existe un dataset público</strong> con la
              cantidad total de agentes de planta permanente, su antigüedad
              individual (sin nombre) y el sector / dependencia donde prestan
              funciones. Esa información se rinde sólo de forma agregada en el
              presupuesto y no permite control ciudadano efectivo.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Cantidad
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Antigüedad (años por agente)
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Sector / dependencia
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-md border-l-2 border-amber-500 bg-amber-50 p-3 text-[13px] text-amber-900">
              <strong>Obliga a publicar: </strong>
              Ordenanza Sunchales N° 1872/2009 (derecho de acceso a información
              pública municipal, fundado en el principio de publicidad de los
              actos de gobierno) · Constitución de Santa Fe (publicidad de la
              hacienda pública) · Constitución Nacional Art. 1° (forma
              republicana) · estándares interamericanos de transparencia activa.
              La publicación agregada por sector y antigüedad{" "}
              <strong>no expone datos personales</strong> protegidos por la Ley
              25.326: la remuneración y el cargo en el ejercicio de funciones
              públicas son información pública.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="/suscripciones"
                className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
              >
                Sumarme al pedido de acceso
              </a>
              <a
                href="/marco-normativo"
                className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
              >
                Ver marco normativo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Planta no permanente / contratados — brecha declarada     */}
      {/* ============================================================ */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Planta no permanente y personal contratado
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Comprende al personal con vinculación temporaria, contratos por tiempo
          determinado, locaciones de servicios y locaciones de obra. Es la franja
          más sensible del gasto en personal porque carece de la estabilidad de
          la planta permanente y depende de decisiones del Departamento Ejecutivo;
          por eso requiere control especial.
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-dashed border-amber-400 bg-gradient-to-br from-amber-50/60 to-white">
          <div className="px-6 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
              Información no publicada por la Municipalidad
            </span>
            <h3 className="mt-1 font-serif text-lg font-bold text-amber-900">
              Cantidad, antigüedad / vigencia, modalidad y sector
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-amber-900/90">
              No se publica cuántos contratados hay, hace cuánto están
              vinculados, bajo qué modalidad (planta no permanente, locación de
              servicios, locación de obra, becarios) ni en qué sector trabajan.
              Tampoco la fecha de inicio y fin de cada contrato y sus
              renovaciones.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Cantidad
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Antigüedad / vigencia
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Modalidad de vinculación
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Sector / dependencia
                </div>
                <div className="mt-1 font-serif text-2xl font-bold text-slate-300">
                  ?
                </div>
                <div className="text-[11px] text-slate-500">
                  No publicado oficialmente.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-md border-l-2 border-amber-500 bg-amber-50 p-3 text-[13px] text-amber-900">
              <strong>Obliga a publicar: </strong>
              Ordenanza Sunchales N° 1872/2009 (toda información en poder del
              municipio, incluida la relativa a vinculaciones contractuales) ·
              principio republicano de publicidad de los actos de gobierno (Art.
              1° CN) · estándares interamericanos sobre transparencia de la
              fuerza laboral pública. La publicación agregada por modalidad,
              antigüedad y sector <strong>no expone datos personales</strong>.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="/suscripciones"
                className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
              >
                Sumarme al pedido de acceso
              </a>
              <a
                href="/marco-normativo"
                className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
              >
                Ver marco normativo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Brechas formales del módulo                                */}
      {/* ============================================================ */}
      <BrechasTransparencia
        modulo="personal"
        titulo="Brechas de transparencia del módulo Personal"
        intro="A continuación se enumera la información sobre personal que la Municipalidad de Sunchales está jurídicamente obligada a publicar y que al día de hoy no es accesible al ciudadano."
      />
    </div>
  );
}
