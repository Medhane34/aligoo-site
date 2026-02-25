// app/case-studies/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyStrategy from "../CaseStudyStrategy";
import CaseStudyStrategyContent from "../CaseStudyStrategyContent";
import CaseStudyImageGallery from "../CaseStudyImageGallery";
import CaseStudyResults from "../CaseStudyResults";
import CaseStudyTestimonial from "../CaseStudyTestimonial";
import CaseStudyPagination from "../CaseStudyPagination";
import CaseStudyOverview from "../OverviewSection";
// import HeroSection from "../HeroSection"; // Removed generic hero
import CaseStudyHero from "../CaseStudyHero";
// import ProjectMetaSidebar from "../ProjectMetaSidebar"; // Removed Sidebar
import CaseStudyCredits from "../CaseStudyCredits";

import {
  fetchCaseStudyCoreDataBySlug,
  fetchCaseStudyOverviewBySlug,
  fetchCaseStudyGoalDataBySlug,
  fetchCaseStudyStrategyDataBySlug,
  fetchCaseStudyImageGalleryDataBySlug,
  fetchCaseStudyResultsDataBySlug,
  fetchCaseStudyTestimonialDataBySlug,
  fetchCaseStudyPaginationDataBySlug,
} from "./CaseStudyData";
import ScrollProgress from "./ScrollProgress";

import { client } from "@/src/sanity/client";

// --- CHANGED: Await params in generateMetadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // <-- Await the params Promise

  const caseStudy: any = await client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      description,
      slug,
      mainImage{asset->{url}}
    }`,
    { slug },
  );

  if (!caseStudy) return notFound();

  return {
    title: `${caseStudy.title} | Aligoo Digital Agency Case Study`,
    description:
      caseStudy.description ||
      "Read this case study from Aligoo Digital Agency.",
    keywords: [
      "case study",
      "digital marketing",
      "Aligoo",
      "Ethiopia",
      "Addis Ababa",
      ...(caseStudy.title ? caseStudy.title.split(" ") : []),
    ],
    alternates: {
      canonical: `https://aligoo-digital.agency/case-study/${slug}`,
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      url: `https://aligoo-digital.agency/case-study/${slug}`,
      type: "article",
      images: caseStudy.mainImage?.asset?.url
        ? [
            {
              url: caseStudy.mainImage.asset.url,
              width: 1200,
              height: 630,
              alt: caseStudy.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.description,
      images: caseStudy.mainImage?.asset?.url
        ? [caseStudy.mainImage.asset.url]
        : [],
    },
  };
}

// --- CHANGED: Await params in the page component ---
interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Rebuild every minute

export default async function CaseStudyDetails({ params }: Props) {
  const { slug } = await params; // <-- Await the params Promise

  // Fetch only the data we need for now
  const [
    coreData,
    overviewData,
    goalData,
    strategyData,
    imageGalleryData,
    resultsData,
    testimonialData,
    fetchedPaginationData,
  ] = await Promise.all([
    fetchCaseStudyCoreDataBySlug(slug),
    fetchCaseStudyOverviewBySlug(slug),
    fetchCaseStudyGoalDataBySlug(slug),
    fetchCaseStudyStrategyDataBySlug(slug),
    fetchCaseStudyImageGalleryDataBySlug(slug),
    fetchCaseStudyResultsDataBySlug(slug),
    fetchCaseStudyTestimonialDataBySlug(slug),
    fetchCaseStudyPaginationDataBySlug(slug),
  ]);

  if (!coreData) {
    notFound();
  }

  return (
    <>
      <CaseStudyHero
        liveSiteUrl={coreData.liveSiteUrl}
        mainImageUrl={coreData.mainImage}
        projectDuration={coreData.projectDuration}
        servicesList={coreData.servicesList}
        subtitle={coreData.service?.name}
        title={coreData.title}
      />
      <ScrollProgress />

      <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-24 space-y-24">
        {/* Overview */}
        <div id="case-study-details">
          {overviewData && (
            <CaseStudyOverview
              heroImageAlt={overviewData.heroImageAlt}
              heroImageUrl={overviewData.heroImageUrl}
              overviewDescription={overviewData.overviewDescription}
              overviewTitle={overviewData.overviewTitle}
            />
          )}
        </div>

        {/* Goals */}
        {goalData && (
          <CaseStudyStrategy
            goalBody={goalData.goalBody}
            goalTitle={goalData.goalTitle}
          />
        )}

        {/* Strategy Content */}
        {strategyData && (
          <CaseStudyStrategyContent strategyData={strategyData} />
        )}

        {/* Image Gallery */}
        {imageGalleryData && (
          <CaseStudyImageGallery imageGalleryData={imageGalleryData} />
        )}

        {/* Results */}
        {resultsData && <CaseStudyResults resultsData={resultsData} />}

        {/* Testimonial */}
        {testimonialData && (
          <CaseStudyTestimonial
            rating={testimonialData.rating}
            testimonialData={testimonialData}
          />
        )}

        {/* Credits & Tech Stack */}
        <CaseStudyCredits
          teamMembers={coreData.teamMembers}
          techStack={coreData.techStack}
        />
      </main>

      {fetchedPaginationData && (
        <CaseStudyPagination paginationData={fetchedPaginationData} />
      )}
    </>
  );
}
