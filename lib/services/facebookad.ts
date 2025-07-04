import { client } from "@/src/sanity/client";
import { AD_PHILOSOPHY_SECTION_QUERY,  FAQ_SECTION_QUERY,  WHO_THIS_IS_FOR_SECTION_QUERY,  WHY_SERVICE_WORKS_SECTION_QUERY } from "@/sanity/queries/services";

export type Stat = { value: string; label: string; };

export type WhyServiceWorksSectionData = {
  heading_en: string;
  heading_am: string;
  highlight_en: string;
  highlight_am: string;
  paragraph1_en: string;
  paragraph1_am: string;
  paragraph2_en: string;
  paragraph2_am: string;
  stats_en: Stat[];
  stats_am: Stat[];
};

export async function fetchWhyServiceWorksSection(name: "whyServiceWorksSection-Fb"): Promise<WhyServiceWorksSectionData | null> {
  return await client.fetch(WHY_SERVICE_WORKS_SECTION_QUERY, { name });
}

// Facebook Ad process Section 

export type AdPhilosophyStep = {
  title: string;
  description: string;
  color: string;
};

export type AdPhilosophySectionData = {
  heading_en: string;
  heading_am: string;
  accentText_en: string;
  accentText_am: string;
  steps_en: AdPhilosophyStep[];
  steps_am: AdPhilosophyStep[];
  bottomHeading_en: string;
  bottomHeading_am: string;
  bottomText_en: string;
  bottomText_am: string;
};

export async function fetchAdPhilosophySection(name: string): Promise<AdPhilosophySectionData | null> {
  return await client.fetch(AD_PHILOSOPHY_SECTION_QUERY, { name });
}

// who this for 

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
  return await client.fetch(WHO_THIS_IS_FOR_SECTION_QUERY, { name });
}

//FAQ SECTION 

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
  return await client.fetch(FAQ_SECTION_QUERY, { name });
}