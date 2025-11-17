import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "@/lib/BlogPost";
import { generateToc } from "@/lib/utilties/generateToc";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import TableOfContents from "@/components/TableOfContents";
import { useActiveTocId } from "@/hooks/useActiveTocId";
import { Image } from "@heroui/image";
import Link from "next/link";

export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) return notFound();

  const toc = generateToc(post.body);

  // The TOC and scroll spy must be rendered on the client
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* Left: TOC (sticky, only on desktop) */}
        <div className="hidden lg:block w-60 flex-shrink-0">
          <ClientToc toc={toc} />
        </div>
        {/* Right: Main content */}
        <div className="flex-1 flex flex-col gap-8">
          {post.imageUrl && (
            <Image
              isZoomed
              src={post.imageUrl}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl shadow"
              width={900}
              height={400}
            />
          )}
          <header className="flex flex-col items-center text-center gap-2">
            <h1 className="text-heading font-bold text-text-light dark:text-text-dark">{post.title}</h1>
            <div className="text-body text-gray-500">
              Published:{" "}
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : "—"}
            </div>
          </header>
          {/* TOC for mobile (optional) */}
          <div className="lg:hidden mb-8">
            <TableOfContents toc={toc} />
          </div>
          <article className="prose prose-lg max-w-none mx-auto text-body text-text-light dark:text-white px-2">
            {Array.isArray(post.body) && <PortableTextRenderer value={post.body} />}
          </article>
        </div>
      </div>
    </main>
  );
}

// Client-only TOC with scroll spy
import dynamic from "next/dynamic";
const ClientToc = dynamic(() => import("./ClientToc"), { ssr: true });
