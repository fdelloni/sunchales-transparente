"use client";

/**
 * Banda destacada en la home con el video institucional de Sunchales Transparente.
 *
 * Estrategia de carga: "click-to-play". El archivo mp4 (~35 MB) NO se descarga
 * con la página: sólo se muestra el póster (imagen liviana). El <video> recién
 * se monta cuando el ciudadano toca "reproducir". Así la home carga rápido y el
 * video se sirve desde el propio sitio (public/videos), sin terceros ni rastreo
 * externo — coherente con el principio de privacidad por diseño del proyecto.
 *
 * Para reemplazar el video en el futuro, basta con pisar los archivos en
 * /public/videos/ (mismo nombre) o cambiar las constantes de abajo.
 */

import { useState } from "react";

const VIDEO_SRC = "/videos/sunchales-transparente.mp4";
const POSTER = "/videos/poster.jpg";
const DURACION = "8:43";

export default function VideoDestacado() {
  const [reproduciendo, setReproduciendo] = useState(false);

  return (
    <section className="bg-[#0A3D16]">
      <div className="container-page py-12 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-oro">Conocé la plataforma</span>
          <h2 className="section-heading mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
            Sunchales Transparente en un video
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-emerald-100/80 sm:text-base">
            Un recorrido por el portal: presupuesto, contrataciones, brechas y
            acceso ciudadano, explicado en pocos minutos.
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-oro/30 bg-black shadow-lg">
            {reproduciendo ? (
              <video
                className="h-full w-full"
                src={VIDEO_SRC}
                poster={POSTER}
                controls
                autoPlay
                playsInline
              >
                Tu navegador no puede reproducir el video.{" "}
                <a href={VIDEO_SRC} className="underline">
                  Descargalo acá
                </a>
                .
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setReproduciendo(true)}
                aria-label="Reproducir el video de Sunchales Transparente"
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={POSTER}
                  alt="Portada del video de Sunchales Transparente"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-navy/40 transition-colors group-hover:bg-navy/25" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-oro text-navy shadow-lg transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  {DURACION}
                </span>
              </button>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-emerald-100/60">
            El video se carga sólo cuando lo reproducís — alojado en el propio
            sitio, sin servicios de terceros.
          </p>
        </div>
      </div>
    </section>
  );
}
