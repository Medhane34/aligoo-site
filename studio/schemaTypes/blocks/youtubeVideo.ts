import { defineType, defineField } from "sanity";

export default defineType({
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL or Video ID",
      type: "url",
      validation: (Rule) => Rule.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
      description: "Paste the full YouTube URL or just the video ID.",
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
  ],
});
