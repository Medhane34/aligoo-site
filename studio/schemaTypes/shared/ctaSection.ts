import { defineType, defineField } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., ctaSection-Home, ctaSection-FacebookAd, etc.",
    }),
    // English fields
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "primaryButtonText_en", title: "Primary Button Text (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "primaryButtonUrl", title: "Primary Button URL", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "secondaryButtonText_en", title: "Secondary Button Text (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "secondaryButtonUrl", title: "Secondary Button URL", type: "string", validation: (Rule) => Rule.required() }),
    // Amharic fields
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "primaryButtonText_am", title: "Primary Button Text (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "secondaryButtonText_am", title: "Secondary Button Text (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
  ],
});
