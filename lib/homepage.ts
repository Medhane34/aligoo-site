import { client } from "@/src/sanity/client";
import { ABOUT_US_SECTION_QUERY, CTA_SECTION_QUERY, HERO_SECTION_QUERY_HOMEPAGE, PROCESS_SECTION_QUERY, SERVICE_SECTION_QUERY, STATS_SECTION_QUERY, WHY_US_SECTION_QUERY } from "@/sanity/queries/homepage";

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

export async function fetchHeroSection(name:string): Promise<HeroSectionData | null> {
  return await client.fetch(HERO_SECTION_QUERY_HOMEPAGE, { name });
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

/* export type Stat = {
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
} */
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

export async function fetchStatsSection(lang: 'en' | 'am' = 'en'): Promise<StatsSectionData | null> {
  const query = STATS_SECTION_QUERY(lang);
  const raw = await client.fetch<any>(query);

  if (!raw) {
    return null;
  }

  const data: StatsSectionData = {
    stats: raw.stats || [],
    footerText: raw[`footerText_${lang}`] || "CREATIVE POSSIBILITIES",
  };

  return data;
}

// service section 

/* export type Service = {
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
} */

  // lib/homepage.ts (update this function only)
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

export async function fetchServiceSection(lang: 'en' | 'am' = 'en'): Promise<ServiceSectionData | null> {
  const query = SERVICE_SECTION_QUERY(lang);
  const raw = await client.fetch<any>(query);

  console.log(`\n[fetchServiceSection] LANG: '${lang}'`);
  console.log("Raw GROQ Response:", JSON.stringify(raw, null, 2));
  console.log("Columns Count:", raw?.columns?.length);
  console.log("First Column Title:", raw?.columns?.[0]?.title);
  console.log("First Service Sample:", raw?.columns?.[0]?.services?.[0]);
  console.log("First Icon URL:", raw?.columns?.[0]?.services?.[0]?.iconUrl);

  if (!raw) {
    console.warn("[fetchServiceSection] No data found");
    return null;
  }

  const data: ServiceSectionData = {
    sectionHeading: raw[`sectionHeading_${lang}`] || "Our Services",
    accentText: raw[`accentText_${lang}`] || "What we offer",
    columns: raw.columns || [],
  };

  console.log("Final Mapped Data:", JSON.stringify(data, null, 2));
  return data;
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

export async function fetchProcessSection(lang: 'en' | 'am' = 'en'): Promise<ProcessSectionData | null> {
  const query = PROCESS_SECTION_QUERY(lang);
  const raw = await client.fetch<any>(query);

  if (!raw) {
    return null;
  }

  const data: ProcessSectionData = {
    sectionHeading: raw[`sectionHeading_${lang}`] || "Our Process",
    accentText: raw[`accentText_${lang}`] || "How we deliver",
    steps: raw.steps || [],
  };

  console.log("Final Mapped Data:", JSON.stringify(data, null, 2));
  return data;
}

/* export type WhyUsReason = {
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
} */

  export type WhyUsReason = {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  span?: string;
};

export type WhyUsSectionData = {
  sectionHeading: string;
  accentText: string;
  reasons: WhyUsReason[];
};

export async function fetchWhyUsSection(lang: 'en' | 'am' = 'en'): Promise<WhyUsSectionData | null> {
  const query = WHY_US_SECTION_QUERY(lang); // Call function
  const raw = await client.fetch<any>(query);

/*   console.log(`[fetchWhyUsSection] Raw data for lang '${lang}':`, raw);
 */
  if (!raw) return null;

  return {
    sectionHeading: raw[`sectionHeading_${lang}`] || "Default Heading",
    accentText: raw[`accentText_${lang}`] || "Default Accent",
    reasons: raw.reasons || [],
  };
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