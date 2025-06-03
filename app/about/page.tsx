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
        headlineText1="We Build Brands "
        headlineText2="that actually "
        headlineText3="moves people."
        subheading="We’re not just another agency. We’re your unfair advantage.
Rooted in Addis Ababa, built for bold moves — we combine data, design, and digital firepower to grow brands that stand out and scale fast."
        primaryButtonText="👉 Meet the Team"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="📈 See Our Work"
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
