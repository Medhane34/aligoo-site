'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Sparkles, Globe, Layout, ShoppingBag, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { CaseStudyData } from '@/types/ProposalType'
import * as LucideIcons from 'lucide-react'

interface Project {
    id: string
    name: string
    industry: string
    result: string
    image: string
    url: string
    color: string
    icon: any
}

interface CaseStudySectionProps {
    data?: CaseStudyData | null
}

// Icon mapper to convert string names to Lucide components
const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Layout
    const Icon = (LucideIcons as any)[iconName]
    return Icon || Layout
}

export default function CaseStudySection({ data }: CaseStudySectionProps) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)

    // Fallback to static content if no data provided
    const badge = data?.badge || { icon: 'Sparkles', text: 'Proven Track Record' }
    const heading = data?.heading || 'Delivering Results:'
    const subheading = data?.subheading || 'Digital Excellence Unveiled'
    const description = data?.description || 'We don\'t just build websites; we build business assets. Here are a few of our recent success stories showcasing the impact we deliver.'
    const cta = data?.cta || { text: 'Request More Case Studies', url: '#' }

    // Transform Sanity projects to component format with fallbacks
    const projects: Project[] = data?.projects && data.projects.length > 0
        ? data.projects.map((project, index) => ({
            id: project.name.toLowerCase().replace(/\s+/g, '-'),
            name: project.name,
            industry: project.industry || 'Industry',
            result: project.result || '✨ Success',
            image: project.image?.asset?.url || '/mockup/muko.png',
            url: project.url || '#',
            color: project.color || 'from-orange-500 to-yellow-500',
            icon: getIcon(project.icon)
        }))
        : [
            {
                id: 'muko',
                name: 'Muko Furniture',
                industry: 'E-Commerce',
                result: '🚀 Launched in 2 Weeks',
                image: '/mockup/muko.png',
                url: '#',
                color: 'from-orange-500 to-yellow-500',
                icon: ShoppingBag
            },
            {
                id: 'hirut',
                name: 'Hirut Export',
                industry: 'Export & Trade',
                result: '🌍 Global Reach',
                image: '/mockup/hirut.png',
                url: '#',
                color: 'from-green-500 to-emerald-500',
                icon: Globe
            },
            {
                id: 'gps',
                name: 'GPS Express',
                industry: 'Logistics',
                result: '⚡ 200% Faster Load',
                image: '/mockup/muko.png',
                color: 'from-blue-500 to-cyan-500',
                url: '#',
                icon: Layout
            }
        ]

    const BadgeIcon = getIcon(badge.icon)

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-[800px] h-[800px] bg-[#FF595E]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <BadgeIcon className="w-4 h-4 text-[#FF595E]" />
                        <span className="text-sm font-medium text-white">{badge.text}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                        {heading} <br />
                        <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                            {subheading}
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

                    {/* Featured Project (Large - Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 relative group"
                        onMouseEnter={() => setHoveredProject(projects[0].id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <BrowserFrame project={projects[0]} isHovered={hoveredProject === projects[0].id} height="h-[600px]" />
                    </motion.div>

                    {/* Secondary Projects (Stacked - Right) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {projects.slice(1).map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group flex-1"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <BrowserFrame project={project} isHovered={hoveredProject === project.id} height="h-[284px]" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <button className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full overflow-hidden transition-all">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF595E]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-3 text-white font-bold">
                            {cta.text}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>

            </div>
        </section>
    )
}

function BrowserFrame({ project, isHovered, height }: { project: Project; isHovered: boolean; height: string }) {
    const Icon = project.icon

    return (
        <div className={`relative w-full ${height} rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 ${isHovered ? 'shadow-[#FF595E]/20 scale-[1.02]' : ''}`}>

            {/* Browser Header */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-neutral-800/50 backdrop-blur-md border-b border-white/5 flex items-center px-4 z-20">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto px-4 py-1 rounded-full bg-black/20 text-[10px] text-neutral-500 font-mono">
                    aligoo.agency/work/{project.id}
                </div>
            </div>

            {/* Content / Image */}
            <div className="absolute inset-0 pt-10 bg-neutral-900 overflow-hidden">
                {/* Placeholder Gradient Background (Replace with Image later) */}
                <div className={`w-full h-[200%] bg-gradient-to-br ${project.color} opacity-20 transition-transform duration-[3s] ease-in-out ${isHovered ? '-translate-y-1/4' : 'translate-y-0'}`} />

                {/* Actual Image Container (Simulating Scroll) */}
                <div className={`absolute inset-0 pt-10 transition-transform duration-[2s] ease-in-out ${isHovered ? '-translate-y-20' : 'translate-y-0'}`}>
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top"
                    />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-6 left-6 right-6 z-30">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-between group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{project.name}</h3>
                            <p className="text-neutral-400 text-sm">{project.industry}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#FF595E]" />
                            {project.result}
                        </span>

                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            className="text-[#FF595E] text-sm font-bold flex items-center gap-1"
                        >
                            View Case Study <ExternalLink className="w-3 h-3" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
