// wrappers/FeaturedWebDesignPostsWrapper.tsx
import { fetchWebdesignCaseStudy } from "@/lib/CaseStudies";
import FeaturedPostsSection from "@/components/service-sections/FeaturedPosts";

export default async function FeaturedWebDesignPostsWrapper() {
  const posts = await fetchWebdesignCaseStudy();

  return (
    <FeaturedPostsSection
      posts={posts}
      heading="Designed for Results"
      subheading="How We Turned Sites Into Sales Machines"
    />
  );
}
