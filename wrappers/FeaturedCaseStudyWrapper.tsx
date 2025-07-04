// wrappers/FetchCaseStudiesWrapper.tsx
import { fetchFeaturedCaseStudy } from "@/lib/CaseStudies";
import FetchCaseStudies from "@/app/[lang]/works/Featured";

export default async function FetchCaseStudiesWrapper() {
  const featured = await fetchFeaturedCaseStudy();

  if (!featured) {
    return <div>No featured case study available.</div>;
  }

  return <FetchCaseStudies featured={featured} />;
}