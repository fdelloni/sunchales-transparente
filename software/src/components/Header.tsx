"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/estadisticas", label: "Estadísticas" },
  { href: "/presupuesto", label: "Presupuesto" },
  { href: "/recaudacion", label: "Recaudación" },
  { href: "/personal", label: "Personal" },
  { href: "/contrataciones", label: "Contrataciones" },
  { href: "/digesto", label: "Digesto" },
  { href: "/concejo", label: "Concejo" },
  { href: "/juzgado-faltas", label: "Juzgado" },
  { href: "/datos-abiertos", label: "Datos Abiertos" },
  { href: "/suscripciones", label: "Suscribirme" },
  { href: "/api/v1/openapi", label: "API" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-coral to-coral-dark font-black text-zinc-900">
            S
          </span>
          <span className="text-sm sm:text-base">Sunchales Transparente</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden gap-5 text-sm text-slate-300 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Botón hamburguesa móvil/tablet */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white hover:bg-white/10 lg:hidden"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Drawer móvil/tablet */}
      {open && (
        <nav className="border-t border-white/5 bg-navy lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-md px-3 py-3 text-[15px] text-slate-200 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
