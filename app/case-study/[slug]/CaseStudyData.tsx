// src/sanity/queries.ts (Your existing file)
import { client } from "@/src/sanity/client";
import type { SanityDocument } from "next-sanity";
import {
  CaseStudyCoreData,
  CaseStudyOverviewData,
  CaseStudyGoalData,
  StrategyBlock,
  CaseStudyStrategyData,
  GalleryImageItem,
  CaseStudyImageGalleryData,
  ResultStatItem,
  CaseStudyResultsData,
  CaseStudyTestimonialData,
  PaginationCaseStudy,
  CaseStudyPaginationData
} from "@/types/CaseStudyTypes";



// --- FETCH FUNCTIONS ---

// This is for the coreData, description and hero image from will be used for hersection
export async function fetchCaseStudyCoreDataBySlug(
  slug: string,
): Promise<CaseStudyCoreData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      service->{name},
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    return {
      title: data.title,
      slug: data.slug,
      publishedAt: data.publishedAt,
      excerpt: data.excerpt,
      service: data.service,
      mainImage: data.mainImage,
      mainImageAlt: data.mainImageAlt,
    };
  } catch (error) {
    console.error(`Error fetching core data for slug "${slug}":`, error);

    return null;
  }
}
// Fetch Overview Section Data

export async function fetchCaseStudyOverviewBySlug(
  slug: string,
): Promise<CaseStudyOverviewData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      overviewTitle,
      "overviewDescription": pt::text(overviewDescription), // <-- IMPORTANT CHANGE HERE
      "heroImageUrl": heroImageUrl.asset->url,
      "heroImageAlt": heroImageUrl.alt,
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) {
      return null;
    }

    const overviewData: CaseStudyOverviewData = {
      overviewTitle: data.overviewTitle,
      overviewDescription: data.overviewDescription,
      heroImageUrl: data.heroImageUrl,
      heroImageAlt: data.heroImageAlt,
    };

    return overviewData;
  } catch (error) {
    console.error(
      `Error fetching case study overview for slug "${slug}":`,
      error,
    );

    return null;
  }
}

// Fetch Goal Section Data
export async function fetchCaseStudyGoalDataBySlug(
  slug: string,
): Promise<CaseStudyGoalData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      goalTitle,
      "goalBody": pt::text(goalBody),
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    return {
      goalTitle: data.goalTitle,
      goalBody: data.goalBody,
    };
  } catch (error) {
    console.error(`Error fetching goal data for slug "${slug}":`, error);

    return null;
  }
}

