import type { MetadataRoute } from "next";

const BASE_URL = "https://ciudadan.com";

const RUTAS_ESTATICAS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/presupuesto", changeFrequency: "monthly", priority: 0.9 },
  { path: "/recaudacion", changeFrequency: "monthly", priority: 0.85 },
  { path: "/personal", changeFrequency: "monthly", priority: 0.85 },
  { path: "/contrataciones", changeFrequency: "weekly", priority: 0.85 },
  { path: "/digesto", changeFrequency: "weekly", priority: 0.85 },
  { path: "/concejo", changeFrequency: "weekly", priority: 0.8 },
  { path: "/concejo/transparencia", changeFrequency: "weekly", priority: 0.7 },
  { path: "/juzgado-faltas", changeFrequency: "monthly", priority: 0.75 },
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
  return RUTAS_ESTATICAS.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
