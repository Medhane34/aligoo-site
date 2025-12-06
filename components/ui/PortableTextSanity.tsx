// components/ui/PortableTextSanity.tsx
import { PortableText as PortableTextComponent } from '@portabletext/react'

const components = {
    marks: {
        link: ({ value, children }: any) => {
            const { href, openInNewTab } = value || {}
            return (
                <a
                    href={href}
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noopener noreferrer' : ''}
                    className="text-cyan-400 underline hover:text-cyan-300 transition"
                >
                    {children}
                </a>
            )
        },
    },
}

export default function PortableTextSanity({ blocks }: { blocks: any }) {
    if (!blocks || blocks.length === 0) return null
    return <PortableTextComponent value={blocks} components={components} />
}