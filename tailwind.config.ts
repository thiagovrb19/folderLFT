import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/products/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        "bg-subtle": "#F8FAFC",
        "bg-card": "#FFFFFF",
        primary: {
          DEFAULT: "#0072D5",
          hover: "#005bb5",
          dark: "#004890",
          light: "#EBF5FF",
        },
        accent: {
          DEFAULT: "#0A182F",
          hover: "#15243C",
          dark: "#000418",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          hover: "#E2E8F0",
          light: "#F8FAFC",
        },
        lft: {
          blue: "#0072D5",
          navy: "#0A182F",
          cyan: "#38BDF8",
          slate: "#475569",
          border: "#E2E8F0",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      backgroundImage: {
        "radial-light": "radial-gradient(circle at 50% 0%, rgba(0, 114, 213, 0.06) 0%, rgba(248, 250, 252, 0.9) 50%, #FFFFFF 100%)",
        "metal-gradient": "linear-gradient(110deg, #0A182F 0%, #0072D5 45%, #38BDF8 70%, #0A182F 100%)",
      },
      keyframes: {
        "metal-shift": {
          "0%, 100%": {
            "background-position": "0% 50%",
            "background-size": "200% 200%",
          },
          "50%": {
            "background-position": "100% 50%",
            "background-size": "200% 200%",
          },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "metal-shift": "metal-shift 6s ease infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
      },
      boxShadow: {
        glass: "0 8px 30px 0 rgba(0, 0, 0, 0.06)",
        card: "0 4px 20px -2px rgba(0, 72, 213, 0.08)",
        glow: "0 0 25px -5px rgba(0, 114, 213, 0.25)",
        "glow-lg": "0 0 40px -8px rgba(0, 114, 213, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
