// schemaTypes/meaningSection.ts
import { defineType, defineField } from "sanity"
import { SparklesIcon } from "@sanity/icons"

export default defineType({
  name: "meaningSection",
  title: "Meaning of Aligoo Section",
  type: "document",
  icon: SparklesIcon,

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
      initialValue: "Aligoo /ˈæ.lɪ.guː/ (verb): To Create With Soul.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pronunciation_en",
      title: "Pronunciation Text (English)",
      type: "string",
      group: "en",
      initialValue: "[ah-lee-goo]",
    }),
    defineField({
      name: "definitionLines_en",
      title: "Definition Lines (English)",
      type: "array",
      group: "en",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(5).max(8),
      initialValue: [
        "Aligoo is a word we made up.",
        "It means to put a soul in your craft, and to deliver beyond expectation.",
        "It’s how we design, write, plan, launch, and show up for our clients.",
        "With intention. With pride. And always with a little extra.",
        "You don’t just get a service.",
        "You get the Aligoo touch.",
      ],
    }),
    defineField({
      name: "tagline_en",
      title: "Tagline (English)",
      type: "string",
      group: "en",
      initialValue: "A word born in Addis. A mindset made for the world.",
    }),

    // === AMHARIC ===
    defineField({
      name: "mainHeading_am",
      title: "ዋና ርዕስ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "አሊጉ /a.li.gu/ (ግስ): በነፍስ መፍጠር።",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pronunciation_am",
      title: "የአጠራር ጽሑፍ (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "[አ-ሊ-ጉ]",
    }),
    defineField({
      name: "definitionLines_am",
      title: "የፍቺ መስመሮች (አማርኛ)",
      type: "array",
      group: "am",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(5).max(8),
      initialValue: [
        "አሊጉ የፈጠርነው ቃል ነው።",
        "በሥራህችን ነፍስ መክተት፣ ከተጠበቀው በላይ መስጠት ማለት ነው።",
        "እንዴት እንደምንፈጥር፣ እንደምንጽፍ፣ እንደምንፈጽም፣ እና ለደንበኞቻችን እንደምንቆም ነው።",
        "በፍቅር። በኩራት። እና ሁልጊዜም ተጨማሪ በመሆን።",
        "አገልግሎት ብቻ አይደለም የምታገኘው።",
        "የአሊጉ ንክኪ ነው።",
      ],
    }),
    defineField({
      name: "tagline_am",
      title: "የመጨረሻ መልእክት (አማርኛ)",
      type: "string",
      group: "am",
      initialValue: "በአዲስ አበባ የተወለደ ቃል። ለዓለም የተፈጠረ አመለካከት።",
    }),

    // Audio (shared)
    defineField({
      name: "pronunciationAudio",
      title: "Pronunciation Audio File",
      type: "file",
      options: { accept: "audio/*,video/mp4" },
      description: "Upload .mp3 or .mp4 (currently using /aligoo-pro.mp4)",
    }),
  ],

  preview: { prepare: () => ({ title: "Meaning of Aligoo" }) },
})