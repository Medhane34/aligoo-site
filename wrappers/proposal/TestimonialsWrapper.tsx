
// components/wrappers/TestimonialsWrapper.tsx
import TestimonialsSection from '@/components/proposal/TestimonialSection'

interface TestimonialsWrapperProps {
    testimonials?: {
        enabled?: boolean
        badgeText?: string
        mainHeading?: string
        highlightedText?: string
        items: Array<{
            name: string
            role: string
            company: string
            imageUrl?: string
            content: string
            rating: number
        }>
    } | null
}

export default function TestimonialsWrapper({ testimonials }: TestimonialsWrapperProps) {
    if (!testimonials?.enabled || !testimonials.items?.length) return null

    return (
        <TestimonialsSection
            badgeText={testimonials.badgeText || 'Client Success Stories'}
            mainHeading={testimonials.mainHeading || 'Trusted by Industry Leaders'}
            highlightedText={testimonials.highlightedText || 'Industry Leaders'}
            testimonials={testimonials.items.map(item => ({
                id: item.name,
                name: item.name,
                role: item.role,
                company: item.company,
                image: item.imageUrl || '/team/avatar-1.jpeg',
                content: item.content,
                rating: item.rating,
            }))}
        />
    )
}