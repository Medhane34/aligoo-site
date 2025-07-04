import { client } from "@/src/sanity/client";
import { ABOUT_US_SECTION_QUERY, CTA_SECTION_QUERY, HERO_SECTION_QUERY, PROCESS_SECTION_QUERY, SERVICE_SECTION_QUERY, STATS_SECTION_QUERY, WHY_US_SECTION_QUERY } from "@/sanity/queries/homepage";

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

export async function fetchHeroSection(): Promise<HeroSectionData | null> {
  return await client.fetch(HERO_SECTION_QUERY);
}

/* // About us section function 
export type AboutUsSectionData = {
  sectionHeading: string;
  accentText: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  buttonUrl: string;
};

export async function fetchAboutUsSection(): Promise<AboutUsSectionData | null> {
  return await client.fetch(ABOUT_US_SECTION_QUERY);
} */

  export type AboutUsSectionData = {
  sectionHeading_en: string;
  sectionHeading_am: string;
  accentText_en: string;
  accentText_am: string;
  paragraphs_en: string[];
  paragraphs_am: string[];
  imageUrl: string;
  imageAlt: string;
  buttonText_en: string;
  buttonText_am: string;
  buttonUrl: string;
};

export async function fetchAboutUsSection(): Promise<AboutUsSectionData | null> {
  return await client.fetch(ABOUT_US_SECTION_QUERY);
}

// Stats Seciton 

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export type StatsSectionData = {
  stats: Stat[];
  footerText?: string;
};

export async function fetchStatsSection(): Promise<StatsSectionData | null> {
  return await client.fetch(STATS_SECTION_QUERY);
}

// service section 

export type Service = {
  title: string;
  description?: string;
  iconUrl?: string;
  link: string;
};

export type ServiceColumn = {
  title: string;
  description: string;
  services: Service[];
};

export type ServiceSectionData = {
  sectionHeading: string;
  accentText: string;
  columns: ServiceColumn[];
};

export async function fetchServiceSection(): Promise<ServiceSectionData | null> {
  return await client.fetch(SERVICE_SECTION_QUERY);
}

//our process 

export type ProcessStep = {
  icon: string;
  heading: string;
  description: string;
};

export type ProcessSectionData = {
  sectionHeading: string;
  accentText: string;
  steps: ProcessStep[];
};

export async function fetchProcessSection(): Promise<ProcessSectionData | null> {
  return await client.fetch(PROCESS_SECTION_QUERY);
}

export type WhyUsReason = {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
    span?: string; // <-- Add this line
};

export type WhyUsSectionData = {
  sectionHeading: string;
  accentText: string;
  reasons: WhyUsReason[];
};

export async function fetchWhyUsSection(): Promise<WhyUsSectionData | null> {
  return await client.fetch(WHY_US_SECTION_QUERY);
}

export type CTASectionData = {
  heading: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
};

export async function fetchCTASection(): Promise<CTASectionData | null> {
  return await client.fetch(CTA_SECTION_QUERY);
}