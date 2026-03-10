import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  groups: [{ name: "en", title: "English" }, { name: "am", title: "Amharic" }],
  fields: [
    defineField({
      name: "name",
      title: "Section Name (for code reference)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., heroSection-WebDesign, heroSection-FacebookAd",
    }),

    // English fields
    defineField({ name: "badgeText_en", title: "Badge Text (English)", type: "string", group: "en" }),
    defineField({ name: "headlineText1_en", title: "Headline Text 1 (English)", type: "string", validation: (Rule) => Rule.required(), group: "en" }),
    defineField({ name: "headlineText2_en", title: "Headline Text 2 (English, Emphasized)", type: "string", validation: (Rule) => Rule.required(), group: "en" }),
    defineField({ name: "headlineText3_en", title: "Headline Text 3 (English, Optional)", type: "string", group: "en" }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "en" }),
    defineField({ name: "primaryButtonText_en", title: "Primary Button Text (English)", type: "string", validation: (Rule) => Rule.required(), group: "en" }),
    defineField({ name: "primaryButtonUrl", title: "Primary Button URL", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "secondaryButtonText_en", title: "Secondary Button Text (English)", type: "string", validation: (Rule) => Rule.required(), group: "en" }),
    defineField({ name: "secondaryButtonUrl", title: "Secondary Button URL", type: "string", validation: (Rule) => Rule.required(), group: "en" }),
    // Amharic fields
    defineField({ name: "badgeText_am", title: "Badge Text (Amharic)", type: "string", group: "am" }),
    defineField({ name: "headlineText1_am", title: "Headline Text 1 (Amharic)", type: "string", validation: (Rule) => Rule.required(), group: "am" }),
    defineField({ name: "headlineText2_am", title: "Headline Text 2 (Amharic, Emphasized)", type: "string", validation: (Rule) => Rule.required(), group: "am" }),
    defineField({ name: "headlineText3_am", title: "Headline Text 3 (Amharic, Optional)", type: "string", group: "am" }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "text", rows: 3, validation: (Rule) => Rule.required(), group: "am" }),
    defineField({ name: "primaryButtonText_am", title: "Primary Button Text (Amharic)", type: "string", validation: (Rule) => Rule.required(), group: "am" }),
    defineField({ name: "secondaryButtonText_am", title: "Secondary Button Text (Amharic)", type: "string", validation: (Rule) => Rule.required(), group: "am" }),
  ],
});
