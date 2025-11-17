// components/PortableTextRenderer.tsx
"use client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import YouTube from "react-youtube";
import { client } from "@/src/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const getHeadingId = (block: any): string => {
  if (!block || !block.children || !Array.isArray(block.children)) {
    return "";
  }
  const text = block.children
    .filter((child: any) => child._type === "span" && child.text)
    .map((span: any) => span.text)
    .join("");

  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, ""); // Remove all non-word chars
};

const getYouTubeId = (urlOrId: string): string | null => {
  if (/^[\w-]{11}$/.test(urlOrId)) return urlOrId;
  const match = urlOrId.match(/(?:v=|\/embed\/|\.be\/)([\w-]{11})/);

  return match ? match[1] : null;
};

const components: PortableTextComponents = {
  types: {
    youtubeVideo: ({ value }) => {
      const videoId = getYouTubeId(value?.url || "");

      if (!videoId) return null;

      return (
        <div className="my-8 flex flex-col items-center">
          <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
            <YouTube
              className="w-full h-full"
              opts={{ width: "100%", height: "100%" }}
              videoId={videoId}
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-400 text-center mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    markdownTable: ({ value }) => {
      if (!value?.markdown) return null;

      return (
        <div className="overflow-x-auto my-6">
          <div className="prose prose-sm md:prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value.markdown}
            </ReactMarkdown>
          </div>
        </div>
      );
    },
    image: ({ value }) => {
      const imageUrl = value?.asset?.url;

      if (!imageUrl) return null;

      return (
        <div className="my-8 rounded-xl overflow-hidden">
          <img
            alt={value.alt || "Blog post image"}
            className="rounded-xl object-cover w-full"
            height={500}
            src={imageUrl}
            style={{ maxWidth: "100%", height: "auto" }}
            width={900}
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-500 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </div>
      );
    },
    tip: ({ value }) => (
      <aside className="rounded bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
        <strong className="block text-yellow-800">{value.title}</strong>
        <p className="text-body text-violet">{value.body}</p>
      </aside>
    ),
    code: ({ value }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm my-4">
        <code>{value.code}</code>
      </pre>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 my-2 text-body space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside ml-5 my-2 text-body">
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children, value }) => (
      <h1
        className="text-heading text-3xl font-bold my-6 scroll-mt-28"
        id={getHeadingId(value)}
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2
        className="text-heading text-2xl font-semibold my-5 scroll-mt-28"
        id={getHeadingId(value)}
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        className="text-heading text-xl font-semibold my-4 scroll-mt-28"
        id={getHeadingId(value)}
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4
        className="text-heading text-lg font-semibold my-3 scroll-mt-28"
        id={getHeadingId(value)}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-600 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-body my-2 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => (
      <a
        className="text-blue-600 hover:underline dark:text-blue-400"
        href={value?.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
};

type PortableTextRendererProps = {
  value: any;
};

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  value,
}) => {
  return <PortableText components={components} value={value} />;
};

export default PortableTextRenderer;
