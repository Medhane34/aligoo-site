import { defineType, defineField } from "sanity";

export default defineType({
  name: "whyServiceWorksSection",
  title: "Why Service Works Section-Facebook",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., whyServiceWorksSection-Fb, whyServiceWorksSection-WebDesign",
    }),
    defineField({
      name: "page",
      title: "Page ",
      description: "Select the specific page this why service works section belongs to.",
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
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "highlight_en", title: "Highlight (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "paragraph1_en", title: "Paragraph 1 (English)", type: "text", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "paragraph2_en", title: "Paragraph 2 (English)", type: "text", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({
      name: "stats_en",
      title: "Stats (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value", validation: (Rule) => Rule.required() },
            { name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      fieldset: "en",
      validation: (Rule) => Rule.required().min(1),
    }),
    // Amharic fields
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", fieldset: "am", }),
    defineField({ name: "highlight_am", title: "Highlight (Amharic)", type: "string", fieldset: "am", }),
    defineField({ name: "paragraph1_am", title: "Paragraph 1 (Amharic)", type: "text", fieldset: "am", }),
    defineField({ name: "paragraph2_am", title: "Paragraph 2 (Amharic)", type: "text", fieldset: "am", }),
    defineField({
      name: "stats_am",
      title: "Stats (Amharic)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value", validation: (Rule) => Rule.required() },
            { name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      fieldset: "am",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
