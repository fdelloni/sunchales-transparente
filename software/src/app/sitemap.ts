import type { MetadataRoute } from "next";
import { remuneracionesDetalle } from "@/lib/data/remuneraciones-detalle.generated";
import { remuneracionesDetalleOcr } from "@/lib/data/remuneraciones-ocr.generated";
import { normasOficiales } from "@/lib/data/digesto-oficial.generated";
import { contrataciones } from "@/lib/data/contrataciones";

const BASE_URL = "https://ciudadan.com";

const RUTAS_ESTATICAS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/presupuesto", changeFrequency: "monthly", priority: 0.9 },
  { path: "/recaudacion", changeFrequency: "monthly", priority: 0.85 },
  { path: "/personal", changeFrequency: "monthly", priority: 0.85 },
  { path: "/personal/remuneraciones", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contrataciones", changeFrequency: "weekly", priority: 0.85 },
  { path: "/digesto", changeFrequency: "weekly", priority: 0.85 },
  { path: "/concejo", changeFrequency: "weekly", priority: 0.8 },
  { path: "/concejo/transparencia", changeFrequency: "weekly", priority: 0.7 },
  { path: "/juzgado-faltas", changeFrequency: "monthly", priority: 0.75 },
  { path: "/catastro", changeFrequency: "monthly", priority: 0.8 },
  { path: "/catastro/zonificacion", changeFrequency: "monthly", priority: 0.75 },
  { path: "/audiencias-publicas", changeFrequency: "monthly", priority: 0.7 },
  { path: "/marco-normativo", changeFrequency: "yearly", priority: 0.7 },
  { path: "/estadisticas", changeFrequency: "weekly", priority: 0.8 },
  { path: "/datos-abiertos", changeFrequency: "monthly", priority: 0.8 },
  { path: "/brechas", changeFrequency: "weekly", priority: 0.95 },
  { path: "/aip", changeFrequency: "monthly", priority: 0.9 },
  { path: "/carta-organica", changeFrequency: "monthly", priority: 0.85 },
  { path: "/suscripciones", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sitemap: MetadataRoute.Sitemap = [];

  // 1) Rutas estáticas
  for (const { path, changeFrequency, priority } of RUTAS_ESTATICAS) {
    sitemap.push({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    });
  }

  // 2) Detalle de remuneraciones por período (texto digital + OCR, deduplicado)
  const periodos = new Set<string>();
  for (const r of remuneracionesDetalle) periodos.add(r.periodo);
  for (const r of remuneracionesDetalleOcr) periodos.add(r.periodo);
  for (const periodo of periodos) {
    sitemap.push({
      url: `${BASE_URL}/personal/remuneraciones/${periodo}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // 3) Detalle de normas del Digesto del Departamento Ejecutivo
  for (const norma of normasOficiales) {
    sitemap.push({
      url: `${BASE_URL}/digesto/${norma.id}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    });
  }

  // 4) Detalle de contrataciones (los 4 demos con cadena hash)
  for (const c of contrataciones) {
    sitemap.push({
      url: `${BASE_URL}/contrataciones/${c.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return sitemap;
}
