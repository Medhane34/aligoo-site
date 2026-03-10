// sanity/schemas/proposal/proposal.tsimport {defineField} from 'sanity'
import { getInitialUniqueCode } from '../../../aligoo-digital-agency/utils/uniqueCodeGenerator'

export default {
  name: 'proposal',
  title: 'Live Proposal',
  type: 'document',
  fields: [
    {
      name: 'template',
      title: 'Based on Template',
      type: 'reference',
      to: [{ type: 'proposalTemplate' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'clientEmail',
      title: 'Client Email',
      type: 'string',
    },
    {
      name: 'clientPhone',
      title: 'Client Phone (with country code)',
      type: 'string',
      description: 'e.g. +919876543210',
    },
    {

      name: 'salesperson',
      title: 'Assigned Salesperson',
      type: 'reference',
      to: [{ type: 'salesUser' }],
    },
    {
      name: 'uniqueCode',
      title: 'Short Code (URL)',
      type: 'string',
      initialValue: getInitialUniqueCode,
      readOnly: true,
    },
    // ADD THIS TO PROPOSAL DOCUMENT (not template!)
    {
      name: 'videoGreeting',
      title: 'Personalized Video Greeting',
      type: 'object',
      description: 'Upload a short Loom/YouTube/Vimeo video just for this client',
      fields: [
        {
          name: 'enabled',
          title: 'Show Video Greeting',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'video',
          title: 'Upload Video (MP4)',
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm',
          },
          validation: (Rule: any) => Rule.custom((value: any) => {
            if (!value) return 'Upload a video for this client'
            return true
          })
        },
        {
          name: 'thumbnail',
          title: 'Thumbnail (Your Face)',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'greetingText',
          title: 'Tooltip Text',
          type: 'string',
          initialValue: 'Hi {{clientName}}, I made this just for you!',
        }
      ],
      preview: {
        select: {
          enabled: 'enabled',
          videoUrl: 'videoUrl',
          clientName: 'clientName',
          media: 'thumbnail'
        },
        prepare({ enabled, videoUrl, clientName, media }: any) {
          return {
            title: enabled ? `Video for ${clientName}` : `Video (disabled) for ${clientName}`,
            subtitle: videoUrl ? 'Ready' : 'No video',
            media
          }
        }
      }
    },
    // ADD THIS: Roadmap Override
    {
      name: 'roadmap',
      title: 'Growth Roadmap (Override)',
      type: 'object',
      options: { collapsible: true },
      fields: [
        {
          name: 'enabled',
          title: 'Show Roadmap',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'useTemplate',
          title: 'Use Template Data?',
          type: 'boolean',
          initialValue: true,
          description: 'If checked, data will be pulled from the template. Uncheck to customize for this proposal.'
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Main Heading',
          hidden: ({ parent }: any) => parent?.useTemplate
        },
        {
          name: 'subheading',
          type: 'string',
          title: 'Subheading',
          hidden: ({ parent }: any) => parent?.useTemplate
        },
        {
          name: 'phases',
          title: 'Phases',
          type: 'array',
          hidden: ({ parent }: any) => parent?.useTemplate,
          of: [{
            type: 'object',
            name: 'phaseItem',
            fields: [
              { name: 'title', type: 'string', title: 'Phase Title' },
              { name: 'duration', type: 'string', title: 'Duration' },
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
                }
              }
            ],
            preview: {
              select: { title: 'title', subtitle: 'duration' }
            }
          }]
        }
      ]
    },
    // PERSONALIZED MOCKUP SHOWCASE
    {
      name: 'mockupShowcase',
      title: 'Personalized Mockup Showcase',
      type: 'object',
      description: 'Override the template mockup with client-specific video/link',
      options: { collapsible: true },
      fields: [
        {
          name: 'video',
          title: 'Mockup Video (Override)',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Upload a specific video for this client (overrides template)'
        },
        {
          name: 'mockupLink',
          title: 'Interactive Mockup Link (Override)',
          type: 'url',
          description: 'Link to specific Figma/Webflow prototype (overrides template)'
        }
      ]
    },
    // Discount 
    // sanity/schemas/documents/proposal.ts
    {
      name: 'discount',
      title: 'Discount Offer',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Discount',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'percentage',
          title: 'Discount Percentage (%)',
          type: 'number',
          validation: (Rule: { min: (arg0: number) => { (): any; new(): any; max: { (arg0: number): { (): any; new(): any; integer: { (): any; new(): any } }; new(): any } } }) => Rule.min(1).max(90).integer(),
          initialValue: 15,

        },
        {
          name: 'reason',
          title: 'Discount Reason (Optional – Shown to Client)',
          type: 'string',
          description: 'e.g. "Early Bird Special", "Limited Time Launch Offer", "VIP Client Bonus"',

        },
      ],
    },


    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['draft', 'sent', 'viewed', 'accepted',
          'contract_sent', 'signed', 'expired',
          'payment_pending', 'paid'],
      },
      initialValue: 'draft',
    },
    {
      name: 'expiresAt',
      title: 'Expires On',
      type: 'datetime',
      initialValue: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // default +10 days
    },
    {
      name: 'daysLeftText',
      title: 'Days Left Display Text (e.g. "14 days", "3 days left", "Last Chance!")',
      type: 'string',
      description: 'This is what the client sees in the countdown banner. Update manually for urgency.',
      validation: (Rule: { required: () => any }) => Rule.required(),
      initialValue: '14 days',
    },

    {
      name: 'contractTemplate',
      title: 'Contract Template',
      type: 'reference',
      to: [{ type: 'contractTemplate' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'recommendedPackage',
      title: 'Recommended / Most Popular Package',
      description: 'This package will have the glowing "Recommended" badge',
      type: 'string',
      options: {
        list: [
          { title: 'Build (Basic)', value: 'basic' },
          { title: 'Grow (Pro)', value: 'pro' },
          { title: 'Accelerate (Enterprise)', value: 'enterprise' },
        ],
        layout: 'radio',

        direction: 'horizontal',
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'pro',
    },
    // Client’s Current Package Selection
    {
      name: 'currentSelection',
      title: 'Client’s Current Package Selection',
      type: 'object',
      fields: [
        { name: 'selectedPackage', type: 'string' },
        { name: 'selectedAddOns', type: 'array', of: [{ type: 'string' }] },
        { name: 'totalPrice', type: 'number' },
        // NEW: Deposit percentage (configurable per proposal)
        {
          name: 'depositPercentage',
          title: 'Deposit Required (%)',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
          initialValue: 50,
          description: 'e.g. 50 = 50% deposit required'
        },
        // NEW: Payment status tracking
        {
          name: 'paymentStatus',
          title: 'Payment Status',
          type: 'string',
          options: {
            list: [
              { title: 'Not Requested', value: 'none' },
              { title: 'Pending Confirmation', value: 'pending' },
              { title: 'Confirmed & Paid', value: 'paid' },
              { title: 'Failed / Refunded', value: 'failed' }
            ]
          },
          initialValue: 'none'
        }, {
          name: 'paymentConfirmedAt',
          title: 'Payment Confirmed At',
          type: 'datetime',
          readOnly: true
        },
        {
          name: 'paymentConfirmedByClientAt',
          title: 'Client Clicked “I Paid” At',
          type: 'datetime',
          readOnly: true
        }
      ],

      //
    },

    // Payment Proof 
    {
      name: 'paymentProof',
      title: 'Payment Proof (Screenshot)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
        }
      ],
      description: 'Client uploads screenshot of bank transfer / Telebirr payment',
      hidden: ({ document }: { document: { status: string } }) => document?.status !== 'payment_pending' && document?.status !== 'paid',
    },
    // contract Logs 
    {
      name: 'clientSignature',
      title: 'Client Digital Signature',
      type: 'image',
      options: { hotspot: true },
/*       hidden: ({ document }: { document: { status: string } }) => document?.status !== 'signed',
 */    },

    {
      name: 'signedContractPdf',
      title: 'Signed Contract (PDF)',
      type: 'file',
/*       hidden: ({ document }: { document: { status?: string } | any }) => document?.status !== 'signed',
 */    },


    {
      name: 'contractSignedAt',
      title: 'Signed On',
      type: 'datetime',
      readOnly: true,
/*   hidden: ({ document }) => !document?.contractSignedAt,
 */},
    // view logs 
    {
      name: 'viewLogs',
      title: 'View Logs (auto-filled)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'timestamp', type: 'datetime' },
            { name: 'ip', type: 'string' },
            { name: 'userAgent', type: 'string' },
            { name: 'event', type: 'string' }, // "opened", "addon_toggled", etc.
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'template.title',
      status: 'status',
    },
    prepare({ title, subtitle, status }: any) {
      return {
        title,
        subtitle: `${subtitle || 'No template'} • ${status}`,
      }
    },
  },
}