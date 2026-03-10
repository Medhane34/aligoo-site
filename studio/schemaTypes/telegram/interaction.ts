// schemaTypes/telegram/interaction.ts
export default {
    name: 'interaction',
    title: 'User Interactions',
    type: 'document',
    fields: [
        {
            name: 'subscriber',
            title: 'Subscriber',
            type: 'reference',
            to: [{ type: 'subscriber' }],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: [{ type: 'campaign' }],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'action',
            title: 'Action Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Button Click', value: 'button_click' },
                    { title: 'PDF Download', value: 'pdf_download' },
                    { title: 'Link Click', value: 'link_click' }
                ]
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string'
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
            validation: (Rule: any) => Rule.required()
        }
    ],
    preview: {
        select: {
            subscriberName: 'subscriber.firstName',
            campaignTitle: 'campaign.title',
            action: 'action',
            timestamp: 'timestamp'
        },
        prepare({ subscriberName, campaignTitle, action, timestamp }: any) {
            return {
                title: `${subscriberName || 'Unknown'} - ${action}`,
                subtitle: `${campaignTitle} • ${new Date(timestamp).toLocaleString()}`
            }
        }
    }
};
