// wrappers/FeaturedFbCaseStudiesWrappers.tsx
import { fetchFacebookadCasestudy } from "@/lib/CaseStudies";
import FeaturedFbWorkSection from "@/app/services/facebook-ad/FeaturedPosts";

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
};

type FetchFbCaseProps = {
  fbcasestudyPosts: CaseStudy[];
};

export default async function FeaturedFbCaseStudiesWrappers() {
  // Log the raw result of the fetch
  const fetchResult = await fetchFacebookadCasestudy();

  // Assign to fbcasestudyPosts and log immediately
  const fbcasestudyPosts = fetchResult;

  // Log the type and length checks explicitly

  if (!Array.isArray(fbcasestudyPosts) || fbcasestudyPosts.length === 0) {
    return <div>No case study available.</div>;
  }

  return <FeaturedFbWorkSection fbcasestudyPosts={fbcasestudyPosts} />;
}