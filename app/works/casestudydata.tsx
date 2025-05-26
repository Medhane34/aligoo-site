import { client } from "@/src/sanity/client";
import type { SanityDocument } from "next-sanity";


type CaseStudy = {
  _id: string;
  title: string;
  stats: string[];
 imageUrl: string;
  service: string;
};

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const query = `
    *[_type == "caseStudy"] | order(_createdAt desc)[0...6] {
      _id,
      title,
      stats,
      "imageUrl": mainImage.asset->url,
      "service": service->title,
      "slug": slug.current
    }
  `;

  try {
    const rawData = await client.fetch<SanityDocument[]>(query);
    return rawData.map((post) => ({
      _id: post._id,
      title: post.title,
      stats: post.stats,
      imageUrl: post.imageUrl,
      service: post.service, 
      slug: post.slug // <-- Map the fetched slug to your type
    }));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}