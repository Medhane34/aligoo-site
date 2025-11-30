'use client'

import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const heading = tv({
    base: 'font-black tracking-tight text-white leading-tight',
    variants: {
        variant: {
            default: 'text-white',
            split: 'text-white', // Base text is white, highlight is handled in component
            gradient: 'bg-gradient-to-r from-brand-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent',
        },
        size: {
            sm: 'text-2xl md:text-3xl',
            md: 'text-3xl md:text-4xl',
            lg: 'text-4xl md:text-5xl',
            xl: 'text-5xl md:text-6xl',
            '2xl': 'text-6xl md:text-7xl',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'xl',
        align: 'left',
    }
})

type HeadingVariants = VariantProps<typeof heading>

interface HeadingAtomProps extends HeadingVariants {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    title: string
    highlight?: string
    className?: string
}

export default function HeadingAtom({
    as: Component = 'h2',
    variant,
    size,
    align,
    title,
    highlight,
    className,
}: HeadingAtomProps) {

    if (variant === 'split' && highlight) {
        return (
            <Component className={heading({ variant: 'default', size, align, className })}>
                {title} <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent">
                    {highlight}
                </span>
            </Component>
        )
    }

    return (
        <Component className={heading({ variant, size, align, className })}>
            {title}
        </Component>
    )
}
