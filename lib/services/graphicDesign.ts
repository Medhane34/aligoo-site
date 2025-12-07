import { client } from "@/src/sanity/client";
import {
    CTA_SECTION_QUERY_GRAPHIC,
    FAQ_SECTION_QUERY_GRAPHIC,
    HERO_SECTION_QUERY_GRAPHIC,
    OUR_PROCESS_SECTION_QUERY_GRAPHIC,
    WHO_THIS_IS_FOR_SECTION_QUERY_GRAPHIC,
    WHY_GRAPHIC_WORKS_SECTION_QUERY,
} from "@/sanity/queries/services/graphicDesign";

// --- Hero Section ---
export type HeroSectionData = {
    badgeText_en?: string;
    badgeText_am?: string;
    headlineText1_en: string;
    headlineText1_am: string;
    headlineText2_en: string;
    headlineText2_am: string;
    headlineText3_en?: string;
    headlineText3_am?: string;
    subheading_en: string;
    subheading_am: string;
    primaryButtonText_en: string;
    primaryButtonText_am: string;
    primaryButtonUrl: string;
    secondaryButtonText_en: string;
    secondaryButtonText_am: string;
    secondaryButtonUrl: string;
};

export async function fetchHeroSection(name: string): Promise<HeroSectionData | null> {
    return await client.fetch(HERO_SECTION_QUERY_GRAPHIC, { name });
}

// --- Why Graphic Works ---
export type Feature = {
    emoji: string;
    title: string;
    description: string;
};

export type WhyGraphicWorksSectionData = {
    heading_en: string;
    heading_am: string;
    subheading_en?: string;
    subheading_am?: string;
    features_en: Feature[];
    features_am: Feature[];
};

export async function fetchWhyGraphicWorksSection(name: string): Promise<WhyGraphicWorksSectionData | null> {
    return await client.fetch(WHY_GRAPHIC_WORKS_SECTION_QUERY, { name });
}

// --- Our Process ---
export type ProcessStep = {
    id: number;
    title: string;
    description: string;
};

export type OurProcessSectionData = {
    heading_en: string;
    heading_am: string;
    subheading_en?: string;
    subheading_am?: string;
    steps_en: ProcessStep[];
    steps_am: ProcessStep[];
};

export async function fetchOurProcessSection(name: string): Promise<OurProcessSectionData | null> {
    return await client.fetch(OUR_PROCESS_SECTION_QUERY_GRAPHIC, { name });
}

// --- Who This Is For ---
export type WhoThisIsForSectionData = {
    heading_en: string;
    heading_am: string;
    subheading_en?: string;
    subheading_am?: string;
    introText_en?: string;
    introText_am?: string;
    highlightedPhrases_en: string[];
    highlightedPhrases_am: string[];
    outroText_en?: string;
    outroText_am?: string;
};

export async function fetchWhoThisIsForSection(name: string): Promise<WhoThisIsForSectionData | null> {
    return await client.fetch(WHO_THIS_IS_FOR_SECTION_QUERY_GRAPHIC, { name });
}

// --- FAQ ---
export type FaqItem = {
    question: string;
    answer: string;
};

export type FaqSectionData = {
    eyebrow_en?: string;
    eyebrow_am?: string;
    heading_en: string;
    heading_am: string;
    subheading_en?: string;
    subheading_am?: string;
    ctaText_en?: string;
    ctaText_am?: string;
    ctaHref_en?: string;
    ctaHref_am?: string;
    faqs_en: FaqItem[];
    faqs_am: FaqItem[];
};

export async function fetchFaqSection(name: string): Promise<FaqSectionData | null> {
    return await client.fetch(FAQ_SECTION_QUERY_GRAPHIC, { name });
}

// --- CTA ---
export type CTASectionData = {
    heading_en: string;
    heading_am: string;
    subheading_en: string;
    subheading_am: string;
    primaryButtonText_en: string;
    primaryButtonText_am: string;
    primaryButtonUrl: string;
    secondaryButtonText_en: string;
    secondaryButtonText_am: string;
    secondaryButtonUrl: string;
};

export async function fetchCTASection(name: string): Promise<CTASectionData | null> {
    return await client.fetch(CTA_SECTION_QUERY_GRAPHIC, { name });
}
