import Link from "next/link";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  cadhArt13,
  decreto0692_2009,
  fundamentoCorto,
  ley25326,
  limitacionesAccesoOrd1872,
  marcoNormativoCompleto,
  ordenanza1872_2009,
  principioPublicidadActosGobierno,
  type Norma,
} from "@/lib/data/marcoNormativo";

export const metadata = {
  title: "Marco Normativo Aplicable — Sunchales Transparente",
  description:
    "Jerarquía normativa que rige el derecho de acceso a la información pública en Sunchales: Ordenanza 1872/2009, Decreto Provincial 0692/2009 y principio constitucional de publicidad de los actos de gobierno.",
};

const jerarquiaLabel: Record<Norma["jerarquia"], string> = {
  municipal: "Municipal — vinculante",
  provincial: "Provincial — supletorio",
  constitucional: "Constitucional — fundamento",
  convencional: "Convencional — bloque constitucional",
  limite: "Límite legítimo",
};

const jerarquiaColor: Record<Norma["jerarquia"], string> = {
  municipal: "bg-coral/15 text-coral-dark border-coral/30",
  provincial: "bg-teal/15 text-teal border-teal/30",
  constitucional: "bg-navy/10 text-navy border-navy/30",
  convencional: "bg-deep/10 text-deep border-deep/30",
  limite: "bg-amber-50 text-amber-700 border-amber-300",
};

