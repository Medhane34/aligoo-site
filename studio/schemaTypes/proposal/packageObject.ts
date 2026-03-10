export default {
  name: 'packageObject',
  title: 'Package',
  type: 'object',
  fields: [
    {name: 'name', type: 'string', title: 'Name'},
    {name: 'price', type: 'number', title: 'Price (₹)'},
    {name: 'isDefault', type: 'boolean', title: 'Default Selected?'},
    {name: 'popular', type: 'boolean', title: 'Most Popular?'},
    {name: 'features', type: 'array', of: [{type: 'string'}], title: 'Features'},
  ],
  preview: {
    select: {title: 'name', price: 'price', popular: 'popular'},
    prepare: ({title, price, popular}: any) => ({
      title: `${title} ${popular ? '★ Popular' : ''}`,
      subtitle: `₹${price?.toLocaleString('en-IN')}`,
    }),
  },
}