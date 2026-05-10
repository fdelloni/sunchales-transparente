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

        // navy = VERDE FORESTAL PROFUNDO. El verde de la bandera tiene hue 74°
        // (verde-amarillento), que al oscurecerse vira a oliva/marrón. Para el
        // fondo institucional usamos un hue más cercano al verde puro (~125°)
        // con saturación alta, manteniendo la familia "verde sunchalero" sin
        // que parezca marrón.
        navy: { DEFAULT: "#0F5E1F", soft: "#1F8333" },

        // deep = VERDE BOSQUE OSCURO. Misma familia que navy pero con tinte
        // más esmeralda para variar y no chocar.
        deep: "#1A6F2D",

        // teal = VERDE MEDIO VIBRANTE. Tono puente entre el verde profundo
        // y el verde lima de la bandera; suficientemente oscuro para texto
        // sobre blanco y suficientemente brillante para fondos de gráficos.
        teal: "#3F9430",

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
