// sanity/schemas/documents/subscriber.ts   ← name this file "subscriber.ts" (singular)
export default {
    name: 'subscriber',
    title: 'Subscriber',
    type: 'document',
    fields: [
        { name: 'telegramId', type: 'number', title: 'Telegram ID', readOnly: true },
        { name: 'firstName', type: 'string', title: 'First Name' },
        { name: 'lastName', type: 'string', title: 'Last Name' },
        { name: 'username', type: 'string', title: 'Username' },
        { name: 'phone', type: 'string', title: 'Phone Number' },
        {
            name: 'source',
            type: 'string',
            title: 'Lead Source',
            options: {
                list: [
                    { title: '📘 Facebook', value: 'facebook' },
                    { title: '📸 Instagram', value: 'instagram' },
                    { title: '🌐 Web', value: 'web' },
                    { title: '📺 Youtube', value: 'youtube' },
                    { title: '🔗 Other', value: 'other' }
                ]
            }
        },
        { name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
        {
            name: 'services',
            title: 'Interested Services',
            type: 'array',
            of: [{ type: 'string' }],
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
        { name: 'temperature', type: 'string', initialValue: 'Warm', options: { list: ['Hot', 'Warm', 'Cold', 'Dead'] } },
        { name: 'lastActive', type: 'datetime', title: 'Last Active' },
        { name: 'joinedAt', type: 'datetime', title: 'Joined At', readOnly: true },
        { name: 'isActive', type: 'boolean', initialValue: true },
        { name: 'notes', type: 'text', title: 'Sales Notes' },
    ],
    preview: {
        select: {
            firstName: 'firstName',
            username: 'username',
            phone: 'phone',
            source: 'source',
            telegramId: 'telegramId',
        },
        prepare({ firstName, username, phone, source, telegramId }: any) {
            return {
                title: `${firstName || 'No Name'} ${username ? `@${username}` : ''}`.trim() || `ID: ${telegramId}`,
                subtitle: [phone, source].filter(Boolean).join(' • ') || `ID: ${telegramId}`,
            };
        },
    },
};