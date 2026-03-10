import { defineType, defineField } from "sanity";

export default defineType({
  name: "adPhilosophySection",
  title: "Ad Philosophy (C4 Method) Section",
  type: "document",
  fields: [
    // Naming convention for reusability
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., adPhilosophySection-Fb",
    }),
    // English fields
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_en", title: "Accent Text (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "steps_en",
      title: "Steps (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step Title", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description", validation: (Rule) => Rule.required() },
            { name: "color", type: "string", title: "Circle Color (Tailwind, e.g. 'bg-pink-500')", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "bottomHeading_en", title: "Bottom Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bottomText_en", title: "Bottom Text (English)", type: "string", validation: (Rule) => Rule.required() }),

    // Amharic fields
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_am", title: "Accent Text (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "steps_am",
      title: "Steps (Amharic)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step Title", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description", validation: (Rule) => Rule.required() },
            { name: "color", type: "string", title: "Circle Color (Tailwind, e.g. 'bg-pink-500')", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "bottomHeading_am", title: "Bottom Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bottomText_am", title: "Bottom Text (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
  ],
});
