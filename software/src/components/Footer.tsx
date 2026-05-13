export default function Footer() {
  return (
    <footer className="bg-white text-sm text-slate-500">
      {/* Franja con los dos colores de la Bandera de Sunchales (Ord. 1762/2007).
          ORO arriba (cielo iluminado de la colonización definitiva) ·
          VERDE abajo (llanura típica de los paisajes). */}
      <div
        aria-hidden="true"
        className="h-2 w-full"
        title="Bandera oficial de Sunchales — Ord. 1762/2007"
      >
        <div className="h-1 w-full bg-oro" />
        <div className="h-1 w-full bg-verde" />
      </div>
      <div className="border-t border-slate-200 py-10">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              <strong className="text-slate-700">Sunchales Transparente</strong> · Plataforma cívica · v0.1
            </p>
            <p>
              Construido con principios de máxima divulgación y privacidad por diseño.
            </p>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Cada dato muestra su origen verificable. Los datos no oficiales se etiquetan
            explícitamente como ejemplificadores hasta que el municipio publique las
            versiones oficiales. Los colores oro y verde de esta plataforma están
            extraídos de la Bandera Oficial de Sunchales (Ord. 1762/2007).
          </p>
        </div>
      </div>
    </footer>
  );
}
