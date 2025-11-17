// components/organism/blog/RelatedPosts.tsx
import BlogCard from "@/components/molecules/blog/BlogCard";
import { BlogPostListItem, Lang } from "@/types/BlogPost";

interface Props {
  posts: BlogPostListItem[];
  lang: Lang;
}

export default function RelatedPosts({ posts, lang }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogCard key={post._id} {...post} lang={lang} />
        ))}
      </div>
    </section>
  );
}