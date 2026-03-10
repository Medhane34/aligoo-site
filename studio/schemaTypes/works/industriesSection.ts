import { defineType, defineField } from "sanity";

export default defineType({
  name: "industriesSection",
  title: "Industries We Worked With Section",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // English fields
    defineField({ name: "sectionHeading_en", title: "Section Heading (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_en", title: "Accent Text (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({
      name: "industries_en",
      title: "Industries (English)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Industry Name", validation: (Rule) => Rule.required() },
            { name: "emoji", type: "string", title: "Emoji/Icon", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      fieldset: "en",
      validation: (Rule) => Rule.required().min(1),
    }),
    // Amharic fields
    defineField({ name: "sectionHeading_am", title: "Section Heading (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_am", title: "Accent Text (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
    defineField({
      name: "industries_am",
      title: "Industries (Amharic)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Industry Name", validation: (Rule) => Rule.required() },
            { name: "emoji", type: "string", title: "Emoji/Icon", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      fieldset: "am",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
