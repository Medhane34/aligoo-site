// sanity/schemas/serviceSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "serviceSection",
  title: "Service Section",
  type: "document",
  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "Amharic" },
  ],
  fields: [
    // === TEMPORARY: Keep old fields for migration ===
    defineField({
      name: "sectionHeading",
      title: "[OLD] Section Heading",
      type: "string",
      group: "en",
      readOnly: true,
    }),
    defineField({
      name: "accentText",
      title: "[OLD] Accent Text",
      type: "string",
      group: "en",
      readOnly: true,
    }),
    defineField({
      name: "columns",
      title: "[OLD] Columns",
      type: "array",
      group: "en",
      readOnly: true,
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Column Title" },
            { name: "description", type: "text", title: "Column Description" },
            {
              name: "services",
              title: "Services",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Service Title" },
                    { name: "description", type: "text", title: "Service Description" },
                    { name: "icon", type: "image", title: "Service Icon", options: { hotspot: true } },
                    { name: "link", type: "string", title: "Service Link" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

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
      name: "columns_en",
      title: "Columns (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Column Title (EN)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Column Description (EN)", validation: (Rule) => Rule.required() },
            {
              name: "services",
              title: "Services (EN)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Service Title (EN)", validation: (Rule) => Rule.required() },
                    { name: "description", type: "text", title: "Service Description (EN)" },
                    { name: "icon", type: "image", title: "Service Icon", options: { hotspot: true } },
                    { name: "link", type: "string", title: "Service Link", validation: (Rule) => Rule.required() },
                  ],
                },
              ],
            },
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
      name: "columns_am",
      title: "Columns (Amharic)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Column Title (AM)", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Column Description (AM)", validation: (Rule) => Rule.required() },
            {
              name: "services",
              title: "Services (AM)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Service Title (AM)", validation: (Rule) => Rule.required() },
                    { name: "description", type: "text", title: "Service Description (AM)" },
                    { name: "icon", type: "image", title: "Service Icon", options: { hotspot: true } },
                    { name: "link", type: "string", title: "Service Link", validation: (Rule) => Rule.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});