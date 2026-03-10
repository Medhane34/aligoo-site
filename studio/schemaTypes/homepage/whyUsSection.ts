// sanity/schemas/whyUsSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "whyUsSection",
  title: "Why Us Section",
  type: "document",
  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "Amharic" },
  ],
  fields: [


    // === NEW FIELDS: Multilingual ===
    defineField({
      name: "sectionHeading_en",
      title: "Section Heading (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionHeading_am",
      title: "Section Heading (Amharic)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentText_en",
      title: "Accent Text (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentText_am",
      title: "Accent Text (Amharic)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reasons_en",
      title: "Reasons (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          fields: [
            { name: "emoji", type: "string", title: "Emoji/Icon", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Title (EN)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Description (EN)", validation: (Rule) => Rule.required() },
            { name: "gradient", type: "string", title: "Gradient", validation: (Rule) => Rule.required() },
            { name: "span", type: "string", title: "Grid Span", initialValue: "col-span-1" },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "reasons_am",
      title: "Reasons (Amharic)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          fields: [
            { name: "emoji", type: "string", title: "Emoji/Icon", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Title (AM)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Description (AM)", validation: (Rule) => Rule.required() },
            { name: "gradient", type: "string", title: "Gradient", validation: (Rule) => Rule.required() },
            { name: "span", type: "string", title: "Grid Span", initialValue: "col-span-1" },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});