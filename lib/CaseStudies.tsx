// lib/caseStudies.ts
import type { SanityDocument } from "next-sanity";
import { client } from "@/src/sanity/client";
import {
  caseStudiesQuery,
  fbCaseStudyQuery,
  featuredCaseStudyQuery,
  getTotalCaseStudiesCountQuery,
  HomeCaseStudyQuery,
  SECTION_HEADING_BLOCK_QUERY,
  wbCaseStudyQuery,
} from "@/sanity/queries/caseStudies";
import { CaseStudy } from "@/types/CaseStudyTypes";
import { SECTION_HEADING_BLOCK_QUERY_WEB } from "@/sanity/queries/services";

export type SectionHeadingBlockData = {
  heading_en: string;
  heading_am: string;
  subheading_en?: string;
  subheading_am?: string;
};

 export type SectionHeadingBlockDataWEB = {  
    heading_en: string;  
    heading_am: string;  
    subheading_en?: string;  
    subheading_am?: string;  
  }; 


// Helper to coerce all fields to the correct type
function mapToCaseStudy(post: any): CaseStudy {
  return {
    _id: String(post._id ?? ""),
    title: String(post.title ?? ""),
    goalsSummary: String(post.goalsSummary ?? ""),
    challengeSummary: String(post.challengeSummary ?? ""),
    industry: String(post.industry ?? ""),
    imageUrl: String(post.imageUrl ?? ""),
    service: String(post.service ?? ""),
    hasImage: Boolean(post.hasImage),
    hasService: Boolean(post.hasService),
    slug: String(post.slug ?? ""),
    excerpt: String(post.excerpt ?? ""),
    
  };
}
// function to fetch Sectionheading for Facebook Ad 
export async function fetchSectionHeadingBlock(name: string): Promise<SectionHeadingBlockData | null> {
  return await client.fetch(SECTION_HEADING_BLOCK_QUERY, { name });
}

// function to fetch sectionheading for web design 
export async function fetchSectionHeadingBlockWEB(name: string): Promise<SectionHeadingBlockDataWEB | null> {
  return await client.fetch(SECTION_HEADING_BLOCK_QUERY_WEB, { name });
}

export async function fetchCaseStudies(
  limit: number,
  offset: number
): Promise<CaseStudy[]> {
  try {
    const query = caseStudiesQuery(offset, offset + limit);
    const rawData = await client.fetch<SanityDocument[]>(query);
    return rawData.map(mapToCaseStudy);
  } catch (error) {
    console.error("Error fetching paginated case studies:", error);
    return [];
  }
}

export async function fetchTotalCaseStudiesCount(): Promise<number> {
  try {
    const count = await client.fetch<number>(getTotalCaseStudiesCountQuery);
    return count;
  } catch (error) {
    console.error("Error fetching total case studies count:", error);
    return 0;
  }
}

export async function fetchFeaturedCaseStudy(): Promise<CaseStudy | null> {
  try {
    const post = await client.fetch<SanityDocument>(featuredCaseStudyQuery);
    if (!post) return null;
    return mapToCaseStudy(post);
  } catch (error) {
    console.error("Error fetching featured case study:", error);
    return null;
  }
}

export async function fetchFacebookadCasestudy(): Promise<CaseStudy[]> {
  try {
    const fbposts = await client.fetch<SanityDocument[]>(fbCaseStudyQuery);
    if (!Array.isArray(fbposts) || fbposts.length === 0) {
      console.warn("No Facebook ad case studies found.");
      return [];
    }
    return fbposts.map(mapToCaseStudy);
  } catch (error) {
    console.error("Error fetching Facebook ad case studies:", error);
    return [];
  }
}

export async function fetchHomeCaseStudies(): Promise<CaseStudy[]> {
  try {
    const homeworks = await client.fetch<SanityDocument[]>(HomeCaseStudyQuery);
    return homeworks.map(mapToCaseStudy);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function fetchWebdesignCaseStudy(): Promise<CaseStudy[]> {
  try {
    const wbposts = await client.fetch<SanityDocument[]>(wbCaseStudyQuery);
    if (!Array.isArray(wbposts) || wbposts.length === 0) {
      console.warn("No Web Design case studies found.");
      return [];
    }
    return wbposts.map(mapToCaseStudy);
  } catch (error) {
    console.error("Error fetching Web Design case studies:", error);
    return [];
  }
}
