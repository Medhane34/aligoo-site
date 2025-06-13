// lib/caseStudies.ts
import type { SanityDocument } from "next-sanity";
import { client } from "@/src/sanity/client";
import {
  caseStudiesQuery,
  fbCaseStudyQuery,
  featuredCaseStudyQuery,
  getTotalCaseStudiesCountQuery,
  HomeCaseStudyQuery,
  wbCaseStudyQuery
  
} from "@/sanity/queries/caseStudies";

import { CaseStudy } from "@/types/CaseStudyTypes";


export async function fetchCaseStudies(
  limit: number,
  offset: number
): Promise<CaseStudy[]> {
  try {
    const query = caseStudiesQuery(offset, offset + limit); // Calculate start and end based on limit and offset
    const rawData = await client.fetch<SanityDocument[]>(query);

    return rawData.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug,
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
      stats: post.stats || null, // Ensure stats is handled if it's part of your schema
    }));
  } catch (error) {
    console.error("Error fetching paginated case studies:", error);

    return [];
  }
}

// New function to fetch the total count
export async function fetchTotalCaseStudiesCount(): Promise<number> {
  try {
    const count = await client.fetch<number>(getTotalCaseStudiesCountQuery);

    return count;
  } catch (error) {
    console.error("Error fetching total case studies count:", error);

    return 0; // Return 0 if there's an error
  }
}

//fetchesFeatured Case Study 
export async function fetchFeaturedCaseStudy(): Promise<CaseStudy | null> {
  try {
    const post = await client.fetch<SanityDocument>(featuredCaseStudyQuery);

    if (!post) return null;

    return {
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug,
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    };
  } catch (error) {
    console.error("Error fetching featured case study:", error);

    return null;
  }
}
//fetches fb caseStudy 
export async function fetchFacebookadCasestudy(): Promise<CaseStudy[]> {
  try {
    // Fetch the data as an array of SanityDocument
    const fbposts = await client.fetch<SanityDocument[]>(fbCaseStudyQuery);
    

    // Check if the result is an array and has data
    if (!Array.isArray(fbposts) || fbposts.length === 0) {
      console.warn("No Facebook ad case studies found.");

      return [];
    }

    // Map the array of posts to CaseStudy objects
    return fbposts.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      industry: post.industry,
      slug: post.slug,
      service: post.service, 
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching Facebook ad case studies:", error);

    return [];
  }
}



export async function fetchHomeCaseStudies(): Promise<CaseStudy[]> {
  try {
    const homeworks = await client.fetch<SanityDocument[]>(HomeCaseStudyQuery);

    return homeworks.map((post) => ({
      _id: post._id,
      title: post.title,
      goalsSummary: post.goalsSummary, 
      challengeSummary: post.challengeSummary, 
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug,
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);

    return [];

    ;
  }
}

export async function fetchWebdesignCaseStudy():Promise<CaseStudy[]> {
 try {
   // Fetch the data as an array of SanityDocument
    const wbposts = await client.fetch<SanityDocument[]>(wbCaseStudyQuery);
    
    // Check if the result is an array and has data
    if (!Array.isArray(wbposts) || wbposts.length === 0) {
      console.warn("No Web Design case studies found.");

      return [];
    }

  // Map the array of posts to CaseStudy objects
    return wbposts.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      industry: post.industry,
      slug: post.slug,
      service: post.service, 
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching Facebook ad case studies:", error);

    return [];
  }
}