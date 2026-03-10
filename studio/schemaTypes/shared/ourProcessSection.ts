import { defineType, defineField } from "sanity";

export default defineType({
  name: "ourProcessSection",
  title: "Our Process Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., ourProcessSection-WebDesign, ourProcessSection-Fb",
    }),
    // English fields
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "string" }),
    defineField({ name: "image_en", title: "Image (English)", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt_en", title: "Image Alt (English)", type: "string" }),
    defineField({
      name: "steps_en",
      title: "Steps (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "number", title: "Step Number", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Step Title", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    // Amharic fields
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "string" }),
    defineField({ name: "image_am", title: "Image (Amharic)", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt_am", title: "Image Alt (Amharic)", type: "string" }),
    defineField({
      name: "steps_am",
      title: "Steps (Amharic)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "number", title: "Step Number", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Step Title", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Step Description", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
