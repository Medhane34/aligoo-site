// schemas/homepage/heroSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // English fields
    defineField({
      name: "badgeText_en",
      title: "Badge Text (English)",
      type: "string",
      fieldset: "en",
      description: "Short badge or label above the headline (English)",
    }),
    defineField({
      name: "headlineText1_en",
      title: "Headline Text 1 (English)",
      type: "string",
      fieldset: "en",
      validation: (Rule) => Rule.required(),
      description: "First part of the main headline (English)",
    }),
    defineField({
      name: "headlineText2_en",
      title: "Headline Text 2 (Emphasized, English)",
      type: "string",
      fieldset: "en",
      validation: (Rule) => Rule.required(),
      description: "Emphasized part of the headline (English)",
    }),
    defineField({
      name: "headlineText3_en",
      title: "Headline Text 3 (Optional, English)",
      type: "string",
      fieldset: "en",
      description: "Optional third part of the headline (English)",
    }),
    defineField({
      name: "subheading_en",
      title: "Subheading (English)",
      type: "text",
      rows: 3,
      fieldset: "en",
      validation: (Rule) => Rule.required(),
      description: "Subheading or supporting text (English)",
    }),
    defineField({
      name: "primaryButtonText_en",
      title: "Primary Button Text (English)",
      type: "string",
      fieldset: "en",
      validation: (Rule) => Rule.required(),
      description: "Text for the main CTA button (English)",
    }),
    defineField({
      name: "primaryButtonUrl",
      title: "Primary Button URL",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "URL for the main CTA button (shared for all languages)",
    }),
    defineField({
      name: "secondaryButtonText_en",
      title: "Secondary Button Text (English)",
      type: "string",
      fieldset: "en",
      validation: (Rule) => Rule.required(),
      description: "Text for the secondary CTA button (English)",
    }),
    defineField({
      name: "secondaryButtonUrl",
      title: "Secondary Button URL",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "URL for the secondary CTA button (shared for all languages)",
    }),

    // Amharic fields
    defineField({
      name: "badgeText_am",
      title: "Badge Text (Amharic)",
      type: "string",
      fieldset: "am",
    }),
    defineField({
      name: "headlineText1_am",
      title: "Headline Text 1 (Amharic)",
      type: "string",
      fieldset: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineText2_am",
      title: "Headline Text 2 (Emphasized, Amharic)",
      type: "string",
      fieldset: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineText3_am",
      title: "Headline Text 3 (Optional, Amharic)",
      type: "string",
      fieldset: "am",
    }),
    defineField({
      name: "subheading_am",
      title: "Subheading (Amharic)",
      type: "text",
      rows: 3,
      fieldset: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryButtonText_am",
      title: "Primary Button Text (Amharic)",
      type: "string",
      fieldset: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryButtonText_am",
      title: "Secondary Button Text (Amharic)",
      type: "string",
      fieldset: "am",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
