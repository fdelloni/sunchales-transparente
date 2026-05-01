import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-coral to-coral-dark font-black text-zinc-900">
            S
          </span>
          <span>Sunchales Transparente</span>
        </Link>
        <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
          <Link href="/presupuesto" className="hover:text-white">Presupuesto</Link>
          <Link href="/recaudacion" className="hover:text-white">Recaudación</Link>
          <Link href="/personal" className="hover:text-white">Personal</Link>
          <Link href="/contrataciones" className="hover:text-white">Contrataciones</Link>
          <Link href="/datos-abiertos" className="hover:text-white">Datos Abiertos</Link>
          <Link href="/suscripciones" className="hover:text-white">Suscribirme</Link>
          <Link href="/api/v1/openapi" className="hover:text-white">API</Link>
        </nav>
      </div>
    </header>
  );
}
