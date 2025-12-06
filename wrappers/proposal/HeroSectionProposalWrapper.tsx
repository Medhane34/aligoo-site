// components/wrappers/HeroWrapper.tsx
import HeroSection from '@/components/proposal/HeroSectionProposal'
import { HeroData } from '@/types/ProposalType'

interface HeroWrapperProps {
  hero: HeroData
  clientName: string
  videoGreeting?: {
    enabled?: boolean
    videoUrl?: string
    thumbnailUrl?: string
    tooltipText?: string
  } | null
}

export default function HeroWrapper({ hero, clientName, videoGreeting }: HeroWrapperProps) {
  if (hero?.enabled === false) return null

  return (
    <HeroSection
      hero={hero}
      clientName={clientName}
      videoGreeting={videoGreeting}  // ← Passed down correctly
    />
  )
}