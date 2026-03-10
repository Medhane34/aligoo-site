// components/ui/PortableTextSanity.tsx
import { PortableText as PortableTextComponent } from "@portabletext/react";

const components = {
  marks: {
    link: ({ value, children }: any) => {
      const { href, openInNewTab } = value || {};

      return (
        <a
          className="text-cyan-400 underline hover:text-cyan-300 transition"
          href={href}
          rel={openInNewTab ? "noopener noreferrer" : ""}
          target={openInNewTab ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextSanity({ blocks }: { blocks: any }) {
  if (!blocks || blocks.length === 0) return null;

  return <PortableTextComponent components={components} value={blocks} />;
}
