'use client'

import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tv, type VariantProps } from 'tailwind-variants'
import { AlertCircle } from 'lucide-react'

const inputStyles = tv({
    base: 'w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-transparent transition-all disabled:opacity-50 disabled:pointer-events-none',
    variants: {
        size: {
            sm: 'px-3 py-2 text-sm',
            md: 'px-4 py-3 text-base',
            lg: 'px-5 py-4 text-lg',
        },
        hasError: {
            true: 'border-red-500 focus:ring-red-500/20 bg-red-500/5',
            false: 'hover:bg-white/10 hover:border-white/20'
        },
        variant: {
            default: '',
            glass: 'backdrop-blur-md',
        }
    },
    defaultVariants: {
        size: 'md',
        hasError: false,
        variant: 'glass'
    }
})

interface InputAtomProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputStyles> {
    label?: string
    error?: string
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    containerClassName?: string
}

const InputAtom = forwardRef<HTMLInputElement, InputAtomProps>(({
    label,
    error,
    startContent,
    endContent,
    size,
    hasError,
    variant,
    className,
    containerClassName,
    ...props
}, ref) => {
    const isError = !!error || hasError;

    return (
        <div className={`flex flex-col gap-1.5 w-full ${containerClassName || ''}`}>
            {label && (
                <label className="text-sm font-medium text-white/80 ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                {startContent && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-10 transition-colors group-hover:text-white/70">
                        {startContent}
                    </div>
                )}

                <input
                    ref={ref}
                    className={inputStyles({
                        size,
                        hasError: isError,
                        variant,
                        className: `${className} ${startContent ? 'pl-10' : ''} ${endContent ? 'pr-10' : ''}`
                    })}
                    {...props}
                />

                {endContent && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-10">
                        {endContent}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-1.5 text-red-400 text-xs ml-1"
                    >
                        <AlertCircle size={12} />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
})

InputAtom.displayName = 'InputAtom'

export default InputAtom
