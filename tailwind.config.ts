import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // ✅ Import correcto para ESModules

const config: Config = {
  darkMode: ["class"], // Habilitar modo oscuro basado en clases
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}", // Asegurar compatibilidad con el código del juego
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        solo: {
          dark: "#1A1F2C",
          purple: "#9b87f5",
          blue: "#0EA5E9",
          magenta: "#D946EF",
          gray: "#E2E8F0",
          neon: "#00ff9d",
          cyber: "#00f0ff",
          energy: "#FFB156",
          guild: "#FF56D1",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(155, 135, 245, 0.7)" },
          "50%": { opacity: "0.5", boxShadow: "0 0 40px rgba(155, 135, 245, 0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "cyber-glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-5px, 2px)" },
          "66%": { transform: "translate(5px, -2px)" },
        },
        "energy-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "matrix-fall": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "5%": { opacity: "1" },
          "95%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "cyber-glitch": "cyber-glitch 0.3s ease-in-out infinite",
        "energy-pulse": "energy-pulse 2s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 15px rgba(155, 135, 245, 0.3)",
      },
    },
  },
  plugins: [tailwindcssAnimate], // ✅ Plugin de animaciones ahora funciona correctamente
};

export default config;
