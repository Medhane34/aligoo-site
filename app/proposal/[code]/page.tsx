// app/p/[code]/page.tsx ← FINAL WORKING VERSION

import { currentUser } from '@clerk/nextjs/server'
import { getProposalByCode } from '@/lib/proposal'
import HeroWrapper from '@/wrappers/proposal/HeroSectionProposalWrapper'
import AboutUsSection from '@/components/proposal/AboutUsSection'
import PackagesWrapper from '@/wrappers/proposal/PackagesWrapper'
import TimelineWrapper from '@/wrappers/proposal/TimelineWrapper'
import { HeroData } from '@/types/ProposalType'
import EmailUnlockForm from '@/components/auth/EmailUnlockForm'
import ComparisonTable from '@/components/proposal/comparison/ComparisonTable'
import PricingTableWrapper from '@/wrappers/proposal/PricingTableWrapper'
import MockupShowcase from '@/components/proposal/MockupShowcase'
import CaseStudySection from '@/components/proposal/CaseStudySection'
import BeyondLaunch from '@/components/proposal/BeyondLaunch'
import TestimonialSection from '@/components/proposal/TestimonialSection'
import BonusGift from '@/components/proposal/BonusGift'
import TeamSection from '@/components/proposal/TeamSection'
import FAQSection from '@/components/proposal/FAQSection'
import NextSteps from '@/components/proposal/NextSteps'
import ChatSupportWidget from '@/components/proposal/ChatSupportWidget'

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const user = await currentUser()

  const proposal = await getProposalByCode(code)

  if (!proposal) {
    return <div className="p-10 text-center text-2xl">Proposal not found</div>
  }

  // No session → show OTP gate
  if (!user) {
    return <EmailUnlockForm
      proposalId={proposal._id}
      clientName={proposal.clientName || 'Valued Client'}
      expectedEmail={proposal.clientEmail} Uniquecode={code} />
  }

  // Session exists → show full proposal
  return (
    <main className="min-h-screen bg-gray-100 bg-neutral-950">
      <HeroWrapper hero={proposal.template.hero as HeroData} clientName={proposal.clientName} />
      <AboutUsSection />
      {/* <PackagesWrapper
        packages={proposal.template.basePackages}
        addOns={proposal.template.addOns}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        uniqueCode={proposal.uniqueCode}
      /> */}
      <TimelineWrapper timeline={proposal.template.timeline} />
      <CaseStudySection />
      <MockupShowcase />
      <TestimonialSection />
      <TeamSection />
      <FAQSection />

      <PricingTableWrapper
        comparisonTable={proposal.comparisonTable}
        packagePricing={proposal.packagePricing}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        addOns={proposal.template.addOns}
        uniqueCode={proposal.uniqueCode}
      />

      <BonusGift />
      <NextSteps
        uniqueCode={proposal.uniqueCode}
      /* expiryDate={"Nov 30, 2025"} */
      />
      <ChatSupportWidget
        clientName={proposal.clientName}
      />
    </main>
  )
}