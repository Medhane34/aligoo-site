import { client } from "@/src/sanity/client";
import { ABOUT_INTRO_SECTION_QUERY, MEANING_SECTION_QUERY, OUR_WAY_QUERY, TEAM_SECTION_QUERY, VALUES_SECTION_QUERY } from "@/sanity/queries/about";

export type AboutIntroSectionData = {
  mainHeading: string
  introText: string
  founded: string
  focus: string
  campaignsLaunched: string
  momentsProudOf: string
}

export async function fetchAboutIntroSection(
  lang: 'en' | 'am' = 'en'
): Promise<AboutIntroSectionData | null> {
  const query = ABOUT_INTRO_SECTION_QUERY(lang)
  const data = await client.fetch<AboutIntroSectionData>(query)

  // Only return if all required fields exist
  if (!data?.mainHeading || !data?.introText) return null

  return data
}

// value section 

export type ValueCard = {
  emoji: string
  title: string
  description: string
  bgColor: string
  textColor?: string
}

export type ValuesSectionData = {
  sectionHeading: string
  accentText: string
  buttonText: string
  buttonUrl: string
  values: ValueCard[]
}

export async function fetchValuesSection(
  lang: 'en' | 'am' = 'en'
): Promise<ValuesSectionData | null> {
  const query = VALUES_SECTION_QUERY(lang)
  const data = await client.fetch<ValuesSectionData>(query)

  if (!data?.sectionHeading || !data?.values?.length) return null

  return data
}

// team section 

export type TeamMember = {
  name: string
  role: string
  bio: string
  department?: string
  departmentColor?: string
  firstNameColor?: string
  lastNameColor?: string
  imageUrl?: string
  imageAlt?: string
}

export type TeamSectionData = {
  heading: string
  subheading: string
  members: TeamMember[]
}

export async function fetchTeamSection(lang: 'en' | 'am' = 'en'): Promise<TeamSectionData | null> {
  const data = await client.fetch<TeamSectionData>(TEAM_SECTION_QUERY(lang))
  if (!data?.members?.length) return null
  return data
}

// pronunciation section 

export type MeaningSectionData = {
  mainHeading: string
  pronunciation: string
  definitionLines: string[]
  tagline: string
  audioUrl?: string
}

export async function fetchMeaningSection(lang: 'en' | 'am' = 'en'): Promise<MeaningSectionData | null> {
  const data = await client.fetch<MeaningSectionData>(MEANING_SECTION_QUERY(lang))
  if (!data?.mainHeading) return null
  return data
}

//our way section 

// lib/sanity.ts

export type OurWaySectionData = {
  tabProblem: string
  tabOurWay: string
  problemHeadline: string
  problemText: string
  problemPoints: string[]
  testimonialQuote: string
  testimonialAuthor: string
  testimonialRole: string
  ourWayPoints: {
    number: string
    heading: string
    description: string
  }[]
  imageProblemUrl?: string
  imageOurWay1Url?: string
  imageOurWay2Url?: string
}


export async function fetchOurWaySection(lang: 'en' | 'am' = 'en'): Promise<OurWaySectionData | null> {
  const data = await client.fetch<OurWaySectionData>(OUR_WAY_QUERY(lang))
  if (!data) return null
  return data
}