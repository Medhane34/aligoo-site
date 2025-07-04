import { client } from "@/src/sanity/client";
import { CTA_SECTION_QUERY_TIKTOK, FAQ_SECTION_QUERY_TIKTOK, HERO_SECTION_QUERY_TIKTOK, OUR_PROCESS_SECTION_QUERY_TIKTOK, WHO_THIS_IS_FOR_SECTION_QUERY_TIKTOK, WHY_SERVICE_WORKS_SECTION_QUERY_TIKTOK} from "@/sanity/queries/services";

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
  return await client.fetch(HERO_SECTION_QUERY_TIKTOK, { name });
}


// why tiktok ad 

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
export async function fetchWhyServiceWorksSection(name: string): Promise<WhyServiceWorksSectionData | null> {
  return await client.fetch(WHY_SERVICE_WORKS_SECTION_QUERY_TIKTOK, { name });
}

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
  imageSrc_en?: string;
  imageAlt_en?: string;
  imageSrc_am?: string;
  imageAlt_am?: string;
  steps_en: ProcessStep[];
  steps_am: ProcessStep[];
};

export async function fetchOurProcessSection(name: string): Promise<OurProcessSectionData | null> {
  return await client.fetch(OUR_PROCESS_SECTION_QUERY_TIKTOK, { name });
}

export type WhoThisIsForSectionDataTikTok = {
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

export async function fetchWhoThisIsForSectionTikTok(name: string): Promise<WhoThisIsForSectionDataTikTok | null> {
  return await client.fetch(WHO_THIS_IS_FOR_SECTION_QUERY_TIKTOK, { name });
}


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
  return await client.fetch(FAQ_SECTION_QUERY_TIKTOK, { name });
}

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
  return await client.fetch(CTA_SECTION_QUERY_TIKTOK, { name });
}

