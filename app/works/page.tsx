
import IndustriesWeWorkedWith from "./IndustriesWeWorkedWith";
import CTABottomSection from "@/components/CTA";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import HeroSection from "@/components/HeroSection";
export default function work() {
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
