import type { Config } from "tailwindcss";

// Approved Build 0.1 visual direction: cream/light background, deep
// dark-green primary, elegant serif headings, clean sans-serif UI text.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F0",
          50: "#FFFEFC",
          100: "#FAF7F0",
          200: "#F3EDE0",
        },
        forest: {
          DEFAULT: "#153226",
          50: "#E8EEEB",
          100: "#C9D8D0",
          400: "#2C5949",
          600: "#1F4335",
          700: "#153226",
          800: "#0F241C",
          900: "#0A1813",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-heading)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-body)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
