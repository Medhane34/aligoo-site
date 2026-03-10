// lib/seo.ts
import { type Metadata } from "next";

const BASE_URL = "https://aligoo-digital.agency";

export function createPageMetadata({
    pathnameWithoutLang,
    currentLang,
    title,
    description,
    canonicalOverride,
    keywords,
    otherLangUrl,           // NEW: optional — full URL of the translated version if it exists
}: {
    pathnameWithoutLang: string; // e.g. "/about", "/services/seo", "/blog/my-slug", "/"
    currentLang: "en" | "am";
    title: string;
    description: string;
    canonicalOverride?: string;
    keywords?: string[];
    otherLangUrl?: string;     // e.g. "https://aligoo-digital.agency/am/blog/my-slug"
}): Metadata {
    // All pages (including homepage) use /{lang}/pathname
    // The root "/" redirects to "/en" via app/page.tsx
    const enPath = pathnameWithoutLang === "/" ? "/en" : `/en${pathnameWithoutLang}`;
    const amPath = pathnameWithoutLang === "/" ? "/am" : `/am${pathnameWithoutLang}`;

    const currentPath = currentLang === "am" ? amPath : enPath;

    const canonical = canonicalOverride ?? `${BASE_URL}${currentPath}`;

    // Build language alternates
    const languages: Record<string, string> = {
        "en": `${BASE_URL}${enPath}`,
        "am": `${BASE_URL}${amPath}`,
        "x-default": `${BASE_URL}${enPath}`,      // English as global fallback
    };

    // If a real translated URL exists (e.g. from Sanity fetch), override the default
    if (otherLangUrl) {
        if (currentLang === "en") {
            languages["am"] = otherLangUrl;
            languages["am-et"] = otherLangUrl;
        } else {
            languages["en"] = otherLangUrl;
        }
    }

    return {
        title,
        description,
        ...(keywords ? { keywords } : {}),
        alternates: {
            canonical,
            languages,
        },
    };
}