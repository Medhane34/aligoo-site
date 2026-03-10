// components/molecules/blog/CategoryFilter.tsx
"use client";
import { useState, useEffect } from "react";

import { fetchCategories } from "@/lib/BlogPost";
import { Category } from "@/types/BlogPost";

interface Props {
  lang: "en" | "am";
  onFilter: (slug: string | undefined) => void;
}

export default function CategoryFilter({ lang, onFilter }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    fetchCategories(lang).then(setCategories);
  }, [lang]);

  const toggle = (slug?: string) => {
    const newSlug = selected === slug ? undefined : slug;

    setSelected(newSlug);
    // Debug: log the slug toggled so we can trace UI actions
    // eslint-disable-next-line no-console
    console.log("[CategoryFilter] toggle ->", { clickedSlug: slug, newSlug });
    onFilter(newSlug);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Filter by Service</h3>
      <div className="space-y-2">
        {/* "All" option */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            checked={!selected}
            className="w-4 h-4 text-brand-primary rounded focus:ring-brand-primary"
            name="category"
            type="radio"
            onChange={() => toggle(undefined)}
          />
          <span className="text-sm">All Services</span>
        </label>

        {/* Categories */}
        {categories.map((cat) => (
          <label
            key={cat._id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              checked={selected === cat.slug}
              className="w-4 h-4 text-brand-primary rounded focus:ring-brand-primary"
              name="category"
              type="radio"
              onChange={() => toggle(cat.slug)}
            />
            <span className="text-sm">{cat.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
