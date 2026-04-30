export type Dataset = {
  id: string;
  titulo: string;
  descripcion: string;
  tags: string[];
  formatos: ("CSV" | "JSON" | "GeoJSON")[];
  licencia: "CC-BY-4.0";
  publicado: string;
  actualizado: string;
  endpoint: string;
  totalRegistros: number;
  fuenteId: string;
};

export const datasets: Dataset[] = [
  {
    id: "presupuesto-2026",
    titulo: "Presupuesto Municipal 2026",
    descripcion: "Partidas presupuestarias con su clasificacion por finalidad y funcion.",
    tags: ["presupuesto", "hacienda", "transparencia", "2026"],
    formatos: ["CSV", "JSON"],
    licencia: "CC-BY-4.0",
    publicado: "2026-04-29",
    actualizado: "2026-04-29",
    endpoint: "/api/v1/presupuesto",
    totalRegistros: 20,
    fuenteId: "presupuesto2026"
  },
  {
    id: "contrataciones-2026",
    titulo: "Contrataciones 2026",
    descripcion: "Licitaciones y contrataciones directas con cadena hash-chain SHA-256 auditable.",
    tags: ["contrataciones", "licitaciones", "transparencia", "sha256"],
    formatos: ["CSV", "JSON"],
    licencia: "CC-BY-4.0",
    publicado: "2026-04-29",
    actualizado: "2026-04-29",
    endpoint: "/api/v1/contrataciones",
    totalRegistros: 4,
    fuenteId: "presupuesto2026"
  },
  {
    id: "personal-municipal",
    titulo: "Personal Municipal - Planta Politica",
    descripcion: "Padron de funcionarios con cargo, area y remuneracion bruta.",
    tags: ["personal", "transparencia", "salarios"],
    formatos: ["CSV", "JSON"],
    licencia: "CC-BY-4.0",
    publicado: "2026-04-29",
    actualizado: "2026-04-29",
    endpoint: "/api/v1/personal",
    totalRegistros: 8,
    fuenteId: "organigramaMunicipal"
  },
  {
    id: "fuentes-citadas",
    titulo: "Fuentes citadas por la plataforma",
    descripcion: "Registro de cada fuente externa utilizada para alimentar datos del portal.",
    tags: ["metadata", "auditoria", "transparencia"],
    formatos: ["JSON"],
    licencia: "CC-BY-4.0",
    publicado: "2026-04-29",
    actualizado: "2026-04-29",
    endpoint: "/api/v1/datasets",
    totalRegistros: 6,
    fuenteId: "presupuesto2026"
  }
];
