import { client } from "@/src/sanity/client";
import { FEATURED_CASE_STUDY_QUERY, INDUSTRIES_SECTION_QUERY } from "@/sanity/queries/works";

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