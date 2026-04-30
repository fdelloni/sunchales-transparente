import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1B3D", soft: "#1a2754" },
        deep: "#0C4A6E",
        teal: "#1C7293",
        ice: "#CDE7F0",
        sand: "#F5F0E6",
        coral: { DEFAULT: "#E8A33D", dark: "#C97B1A" }
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
