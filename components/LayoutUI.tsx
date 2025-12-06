'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/ui/navbar-copy";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import MouseMoveEffect from "@/components/atoms/mouse-move-effect";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ChatSupportWidget from './molecules/ChatSupport';

export default function LayoutUI({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Check if the current path starts with /proposal
    const isProposalPage = pathname?.startsWith('/proposal');

    if (isProposalPage) {
        return (
            <LanguageProvider>
                <main className="grow min-h-screen bg-background">
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
                    {children}
                    <SpeedInsights />
                    <ChatSupportWidget />
                </main>
            </LanguageProvider>
            <Footer />
        </div>
    );
}
