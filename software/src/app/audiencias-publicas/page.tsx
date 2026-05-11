import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuscadorSeccion from "@/components/BuscadorSeccion";

export const metadata = {
  title: "Audiencias públicas · Sunchales Transparente",
  description:
    "Las dos únicas audiencias públicas documentadas en el sitio oficial de la Municipalidad de Sunchales (2019 y 2022). Hueco de publicación 2020-2026 declarado como brecha.",
};

type Audiencia = {
  id: string;
  fecha: string; // ISO YYYY-MM-DD
  titulo: string;
  motivo: string;
  origen: "iniciativa_municipal" | "orden_judicial";
  organismoOrdenante?: string;
  lugar?: string;
  presidente?: string;
  alterna?: string;
  coordinador?: string;
  fuenteUrl: string;
  fuenteVerbatim: string;
};

const FUENTE =
  "https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/audiencias-publicas/";

const audiencias: Audiencia[] = [
  {
    id: "aud-2022-caglieris",
    fecha: "2022-10-25",
    titulo: 'Audiencia pública en el caso "Caglieris, Cintia y otros c/ Municipalidad de Sunchales"',
    motivo:
      "Conflicto judicial por el basural a cielo abierto ubicado a 2,5 km al este de la intersección de calle San Juan y Ruta Nacional N° 34. La audiencia fue ordenada por la Cámara de Apelación en lo Civil, Comercial y Laboral de Rafaela, Sala II, en el marco del proceso colectivo iniciado por vecinos contra la Municipalidad.",
    origen: "orden_judicial",
    organismoOrdenante:
      "Cámara de Apelación en lo Civil, Comercial y Laboral de Rafaela — Sala II",
    fuenteUrl: FUENTE,
    fuenteVerbatim:
      "Audiencia 25/10/2022 — caso 'Caglieris, Cintia y otros c/ Municipalidad' — basural a 2,5 km al este de calle San Juan y Ruta Nacional Nº 34 — ordenada por Cámara de Apelación Civil/Comercial/Laboral, Sala II Rafaela.",
  },
  {
    id: "aud-2019-complejo-ambiental",
    fecha: "2019-09-05",
    titulo: "Audiencia pública sobre el proyecto del Complejo Ambiental de Sunchales",
    motivo:
      "Convocatoria para que vecinos y organizaciones expresaran su opinión sobre el proyecto del Complejo Ambiental Sunchales, en el marco del proceso de evaluación ambiental.",
    origen: "iniciativa_municipal",
    lugar: "Casa de la Historia y la Cultura — Rotania y Pasteur, Sunchales",
    presidente: "Sec. de Obras Leopoldo Bauducco",
    alterna: "Ing. Fabrina Girard",
    coordinador: "Arq. José Citroni (Ministerio de Gobierno SF)",
    fuenteUrl: FUENTE,
    fuenteVerbatim:
      "Audiencia 05/09/2019 — Proyecto Complejo Ambiental Sunchales — Casa de la Historia y la Cultura (Rotania y Pasteur) — Presidente: Sec. de Obras Leopoldo Bauducco; alterna Ing. Fabrina Girard; coordinador: Arq. José Citroni (Min. Gobierno SF).",
  },
];

const ANIO_HOY = new Date().getFullYear();

