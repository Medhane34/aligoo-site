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

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Kebede',
        role: 'Marketing Director',
        company: 'Muko Furniture',
        image: '/team/avatar-1.jpeg', // Placeholder
        content: "Aligoo didn't just build a website; they transformed our entire digital presence. The attention to detail and premium design has directly increased our online sales by 40%.",
        rating: 5
    },
    {
        id: '2',
        name: 'Dawit Tadesse',
        role: 'CEO',
        company: 'Hirut Export',
        image: '/team/avatar-rediet.jpg', // Placeholder
        content: "The team's professionalism is unmatched. They understood our vision immediately and delivered a platform that perfectly represents our global brand. Highly recommended.",
        rating: 5
    },
    {
        id: '3',
        name: 'Michael Alemu',
        role: 'Operations Manager',
        company: 'GPS Express',
        image: '/team/avatar-1.jpeg', // Placeholder
        content: "Fast, creative, and technically brilliant. The new site loads instantly and the user experience is seamless. It's rare to find an agency that cares this much about quality.",
        rating: 5
    }
]

export default function TestimonialSection() {
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
                        <span className="text-sm font-medium text-white">Client Success Stories</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                        Trusted by <br />
                        <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                            Industry Leaders
                        </span>
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
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                                        <p className="text-neutral-500 text-xs">{testimonial.role}, {testimonial.company}</p>
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

function SpotlightCard({ children, index }: { children: React.ReactNode; index: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
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
