import { Metadata } from "next";

import Intro from "./Intro";
import Values from "./values";
import MeaningSection from "./Meanining";
import AligooMarketingFix from "./ourway";
import MeetThePeople from "./team";

import Container from "@/components/ui/Container";
import { HeroSection, CTABottomSection } from "@/components";
import AboutIntroSectionWrapper from "@/wrappers/about/AboutIntroSectionWrapper";
import ValuesSectionWrapper from "@/wrappers/about/ValuesSectionWrapper";

export const metadata: Metadata = {
  title: "About Us | Aligoo Digital Agency",
  description:
    "Meet Aligoo: your growth-obsessed digital marketing partners in Addis Ababa. Discover our mission, team, and how we help brands break through the noise with clarity and creativity.",
  keywords: [
    "about Aligoo",
    "digital marketing team",
    "Addis Ababa agency",
    "growth partners",
    "marketing experts",
    "Ethiopia",
    "Aligoo Digital Agency",
  ],
  alternates: {
    canonical: "https://aligoo-digital.agency/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        badgeText="Get to know us a bit!" // Optional badge text
        headlineText1="We Build Brands "
        headlineText2="that actually "
        headlineText3="moves people."
        primaryButtonText="👉 Talk to the real team"
        primaryButtonUrl="/strategy-sessio"
        secondaryButtonText="📈 Read Our Story"
        secondaryButtonUrl="#intro-section"
        subheading="We’re not just another agency. We’re your unfair advantage.
Rooted in Addis Ababa, built for bold moves — we combine data, design, and digital firepower to grow brands that stand out and scale fast."
      />
      <Container>
        <div className="div" id="intro-section">
        <AboutIntroSectionWrapper/>
        </div>
      </Container>

      <Container>
        <MeaningSection />
      </Container>
      <Container>
        <AligooMarketingFix />
      </Container>
      <Container>
        <ValuesSectionWrapper/>
      </Container>
      <MeetThePeople />
       </>
  );
}
