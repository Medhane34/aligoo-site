// components/wrappers/HeroWrapper.tsx
import HeroSection from '@/components/proposal/HeroSectionProposal'
import type { HeroData } from '@/types/ProposalType' // we'll define this

interface HeroWrapperProps {
  hero: HeroData
  clientName: string
}

export default async function HeroWrapper({ hero, clientName }: HeroWrapperProps) {
  // Optional: Extra server logic if needed (e.g., image optimization)
  return <HeroSection hero={hero} clientName={clientName} />
}