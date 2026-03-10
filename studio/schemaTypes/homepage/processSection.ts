// sanity/schemas/processSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "processSection",
  title: "Process Section",
  type: "document",
  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "Amharic" },
  ],
  fields: [
    

    // === NEW: English ===
    defineField({
      name: "sectionHeading_en",
      title: "Section Heading (English)",
      type: "string",
      group: "en",
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
      name: "steps_en",
      title: "Process Steps (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon", validation: (Rule) => Rule.required() },
            { name: "heading", type: "string", title: "Step Heading (EN)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description (EN)", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // === NEW: Amharic ===
    defineField({
      name: "sectionHeading_am",
      title: "Section Heading (Amharic)",
      type: "string",
      group: "am",
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
      name: "steps_am",
      title: "Process Steps (Amharic)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon", validation: (Rule) => Rule.required() },
            { name: "heading", type: "string", title: "Step Heading (AM)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description (AM)", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});