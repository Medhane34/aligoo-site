import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., faqSection-Fb, faqSection-WebDesign",
    }),
    // English fields
    defineField({ name: "eyebrow_en", title: "Eyebrow (English)", type: "string" }),
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "string" }),
    defineField({ name: "ctaText_en", title: "CTA Text (English)", type: "string" }),
    defineField({ name: "ctaHref_en", title: "CTA Link (English)", type: "string" }),
    defineField({
      name: "faqs_en",
      title: "FAQs (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", title: "Answer", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    // Amharic fields
    defineField({ name: "eyebrow_am", title: "Eyebrow (Amharic)", type: "string" }),
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "string" }),
    defineField({ name: "ctaText_am", title: "CTA Text (Amharic)", type: "string" }),
    defineField({ name: "ctaHref_am", title: "CTA Link (Amharic)", type: "string" }),
    defineField({
      name: "faqs_am",
      title: "FAQs (Amharic)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", title: "Answer", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
