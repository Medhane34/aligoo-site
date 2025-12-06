// wrappers/proposal/AboutUsWrapper.tsx
import AboutUsSection from '@/components/proposal/AboutUsSection'
import type { AboutUsData } from '@/types/ProposalType'

interface AboutUsWrapperProps {
    aboutUs?: AboutUsData | null
}

export default function AboutUsWrapper({ aboutUs }: AboutUsWrapperProps) {
    // Don't render if disabled or no data
    if (!aboutUs?.enabled) return null

    return <AboutUsSection data={aboutUs} />
}
