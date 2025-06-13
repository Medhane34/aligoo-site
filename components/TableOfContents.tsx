// components/TableOfContents.tsx
import React from "react";
import { TocItem, getHeadingId } from "@/lib/utilties/generateToc";

type Props = { toc: TocItem[] };

export default function TableOfContents({ toc }: Props) {
  return (
    <nav className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg p-4 mb-8">
      <h2 className="font-bold text-heading mb-2 ">Table of contents</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li key={item.id} className="flex items-center">
            <span className="mr-2 text-text-light">➔</span>
            <a
              href={`#${item.id}`}
              className="hover:underline text-body"
              style={{ marginLeft: (item.level - 2) * 16 }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
