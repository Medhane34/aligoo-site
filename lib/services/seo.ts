import { client } from "@/src/sanity/client";
import { HERO_SECTION_QUERY_SEO } from "@/sanity/queries/services";

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
  return await client.fetch(HERO_SECTION_QUERY_SEO, { name });
}
