// components/PortableTextRenderer.tsx
"use client";
import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/src/sanity/client";
// If you want to use a HeroUI icon, import it here. Example:
import { CheckIcon } from "@heroicons/react/24/solid";

import { getHeadingId } from "@/lib/utilties/generateToc";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

 
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?._ref
        ? urlFor(value).width(900).height(500).fit("max").auto("format").url()
        : value?.asset?.url || "";
      return imageUrl ? (
        <div className="my-8 rounded-xl overflow-hidden">
          <Image
            alt={value.alt || "Blog post image"}
            className="rounded-xl object-cover w-full"
            height={500}
            priority={false}
            sizes="(max-width: 900px) 100vw, 900px"
            src={imageUrl}
            width={900}
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-500 text-center mt-2">{value.caption}</figcaption>
          )}
        </div>
      ) : null;
    },
    tip: ({ value }) => (
      <aside className="rounded bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
        <strong className="block text-yellow-800">{value.title}</strong>
        <p className="text-body">{value.body}</p>
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
      <ul className="ml-5 my-2 text-body space-y-2">
        {/* children are already <li> elements */}
        {React.Children.map(children, (child) =>
          // Clone each <li> to inject the icon or emoji
          React.isValidElement(child)
            ? React.cloneElement(child, {
                className: (child.props.className ?? "") + " flex items-start gap-2",
                children: (
                  <>
                    {/* Use HeroUI CheckIcon or emoji */}
                    {/* <CheckIcon className="w-5 h-5 text-green-500 mt-1" /> */}
                    <span className="text-lg mt-0.5">✅</span>
                    <span>{child.props.children}</span>
                  </>
                ),
              })
            : child
        )}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside ml-5 my-2 text-body">{children}</ol>
    ),
  },
  block: {
    h1: ({ children, value }) => (

      <h1 
       className="text-heading text-3xl font-bold my-6"
      id={getHeadingId(value)}>{children}</h1>
    ),
    h2: ({ children, value }) => (
      <h2 
      className="text-heading text-2xl font-semibold my-5"
      id={getHeadingId(value)}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 
      className="text-heading text-xl font-semibold my-4"
      id={getHeadingId(value)}>{children}</h3>
    ),
    h4: ({ children, value }) => (
      <h4 
      className="text-heading text-lg font-semibold my-3"
      id={getHeadingId(value)}>{children}</h4>
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
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),
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

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ value }) => {
  return <PortableText components={components} value={value} />;
};

export default PortableTextRenderer;
