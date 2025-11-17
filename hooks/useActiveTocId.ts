"use client";
import { useEffect, useState } from "react";
import type { TocItem } from "@/components/TableOfContents";

export function useActiveTocId(toc: TocItem[]) {
  const [activeId, setActiveId] = useState<string | undefined>(toc[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      let currentId = toc[0]?.id;
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el) {
          const { top } = el.getBoundingClientRect();
          // Use a larger threshold to account for sticky navbars
          if (top < 200) {
            currentId = item.id;
          }
        }
      }
      setActiveId(currentId);
      // Debug: see which heading is active as you scroll
      // console.log("Active TOC ID:", currentId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return activeId;
}
