// If separate; else ref existing service schema
import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Blog Category (Service)",
  type: "document",
  fieldsets: [{ name: "en", title: "English" }, { name: "am", title: "Amharic" }],
  fields: [
    defineField({ name: "title_en", type: "string", fieldset: "en" }),  // e.g., "Facebook & Instagram Ads"
    defineField({ name: "title_am", type: "string", fieldset: "am" }),
    // Add a slug so queries can filter by `category->slug.current`
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en", maxLength: 96 }, validation: Rule => Rule.required() }),
  ],
});