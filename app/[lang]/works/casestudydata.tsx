import { client } from "@/src/sanity/client";
import type { SanityDocument } from "next-sanity";

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string
};

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const query = `
    *[_type == "caseStudy"] | order(_createdAt desc)[0...6] {
  _id,
  title,
  "imageUrl": mainImage.asset->url,
  "service": service->title,
  "slug": slug.current,
  "hasImage": defined(mainImage),
  "hasService": defined(service)
  }
  `;

  try {
    const rawData = await client.fetch<SanityDocument[]>(query);
    return rawData.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      service: post.service,
      slug: post.slug, // <-- Map the fetched slug to your type
      hasImage: post.hasImage || false,
      hasService: post.hasService || false,
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

export async function fetchFeaturedCaseStudy(): Promise<CaseStudy | null> {
  const query = `
    *[_type == "caseStudy" && tag == "Featured"][0] {
      _id,
      title,
      "imageUrl": mainImage.asset->url,
      "service": service->title,
      "slug": slug.current,
      "hasImage": defined(mainImage),
      "hasService": defined(service)
    }
  `;

  try {
    const post = await client.fetch<SanityDocument>(query);

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