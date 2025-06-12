// wrappers/FeaturedPostsWrapper.tsx
import { fetchFacebookadCasestudy } from "@/lib/CaseStudies";
import FeaturedPostsSection from "@/components/service-sections/FeaturedPosts";

export default async function FeaturedFbPostsWrapper() {
  const posts = await fetchFacebookadCasestudy();

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No featured posts available.</div>;
  }

  return (
    <FeaturedPostsSection
      posts={posts}
      heading="Real Campaigns. Real Wins."
      subheading="See How We’ve Turned Scrolls Into Sales"
    />
  );
}
