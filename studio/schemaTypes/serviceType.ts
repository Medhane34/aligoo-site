import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service', // Used in GROQ queries
  title: 'Service', // Shown in Sanity Studio
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
