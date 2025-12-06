// wrappers/proposal/MockupShowcaseWrapper.tsx
import MockupShowcase from '@/components/proposal/MockupShowcase'
import type { MockupShowcaseData } from '@/types/ProposalType'

interface MockupShowcaseWrapperProps {
    mockupShowcase?: MockupShowcaseData | null
}

export default function MockupShowcaseWrapper({ mockupShowcase }: MockupShowcaseWrapperProps) {
    // Don't render if disabled or no data
    if (!mockupShowcase?.enabled) return null

    return <MockupShowcase data={mockupShowcase} />
}
