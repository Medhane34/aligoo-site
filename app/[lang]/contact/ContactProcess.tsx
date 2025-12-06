"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, PhoneCall, Rocket, Search } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "1. We Review",
        description: "Our team analyzes your request to understand your goals.",
    },
    {
        icon: PhoneCall,
        title: "2. Discovery Call",
        description: "We schedule a quick chat to align on vision & scope.",
    },
    {
        icon: Sparkles,
        title: "3. Strategy & Kickoff",
        description: "We propose a tailored plan and launch your project!",
    },
];

export default function ContactProcess() {
    return (
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Rocket className="text-brand-primary" />
                What happens next?
            </h4>
            <div className="relative space-y-8 pl-4">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-primary via-brand-primary/50 to-transparent" />

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative flex items-start gap-4"
                    >
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background-light dark:bg-background-dark border-2 border-brand-primary shadow-lg shadow-brand-primary/20">
                            <step.icon className="h-5 w-5 text-brand-primary" />
                        </div>
                        <div className="pt-2">
                            <h5 className="font-bold text-lg leading-none mb-2">{step.title}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
