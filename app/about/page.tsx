import HeroSection from "@/components/HeroSection";
import Intro from "./Intro";
import Values from "./values";
import MeaningSection from "./Meanining";
import AligooMarketingFix from "./ourway";
import MeetThePeople from "./team";

import CTABottomSection from "@/components/CTA";

export default function AboutPage() {
  return (
    <>
      <HeroSection
        headlineText1="Build"
        headlineText2="incredible"
        headlineText3="apps with zero config."
        subheading="Our platform empowers developers to launch and scale their ideas faster than ever before. Focus on code, we handle the rest."
        primaryButtonText="Start Building"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="View Docs"
        secondaryButtonUrl="/docs"
        badgeText="New v3.0 Released!" // Optional badge text
      />
      <Intro />
      <MeaningSection />
      <AligooMarketingFix />
      <Values />
      <MeetThePeople />
      <CTABottomSection
        firstbuttontext="Let's catch up 😎"
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
      />
    </>
  );
}
