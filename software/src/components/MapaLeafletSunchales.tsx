"use client";

/**
 * Mapa Leaflet de Sunchales — Fase 3.
 *
 * Sustituye al SVG plano de Fase 2. Renderiza tiles OpenStreetMap (CORS abierto,
 * gratis, sin tracker) y dos overlays vectoriales reales:
 *   - Manzanas IPEC (727 polígonos) — capa base, distingue espacios verdes
 *   - Radios censales IPEC (29 polígonos) — capa toggleable
 *
 * IMPORTANTE — IDESF/SCIT NO se incrusta como tile-layer aquí. Verificado el
 * 2026-05-10: el visualizador IDESF y el buscador de parcelas devuelven el
 * header `Content-Security-Policy: frame-ancestors 'self' …gestionvirtual`,
 * que impide cualquier iframe desde dominios externos. La capa parcelaria
 * provincial sigue siendo accesible vía link "abrir en SCIT", no como overlay.
 *
 * Carga: este componente usa window/document a través de Leaflet; se importa
 * desde la página servidor con `next/dynamic({ ssr: false })`.
 */

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, ZoomControl } from "react-leaflet";
import type { LatLngBoundsExpression, PathOptions } from "leaflet";
import type { Feature } from "geojson";

import "leaflet/dist/leaflet.css";

import {
  manzanas,
  radios,
  bboxManzanas,
  centroSunchales,
} from "@/lib/data/sunchales-manzanas.generated";

// Convertimos nuestras manzanas/radios a FeatureCollection GeoJSON estándar.
// El formato {type:"Feature", properties, geometry} ya coincide con la spec.
const fcManzanas = {
  type: "FeatureCollection" as const,
  features: manzanas.map((m) => ({
    type: "Feature" as const,
    properties: { id: m.id, espacioVerde: m.espacioVerde },
    geometry: m.geometry,
  })),
};

const fcRadios = {
  type: "FeatureCollection" as const,
  features: radios.map((r) => ({
    type: "Feature" as const,
    properties: {
      id: r.id,
      frac2020: r.frac2020,
      rad2020: r.rad2020,
      frac2010: r.frac2010,
      rad2010: r.rad2010,
    },
    geometry: r.geometry,
  })),
};

// bbox = [minLng, minLat, maxLng, maxLat], Leaflet bounds = [[lat,lng],[lat,lng]]
const BOUNDS: LatLngBoundsExpression = [
  [bboxManzanas[1], bboxManzanas[0]],
  [bboxManzanas[3], bboxManzanas[2]],
];

const styleManzana = (feat?: Feature): PathOptions => {
  const espVerde = (feat?.properties as { espacioVerde?: boolean } | undefined)
    ?.espacioVerde;
  if (espVerde) {
    return {
      color: "#15803d",
      weight: 1,
      opacity: 0.9,
      fillColor: "#86efac",
      fillOpacity: 0.55,
    };
  }
  return {
    color: "#475569",
    weight: 0.6,
    opacity: 0.65,
    fillColor: "#cbd5e1",
    fillOpacity: 0.25,
  };
};

const styleRadio: PathOptions = {
  color: "#dc2626",
  weight: 2,
  opacity: 0.9,
  fillColor: "#dc2626",
  fillOpacity: 0.05,
  dashArray: "4 4",
};

function onEachManzana(feature: Feature, layer: L.Layer) {
  const props = feature.properties as { id: number; espacioVerde: boolean };
  const label = props.espacioVerde
    ? `<strong>Espacio verde / plaza</strong><br/>Manzana IPEC #${props.id}`
    : `<strong>Manzana #${props.id}</strong><br/>Fuente: IPEC Sunchales 2022`;
  layer.bindPopup(label);
  layer.bindTooltip(props.espacioVerde ? "Espacio verde" : `Manzana #${props.id}`, {
    sticky: true,
    direction: "top",
  });
}

function onEachRadio(feature: Feature, layer: L.Layer) {
  const props = feature.properties as {
    id: number;
    frac2020: string;
    rad2020: string;
    frac2010: string;
    rad2010: string;
  };
  const html = `
    <strong>Radio censal</strong><br/>
    Censo 2020: Frac ${props.frac2020} · Rad ${props.rad2020}<br/>
    Censo 2010: Frac ${props.frac2010} · Rad ${props.rad2010}
  `;
  layer.bindPopup(html);
  layer.bindTooltip(`Frac ${props.frac2020} · Rad ${props.rad2020}`, {
    sticky: true,
    direction: "top",
  });
}

export default function MapaLeafletSunchales() {
  // En SSR no debe correr. Hacemos un mount guard adicional por si acaso.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Re-render barato; la pesadez está en los polígonos GeoJSON.
  const manzanasLayer = useMemo(
    () => (
      <GeoJSON
        data={fcManzanas as never}
        style={styleManzana as never}
        onEachFeature={onEachManzana as never}
      />
    ),
    []
  );
  const radiosLayer = useMemo(
    () => (
      <GeoJSON
        data={fcRadios as never}
        style={styleRadio}
        onEachFeature={onEachRadio as never}
      />
    ),
    []
  );

  if (!mounted) {
    return (
      <div className="grid h-[560px] w-full place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Cargando mapa de Sunchales…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-[560px] w-full">
        <MapContainer
          bounds={BOUNDS}
          maxBounds={BOUNDS}
          maxBoundsViscosity={0.7}
          minZoom={12}
          maxZoom={18}
          zoomControl={false}
          className="h-full w-full"
          style={{ background: "#f1f5f9" }}
        >
          <ZoomControl position="topright" />
          <LayersControl position="topleft">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Sin fondo (sólo overlays)">
              <TileLayer
                attribution=""
                url="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/>"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Manzanas IPEC (727)">
              {manzanasLayer}
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Radios censales IPEC (29)">
              {radiosLayer}
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>

        {/* Atribución institucional en overlay esquinero */}
        <div className="pointer-events-none absolute bottom-2 left-2 z-[400] rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-700 shadow-sm backdrop-blur">
          <strong className="text-navy">Manzanas y radios:</strong>{" "}
          <a
            href="https://www.santafe.gov.ar/ipecinformes/uploads/planta/SUNCHALES.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto underline"
          >
            IPEC Santa Fe (Censo 2022)
          </a>{" "}
          · Reproyectado POSGAR Z5 → WGS84
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 bg-white px-4 py-3 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-slate-500 bg-slate-300/40" />
          Manzana edificable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-emerald-700 bg-emerald-300" />
          Espacio verde / plaza
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-[2px] w-5 border-t-2 border-dashed border-red-600"
            style={{ borderStyle: "dashed" }}
          />
          Radio censal
        </span>
        <span className="ml-auto text-[11px] text-slate-400">
          Centroide Sunchales:{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">
            {centroSunchales.lat.toFixed(4)}, {centroSunchales.lng.toFixed(4)}
          </code>
        </span>
      </div>
    </div>
  );
}
