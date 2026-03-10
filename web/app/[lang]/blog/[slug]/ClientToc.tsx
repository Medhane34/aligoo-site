"use client";
import TableOfContents, { TocItem } from "@/components/TableOfContents";
import { useActiveTocId } from "@/hooks/useActiveTocId";

export default function ClientToc({ toc }: { toc: TocItem[] }) {
  const activeId = useActiveTocId(toc);

  return <TableOfContents activeId={activeId} toc={toc} />;
}
