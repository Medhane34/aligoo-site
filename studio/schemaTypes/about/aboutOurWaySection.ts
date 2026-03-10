import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutOurWaySection",
  title: "About Us - Our Way Section",
  type: "document",
  fields: [
    defineField({
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "tabKey", type: "string", title: "Tab Key (e.g., 'problem', 'ourWay')", validation: (Rule) => Rule.required() },
            { name: "tabLabel", type: "string", title: "Tab Label", validation: (Rule) => Rule.required() },
            { name: "heading", type: "string", title: "Heading", validation: (Rule) => Rule.required() },
            { name: "subheading", type: "string", title: "Subheading" },
            { name: "image", type: "image", title: "Main Image", options: { hotspot: true } },
            { name: "imageAlt", type: "string", title: "Image Alt Text" },
            // For "problem" tab: bullet points
            {
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            },
            // For "ourWay" tab: list of points
            {
              name: "ourWayPoints",
              title: "Our Way Points",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "number", type: "string", title: "Number" },
                    { name: "heading", type: "string", title: "Heading" },
                    { name: "description", type: "text", title: "Description" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
