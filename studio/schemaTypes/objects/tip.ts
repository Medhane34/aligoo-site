const tip = {
  name: 'tip',
  type: 'object',
  title: 'Tip Block',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tip Title'
    },
    {
      name: 'body',
      type: 'text',
      title: 'Tip Body'
    }
  ],
  preview: {
  select: { title: 'title', subtitle: 'body' },
  prepare(value: Record<string, any>) {
    return {
      title: value.title,
      subtitle: value.subtitle,
    }
  }
},
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return {
        title: `💡 Tip: ${title}`,
        subtitle
      }
    }
  }


export default tip
