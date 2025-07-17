import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "@/lib/BlogPost";
import { generateToc } from "@/lib/utilties/generateToc";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import TableOfContents from "@/components/TableOfContents";
import { Image } from "@heroui/image";
import Link from "next/link";

export const revalidate = 60; // Rebuild every minute

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) return notFound();

  const toc = generateToc(post.body);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-8">
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
        <TableOfContents toc={toc} />
        <article className="prose prose-lg max-w-none mx-auto text-body text-text-light dark:text-white px-2">
          {Array.isArray(post.body) && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </main>
  );
}
