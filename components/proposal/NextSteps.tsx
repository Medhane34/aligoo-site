'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, CreditCard, Rocket, Check, Clock, ChevronDown, ChevronUp, HelpCircle, Package } from 'lucide-react'
import { useState } from 'react'

interface FAQ {
    question: string
    answer: string
}

interface Step {
    number: number
    title: string
    description: string
    timeEstimate: string
    color: string
    details: string[]
    faqs: FAQ[]
    status?: 'current' | 'pending' | 'complete'
}

interface NextStepsSectionProps {
    title?: string
    subtitle?: string
    daysLeftText: string
    steps: Step[]
    onProceedToContract?: () => void
}

const iconMap = {
    1: Package,
    2: FileText,
    3: CreditCard,
    4: Rocket,
} as const

export default function NextStepsSection({
    title = 'Your Path to Launch',
    subtitle = "We've made it simple. Here's exactly what happens after you choose your package.",
    daysLeftText,
    steps,
    onProceedToContract,
}: NextStepsSectionProps) {
    const [expandedStep, setExpandedStep] = useState<number | null>(null)

    // Define processedSteps ONCE, at the top
    const processedSteps = steps.map((step, i) => ({
        ...step,
        status: step.status || (i === 0 ? 'current' : 'pending'),
    }))

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF595E]/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#FF595E] via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">{subtitle}</p>
                </motion.div>

                {/* Desktop Timeline */}
                <div className="hidden md:grid grid-cols-4 gap-6 mb-20 relative">
                    {/* Progress Line */}
                    <div className="absolute top-24 left-0 right-0 h-1 bg-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '33%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-gradient-to-r from-[#FF595E] to-orange-500 relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF595E] rounded-full shadow-lg shadow-[#FF595E]/50"
                            />
                        </motion.div>
                    </div>

                    {processedSteps.map((step, index) => {
                        const Icon = iconMap[step.number as keyof typeof iconMap] || Package
                        const isCurrent = step.status === 'current'
                        const isExpanded = expandedStep === step.number

                        return (
                            <StepCard
                                key={step.number}
                                step={step}
                                index={index}
                                isCurrent={isCurrent}
                                isExpanded={isExpanded}
                                onToggle={() => setExpandedStep(isExpanded ? null : step.number)}
                                Icon={Icon}
                            />
                        )
                    })}
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-6 mb-20">
                    {processedSteps.map((step, index) => (
                        <MobileStepCard
                            key={step.number}
                            step={step}
                            index={index}
                            isExpanded={expandedStep === step.number}
                            onToggle={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                        />
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8 mb-16 text-neutral-300"
                >
                    <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> No hidden fees</div>
                    <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> Cancel anytime before kickoff</div>
                    <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> 100% satisfaction guarantee</div>
                </motion.div>

                {/* Expiry Warning */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 backdrop-blur-xl text-center"
                >
                    <div className="flex flex-col items-center gap-4">
                        <Clock className="w-12 h-12 text-red-400" />
                        <h3 className="text-2xl font-black text-white">Important: This Proposal Expires Soon</h3>
                        <p className="text-xl text-neutral-200">
                            This exclusive offer is valid for{' '}
                            <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 pr-2">
                                {daysLeftText}
                            </span>
                            days
                        </p>
                        <p className="text-neutral-400">Lock in your bonuses and secure your slot before it's gone!</p>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

// Desktop Card
function StepCard({ step, index, isCurrent, isExpanded, onToggle, Icon }: {
    step: Step
    index: number
    isCurrent: boolean
    isExpanded: boolean
    onToggle: () => void
    Icon: any
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
        >
            <div
                onClick={onToggle}
                className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer
          ${isCurrent
                        ? 'bg-white/10 border-[#FF595E]/50 shadow-2xl shadow-[#FF595E]/20 scale-105'
                        : 'bg-white/5 border-white/10 hover:bg-white/8'
                    }`}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                    <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF595E] to-orange-500 text-white text-xs font-bold">
                        You are here
                    </div>
                )}

                <h3 className="text-xl font-bold text-white text-center mb-2">{step.title}</h3>
                <p className="text-neutral-300 text-sm text-center mb-4">{step.description}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                    <Clock className="w-4 h-4" />
                    {step.timeEstimate}
                </div>

                <div className="mt-4 text-center">
                    <button className="text-[#FF595E] hover:text-orange-400 text-sm font-medium flex items-center gap-1 mx-auto">
                        {isExpanded ? <><ChevronUp className="w-4 h-4" /> Hide Details</> : <><ChevronDown className="w-4 h-4" /> Show Details</>}
                    </button>
                </div>

                <AnimatePresence>
                    {isExpanded && <ExpandedContent step={step} />}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

// Mobile Card
function MobileStepCard({ step, index, isExpanded, onToggle }: {
    step: Step
    index: number
    isExpanded: boolean
    onToggle: () => void
}) {
    const Icon = iconMap[step.number as keyof typeof iconMap] || Package
    const isCurrent = step.status === 'current'

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {index < 3 && ( // Assuming 4 steps, index 0,1,2 have lines
                <div className="absolute left-10 top-20 bottom-0 w-1 bg-white/10">
                    {index === 0 && <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} className="w-full bg-gradient-to-b from-[#FF595E] to-orange-500" />}
                </div>
            )}

            <div
                onClick={onToggle}
                className={`p-6 rounded-2xl border backdrop-blur-xl ${isCurrent ? 'bg-white/10 border-[#FF595E]/50 shadow-xl' : 'bg-white/5 border-white/10'}`}
            >
                <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        {isCurrent && <span className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-[#FF595E] to-orange-500 text-white text-xs font-bold mb-2">You are here</span>}
                        <h3 className="text-lg font-bold text-white mb-1">{step.number}. {step.title}</h3>
                        <p className="text-neutral-300 text-sm mb-2">{step.description}</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <Clock className="w-3 h-3" />
                            {step.timeEstimate}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && <ExpandedContent step={step} className="mt-4 pt-4 border-t border-white/10" />}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

// Shared Expanded Content
function ExpandedContent({ step, className = '' }: { step: Step; className?: string }) {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={className}
        >
            <h4 className="text-white font-bold text-sm mb-3">What's Included:</h4>
            <ul className="space-y-2 mb-4">
                {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                    </li>
                ))}
            </ul>

            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Common Questions:
            </h4>
            <div className="space-y-2">
                {step.faqs.map((faq, i) => (
                    <div key={i} className="text-sm">
                        <p className="text-neutral-200 font-medium">Q: {faq.question}</p>
                        <p className="text-neutral-400 text-xs mt-0.5">A: {faq.answer}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
