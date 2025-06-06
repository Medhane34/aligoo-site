import {button, heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
 // Scan files in the app directory
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the components directory
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the lib directory
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the sanity directory
    './sanity/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the wrappers directory
    './wrappers/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the @heroui/theme package
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
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
    dropShadow: {
  brand: '0 4px 8px rgba(255, 89, 94, 0.4)', // subtle glow with brand color
  'brand-hover': '0 6px 12px rgba(255, 89, 94, 0.5)', // stronger on hover
},
    screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      // Define custom responsive text sizes
      fontSize: {
        // Heading (e.g., h1, h2)
        'heading': [
          '1.5rem', // xs: 24px
          {
            lineHeight: '2rem',
            '@screen sm': { fontSize: '1.875rem' }, // sm: 30px
            '@screen md': { fontSize: '2.25rem' },  // md: 36px
            '@screen lg': { fontSize: '2.5rem' },   // lg: 40px
            '@screen xl': { fontSize: '3rem' },     // xl: 48px
          },
        ],
        // Subheading (e.g., h3, h4)
        'subheading': [
          '1.25rem', // xs: 20px
          {
            lineHeight: '1.75rem',
            '@screen sm': { fontSize: '1.5rem' },   // sm: 24px
            '@screen md': { fontSize: '1.75rem' },  // md: 28px
            '@screen lg': { fontSize: '2rem' },     // lg: 32px
            '@screen xl': { fontSize: '2.25rem' },  // xl: 36px
          },
        ],
        // Body text (e.g., paragraphs)
        'body': [
          '0.875rem', // xs: 14px
          {
            lineHeight: '1.25rem',
            '@screen sm': { fontSize: '1rem' },     // sm: 16px
            '@screen md': { fontSize: '1.125rem' }, // md: 18px
            '@screen lg': { fontSize: '1.125rem' }, // lg: 18px
            '@screen xl': { fontSize: '1.25rem' },  // xl: 20px
          },
        ],
        // Small text (e.g., captions, notes)
        'small': [
          '0.75rem', // xs: 12px
          {
            lineHeight: '1rem',
            '@screen sm': { fontSize: '0.875rem' }, // sm: 14px
            '@screen md': { fontSize: '0.875rem' }, // md: 14px
            '@screen lg': { fontSize: '1rem' },     // lg: 16px
            '@screen xl': { fontSize: '1rem' },     // xl: 16px
          },
        ],
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