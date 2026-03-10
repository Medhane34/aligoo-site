// src/lib/about.ts

import { client } from "@/src/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/about";

// ────────────────────────────────────────────────
// Existing types (Intro + Values) – no change
export type AboutIntroSectionData = {
  mainHeading: string;
  introText: string;
  founded: string;
  focus: string;
  campaignsLaunched: string;
  momentsProudOf: string;
};

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
  buttonText?: string;
  buttonUrl?: string;
  values: ValueCard[];
};

// ────────────────────────────────────────────────
// New type for Our Way section
export type OurWaySectionData = {
  tabProblem: string;
  tabOurWay: string;
  problemHeadline: string;
  problemText: string;
  problemPoints: string[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  ourWayPoints: {
    number: string;
    heading: string;
    description: string;
  }[];
  imageProblemUrl?: string;
  imageOurWay1Url?: string;
  imageOurWay2Url?: string;
};

export type MeaningSectionData = {
  mainHeading: string;
  pronunciation: string;
  definitionLines: string[];
  tagline: string;
  audioUrl?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  yearsOfExperience?: string;
  superpower?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  department?: string;
  departmentColor?: string;
  firstNameColor?: string;
  lastNameColor?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type TeamSectionData = {
  heading: string;
  subheading: string;
  members: TeamMember[];
};
// ────────────────────────────────────────────────
// Unified data type
export type AboutPageData = {
  intro: AboutIntroSectionData | null;
  values: ValuesSectionData | null;
  ourWay: OurWaySectionData | null;
  meaning: MeaningSectionData | null;
  team: TeamSectionData | null;
};

// ────────────────────────────────────────────────
// The single fetch function
export async function fetchAboutPageData(
  lang: "en" | "am" = "en",
): Promise<AboutPageData> {
  try {
    const data = await client.fetch<AboutPageData>(ABOUT_PAGE_QUERY, { lang });

    return {
      intro: data.intro && data.intro.mainHeading ? data.intro : null,
      values: data.values && data.values.values?.length ? data.values : null,
      ourWay: data.ourWay && data.ourWay.tabProblem ? data.ourWay : null,
      meaning: data.meaning && data.meaning.mainHeading ? data.meaning : null,
      team: data.team && data.team.members?.length ? data.team : null,
    };
  } catch (err) {
    console.error("About page fetch failed:", err);

    return {
      intro: null,
      values: null,
      ourWay: null,
      meaning: null,
      team: null,
    };
  }
}
