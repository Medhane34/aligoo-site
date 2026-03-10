// sanity/schemas/documents/proposalTemplate.ts
import { Rule } from 'sanity'

export default {
  name: 'proposalTemplate',
  title: 'Proposal Template',
  type: 'document',

  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'aboutus', title: 'About Us Section' },
    { name: 'casestudy', title: 'Case Study Section' },
    { name: 'mockupshowcase', title: 'Mockup Showcase Section' },
    { name: 'Packages', title: 'Package Comparison Table' },
    { name: 'pricing', title: 'Package Prices (ETB)' },
    { name: 'addons', title: 'Add-Ons' },
    { name: 'timeline', title: 'Timeline' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'faq', title: 'FAQs' },
    { name: 'bonusGift', title: 'Bonus Section' },
    { name: 'nextSteps', title: 'Next Steps Section' },
    { name: 'roadmap', title: 'Growth Roadmap' },
    { name: 'extra', title: 'Extra Sections' },
  ],

  fields: [
    // GENERAL
    { name: 'title', title: 'Template Name', type: 'string', group: 'general', validation: (Rule: Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', group: 'general', options: { source: 'title' }, validation: (Rule: Rule) => Rule.required() },

    // HERO
    {
      name: 'hero', title: 'Hero Section', type: 'object', group: 'hero',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        { name: 'title', title: 'Main Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text', rows: 4 },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ]
    },

    // ABOUT US
    {
      name: 'aboutUs',
      title: 'About Us Section',
      type: 'object',
      group: 'aboutus',
      options: { collapsible: true },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Users, Globe, Code)',
              initialValue: 'Users'
            },
            { name: 'text', type: 'string', title: 'Badge Text', initialValue: 'Who We Are' }
          ]
        },
        { name: 'heading', type: 'string', title: 'Main Heading', initialValue: 'More Than An Agency.' },
        { name: 'subheading', type: 'string', title: 'Gradient Subheading', initialValue: 'Your Growth Partner.' },
        {
          name: 'paragraphs',
          title: 'Description Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (Rule: any) => Rule.max(3)
        },
        {
          name: 'expertiseTags',
          title: 'Expertise Tags',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'icon',
                type: 'string',
                title: 'Icon Name',
                description: 'Lucide icon (Globe, Code, Zap, BarChart3, etc.)'
              },
              { name: 'label', type: 'string', title: 'Label' }
            ],
            preview: {
              select: { title: 'label', subtitle: 'icon' }
            }
          }]
        },
        {
          name: 'cta',
          title: 'Call to Action Button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Learn More About Us' },
            { name: 'url', type: 'string', title: 'Button URL', initialValue: '/about' }
          ]
        },
        {
          name: 'card',
          title: '3D Card Stats',
          type: 'object',
          fields: [
            { name: 'companyName', type: 'string', title: 'Company Name', initialValue: 'Aligoo' },
            { name: 'establishedYear', type: 'string', title: 'Established Year', initialValue: 'Est. 2021' },
            { name: 'yearsText', type: 'string', title: 'Years Display', initialValue: '3+ Years' },
            { name: 'subtitle', type: 'string', title: 'Card Subtitle', initialValue: 'Digital Excellence' },
            {
              name: 'badges',
              title: 'Floating Badges',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.max(2),
              description: 'Max 2 badges (e.g., "50+ Projects", "100% Success")'
            }
          ]
        }
      ]
    },

    // CASE STUDY
    {
      name: 'caseStudy',
      title: 'Case Study Section',
      type: 'object',
      group: 'casestudy',
      options: { collapsible: true },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Sparkles, Award, Trophy)',
              initialValue: 'Sparkles'
            },
            { name: 'text', type: 'string', title: 'Badge Text', initialValue: 'Proven Track Record' }
          ]
        },
        { name: 'heading', type: 'string', title: 'Main Heading', initialValue: 'Delivering Results:' },
        { name: 'subheading', type: 'string', title: 'Gradient Subheading', initialValue: 'Digital Excellence Unveiled' },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'We don\'t just build websites; we build business assets. Here are a few of our recent success stories showcasing the impact we deliver.'
        },
        {
          name: 'projects',
          title: 'Case Study Projects',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Project Name', validation: (Rule: any) => Rule.required() },
              { name: 'industry', type: 'string', title: 'Industry' },
              { name: 'result', type: 'string', title: 'Result/Achievement', description: 'e.g., "🚀 Launched in 2 Weeks"' },
              {
                name: 'image',
                type: 'image',
                title: 'Project Screenshot',
                options: { hotspot: true },
                validation: (Rule: any) => Rule.required()
              },
              { name: 'url', type: 'url', title: 'Case Study URL (optional)' },
              {
                name: 'color',
                type: 'string',
                title: 'Gradient Color',
                description: 'Tailwind gradient classes',
                options: {
                  list: [
                    { title: 'Orange to Yellow', value: 'from-orange-500 to-yellow-500' },
                    { title: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
                    { title: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
                    { title: 'Purple to Pink', value: 'from-purple-500 to-pink-500' },
                    { title: 'Red to Orange', value: 'from-red-500 to-orange-500' },
                  ]
                },
                initialValue: 'from-orange-500 to-yellow-500'
              },
              {
                name: 'icon',
                type: 'string',
                title: 'Icon Name',
                description: 'Lucide icon (ShoppingBag, Globe, Layout, etc.)',
                initialValue: 'Layout'
              }
            ],
            preview: {
              select: {
                title: 'name',
                subtitle: 'industry',
                media: 'image'
              }
            }
          }],
          validation: (Rule: any) => Rule.min(1).max(6)
        },
        {
          name: 'cta',
          title: 'Call to Action Button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Request More Case Studies' },
            { name: 'url', type: 'string', title: 'Button URL (optional)' }
          ]
        }
      ]
    },

    // MOCKUP SHOWCASE
    {
      name: 'mockupShowcase',
      title: 'Mockup Showcase Section',
      type: 'object',
      group: 'mockupshowcase',
      options: { collapsible: true },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        { name: 'title', type: 'string', title: 'Main Title', initialValue: 'Putting Our Process into Action' },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Building on the insights from the discovery and planning phase, we translate client needs into a high-converting landing page. This mockup demonstrates how we can transform your vision into a powerful lead generation tool.'
        },
        {
          name: 'video',
          title: 'Mockup Video',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Upload the mockup video file (mp4, webm, etc.)'
        },
        { name: 'mockupLink', type: 'url', title: 'Interactive Mockup Link', initialValue: '#' }
      ]
    },

    // PRICING & PACKAGES
    /* {
      name: 'basePackages',
      title: 'Base Packages',
      type: 'array',
      group: 'pricing',
      of: [{
        type: 'object',
        name: 'package',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'price', type: 'number', title: 'Price (ETB)' },
          { name: 'isDefault', type: 'boolean', title: 'Default Selected?', initialValue: false },
          { name: 'popular', type: 'boolean', title: 'Most Popular?', initialValue: false },
          { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Features' },
        ],
        preview: {
          select: { title: 'name', price: 'price', popular: 'popular' },
          prepare: ({ title, price, popular }: any) => ({
            title: `${title} ${popular ? '★ Popular' : ''}`,
            subtitle: `ETB${price?.toLocaleString('en-IN')}`,
          }),
        },
      }],
    }, */

    // PRICING & PACKAGES — NEW COMPARISON TABLE (GOD MODE)
    // PRICING & PACKAGES — NEW COMPARISON TABLE (GOD MODE)
    {
      name: 'comparisonTable',
      title: 'Package Comparison Table',
      type: 'object',
      group: 'pricing',
      options: { collapsible: false },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },

        {
          name: 'groups',
          title: 'Feature Groups (Basic Details, SEO, Support, etc.)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'group',
              title: 'Feature Group',
              fields: [
                {
                  name: 'groupTitle',
                  title: 'Group Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'backgroundColor',
                  title: 'Header Background Color (Optional)',
                  type: 'string',
                  description: 'Pick a color or leave empty for default',
                  options: {
                    list: [
                      { title: 'Gold', value: '#f59e0b' },
                      { title: 'Emerald', value: '#10b981' },
                      { title: 'Blue', value: '#3b82f6' },
                      { title: 'Purple', value: '#8b5cf6' },
                      { title: 'Red', value: '#ef4444' },
                      { title: 'Dark Gray', value: '#1f2937' },
                    ],
                  },
                },
                {
                  name: 'items',
                  title: 'Features in this Group',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'featureRow',
                      title: 'Feature Row',
                      fields: [
                        {
                          name: 'feature',
                          title: 'Feature Name',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: 'basic',
                          title: 'Build (Basic)',
                          type: 'string',
                          description: 'Use: ✔, ✗, "7 pages", "10 Days", "3k/month", etc.',
                        },
                        {
                          name: 'pro',
                          title: 'Grow (Pro)',
                          type: 'string',
                        },
                        {
                          name: 'enterprise',
                          title: 'Accelerate (Enterprise)',
                          type: 'string',
                        },
                        {
                          name: 'note',
                          title: 'Note / Tooltip (Optional)',
                          type: 'string',
                          description: 'Appears as small text or tooltip',
                        },
                      ],
                      preview: {
                        select: {
                          title: 'feature',
                        },
                        prepare({ title }: any) {
                          return {
                            title: title || 'Untitled Feature',
                          }
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'groupTitle',
                },
                prepare({ title }: any) {
                  return {
                    title: `Section: ${title || 'Untitled Group'}`,
                  }
                },
              },
            },
          ],
        },
      ],
      preview: {
        select: {
          recommended: 'recommendedPackage',
        },
        prepare({ recommended }: any) {
          const labels: any = {
            basic: 'Build',
            pro: 'Grow',
            enterprise: 'Accelerate',
          }
          return {
            title: 'Comparison Table',
            subtitle: recommended ? `Recommended: ${labels[recommended]}` : 'No recommended package',
          }
        },
      },
    },
    // pricing 
    // PACKAGE PRICING (FOR CALCULATION)
    {
      name: 'packagePricing',
      title: 'Package Prices (ETB)',
      description: 'These prices are used for selection, calculation, and display at the bottom',
      type: 'object',
      group: 'pricing',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'basic',
          title: 'Build (Basic) Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0),
          initialValue: 85000,
        },
        {
          name: 'pro',
          title: 'Grow (Pro) Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0),
          initialValue: 185000,
        },
        {
          name: 'enterprise',
          title: 'Accelerate (Enterprise) Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0),
          initialValue: 350000,
        },
      ],
    },
    // ADD-ONS
    {
      name: 'addOns',
      title: 'Add-Ons',
      type: 'array',
      group: 'addons',
      of: [{
        type: 'object',
        name: 'addon',
        title: 'Add-On',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'price',
            type: 'number',
            title: 'Price (ETB)',
            validation: (Rule: any) => Rule.required().positive()
          },
          {
            name: 'category',
            type: 'string',
            title: 'Category (optional)'
          },
          {
            name: 'preselected',
            type: 'boolean',
            title: 'Pre-select for client?',
            initialValue: false
          },
          {
            name: 'description',
            title: 'Description (with links)',
            type: 'array',
            of: [
              {
                type: 'block',
                styles: [{ title: 'Normal', value: 'normal' }],
                marks: {
                  decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                  ],
                  annotations: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        {
                          name: 'href',
                          type: 'url',
                          title: 'URL',
                          validation: (Rule: any) =>
                            Rule.uri({
                              scheme: ['http', 'https', 'mailto', 'tel'],
                            }),
                        },
                        {
                          name: 'openInNewTab',
                          type: 'boolean',
                          title: 'Open in new tab?',
                          initialValue: true,
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            validation: (Rule: any) => Rule.required(),
          },
        ],
        preview: {
          select: {
            title: 'name',
            price: 'price',
            category: 'category',
            description: 'description',
          },
          prepare({ title, price, category, description }: any) {
            const plainText = description
              ? description
                .filter((block: any) => block._type === 'block')
                .map((block: any) => block.children.map((child: any) => child.text).join(''))
                .join(' ')
                .slice(0, 80) + '...'
              : ''

            return {
              title,
              subtitle: category
                ? `${category} • + ETB ${price.toLocaleString()}`
                : `+ ETB ${price.toLocaleString()}`,
              description: plainText || 'No description',
            }
          },
        },
      }],
    },
    // TIMELINE
    {
      name: 'timeline', title: 'Project Timeline', type: 'object', group: 'timeline', options: { collapsible: true },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        { name: 'sectionTitle', type: 'string', title: 'Section Title', initialValue: 'Project Timeline' },
        {
          name: 'items', type: 'array', of: [{
            type: 'object',
            fields: [
              { name: 'week', type: 'string', title: 'Week / Phase' },
              { name: 'title', type: 'string', title: 'Milestone' },
              { name: 'description', type: 'text', title: 'Details' },
            ],
          }]
        }
      ]
    },

    // TESTIMONIALS
    {
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'enabled',
          title: 'Show Testimonials Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Client Success Stories',
        },
        {
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'Trusted by Industry Leaders',
        },
        {
          name: 'highlightedText',
          title: 'Highlighted Text (in gradient)',
          type: 'string',
          initialValue: 'Industry Leaders',
        },
        {
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Client Name', type: 'string' },
                { name: 'role', title: 'Role', type: 'string' },
                { name: 'company', title: 'Company', type: 'string' },
                { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
                { name: 'content', title: 'Testimonial Quote', type: 'text', rows: 4 },
                { name: 'rating', title: 'Rating (1–5)', type: 'number', validation: (Rule: { min: (arg0: number) => { (): any; new(): any; max: { (arg0: number): any; new(): any } } }) => Rule.min(1).max(5) },
              ],
              preview: {
                select: { title: 'name', subtitle: 'company', media: 'image' },
              },
            },
          ],
        },
      ],
    },


    // FAQ
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      group: 'faq',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'enabled',
          title: 'Show FAQ Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Common Questions',
        },
        {
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'Got Questions?',
        },
        {
          name: 'highlightedText',
          title: 'Highlighted Text (Gradient)',
          type: 'string',
          initialValue: "We've Got Answers.",
        },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule: { required: () => any }) => Rule.required(),
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                  validation: (Rule: { required: () => any }) => Rule.required(),
                },
              ],
              preview: {
                select: { title: 'question' },
              },
            },
          ],
        },
      ],
    },
    // Bonus Gifts 
    {
      name: 'bonusGift',
      title: 'Bonus Gift Section',
      type: 'object',
      group: 'bonusGift',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'enabled',
          title: 'Show Bonus Gift Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Unlock Your VIP Perks',
        },
        {
          name: 'urgencyMessage',
          title: 'Urgency Message',
          type: 'string',
          initialValue: 'Limited Time Only - These Bonuses Vanish Soon!',
        },
        {
          name: 'countdownHours',
          title: 'Countdown Duration (Hours)',
          type: 'number',
          initialValue: 48,
          validation: (Rule: { min: (arg0: number) => { (): any; new(): any; max: { (arg0: number): any; new(): any } } }) => Rule.min(1).max(168),
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Claim Your Exclusive Gifts Now',
        },
        {
          name: 'gifts',
          title: 'Bonus Gifts',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Gift Title', type: 'string' },
                { name: 'value', title: 'Value (ETB)', type: 'number' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                {
                  name: 'features',
                  title: 'Features (Bullet Points)',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
                { name: 'icon', title: 'Icon (Emoji)', type: 'string', initialValue: 'Gift' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'value' },
                prepare: ({ title, subtitle }: any) => ({
                  title,
                  subtitle: `Worth ETB ${subtitle}`,
                }),
              },
            },
          ],
        },
      ],
    },
    // Next Steps 
    // Add this inside your proposalTemplate fields
    {
      name: 'nextSteps',
      title: 'Next Steps Section',
      type: 'object',
      group: 'nextSteps',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'enabled',
          title: 'Show Next Steps Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Your Path to Launch',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          initialValue: "We've made it simple. Here's exactly what happens after you choose your package.",
        },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'stepItem', // Give a name to the object type
              title: 'Step',
              fields: [
                { name: 'number', title: 'Step Number', type: 'number', validation: (Rule: any) => Rule.required().integer().min(1) },
                { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
                { name: 'description', title: 'Description', type: 'text', rows: 2, validation: (Rule: any) => Rule.required() },
                { name: 'timeEstimate', title: 'Time Estimate', type: 'string' },
                { name: 'status', title: 'Stauts Badge', type: 'string' },
                { name: 'color', title: 'Color (Tailwind Gradient Class)', type: 'string' },
                {
                  name: 'details',
                  title: 'Details (Bullet Points)',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
                {
                  name: 'faqs',
                  title: 'FAQs for this Step',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'faqItem',
                      title: 'FAQ Item',
                      fields: [
                        { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
                        { name: 'answer', title: 'Answer', type: 'text', rows: 2, validation: (Rule: any) => Rule.required() },
                      ],
                      preview: {
                        select: { title: 'question' },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: { title: 'title', subtitle: 'number' },
                prepare: ({ title, subtitle }: any) => ({ title: `Step ${subtitle}: ${title}` }),
              },
            },
          ],
          validation: (Rule: { min: (arg0: number) => any }) => Rule.min(1),
          initialValue: [
            {
              number: 1,
              title: 'Choose Your Perfect Package',
              description: 'Review our package options and select the one that fits your goals and budget. Customize with powerful add-ons.',
              timeEstimate: '~10 minutes',
              color: 'from-purple-500 to-pink-500',
              details: [
                'Compare all package features',
                'See transparent pricing breakdown',
                'Add optional features and add-ons',
                'Calculate your total investment',
                'Lock in exclusive bonuses'
              ],
              faqs: [
                { question: 'Can I change my package later?', answer: 'Yes! You can upgrade your package anytime before signing the contract.' },
                { question: 'What if I need custom features?', answer: 'We offer custom add-ons and can tailor any package to your specific needs.' }
              ]
            },
            {
              number: 2,
              title: 'Review & Sign Your Agreement',
              description: 'Review the terms, sign digitally, and lock in your exclusive bonuses. Takes less than 5 minutes.',
              timeEstimate: '~5 minutes',
              color: 'from-[#FF595E] to-orange-500',
              details: [
                'Review contract terms and conditions',
                'Digital signature (no printing required)',
                'Secure your exclusive bonus gifts',
                'Instant confirmation email'
              ],
              faqs: [
                { question: 'Can I make changes to the contract?', answer: 'Yes! Contact us before signing if you need any modifications.' },
                { question: 'Is the signature legally binding?', answer: 'Yes, our digital signatures are legally valid and secure.' }
              ]
            },
            {
              number: 3,
              title: 'Make Your Deposit Payment',
              description: 'Secure your project slot with a 50% deposit. Multiple payment options available for your convenience.',
              timeEstimate: '~10 minutes',
              color: 'from-orange-500 to-yellow-500',
              details: [
                'Pay 50% deposit to start',
                'Multiple payment methods accepted',
                'Secure payment processing',
                'Instant receipt and confirmation'
              ],
              faqs: [
                { question: 'What payment methods do you accept?', answer: 'We accept bank transfers, mobile money, and major credit cards.' },
                { question: 'When is the remaining 50% due?', answer: 'The final payment is due upon project completion and approval.' }
              ]
            },
            {
              number: 4,
              title: 'Project Kickoff Meeting',
              description: "We'll schedule a kickoff call to discuss your vision, goals, and timeline. Then we get to work bringing your website to life!",
              timeEstimate: 'Within 48 hours',
              color: 'from-cyan-500 to-blue-500',
              details: [
                'Schedule your kickoff meeting',
                'Discuss project goals and vision',
                'Review timeline and milestones',
                'Meet your dedicated team',
                'Start building your website!'
              ],
              faqs: [
                { question: 'How long until my website is live?', answer: 'Typical projects are completed in 4-6 weeks, depending on complexity.' },
                { question: 'Can I request changes during development?', answer: 'Absolutely! We include revision rounds to ensure you love the final result.' }
              ]
            }
          ]
        }
      ]
    },



    // --------------------------------------------------------------------------------
    // GROWTH ROADMAP (3-Month Vision)
    // --------------------------------------------------------------------------------
    {
      name: 'roadmap',
      title: 'Phased Growth Roadmap',
      type: 'object',
      group: 'roadmap',
      options: { collapsible: true },
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Section?', initialValue: true },
        { name: 'heading', type: 'string', title: 'Main Heading', initialValue: '90-Day Growth Plan' },
        { name: 'subheading', type: 'string', title: 'Subheading', initialValue: 'From Foundation to Scale.' },
        {
          name: 'phases',
          title: 'Phases',
          type: 'array',
          of: [{
            type: 'object',
            name: 'phaseItem',
            fields: [
              { name: 'title', type: 'string', title: 'Phase Title (e.g. Foundation)' },
              { name: 'duration', type: 'string', title: 'Duration (e.g. Month 1)' },
              { name: 'description', type: 'text', rows: 3, title: 'Description' },
              {
                name: 'deliverables',
                title: 'Deliverables (Rich Text)',
                type: 'array',
                of: [{ type: 'block' }]
              },
              { name: 'outcome', type: 'string', title: 'Key Outcome' },
              {
                name: 'color',
                type: 'string',
                title: 'Phase Color',
                options: {
                  list: [
                    { title: 'Green (Foundation)', value: 'green' },
                    { title: 'Yellow (Optimization)', value: 'yellow' },
                    { title: 'Blue (Scale)', value: 'blue' },
                    { title: 'Purple (Enterprise)', value: 'purple' }
                  ]
                },
                initialValue: 'green'
              }
            ],
            preview: {
              select: { title: 'title', subtitle: 'duration' }
            }
          }]
        }
      ]
    },


    // EXTRA
    {
      name: 'extraSections',
      title: 'Extra Content (Rich Text / Images)',
      type: 'array',
      group: 'extra',
      of: [
        { type: 'block', title: 'Rich Text Block' }, // Changed from 'text' to 'block'
        { type: 'image', title: 'Image', options: { hotspot: true } },
      ],
    },
  ],

  preview: {
    select: { title: 'title' },
    prepare: ({ title }: any) => ({ title: `Template: ${title}` }),
  },
}