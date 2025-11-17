// wrappers/blog/BlogListSectionWrapper.tsx
import BlogListSection from "@/components/organism/blog/BlogListSection";
import { fetchBlogPosts, fetchTotalBlogPostsCount } from "@/lib/BlogPost";

export default async function BlogListSectionWrapper({ lang }: { lang: "en" | "am" }) {
  const [initialPosts, totalCount] = await Promise.all([
    fetchBlogPosts(0, 6, lang),
    fetchTotalBlogPostsCount(lang),
  ]);

  return <BlogListSection initialPosts={initialPosts} lang={lang} initialTotalCount={0} />;
}