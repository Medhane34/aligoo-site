import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import { fetchBlogPostBySlug, fetchRelatedPosts } from "@/lib/BlogPost";
import { generateToc } from "@/lib/utilties/generateToc";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import PromotionalCard from "@/components/blog/PromotionalCard";
import { DEFAULT_PROMOTIONAL_CARD } from "@/lib/constants/blogDefaults";

export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const term = await params;
  const slug = term.slug;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) return notFound();

  const relatedPosts = await fetchRelatedPosts(slug, post.category?.slug);

  const toc = generateToc(post.body);

  // Default Promo Card Data
  const promoCard = post.promotionalCard?.heading
    ? post.promotionalCard
    : DEFAULT_PROMOTIONAL_CARD;

  // The TOC and scroll spy must be rendered on the client
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center py-12 px-4 relative">
      <ReadingProgress />

      <div className="w-full max-w-7xl flex flex-col gap-12">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 relative">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        fill
                        alt={post.author.name}
                        className="object-cover"
                        src={post.author.image}
                      />
                    </div>
                  )}
                  <span className="font-medium text-text-light dark:text-white">
                    {post.author.name}
                  </span>
                  <span className="text-gray-300">•</span>
                </div>
              )}

              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </span>

              {post.estimatedReadingTime && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{post.estimatedReadingTime} min read</span>
                </>
              )}

              {/* Share Button (Hover to reveal) */}
              <div className="ml-4 border-l pl-4 border-gray-300 dark:border-gray-700">
                <ShareButtons
                  title={post.title}
                  url={`https://aligoo.ethio-tech.com/blog/${slug}`}
                />
              </div>
            </div>
          </div>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}

          {post.imageUrl && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mt-4">
              <Image
                fill
                priority
                alt={post.title}
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
                src={post.imageUrl}
              />
            </div>
          )}
        </header>

        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Left: TOC (Sticky) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <ClientToc toc={toc} />
          </div>

          {/* Center: Content */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            {/* TOC for mobile */}
            <div className="lg:hidden">
              <TableOfContents toc={toc} />
            </div>

            <article className="prose prose-lg dark:prose-invert max-w-none text-body text-text-light dark:text-gray-200">
              {Array.isArray(post.body) && (
                <PortableTextRenderer value={post.body} />
              )}
            </article>

            {/* Author Bio Section */}
            {post.author && (
              <div className="w-full flex flex-col sm:flex-row gap-6 items-start mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                {post.author.image && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      fill
                      alt={post.author.name}
                      className="object-cover"
                      src={post.author.image}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-text-light dark:text-white">
                    Written by: {post.author.name}
                  </h3>
                  {post.author.bio && (
                    <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none">
                      <PortableTextRenderer value={post.author.bio} />
                    </div>
                  )}
                </div>
              </div>
            )}

            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Right: Promotional Card (Sticky) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <PromotionalCard
              buttonLink={promoCard.buttonLink}
              buttonText={promoCard.buttonText}
              description={promoCard.description}
              heading={promoCard.heading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// Client-only TOC with scroll spy
const ClientToc = dynamic(() => import("./ClientToc"), { ssr: true });
