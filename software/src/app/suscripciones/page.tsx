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
        Suscribite con tu correo electrónico o WhatsApp y elegí qué tipos de
        alertas querés recibir: nuevas contrataciones, sesiones del Concejo,
        cambios al presupuesto, modificaciones del régimen de faltas o avances
        en transparencia. Cada alerta es <strong>gratuita</strong>, requiere{" "}
        <strong>opt-in con doble confirmación</strong> y es revocable en un click
        desde cualquier mensaje recibido.
      </p>
      <p className="mt-2 max-w-3xl text-xs text-slate-500">
        Hoy las alertas de <strong>Contrataciones</strong> ya están operativas. El
        resto de las categorías están "en desarrollo": tu suscripción captura la
        preferencia y se activará automáticamente cuando se conecte el disparador
        en Fase 2 — sin necesidad de que vuelvas a registrarte.
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
      <h2 className="mt-12 font-serif text-2xl font-bold text-navy">Cómo cuidamos tus datos</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li>• Almacenamos solo el contacto (email/WhatsApp) y tus filtros.</li>
        <li>
          • <strong>Opt-in con doble confirmación</strong>: al suscribirte recibís un
          enlace que tenés que clickear para activar la suscripción.
        </li>
        <li>• Cada alerta incluye un enlace para darte de baja en un click.</li>
        <li>
          • <strong>Datos cifrados en tránsito</strong> (HTTPS) y en reposo (Supabase RLS,
          ver migraciones SQL del proyecto).
        </li>
        <li>
          • <strong>No compartimos tus datos con terceros</strong>. Cumplimos Ley 25.326 de
          Protección de Datos Personales.
        </li>
      </ul>
    </div>
  );
}