export default function MarcoNormativoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Buscador arriba del título — entrada principal de la sección */}
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre acceso a la información…"
          ctaSinResultado={{ label: "Ver Ord. 1872/2009 (PDF oficial)", href: ordenanza1872_2009.url }}
        />
      </div>

      <span className="eyebrow">Fundamento legal</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Marco normativo aplicable
      </h1>
      <p className="mt-3 max-w-3xl text-slate-700">
        Cada dato y cada exigencia que esta plataforma comunica está respaldada por
        normas jurídicas concretas, todas verificadas en sus sitios oficiales. Esta
        página explica la jerarquía aplicable y los límites legítimos del derecho de
        acceso a la información pública en Sunchales.
      </p>

      {/* Cita corta destacada */}
      <div className="mt-6 rounded-2xl border-l-4 border-navy bg-navy/5 p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-navy">
          Fundamento general del proyecto
        </p>
        <p className="mt-2 text-base text-slate-800">{fundamentoCorto}</p>
      </div>

      {/* Principio constitucional destacado */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          1. El cimiento: la publicidad de los actos de gobierno
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Antes que cualquier ley, la transparencia es un mandato constitucional.
          La forma republicana de gobierno adoptada por la Argentina (
          <strong>Art. 1° de la Constitución Nacional</strong>) tiene como uno de
          sus pilares ineludibles la <em>publicidad de los actos de gobierno</em>:
          el pueblo soberano que delega el poder en sus representantes conserva el
          derecho de saber qué se hace en su nombre y con sus recursos. Este
          principio es operativo y exigible incluso cuando no exista una ley
          específica que lo reglamente.
        </p>
        <p className="mt-3 max-w-3xl text-slate-700">
          El propio Concejo Municipal de Sunchales lo reconoce expresamente como
          fundamento del derecho de acceso a la información pública en su
          Ordenanza Nº 1872/2009 (Art. 1°) y en su{" "}
          <a
            href={principioPublicidadActosGobierno.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-dark underline hover:text-coral"
          >
            comunicación oficial sobre el tema
          </a>
          .
        </p>
      </section>

      {/* Jerarquía normativa */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          2. Jerarquía normativa aplicable a Sunchales
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Las cinco fuentes que estructuran el derecho de acceso, ordenadas de la
          más específica (la que vincula directamente al municipio) a la más
          general (el principio constitucional que las funda a todas).
        </p>

        <div className="mt-6 space-y-5">
          {marcoNormativoCompleto.map((norma) => (
            <article
              key={norma.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest ${jerarquiaColor[norma.jerarquia]}`}
                >
                  {jerarquiaLabel[norma.jerarquia]}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
                  Verificada en fuente oficial · {norma.fetchedAt}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-navy">
                {norma.numero} — {norma.titulo}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Ámbito: {norma.ambito}
              </p>
              <p className="mt-3 text-sm text-slate-700">{norma.resumen}</p>

              {norma.articulosClave && norma.articulosClave.length > 0 && (
                <div className="mt-4 rounded-xl bg-sand p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-coral-dark">
                    Articulado clave
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {norma.articulosClave.map((a) => (
                      <li key={a.numero}>
                        <strong className="text-navy">{a.numero}</strong> — {a.descripcion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={norma.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-xs font-semibold text-coral-dark hover:text-coral"
              >
                Leer la norma en su fuente oficial →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Limitaciones */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          3. Bajo qué fundamentos puede el municipio negarte información
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          La Ordenanza 1872/2009 establece <strong>seis limitaciones taxativas</strong>{" "}
          (Art. 4°). Es decir: cualquier denegatoria que invoque un fundamento
          distinto a los seis siguientes es ilegítima. Si recibís una negativa,
          verificá que cite alguna de estas causales y que esté fundada por un
          funcionario de jerarquía equivalente o superior a Secretario (Art. 8°).
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {limitacionesAccesoOrd1872.map((lim) => (
            <div
              key={lim.letra}
              className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/40 p-5"
            >
              <p className="font-serif text-base font-bold text-amber-900">
                {lim.letra} {lim.descripcion}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <strong>Alcance real:</strong> {lim.alcance}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-coral bg-sand p-5">
          <p className="font-serif text-base font-bold text-coral-dark">
            Lo que NO es causal legítima de denegatoria
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700 list-disc pl-5">
            <li>
              &quot;No tenemos esa información sistematizada&quot; — la Ordenanza obliga a
              entregar lo que el municipio <em>tiene</em>, en el formato que esté.
            </li>
            <li>
              &quot;Es información sensible&quot; — sin invocar específicamente cuál de las
              seis causales aplica.
            </li>
            <li>
              &quot;Tiene que pedirlo por nota formal con sello&quot; — la Ordenanza permite
              el pedido oral y sin patrocinio (Art. 6°).
            </li>
            <li>
              &quot;Tiene que justificar para qué lo quiere&quot; — el Art. 6° prohíbe exigir
              expresión de motivos.
            </li>
            <li>
              Silencio administrativo más allá de los plazos del Art. 7° (10 días + 5
              de prórroga única fundada).
            </li>
          </ul>
        </div>
      </section>

      {/* Cómo ejercer */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy">
          4. Cómo ejercer tu derecho hoy
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          El procedimiento, según la Ordenanza 1872/2009 vigente:
        </p>
        <ol className="mt-4 max-w-3xl space-y-3 text-sm text-slate-700 list-decimal pl-6">
          <li>
            Presentás la solicitud por escrito (formulario disponible en la
            Municipalidad o en el Concejo) o incluso de forma oral. No necesitás
            patrocinio letrado ni explicar por qué la pedís.
          </li>
          <li>
            Te entregan una constancia del pedido. El trámite es gratuito.
          </li>
          <li>
            El órgano requerido tiene <strong>10 días hábiles</strong> para
            responder. Puede prorrogar por única vez 5 días hábiles más, mediante
            decisión fundada antes del vencimiento.
          </li>
          <li>
            Si te deniegan, debe ser por escrito, fundada, citando la causal
            específica del Art. 4°, y firmada por funcionario de jerarquía
            equivalente o superior a Secretario.
          </li>
          <li>
            Si no responden, responden fuera de plazo, o niegan sin fundamento
            válido, el agente público responsable comete <strong>falta grave</strong>{" "}
            con responsabilidad administrativa, civil, penal, disciplinaria y/o
            política (Art. 9°).
          </li>
        </ol>
      </section>

      {/* Honestidad sobre la verificación */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-serif text-xl font-bold text-navy">
          Sobre estas referencias
        </h2>
        <p className="mt-3 text-sm text-slate-700">
          Todas las normas citadas en esta página fueron <strong>verificadas en su
          fuente oficial</strong> el {ordenanza1872_2009.fetchedAt}. La Ordenanza
          1872/2009 fue descargada y leída íntegramente desde el sitio oficial del
          Concejo Municipal de Sunchales. El Decreto Provincial 0692/2009 fue
          consultado en el portal oficial del Gobierno de Santa Fe.
        </p>
        <p className="mt-3 text-sm text-slate-700">
          Si encontrás un error, una norma vigente que falte, o una norma que haya
          sido derogada o modificada, escribinos: el sitio se actualiza con cada
          aporte verificable. La transparencia empieza por la propia metodología.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <a
            href={ordenanza1872_2009.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-navy hover:bg-slate-50"
          >
            Ord. 1872/09 (PDF oficial)
          </a>
          <a
            href={decreto0692_2009.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-navy hover:bg-slate-50"
          >
            Decreto Pcial. 0692/09
          </a>
          <a
            href={cadhArt13.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-navy hover:bg-slate-50"
          >
            CADH Art. 13
          </a>
          <a
            href={ley25326.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-navy hover:bg-slate-50"
          >
            Ley 25.326 (Datos Personales)
          </a>
        </div>
      </section>

      <div className="mt-10">
        <Link
          href="/"
          className="text-sm font-semibold text-coral-dark hover:text-coral"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
