// components/proposal/TestimonialSection.tsx
'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent } from 'react'

interface Testimonial {
    id: string
    name: string
    role: string
    company: string
    image: string
    content: string
    rating: number
}

interface TestimonialSectionProps {
    badgeText?: string
    mainHeading?: string
    highlightedText?: string
    testimonials: Testimonial[]
}

export default function TestimonialSection({
    badgeText = 'Client Success Stories',
    mainHeading = 'Trusted by Industry Leaders',
    highlightedText = 'Industry Leaders',
    testimonials,
}: TestimonialSectionProps) {
    if (!testimonials || testimonials.length === 0) return null

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 opacity-50" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-white">{badgeText}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
                        {mainHeading.includes(highlightedText) ? (
                            <>
                                {mainHeading.split(highlightedText)[0]}
                                <br className="md:hidden" />
                                <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                                    {highlightedText}
                                </span>
                                {mainHeading.split(highlightedText)[1] && (
                                    <>{mainHeading.split(highlightedText)[1]}</>
                                )}
                            </>
                        ) : (
                            <>
                                {mainHeading}
                                <br className="md:hidden" />
                                <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                                    {highlightedText}
                                </span>
                            </>
                        )}
                    </h2>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <SpotlightCard key={testimonial.id} index={index}>
                            <div className="relative z-20 h-full flex flex-col">
                                {/* Quote Icon */}
                                <div className="mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF595E]/20 to-orange-500/20 flex items-center justify-center border border-[#FF595E]/20">
                                        <Quote className="w-5 h-5 text-[#FF595E]" />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-lg text-neutral-300 leading-relaxed mb-8 flex-grow font-serif italic">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                                        <p className="text-neutral-500 text-xs">
                                            {testimonial.role}, {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

// SpotlightCard — unchanged, perfect as is
function SpotlightCard({ children, index }: { children: React.ReactNode; index: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative border border-white/10 bg-neutral-900/50 rounded-3xl px-8 py-10 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 89, 94, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            {/* Border Highlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 89, 94, 0.4),
              transparent 80%
            )
          `,
                }}
            />

            {children}
        </motion.div>
    )
}