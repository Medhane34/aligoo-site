// schemaTypes/testimonialsSection.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonial0: 'testimonials.0.name_en',
      testimonial1: 'testimonials.1.name_en',
      testimonial2: 'testimonials.2.name_en',
    },
    prepare: ({ title, testimonial0, testimonial1, testimonial2 }) => {
      const testimonials = [testimonial0, testimonial1, testimonial2].filter(Boolean).join(', ');
      const subtitle = testimonials ? `Testimonials: ${testimonials}` : 'No testimonials selected';
      return {
        title: title || 'Testimonials Section',
        subtitle: subtitle,
      };
    },
  },
});