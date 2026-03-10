// schemaTypes/valuesSection.ts
import { defineType, defineField } from "sanity"
import { HeartIcon } from "@sanity/icons"

export default defineType({
  name: "valuesSection",
  title: "Values Section",
  type: "document",
  icon: HeartIcon,

  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "አማርኛ" },
  ],

  fields: [
   

    // === ENGLISH ===
    defineField({
      name: "sectionHeading_en",
      title: "Section Heading (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentText_en",
      title: "Accent Text (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText_en",
      title: "Button Text (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonUrl_en",
      title: "Button URL (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values_en",
      title: "Values (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          name: "value_en",
          title: "Value",
          fields: [
            { name: "emoji", type: "string", title: "Emoji/Icon", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "Description", validation: (Rule) => Rule.required() },
            { name: "bgColor", type: "string", title: "Background Color", initialValue: "bg-white" },
            { name: "textColor", type: "string", title: "Text Color", initialValue: "text-gray-900" },
          ],
          preview: {
            select: { title: "title", subtitle: "description", },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // === AMHARIC ===
    defineField({
      name: "sectionHeading_am",
      title: "ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentText_am",
      title: "የተለየ ጽሑፍ (አማርኛ)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText_am",
      title: "የአዝራር ጽሑፍ (አማርኛ)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonUrl_am",
      title: "የአዝራር ማስፈንጠሪያ (አማርኛ)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values_am",
      title: "እሴቶች (አማርኛ)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          name: "value_am",
          title: "እሴት",
          fields: [
            { name: "emoji", type: "string", title: "ኢሞጂ", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "ርዕስ", validation: (Rule) => Rule.required() },
            { name: "description", type: "text", title: "መግለጫ", validation: (Rule) => Rule.required() },
            { name: "bgColor", type: "string", title: "የጀርባ ቀለም", initialValue: "bg-white" },
            { name: "textColor", type: "string", title: "የጽሑፍ ቀለም", initialValue: "text-gray-900" },
          ],
          preview: {
            select: { title: "title", subtitle: "description", },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Values Section" }
    },
  },
})