export interface CaseStudy {
  _id: string;
  title: string;
  goalsSummary: string;
  challengeSummary: string;
  industry: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
  excerpt: string;
}

export interface CaseStudyCoreData {
  title: string;
  industry: string;
  slug: string; // The full slug path, e.g., "/case-studies/my-slug"
  publishedAt: string; // ISO date string
  excerpt: string; // Short description or excerpt
  service: {
    name: string; // Service name, e.g., "Facebook Ads"
  };
  mainImage?: string; // URL of the main image asset
  mainImageAlt?: string; // Alt text for the main image
}

export interface CaseStudyOverviewData {
  overviewTitle: string;
  // This type will now be a string because of pt::text() in the query
  overviewDescription: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

export interface CaseStudyGoalData {
  goalTitle: string;
  goalBody: string; // pt::text() will make this a string
}
// Type for a single Strategy Block
export interface StrategyBlock {
  heading: string; // Will come from strategyBlockXHeading
  body: string; // Will come from strategyBlockXBody (after pt::text)
  imageUrl?: string; // Will come from strategyBlockXImage.asset->url
  imageAlt?: string; // Will come from strategyBlockXImage.alt
}

// CaseStudyStrategyData type now correctly reflects the top-level structure
export interface CaseStudyStrategyData {
  strategyIntroHeading: string;
  strategyIntroBody: string; // Will be string after pt::text() conversion
  strategyBlock1?: StrategyBlock; // Now an optional StrategyBlock object
  strategyBlock2?: StrategyBlock;
  strategyBlock3?: StrategyBlock;
}

// Type for a Gallery Image Item

export interface GalleryImageItem {
  imageUrl: string; // URL of the image asset
  imageAlt: string; // Alt text for the image
  caption: string; // Caption for the image
}

// Type for the entire Image Gallery Section data
export interface CaseStudyImageGalleryData {
  galleryHeading: string;
  galleryDescription: string;
  galleryImage1?: GalleryImageItem; // Optional, as Sanity allows fields to be empty
  galleryImage2?: GalleryImageItem;
  galleryImage3?: GalleryImageItem;
}

// Type for a single Results Stat block
export interface ResultStatItem {
  value: string; // e.g., "18.2x"
  label: string; // e.g., "Return on Ad Spend (ROAS)"
  description?: string; // Optional, as validation allows max(200) but not required()
}

// Type for the entire Results Section data
export interface CaseStudyResultsData {
  resultsHeading: string;
  resultsBody: string; // Will be string after pt::text() conversion from Portable Text
  resultsStat1?: ResultStatItem; // Optional, as Sanity allows fields to be empty
  resultsStat2?: ResultStatItem;
  resultsStat3?: ResultStatItem;
}

export interface CaseStudyTestimonialData {
  testimonialQuote: string; // Will be string after pt::text() conversion from Portable Text
  testimonialAuthorName: string;
  testimonialAuthorPosition: string;
  rating: number;
}

export interface PaginationCaseStudy {
  title: string;
  slug: string; // The full slug path, e.g., "/case-studies/my-slug"
}

// Type for the entire Pagination section data
export interface CaseStudyPaginationData {
  previousCaseStudy?: PaginationCaseStudy; // Optional if there's no previous
  nextCaseStudy?: PaginationCaseStudy; // Optional if there's no next
};

// Component prop types
export type FetchCaseStudiesProps = {
  featured: CaseStudy;
};

export type CaseStudyOverviewProps = {
  overviewData: CaseStudyOverviewData;
};

export type CaseStudyTestimonialProps = {
  testimonialData: CaseStudyTestimonialData;
};