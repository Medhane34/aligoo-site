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
import { Lang } from "@/types/BlogPost";
import { DEFAULT_PROMOTIONAL_CARD } from "@/lib/constants/blogDefaults";

// Client-only TOC with scroll spy
const ClientToc = dynamic(() => import("./ClientToc"), { ssr: true });

export const revalidate = 60;

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug, lang } = await params;

  return {
    alternates: {
      canonical: `https://aligoo-digital.agency/${lang}/blog/${slug}`,
      languages: {
        en: `https://aligoo-digital.agency/en/blog/${slug}`,
        am: `https://aligoo-digital.agency/am/blog/${slug}`,
      },
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ lang: Lang; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;

  const post = await fetchBlogPostBySlug(slug, lang);

  if (!post) return notFound();

  // Fix: fetchRelatedPosts(currentSlug, categorySlug, lang)
  const relatedPosts = await fetchRelatedPosts(slug, post.category?.slug, lang);

  const toc = generateToc(post.body);

  // Default Promo Card Data
  const promoCard = post.promotionalCard?.heading
    ? post.promotionalCard
    : DEFAULT_PROMOTIONAL_CARD;

  // JSON-LD Schemas
  const baseUrl = "https://aligoo-digital.agency";
  const postUrl = `${baseUrl}/${lang}/blog/${slug}`;

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/${lang}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.imageUrl ? [post.imageUrl] : [],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt, // Add modified field if available in schema
    author: {
      "@type": "Person",
      name: post.author?.name || "Aligoo Digital Agency",
      url: baseUrl, // Link to author page if you have one
    },
    publisher: {
      "@type": "Organization",
      name: "Aligoo Digital Agency",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/aligoo_favicon.png`,
      },
    },
    description: post.excerpt,
  };

  let jsonLdFaq = null;

  if (post.faqs && post.faqs.length > 0) {
    jsonLdFaq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  // The TOC and scroll spy must be rendered on the client
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center py-12 px-4 relative">
      <ReadingProgress />

      {/* Structured Data (JSON-LD) */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        type="application/ld+json"
      />
      {jsonLdFaq && (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
          type="application/ld+json"
        />
      )}

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
                  ? new Date(post.publishedAt).toLocaleDateString(
                      lang === "am" ? "en-ET" : "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )
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
                  url={`https://aligoo.ethio-tech.com/${lang}/blog/${slug}`}
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

            <RelatedPosts lang={lang} posts={relatedPosts} />
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
