"use client";

import { useMemo, useState } from "react";
import {
  manzanas,
  radios,
  bboxManzanas,
  type ManzanaGeo,
  type RadioCensalGeo,
} from "@/lib/data/sunchales-manzanas.generated";

/**
 * Mapa SVG inline de Sunchales — manzanas reales del shapefile IPEC.
 *
 * Dato fuente: shapefile m0171.shp del IPEC Santa Fe (Censo 2022), reproyectado
 * de POSGAR 1994 Argentina Zone 5 a WGS84.
 *
 * Renderizamos las 727 manzanas como SVG <polygon>; los espacios verdes
 * (atributo ESPVERDE = 1 en el dbf original) se pintan en verde lima
 * institucional para ser distinguibles. Las manzanas regulares quedan en gris
 * suave. No se inventa zonificación: la Ord. 2800/2019 no la georreferencia
 * en formato vectorial y no está disponible públicamente como GeoJSON.
 *
 * Las coordenadas WGS84 se proyectan a un viewBox planar (Web Mercator
 * simplificado / equirectangular) para visualización; no es una proyección
 * cartográfica exacta para grandes extensiones, pero es indistinguible a la
 * escala del ejido urbano de Sunchales.
 */

type Modo = "manzanas" | "radios";

const VIEW_WIDTH = 900;
const VIEW_HEIGHT = 700;

export default function MapaManzanasSunchales() {
  const [modo, setModo] = useState<Modo>("manzanas");
  const [hover, setHover] = useState<string | null>(null);

  const [minX, minY, maxX, maxY] = bboxManzanas;
  const projX = (lng: number) =>
    ((lng - minX) / (maxX - minX)) * VIEW_WIDTH;
  const projY = (lat: number) =>
    VIEW_HEIGHT - ((lat - minY) / (maxY - minY)) * VIEW_HEIGHT;

  const polygonToPath = (coords: number[][][]) =>
    coords
      .map(
        (ring) =>
          "M " +
          ring
            .map(([lng, lat]) => `${projX(lng).toFixed(1)} ${projY(lat).toFixed(1)}`)
            .join(" L ") +
          " Z"
      )
      .join(" ");

  const manzanasPaths = useMemo(
    () =>
      manzanas.map((m: ManzanaGeo) => ({
        id: m.id,
        espacioVerde: m.espacioVerde,
        d: polygonToPath(m.geometry.coordinates),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const radiosPaths = useMemo(
    () =>
      radios.map((r: RadioCensalGeo) => ({
        id: r.id,
        label: `Frac ${r.frac2020} · Rad ${r.rad2020}`,
        d: polygonToPath(r.geometry.coordinates),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const totalManzanas = manzanas.length;
  const totalEspaciosVerdes = manzanas.filter((m) => m.espacioVerde).length;
  const totalRadios = radios.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Controles */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Capa visible:
        </span>
        <button
          type="button"
          onClick={() => setModo("manzanas")}
          className={
            modo === "manzanas"
              ? "rounded-full border-2 border-amber-500 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
              : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          }
        >
          Manzanas ({totalManzanas})
        </button>
        <button
          type="button"
          onClick={() => setModo("radios")}
          className={
            modo === "radios"
              ? "rounded-full border-2 border-amber-500 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
              : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          }
        >
          Radios censales ({totalRadios})
        </button>
        <span className="ml-auto text-[11px] text-slate-500">
          Fuente: IPEC Santa Fe (Censo 2022) · CRS original POSGAR Z5 → WGS84
        </span>
      </div>

      {/* SVG */}
      <div className="relative bg-slate-50">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Mapa de manzanas y radios censales de Sunchales"
        >
          {/* Fondo */}
          <rect
            x="0"
            y="0"
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT}
            fill="#f8fafc"
          />

          {/* Manzanas como base siempre, atenuadas si vemos radios */}
          {manzanasPaths.map((m) => (
            <path
              key={`mz-${m.id}`}
              d={m.d}
              fill={
                m.espacioVerde
                  ? modo === "manzanas"
                    ? "#86efac"
                    : "#d1fae5"
                  : modo === "manzanas"
                  ? "#e2e8f0"
                  : "#f1f5f9"
              }
              stroke={m.espacioVerde ? "#15803d" : "#94a3b8"}
              strokeWidth={modo === "manzanas" ? 0.5 : 0.25}
              opacity={modo === "radios" ? 0.55 : 1}
            />
          ))}

          {/* Radios censales encima cuando se eligen */}
          {modo === "radios" &&
            radiosPaths.map((r) => (
              <path
                key={`rd-${r.id}`}
                d={r.d}
                fill="none"
                stroke="#dc2626"
                strokeWidth={1.6}
                strokeOpacity={0.85}
                onMouseEnter={() => setHover(r.label)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            ))}
        </svg>

        {/* Tooltip */}
        {hover && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-md bg-navy/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
            {hover}
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 bg-white px-4 py-3 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-slate-400 bg-slate-200" />
          Manzana edificable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-emerald-700 bg-emerald-300" />
          Espacio verde / plaza ({totalEspaciosVerdes})
        </span>
        {modo === "radios" && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[3px] w-5 bg-red-600" />
            Radio censal (Censo 2020)
          </span>
        )}
        <span className="ml-auto text-[11px] text-slate-400">
          Visualización SVG inline · Sin tracker · Sin tiles externos
        </span>
      </div>
    </div>
  );
}
