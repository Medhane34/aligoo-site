import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer"; // Corrected import path

import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

import { SanityLive } from "@/src/sanity/live";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="root">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased m-0",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="pt-16 flex-grow">
              {children}
              <SanityLive />
              {(await draftMode()).isEnabled && (
                <>
                  <VisualEditing />
                  <DisableDraftMode />
                </>
              )}
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
