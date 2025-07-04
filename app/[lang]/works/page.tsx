import { Metadata } from "next";

import IndustriesWeWorkedWith from "./IndustriesWeWorkedWith";

import CTABottomSection from "@/components/CTA";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import HeroSection from "@/components/HeroSection";
import Container from "@/components/ui/Container";
import FeaturedCaseStudyWrapper from "@/wrappers/works/FeaturedCaseStudyWrapper";
import IndustriesSectionWrapper from "@/wrappers/works/IndustriesSectionWrapper";
export const metadata: Metadata = {
  title: "Our Work | Aligoo Digital Agency Projects & Case Studies",
  description:
    "Explore real projects and case studies from Aligoo Digital Agency. See how we help brands grow with smart strategy, clean design, and powerful execution in Addis Ababa and beyond.",
  keywords: [
    "case studies",
    "project portfolio",
    "digital marketing results",
    "web design examples",
    "Aligoo projects",
    "Addis Ababa",
    "Ethiopia",
    "marketing success stories",
  ],
  alternates: {
    canonical: "https://aligoo-digital.agency/works",
  },
};

export default function work({ params }: { params: { lang: "en" | "am" } }) {
  return (
    <>
     {/*  <HeroSection
        badgeText="Our Work!" // Optional badge text
        headlineText1="Digital marketing that "
        headlineText2="delivers"
        headlineText3="clarity, clicks, and conversions."
        primaryButtonText="🚀 Start Your Project"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="📊 Explore Our works"
        secondaryButtonUrl="#our-work-section"
        subheading="Aligoo is a full-service digital marketing agency based in Addis Ababa.
We build smart websites, run killer ad campaigns, and craft content that actually gets people to act."
      /> */}
      <Container>
   <FeaturedCaseStudyWrapper lang={params.lang}/>
      </Container>
      <div className="div" id="our-work-section">
      <WorkSectionWrapper />
      </div>

      
      <Container>
        <IndustriesSectionWrapper lang={params.lang} />
      </Container>
      {/* <Container>
        <CTABottomSection
          firstbuttontext="🎯 Let's Talk Details "
          heading="Let’s Build Something Amazing!"
          subheading="Start your next project with our expert team today."
        />
      </Container> */}
    </>
  );
}
