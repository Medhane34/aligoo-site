import { defineType, defineField } from "sanity";

export default defineType({
  name: "post new",
  title: "Blog Post",
  type: "document",
  fieldsets: [{ name: "en", title: "English" }, { name: "am", title: "Amharic", options: { collapsed: true } }],
  fields: [
    // Multilingual Title/Excerpt
    defineField({ name: "title_en", title: "Title (English)", type: "string", fieldset: "en", validation: Rule => Rule.required() }),
    defineField({ name: "title_am", title: "Title (Amharic)", type: "string", fieldset: "am", validation: Rule => Rule.required() }),
    defineField({ name: "excerpt_en", title: "Excerpt (English)", type: "text", fieldset: "en" }),
    defineField({ name: "excerpt_am", title: "Excerpt (Amharic)", type: "text", fieldset: "am" }),
    // Body as Portable Text (multilingual arrays)
    defineField({ name: "body_en", title: "Body (English)", type: "array", of: [{ type: "block" }], fieldset: "en" }),
    defineField({ name: "body_am", title: "Body (Amharic)", type: "array", of: [{ type: "block" }], fieldset: "am" }),
    // Shared
    defineField({ name: "slug", type: "slug", options: { source: "title_en" } }),
    defineField({ name: "mainImage", type: "image" }),
    defineField({ name: "publishedAt", type: "datetime", validation: Rule => Rule.required() }),
    // Reference the blog category (used for filtering)
    defineField({ name: "category", type: "reference", to: [{ type: "category" }], title: "Related Category" }),
    // Author Reference
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    // Promotional Card
    defineField({
      name: "promotionalCard",
      title: "Promotional Card",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
        defineField({ name: "buttonText", type: "string", title: "Button Text" }),
        defineField({ name: "buttonLink", type: "url", title: "Button Link" }),
      ],
    }),
  ],
});