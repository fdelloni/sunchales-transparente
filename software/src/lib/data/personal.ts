/**
 * Padrón de Personal — Estructura jerárquica de la Municipalidad de Sunchales.
 *
 * IMPORTANTE — Honestidad de datos:
 *
 *   - Los cargos, áreas y nombres de funcionarios son INFORMACIÓN PÚBLICA
 *     verificable (ver sources.organigramaMunicipal). Marcados verificado=true.
 *
 *   - Las remuneraciones brutas son ESTIMACIONES referenciales basadas en
 *     escalas habituales de regímenes de personal municipal santafesino.
 *     NO son datos oficiales de Sunchales. Marcadas verificado=false hasta
 *     que el municipio publique las remuneraciones reales.
 */

export type EmpleadoMunicipal = {
  id: string;
  apellidoNombre: string;
  cargo: string;
  area: string;
  jerarquia: 1 | 2 | 3 | 4; // 1: Intendente, 2: Secretaría, 3: Subsecretaría, 4: Dirección/Coordinación
  /** Reporta a (id de otro empleado). Null para el Intendente. Habilita el organigrama. */
  reportaA: string | null;
  /** Fecha de asunción del cargo (ISO). Null cuando no fue oficialmente publicada. */
  fechaInicio: string | null;
  /** Trazabilidad de la fecha de inicio. */
  fuenteFecha: "verificado_publico" | "pendiente_oficial";
  remuneracionBruta: number | null; // ARS mensual; null si pendiente de informar
  fuenteCargo: "verificado_publico" | "pendiente_oficial";
  fuenteRemuneracion: "estimacion_referencial" | "verificado_oficial" | "pendiente_oficial";
  ejercicio: number;
};

/**
 * Datos verificados públicamente. Las remuneraciones se marcan como
 * "estimacion_referencial" porque NO contamos con la nómina oficial publicada.
 * El sistema dejará de mostrarlas como tales cuando ingrese la información real.
 */
export const empleados: EmpleadoMunicipal[] = [
  // Departamento Ejecutivo
  {
    id: "emp_001",
    apellidoNombre: "Pinotti, Pablo",
    cargo: "Intendente Municipal",
    area: "Departamento Ejecutivo",
    jerarquia: 1,
    reportaA: null,
    fechaInicio: "2023-12-10",
    fuenteFecha: "verificado_publico", // inicio del período constitucional 2023-2027
    remuneracionBruta: 4_800_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },

  // Secretaría de Gestión
  {
    id: "emp_002",
    apellidoNombre: "Martínez, Omar",
    cargo: "Secretario de Gestión",
    area: "Secretaría de Gestión",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_600_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },
  {
    id: "emp_003",
    apellidoNombre: "Girard, Fabrina",
    cargo: "Subsecretaria de Infraestructura Urbana y Rural",
    area: "Secretaría de Gestión",
    jerarquia: 3,
    reportaA: "emp_002",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_900_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },
  {
    id: "emp_004",
    apellidoNombre: "Gabiani, Cecilia",
    cargo: "Subsecretaria de Ambiente y Servicios a la Comunidad",
    area: "Secretaría de Gestión",
    jerarquia: 3,
    reportaA: "emp_002",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_900_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },
  {
    id: "emp_005",
    apellidoNombre: "Díaz, Magalí",
    cargo: "Subsecretaria de Hacienda y Finanzas",
    area: "Secretaría de Gestión",
    jerarquia: 3,
    reportaA: "emp_002",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_900_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },

  // Secretaría de Desarrollo
  {
    id: "emp_006",
    apellidoNombre: "Grande, Marilina",
    cargo: "Secretaria de Desarrollo",
    area: "Secretaría de Desarrollo",
    jerarquia: 2,
    reportaA: "emp_001",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 3_600_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },
  {
    id: "emp_007",
    apellidoNombre: "Ghiano, Pablo",
    cargo: "Subsecretario de Educación, Salud y Convivencia",
    area: "Secretaría de Desarrollo",
    jerarquia: 3,
    reportaA: "emp_006",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_900_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  },
  {
    id: "emp_008",
    apellidoNombre: "Prados, Carolina",
    cargo: "Subsecretaria de Producción y Cooperativismo",
    area: "Secretaría de Desarrollo",
    jerarquia: 3,
    reportaA: "emp_006",
    fechaInicio: null,
    fuenteFecha: "pendiente_oficial",
    remuneracionBruta: 2_900_000,
    fuenteCargo: "verificado_publico",
    fuenteRemuneracion: "estimacion_referencial",
    ejercicio: 2026
  }
];

/**
 * Construye el árbol jerárquico (organigrama) a partir de la lista plana
 * usando el campo `reportaA`. Útil para renderizar visualmente.
 */
export type NodoOrganigrama = EmpleadoMunicipal & { hijos: NodoOrganigrama[] };

export function construirOrganigrama(): NodoOrganigrama[] {
  const mapa = new Map<string, NodoOrganigrama>();
  for (const e of empleados) mapa.set(e.id, { ...e, hijos: [] });

  const raices: NodoOrganigrama[] = [];
  for (const nodo of mapa.values()) {
    if (nodo.reportaA == null) {
      raices.push(nodo);
    } else {
      const padre = mapa.get(nodo.reportaA);
      if (padre) padre.hijos.push(nodo);
      else raices.push(nodo); // huérfano: lo subimos a raíz para no perderlo
    }
  }
  // Ordenamos hijos por jerarquía y luego por apellido
  const ordenar = (nodos: NodoOrganigrama[]) => {
    nodos.sort((a, b) => a.jerarquia - b.jerarquia || a.apellidoNombre.localeCompare(b.apellidoNombre, "es"));
    nodos.forEach((n) => ordenar(n.hijos));
  };
  ordenar(raices);
  return raices;
}

/**
 * Estadísticas agregadas (sin exponer datos individuales sensibles).
 * Estas las construimos de la propia colección y son útiles para KPI cards.
 */
export function aggregadosPorArea() {
  const map = new Map<string, { area: string; cantidad: number; masaSalarial: number }>();
  for (const e of empleados) {
    const m = map.get(e.area) ?? { area: e.area, cantidad: 0, masaSalarial: 0 };
    m.cantidad += 1;
    m.masaSalarial += e.remuneracionBruta ?? 0;
    map.set(e.area, m);
  }
  return Array.from(map.values()).sort((a, b) => b.masaSalarial - a.masaSalarial);
}
