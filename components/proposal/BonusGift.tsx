// components/proposal/BonusGiftSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { Gift, Sparkles, Clock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface BonusGiftItem {
    title: string
    value: number
    description: string
    features: string[]
    icon?: string
}

interface BonusGiftSectionProps {
    headline?: string
    urgencyMessage?: string
    countdownHours?: number
    ctaText?: string
    gifts: BonusGiftItem[]
}

export default function BonusGiftSection({
    headline = 'Unlock Your VIP Perks',
    urgencyMessage = 'Limited Time Only - These Bonuses Vanish Soon!',
    countdownHours = 48,
    ctaText = 'Claim Your Exclusive Gifts Now',
    gifts = [],
}: BonusGiftSectionProps) {
    const [timeLeft, setTimeLeft] = useState(countdownHours * 3600)
    const [isChestOpen, setIsChestOpen] = useState(false)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (isInView) {
            setTimeout(() => setIsChestOpen(true), 500)
        }
    }, [isInView])

    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
    const isUrgent = hours < 6
    const totalValue = gifts.reduce((sum, gift) => sum + gift.value, 0)

    const scrollToPricing = () => {
        document.querySelector('[data-pricing-section]')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    if (gifts.length === 0) return null

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
            {/* Background Effects */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Limited Time Badge */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 animate-pulse">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">Limited Time Offer</span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                        {headline}
                    </h2>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">{urgencyMessage}</p>
                </motion.div>

                {/* Countdown */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center gap-4 mb-16">
                    {[{ label: 'Hours', value: hours }, { label: 'Minutes', value: minutes }, { label: 'Seconds', value: seconds }].map((unit, i) => (
                        <div key={i} className={`text-center ${isUrgent ? 'animate-pulse' : ''}`}>
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center font-mono text-4xl font-black transition-all duration-300
                ${isUrgent ? 'bg-red-500/20 border-2 border-red-500 text-red-400 shadow-lg shadow-red-500/50' : 'bg-white/10 border border-white/20 text-white backdrop-blur-xl'}
              `}>
                                {String(unit.value).padStart(2, '0')}
                            </div>
                            <div className="text-sm text-neutral-400 mt-2 font-medium">{unit.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Layout */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Treasure Chest */}
                    <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative flex items-center justify-center">
                        {/* Glow + Chest Animation */}
                        <div className="relative z-10">
                            {/* Chest Lid & Base - same as original */}
                            <motion.div animate={isChestOpen ? { rotateX: -120, y: -40 } : { rotateX: 0, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ transformOrigin: 'bottom', transformStyle: 'preserve-3d' }} className="relative w-[200px] h-[80px] mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-b from-yellow-700 to-yellow-800 rounded-t-[20px] border-4 border-yellow-900 shadow-2xl">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-10 bg-yellow-900 rounded-md border-2 border-yellow-600">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black" />
                                    </div>
                                    <div className="absolute top-4 left-4 right-4 h-1 bg-yellow-900/50 rounded-full" />
                                    <div className="absolute bottom-4 left-4 right-4 h-1 bg-yellow-900/50 rounded-full" />
                                </div>
                            </motion.div>
                            <div className="relative w-[200px] h-[120px] mx-auto bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-[20px] border-4 border-yellow-900 shadow-2xl">
                                <div className="absolute inset-2 bg-gradient-to-b from-yellow-700/50 to-transparent rounded-b-[12px]" />
                                <div className="absolute top-8 left-0 right-0 h-2 bg-yellow-900" />
                                <div className="absolute bottom-8 left-0 right-0 h-2 bg-yellow-900" />
                            </div>
                            {/* Coins & Sparkles */}
                            {isChestOpen && (
                                <>
                                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div key={i} initial={{ y: 0 }} animate={{ y: [-20, 0] }} transition={{ delay: 0.4 + i * 0.1 }} className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-2 border-yellow-700 shadow-lg" />
                                        ))}
                                    </motion.div>
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ y: [-20, -100], x: [0, (Math.random() - 0.5) * 100], opacity: [0, 1, 0], scale: [0, 1, 0] }} transition={{ duration: 1.5 + Math.random(), delay: 0.5 + i * 0.1, repeat: Infinity, repeatDelay: 2 }} className="absolute top-1/2 left-1/2 w-2 h-2" style={{ left: `${50 + (Math.random() - 0.5) * 40}%` }}>
                                            <Sparkles className="w-4 h-4 text-yellow-400" />
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Gift Cards */}
                    <div className="space-y-6">
                        {gifts.map((gift, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.2 }} whileHover={{ scale: 1.02 }} className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
                                <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-black shadow-lg">
                                    Worth ETB {gift.value.toLocaleString()}
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                                        {gift.icon || 'Gift'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2">{gift.title}</h3>
                                        <p className="text-neutral-300 mb-4 leading-relaxed">{gift.description}</p>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {gift.features.map((f, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-neutral-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300 -z-10 blur-xl" />
                            </motion.div>
                        ))}

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
                            <div className="text-sm text-neutral-400 mb-1">Total Bonus Value</div>
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                ETB {totalValue.toLocaleString()}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }} className="text-center mt-16">
                    <motion.button onClick={scrollToPricing} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative px-12 py-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-black text-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all overflow-hidden group">
                        <span className="relative z-10 flex items-center gap-3">
                            <Gift className="w-6 h-6" />
                            {ctaText}
                        </span>
                        <motion.div animate={{ x: [-200, 200] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </motion.button>
                    <p className="text-sm text-neutral-500 mt-4 italic">
                        P.S. These gifts are only available for committed clients. Act fast to secure your VIP advantages!
                    </p>
                </motion.div>
            </div>
        </section>
    )
}