export default function AudienciasPublicasPage() {
  const total = audiencias.length;
  // Años con audiencia
  const anios = Array.from(new Set(audiencias.map((a) => Number(a.fecha.slice(0, 4)))));
  // Años sin audiencia desde la primera documentada
  const min = Math.min(...anios);
  const sinAudiencia: number[] = [];
  for (let y = min; y <= ANIO_HOY; y++) {
    if (!anios.includes(y)) sinAudiencia.push(y);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <BuscadorSeccion
          placeholder="Buscar sobre audiencias públicas…"
          ctaSinResultado={{ label: "Pedido AIP por audiencias", href: "/aip" }}
        />
      </div>

      <span className="eyebrow">Participación ciudadana</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Audiencias públicas
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Las audiencias públicas son el mecanismo formal por el cual la ciudadanía
        puede expresar su opinión sobre proyectos o actos del Estado municipal
        antes de que se decidan. La Municipalidad de Sunchales tiene una sección
        dedicada en su sitio oficial; al día de hoy{" "}
        <strong>sólo hay dos audiencias documentadas</strong>: una del año 2022
        (ordenada por la justicia) y una del año 2019 (sobre el Complejo
        Ambiental). No hay registro de audiencias en 2020, 2021, 2023, 2024,
        2025 ni 2026.
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          value={String(total)}
          label="Audiencias documentadas"
          hint="Verbatim del sitio oficial."
        />
        <StatCard
          value={String(anios.length)}
          label="Años con audiencia"
          hint={`(${anios.sort().join(", ")})`}
        />
        <StatCard
          value={String(sinAudiencia.length)}
          label="Años sin audiencias publicadas"
          hint={`Hueco: ${sinAudiencia.join(", ")}.`}
        />
        <StatCard
          value="1 / 2"
          label="Convocadas por iniciativa municipal"
          hint="La otra fue ordenada judicialmente."
        />
      </div>

      {/* Brecha */}
      <div className="mt-6 rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 text-sm text-amber-900">
        <strong className="block text-amber-900">
          Brecha visible — hueco de {sinAudiencia.length} años
        </strong>
        <p className="mt-2">
          La sección oficial de Audiencias Públicas funciona hoy como archivo
          histórico. La obligación de convocar a audiencia para decisiones de
          impacto colectivo (planificación urbana, ambiente, tarifas, servicios
          públicos, expropiaciones, contrataciones de gran porte) es estructural
          al principio republicano. Hacer visible la inactividad de la sección
          permite al ciudadano reclamar formalmente la convocatoria mediante un{" "}
          <Link className="underline" href="/aip">
            pedido de Acceso a la Información
          </Link>
          .
        </p>
        <p className="mt-2 text-xs text-amber-900/80">
          Fuente normativa: Ord. Sunchales 1872/2009 · Decreto Pcial. SF
          0692/2009 · CN art. 1° (forma republicana → publicidad y participación
          en decisiones colectivas).
        </p>
      </div>

      {/* Tarjetas de las dos audiencias */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Detalle de las audiencias documentadas
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {audiencias
          .sort((a, b) => b.fecha.localeCompare(a.fecha))
          .map((a) => (
            <article
              key={a.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
                  {new Date(a.fecha).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={
                    a.origen === "orden_judicial"
                      ? "rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700"
                      : "rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
                  }
                  title={
                    a.origen === "orden_judicial"
                      ? "Ordenada por la justicia, no por el Departamento Ejecutivo"
                      : "Convocada por el propio municipio"
                  }
                >
                  {a.origen === "orden_judicial"
                    ? "Orden judicial"
                    : "Iniciativa municipal"}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-base font-bold text-navy">
                {a.titulo}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{a.motivo}</p>

              <dl className="mt-4 space-y-1 text-xs text-slate-600">
                {a.organismoOrdenante && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">
                      Organismo ordenante:
                    </dt>{" "}
                    <dd className="inline">{a.organismoOrdenante}</dd>
                  </div>
                )}
                {a.lugar && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">
                      Lugar:
                    </dt>{" "}
                    <dd className="inline">{a.lugar}</dd>
                  </div>
                )}
                {a.presidente && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">
                      Presidente:
                    </dt>{" "}
                    <dd className="inline">{a.presidente}</dd>
                  </div>
                )}
                {a.alterna && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">
                      Alterna:
                    </dt>{" "}
                    <dd className="inline">{a.alterna}</dd>
                  </div>
                )}
                {a.coordinador && (
                  <div>
                    <dt className="inline font-semibold text-slate-700">
                      Coordinador:
                    </dt>{" "}
                    <dd className="inline">{a.coordinador}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-4 rounded-md border-l-2 border-slate-300 bg-slate-50 p-2.5 text-[11.5px] text-slate-600">
                <strong className="text-slate-700">Cita verbatim:</strong>{" "}
                {a.fuenteVerbatim}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={a.fuenteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-navy hover:bg-slate-50"
                >
                  Ver en sitio oficial ↗
                </a>
              </div>
            </article>
          ))}
      </div>

      {/* Cómo convocar / cómo reclamar */}
      <h2 className="section-heading mt-12 font-serif text-2xl font-bold text-navy">
        Cómo reclamar la convocatoria de una audiencia
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Cualquier vecino o vecina puede pedir formalmente al municipio que
        convoque a audiencia pública para una decisión específica que afecte a
        la comunidad. Se hace a través de un pedido de Acceso a la Información
        que también puede contener una solicitud de convocatoria.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Paso
          n="01"
          t="Identificar el acto"
          d="Decisión de planificación urbana, ambiente, tarifas, servicio público, contratación de gran porte u otra que afecte a la comunidad."
        />
        <Paso
          n="02"
          t="Generar el pedido AIP"
          d="Usar la plantilla del proyecto en /aip indicando el organismo destinatario y el objeto del pedido (incluir 'solicito convocatoria a audiencia pública')."
        />
        <Paso
          n="03"
          t="Presentar y guardar comprobante"
          d="Mesa de entradas del Concejo o del Ejecutivo según corresponda. El plazo de respuesta es de 10 días hábiles + 5 de prórroga (Ord. 1872/2009 Art. 7°)."
        />
      </div>

      <div className="mt-8 rounded-2xl bg-navy px-6 py-8 text-white">
        <h3 className="font-serif text-2xl font-bold">
          Generá un pedido AIP por audiencia pública
        </h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          La plantilla pre-arma el texto formal con el fundamento normativo y la
          referencia a la sección oficial inactiva.
        </p>
        <Link
          href="/aip"
          className="mt-4 inline-block rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Ir al generador de plantilla AIP →
        </Link>
      </div>
    </div>
  );
}

function Paso({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border-l-4 border-coral bg-sand p-5">
      <div className="font-serif text-lg font-bold text-coral-dark">{n}</div>
      <h3 className="mt-1 font-serif text-base font-bold text-navy">{t}</h3>
      <p className="mt-1 text-sm text-slate-700">{d}</p>
    </div>
  );
}
