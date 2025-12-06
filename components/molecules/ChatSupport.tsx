'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone } from 'lucide-react'
import Image from 'next/image'

export default function ChatSupportWidget() {
    const managerName = "Aligoo Support"
    const managerRole = "Customer Success"
    // Using a default avatar or logo if available, keeping previous default for safety
    const managerImage = "/team/avatar-1.jpeg"
    const whatsappNumber = "251910584712"

    const [isVisible, setIsVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [showGreeting, setShowGreeting] = useState(false)

    // Smart scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Show immediately if page is short (no scroll needed)
            if (documentHeight <= windowHeight + 100) {
                setIsVisible(true)
                return
            }

            // Show when scrolled past 30% of viewport (earlier visibility)
            if (scrollY > windowHeight * 0.5) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
                setIsOpen(false)
            }
        }

        // Trigger once on mount to check initial state
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Auto-greeting timer
    useEffect(() => {
        if (isVisible && !isOpen) {
            const timer = setTimeout(() => {
                setShowGreeting(true)
            }, 3000)
            return () => clearTimeout(timer)
        } else {
            setShowGreeting(false)
        }
    }, [isVisible, isOpen])

    const handleWhatsAppClick = () => {
        const message = `Hi Aligoo Team, I'm checking out your website and have a few questions.`
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed right-4 md:right-8 bottom-8 z-[9999] flex flex-col items-end gap-4"
                >

                    {/* Chat Window */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-[350px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-4 bg-gradient-to-r from-[#FF595E] to-orange-600 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-neutral-800">
                                                <Image
                                                    src={managerImage}
                                                    alt={managerName}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full animate-pulse" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm">{managerName}</h3>
                                            <p className="text-white/80 text-xs">{managerRole}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 bg-neutral-900/50">
                                    <div className="bg-white/5 rounded-xl p-4 rounded-tl-none border border-white/5 mb-6">
                                        <p className="text-neutral-200 text-sm leading-relaxed">
                                            Hi there! 👋 <br /><br />
                                            Thanks for visiting Aligoo. How can we help you grow your business today?
                                        </p>
                                        <span className="text-neutral-500 text-xs mt-2 block">Just now</span>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 group"
                                    >
                                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Chat on WhatsApp
                                    </button>

                                    <div className="mt-4 text-center">
                                        <p className="text-neutral-500 text-xs">
                                            Typically replies within 5 minutes
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Auto-Greeting Tooltip */}
                    <AnimatePresence>
                        {showGreeting && !isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="bg-white text-neutral-900 px-4 py-2 rounded-xl rounded-br-none shadow-xl font-medium text-sm flex items-center gap-2"
                            >
                                <span>Have questions? Chat with us!</span>
                                <div className="w-2 h-2 bg-[#FF595E] rounded-full animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Action Button (FAB) */}
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all relative z-50
                            ${isOpen
                                ? 'bg-neutral-800 text-white rotate-90'
                                : 'bg-gradient-to-r from-[#FF595E] to-orange-500 text-white'
                            }
                        `}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <MessageCircle className="w-7 h-7" />
                        )}

                        {/* Notification Badge */}
                        {!isOpen && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-neutral-900 rounded-full animate-bounce" />
                        )}

                        {/* Ripple Effect */}
                        {!isOpen && (
                            <div className="absolute inset-0 rounded-full border-2 border-[#FF595E] animate-ping opacity-20" />
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
