"use client";

import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

import dynamic from "next/dynamic";

const ChatSupportWidget = dynamic(() => import("./molecules/ChatSupport"), {
  ssr: false,
});
const MouseMoveEffect = dynamic(() => import("./atoms/mouse-move-effect"), {
  ssr: false,
});

const LanguagePrompt = dynamic(() => import("@/components/LanguagePrompt"), {
  ssr: false,
});

import { Navbar } from "@/components/ui/navbar-copy";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

export default function LayoutUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if the current path starts with /proposal
  const isProposalPage = pathname?.startsWith("/proposal");
  const isMaintenancePage = pathname?.startsWith("/maintenance");

  if (isProposalPage || isMaintenancePage) {
    return (
      <LanguageProvider>
        <main className="grow min-h-screen bg-background">
          <LanguagePrompt />
          {children}
          <SpeedInsights />
        </main>
      </LanguageProvider>
    );
  }

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <LanguageProvider>
        <main className="pt-16 grow">
          <MouseMoveEffect />
          <LanguagePrompt />
          {children}
          <SpeedInsights />
          <ChatSupportWidget />
        </main>
      </LanguageProvider>
      <Footer />
    </div>
  );
}
