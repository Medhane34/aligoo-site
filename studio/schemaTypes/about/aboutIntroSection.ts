// schemaTypes/aboutIntroSection.ts
import { defineType, defineField } from "sanity"
import { UserIcon } from "@sanity/icons"

export default defineType({
  name: "aboutIntroSection",
  title: "About Us Intro Section",
  type: "document",
  icon: UserIcon,

  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "አማርኛ" },
  ],

  fields: [
    

    // === ENGLISH ===
    defineField({
      name: "mainHeading_en",
      title: "Main Heading (English)",
      type: "string",
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introText_en",
      title: "Intro Text (English)",
      type: "text",
      rows: 4,
      group: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "founded_en",
      title: "Founded (English)",
      type: "string",
      group: "en",
      description: "e.g., 'Since 2020, born and built in Addis Ababa.'",
    }),
    defineField({
      name: "focus_en",
      title: "Focus (English)",
      type: "string",
      group: "en",
      description: "e.g., 'Digital Growth for service businesses & challenger brands.'",
    }),
    defineField({
      name: "campaignsLaunched_en",
      title: "Campaigns Launched (English)",
      type: "string",
      group: "en",
      description: "e.g., '150+ ads, funnels, and websites that actually convert.'",
    }),
    defineField({
      name: "momentsProudOf_en",
      title: "Moments We're Proud Of (English)",
      type: "text",
      rows: 2,
      group: "en",
      description: "e.g., 'Featured by local startups, celebrated by happy clients...'",
    }),

    // === AMHARIC ===
    defineField({
      name: "mainHeading_am",
      title: "ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introText_am",
      title: "መግቢያ ጽሑፍ (አማርኛ)",
      type: "text",
      rows: 4,
      group: "am",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "founded_am",
      title: "ተመሠረተ (አማርኛ)",
      type: "string",
      group: "am",
    }),
    defineField({
      name: "focus_am",
      title: "ትኩረት (አማርኛ)",
      type: "string",
      group: "am",
    }),
    defineField({
      name: "campaignsLaunched_am",
      title: "የተጀመሩ ዘመቻዎች (አማርኛ)",
      type: "string",
      group: "am",
    }),
    defineField({
      name: "momentsProudOf_am",
      title: "የምንኮራባቸው ጊዜያት (አማርኛ)",
      type: "text",
      rows: 2,
      group: "am",
    }),
  ],

  preview: {
    prepare() {
      return { title: "About Us Intro" }
    },
  },
})