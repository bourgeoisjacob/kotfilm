import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kot: {
          red: "#9e2b25",
          redDeep: "#7c211c",
          cream: "#efe4cd",
          creamHi: "#f6efe0",
          tan: "#c9ab7e",
          gold: "#bd9a55",
          ink: "#211d18",
          char: "#2c2722",
          line: "#cdbb97",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
