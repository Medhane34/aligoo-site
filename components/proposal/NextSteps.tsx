'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, CreditCard, Rocket, Check, Clock, ChevronDown, ChevronUp, HelpCircle, Package } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NextStepsProps {
    title?: string
    subtitle?: string
    expiryDate?: Date
    uniqueCode: string
    onProceedToContract?: () => void
}

interface Step {
    number: number
    icon: typeof FileText
    title: string
    description: string
    status: 'current' | 'pending' | 'complete'
    timeEstimate: string
    color: string
    details: string[]
    faqs: { question: string; answer: string }[]
}

export default function NextSteps({
    title = 'Your Path to Launch',
    subtitle = "We've made it simple. Here's exactly what happens after you choose your package.",
    expiryDate,
    uniqueCode,
    onProceedToContract,
}: NextStepsProps) {
    const [expandedStep, setExpandedStep] = useState<number | null>(null)
    const [timeLeft, setTimeLeft] = useState<string>('')

    // Calculate time until expiry
    useEffect(() => {
        if (!expiryDate) {
            setTimeLeft('14 days')
            return
        }

        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const expiry = new Date(expiryDate).getTime()
            const difference = expiry - now

            if (difference <= 0) {
                setTimeLeft('Expired')
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

            setTimeLeft(`${days} days, ${hours} hours`)
        }

        calculateTimeLeft()
        const interval = setInterval(calculateTimeLeft, 60000)

        return () => clearInterval(interval)
    }, [expiryDate])

    const steps: Step[] = [
        {
            number: 1,
            icon: Package,
            title: 'Choose Your Perfect Package',
            description: 'Review our package options and select the one that fits your goals and budget. Customize with powerful add-ons.',
            status: 'current',
            timeEstimate: '~10 minutes',
            color: 'from-purple-500 to-pink-500',
            details: [
                'Compare all package features',
                'See transparent pricing breakdown',
                'Add optional features and add-ons',
                'Calculate your total investment',
                'Lock in exclusive bonuses'
            ],
            faqs: [
                {
                    question: 'Can I change my package later?',
                    answer: 'Yes! You can upgrade your package anytime before signing the contract.'
                },
                {
                    question: 'What if I need custom features?',
                    answer: 'We offer custom add-ons and can tailor any package to your specific needs.'
                }
            ]
        },
        {
            number: 2,
            icon: FileText,
            title: 'Review & Sign Your Agreement',
            description: 'Review the terms, sign digitally, and lock in your exclusive bonuses. Takes less than 5 minutes.',
            status: 'pending',
            timeEstimate: '~5 minutes',
            color: 'from-[#FF595E] to-orange-500',
            details: [
                'Review contract terms and conditions',
                'Digital signature (no printing required)',
                'Secure your exclusive bonus gifts',
                'Instant confirmation email'
            ],
            faqs: [
                {
                    question: 'Can I make changes to the contract?',
                    answer: 'Yes! Contact us before signing if you need any modifications.'
                },
                {
                    question: 'Is the signature legally binding?',
                    answer: 'Yes, our digital signatures are legally valid and secure.'
                }
            ]
        },
        {
            number: 3,
            icon: CreditCard,
            title: 'Make Your Deposit Payment',
            description: 'Secure your project slot with a 50% deposit. Multiple payment options available for your convenience.',
            status: 'pending',
            timeEstimate: '~10 minutes',
            color: 'from-orange-500 to-yellow-500',
            details: [
                'Pay 50% deposit to start',
                'Multiple payment methods accepted',
                'Secure payment processing',
                'Instant receipt and confirmation'
            ],
            faqs: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept bank transfers, mobile money, and major credit cards.'
                },
                {
                    question: 'When is the remaining 50% due?',
                    answer: 'The final payment is due upon project completion and approval.'
                }
            ]
        },
        {
            number: 4,
            icon: Rocket,
            title: 'Project Kickoff Meeting',
            description: "We'll schedule a kickoff call to discuss your vision, goals, and timeline. Then we get to work bringing your website to life!",
            status: 'pending',
            timeEstimate: 'Within 48 hours',
            color: 'from-cyan-500 to-blue-500',
            details: [
                'Schedule your kickoff meeting',
                'Discuss project goals and vision',
                'Review timeline and milestones',
                'Meet your dedicated team',
                'Start building your website!'
            ],
            faqs: [
                {
                    question: 'How long until my website is live?',
                    answer: 'Typical projects are completed in 4-6 weeks, depending on complexity.'
                },
                {
                    question: 'Can I request changes during development?',
                    answer: 'Absolutely! We include revision rounds to ensure you love the final result.'
                }
            ]
        }
    ]

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Animated Background */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF595E]/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#FF595E] via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Timeline - Desktop */}
                <div className="hidden md:block relative mb-20">
                    {/* Progress Line */}
                    <div className="absolute top-24 left-0 right-0 h-1 bg-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '33%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-[#FF595E] to-orange-500 relative"
                        >
                            {/* Pulsing Dot */}
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF595E] rounded-full shadow-lg shadow-[#FF595E]/50"
                            />
                        </motion.div>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-4 gap-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isExpanded = expandedStep === step.number
                            const isCurrent = step.status === 'current'

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative"
                                >
                                    {/* Card */}
                                    <div
                                        className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer
                                            ${isCurrent
                                                ? 'bg-white/10 border-[#FF595E]/50 shadow-2xl shadow-[#FF595E]/20 scale-105'
                                                : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                            }
                                            backdrop-blur-xl
                                        `}
                                        onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                                    >
                                        {/* Icon */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', delay: index * 0.2 + 0.3 }}
                                            className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                                        >
                                            <Icon className="w-10 h-10 text-white" />
                                        </motion.div>

                                        {/* Step Number Badge */}
                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{step.number}</span>
                                        </div>

                                        {/* Status Badge */}
                                        {isCurrent && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF595E] to-orange-500 text-white text-xs font-bold shadow-lg"
                                            >
                                                You are here
                                            </motion.div>
                                        )}

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-white mb-2 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-neutral-300 text-sm text-center mb-4">
                                            {step.description}
                                        </p>

                                        {/* Time Estimate */}
                                        <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>{step.timeEstimate}</span>
                                        </div>

                                        {/* Expand Indicator */}
                                        <div className="mt-4 flex justify-center">
                                            <button className="text-[#FF595E] hover:text-orange-500 text-sm font-medium flex items-center gap-1">
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4" />
                                                        Hide Details
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4" />
                                                        Show Details
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden mt-4 pt-4 border-t border-white/10"
                                                >
                                                    {/* What You'll Need */}
                                                    <h4 className="text-white font-bold text-sm mb-2">What's Included:</h4>
                                                    <ul className="space-y-2 mb-4">
                                                        {step.details.map((detail, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                                                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* FAQs */}
                                                    <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                                        <HelpCircle className="w-4 h-4" />
                                                        Common Questions:
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {step.faqs.map((faq, i) => (
                                                            <div key={i} className="text-sm">
                                                                <p className="text-neutral-200 font-medium mb-1">Q: {faq.question}</p>
                                                                <p className="text-neutral-400">A: {faq.answer}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Glow Effect */}
                                        {isCurrent && (
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF595E]/10 to-orange-500/10 -z-10 blur-xl" />
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Timeline - Mobile */}
                <div className="md:hidden space-y-6 mb-20">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isExpanded = expandedStep === step.number
                        const isCurrent = step.status === 'current'

                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Connecting Line */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-10 top-20 bottom-0 w-1 bg-white/10">
                                        {index === 0 && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: '100%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="w-full bg-gradient-to-b from-[#FF595E] to-orange-500"
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Card - Same as desktop */}
                                <div
                                    className={`relative p-6 rounded-2xl border transition-all duration-300
                                        ${isCurrent
                                            ? 'bg-white/10 border-[#FF595E]/50 shadow-2xl shadow-[#FF595E]/20'
                                            : 'bg-white/5 border-white/10'
                                        }
                                        backdrop-blur-xl
                                    `}
                                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            {isCurrent && (
                                                <span className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-[#FF595E] to-orange-500 text-white text-xs font-bold mb-2">
                                                    You are here
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-white mb-1">
                                                {step.number}. {step.title}
                                            </h3>
                                            <p className="text-neutral-300 text-sm mb-2">
                                                {step.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-neutral-400 text-xs">
                                                <Clock className="w-3 h-3" />
                                                <span>{step.timeEstimate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expandable content - same as desktop */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden mt-4 pt-4 border-t border-white/10"
                                            >
                                                <h4 className="text-white font-bold text-sm mb-2">What's Included:</h4>
                                                <ul className="space-y-2 mb-4">
                                                    {step.details.map((detail, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                            <span>{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8 mb-16"
                >
                    {[
                        { icon: Check, text: 'No hidden fees' },
                        { icon: Check, text: 'Cancel anytime before kickoff' },
                        { icon: Check, text: '100% satisfaction guarantee' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-neutral-300">
                            <item.icon className="w-5 h-5 text-green-400" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Proposal Expiry Warning */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 backdrop-blur-xl mb-12"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-lg mb-2">⏰ Important: This Proposal Expires Soon</h4>
                            <p className="text-neutral-300 mb-3">
                                This exclusive offer and pricing is valid for <span className="font-bold text-white">{timeLeft}</span> from today.
                            </p>
                            <p className="text-neutral-400 text-sm">
                                Lock in your bonuses and secure your project slot before it's too late!
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                {/*    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onProceedToContract}
                        className="px-12 py-6 bg-gradient-to-r from-[#FF595E] to-orange-500 rounded-2xl text-white font-black text-xl shadow-2xl shadow-[#FF595E]/30 hover:shadow-[#FF595E]/50 transition-all mb-4"
                    >
                        Let's Get Started → Proceed to Contract
                    </motion.button>
                    <p className="text-neutral-400 text-sm">
                        Have questions? <a href="#" className="text-[#FF595E] hover:text-orange-500 underline">Schedule a quick call with our team</a>
                    </p>
                </motion.div> */}

            </div>
        </section>
    )
}
