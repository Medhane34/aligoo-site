import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
/* import { Navbar } from "@/components/navbar"; */
// import Footer from "@/components/Footer"; // Moved to LayoutUI
import LayoutUI from "@/components/LayoutUI";

/* import { VisualEditing } from "next-sanity"; */
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

import { SanityLive } from "@/src/sanity/live";

import Script from "next/script";

import { LanguageProvider } from "@/components/LanguageContext";
// import { Navbar } from "@/components/ui/navbar-copy"; // Moved to LayoutUI
// import MouseMoveEffect from "@/components/atoms/mouse-move-effect"; // Moved to LayoutUI
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import ChatSupportWidget from "@/components/molecules/ChatSupport";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en" className="root">
        <head>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-RRB6DKZPQ9"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RRB6DKZPQ9');
          `}
          </Script>
        </head>

        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased m-0",
            fontSans.variable,
          )}
        >
          <Providers >
            <LayoutUI>
              {children}
            </LayoutUI>
            <ChatSupportWidget />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
