// app/p/[code]/page.tsx ← FINAL WORKING VERSION

import { currentUser } from "@clerk/nextjs/server";

import { getProposalByCode } from "@/lib/proposal";
import HeroWrapper from "@/wrappers/proposal/HeroSectionProposalWrapper";
import AboutUsWrapper from "@/wrappers/proposal/AboutUsWrapper";
import TimelineWrapper from "@/wrappers/proposal/TimelineWrapper";
import { HeroData } from "@/types/ProposalType";
import EmailUnlockForm from "@/components/auth/EmailUnlockForm";
import PricingTableWrapper from "@/wrappers/proposal/PricingTableWrapper";
import MockupShowcaseWrapper from "@/wrappers/proposal/MockupShowcaseWrapper";
import CaseStudyWrapper from "@/wrappers/proposal/CaseStudyWrapper";
import TeamSection from "@/components/proposal/TeamSection";
import FAQWrapper from "@/wrappers/proposal/FAQWrapper";
import ChatSupportWidget from "@/components/proposal/ChatSupportWidget";
import TestimonialsWrapper from "@/wrappers/proposal/TestimonialsWrapper";
import BonusGiftWrapper from "@/wrappers/proposal/BonusGiftWrapper";
import NextStepsWrapper from "@/wrappers/proposal/NextStepsWrapper";
import RoadmapWrapper from "@/wrappers/proposal/RoadmapWrapper";

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const user = await currentUser();

  const proposal = await getProposalByCode(code);

  if (!proposal) {
    return <div className="p-10 text-center text-2xl">Proposal not found</div>;
  }

  // No session → show OTP gate
  if (!user) {
    return (
      <EmailUnlockForm
        Uniquecode={code}
        clientName={proposal.clientName || "Valued Client"}
        expectedEmail={proposal.clientEmail}
        proposalId={proposal._id}
      />
    );
  }

  // Session exists → show full proposal
  return (
    <main className="min-h-screen bg-neutral-950">
      <HeroWrapper
        clientName={proposal.clientName}
        hero={proposal.template.hero as HeroData}
        videoGreeting={proposal.videoGreeting}
      />
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

      <RoadmapWrapper proposal={proposal} />

      <PricingTableWrapper
        addOns={proposal.template.addOns}
        comparisonTable={proposal.comparisonTable}
        currentSelection={proposal.currentSelection}
        daysLeftText={proposal.daysLeftText}
        discount={proposal.discount}
        packagePricing={proposal.packagePricing}
        proposalId={proposal._id}
        uniqueCode={proposal.uniqueCode}
      />

      <BonusGiftWrapper bonusGift={proposal.template.bonusGift} />
      <NextStepsWrapper
        daysLeftText={proposal.daysLeftText}
        nextSteps={proposal.template.nextSteps}
      />
      <ChatSupportWidget clientName={proposal.clientName} />
    </main>
  );
}
