import { Rule } from 'sanity'

export default {
    name: 'contractTemplate',
    title: 'Contract Template',
    type: 'document',

    groups: [
        { name: 'general', title: 'General & Header', default: true },
        { name: 'sections', title: 'Contract Sections' },
        { name: 'price', title: 'Price & Fees' },
        { name: 'legal', title: 'Legal & Signatures' },
    ],

    fields: [
        // GENERAL INFO
        {
            name: 'title',
            title: 'Template Name (e.g. Web Design Contract)',
            type: 'string',
            group: 'general',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'linkedProposalTemplate',
            title: 'Linked Proposal Template',
            type: 'reference',
            to: [{ type: 'proposalTemplate' }],
            group: 'general',
            validation: (Rule: Rule) => Rule.required(),
        },

        // HEADER (Prepared for / Created by)
        {
            name: 'header',
            title: 'Header Details',
            type: 'object',
            group: 'general',
            fields: [
                {
                    name: 'mainHeading',
                    title: 'Main Contract Title',
                    type: 'string',
                    initialValue: 'Web Design Agreement',
                },
                {
                    name: 'preparedForText',
                    title: '"Prepared for" Label',
                    type: 'string',
                    initialValue: 'Prepared for:',
                },
                {
                    name: 'createdByText',
                    title: '"Created by" Label',
                    type: 'string',
                    initialValue: 'Created by:',
                },
            ],
        },

        // MAIN CONTRACT SECTIONS (Introduction, Services, etc.)
        {
            name: 'sections',
            title: 'Contract Sections',
            type: 'array',
            group: 'sections',
            of: [
                {
                    type: 'object',
                    name: 'contractSection',
                    title: 'Section',
                    fields: [
                        {
                            name: 'heading',
                            title: 'Section Heading (e.g. 1. WEB DESIGN SERVICES)',
                            type: 'string',
                            validation: (Rule: Rule) => Rule.required(),
                        },
                        {
                            name: 'body',
                            title: 'Body Text (use {{placeholders}} like {{clientName}}, {{packagePrice}}, {{totalPrice}})',
                            type: 'text',
                            rows: 10,
                            validation: (Rule: Rule) => Rule.required(),
                        },
                        {
                            name: 'bullets',
                            title: 'Optional Bullet Points',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                    ],
                    preview: {
                        select: { title: 'heading' },
                        prepare({ title }: any) {
                            return { title: title || 'Untitled Section' }
                        },
                    },
                },
            ],
        },

        // PRICE & FEES SECTION
        {
            name: 'priceSection',
            title: 'Price & Fees Section',
            type: 'object',
            group: 'price',
            fields: [
                {
                    name: 'heading',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: '3. FEES AND EXPENSES',
                },
                {
                    name: 'body',
                    title: 'Price Section Body (use placeholders)',
                    type: 'text',
                    rows: 8,
                    description: 'Use: {{packageName}}, {{packagePrice}}, {{addOnsList}}, {{totalPrice}}, {{depositAmount}}',
                },
                {
                    name: 'autoGenerateTable',
                    title: 'Auto-Generate Price Breakdown Table?',
                    type: 'boolean',
                    initialValue: true,
                },
            ],
        },

        // ADDITIONAL LEGAL SECTIONS (Term, IP, Jurisdiction, etc.)
        {
            name: 'legalSections',
            title: 'Additional Legal Sections',
            type: 'array',
            group: 'legal',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'heading', title: 'Heading', type: 'string' },
                        { name: 'body', title: 'Body Text', type: 'text', rows: 6 },
                    ],
                    preview: { select: { title: 'heading' } },
                },
            ],
        },

        // AGENCY PRE-FILLED SIGNATURE
        {
            name: 'agencySignature',
            title: 'Agency Signature (Pre-filled)',
            type: 'object',
            group: 'legal',
            fields: [
                {
                    name: 'companyName',
                    title: 'Agency Company Name',
                    type: 'string',
                    initialValue: 'Aligoo Digital PLC',
                },
                {
                    name: 'signerName',
                    title: 'Authorized Signer Name',
                    type: 'string',
                    initialValue: 'Amanuel Tesfaye',
                },
                {
                    name: 'signatureImage',
                    title: 'Pre-Signed Signature Image (PNG)',
                    type: 'image',
                    options: { hotspot: true },
                    description: 'Upload a transparent PNG of your signature',
                },
            ],
        },
    ],

    preview: {
        select: {
            title: 'title',
            linked: 'linkedProposalTemplate.title',
        },
        prepare({ title, linked }: any) {
            return {
                title: title || 'Untitled Contract',
                subtitle: linked ? `→ ${linked}` : 'No proposal template linked',
            }
        },
    },
}