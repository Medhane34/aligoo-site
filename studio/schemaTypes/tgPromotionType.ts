import { defineType, defineField } from "sanity";
import { AsteriskIcon } from "@sanity/icons"; // Using a built-in icon similar to Telegram

export const tgPromotionType = defineType({
    name: "tgPromotion",
    title: "Telegram Promotion Section",
    type: "document",
    groups: [{ name: "en", title: "English" }, { name: "am", title: "Amharic" }],
    icon: AsteriskIcon,
    fields: [
        defineField({
            name: "accentText_en",
            title: "Accent Text (English)",
            type: "string",
            validation: (Rule) => Rule.required(),
            initialValue: "Get More Digital Marketing Tips on Telegram",
            group: "en",
        }),
        defineField({
            name: "accentText_am",
            title: "Accent Text (Amharic)",
            type: "string",
            validation: (Rule) => Rule.required(),
            group: "am",
        }),
        defineField({
            name: "heading_en",
            title: "Heading (English)",
            type: "string",
            validation: (Rule) => Rule.required(),
            initialValue: "Short insights. Practical strategies. Real examples.",
            group: "en",
        }),
        defineField({
            name: "heading_am",
            title: "Heading (Amharic)",
            type: "string",
            validation: (Rule) => Rule.required(),
            group: "am",
        }),
        defineField({
            name: "description_en",
            title: "Description (English)",
            type: "text",
            validation: (Rule) => Rule.required(),
            initialValue:
                "Join our Telegram channel where we share simple digital marketing tips, ad strategies, and growth ideas to help your business attract more customers online.",
            group: "en",
        }),
        defineField({
            name: "description_am",
            title: "Description (Amharic)",
            type: "text",
            validation: (Rule) => Rule.required(),
            group: "am",
        }),
        defineField({
            name: "buttonText_en",
            title: "Button Text (English)",
            type: "string",
            validation: (Rule) => Rule.required(),
            initialValue: "Join Our Telegram",
            group: "en",
        }),
        defineField({
            name: "buttonText_am",
            title: "Button Text (Amharic)",
            type: "string",
            validation: (Rule) => Rule.required(),
            group: "am",
        }),
        defineField({
            name: "buttonLink",
            title: "Telegram Bot/Channel Link",
            type: "url",
            validation: (Rule) =>
                Rule.required().uri({
                    scheme: ["http", "https"],
                }),
        }),
    ],
    preview: {
        select: {
            title: "heading_en",
            subtitle: "accentText_en",
        },
    },
});
