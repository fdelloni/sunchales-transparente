import Link from "next/link";
import BuscadorSeccion from "@/components/BuscadorSeccion";
import { brechas } from "@/lib/data/brechas";
import GeneradorPedidoAIP from "./GeneradorPedidoAIP";

export const metadata = {
  title: "Acceso a la Información Pública (AIP) · Sunchales Transparente",
  description:
    "Cómo presentar un pedido formal de acceso a la información pública en la Municipalidad de Sunchales bajo la Ordenanza N° 1872/2009. Gratuito, sin patrocinio letrado, sin necesidad de motivos.",
};

type SP = { searchParams?: { brecha?: string } };

export default function AIPPage({ searchParams }: SP) {
  const brechaId = searchParams?.brecha;
  const brechaSeleccionada = brechaId
    ? brechas.find((b) => b.id === brechaId)
    : undefined;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <BuscadorSeccion placeholder="Buscar sobre acceso a la información…" />
      </div>

      <span className="eyebrow">Acceso ciudadano · AIP</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Cómo pedir información pública al municipio
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Toda persona —vecina, vecino, organización civil, periodista, investigador—
        tiene derecho a pedir y recibir información pública de la Municipalidad de
        Sunchales, sus entes autárquicos y descentralizados, el Concejo Municipal,
        el Juzgado de Faltas y las prestatarias de servicios públicos con
        participación municipal. El derecho está reconocido por la Ordenanza
        Municipal N° 1872/2009.
      </p>

      {/* Pilares: gratis, sin patrocinio, sin motivos */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Pilar
          titulo="Es gratuito"
          descripcion="No se cobra arancel por hacer el pedido. Sólo costo de reproducción si pedís copia (Art. 3°)."
        />
        <Pilar
          titulo="Sin abogado"
          descripcion="No se exige patrocinio letrado ni firma de profesional (Art. 6°)."
        />
        <Pilar
          titulo="Sin justificar motivos"
          descripcion="No tenés que decir para qué la querés. La información pública es pública (Art. 6°)."
        />
      </div>

      {/* Plazos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Plazos de respuesta</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Ordenanza Sunchales 1872/2009 — Art. 7°
          </span>
          <h3 className="mt-1 font-serif text-lg font-bold text-navy">
            10 días hábiles + 5 de prórroga
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            La autoridad debe responder dentro de los 10 días hábiles. Puede
            prorrogar por única vez 5 días hábiles más mediante decisión
            fundada, notificada antes del vencimiento del plazo original.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-coral-dark">
            Decreto Pcial. Santa Fe 0692/2009 (supletorio)
          </span>
          <h3 className="mt-1 font-serif text-lg font-bold text-navy">
            15 días hábiles + 10 + 10
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Si el pedido se canaliza por el mecanismo provincial supletorio: 15
            días hábiles, prorrogables por 10, y 10 más en casos justificados.
            Aplica con principios de gratuidad, máxima divulgación, celeridad e
            informalidad.
          </p>
        </div>
      </div>

      {/* Generador */}
      <h2 id="generador" className="mt-12 font-serif text-2xl font-bold text-navy">
        Generador de plantilla de pedido AIP
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Completá los campos y descargá un texto listo para presentar por mesa de
        entradas o enviar por correo electrónico. La plantilla cita la Ord.
        1872/2009, fija el plazo legal y deja constancia de tu domicilio
        electrónico para la notificación.
      </p>
      <div className="mt-4">
        <GeneradorPedidoAIP brechaSeleccionada={brechaSeleccionada} />
      </div>

      {/* Vías de presentación */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Dónde y cómo presentarlo
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ViaPresentacion
          titulo="Mesa de entradas del Concejo Municipal"
          descripcion="Sala 'Mirta Rodríguez', sede del Concejo Municipal de Sunchales. La oficina de AIP del Concejo recibe pedidos por escrito."
          enlace={{
            label: "Página oficial AIP del Concejo",
            href: "https://concejosunchales.gob.ar/acceso-informacion-publica.aspx",
          }}
        />
        <ViaPresentacion
          titulo="Mesa de entradas del Departamento Ejecutivo"
          descripcion="Para pedidos dirigidos al Intendente, secretarías, áreas operativas, Juzgado de Faltas o entes descentralizados. Identificá expresamente al organismo destinatario."
          enlace={{
            label: "Sitio oficial del municipio",
            href: "https://sunchales.gob.ar",
          }}
        />
        <ViaPresentacion
          titulo="Mecanismo provincial supletorio"
          descripcion="Si la vía municipal no responde o el organismo entiende que no le compete, el Decreto Pcial. SF 0692/2009 funciona como mecanismo subsidiario."
          enlace={{
            label: "Decreto Pcial. SF 0692/2009",
            href: "https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811",
          }}
        />
        <ViaPresentacion
          titulo="Por correo electrónico"
          descripcion="La Ord. 1872/2009 admite presentación oral o por escrito. Por correo conviene pedir constancia de recepción y guardar el comprobante de envío para contar plazos."
        />
      </div>

      {/* Si no responden */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Qué pasa si no responden o niegan información
      </h2>
      <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
        <p>
          La denegatoria sólo puede ser dispuesta por funcionario de jerarquía
          equivalente o superior a Secretario y debe explicitar la norma en que se
          funda (Art. 8° Ord. 1872/2009). El silencio o la respuesta deficiente
          habilitan acciones administrativas (recurso jerárquico) y judiciales
          (acción de amparo por mora o por incumplimiento de derecho a la información).
        </p>
        <p className="mt-3">
          El incumplimiento por parte del agente público constituye{" "}
          <strong>falta grave</strong> con responsabilidad administrativa, civil,
          penal, disciplinaria y/o política (Art. 9° Ord. 1872/2009).
        </p>
        <p className="mt-3">
          Si presentaste un pedido y se cumplió el plazo sin respuesta, podés
          declararlo en este proyecto para que quede registrado en el dataset
          público de brechas, en la categoría "pedido vencido". Eso refuerza el
          control ciudadano y permite a otras personas sumar voz al mismo reclamo.
        </p>
      </div>

      {/* Límites legítimos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Límites legítimos al derecho
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        El derecho de acceso no es absoluto. La Ord. 1872/2009 (Art. 4°)
        establece límites taxativos: intimidad y datos personales (Ley 25.326),
        sumarios administrativos en período de secreto, secreto profesional,
        secreto bancario, estrategia procesal del Municipio en defensa de sus
        derechos, e información exceptuada por norma especial o de mayor
        jerarquía. Lo no limitado debe entregarse igual (Art. 5°: información
        parcial).
      </p>

      {/* Registro público de pedidos */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Pedidos AIP presentados por este proyecto
      </h2>
      <div className="mt-4 rounded-2xl border-2 border-dashed border-amber-400 bg-white p-6 text-sm text-slate-700">
        <strong className="block text-amber-900">
          Registro público en construcción
        </strong>
        <p className="mt-2">
          Sunchales Transparente declara como brecha propia la inexistencia, al
          día de hoy, de un registro público de pedidos AIP presentados por este
          proyecto al municipio. A medida que se canalicen pedidos formales, este
          registro mostrará: fecha de presentación, organismo destinatario,
          objeto del pedido, fecha de vencimiento del plazo legal, estado de
          respuesta, y respuesta recibida (cuando exista).
        </p>
        <p className="mt-2">
          La transparencia del proyecto sobre sus propios pedidos es condición
          para reclamar transparencia al Estado.
        </p>
      </div>

      {/* Marco legal */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">
        Marco legal aplicable
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600">
        Las normas que rigen el acceso a la información pública en Sunchales
        están centralizadas y verificadas en{" "}
        <Link href="/marco-normativo" className="text-coral-dark underline">
          /marco-normativo
        </Link>
        . En síntesis: Ord. Sunchales 1872/2009 (vinculante local), Decreto
        Pcial. SF 0692/2009 (supletorio), Constitución Nacional art. 1° y CADH
        art. 13 (publicidad de los actos de gobierno con jerarquía
        constitucional). No se invoca la Ley nacional 27.275 porque su
        jurisdicción es el sector público nacional, no rige para municipios.
      </p>

      {/* CTA volver a brechas */}
      <div className="mt-12 rounded-2xl bg-navy px-6 py-8 text-white">
        <h3 className="font-serif text-2xl font-bold">¿Para qué hacer un pedido AIP?</h3>
        <p className="mt-2 max-w-3xl text-slate-300">
          Cada brecha publicada en este sitio es información que el municipio
          está obligado a publicar y aún no expone. Sumar pedidos formales
          activa el deber de respuesta y, si vence el plazo, habilita acciones
          legales del ciudadano.
        </p>
        <Link
          href="/brechas"
          className="mt-4 inline-block rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
        >
          Ver las {brechas.length} brechas declaradas →
        </Link>
      </div>
    </div>
  );
}

function Pilar({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <div className="rounded-2xl border-l-4 border-coral bg-sand p-5">
      <h3 className="font-serif text-base font-bold text-navy">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-700">{descripcion}</p>
    </div>
  );
}

function ViaPresentacion({
  titulo,
  descripcion,
  enlace,
}: {
  titulo: string;
  descripcion: string;
  enlace?: { label: string; href: string };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-serif text-base font-bold text-navy">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-700">{descripcion}</p>
      {enlace && (
        <Link
          href={enlace.href}
          target={enlace.href.startsWith("http") ? "_blank" : undefined}
          rel={enlace.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-3 inline-block text-xs font-semibold text-coral-dark hover:underline"
        >
          {enlace.label} →
        </Link>
      )}
    </div>
  );
}
