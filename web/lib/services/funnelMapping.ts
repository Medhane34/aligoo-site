import { client } from "@/src/sanity/client";
import {
  FAQ_SECTION_QUERY_FUNNEL,
  HERO_SECTION_QUERY_FUNNEL,
  OUR_PROCESS_SECTION_QUERY_FUNNEL,
  WHO_THIS_IS_FOR_SECTION_QUERY_FUNNEL,
  WHY_FUNNEL_WORKS_SECTION_QUERY,
} from "@/sanity/queries/services/funnelMapping";

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

export async function fetchHeroSection(
  name: string,
): Promise<HeroSectionData | null> {
  return await client.fetch(HERO_SECTION_QUERY_FUNNEL, { name });
}

// --- Why Funnel Works ---
export type Feature = {
  emoji: string;
  title: string;
  description: string;
};

export type WhyFunnelWorksSectionData = {
  heading_en: string;
  heading_am: string;
  subheading_en?: string;
  subheading_am?: string;
  features_en: Feature[];
  features_am: Feature[];
};

export async function fetchWhyFunnelWorksSection(
  name: string,
): Promise<WhyFunnelWorksSectionData | null> {
  return await client.fetch(WHY_FUNNEL_WORKS_SECTION_QUERY, { name });
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

export async function fetchOurProcessSection(
  name: string,
): Promise<OurProcessSectionData | null> {
  return await client.fetch(OUR_PROCESS_SECTION_QUERY_FUNNEL, { name });
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

export async function fetchWhoThisIsForSection(
  name: string,
): Promise<WhoThisIsForSectionData | null> {
  return await client.fetch(WHO_THIS_IS_FOR_SECTION_QUERY_FUNNEL, { name });
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

export async function fetchFaqSection(
  name: string,
): Promise<FaqSectionData | null> {
  return await client.fetch(FAQ_SECTION_QUERY_FUNNEL, { name });
}
