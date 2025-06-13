
import IndustriesWeWorkedWith from "./IndustriesWeWorkedWith";
import CTABottomSection from "@/components/CTA";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";

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

export default function work() {
  return (
    <>
      <HeroSection 
      headlineText1="Digital marketing that "
        headlineText2="delivers"
        headlineText3="clarity, clicks, and conversions."
        subheading="Aligoo is a full-service digital marketing agency based in Addis Ababa.
We build smart websites, run killer ad campaigns, and craft content that actually gets people to act."
        primaryButtonText="🚀 Start Your Project"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="📊 Explore Our Services"
        secondaryButtonUrl="/docs"
        badgeText="Our Work!" // Optional badge text
      />
      <FetchCaseStudiesWrapper />
      <WorkSectionWrapper />
      <IndustriesWeWorkedWith />
      <CTABottomSection
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
        firstbuttontext="Let's Talk "
      />
    </>
  );
}
