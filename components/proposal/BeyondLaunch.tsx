'use client'

import { motion } from 'framer-motion'
import { RefreshCw, TrendingUp, Shield, Megaphone, LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface BeyondLaunchService {
    icon: LucideIcon
    title: string
    description: string
}

interface BeyondLaunchProps {
    title?: string
    subtitle?: string
    services?: BeyondLaunchService[]
}

const defaultServices: BeyondLaunchService[] = [
    {
        icon: RefreshCw,
        title: 'Continual Improvement',
        description: 'We believe that a website is a living, evolving entity. Our phased enhancement approach allows for strategic upgrades and improvements based on performance data and changing user needs.',
    },
    {
        icon: Megaphone,
        title: 'Search Engine Marketing & Social Media Advertising',
        description: 'We can create and manage targeted Google Ads and Facebook Ads campaigns to reach your ideal audience and increase website traffic.',
    },
    {
        icon: TrendingUp,
        title: 'Search Engine Optimization (SEO)',
        description: 'We can optimize your website to rank higher in search results, driving organic traffic and qualified leads.',
    },
    {
        icon: Shield,
        title: 'Website Maintenance & Security',
        description: 'We offer ongoing website maintenance to ensure your website stays up-to-date, secure, and functioning smoothly.',
    },
]

export default function BeyondLaunch({
    title = 'Beyond Launch: Your Long-Term Growth Partner',
    subtitle = 'Our commitment doesn\'t end at launch. We\'re here to help your digital presence thrive.',
    services = defaultServices,
}: BeyondLaunchProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    // Prevent hydration mismatch by only rendering particles on client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: CSS Rocket */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Orbital Rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="w-[300px] h-[300px] rounded-full border border-orange-500/20"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
                            />
                        </div>

                        {/* Rocket Container */}
                        <div className="relative z-10">
                            {/* Rocket Body */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                            >
                                {/* Nose Cone */}
                                <div className="w-0 h-0 mx-auto border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-orange-500" />

                                {/* Main Body */}
                                <div className="w-[80px] h-[160px] mx-auto bg-gradient-to-b from-orange-500 to-red-600 relative shadow-2xl">
                                    {/* Window */}
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-400/30 border-2 border-cyan-300 flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-cyan-200/50" />
                                    </div>

                                    {/* Details */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />
                                </div>

                                {/* Wings */}
                                <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[60px] border-t-red-700 border-l-[30px] border-l-transparent" />
                                <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[60px] border-t-red-700 border-r-[30px] border-r-transparent" />

                                {/* Flames */}
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
                                    <motion.div
                                        animate={{
                                            scaleY: [1, 1.3, 1],
                                            opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="w-6 h-12 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 rounded-b-full"
                                    />
                                    <motion.div
                                        animate={{
                                            scaleY: [1, 1.4, 1],
                                            opacity: [0.9, 1, 0.9]
                                        }}
                                        transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                                        className="w-8 h-16 bg-gradient-to-b from-yellow-200 via-orange-400 to-red-500 rounded-b-full"
                                    />
                                    <motion.div
                                        animate={{
                                            scaleY: [1, 1.2, 1],
                                            opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
                                        className="w-6 h-12 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 rounded-b-full"
                                    />
                                </div>
                            </motion.div>

                            {/* Floating Particles - Client Only */}
                            {isMounted && [...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        y: [0, -100],
                                        x: [0, Math.random() * 40 - 20],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: 'easeOut'
                                    }}
                                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-orange-400 rounded-full"
                                    style={{ left: `${50 + (Math.random() - 0.5) * 20}%` }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Service Cards */}
                    <div className="space-y-6">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-pointer
                    ${hoveredIndex === index
                                            ? 'bg-white/10 border-orange-500/50 shadow-xl shadow-orange-500/10 scale-[1.02]'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                        }
                    backdrop-blur-xl
                  `}
                                >
                                    {/* Connection Line to Rocket (visible on hover) */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            className="absolute right-full top-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500 origin-right"
                                        />
                                    )}

                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <motion.div
                                            animate={hoveredIndex === index ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                        ${hoveredIndex === index
                                                    ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/50'
                                                    : 'bg-orange-500/20'
                                                }
                      `}
                                        >
                                            <Icon className="w-7 h-7 text-white" />
                                        </motion.div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {service.title}
                                            </h3>
                                            <p className="text-neutral-300 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 -z-10 blur-xl"
                                        />
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-bold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                    >
                        Let's Talk Growth
                    </motion.button>
                </motion.div>

            </div>
        </section>
    )
}
