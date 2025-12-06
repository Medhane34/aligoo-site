'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import { useState } from 'react'
import type { MockupShowcaseData } from '@/types/ProposalType'

interface MockupShowcaseProps {
    data?: MockupShowcaseData | null
}

export default function MockupShowcase({ data }: MockupShowcaseProps) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    // Fallback to static content if no data provided
    const title = data?.title || "Putting Our Process into Action"
    const description = data?.description || "Building on the insights from the discovery and planning phase, we translate client needs into a high-converting landing page. This mockup demonstrates how we can transform your vision into a powerful lead generation tool."
    const videoSrc = data?.video?.asset?.url || "/video/mockup-preview.mp4"
    const mockupLink = data?.mockupLink || "#"

    return (
        <section className="relative py-24 overflow-hidden bg-neutral-950">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-8">
                            <Play className="w-3 h-3 fill-current" />
                            <span className="text-xs font-bold uppercase tracking-wider">Live Preview</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {title}
                        </h2>

                        <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-xl">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href={mockupLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-bold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                            >
                                View Interactive Mockup
                                <ExternalLink className="w-5 h-5" />
                            </motion.a>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {[
                                { label: 'High-Fidelity Design', value: 'Pixel Perfect' },
                                { label: 'Interactive Elements', value: 'Fully Clickable' },
                            ].map((item, i) => (
                                <div key={i} className="border-l-2 border-white/10 pl-4">
                                    <div className="text-sm text-neutral-500 mb-1">{item.label}</div>
                                    <div className="text-xl font-bold text-white">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Laptop Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative perspective-1000"
                    >
                        {/* Laptop Frame */}
                        <div className="relative mx-auto w-full max-w-[600px]">
                            {/* Lid / Screen Container */}
                            <div className="relative bg-[#1a1a1a] rounded-t-[20px] p-[2%] shadow-2xl border-[4px] border-[#2a2a2a] aspect-[16/10]">
                                {/* Camera Dot */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full z-20 opacity-50" />

                                {/* Screen Content */}
                                <div className="relative w-full h-full bg-black rounded-[4px] overflow-hidden group">
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onLoadedData={() => setIsVideoLoaded(true)}
                                        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    />

                                    {/* Loading State */}
                                    {!isVideoLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                                            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}

                                    {/* Screen Glare/Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                        <span className="text-white font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                                            Click to View Full Mockup
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Base / Keyboard Area */}
                            <div className="relative bg-[#2a2a2a] h-[16px] rounded-b-[12px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[4px] bg-[#1a1a1a] rounded-b-[4px]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
