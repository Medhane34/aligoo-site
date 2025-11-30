'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
    base: 'relative rounded-full font-bold transition-all overflow-hidden flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
    variants: {
        variant: {
            primary: 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 border-0',
            secondary: 'bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200 shadow-sm',
            outline: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40',
            ghost: 'bg-transparent text-white hover:bg-white/10',
            danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
        },
        size: {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
            xl: 'px-12 py-6 text-xl',
        },
        fullWidth: {
            true: 'w-full',
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        fullWidth: false,
    }
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonAtomProps extends Omit<HTMLMotionProps<"button">, "className">, ButtonVariants {
    icon?: React.ReactNode
    iconPosition?: "left" | "right"
    isLoading?: boolean
    shimmer?: boolean
    className?: string
    children: React.ReactNode
}

export default function ButtonAtom({
    variant,
    size,
    fullWidth,
    icon,
    iconPosition = "left",
    isLoading = false,
    shimmer = false,
    className,
    children,
    disabled,
    ...props
}: ButtonAtomProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disabled || isLoading}
            className={button({ variant, size, fullWidth, className })}
            {...props}
        >
            {/* Shimmer Effect */}
            {shimmer && !isLoading && !disabled && (
                <motion.div
                    animate={{ x: [-200, 400] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -z-0 pointer-events-none"
                />
            )}

            {/* Content Wrapper */}
            <span className="relative z-10 flex items-center gap-2">
                {isLoading && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                )}

                {!isLoading && icon && iconPosition === "left" && (
                    <span className="flex-shrink-0">{icon}</span>
                )}

                <span>{children}</span>

                {!isLoading && icon && iconPosition === "right" && (
                    <span className="flex-shrink-0">{icon}</span>
                )}
            </span>
        </motion.button>
    )
}
