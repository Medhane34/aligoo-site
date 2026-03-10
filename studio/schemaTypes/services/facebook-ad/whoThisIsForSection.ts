import { defineType, defineField } from "sanity";

export default defineType({
  name: "whoThisIsForSection",
  title: "Who This Is For Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., whoThisIsForSection-Fb, whoThisIsForSection-WebDesign",
    }),
    // English fields
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "string" }),
    defineField({ name: "introText_en", title: "Intro Text (English)", type: "string" }),
    defineField({
      name: "highlightedPhrases_en",
      title: "Highlighted Phrases (English)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "outroText_en", title: "Outro Text (English)", type: "string" }),
    // Amharic fields
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "string" }),
    defineField({ name: "introText_am", title: "Intro Text (Amharic)", type: "string" }),
    defineField({
      name: "highlightedPhrases_am",
      title: "Highlighted Phrases (Amharic)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "outroText_am", title: "Outro Text (Amharic)", type: "string" }),
  ],
});
