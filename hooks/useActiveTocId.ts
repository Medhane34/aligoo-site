"use client";
import type { TocItem } from "@/components/TableOfContents";

import { useEffect, useState } from "react";

export function useActiveTocId(toc: TocItem[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 1.0,
      },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) observer.observe(element);
    });

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id);

        if (element) observer.unobserve(element);
      });
    };
  }, [toc]);

  return activeId;
}
