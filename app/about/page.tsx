
import HeroSection from "./HeroSection";
import Intro from "./Intro";
import Values from "./values";
import MeaningSection from "./Meanining";
import AligooMarketingFix from "./ourway";
import MeetThePeople from "./team";
import CTABottomSection from "@/components/CTA";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <Intro />
      <MeaningSection />
      <AligooMarketingFix />
      <Values />
      <MeetThePeople />
      <CTABottomSection
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
      />
    </>
  );
}
