'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Code, Globe, Zap, BarChart3, Users, ExternalLink, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { AboutUsData } from '@/types/ProposalType'
import * as LucideIcons from 'lucide-react'

interface AboutUsSectionProps {
    data?: AboutUsData | null
}

// Icon mapper to convert string names to Lucide components
const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Users
    const Icon = (LucideIcons as any)[iconName]
    return Icon || Users
}

export default function AboutUsSection({ data }: AboutUsSectionProps) {
    // Fallback to static content if no data provided
    const badge = data?.badge || { icon: 'Users', text: 'Who We Are' }
    const heading = data?.heading || 'More Than An Agency.'
    const subheading = data?.subheading || 'Your Growth Partner.'
    const paragraphs = data?.paragraphs || [
        'Aligoo is a dynamic digital marketing agency with a proven track record of delivering exceptional results. With over 3 years of industry experience, we have honed our expertise in crafting innovative digital strategies that drive growth.',
        'Our mission is to be your trusted partner in achieving exponential business growth through result-driven digital marketing campaigns and websites.'
    ]
    const expertiseTags = data?.expertiseTags || [
        { icon: 'Globe', label: 'Web Design' },
        { icon: 'Code', label: 'Development' },
        { icon: 'Zap', label: 'Social Ads' },
        { icon: 'BarChart3', label: 'SEO & Analytics' }
    ]
    const cta = data?.cta || { text: 'Learn More About Us', url: '/about' }
    const card = data?.card || {
        companyName: 'Aligoo',
        establishedYear: 'Est. 2021',
        yearsText: '3+ Years',
        subtitle: 'Digital Excellence',
        badges: ['50+ Projects', '100% Success']
    }

    const BadgeIcon = getIcon(badge.icon)

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: 3D Digital DNA Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <DigitalDNACard card={card} />
                    </div>

                    {/* Right Side: The Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <BadgeIcon className="w-4 h-4 text-[#FF595E]" />
                            <span className="text-sm font-medium text-white">{badge.text}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                            {heading} <br />
                            <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                                {subheading}
                            </span>
                        </h2>

                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-lg text-neutral-400 mb-8 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {expertiseTags.map((tag, index) => (
                                <TechPill key={index} icon={getIcon(tag.icon)} label={tag.label || ''} />
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Link href={cta.url || '/about'} target="_blank" className="inline-block">
                            <button className="group relative px-8 py-4 bg-white text-neutral-950 rounded-full font-bold flex items-center gap-3 hover:bg-neutral-200 transition-colors">
                                {cta.text}
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

function DigitalDNACard({ card }: { card: NonNullable<AboutUsData['card']> }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const xPct = (clientX - left) / width - 0.5
        const yPct = (clientY - top) / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

    // Split company name for styling (e.g., "Ali" + "goo")
    const companyName = card.companyName || 'Aligoo'
    const splitIndex = Math.floor(companyName.length / 2)
    const firstPart = companyName.slice(0, splitIndex)
    const secondPart = companyName.slice(splitIndex)

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[350px] h-[450px] rounded-3xl bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center group"
        >
            {/* Floating Logo */}
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative w-32 h-32 mb-8"
            >
                <div className="absolute inset-0 bg-[#FF595E] rounded-full blur-3xl opacity-20 animate-pulse" />
                {/* Text Logo */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <h1 className="text-5xl font-black text-white tracking-tighter">
                        {firstPart}<span className="text-[#FF595E]">{secondPart}</span>
                    </h1>
                </div>
            </div>

            {/* Stats */}
            <div
                style={{ transform: "translateZ(30px)" }}
                className="text-center"
            >
                <div className="flex items-center gap-2 justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-neutral-400 text-xs font-mono uppercase tracking-widest">{card.establishedYear}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{card.yearsText}</h3>
                <p className="text-neutral-500 text-sm">{card.subtitle}</p>
            </div>

            {/* Floating Badges */}
            {card.badges && card.badges[0] && (
                <FloatingBadge
                    text={card.badges[0]}
                    className="absolute -top-6 -right-6 bg-neutral-800 border-neutral-700"
                    delay={0}
                />
            )}
            {card.badges && card.badges[1] && (
                <FloatingBadge
                    text={card.badges[1]}
                    className="absolute -bottom-6 -left-6 bg-[#FF595E] border-[#FF595E] text-white"
                    delay={0.2}
                />
            )}

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none rounded-3xl" />
        </motion.div>
    )
}

function FloatingBadge({ text, className, delay }: { text: string, className?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + delay, duration: 0.5 }}
            style={{ transform: "translateZ(75px)" }}
            className={`px-4 py-2 rounded-xl border shadow-xl font-bold text-sm ${className}`}
        >
            {text}
        </motion.div>
    )
}

function TechPill({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF595E]/30 transition-all cursor-default group">
            <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[#FF595E] transition-colors" />
            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{label}</span>
        </div>
    )
}
