import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredCaseStudy",
  title: "Featured Case Study",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // English fields
    defineField({ name: "title_en", title: "Title (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "accent_en", title: "Accent-Text (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt_en", title: "Excerpt (English)", type: "text", fieldset: "en", validation: (Rule) => Rule.required() }),
    // Amharic fields
    defineField({ name: "title_am", title: "Title (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }),
      defineField({ name: "accent_am", title: "Accent-Text (Amharic)", type: "string", fieldset: "am", validation: (Rule) => Rule.required() }), 
    defineField({ name: "excerpt_am", title: "Excerpt (Amharic)", type: "text", fieldset: "am", validation: (Rule) => Rule.required() }),
    
    // Shared fields
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en" }, validation: (Rule) => Rule.required() }),
  ],
});
