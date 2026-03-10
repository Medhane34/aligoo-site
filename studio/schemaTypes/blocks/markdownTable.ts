import { defineType, defineField } from "sanity";

export default defineType({
  name: "markdownTable",
  title: "Table (Markdown)",
  type: "object",
  fields: [
    defineField({
      name: "markdown",
      title: "Markdown Table",
      type: "text",
      rows: 6,
      description: "Paste or write your table in Markdown format here.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
