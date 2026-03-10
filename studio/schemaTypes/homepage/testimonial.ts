// schemaTypes/testimonialsSection.ts
import { defineType, defineField } from "sanity"
import { UserIcon } from "@sanity/icons"

export default defineType({
  name: "testimonial",
  title: "Testimonials Section",
  type: "document",
  icon: UserIcon,

  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "አማርኛ" },
  ],

  fields: [
    // === SECTION TITLES ===
    defineField({
      name: "heading_en",
      title: "Section Heading (English)",
      type: "string",
      group: "en",
      initialValue: "Client Love",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading_en",
      title: "Section Subheading (English)",
      type: "string",
      group: "en",
      initialValue: "Feedback That Fuels Us",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heading_am",
      title: "ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "ደንበኛ ፍቅር",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading_am",
      title: "ንዑስ ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "እኛን የሚያንቀሳቅስ ግብረ መልስ",
      validation: (Rule) => Rule.required(),
    }),

    // === TESTIMONIALS ARRAY - ENGLISH ===
    defineField({
      name: "testimonials_en",
      title: "Testimonials (English)",
      type: "array",
      group: "en",
      of: [
        {
          type: "object",
          name: "testimonial_en",
          title: "Testimonial",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "username",
              title: "Title / Company",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "body",
              title: "Review Text",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Alt Text", type: "string" },
              ],
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "username",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // === TESTIMONIALS ARRAY - AMHARIC ===
    defineField({
      name: "testimonials_am",
      title: "የደንበኛ ግምገማዎች (አማርኛ)",
      type: "array",
      group: "am",
      of: [
        {
          type: "object",
          name: "testimonial_am",
          title: "ግምገማ",
          fields: [
            {
              name: "name",
              title: "ስም",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "username",
              title: "ማዕረግ / ድርጅት",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "body",
              title: "የግምገማ ጽሑፍ",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required().min(30),
            },
            {
              name: "image",
              title: "ፎቶ",
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Alt Text", type: "string" },
              ],
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "username",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Testimonials Section",
      }
    },
  },
})