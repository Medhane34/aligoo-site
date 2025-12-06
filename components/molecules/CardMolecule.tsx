'use client'

import React, { MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
    base: 'relative rounded-3xl overflow-hidden transition-all duration-300',
    variants: {
        variant: {
            default: 'bg-neutral-900/50 border border-white/10 backdrop-blur-sm hover:scale-[1.02]',
            spotlight: 'bg-neutral-900/50 border border-white/10 backdrop-blur-sm',
            active: 'bg-neutral-900/50 border-2 border-[#FF595E] shadow-2xl shadow-[#FF595E]/30 scale-[1.02]',
        },
        padding: {
            none: 'p-0',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        }
    },
    defaultVariants: {
        variant: 'default',
        padding: 'md',
    }
})

type CardVariants = VariantProps<typeof card>

interface CardMoleculeProps extends CardVariants {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export default function CardMolecule({
    variant,
    padding,
    children,
    className,
    onClick,
}: CardMoleculeProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (variant !== 'spotlight') return

        const { left, top } = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
    }

    if (variant === 'spotlight') {
        return (
            <motion.div
                className={card({ variant, padding, className }) + ' group'}
                onMouseMove={handleMouseMove}
                onClick={onClick}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Spotlight Background Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 89, 94, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Spotlight Border Highlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 89, 94, 0.4),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Content */}
                <div className="relative z-20 h-full">
                    {children}
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className={card({ variant, padding, className })}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    )
}
