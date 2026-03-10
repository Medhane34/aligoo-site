import { defineType, defineField } from "sanity";

export default defineType({
  name: "sectionHeadingBlock",
  title: "Section Heading Block",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (Rule) => Rule.required() },
    { name: "heading_en", type: "string", fieldset: "en" },
    { name: "heading_am", type: "string", fieldset: "am" },
    { name: "subheading_en", type: "string", fieldset: "en" },
    { name: "subheading_am", type: "string", fieldset: "am" },
  ],
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
});
