import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        poster: {
          pink: "#eababa",
          cream: "#eeeadd",
          ink: "#121212",
          rose: "#d98f9b",
          blue: "#8aa7c7"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      borderRadius: {
        card: "1.25rem"
      },
      boxShadow: {
        paper: "0 14px 30px rgba(18,18,18,0.18), 0 2px 0 rgba(18,18,18,0.08)",
        paperSm: "0 10px 22px rgba(18,18,18,0.16), 0 1px 0 rgba(18,18,18,0.08)",
        tab: "0 8px 18px rgba(18,18,18,0.12), 0 1px 0 rgba(18,18,18,0.07)"
      },
      backgroundImage: {
        "poster-radial":
          "radial-gradient(1200px circle at 15% 10%, rgba(238,234,221,0.45), transparent 55%), radial-gradient(900px circle at 85% 0%, rgba(255,255,255,0.22), transparent 50%), radial-gradient(900px circle at 0% 80%, rgba(18,18,18,0.08), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
