// schemaTypes/teamSection.ts
import { defineType, defineField } from "sanity"
import { UsersIcon } from "@sanity/icons"

export default defineType({
  name: "teamSection",
  title: "Team Section",
  type: "document",
  icon: UsersIcon,

  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "አማርኛ" },
  ],

  fields: [
    // === ENGLISH ===
    defineField({
      name: "heading_en",
      title: "Section Heading (English)",
      type: "string",
      group: "en",
      initialValue: "Meet the Team",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading_en",
      title: "Subheading (English)",
      type: "string",
      group: "en",
      initialValue: "The Brains, The Heart, and The Hustle Behind Aligoo",
      validation: (Rule) => Rule.required(),
    }),

    // === AMHARIC ===
    defineField({
      name: "heading_am",
      title: "ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "ቡድኑን ይገናኙ",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading_am",
      title: "ንዑስ ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "አሊጉ ጀርባ ያሉት አእምሮ፣ ልብ እና ጉልበት",
      validation: (Rule) => Rule.required(),
    }),

    // === TEAM MEMBERS (Shared — images & colors are language-agnostic) ===
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          name: "member",
          title: "Team Member",
          fields: [
            { name: "name", title: "Full Name", type: "string", validation: (Rule) => Rule.required() },
            { name: "role_en", title: "Role (English)", type: "string", validation: (Rule) => Rule.required() },
            { name: "role_am", title: "ሚና (አማርኛ)", type: "string", validation: (Rule) => Rule.required() },
            { name: "bio_en", title: "Bio (English)", type: "text", rows: 3, validation: (Rule) => Rule.required() },
            { name: "bio_am", title: "የሕይወት ታሪክ (አማርኛ)", type: "text", rows: 3, validation: (Rule) => Rule.required() },
            { name: "yearsOfExperience", title: "Years of Experience (e.g. '10+')", type: "string" },
            { name: "superpower_en", title: "Superpower (English)", type: "string" },
            { name: "superpower_am", title: "ልዕለ ኃይል (አማርኛ)", type: "string" },
            {
              name: "socialLinks",
              title: "Social Links",
              type: "object",
              fields: [
                { name: "linkedin", title: "LinkedIn URL", type: "url" },
                { name: "twitter", title: "Twitter URL", type: "url" },
                { name: "github", title: "GitHub URL", type: "url" },
              ],
            },
            { name: "department", title: "Department (e.g. LEADERSHIP)", type: "string" },
            { name: "departmentColor", title: "Department Badge Color", type: "string", initialValue: "bg-yellow-400 text-black" },
            { name: "firstNameColor", title: "First Name Color", type: "string", initialValue: "text-yellow-400" },
            { name: "lastNameColor", title: "Last Name Color", type: "string", initialValue: "text-white" },
            {
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            },
          ],
          preview: {
            select: { title: "name", subtitle: "role_en", media: "image" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: { prepare: () => ({ title: "Team Section" }) },
})