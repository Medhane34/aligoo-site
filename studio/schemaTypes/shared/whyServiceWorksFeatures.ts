import { defineType, defineField } from "sanity";

export default defineType({
    name: "whyServiceWorksFeatures",
    title: "Why Service Works (Features Layout)",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Section Name (for code reference)",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "e.g., whyServiceWorksFeatures-FunnelMapping",
        }),
        // English fields
        defineField({ name: "heading_en", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subheading_en", title: "Subheading (English)", type: "text", rows: 3 }),
        defineField({
            name: "features_en",
            title: "Features (English)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "emoji", type: "string", title: "Emoji", validation: (Rule) => Rule.required() },
                        { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },
                        { name: "description", type: "text", title: "Description", validation: (Rule) => Rule.required() },
                    ],
                },
            ],
        }),
        // Amharic fields
        defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "text", rows: 3 }),
        defineField({
            name: "features_am",
            title: "Features (Amharic)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "emoji", type: "string", title: "Emoji", validation: (Rule) => Rule.required() },
                        { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },
                        { name: "description", type: "text", title: "Description", validation: (Rule) => Rule.required() },
                    ],
                },
            ],
        }),
    ],
});
