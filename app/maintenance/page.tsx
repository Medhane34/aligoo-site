"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
// Actually, to be safe and dependency-free, I will use pure Tailwind + Framer Motion for the background.

export default function MaintenancePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white selection:bg-orange-500/30">

            {/* Background Ambience */}
            <div className="absolute inset-0 w-full h-full bg-neutral-950">
                <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <main className="relative z-10 flex w-full max-w-3xl flex-col items-center p-6 text-center">

                {/* Animated Geometric Concept: The "Engine" */}
                <div className="relative mb-12 flex h-32 w-32 items-center justify-center">
                    {/* Core */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute h-16 w-16 rounded-xl bg-orange-500 blur-md"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="relative h-24 w-24 rounded-2xl border-2 border-orange-500/30 backdrop-blur-sm"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute h-32 w-32 rounded-full border border-white/10"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute text-2xl"
                    >
                        ⚠️
                    </motion.div>
                </div>

                {/* Text Content */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                >
                    We're Leveling Up.
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-10 max-w-lg text-lg text-neutral-400 md:text-xl"
                >
                    The Aligoo experience is currently being upgraded. We are enhancing our engine to serve you better. We will be back online shortly.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <a
                        href="mailto:info@aligoo-digital.agency"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-neutral-950 transition-all hover:bg-neutral-200"
                    >
                        <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                        <span>Contact Us</span>
                    </a>

                    <a
                        href="tel:+251910584712" // Replace with actual number if available, or keep generic
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-neutral-900/50 px-8 font-medium text-white transition-all hover:bg-neutral-800"
                    >
                        <Phone className="mr-2 h-4 w-4 text-orange-500 transition-transform group-hover:scale-110" />
                        <span>Call Us</span>
                    </a>
                </motion.div>

                {/* Footer / Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="mt-20 flex gap-6 text-neutral-500"
                >
                    <Link href="#" className="hover:text-orange-500 transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-orange-500 transition-colors">LinkedIn</Link>
                    <Link href="#" className="hover:text-orange-500 transition-colors">Telegram</Link>
                </motion.div>

            </main>

            {/* Floaters */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <FloatingParticle delay={0} x="10%" y="20%" />
                <FloatingParticle delay={2} x="80%" y="15%" />
                <FloatingParticle delay={5} x="30%" y="80%" />
                <FloatingParticle delay={3} x="70%" y="70%" />
            </div>

        </div>
    );
}

function FloatingParticle({ delay, x, y }: { delay: number, x: string, y: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 0.5, 0], y: [-20, -50] }}
            transition={{ delay, duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ left: x, top: y }}
            className="absolute h-2 w-2 rounded-full bg-white/20 blur-[1px]"
        />
    )
}
