import StatCard from "@/components/StatCard";
import { labels } from "@/lib/data/contrataciones";
import SuscripcionForm from "./SuscripcionForm";

export default function SuscripcionesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <span className="eyebrow">Módulo · Alertas ciudadanas</span>
      <h1 className="mt-2 font-serif text-3xl font-bold text-navy md:text-4xl">
        Enterate apenas pasa algo en el municipio
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Dejanos tu correo y elegí sobre qué temas querés que te avisemos:
        nuevas contrataciones, sesiones del Concejo, cambios al presupuesto o
        avances en transparencia. Es <strong>gratis</strong> y te podés dar de
        baja en un click desde cualquier mensaje que recibas.
      </p>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard value="Email" label="Notificación por correo" />
        <StatCard value="WhatsApp" label="Notificación por mensajería" />
      </div>

      {/* Form */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Datos de contacto</h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">
        Completá al menos un canal (email o WhatsApp). Si querés recibir alertas
        por ambos, completá los dos.
      </p>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SuscripcionForm
          opcionesProcedimiento={Object.entries(labels.procedimiento).map(([v, l]) => ({ value: v, label: l }))}
          opcionesCategoria={Object.entries(labels.categoria).map(([v, l]) => ({ value: v, label: l }))}
        />
      </div>

      {/* Privacidad */}
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Tu privacidad</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li>• Solo guardamos tu email (o WhatsApp) y los temas que elegiste.</li>
        <li>• Para activar tu suscripción tenés que confirmar con un click en el email que te llega.</li>
        <li>• Cada mensaje que recibas tiene un link para darte de baja al toque.</li>
        <li>• <strong>Nunca compartimos tus datos con nadie.</strong></li>
      </ul>
    </div>
  );
}
