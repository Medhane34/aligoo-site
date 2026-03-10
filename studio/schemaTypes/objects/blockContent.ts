// schemas/blockContent.ts
import { defineType, defineArrayMember } from "sanity";
import markdownTable from "../blocks/markdownTable";
import youtubeVideo from "../blocks/youtubeVideo";

const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional image caption.",
        },
      ],
    }),
   defineArrayMember({ type: "markdownTable" }), 
    defineArrayMember({
      type: "tip",
    }),
 defineArrayMember({ type: "youtubeVideo" }), // <-- Add this line

    // ...other custom blocks
  ],
});

export default blockContent;
