import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta 100% derivada de la Bandera oficial de Sunchales (Ord. 1762/2007)
        // y el escudo (Ord. concordante). Los tonos azules originales fueron
        // eliminados intencionalmente para alinear toda la identidad con los
        // símbolos locales: ORO (cielo) y VERDE (llanura) son los predominantes,
        // y los tonos auxiliares se derivan por hue manteniéndose dentro de la
        // misma familia cromática.

        // navy = ahora VERDE PROFUNDO heráldico (alias semántico para "color
        // institucional oscuro de fondo"). Se mantiene el nombre para no
        // romper código existente.
        navy: { DEFAULT: "#1F3D0A", soft: "#3A5E1D" },

        // deep = TIERRA-MARRÓN: representa el fortín del escudo y el suelo
        // labrado de la pampa argentina (símbolo "trigo" + "fuerte").
        deep: "#5D4A18",

        // teal = VERDE OLIVA MEDIO: tono puente entre el oro y el verde de
        // la bandera. Antes era #1C7293 (azul-verde), ahora afín a la paleta.
        teal: "#7A8B47",

        // ice = CREMA / ORO MUY CLARO: reemplaza el celeste anterior.
        // Útil para badges suaves y backgrounds livianos sin salir de paleta.
        ice: "#FFF4D9",

        // sand = beige neutro (sin cambio): no entra en conflicto con la
        // paleta y aporta contraste para tarjetas.
        sand: "#F5F0E6",

        // Hex de oro y verde extraídos del archivo oficial
        // sunchales.gob.ar/Bandera-de-Sunchales_01.jpg con promedio de
        // píxeles (script: extraer-colores-bandera.mjs).
        coral: {
          DEFAULT: "#FCC81D", // oro vibrante de la bandera (alias histórico)
          dark: "#9A7400",    // oro oscurecido (legible sobre blanco)
          soft: "#FFF1B8"     // oro muy claro para fondos
        },
        oro: {
          DEFAULT: "#FCC81D",
          dark: "#9A7400",
          soft: "#FFF1B8"
        },
        verde: {
          DEFAULT: "#ADCF3D", // verde lima de la bandera
          dark: "#5D7A18",    // verde oscurecido (legible sobre blanco)
          soft: "#EAF3CC"     // verde muy claro para fondos
        }
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 350ms ease-out both"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
export default config;
