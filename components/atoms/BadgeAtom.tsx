'use client'

import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
    base: 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider',
    variants: {
        variant: {
            outline: 'bg-white/5 border border-white/10 backdrop-blur-sm text-white',
            filled: '', // Color-specific styles handled by compoundVariants
        },
        color: {
            red: '',
            orange: '',
            yellow: '',
            green: '',
            blue: '',
            gradient: '',
        }
    },
    compoundVariants: [
        // Filled variant color combinations
        {
            variant: 'filled',
            color: 'red',
            className: 'bg-red-500/10 border border-red-500/20 text-red-400'
        },
        {
            variant: 'filled',
            color: 'orange',
            className: 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
        },
        {
            variant: 'filled',
            color: 'yellow',
            className: 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
        },
        {
            variant: 'filled',
            color: 'green',
            className: 'bg-green-500/10 border border-green-500/20 text-green-400'
        },
        {
            variant: 'filled',
            color: 'blue',
            className: 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
        },
        {
            variant: 'filled',
            color: 'gradient',
            className: 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-400'
        },
    ],
    defaultVariants: {
        variant: 'outline',
        color: 'orange',
    }
})

type BadgeVariants = VariantProps<typeof badge>

interface BadgeAtomProps extends BadgeVariants {
    icon?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export default function BadgeAtom({
    variant,
    color,
    icon,
    children,
    className,
}: BadgeAtomProps) {
    return (
        <div className={badge({ variant, color, className })}>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
        </div>
    )
}
