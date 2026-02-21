export type TocItem = {
  id: string;
  text: string;
  level: number;
};

// Helper to generate consistent IDs from portable text blocks
export function getHeadingId(block: any): string {
  // Handle both direct text children and Portable Text nested spans
  const children = block.children || [];
  const text = children
    .map((child: any) => (typeof child === "string" ? child : child.text || ""))
    .join("");

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function generateToc(blocks: any[]): TocItem[] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks
    .filter((block) => block._type === "block" && /^h[1-6]$/.test(block.style))
    .map((block) => ({
      id: getHeadingId(block),
      text: block.children?.map((c: any) => c.text).join("") || "",
      level: Number(block.style[1]),
    }));
}
