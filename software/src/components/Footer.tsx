export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-sm text-slate-500">
      <div className="mx-auto max-w-6xl px-6">
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
          versiones oficiales.
        </p>
      </div>
    </footer>
  );
}
