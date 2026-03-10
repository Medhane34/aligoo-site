import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import Script from "next/script";
/* import { ClerkProvider } from "@clerk/nextjs";
 */
import { Providers } from "./providers";

import { ToastProvider } from "@/components/providers/ToastProvider";
import { fontSans } from "@/config/fonts";
/* import { Navbar } from "@/components/navbar"; */
// import Footer from "@/components/Footer"; // Moved to LayoutUI
import LayoutUI from "@/components/LayoutUI";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/src/sanity/live";
import ClientLanguagePrompt from "@/components/ClientLanguagePrompt";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// import { Navbar } from "@/components/ui/navbar-copy"; // Moved to LayoutUI
// import MouseMoveEffect from "@/components/atoms/mouse-move-effect"; // Moved to LayoutUI

export const metadata: Metadata = {
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

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const lang = headerList.get("x-locale") || "en";

  return (
    <html suppressHydrationWarning className="root" lang={lang}>
      <head>
        {/* Google Analytics - Deferred */}
        {/*  <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RRB6DKZPQ9"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RRB6DKZPQ9');
          `}
        </Script> */}
      </head>

      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased m-0",
          fontSans.variable,
        )}
      >
        <Providers>
          <ToastProvider>
            <LayoutUI>
              <GoogleAnalytics />
              {children}
            </LayoutUI>
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
            <SanityLive />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
