import { client } from "@/src/sanity/client";
import { ABOUT_INTRO_SECTION_QUERY, VALUES_SECTION_QUERY } from "@/sanity/queries/about";

export type AboutIntroSectionData = {
  mainHeading: string;
  introText: string;
  founded: string;
  focus: string;
  campaignsLaunched: string;
  momentsProudOf: string;
};

export async function fetchAboutIntroSection(): Promise<AboutIntroSectionData | null> {
  return await client.fetch(ABOUT_INTRO_SECTION_QUERY);
}


export type ValueCard = {
  emoji: string;
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
};

export type ValuesSectionData = {
  sectionHeading: string;
  accentText: string;
  buttonText: string;
  buttonUrl: string;
  values: ValueCard[];
};

export async function fetchValuesSection(): Promise<ValuesSectionData | null> {
  return await client.fetch(VALUES_SECTION_QUERY);
}