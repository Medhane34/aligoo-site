// components/LanguagePromptWrapper.tsx
'use client';  // ← This makes it a Client Component

import dynamic from 'next/dynamic';

// Dynamically import the real component, with ssr: false
const LanguagePrompt = dynamic(() => import('@/components/LanguagePrompt'), {
    ssr: false,           // Now allowed here!
    loading: () => null,  // Optional: hide during load, or show a spinner/skeleton
    // You can add suspense fallback if needed later
});

export default function LanguagePromptWrapper() {
    return <LanguagePrompt />;
}