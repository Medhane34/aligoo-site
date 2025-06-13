/* eslint-disable padding-line-between-statements */
// utils/generateToc.ts
export type TocItem = {
  id: string;
  text: string;
  level: number;
};

// Utility to generate a heading ID from a block
export function getHeadingId(block: any): string {
  const text = block.children?.map((c: any) => c.text).join("") || "";
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// Generate the TOC array from Portable Text blocks
export function generateToc(blocks: any[]): TocItem[] {
  const toc: TocItem[] = [];
  blocks.forEach((block) => {
    if (block._type === "block" && /^h[1-6]$/.test(block.style)) {
      const text = block.children?.map((c: any) => c.text).join("") || "";
      const id = getHeadingId(block);
      toc.push({ id, text, level: Number(block.style[1]) });
    }
  });
  return toc;
}
