// components/proposal/FAQSection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    badgeText?: string
    mainHeading?: string
    highlightedText?: string
    items: FAQItem[]
}

export default function FAQSection({
    badgeText = 'Common Questions',
    mainHeading = 'Got Questions?',
    highlightedText = "We've Got Answers.",
    items,
}: FAQSectionProps) {
    if (!items || items.length === 0) return null

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <HelpCircle className="w-4 h-4 text-[#FF595E]" />
                        <span className="text-sm font-medium text-white">{badgeText}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                        {mainHeading}
                        <br className="md:hidden" />
                        <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                            {' '}{highlightedText}
                        </span>
                    </h2>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-4">
                    {items.map((faq, index) => (
                        <AccordionItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function AccordionItem({ faq, index }: { faq: FAQItem; index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden
        ${isOpen
                    ? 'bg-white/10 border-[#FF595E]/50 shadow-lg shadow-[#FF595E]/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }
      `}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                    {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#FF595E] text-white' : 'bg-white/10 text-neutral-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-6 pt-0 text-neutral-300 leading-relaxed border-t border-white/5 mt-2 pt-4">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}