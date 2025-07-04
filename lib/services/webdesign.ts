import { client } from "@/src/sanity/client";
import { CTA_SECTION_QUERY_WEB, HERO_SECTION_QUERY_WEB, OUR_PROCESS_SECTION_QUERY } from "@/sanity/queries/services";

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
  return await client.fetch(HERO_SECTION_QUERY_WEB, { name });
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
  return await client.fetch(OUR_PROCESS_SECTION_QUERY, { name });
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
  return await client.fetch(CTA_SECTION_QUERY_WEB, { name });
}