// components/BlogSection.tsx
import BlogSectionClient from "./BlogSectionClient";
import { fetchLatestBlogs } from "@/lib/BlogPost";

export default async function BlogSection() {
  const blogs = await fetchLatestBlogs();

  return (
    <div className="max-w-full overflow-x-hidden py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4">
        <BlogSectionClient blogs={blogs} />
      </div>
    </div>
  );
}
