import {button, heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
      'light-gradient': 'linear-gradient(to bottom right, #ffe4e6, #ddd6fe, #c7d2fe)',
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
    },
    animation: {
      gradient: 'gradient-move 8s ease infinite alternate',
    },
    keyframes: {
      'gradient-move': {
        '0%': { backgroundPosition: '0% 50%' },
        '100%': { backgroundPosition: '100% 50%' },
      },
    },
    colors: {
     'brand-primary': { // Your main brand color
          DEFAULT: '#FF595E', // Your #FF595E
          'light': '#FF7A7D', // Slightly lighter for the 'from' end
          'dark': '#E64F54',  // Slightly darker for the 'to' end
          'darker': '#CC464B', // Even darker for hover state
        },
      background: {
        light: '#F9FAFB', // Light theme background color
        dark: '#080404',   // Dark theme background color
      },
      text: {
        light: '#1F2937', // Light theme text color
        dark: '#F9FAFB',  // Dark theme text color
      },
      button: { 
        primary: {
          light: '#FF595E', // Light theme primary button color
          dark: '#FF595E',  // Dark theme primary button color
        },
        secondary: {
          light: '#FBBF24', // Light theme secondary button color
          dark: '#F59E0B',  // Dark theme secondary button color
        },
      },
    },
    },
  },
  animation: {
   'fade-in-down': 'fade-in-down 0.5s ease-out',
   'gradient-move': 'gradient-move 8s ease infinite alternate',
 },
 keyframes: {
 'fade-in-down': {
    '0%': { opacity: '0', transform: 'translateY(-10px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
  },
   'gradient-move': {
     '0%': { backgroundPosition: '0% 50%' },
   '100%': { backgroundPosition: '100% 50%' },
 },
},
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar-hide'),
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#007BFF", // light theme primary color
            secondary: "#6C757D", // light theme secondary color
            accent: "#FFC107", // light theme accent color
            surface: "#FFFFFF", // light theme surface color
            //background: "#FF595E", // light theme background color
            text: "#212529", // light theme text color
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: "#FF595E", // dark theme primary color
            secondary: "#4B5563", // dark theme secondary color
            accent: "#FBBF24", // dark theme accent color
            surface: "#1F2937", // dark theme surface color
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),  
  ],
}

module.exports = config;