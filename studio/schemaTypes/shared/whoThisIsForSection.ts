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
    defineField({
      name: "page",
      title: "Page ",
      description: "Select the specific page this Who This For section belongs to.",
      type: "string",
      options: {
        list: [
          // Services page 
          { title: 'Facebook Ads', value: 'facebook-ads' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Seo', value: 'seo' },
          { title: 'Content Writing', value: 'content-writing' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'TikTok Ads', value: 'tiktok-ads' },
          { title: 'Funnel Mapping', value: 'funnel-mapping' },


        ],
      },
      validation: (Rule) => Rule.required(),
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
