"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Header con navegación agrupada.
 *
 * Estructura: 5 grupos + Inicio + CTA "Recibir alertas".
 * Las URLs NO cambian — sólo cambia cómo aparecen en el menú.
 *
 * Desktop: dropdowns que se abren al click; se cierran al click fuera o ESC.
 * Mobile: drawer con accordion por grupo (cada grupo se expande al tocar).
 */

type Subitem = { href: string; label: string; hint?: string };
type Grupo = {
  id: string;
  label: string;
  items: Subitem[];
};

const grupos: Grupo[] = [
  {
    id: "cuentas",
    label: "Cuentas públicas",
    items: [
      { href: "/presupuesto", label: "Presupuesto", hint: "En qué se gasta" },
      { href: "/recaudacion", label: "Recaudación", hint: "De dónde viene la plata" },
      { href: "/estadisticas", label: "Panel general", hint: "Indicadores clave" },
    ],
  },
  {
    id: "estado",
    label: "Estado municipal",
    items: [
      { href: "/personal", label: "Personal y salarios", hint: "Organigrama y nómina" },
      { href: "/concejo", label: "Concejo Municipal", hint: "Concejales, comisiones, contacto" },
      { href: "/juzgado-faltas", label: "Juzgado de Faltas", hint: "Sanciones y recaudación" },
    ],
  },
  {
    id: "actos",
    label: "Actos de gobierno",
    items: [
      { href: "/contrataciones", label: "Contrataciones", hint: "Licitaciones y compras" },
      { href: "/digesto", label: "Normas (digesto)", hint: "Cuerpo normativo vigente" },
      { href: "/concejo/transparencia", label: "Actividad del Concejo", hint: "Boletines y documentos" },
    ],
  },
  {
    id: "acceso",
    label: "Acceso ciudadano",
    items: [
      { href: "/marco-normativo", label: "Cómo pedir información", hint: "Ord. 1872/2009" },
      { href: "/datos-abiertos", label: "Datos abiertos (CSV/JSON)", hint: "Descargas con CC-BY-4.0" },
      { href: "/api/v1/openapi", label: "API REST", hint: "Para desarrolladores" },
    ],
  },
];

const ctaSuscripcion: Subitem = { href: "/suscripciones", label: "Recibir alertas" };

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helpers para hover con delay (evita cierre accidental al saltar
  // del button al dropdown).
  function abrirGrupo(id: string) {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDesktop(id);
  }
  function cerrarGrupoConDelay() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDesktop(null), 150);
  }

  // Cerrar dropdown desktop al click fuera o ESC
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenDesktop(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDesktop(null);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Cerrar todo al cambiar de ruta
  useEffect(() => {
    setDrawerOpen(false);
    setOpenDesktop(null);
    setOpenMobile(null);
  }, [pathname]);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function grupoTieneActivo(g: Grupo): boolean {
    return g.items.some((i) => isActive(i.href));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setDrawerOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-coral to-coral-dark font-black text-zinc-900">
            S
          </span>
          <span className="text-sm sm:text-base">Sunchales Transparente</span>
        </Link>

        {/* Nav desktop */}
        <nav
          ref={navRef}
          className="hidden items-center gap-1 text-sm text-slate-300 lg:flex"
        >
          <Link
            href="/"
            className={`rounded-md px-3 py-2 hover:bg-white/5 hover:text-white ${
              isActive("/") ? "text-white" : ""
            }`}
          >
            Inicio
          </Link>

          {grupos.map((g) => {
            const open = openDesktop === g.id;
            const hasActive = grupoTieneActivo(g);
            return (
              <div
                key={g.id}
                className="relative"
                onMouseEnter={() => abrirGrupo(g.id)}
                onMouseLeave={cerrarGrupoConDelay}
              >
                <button
                  type="button"
                  onClick={() => setOpenDesktop(open ? null : g.id)}
                  onFocus={() => abrirGrupo(g.id)}
                  aria-expanded={open}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white ${
                    open || hasActive ? "text-white" : ""
                  }`}
                >
                  {g.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M3 5l3 3 3-3" />
                  </svg>
                </button>
                {open && (
                  <div className="absolute left-0 top-full mt-1 w-72 overflow-hidden rounded-lg border border-white/10 bg-navy shadow-xl ring-1 ring-coral/20">
                    {g.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className={`block border-l-2 px-4 py-3 transition hover:bg-white/5 ${
                          isActive(it.href)
                            ? "border-coral bg-white/5 text-white"
                            : "border-transparent text-slate-200 hover:border-coral/50 hover:text-white"
                        }`}
                      >
                        <div className="text-sm font-semibold">{it.label}</div>
                        {it.hint && (
                          <div className="mt-0.5 text-[11px] text-slate-400">{it.hint}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* CTA Suscripción destacado */}
          <Link
            href={ctaSuscripcion.href}
            className={`ml-2 rounded-md bg-coral px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-amber-400 ${
              isActive(ctaSuscripcion.href) ? "ring-2 ring-coral-dark" : ""
            }`}
          >
            {ctaSuscripcion.label}
          </Link>
        </nav>

        {/* Botón hamburguesa móvil/tablet */}
        <button
          type="button"
          aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white hover:bg-white/10 lg:hidden"
        >
          {drawerOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Drawer móvil/tablet con accordion */}
      {drawerOpen && (
        <nav className="border-t border-white/5 bg-navy lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            <li>
              <Link
                href="/"
                className={`block rounded-md px-3 py-3 text-[15px] hover:bg-white/5 hover:text-white ${
                  isActive("/") ? "text-white" : "text-slate-200"
                }`}
                onClick={() => setDrawerOpen(false)}
              >
                Inicio
              </Link>
            </li>

            {grupos.map((g) => {
              const expanded = openMobile === g.id;
              const hasActive = grupoTieneActivo(g);
              return (
                <li key={g.id} className="border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setOpenMobile(expanded ? null : g.id)}
                    aria-expanded={expanded}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-[15px] hover:bg-white/5 ${
                      expanded || hasActive ? "text-white" : "text-slate-200"
                    }`}
                  >
                    <span className="font-semibold">{g.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path d="M3 5l3 3 3-3" />
                    </svg>
                  </button>
                  {expanded && (
                    <ul className="ml-3 border-l-2 border-coral/40 pb-2">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className={`block rounded-md px-3 py-2 text-sm hover:bg-white/5 hover:text-white ${
                              isActive(it.href) ? "text-white" : "text-slate-300"
                            }`}
                            onClick={() => setDrawerOpen(false)}
                          >
                            <div>{it.label}</div>
                            {it.hint && (
                              <div className="mt-0.5 text-[11px] text-slate-400">{it.hint}</div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* CTA Suscripción */}
            <li className="mt-2 border-t border-white/5 pt-2">
              <Link
                href={ctaSuscripcion.href}
                className={`block rounded-md bg-coral px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-amber-400 ${
                  isActive(ctaSuscripcion.href) ? "ring-2 ring-coral-dark" : ""
                }`}
                onClick={() => setDrawerOpen(false)}
              >
                {ctaSuscripcion.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
