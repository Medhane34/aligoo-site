// components/sections/BlogListSection.tsx
"use client";
import { useState, useEffect } from "react";
// Using a simpler "Load more" pagination for dynamic behavior
import { BlogPost } from "@/types/BlogPost";
import BlogCard from "@/components/molecules/blog/BlogCard";
import CategoryFilter from "@/components/molecules/blog/CategoryFilter";
import { fetchBlogPosts, fetchTotalBlogPostsCount } from "@/lib/BlogPost"; // Import fetchBlogPosts and fetchTotalBlogPostsCount

const POSTS_PER_PAGE = 6;

interface Props {
  initialPosts: BlogPost[];
  initialTotalCount: number; // Renamed for clarity
  lang: "en" | "am";
}

export default function BlogListSection({ initialPosts, initialTotalCount, lang }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [totalPostsCount, setTotalPostsCount] = useState(initialTotalCount); // State for dynamic total count

  // totalPages no longer used with Load more pattern

  const loadPage = async (page: number, category?: string) => {
    setLoading(true);
    // Debug: log category coming from the UI to ensure correct slug is passed
    // eslint-disable-next-line no-console
    console.log("loadPage called with category:", category, "page:", page);
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const newPosts = await fetchBlogPosts(start, end, lang, category);
    // replace or append depending on caller
    setPosts((prev) => (page === 1 ? newPosts : [...prev, ...newPosts]));
    setLoading(false);
  };

  useEffect(() => {
    const updatePostsAndCount = async () => {
      setLoading(true);
      // Fetch new total count for the selected category
      const newTotalCount = await fetchTotalBlogPostsCount(lang, selectedCategory);
      setTotalPostsCount(newTotalCount);

      // Load the first page of posts for the new category
      await loadPage(1, selectedCategory);
      setCurrentPage(1); // Reset to first page when category changes
      setLoading(false);
    };

    updatePostsAndCount();
  }, [selectedCategory, lang]);

  // numbered page change handler removed; using Load more button

  // Removed numbered pagination renderItem; using simpler Load more pattern below

  return (
    <section className="py-12">
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 h-fit">
<CategoryFilter lang={lang} onFilter={setSelectedCategory} />        </aside>

        <div className="flex flex-col">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-t-lg" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post._id} {...post} lang={lang} showCategory={!selectedCategory} />
                ))}
              </div>

              {posts.length < totalPostsCount && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={async () => {
                      const next = currentPage + 1;
                      setCurrentPage(next);
                      await loadPage(next, selectedCategory);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={loading}
                    className="px-6 py-3 bg-brand-primary text-white rounded-md hover:brightness-95 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : `Load more (${Math.max(0, totalPostsCount - posts.length)})`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}