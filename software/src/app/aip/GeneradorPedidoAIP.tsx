"use client";

import { useState, useMemo } from "react";
import type { Brecha } from "@/lib/data/brechas";
import { brechas } from "@/lib/data/brechas";

type Props = {
  brechaSeleccionada?: Brecha;
};

const ORGANISMOS = [
  "Departamento Ejecutivo Municipal",
  "Concejo Municipal",
  "Juzgado de Faltas",
  "Secretaría de Gestión",
  "Secretaría de Hacienda",
  "Otro (lo indico en el cuerpo)",
] as const;

export default function GeneradorPedidoAIP({ brechaSeleccionada }: Props) {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [domicilioReal, setDomicilioReal] = useState("");
  const [domicilioElectronico, setDomicilioElectronico] = useState("");
  const [organismo, setOrganismo] = useState<string>(ORGANISMOS[0]);
  const [objeto, setObjeto] = useState(
    brechaSeleccionada
      ? `${brechaSeleccionada.titulo}. ${brechaSeleccionada.descripcion}`
      : ""
  );
  const [formato, setFormato] = useState<"digital_csv_json" | "digital_pdf" | "fisico">(
    "digital_csv_json"
  );
  const [brechaIdSel, setBrechaIdSel] = useState<string>(
    brechaSeleccionada?.id ?? ""
  );

  const fechaHoy = useMemo(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  }, []);

  const formatoLabel: Record<typeof formato, string> = {
    digital_csv_json:
      "formato digital abierto (preferentemente CSV o JSON; en su defecto, planilla de cálculo)",
    digital_pdf: "formato digital (PDF aceptable si no existe formato abierto)",
    fisico: "soporte físico (impreso) si así lo dispone la autoridad",
  };

  function aplicarBrechaSeleccionada(id: string) {
    setBrechaIdSel(id);
    if (id === "") return;
    const b = brechas.find((x) => x.id === id);
    if (!b) return;
    setObjeto(`${b.titulo}. ${b.descripcion}`);
  }

  const texto = useMemo(() => {
    const nom = nombre.trim() || "[Apellido y Nombre]";
    const docu = dni.trim() || "[DNI]";
    const domR = domicilioReal.trim() || "[Domicilio real]";
    const domE = domicilioElectronico.trim() || "[Correo electrónico]";
    const obj = objeto.trim() || "[Describir con precisión la información solicitada]";

    return `Sunchales, ${fechaHoy}.

A: ${organismo}
Municipalidad de Sunchales — Provincia de Santa Fe

Ref.: PEDIDO DE ACCESO A LA INFORMACIÓN PÚBLICA — Ordenanza Municipal Nº 1872/2009.

De mi consideración:

${nom}, DNI ${docu}, con domicilio real en ${domR} y constituyendo domicilio electrónico en ${domE} a los efectos de las notificaciones, me dirijo al organismo arriba identificado en ejercicio del derecho de acceso a la información pública reconocido por la Ordenanza Municipal Nº 1872/2009, el Decreto Provincial 0692/2009 (supletorio), la Constitución Nacional (artículos 1°, 33° y 75 inc. 22) y la Convención Americana sobre Derechos Humanos (art. 13), a fin de SOLICITAR la siguiente información pública:

OBJETO DEL PEDIDO:
${obj}

FORMATO REQUERIDO:
Se solicita que la respuesta se entregue en ${formatoLabel[formato]}, conforme al principio de máxima divulgación y reutilización de la información pública.

FUNDAMENTO Y CONDICIONES DEL PEDIDO:
1. El presente pedido es gratuito (Art. 3° Ord. 1872/2009).
2. No requiere patrocinio letrado ni invocar motivos (Art. 6° Ord. 1872/2009).
3. La autoridad debe responder en el plazo de DIEZ (10) días hábiles, prorrogable por única vez por CINCO (5) días hábiles más mediante decisión fundada notificada antes del vencimiento (Art. 7° Ord. 1872/2009).
4. Si parte de la información estuviera alcanzada por alguna limitación del Art. 4°, se solicita la entrega parcial de lo no limitado (Art. 5° Ord. 1872/2009).
5. La denegatoria debe ser dispuesta por funcionario de jerarquía equivalente o superior a Secretario y citar la norma que la fundamenta (Art. 8° Ord. 1872/2009).

Sin otro particular, saluda atte.

_________________________________
${nom}
DNI ${docu}
Domicilio electrónico constituido: ${domE}

— — — — —
Plantilla generada por el Portal Sunchales Transparente.
Marco normativo verificado al 2026-05-09.
La presente plantilla NO constituye asesoramiento legal; el ciudadano puede modificarla libremente antes de presentarla.`;
  }, [
    fechaHoy,
    organismo,
    nombre,
    dni,
    domicilioReal,
    domicilioElectronico,
    objeto,
    formato,
    formatoLabel,
  ]);

  function descargar() {
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedido-AIP-Sunchales-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      // Pequeña confirmación visual mediante alert nativo evitando libs externas
      alert("Plantilla copiada al portapapeles.");
    } catch {
      alert(
        "No se pudo copiar automáticamente. Seleccioná el texto y copialo manualmente."
      );
    }
  }

  return (
    <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:grid-cols-2">
      {/* Formulario */}
      <div className="space-y-3">
        <Campo label="Apellido y nombre">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
            placeholder="Pérez, Juan"
            autoComplete="name"
          />
        </Campo>
        <Campo label="DNI">
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
            placeholder="00.000.000"
            inputMode="numeric"
          />
        </Campo>
        <Campo label="Domicilio real (calle y número)">
          <input
            type="text"
            value={domicilioReal}
            onChange={(e) => setDomicilioReal(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
            placeholder="Av. Belgrano 0000, Sunchales"
            autoComplete="street-address"
          />
        </Campo>
        <Campo label="Correo electrónico para notificaciones">
          <input
            type="email"
            value={domicilioElectronico}
            onChange={(e) => setDomicilioElectronico(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
            placeholder="vecino@correo.com"
            autoComplete="email"
          />
        </Campo>
        <Campo label="Organismo destinatario">
          <select
            value={organismo}
            onChange={(e) => setOrganismo(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          >
            {ORGANISMOS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="¿Tu pedido refiere a una brecha ya declarada? (opcional)">
          <select
            value={brechaIdSel}
            onChange={(e) => aplicarBrechaSeleccionada(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          >
            <option value="">— Pedido libre, no asociado a una brecha —</option>
            {brechas.map((b) => (
              <option key={b.id} value={b.id}>
                [{b.modulo}] {b.titulo}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Objeto del pedido (qué información estás solicitando)">
          <textarea
            value={objeto}
            onChange={(e) => setObjeto(e.target.value)}
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
            placeholder="Describí con precisión qué información estás solicitando, incluyendo período, dependencia y, si corresponde, el formato deseado."
          />
        </Campo>
        <Campo label="Formato preferido de respuesta">
          <select
            value={formato}
            onChange={(e) =>
              setFormato(e.target.value as typeof formato)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          >
            <option value="digital_csv_json">
              Digital — formato abierto (CSV/JSON preferido)
            </option>
            <option value="digital_pdf">Digital — PDF si no hay formato abierto</option>
            <option value="fisico">Soporte físico</option>
          </select>
        </Campo>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={descargar}
            className="rounded-md bg-coral px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Descargar .txt
          </button>
          <button
            type="button"
            onClick={copiar}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Copiar al portapapeles
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          Los datos cargados nunca se envían a un servidor: la plantilla se
          arma íntegramente en tu navegador.
        </p>
      </div>

      {/* Vista previa */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Vista previa
          </span>
          <span className="text-[10px] text-slate-400">se actualiza al tipear</span>
        </div>
        <pre className="max-h-[640px] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-[12.5px] leading-relaxed text-slate-800 whitespace-pre-wrap">
{texto}
        </pre>
      </div>
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}
