import { button, heroui } from "@heroui/theme"; // Verify this import works with @heroui/theme@latest

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx,mdx}',
    './wrappers/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        amharicHeading: ['Chiret', 'sans-serif'],
        amharicBody: ['Noto Sans Ethiopic', 'sans-serif'],
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom right, #ffe4e6, #ddd6fe, #c7d2fe)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
        'brand-primary': {
          DEFAULT: '#FF595E',
          'light': '#FF7A7D',
          'dark': '#E64F54',
          'darker': '#CC464B',
        },
        background: {
          light: '#F9FAFB',
          dark: '#080404',
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB',
        },
        button: {
          primary: {
            light: '#FF595E',
            dark: '#FF595E',
          },
          secondary: {
            light: '#FBBF24',
            dark: '#F59E0B',
          },
        },
      },
      dropShadow: {
        brand: '0 4px 8px rgba(255, 89, 94, 0.4)',
        'brand-hover': '0 6px 12px rgba(255, 89, 94, 0.5)',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontSize: {
        'heading': ['1.5rem', { lineHeight: '2rem', '@screen sm': { fontSize: '1.875rem' }, '@screen md': { fontSize: '2.25rem' }, '@screen lg': { fontSize: '2.5rem' }, '@screen xl': { fontSize: '3rem' } }],
        'subheading': ['1.25rem', { lineHeight: '1.75rem', '@screen sm': { fontSize: '1.5rem' }, '@screen md': { fontSize: '1.75rem' }, '@screen lg': { fontSize: '2rem' }, '@screen xl': { fontSize: '2.25rem' } }],
        'body': ['0.875rem', { lineHeight: '1.25rem', '@screen sm': { fontSize: '1rem' }, '@screen md': { fontSize: '1.125rem' }, '@screen lg': { fontSize: '1.125rem' }, '@screen xl': { fontSize: '1.25rem' } }],
        'small': ['0.75rem', { lineHeight: '1rem', '@screen sm': { fontSize: '0.875rem' }, '@screen md': { fontSize: '0.875rem' }, '@screen lg': { fontSize: '1rem' }, '@screen xl': { fontSize: '1rem' } }],
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
    require('tailwind-scrollbar-hide'), // Convert to ES Module import if possible
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: { layout: {}, colors: { primary: "#007BFF", secondary: "#6C757D", accent: "#FFC107", surface: "#FFFFFF", text: "#212529" } },
        dark: { layout: {}, colors: { primary: "#FF595E", secondary: "#4B5563", accent: "#FBBF24", surface: "#1F2937" } },
      },
    }),
  ],
};

export default config; // Replace module.exports with this