// wrappers/FeaturedPostsWrapper.tsx
import {
  fetchFacebookadCasestudy,
  fetchSectionHeadingBlock,
} from "@/lib/CaseStudies";
import FeaturedPostsSection from "@/components/service-sections/FeaturedPosts";

export default async function FeaturedFbPostsWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const headingBlock = await fetchSectionHeadingBlock(
    "featuredPostsSection-Fb",
  );

  if (!headingBlock) {
    return <div>No heading block data available.</div>;
  }

  const posts = await fetchFacebookadCasestudy();

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No featured posts available.</div>;
  }

  return (
    <FeaturedPostsSection
      heading={
        lang === "am" ? headingBlock.heading_am : headingBlock.heading_en
      }
      subheading={
        lang === "am" ? headingBlock.subheading_am : headingBlock.subheading_en
      }
      posts={posts}
    />
  );
}
