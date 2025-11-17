// components/TableOfContents.tsx
"use client";
import React from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
  activeId?: string;
}

export default function TableOfContents({
  toc,
  activeId,
}: TableOfContentsProps) {
  if (!toc || toc.length === 0) return null;
  console.log("TOC received activeId:", activeId);

  return (
    <nav className="hidden lg:block sticky top-28 self-start w-60 bg-background-light dark:bg-background-dark  pl-6 py-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg font-bold mb-4 text-brand-primary">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              className={`block transition-colors duration-200 pl-${(item.level - 2) * 4} ${
                activeId === item.id
                  ? "text-brand-primary font-semibold border-l-4 border-brand-primary bg-brand-primary/10"
                  : "text-gray-600 hover:text-brand-primary"
              } py-1 rounded`}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