// NEW: Fetch Strategy Section Data (Precise based on your schema definition)
export async function fetchCaseStudyStrategyDataBySlug(
  slug: string,
): Promise<CaseStudyStrategyData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      strategyIntroHeading,
      "strategyIntroBody": pt::text(strategyIntroBody), // Handle potential null if empty
      // Select each block's fields directly, and alias them to match StrategyBlock type
      "strategyBlock1": {
        "heading": strategyBlock1Heading,
        "body": pt::text(strategyBlock1Body),
        "imageUrl": strategyBlock1Image.asset->url,
        "imageAlt": strategyBlock1Image.alt,
      },
      "strategyBlock2": {
        "heading": strategyBlock2Heading,
        "body": pt::text(strategyBlock2Body),
        "imageUrl": strategyBlock2Image.asset->url,
        "imageAlt": strategyBlock2Image.alt,
      },
      "strategyBlock3": {
        "heading": strategyBlock3Heading,
        "body": pt::text(strategyBlock3Body),
        "imageUrl": strategyBlock3Image.asset->url,
        "imageAlt": strategyBlock3Image.alt,
      },
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    // Map fetched data to the CaseStudyStrategyData type
    return {
      strategyIntroHeading: data.strategyIntroHeading || "", // Provide fallback for string
      strategyIntroBody: data.strategyIntroBody || "", // Provide fallback for string, as it returned null
      strategyBlock1: data.strategyBlock1
        ? {
            heading: data.strategyBlock1.heading,
            body: data.strategyBlock1.body,
            imageUrl: data.strategyBlock1.imageUrl,
            imageAlt: data.strategyBlock1.imageAlt,
          }
        : undefined,
      strategyBlock2: data.strategyBlock2
        ? {
            heading: data.strategyBlock2.heading,
            body: data.strategyBlock2.body,
            imageUrl: data.strategyBlock2.imageUrl,
            imageAlt: data.strategyBlock2.imageAlt,
          }
        : undefined,
      strategyBlock3: data.strategyBlock3
        ? {
            heading: data.strategyBlock3.heading,
            body: data.strategyBlock3.body,
            imageUrl: data.strategyBlock3.imageUrl,
            imageAlt: data.strategyBlock3.imageAlt,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error fetching strategy data for slug "${slug}":`, error);

    return null;
  }
}

export async function fetchCaseStudyImageGalleryDataBySlug(
  slug: string,
): Promise<CaseStudyImageGalleryData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      galleryHeading,
      galleryDescription,
      "galleryImage1": galleryImage1{
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        caption,
      },
      "galleryImage2": galleryImage2{
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        caption,
      },
      "galleryImage3": galleryImage3{
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        caption,
      },
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    return {
      galleryHeading: data.galleryHeading || "", // Ensure it's a string, even if empty in Sanity
      galleryDescription: data.galleryDescription || "", // Ensure it's a string
      galleryImage1: data.galleryImage1
        ? {
            imageUrl: data.galleryImage1.imageUrl,
            imageAlt: data.galleryImage1.imageAlt,
            caption: data.galleryImage1.caption,
          }
        : undefined,
      galleryImage2: data.galleryImage2
        ? {
            imageUrl: data.galleryImage2.imageUrl,
            imageAlt: data.galleryImage2.imageAlt,
            caption: data.galleryImage2.caption,
          }
        : undefined,
      galleryImage3: data.galleryImage3
        ? {
            imageUrl: data.galleryImage3.imageUrl,
            imageAlt: data.galleryImage3.imageAlt,
            caption: data.galleryImage3.caption,
          }
        : undefined,
    };
  } catch (error) {
    console.error(
      `Error fetching image gallery data for slug "${slug}":`,
      error,
    );

    return null;
  }
}

export async function fetchCaseStudyResultsDataBySlug(
  slug: string,
): Promise<CaseStudyResultsData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      resultsHeading,
      "resultsBody": pt::text(resultsBody), // Converts Portable Text to plain string
      "resultsStat1": resultsStat1{
        value,
        label,
        description,
      },
      "resultsStat2": resultsStat2{
        value,
        label,
        description,
      },
      "resultsStat3": resultsStat3{
        value,
        label,
        description,
      },
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    return {
      resultsHeading: data.resultsHeading || "",
      resultsBody: data.resultsBody || "", // Provide fallback for string
      resultsStat1: data.resultsStat1
        ? {
            value: data.resultsStat1.value,
            label: data.resultsStat1.label,
            description: data.resultsStat1.description || undefined, // Ensure undefined if null/empty
          }
        : undefined,
      resultsStat2: data.resultsStat2
        ? {
            value: data.resultsStat2.value,
            label: data.resultsStat2.label,
            description: data.resultsStat2.description || undefined,
          }
        : undefined,
      resultsStat3: data.resultsStat3
        ? {
            value: data.resultsStat3.value,
            label: data.resultsStat3.label,
            description: data.resultsStat3.description || undefined,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error fetching results data for slug "${slug}":`, error);

    return null;
  }
}

export async function fetchCaseStudyTestimonialDataBySlug(
  slug: string,
): Promise<CaseStudyTestimonialData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      "testimonialQuote": pt::text(testimonialQuote), // Converts Portable Text to plain string
      testimonialAuthorName,
      testimonialAuthorPosition,
      rating
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null;

    return {
      testimonialQuote: data.testimonialQuote || "", // Provide fallback for string
      testimonialAuthorName: data.testimonialAuthorName || "",
      testimonialAuthorPosition: data.testimonialAuthorPosition || "",
      rating: data.rating || "",
    };
  } catch (error) {
    console.error(`Error fetching testimonial data for slug "${slug}":`, error);

    return null;
  }
}

export async function fetchCaseStudyPaginationDataBySlug(
  slug: string,
): Promise<CaseStudyPaginationData | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0]{
      _id,
      order, // Get the order of the current case study
      // Fetch the previous case study
      "previousCaseStudy": *[_type == "caseStudy" && order < ^.order] | order(order desc) [0]{
        title,
        "slug": slug.current,
      },
      // Fetch the next case study
      "nextCaseStudy": *[_type == "caseStudy" && order > ^.order] | order(order asc) [0]{
        title,
        "slug": slug.current,
      }
    }
  `;

  try {
    const data = await client.fetch<SanityDocument>(query, { slug });

    if (!data) return null; // Current case study not found

    return {
      previousCaseStudy: data.previousCaseStudy
        ? {
            title: data.previousCaseStudy.title,
            slug: data.previousCaseStudy.slug,
          }
        : undefined,
      nextCaseStudy: data.nextCaseStudy
        ? {
            title: data.nextCaseStudy.title,
            slug: data.nextCaseStudy.slug,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error fetching pagination data for slug "${slug}":`, error);

    return null;
  }
}
// (Keep your existing fetchCaseStudies function for the listing page)
// ...
