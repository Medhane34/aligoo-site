// sanity/schemas/proposal/salesUser.ts
export default {
  name: 'salesUser',
  title: 'Sales Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'telegramChatId',
      title: 'Telegram Chat ID (for alerts)',
      type: 'string',
      description: 'Required for instant notifications',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: { list: ['sales', 'admin'] },
      initialValue: 'sales',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
}