// app/case-studies/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/src/sanity/client";
import CaseStudyStrategy from "../CaseStudyStrategy";
import CaseStudyStrategyContent from "../CaseStudyStrategyContent";
import CaseStudyImageGallery from "../CaseStudyImageGallery";
import CaseStudyResults from "../CaseStudyResults";
import CaseStudyTestimonial from "../CaseStudyTestimonial";
import CaseStudyPagination from "../CaseStudyPagination";
import CaseStudyOverview from "../OverviewSection";
import HeroSection from "../HeroSection";
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
import Container from "@/components/ui/Container";

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
      <HeroSection
        headlineText1={coreData.title}
        headlineText2=" "
        headlineText3=" "
        excerpt={coreData.excerpt}
        primaryButtonText="📖 Read Case Study"
        primaryButtonUrl="#case-study-details"
        secondaryButtonText="✅ Talk about your project"
        secondaryButtonUrl="/strategy-session"
      />
      <ScrollProgress />

      <Container className="">
        <div className="div" id="case-study-details">
          {overviewData && (
            <CaseStudyOverview
              heroImageAlt={overviewData.heroImageAlt}
              heroImageUrl={overviewData.heroImageUrl}
              overviewDescription={overviewData.overviewDescription}
              overviewTitle={overviewData.overviewTitle}
            />
          )}
        </div>
      </Container>
      <Container>
        {goalData && (
          <CaseStudyStrategy
            goalBody={goalData.goalBody}
            goalTitle={goalData.goalTitle}
          />
        )}
      </Container>
      <Container>
        {strategyData && (
          <CaseStudyStrategyContent strategyData={strategyData} />
        )}
      </Container>
      <Container>
        {imageGalleryData && (
          <CaseStudyImageGallery imageGalleryData={imageGalleryData} />
        )}
      </Container>
      <Container>
        {resultsData && <CaseStudyResults resultsData={resultsData} />}
        {testimonialData && (
          <CaseStudyTestimonial
            testimonialData={testimonialData}
            rating={testimonialData.rating}
          />
        )}
      </Container>

      {fetchedPaginationData && (
        <CaseStudyPagination paginationData={fetchedPaginationData} />
      )}
    </>
  );
}
