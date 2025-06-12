// Import all necessary fetch functions and types from your queries file
import { notFound } from "next/navigation"; // Import notFound for 404 handling

import CaseStudyStrategy from "../CaseStudyStrategy";

// Import types for better type safety

// Import your UI components
import CaseStudyStrategyContent from "../CaseStudyStrategyContent";
import CaseStudyImageGallery from "../CaseStudyImageGallery";
import CaseStudyResults from "../CaseStudyResults";
import CaseStudyTestimonial from "../CaseStudyTestimonial";
import CaseStudyPagination from "../CaseStudyPagination";
import CaseStudyOverview from "../OverviewSection";
import HeroSection from "../HeroSection";
// Adjust the import path as necessary
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

// app/case-studies/[slug]/page.tsx

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyDetails({ params }: Props) {
  const { slug } = await params;

  // Fetch only the data we need for now
  const [
    coreData,
    overviewData,
    goalData, // Fetch the strategy data
    strategyData,
    imageGalleryData,
    resultsData,
    testimonialData,
    fetchedPaginationData,
  ] = await Promise.all([
    fetchCaseStudyCoreDataBySlug(slug),
    fetchCaseStudyOverviewBySlug(slug),
    fetchCaseStudyGoalDataBySlug(slug), // Call the strategy data fetcher
    fetchCaseStudyStrategyDataBySlug(slug),
    fetchCaseStudyImageGalleryDataBySlug(slug),
    fetchCaseStudyResultsDataBySlug(slug),
    fetchCaseStudyTestimonialDataBySlug(slug),
    fetchCaseStudyPaginationDataBySlug(slug),
  ]);

  // If the core data is not found, show a 404 page
  if (!coreData) {
    notFound();
  }
  // Ensure paginationData is always an object, even if fetch returned null

  return (
    <>
      <HeroSection
        headlineText1= {coreData.title}
        headlineText2=" "
        headlineText3 =" "
        excerpt={coreData.excerpt}
        primaryButtonText="hello"
        primaryButtonUrl="hello"
        secondaryButtonText= "Learn More"
        secondaryButtonUrl="url"
      />
      <ScrollProgress />
      {/* HeroSection: If this is part of OverviewSection, remove it. If it's a standalone
          component that takes specific props (like an image from coreData), pass them.
          For now, I'm commenting it out as it's often integrated into the main overview component. */}
      {/* <HeroSection /> */}

      {/* Overview Section */}
      {overviewData && (
        <CaseStudyOverview
          // title is from coreData, description and hero image from overviewData
          heroImageAlt={overviewData.heroImageAlt}
          heroImageUrl={overviewData.heroImageUrl}
          overviewDescription={overviewData.overviewDescription}
          overviewTitle={overviewData.overviewTitle}
        />
      )}

      {/* Strategy Heading Section */}
      {goalData && (
        <CaseStudyStrategy
          goalBody={goalData.goalBody}
          goalTitle={goalData.goalTitle}
        />
      )}
      {/* 3. Strategy Content Section */}
      {/* Render CaseStudyStrategyContent only if strategyData is available */}
      {strategyData && (
        <CaseStudyStrategyContent
          strategyData={strategyData} // <-- NEW: Pass the fetched strategyData here
        />
      )}

      {/* Image Gallery Section */}
      {/* Render CaseStudyImageGallery only if imageGalleryData is available */}
      {imageGalleryData && (
        <CaseStudyImageGallery
          imageGalleryData={imageGalleryData} // <-- NEW: Pass the fetched imageGalleryData here
        />
      )}

      {/* Render CaseStudyResults only if resultsData is available */}
      {resultsData && (
        <CaseStudyResults
          resultsData={resultsData} // <-- NEW: Pass the fetched resultsData here
        />
      )}
      {/* Testimonial Section */}
      {/* Render CaseStudyTestimonial only if testimonialData is available */}
      {testimonialData && (
        <CaseStudyTestimonial
          testimonialData={testimonialData} // <-- NEW: Pass the fetched testimonialData here
          rating={testimonialData.rating}        />
      )}
      {/* Pagination Section */}
      {/* Render CaseStudyPagination only if fetchedPaginationData is available */}
      {fetchedPaginationData && (
        <CaseStudyPagination paginationData={fetchedPaginationData} />
      )}
    </>
  );
}
