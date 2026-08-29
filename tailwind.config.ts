import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        "surface-subtle": "#F1F5F9",
        "surface-card": "#FFFFFF",
        "primary-text": "#111827",
        "secondary-text": "#6B7280",
        "muted-text": "#9CA3AF",
        border: "#E5E7EB",
        "border-dark": "#D1D5DB",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
          subtle: "#DBEAFE",
        },
        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
        },
        error: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        "card-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        resume: "0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
