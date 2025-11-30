'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignIn } from '@clerk/nextjs'
import { Lock, Shield, Check, Sparkles, Clock, Gift, Users, Layout, Zap } from 'lucide-react'
import Image from 'next/image'

interface Props {
    proposalId: string
    clientName: string
    expectedEmail?: string
    Uniquecode: string
    proposalTitle?: string
    expiryDate?: Date
    packageCount?: number
    bonusCount?: number
}

export default function EmailUnlockForm({
    proposalId,
    clientName,
    expectedEmail,
    Uniquecode,
    proposalTitle = 'Web Design Proposal',
    expiryDate,
    packageCount = 3,
    bonusCount = 2
}: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [isMounted, setIsMounted] = useState(false)

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
        const interval = setInterval(calculateTimeLeft, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [expiryDate])

    // Prevent hydration mismatch by only rendering particles on client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Floating Particles - Client Only */}
            {isMounted && [...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        y: [-20, -100],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                    className="absolute w-2 h-2 bg-brand-primary/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Logo/Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center">
                                <Zap className="w-7 h-7 text-white" fill="currentColor" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl">Aligoo Digital Agency</h3>
                                <p className="text-neutral-400 text-sm">Premium Web Solutions</p>
                            </div>
                        </div>

                        {/* Welcome Message */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl font-black text-white mb-4"
                            >
                                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-500">{clientName}</span>!
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-neutral-300"
                            >
                                Your exclusive proposal awaits
                            </motion.p>
                        </div>

                        {/* Proposal Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{proposalTitle}</h3>
                                    <p className="text-sm text-neutral-400">Prepared exclusively for you</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-brand-primary text-xs font-bold">
                                    VIP Access
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                                        <Layout className="w-5 h-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{packageCount} Options</div>
                                        <div className="text-xs text-neutral-400">Packages</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                        <Gift className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">{bonusCount} Bonuses</div>
                                        <div className="text-xs text-neutral-400">Exclusive</div>
                                    </div>
                                </div>
                            </div>

                            {/* Expiry */}
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                <Clock className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-red-400 font-medium">Expires in {timeLeft}</span>
                            </div>
                        </motion.div>

                        {/* What's Inside */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <h4 className="text-white font-bold text-lg mb-4">What's Inside Your Proposal</h4>
                            {[
                                { icon: Layout, text: 'Custom Design Mockup', color: 'text-cyan-400' },
                                { icon: Sparkles, text: 'Flexible Pricing Options', color: 'text-purple-400' },
                                { icon: Users, text: 'Dedicated Team Introduction', color: 'text-green-400' },
                                { icon: Gift, text: 'Exclusive Launch Bonuses', color: 'text-yellow-400' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <span className="text-neutral-300">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Testimonial */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="p-4 rounded-xl bg-white/5 border-l-4 border-brand-primary"
                        >
                            <p className="text-neutral-300 italic text-sm mb-2">
                                "Aligoo transformed our online presence. Their attention to detail and professionalism exceeded our expectations."
                            </p>
                            <p className="text-neutral-400 text-xs font-medium">— Sarah M., CEO at TechStart</p>
                        </motion.div>

                        {/* Security Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center gap-2 text-neutral-500 text-sm"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Secure access protected by Clerk • Your information is encrypted</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - SignIn */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glassmorphic Container */}
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                            {/* Decorative Lock Icon */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center shadow-lg">
                                <Lock className="w-6 h-6 text-white" />
                            </div>

                            <div className="mt-4 text-center">
                                <h2 className="text-2xl font-bold text-white text-center mb-2">Unlock Your Proposal</h2>
                                <p className="text-neutral-400 text-center mb-8">Sign in to view your exclusive offer</p>

                                <SignIn
                                    routing="hash"
                                    forceRedirectUrl={`/proposal/${Uniquecode}`}
                                    appearance={{
                                        layout: {
                                            socialButtonsPlacement: 'bottom',
                                            socialButtonsVariant: 'iconButton',
                                        },
                                        variables: {
                                            colorPrimary: '#FF595E',
                                            colorBackground: 'transparent',
                                            colorInputBackground: 'rgba(255, 255, 255, 0.1)',
                                            colorInputText: '#ffffff',
                                            colorText: '#ffffff',
                                            colorTextSecondary: '#a3a3a3',
                                            borderRadius: '0.75rem',
                                        },
                                        elements: {
                                            formButtonPrimary:
                                                'bg-gradient-to-r from-[#FF595E] to-[#f97316] hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 w-full',
                                            rootBox: 'w-full',
                                            card: 'bg-transparent shadow-none w-full',
                                            headerTitle: 'hidden',
                                            headerSubtitle: 'hidden',
                                            socialButtonsBlockButton: 'hidden',
                                            socialButtonsBlockButtonText: 'hidden',
                                            socialButtonsProviderIcon: 'hidden',
                                            dividerRow: 'hidden',
                                            formFieldLabel: 'text-white font-medium text-sm mb-2 text-center',
                                            formFieldInput:
                                                'bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#FF595E] focus:ring-2 focus:ring-[#FF595E]/50 rounded-lg w-full text-center',
                                            formFieldInputShowPasswordButton: 'text-gray-400 hover:text-white',
                                            footer: 'hidden',
                                            footerAction: 'hidden',
                                            footerActionText: 'hidden',
                                            footerActionLink: 'hidden',
                                            identityPreviewText: 'text-white text-center',
                                            identityPreviewEditButton: 'text-[#FF595E] hover:text-orange-500',
                                            formResendCodeLink: 'text-[#FF595E] hover:text-orange-500 text-center',
                                            otpCodeFieldInput: 'bg-white/10 border-white/20 text-white text-center',
                                        },
                                    }}
                                />
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-primary/10 to-orange-500/10 -z-10 blur-2xl" />
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-950/90 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary rounded-full mx-auto mb-4"
                            />
                            <p className="text-white text-xl font-medium">Unlocking your proposal...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}