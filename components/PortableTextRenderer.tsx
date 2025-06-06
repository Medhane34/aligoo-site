"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || " "}
            width={800}
            height={400}
            className="rounded-md object-cover w-full"
          />
        </div>
      );
    },
    tip: ({ value }: any) => (
      <div className="rounded bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
        <strong className="block text-yellow-800">{value.title}</strong>
        <p>{value.body}</p>
      </div>
    ),
    code: ({ value }: any) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm my-4">
        <code>{value.code}</code>
      </pre>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside ml-5 my-2 text-base">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside ml-5 my-2 text-base">
        {children}
      </ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold my-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold my-4">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-600 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="my-2 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:underline dark:text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

const PortableTextRenderer = ({ value }: { value: any }) => {
  return <PortableText value={value} components={components} />;
};

export default PortableTextRenderer;
