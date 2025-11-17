// app/home/BlogSection.tsx
import BlogSectionClient from "./BlogSectionClient";
import { fetchLatestBlogs } from "@/lib/BlogPost";
import { Lang } from "@/types/BlogPost";

interface BlogSectionProps {
  lang: Lang;
}

export default async function BlogSection({ lang }: BlogSectionProps) {
  const blogs = await fetchLatestBlogs(lang);
  const normalizedBlogs = blogs.map(blog => ({ ...blog, imageUrl: blog.imageUrl ?? "" }));

  return (
    <div className="max-w-full overflow-x-hidden py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4">
        <BlogSectionClient blogs={normalizedBlogs} lang={lang} />
      </div>
    </div>
  );
}
