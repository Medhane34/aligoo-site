// config/fonts.ts
import { DM_Sans } from "next/font/google"; // Import DM_Sans directly

export const fontSans = DM_Sans({ // Call DM_Sans here
  subsets: ["latin"],
  weight: ['400', '500', '700'], // Make sure to include all weights you'll use
  variable: "--font-sans",
  display: 'swap',
});

// If you have a font-mono (monospace font) setup, you'd do it similarly:
// import { Space_Mono } from "next/font/google"; // Example for a mono font

// export const fontMono = Space_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
//   weight: ["400", "700"],
// });