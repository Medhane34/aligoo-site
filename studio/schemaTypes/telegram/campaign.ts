
// sanity/schemas/documents/campaign.ts
export default {
    name: 'campaign',
    title: 'Campaigns',
    type: 'document',
    orderings: [
        { title: 'Newest First', name: 'createdAtDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
    ],
    fields: [
        {
            name: 'title',
            title: 'Internal Title (only you see this)',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
            description: 'Example: "Dec 1 – Free Website Audit Offer", "Week 2 Case Study", "Voice Note from CEO"',
        },
        {
            name: 'service',
            title: 'Target Audience (Service Segment)',
            type: 'string',
            description: 'Leave empty to send to ALL subscribers',
            options: {
                list: [
                    { title: '🎨 Web Design', value: 'web-design' },
                    { title: '🔄 Web Redesign (Upgrade)', value: 'web-redesign' },
                    { title: '🔍 SEO', value: 'seo' },
                    { title: '📘 Facebook & Instagram Ads', value: 'facebook-ads' },
                    { title: '🎵 TikTok Ads', value: 'tiktok-ads' }
                ]
            }
        },
        {
            name: 'content',
            title: 'Message Content (what subscribers receive)',
            type: 'array',
            of: [
                { type: 'block', styles: [], lists: [], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] } }, // simple text
                { type: 'image', options: { hotspot: true } },
                // We’ll add custom buttons in Phase 2 — for now we support link buttons inside text
            ],
            validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(1),
        },
        {
            name: 'attachPdf',
            title: 'Attach PDF (Lead Magnet)',
            type: 'file',
            description: 'Optional – if uploaded, a "Download PDF" button will be added automatically',
        },
        {
            name: 'ctaButtons',
            title: 'Call-to-Action Buttons',
            type: 'array',
            description: 'Add interactive buttons to your message (max 5 recommended)',
            validation: (Rule: any) => Rule.max(5),
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'text',
                        title: 'Button Text',
                        type: 'string',
                        validation: (Rule: any) => Rule.required().max(30),
                        description: 'Max 30 characters (e.g., "📖 Read More", "✅ I\'m Interested")'
                    },
                    {
                        name: 'type',
                        title: 'Button Type',
                        type: 'string',
                        options: {
                            list: [
                                { title: '🔗 External Link', value: 'url' },
                                { title: '📊 Track Click Only', value: 'callback' }
                            ]
                        },
                        initialValue: 'callback',
                        validation: (Rule: any) => Rule.required()
                    },
                    {
                        name: 'url',
                        title: 'URL (for link buttons)',
                        type: 'url',
                        hidden: ({ parent }: any) => parent?.type !== 'url',
                        validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] })
                    }
                ],
                preview: {
                    select: {
                        text: 'text',
                        type: 'type',
                        url: 'url'
                    },
                    prepare({ text, type, url }: any) {
                        return {
                            title: text || 'Untitled Button',
                            subtitle: type === 'url' ? `🔗 ${url}` : '📊 Tracking Click'
                        }
                    }
                }
            }]
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            readOnly: true,
            initialValue: 'draft',
            options: {
                list: ['draft', 'sending', 'sent', 'failed'],
            },
        },
        {
            name: 'sentAt',
            title: 'Sent At',
            type: 'datetime',
            readOnly: true,
        },
        {
            name: 'stats',
            title: 'Delivery Stats',
            type: 'object',
            readOnly: true,
            fields: [
                { name: 'totalSubscribers', type: 'number', title: 'Target' },
                { name: 'sent', type: 'number', title: 'Sent' },
                { name: 'failed', type: 'number', title: 'Failed' },
            ],
        },
        {
            name: 'debugLog',
            title: 'Debug Log (Error Details)',
            type: 'text',
            readOnly: true,
            rows: 5,
        },
    ],
    preview: {
        select: {
            title: 'title',
            status: 'status',
            sentAt: 'sentAt',
            total: 'stats.totalSubscribers',
            sent: 'stats.sent',
        },
        prepare({ title, status, sentAt, total, sent }: { title: string, status: string, sentAt: string, total: number, sent: number }) {
            const subtitles = [];
            if (status === 'sent' && sentAt) subtitles.push(`Sent ${new Date(sentAt).toLocaleString()}`);
            if (total) subtitles.push(`${sent || 0}/${total} delivered`);
            return {
                title: title || '(No title)',
                subtitle: subtitles.join(' • ') || status,
            };
        },
    },
};