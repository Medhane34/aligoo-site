export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function getHeadingId(block: any): string {
  const text = block.children?.map((c: any) => c.text).join("") || "";
  return text
    .toLowerCase()
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
