export default {
  name: 'addonObject',
  title: 'Add-On',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'price', type: 'number', title: 'Price (₹)' },
    { name: 'category', type: 'string', title: 'Category' },
    { name: 'preselected', type: 'boolean', title: 'Pre-select?' },
    { name: 'description', type: 'text', title: 'Short Description' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
    prepare: ({ title, subtitle }: any) => ({
      title,
      subtitle: `+ETB ${subtitle}`,
    }),
  },
}