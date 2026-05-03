import Link from "next/link";
import BrechasTransparencia from "@/components/BrechasTransparencia";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import {
  juzgadoInfo,
  marcoJuzgado,
  loYaPublicado,
  tensionesDeDiseno,
  planConstruccion
} from "@/lib/data/juzgado";

export const metadata = {
  title: "Juzgado de Faltas · Sunchales Transparente",
  description:
    "Juzgado Municipal de Faltas de Sunchales — actividad, recaudación y destino de fondos en formato público y auditable. Brechas de transparencia detectadas y declaradas."
};

export default function JuzgadoFaltasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="eyebrow">Módulo · Juzgado Municipal de Faltas</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Juzgado Municipal de Faltas
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Toda la actividad sancionatoria del municipio en un solo lugar: cantidad y
        tipos de faltas, recaudación, destino de los fondos y calidad procesal.
        Datos agregados que protegen al ciudadano y exponen al Estado, no al revés.
      </p>

      {/* Buscador de la sección */}
      <div className="mt-8">
        <BuscadorSeccion
          placeholder="Buscar sobre el Juzgado de Faltas…"
          sugerencias={[
            "¿Quién es el juez de faltas?",
            "¿Qué información NO se publica?",
            "¿A dónde van los fondos de las multas?",
            "¿Qué es el Código de Faltas Provincial?",
          ]}
          ctaSinResultado={{ label: "Pedir estadísticas por Ord. 1872/2009", href: "/marco-normativo" }}
        />
      </div>

      {/* Info institucional */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <InfoCell
          label="Sede"
          value={juzgadoInfo.sede}
          hint={`CP ${juzgadoInfo.cp} — Sunchales, Santa Fe`}
        />
        <InfoCell
          label="Atención al público"
          value="Lunes a viernes"
          hint="7:00 a 13:00 hs"
        />
        <InfoCell
          label="Contacto"
          value={juzgadoInfo.telefono}
          hint={`también ${juzgadoInfo.telefonoAlt}`}
        />
        <InfoCell
          label="Modernización 2026"
          value="Tótems de pago"
          hint="Pago autónomo de multas"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Datos institucionales verificados al 02/05/2026 contra el sitio oficial del
        Municipio (
        <Link
          href={juzgadoInfo.sitio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral-dark underline"
        >
          sunchales.gob.ar/juzgado-faltas
        </Link>
        ).
      </p>

      {/* Encuadre legal: dos columnas */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Qué juzga este organismo y bajo qué reglas
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        El Juzgado de Faltas no es un poder autónomo: es un órgano del propio
        municipio con función jurisdiccional acotada al juzgamiento de faltas.
        Aplica dos cuerpos normativos en paralelo, distinción clave para entender
        el destino de los fondos.
      </p>
      <div className="-mx-6 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-0 shadow-sm sm:mx-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Marco normativo</th>
              <th className="px-4 py-3">Tipos de faltas</th>
              <th className="px-4 py-3">Régimen económico</th>
            </tr>
          </thead>
          <tbody>
            {marcoJuzgado.map((m, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  {m.origen === "provincial" ? (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      {m.ambito}
                    </span>
                  ) : (
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                      {m.ambito}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-700">{m.norma}</td>
                <td className="px-4 py-3 text-slate-700">{m.tipos}</td>
                <td className="px-4 py-3 text-slate-700">{m.regimen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lo que sí está publicado */}
      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h3 className="font-serif text-xl font-bold text-emerald-900">
          ✓ Lo que sí está publicado actualmente por el Municipio
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-emerald-900">
          Para ser justos: estas piezas sí se exponen al ciudadano. Las cito para
          no proyectar una imagen distorsionada de la situación.
        </p>
        <ul className="mt-3 space-y-1 pl-5 text-sm text-emerald-900">
          {loYaPublicado.map((item, i) => (
            <li key={i} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* BRECHAS DE TRANSPARENCIA */}
      <BrechasTransparencia
        modulo="juzgado-faltas"
        titulo="Información de publicación obligatoria que aún no se expone"
        intro="Lo que sigue es información que el Estado municipal está jurídicamente obligado a publicar en virtud del principio de máxima divulgación, y que al 2 de mayo de 2026 no se encuentra accesible al ciudadano."
      />

      {/* Qué propone el módulo (siete componentes) */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Qué propone el módulo (siete componentes)
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Cada uno responde a una de las brechas detectadas. Se puede activar
        incrementalmente, en la medida que el Juzgado y el municipio acerquen
        datos y firmen un acuerdo de colaboración con el proyecto.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Submodulo letra="A" titulo="Marco normativo del Juzgado" desc="Ordenanza orgánica, régimen de faltas municipal, escala de sanciones y convenios provinciales. Integrado con el módulo Digesto." />
        <Submodulo letra="B" titulo="Indicadores de actividad" desc="Series temporales de actas labradas, resueltas y pendientes por tipo de falta. Mapas territoriales sin reidentificación." />
        <Submodulo letra="C" titulo="Indicadores económicos" desc="Recaudación mensual y anual por categoría, tasa de cobrabilidad, montos pendientes. Comparación con el rubro de ingresos del presupuesto." />
        <Submodulo letra="D" titulo="Destino de los fondos" desc="Trazabilidad presupuestaria. Si hay afectación específica, mostrar el ciclo completo. Si va a Rentas Generales, declararlo." />
        <Submodulo letra="E" titulo="Calidad procesal" desc="Tiempo medio de tramitación, tasa de recursos, tasa de revocaciones. Para evaluar funcionamiento institucional, no productividad." />
        <Submodulo letra="F" titulo="Acceso individual" desc="El interesado autenticado consulta sus actas, descarga certificados y agenda audiencias. Integrado con sunchales.gob.ar." />
      </div>
      <div className="mt-4 rounded-2xl border border-teal/40 bg-gradient-to-br from-cyan-50 to-white p-5">
        <h3 className="font-serif text-lg font-bold text-teal">
          <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-md bg-teal align-middle font-serif text-sm font-bold text-white">
            G
          </span>
          Datos abiertos del Juzgado
        </h3>
        <p className="mt-2 text-sm text-slate-700">
          Dataset agregado y anonimizado en CSV/JSON bajo CC-BY-4.0, con endpoint
          REST y diccionario de datos. Reutilizable por periodismo, academia y
          organizaciones civiles, sin exposición de ciudadanos individuales.
        </p>
      </div>

      {/* Tensiones de diseño */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Tres tensiones que se resuelven por diseño
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {tensionesDeDiseno.map((t) => (
          <div
            key={t.n}
            className="rounded-2xl border-l-4 border-coral bg-sand p-5"
          >
            <div className="font-serif text-lg font-bold text-coral-dark">
              {t.n}
            </div>
            <h3 className="mt-1 font-serif text-base font-bold text-navy">
              {t.titulo}
            </h3>
            <p className="mt-1 text-sm text-slate-700">{t.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Plan de construcción */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Cómo se construye, paso a paso
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        No alcanza con declarar las brechas: hay que cerrarlas. El plan es
        incremental y co-construido con el Juzgado.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {planConstruccion.map((p) => (
          <div
            key={p.n}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="grid h-7 w-7 place-items-center rounded-full bg-navy text-sm font-bold text-white">
              {p.n}
            </div>
            <h3 className="mt-2 font-serif text-base font-bold text-navy">
              {p.titulo}
            </h3>
            <p className="mt-1 text-xs text-slate-600">{p.descripcion}</p>
          </div>
        ))}
      </div>

      {/* CTA final */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-navy px-8 py-10 text-white">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-coral">
          Acción ciudadana
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Sumarme al pedido formal de acceso a la información
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-300">
          El sistema permite presentar pedidos formales de acceso a la información
          pública agrupados por brecha. Cuanto más vecinos firmen, más fuerte el
          pedido. Cada paso queda registrado con fecha y hash, y el municipio
          dispone de un plazo legal para responder.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/suscripciones"
            className="rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Sumarme al pedido
          </Link>
          <Link
            href="/marco-normativo"
            className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Ver marco normativo
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-xs text-slate-400">
          El derecho de acceso a la información pública es operativo y exigible: no
          requiere reglamentación adicional. Cualquier persona, sin acreditar
          interés, puede solicitar información en poder del Estado y recibir
          respuesta en formatos abiertos en plazos breves. La negativa o la falta
          de respuesta constituyen incumplimiento.
        </p>
      </section>
    </div>
  );
}

function InfoCell({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-serif text-lg font-bold text-navy">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

function Submodulo({
  letra,
  titulo,
  desc
}: {
  letra: string;
  titulo: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-ice/60 font-serif font-black text-deep">
        {letra}
      </div>
      <h3 className="mt-2 font-serif text-lg font-bold text-navy">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
