// sanity/schemas/post.ts
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  // ----- 1. Tabs (groups) -------------------------------------------------
  groups: [
    { name: 'en', title: 'English', default: true },
    { name: 'am', title: 'Amharic' },
    { name: 'seo', title: 'SEO & Social' }, // New SEO Group
  ],

  fields: [
    // ----- 2. Shared fields (outside any group) -------------------------
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_en' }, // uses English title as source
      validation: (rule) => rule.required(),
    }),
    {
      name: 'isExclusive',
      title: 'Is Exclusive (Private to Select Clients)',
      type: 'boolean',
      initialValue: false,  // Default to public
      description: 'If true, this post is hidden from public views and only shared via email/private links.',
    },

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category (Service)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main / Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        // Alt-text per language – still inside the image object
        defineField({
          name: 'alt_en',
          title: 'Alt Text (English)',
          type: 'string',
          group: 'en',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'alt_am',
          title: 'Alt Text (Amharic)',
          type: 'string',
          group: 'am',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    // Author Reference
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    // Promotional Card
    defineField({
      name: "promotionalCard",
      title: "Promotional Card",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
        defineField({ name: "buttonText", type: "string", title: "Button Text" }),
        defineField({ name: "buttonLink", type: "url", title: "Button Link" }),
      ],
    }),
    // ----- 3. English fields (group: en) -------------------------------
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      group: 'en',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'excerpt_en',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 3,
      group: 'en',
      validation: (rule) =>
        rule.required().min(10).max(200).error('10-200 characters required'),
    }),

    defineField({
      name: 'body_en',
      title: 'Body (English)',
      type: 'blockContent', // your custom portable-text type
      group: 'en',
    }),

    // ----- 4. Amharic fields (group: am) -------------------------------
    defineField({
      name: 'title_am',
      title: 'Title (Amharic)',
      type: 'string',
      group: 'am',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'excerpt_am',
      title: 'Excerpt (Amharic)',
      type: 'text',
      rows: 3,
      group: 'am',
      validation: (rule) =>
        rule.required().min(10).max(200).error('10-200 characters required'),
    }),

    defineField({
      name: 'body_am',
      title: 'Body (Amharic)',
      type: 'blockContent',
      group: 'am',
    }),

    // FAQs for Schema
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      description: 'Used to generate FAQ Schema for rich search results.',
      group: 'seo',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields', // Provided by sanity-plugin-seofields
      group: 'seo',
    }),
  ],

  // Optional preview (helps in the list view)
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'category.title_en',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : '',
        media,
      }
    },
  },
})