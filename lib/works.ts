import { client } from "@/src/sanity/client";
import { FEATURED_CASE_STUDY_QUERY, INDUSTRIES_SECTION_QUERY } from "@/sanity/queries/works";
import { HERO_SECTION_QUERY_HOMEPAGE } from "@/sanity/queries/homepage";


// Hero Section 

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
   console.log("Fetching hero section for name:", name); // <-- Add this line

  return await client.fetch(HERO_SECTION_QUERY_HOMEPAGE, { name });
}
export type FeaturedCaseStudyData = {
  title_en: string;
  title_am: string;
  excerpt_en: string;
  excerpt_am: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
};

export async function fetchFeaturedCaseStudy(): Promise<FeaturedCaseStudyData | null> {
  return await client.fetch(FEATURED_CASE_STUDY_QUERY);
}


export type Industry = {
  name: string;
  emoji: string;
};

export type IndustriesSectionData = {
  sectionHeading_en: string;
  sectionHeading_am: string;
  accentText_en: string;
  accentText_am: string;
  industries_en: Industry[];
  industries_am: Industry[];
};

export async function fetchIndustriesSection(): Promise<IndustriesSectionData | null> {
  const data = await client.fetch(INDUSTRIES_SECTION_QUERY);
  if (!data) return null;
  return {
    ...data,
    industries_en: data.industries_en ?? [],
    industries_am: data.industries_am ?? [],
  };
}