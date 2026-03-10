import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutUsSection",
  title: "About Us Section",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // English fields
    defineField({ name: "sectionHeading_en", title: "Section Heading (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_en", title: "Accent Text (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "paragraphs_en", title: "Paragraphs (English)", type: "array", of: [{ type: "text" }], fieldset: "en", validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "image", title: "Section Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "buttonText_en", title: "Button Text (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "buttonUrl", title: "Button URL", type: "string", validation: (Rule) => Rule.required() }),

    // Amharic fields
    defineField({ name: "sectionHeading_am", title: "Section Heading (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentText_am", title: "Accent Text (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
    defineField({ name: "paragraphs_am", title: "Paragraphs (Amharic)", type: "array", of: [{ type: "text" }], fieldset: "am", validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "buttonText_am", title: "Button Text (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
  ],
});
