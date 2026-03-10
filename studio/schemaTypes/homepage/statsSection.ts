// sanity/schemas/statsSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "document",
  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "Amharic" },
  ],
  fields: [
    

    // === NEW: English ===
    defineField({
      name: "stats_en",
      title: "Stats (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label (EN)", validation: (Rule) => Rule.required() },
            { name: "value", type: "number", title: "Value", validation: (Rule) => Rule.required() },
            { name: "suffix", type: "string", title: "Suffix", initialValue: "" },
            { name: "prefix", type: "string", title: "Prefix", initialValue: "" },
            { name: "duration", type: "number", title: "Animation Duration (s)", initialValue: 2 },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "footerText_en",
      title: "Footer Text (English)",
      type: "string",
      group: "en",
      initialValue: "CREATIVE POSSIBILITIES",
    }),

    // === NEW: Amharic ===
    defineField({
      name: "stats_am",
      title: "Stats (Amharic)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label (AM)", validation: (Rule) => Rule.required() },
            { name: "value", type: "number", title: "Value", validation: (Rule) => Rule.required() },
            { name: "suffix", type: "string", title: "Suffix", initialValue: "" },
            { name: "prefix", type: "string", title: "Prefix", initialValue: "" },
            { name: "duration", type: "number", title: "Animation Duration (s)", initialValue: 2 },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "footerText_am",
      title: "Footer Text (Amharic)",
      type: "string",
      group: "am",
      initialValue: "ፈጠራ ያልተገደበ",
    }),
  ],
});