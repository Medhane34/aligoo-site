// wrappers/home/TestimonialsWrapper.tsx
import TestimonialsSectionScroll from "@/components/organism/home/testimonials"
import { fetchTestimonialsSection } from "@/lib/homepage"

export default async function TestimonialsWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchTestimonialsSection(lang)

  if (!data || !data.testimonials.length) return null

  return (
    <TestimonialsSectionScroll
      heading={data.heading}
      subheading={data.subheading}
      testimonials={data.testimonials}
    />
  )
}