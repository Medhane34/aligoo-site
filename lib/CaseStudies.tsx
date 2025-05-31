// lib/caseStudies.ts
import type { SanityDocument } from "next-sanity";
import { client } from "@/src/sanity/client";
import {
  caseStudiesQuery,
  fbCaseStudyQuery,
  featuredCaseStudyQuery,
  HomeCaseStudyQuery
} from "@/sanity/queries/caseStudies";

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
};

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    const rawData = await client.fetch<SanityDocument[]>(caseStudiesQuery);

    return rawData.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug,
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

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

export async function fetchFacebookadCasestudy(): Promise<CaseStudy[]> {
  try {
    // Fetch the data as an array of SanityDocument
    const fbposts = await client.fetch<SanityDocument[]>(fbCaseStudyQuery);
    console.log("fetchFacebookadCasestudy raw data:", fbposts);

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
      service: post.service,
      slug: post.slug,
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
    const homeworks = await client.fetch<SanityDocument[]>(caseStudiesQuery);

    return homeworks.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug,
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}