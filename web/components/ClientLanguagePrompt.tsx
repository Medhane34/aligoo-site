"use client";

import dynamic from "next/dynamic";

const LanguagePrompt = dynamic(() => import("@/components/LanguagePrompt"), {
    ssr: false,
});

export default function ClientLanguagePrompt() {
    return <LanguagePrompt />;
}