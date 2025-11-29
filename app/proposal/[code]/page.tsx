// app/p/[code]/page.tsx ← FINAL WORKING VERSION

import { currentUser } from '@clerk/nextjs/server'
import { getProposalByCode } from '@/lib/proposal'
import HeroWrapper from '@/wrappers/proposal/HeroSectionProposalWrapper'
import PackagesWrapper from '@/wrappers/proposal/PackagesWrapper'
import TimelineWrapper from '@/wrappers/proposal/TimelineWrapper'
import { HeroData } from '@/types/ProposalType'
import EmailUnlockForm from '@/components/auth/EmailUnlockForm'
import ComparisonTable from '@/components/proposal/comparison/ComparisonTable'
import PricingTableWrapper from '@/wrappers/proposal/PricingTableWrapper'

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
    <main className="min-h-screen bg-gray-100">
      <HeroWrapper hero={proposal.template.hero as HeroData} clientName={proposal.clientName} />
      {/* <PackagesWrapper
        packages={proposal.template.basePackages}
        addOns={proposal.template.addOns}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        uniqueCode={proposal.uniqueCode}
      /> */}
      <TimelineWrapper timeline={proposal.template.timeline} />
      <PricingTableWrapper
        comparisonTable={proposal.comparisonTable}
        packagePricing={proposal.packagePricing}
        currentSelection={proposal.currentSelection}
        proposalId={proposal._id}
        addOns={proposal.template.addOns}
        uniqueCode={proposal.uniqueCode}
      />



    </main>
  )
}