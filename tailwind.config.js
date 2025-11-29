// tailwind.config.js
/* const { heroui } = require("@heroui/react"); */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./wrappers/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  // Tailwind v4 prefers a flat colors object
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    /*
      Keep Tailwind defaults and add custom colors under `extend.colors`.
      This avoids accidentally replacing the full `colors` object which
      can prevent other utilities from being generated.
    */

    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      amharicHeading: ["Chiret", "sans-serif"],
      amharicBody: ["Noto Sans Ethiopic", "sans-serif"],
    },

    backgroundImage: {
      "light-gradient":
        "linear-gradient(to bottom right, #ffe4e6, #ddd6fe, #c7d2fe)",
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },

    extend: {
      colors: {
        // Brand
        "brand-primary": "#FF595E",
        "brand-primary-light": "#FF7A7D",
        "brand-primary-dark": "#E64F54",
        "brand-primary-darker": "#CC464B",

        // Buttons (flat tokens)
        "button-primary-light": "#FF595E",
        "button-primary-dark": "#FF595E",
        "button-secondary-light": "#FBBF24",
        "button-secondary-dark": "#F59E0B",

        // Background
        "background-light": "#F9FAFB",
        "background-dark": "#080404",

        // Text
        "text-light": "#1F2937",
        "text-dark": "#F9FAFB",

        // Generic
        white: "#ffffff",
        black: "#000000",
      },
      // small extension area for utilities you might add later
      dropShadow: {
        brand: "0 4px 8px rgba(255, 89, 94, 0.2)",
      },
      animation: {
        "gradient-move": "gradient-move 8s ease infinite alternate",
      },
      keyframes: {
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      fontSize: {
        heading: ["1.5rem", { lineHeight: "2rem" }],
        subheading: ["1.25rem", { lineHeight: "1.75rem" }],
        body: ["0.875rem", { lineHeight: "1.25rem" }],
      },
    },
  },

  safelist: [
    // keep gradient utility classes when using dynamic class names
    "from-brand-primary-light",
    "to-brand-primary-dark",
    "from-button-secondary-light",
    "to-button-secondary-dark",
  ],

  /* plugins: [
    heroui({
      prefix: "heroui",
      defaultTheme: "light",
      themes: {
        light: {},
        dark: {},
      },
    }),
  ], */
};
