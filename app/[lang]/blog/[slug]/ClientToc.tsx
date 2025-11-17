"use client";
import TableOfContents, { TocItem } from "@/components/TableOfContents";
import { useActiveTocId } from "@/hooks/useActiveTocId";

export default function ClientToc({ toc }: { toc: TocItem[] }) {
  const activeId = useActiveTocId(toc);
  return <TableOfContents toc={toc} activeId={activeId} />;
}
