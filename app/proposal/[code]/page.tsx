// app/p/[code]/page.tsx ← FINAL WORKING VERSION

import { currentUser } from '@clerk/nextjs/server'
import { getProposalByCode } from '@/lib/proposal'
import HeroWrapper from '@/wrappers/proposal/HeroSectionProposalWrapper'
import AboutUsWrapper from '@/wrappers/proposal/AboutUsWrapper'
import PackagesWrapper from '@/wrappers/proposal/PackagesWrapper'
import TimelineWrapper from '@/wrappers/proposal/TimelineWrapper'
import { HeroData } from '@/types/ProposalType'
import EmailUnlockForm from '@/components/auth/EmailUnlockForm'
import ComparisonTable from '@/components/proposal/comparison/ComparisonTable'
import PricingTableWrapper from '@/wrappers/proposal/PricingTableWrapper'
import MockupShowcaseWrapper from '@/wrappers/proposal/MockupShowcaseWrapper'
import CaseStudySection from '@/components/proposal/CaseStudySection'
import CaseStudyWrapper from '@/wrappers/proposal/CaseStudyWrapper'
import BeyondLaunch from '@/components/proposal/BeyondLaunch'
import TestimonialSection from '@/components/proposal/TestimonialSection'
import BonusGift from '@/components/proposal/BonusGift'
import TeamSection from '@/components/proposal/TeamSection'
import FAQSection from '@/components/proposal/FAQSection'
import NextSteps from '@/components/proposal/NextSteps'

import FAQWrapper from '@/wrappers/proposal/FAQWrapper'
import ChatSupportWidget from '@/components/proposal/ChatSupportWidget'
import TestimonialsWrapper from '@/wrappers/proposal/TestimonialsWrapper'
import BonusGiftWrapper from '@/wrappers/proposal/BonusGiftWrapper'
import NextStepsWrapper from '@/wrappers/proposal/NextStepsWrapper'

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
    <main className="min-h-screen bg-neutral-950">
      <HeroWrapper hero={proposal.template.hero as HeroData} clientName={proposal.clientName} videoGreeting={proposal.videoGreeting} />
      <AboutUsWrapper aboutUs={proposal.template.aboutUs} />
      {/* <PackagesWrapper
        packages={proposal.template.basePackages}
        addOns={proposal.template.addOns}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        uniqueCode={proposal.uniqueCode}
      /> */}
      <TimelineWrapper timeline={proposal.template.timeline} />
      <CaseStudyWrapper caseStudy={proposal.template.caseStudy} />
      <MockupShowcaseWrapper mockupShowcase={proposal.mockupShowcase} />
      <TestimonialsWrapper testimonials={proposal.template.testimonials} />
      <TeamSection />
      <FAQWrapper faq={proposal.template.faq} />
      <PricingTableWrapper
        comparisonTable={proposal.comparisonTable}
        packagePricing={proposal.packagePricing}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        addOns={proposal.template.addOns}
        uniqueCode={proposal.uniqueCode}
        discount={proposal.discount}
        daysLeftText={proposal.daysLeftText}
      />

      <BonusGiftWrapper bonusGift={proposal.template.bonusGift} />
      <NextStepsWrapper nextSteps={proposal.template.nextSteps} daysLeftText={proposal.daysLeftText} />
      <ChatSupportWidget
        clientName={proposal.clientName}
      />
    </main>
  )
}