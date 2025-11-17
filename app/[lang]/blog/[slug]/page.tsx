// app/[lang]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import ClientToc from "./ClientToc";
import { fetchBlogPostBySlug, fetchRelatedPosts } from "@/lib/BlogPost";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import RelatedPosts from "@/components/organism/blog/RelatedPosts";
import { Lang } from "@/types/BlogPost";
import { generateToc } from "@/lib/utilties/generateToc";

// Correct props type for Next.js 15+
interface BlogPostPageProps {
  params: Promise<{ lang: Lang; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Must await params!
  const { lang, slug } = await params;

  const post = await fetchBlogPostBySlug(slug, lang);

  if (!post) notFound();

  const toc = generateToc(post.body);
  const related = await fetchRelatedPosts(slug, lang);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        {/* Main Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <time className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString(lang === "am" ? "en-ET" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <PortableTextRenderer value={post.body} />
        </article>

        {/* Sidebar: TOC */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <ClientToc toc={toc} />
        </aside>
      </div>

      <RelatedPosts lang={lang} posts={related} />
    </div>
  );
}