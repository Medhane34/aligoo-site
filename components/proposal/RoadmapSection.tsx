'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Flag, BarChart3, Rocket, Layers } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { RoadmapSection as RoadmapType, RoadmapPhase } from '../../types/ProposalType'

interface Props {
    data: RoadmapType
}

const RoadmapSection: React.FC<Props> = ({ data }) => {
    if (data.enabled === false) return null
    if (!data.phases || data.phases.length === 0) return null

    const getPhaseIcon = (index: number) => {
        switch (index) {
            case 0: return <Layers className="w-5 h-5" />
            case 1: return <BarChart3 className="w-5 h-5" />
            case 2: return <Rocket className="w-5 h-5" />
            default: return <Flag className="w-5 h-5" />
        }
    }

    const getPhaseColor = (color: string) => {
        switch (color) {
            case 'yellow': return 'from-amber-500 to-orange-500'
            case 'blue': return 'from-blue-500 to-indigo-500'
            case 'purple': return 'from-purple-500 to-pink-500'
            case 'green':
            default: return 'from-emerald-500 to-teal-500'
        }
    }

    const getPhaseBorder = (color: string) => {
        switch (color) {
            case 'yellow': return 'border-amber-500/20 bg-amber-500/5'
            case 'blue': return 'border-blue-500/20 bg-blue-500/5'
            case 'purple': return 'border-purple-500/20 bg-purple-500/5'
            case 'green':
            default: return 'border-emerald-500/20 bg-emerald-500/5'
        }
    }

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Growth Partnership</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        {data.heading || "90-Day Growth Plan"}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        {data.subheading || "We don't just sell services. We build systems that scale with your business."}
                    </motion.p>
                </div>

                {/* Timeline Layout */}
                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-slate-800 rounded-full">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-30"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
                        {data.phases.map((phase, index) => (
                            <motion.div
                                key={phase._key || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group"
                            >
                                {/* Desktop Connector Dot */}
                                <div className="hidden md:flex absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-800 items-center justify-center z-10 group-hover:border-white/20 transition-colors">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPhaseColor(phase.color)}`} />
                                </div>

                                {/* Mobile Connector Line */}
                                {index !== data.phases!.length - 1 && (
                                    <div className="md:hidden absolute left-8 top-[80px] bottom-[-32px] w-0.5 bg-slate-800 z-0" />
                                )}

                                {/* Card */}
                                <div className={`h-full relative overflow-hidden rounded-2xl border ${getPhaseBorder(phase.color)} hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm p-6 flex flex-col`}>

                                    {/* Phase Badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPhaseColor(phase.color)} p-[1px]`}>
                                                <div className="w-full h-full bg-slate-900/90 rounded-[10px] flex items-center justify-center text-white">
                                                    {getPhaseIcon(index)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${getPhaseColor(phase.color)}`}>
                                                    {phase.duration}
                                                </div>
                                                <h3 className="text-xl font-bold text-white leading-none mt-1">{phase.title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4 flex-grow">
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {phase.description}
                                        </p>

                                        {/* Deliverables (Rich Text) */}
                                        {phase.deliverables && (
                                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 space-y-2">
                                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Deliverables</div>
                                                <div className="prose prose-sm prose-invert max-w-none text-slate-300 prose-p:my-1 prose-ul:my-2 prose-li:my-0">
                                                    <PortableText value={phase.deliverables} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Outcome */}
                                    <div className="mt-6 pt-6 border-t border-white/5">
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 p-1 rounded-full bg-gradient-to-r ${getPhaseColor(phase.color)} opacity-80`}>
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </div>
                                            <div>
                                                <span className="block text-xs text-slate-500 font-medium mb-0.5">TARGET OUTCOME</span>
                                                <span className="text-sm text-white font-medium block">
                                                    {phase.outcome}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoadmapSection
