// schemaTypes/ourWaySection.ts
import { defineType, defineField } from "sanity"
import { TargetIcon } from "@sanity/icons"

export default defineType({
  name: "ourWaySection",
  title: "Our Way / The Problem Section",
  type: "document",
  icon: TargetIcon,

  groups: [
    { name: "en", title: "English", default: true },
    { name: "am", title: "አማርኛ" },
  ],

  fields: [
    // === TABS ===
    defineField({ name: "tabProblem_en", title: "Tab: The Problem (EN)", type: "string", group: "en", initialValue: "The Problem" }),
    defineField({ name: "tabOurWay_en",  title: "Tab: Our Way (EN)",     type: "string", group: "en", initialValue: "Our Way" }),
    defineField({ name: "tabProblem_am", title: "ታብ: ችግሩ",               type: "string", group: "am", initialValue: "ችግሩ" }),
    defineField({ name: "tabOurWay_am",  title: "ታብ: የእኛ መንገድ",         type: "string", group: "am", initialValue: "የእኛ መንገድ" }),

    // === PROBLEM TAB CONTENT ===
    defineField({ name: "problemHeadline_en", title: "Problem Headline (EN)", type: "string", group: "en", initialValue: "The Real Talk: What’s Broken" }),
    defineField({ name: "problemText_en",     title: "Problem Intro Text (EN)", type: "text",   group: "en", initialValue: "Most businesses don’t need another strategy doc..." }),
    defineField({ name: "problemHeadline_am", title: "የችግር ርዕስ (አማ)",     type: "string", group: "am", initialValue: "በቀጥታ እንላቸው፡ ምን ተበላሸ?" }),
    defineField({ name: "problemText_am",     title: "የችግር መግቢያ ጽሑፍ (አማ)", type: "text",   group: "am", initialValue: "አብዛኞቹ ንግዶች ሌላ ስትራቴጂ ዶክመንት..." }),

    defineField({ name: "problemPoints_en", title: "Problem Points (EN)", type: "array", of: [{ type: "string" }], group: "en", initialValue: ["Big promises, small follow-through", "Copy-paste strategies", "Agencies more obsessed with awards than impact", "0% B.S."] }),
    defineField({ name: "problemPoints_am", title: "የችግር ነጥቦች (አማ)", type: "array", of: [{ type: "string" }], group: "am", initialValue: ["ትልልቅ ተስፋዎ�ች፣ ትንሽ እውነተኝነት", "ተቀዳ-ተለጠፈ ስትራቴጂዎች", "በአዋርድ የተጠመዱ ኤጀንሲዎች", "0% ቢ.ኤስ."] }),

    defineField({ name: "testimonialQuote_en",  title: "Quote (EN)",  type: "string", group: "en", initialValue: "The consumer isn’t a moron, she is your wife." }),
    defineField({ name: "testimonialAuthor_en", title: "Author (EN)", type: "string", group: "en", initialValue: "David Ogilvy" }),
    defineField({ name: "testimonialRole_en",   title: "Role (EN)",   type: "string", group: "en", initialValue: "Founder, Ogilvy | Our Inspiration" }),
    defineField({ name: "testimonialQuote_am",  title: "ጥቅስ (አማ)",  type: "string", group: "am", initialValue: "ተጠ�ቃሚው ደደብ አይደለም፣ ሚስትህ ነች።" }),
    defineField({ name: "testimonialAuthor_am", title: "ደራሲ (አማ)", type: "string", group: "am", initialValue: "ዴቪድ ኦግልቪ" }),
    defineField({ name: "testimonialRole_am", title: "ሚና (አማ)",   type: "string", group: "am", initialValue: "መስራች፣ ኦግልቪ | የእኛ መነሳሳት" }),

    // === OUR WAY POINTS — THIS IS THE ONE THAT MATTERS ===
    defineField({
      name: "ourWayPoints",
      title: "Our Way Reasons (3 Points)",
      type: "array",
      of: [
        {
          type: "object",
          name: "point",
          title: "Reason Point",
          fields: [
            {
              name: "number",
              title: "Number",
              type: "string",
              initialValue: "01",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "heading_en",
              title: "Heading (English)",
              type: "string",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "heading_am",
              title: "ርዕስ (አማርኛ)",
              type: "string",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "description_en",
              title: "Description (English)",
              type: "text",
              rows: 3,
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "description_am",
              title: "መግለጫ (አማርኛ)",
              type: "text",
              rows: 3,
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "heading_en", subtitle: "number" },
          },
        },
      ],
    }),

    // === IMAGES — KEEP EXACTLY AS BEFORE ===
    defineField({
      name: "imageProblem",
      title: "Problem Tab Image (David Ogilvy)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageOurWay1",
      title: "Our Way Image 1 (Front)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageOurWay2",
      title: "Our Way Image 2 (Back, offset)",
      type: "image",
      options: { hotspot: true },
    }),
  ],

  preview: { prepare: () => ({ title: "Our Way Section" }) },
})