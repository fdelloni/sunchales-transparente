import Link from "next/link";
import { notFound } from "next/navigation";
import { contrataciones, labels } from "@/lib/data/contrataciones";
import { sellarCadena } from "@/lib/hashchain";
import AuditClient from "./AuditClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  return contrataciones.map((c) => ({ id: c.id }));
}

export default async function AuditarPage({ params }: { params: { id: string } }) {
  const c = contrataciones.find((x) => x.id === params.id);
  if (!c) notFound();

  // Sellamos la cadena en server side (esto es lo que el municipio publicaría).
  const cadena = await sellarCadena(c.expediente, c.ejercicio, c.cadenaSinSellar);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href={`/contrataciones/${c.id}`} className="text-xs text-coral-dark hover:underline">
        ← Volver al detalle
      </Link>
      <span className="eyebrow mt-4 block">Auditoría criptográfica</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy">
        Verificación de integridad — {c.numero}
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Esta página recalcula <strong>en tu propio navegador</strong> los hashes
        SHA-256 de cada evento del expediente y los compara contra los hashes
        publicados. Si alguien modificó retroactivamente cualquier dato del
        expediente, la cadena se rompe y vas a verlo. <em>No tenés que confiar en
        nosotros</em>: la verificación es matemática y reproducible.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-navy">Cómo verificar por tu cuenta</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>Descargá el JSON completo de la cadena con el botón de abajo.</li>
          <li>
            Abrí una consola Node, Python o cualquier lenguaje que haga SHA-256.
          </li>
          <li>
            Recalculá <code>SHA-256(canonical(evento))</code> y compará con el campo{" "}
            <code>hash</code> publicado.
          </li>
          <li>Verificá que <code>hashPrevio</code> de cada evento coincida con el <code>hash</code> del evento anterior.</li>
          <li>El primer evento referencia el hash génesis: <code>SHA-256("GENESIS::expediente::ejercicio")</code>.</li>
        </ol>
      </div>

      <AuditClient
        expediente={c.expediente}
        ejercicio={c.ejercicio}
        objeto={c.objeto}
        cadena={cadena}
        eventoLabels={labels.evento}
      />
    </div>
  );
}
