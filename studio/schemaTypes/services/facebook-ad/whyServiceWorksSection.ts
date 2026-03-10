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
