// wrappers/FeaturedWebDesignPostsWrapper.tsx
import { fetchWebdesignCaseStudy, fetchSectionHeadingBlockWEB } from "@/lib/CaseStudies";
import FeaturedPostsSection from "@/components/service-sections/FeaturedPosts";

export default async function FeaturedWebDesignPostsWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const posts = await fetchWebdesignCaseStudy();
  const headingBlock = await fetchSectionHeadingBlockWEB("featuredPostsheading-web");

 if (!headingBlock || !Array.isArray(posts) || posts.length === 0) {
    return <div>No featured posts available.</div>;
  }
  return (
    <FeaturedPostsSection
      heading={lang === "am" ? headingBlock.heading_am : headingBlock.heading_en}
      subheading={lang === "am" ? headingBlock.subheading_am : headingBlock.subheading_en}
      posts={posts}
        />
  );
}
