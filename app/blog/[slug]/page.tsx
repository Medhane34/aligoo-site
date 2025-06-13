/* eslint-disable unused-imports/no-unused-imports */
import { Metadata } from "next";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Link from "next/link";
import { Image } from "@heroui/image";
import { ScrollShadow } from "@heroui/scroll-shadow";
import PortableTextRenderer, {
  getHeadingId,
} from "@/components/PortableTextRenderer";

import { generateToc } from "@/lib/utilties/generateToc";

import TableOfContents from "@/components/TableOfContents";
// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { client } from "@/src/sanity/client"; // Your Sanity client


import { notFound } from "next/navigation";


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch the post from Sanity (or your CMS)
  const post: BlogPost | null = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      slug,
      publishedAt,
      mainImage{asset->{url}}
    }`,
    { slug: params.slug }
  );

  if (!post) return notFound();

  return {
    title: `${post.title} | Aligoo Digital Agency Blog`,
    description:
      post.description || "Read this blog post from Aligoo Digital Agency.",
    keywords: [
      "digital marketing",
      "case study",
      "blog",
      "Aligoo",
      "Ethiopia",
      "Addis Ababa",
      ...(post.title ? post.title.split(" ") : []),
    ],
    alternates: {
      canonical: `https://aligoo-digital.agency/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://aligoo-digital.agency/blog/${params.slug}`,
      type: "article",
      images: post.mainImage?.asset?.url
        ? [
            {
              url: post.mainImage.asset.url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    },
  };
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: params.slug },
    options,
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(900).height(400).url()
    : null;

  const toc = generateToc(post.body);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:underline mb-2"
        >
          ← Back to posts
        </Link>
        {postImageUrl && (
          <Image
            isZoomed
            src={postImageUrl}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl shadow"
            width={900}
            height={400}
          />
        )}
        <header className="flex flex-col items-center text-center gap-2">
          <h1 className="text-heading font-bold">{post.title}</h1>
          <div className="text-body text-gray-500">
            Published:{" "}
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : "—"}
          </div>
        </header>

        {/* ScrollShadow wraps the article for scrollable content with shadow */}
        <ScrollShadow
          className="max-h-[70vh] overflow-auto rounded-xl"
          hideScrollBar
          size={32} // adjust shadow size as needed
        >
          <TableOfContents toc={toc} />
          <article className="prose prose-lg max-w-none mx-auto text-body text-text-light dark:text-white px-2">
            {Array.isArray(post.body) && (
              <PortableTextRenderer value={post.body} />
            )}
          </article>
        </ScrollShadow>
      </div>
    </main>
  );
}
