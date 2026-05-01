/**
 * Modo demo del chatbot web — funciona SIN llamar a la API de Claude.
 *
 * Cuando ANTHROPIC_API_KEY no está seteada, el endpoint /api/v1/chat usa
 * este matcher para responder a las preguntas más frecuentes con texto
 * pre-cargado y verificado. Permite probar la integración del widget en
 * la web sin gastar créditos de API.
 *
 * Reutiliza el catálogo del bot de WhatsApp y suma respuestas
 * específicas para el contexto web (links a módulos del sitio).
 */

import { faqCatalogo, buscarFaq } from "@/lib/whatsapp/data/faq";
import { totales } from "@/lib/data/presupuesto";

export type RespuestaDemo = {
  texto: string;
  fuente?: string;
  links?: { label: string; href: string }[];
};

/**
 * FAQ adicionales pensadas para el sitio web (con sugerencias de módulos).
 * Se usan ANTES de caer al catálogo compartido de WhatsApp.
 */
const faqWeb: Array<{
  keywords: string[];
  respuesta: RespuestaDemo;
}> = [
  {
    keywords: [
      "que es",
      "qué es",
      "que es esto",
      "para que sirve",
      "para qué sirve",
      "que hace esta pagina",
      "qué hace esta página",
      "sunchales transparente"
    ],
    respuesta: {
      texto:
        "Sunchales Transparente es una plataforma cívica de transparencia y eficiencia operativa para la Municipalidad de Sunchales. " +
        "Te permite consultar el presupuesto, el padrón de personal, las contrataciones públicas con verificación criptográfica SHA-256 " +
        "y recibir alertas opt-in cuando se publica algo que te interesa.",
      links: [
        { label: "Ver presupuesto", href: "/presupuesto" },
        { label: "Ver contrataciones", href: "/contrataciones" },
        { label: "Datos abiertos + API", href: "/datos-abiertos" }
      ]
    }
  },
  {
    keywords: ["contratacion", "contratación", "licitacion", "licitación", "compra publica", "compra pública"],
    respuesta: {
      texto:
        "El módulo de Contrataciones registra cada licitación, concurso de precios y contratación directa con una cadena " +
        "de hashes SHA-256 verificable. Si alguien modifica un evento histórico, la cadena se rompe y se detecta. " +
        "Cualquier vecino puede recalcular los hashes en su navegador.",
      links: [
        { label: "Ir al módulo Contrataciones", href: "/contrataciones" }
      ]
    }
  },
  {
    keywords: ["personal", "empleado", "salario", "sueldo", "padron", "padrón"],
    respuesta: {
      texto:
        "El módulo Personal publica cargo, área y remuneración bruta de los puestos públicos del municipio. " +
        "No incluye datos personales sensibles: solo lo necesario para auditar el gasto, según la Ley 25.326.",
      links: [{ label: "Ver padrón de personal", href: "/personal" }]
    }
  },
  {
    keywords: ["recaudacion", "recaudación", "tributo", "impuesto municipal"],
    respuesta: {
      texto:
        "El módulo Recaudación detalla TGI, DReI, Contribución por Mejoras y demás tributos locales más coparticipación provincial.",
      links: [{ label: "Ver recaudación", href: "/recaudacion" }]
    }
  },
  {
    keywords: ["api", "datos abiertos", "csv", "json", "desarrollador"],
    respuesta: {
      texto:
        "Hay una API REST pública con especificación OpenAPI 3.0 y un catálogo de datasets en CSV/JSON con licencia CC-BY-4.0.",
      links: [
        { label: "Catálogo de datos abiertos", href: "/datos-abiertos" },
        { label: "Especificación OpenAPI", href: "/api/v1/openapi" }
      ]
    }
  },
  {
    keywords: ["alerta", "suscribir", "suscripcion", "suscripción", "notificacion", "notificación"],
    respuesta: {
      texto:
        "Podés suscribirte por email o WhatsApp para recibir cada nueva contratación que coincida con tus filtros " +
        "(categoría, área, monto mínimo). La baja es en un click.",
      links: [{ label: "Configurar mis alertas", href: "/suscripciones" }]
    }
  },
  {
    keywords: ["privacidad", "datos personales", "ley 25326", "proteccion de datos"],
    respuesta: {
      texto:
        "El proyecto sigue el principio de privacidad por diseño y la Ley 25.326. Solo se publica información pública " +
        "necesaria para auditoría ciudadana, con disociación de datos personales. No se cede información a terceros.",
      links: [{ label: "Política de privacidad", href: "/privacidad.html" }]
    }
  },
  {
    keywords: ["transparencia", "ley 27275", "acceso informacion", "acceso a la información"],
    respuesta: {
      texto:
        "El marco aplicable combina la Ley nacional 27.275 (acceso a la información pública), el Decreto provincial " +
        "Santa Fe 0692/2009 y el principio de máxima divulgación incorporado en la reforma constitucional santafesina de 2025."
    }
  },
  {
    keywords: ["per capita", "per cápita"],
    respuesta: {
      texto:
        `El gasto per cápita proyectado para 2026 es de $${totales.gasto_per_capita.toLocaleString("es-AR")} ` +
        `por habitante (presupuesto / población Censo 2022).`,
      fuente: "Proyecto de Presupuesto 2026 + INDEC 2022"
    }
  }
];

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Devuelve una respuesta determinista para el modo demo o `null` si no
 * encontró match suficiente. El llamador decide qué hacer en ese caso
 * (típicamente: mensaje "no tengo info verificada para esa pregunta").
 */
export function buscarRespuestaDemo(textoUsuario: string): RespuestaDemo | null {
  const norm = normalizar(textoUsuario);

  // 1) Match en FAQ web (con links a módulos)
  let mejorWeb: { idx: number; score: number } | null = null;
  faqWeb.forEach((entry, idx) => {
    let score = 0;
    for (const kw of entry.keywords) {
      if (norm.includes(normalizar(kw))) score += kw.split(" ").length;
    }
    if (score > 0 && (!mejorWeb || score > mejorWeb.score)) {
      mejorWeb = { idx, score };
    }
  });
  if (mejorWeb) return faqWeb[mejorWeb.idx].respuesta;

  // 2) Fallback al catálogo compartido de WhatsApp
  const compartido = buscarFaq(textoUsuario);
  if (compartido) {
    return {
      texto: compartido.respuesta,
      fuente: compartido.fuente
    };
  }

  return null;
}

/** Devuelve preguntas sugeridas para mostrar en el widget al abrirlo. */
export function preguntasSugeridas(): string[] {
  return [
    "¿Cuál es el presupuesto del municipio para 2026?",
    "¿Quién es el intendente actual?",
    "¿Cómo pago la TGI?",
    "¿Cómo verifico una contratación?",
    "¿Dónde están los datos abiertos?",
    "¿Qué es Sunchales Transparente?"
  ];
}

/** Re-exportamos por conveniencia para tests. */
export { faqCatalogo };
