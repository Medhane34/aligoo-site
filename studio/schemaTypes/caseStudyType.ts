// schemas/caseStudy.ts
import { defineField, defineType } from 'sanity';

const validateNoSpecialChars = (value: string | undefined) => {
  if (value && /[\u{0080}-\u{FFFF}]/u.test(value)) {
    return 'Field contains special characters (e.g., curly quotes). Use standard ASCII characters.';
  }
  return true;
};

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fieldsets: [
    {
      name: 'overviewSection',
      title: '1. Overview Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'goalSection',
      title: '2. Goal Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'strategySection',
      title: '3. Strategy Section (Overview)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'strategyDetailsSection',
      title: '4. Strategy Details (Alternating Text/Image)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'imageGallerySection',
      title: '5. Image Gallery',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'resultsSection',
      title: '6. Results Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'testimonialSection',
      title: '7. Client Testimonial',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'projectDetails',
      title: '8. Project Details (Metadata)',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title (Overview Heading)',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[\u{0080}-\u{FFFF}]/gu, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (rule) => rule.custom(validateNoSpecialChars),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary for preview cards on listing pages.',
      rows: 3,
      validation: (rule) => rule
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image / Featured Image',
      type: 'image',
      description: 'The primary image for this case study.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required().custom(validateNoSpecialChars),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order (for Pagination)',
      type: 'number',
      description: 'Lower numbers appear earlier.',
      validation: (rule) => rule.required().integer().positive(),

    }),
    defineField({
      name: 'overviewTitle',
      title: 'overview Section Title/Heading',
      type: 'string',
      description: 'Main heading for the Goal section.',
      validation: (rule) =>
        rule.required().min(10).max(200),
      fieldset: 'overviewSection',
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Overview Background Image',
      type: 'image',
      description: 'Large background image for the overview section.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
      fieldset: 'overviewSection',
    }),
    defineField({
      name: 'overviewDescription',
      title: 'Overview Body Text',
      type: 'text', // <-- Use 'text' for multi-line plain text
      rows: 3,
      description: 'Introductory paragraph for the overview.',
      validation: (rule) => rule.required(),
      fieldset: 'overviewSection',
    }),
    // 1. Industry Dropdown (Top 10 industries)
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Food & Beverage', value: 'food-beverage' },
          { title: 'Fashion & Apparel', value: 'fashion-apparel' },
          { title: 'Health & Wellness', value: 'health-wellness' },
          { title: 'Education & Training', value: 'education-training' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Beauty & Personal Care', value: 'beauty-care' },
          { title: 'Events & Entertainment', value: 'events-entertainment' },
          { title: 'Retail & E-commerce', value: 'retail-ecommerce' },
          { title: 'Professional Services', value: 'professional-services' },
          { title: 'Tech & SaaS', value: 'tech-saas' },
        ],
      },
      validation: (rule) => rule.required(),
      fieldset: 'overviewSection',
    }),

    // 2. Client Name
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Full name or business name of the client.',
      validation: (rule) => rule.required(),
      fieldset: 'overviewSection',
    }),

    // 3. The Goals (1–2 sentences)
    defineField({
      name: 'goalsSummary',
      title: 'The Goals (1–2 Sentences)',
      type: 'text',
      rows: 3,
      description: 'Summarize the primary business or marketing goals.',
      validation: (rule) => rule.required().min(20).max(300),
      fieldset: 'overviewSection',
    }),

    // 4. The Challenge (1–2 sentences)
    defineField({
      name: 'challengeSummary',
      title: 'The Challenge (1–2 Sentences)',
      type: 'text',
      rows: 3,
      description: 'Summarize the main challenges the client faced.',
      validation: (rule) => rule.required().min(20).max(300),
      fieldset: 'overviewSection',
    }),


    // 🎯 Goal Section 
    defineField({
      name: 'goalTitle',
      title: 'Goal Section Title/Heading',
      type: 'string',
      description: 'Main heading for the Goal section.',
      validation: (rule) =>
        rule.required().min(10).max(200),
      fieldset: 'goalSection',
    }),
    defineField({
      name: 'goalBody',
      title: 'Goal Section Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description of the goals.',
      validation: (rule) => rule.required(),
      fieldset: 'goalSection',
    }),
    defineField({
      name: 'strategyIntroHeading',
      title: 'Strategy Intro Heading',
      type: 'string',
      description: 'Main heading for the strategic approach.',
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock1Heading',
      title: 'Block 1: Heading (Text Left, Image Right)',
      type: 'string',
      description: 'e.g., "Deep-Dive Market & Audience Research"',
      validation: (rule) =>
        rule.required().min(10).max(100),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock1Body',
      title: 'Block 1: Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description for this block.',
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock1Image',
      title: 'Block 1: Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock2Heading',
      title: 'Block 2: Heading (Image Left, Text Right)',
      type: 'string',
      description: 'e.g., "Multi-Channel Campaign Activation"',
      validation: (rule) =>
        rule.required().min(10).max(100),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock2Body',
      title: 'Block 2: Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description for this block.',
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock2Image',
      title: 'Block 2: Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock3Heading',
      title: 'Block 3: Heading (Text Left, Image Right)',
      type: 'string',
      description: 'e.g., "Iterative Optimization & Scaling"',
      validation: (rule) =>
        rule.required().min(10).max(100),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock3Body',
      title: 'Block 3: Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description for this block.',
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'strategyBlock3Image',
      title: 'Block 3: Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
      fieldset: 'strategyDetailsSection',
    }),
    defineField({
      name: 'galleryHeading',
      title: 'Gallery Heading',
      type: 'string',
      description: 'Main heading for the image gallery section.',
      validation: (rule) => rule.required(),
      fieldset: 'imageGallerySection',
    }),
    defineField({
      name: 'galleryDescription',
      title: 'Gallery Description',
      type: 'text',
      description: 'A short description for the image gallery section.',
      rows: 3,
      validation: (rule) => rule.required(),
      fieldset: 'imageGallerySection',
    }),
    defineField({
      name: 'galleryImage1',
      title: 'Gallery Image 1',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for SEO and accessibility.',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Text displayed below the image.',
          validation: (rule) =>
            rule.required().max(100),
        }),
      ],
      fieldset: 'imageGallerySection',
      description: 'First image in the gallery.',
    }),
    defineField({
      name: 'galleryImage2',
      title: 'Gallery Image 2',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for SEO and accessibility.',
              validation: (rule) => rule.required().custom(validateNoSpecialChars),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Text displayed below the image.',
          validation: (rule) =>
            rule.required().max(100).custom(validateNoSpecialChars),
        }),
      ],
      fieldset: 'imageGallerySection',
      description: 'Second image in the gallery.',
    }),
    defineField({
      name: 'galleryImage3',
      title: 'Gallery Image 3',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for SEO and accessibility.',
              validation: (rule) => rule.required().custom(validateNoSpecialChars),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Text displayed below the image.',
          validation: (rule) =>
            rule.required().max(100).custom(validateNoSpecialChars),
        }),
      ],
      fieldset: 'imageGallerySection',
      description: 'Third image in the gallery.',
    }),
    defineField({
      name: 'resultsHeading',
      title: 'Results Heading',
      type: 'string',
      description: 'Main heading for the results section.',
      validation: (rule) => rule.required(),
      fieldset: 'resultsSection',
    }),
    defineField({
      name: 'resultsBody',
      title: 'Results Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main narrative text for the results section.',
      validation: (rule) => rule.required(),
      fieldset: 'resultsSection',
    }),
    defineField({
      name: 'resultsStat1',
      title: 'Results Stat 1 (Top)',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g., "18.2x"',
          validation: (rule) =>
            rule.required().max(20),
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g., "Return on Ad Spend (ROAS)"',
          validation: (rule) =>
            rule.required().max(100),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'e.g., "Achieved within the first 10 days."',
          validation: (rule) => rule.max(200),
        }),
      ],
      fieldset: 'resultsSection',
      description: 'First key performance indicator.',
    }),
    defineField({
      name: 'resultsStat2',
      title: 'Results Stat 2 (Middle)',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g., "4,300+"',
          validation: (rule) =>
            rule.required().max(20),
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g., "New Customer Engagements"',
          validation: (rule) =>
            rule.required().max(100),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'e.g., "Reached with minimal ad budget."',
          validation: (rule) => rule.max(200),
        }),
      ],
      fieldset: 'resultsSection',
      description: 'Second key performance indicator.',
    }),
    defineField({
      name: 'resultsStat3',
      title: 'Results Stat 3 (Bottom)',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'e.g., "2.5x"',
          validation: (rule) =>
            rule.required().max(20),
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'e.g., "Increase in Qualified Leads"',
          validation: (rule) =>
            rule.required().max(100),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'e.g., "Compared to previous campaign."',
          validation: (rule) => rule.max(200),
        }),
      ],
      fieldset: 'resultsSection',
      description: 'Third key performance indicator.',
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full quote from the client.',
      fieldset: 'testimonialSection',
    }),
    defineField({
      name: 'testimonialAuthorName',
      title: 'Author Name',
      type: 'string',
      description: 'The name of the person giving the testimonial.',

      fieldset: 'testimonialSection',
    }),
    defineField({
      name: 'testimonialAuthorPosition',
      title: 'Author Position',
      type: 'string',
      description: 'The position or title of the person.',

      fieldset: 'testimonialSection',
    }),
    defineField({
      name: 'rating',
      title: 'rating value',
      type: 'number',
      description: 'The rating of the person.',
      fieldset: 'testimonialSection',
    }),

    // --- NEW METADATA FIELDS ---
    defineField({
      name: 'servicesList',
      title: 'Services Provided',
      type: 'array',
      description: 'List specific deliverables (e.g., UX Audit, Next.js Dev).',
      of: [{ type: 'string' }],
      fieldset: 'projectDetails',
    }),
    defineField({
      name: 'projectDuration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g., "3 Months" or "Oct 2023 - Jan 2024"',
      fieldset: 'projectDetails',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      description: 'Tools and technologies used.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Next.js', value: 'Next.js' },
          { title: 'React', value: 'React' },
          { title: 'TypeScript', value: 'TypeScript' },
          { title: 'Tailwind CSS', value: 'Tailwind CSS' },
          { title: 'Sanity CMS', value: 'Sanity CMS' },
          { title: 'Framer Motion', value: 'Framer Motion' },
          { title: 'Figma', value: 'Figma' },
          { title: 'Shopify', value: 'Shopify' },
          { title: 'WordPress', value: 'WordPress' },
          { title: 'Node.js', value: 'Node.js' },
          { title: 'GraphQL', value: 'GraphQL' },
          { title: 'Vercel', value: 'Vercel' },
        ],
      },
      fieldset: 'projectDetails',
    }),
    defineField({
      name: 'liveSiteUrl',
      title: 'Live Site URL',
      type: 'url',
      description: 'Direct link to the finished project.',
      fieldset: 'projectDetails',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      description: 'Team members who worked on this project.',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      fieldset: 'projectDetails',
    }),
  ],
});