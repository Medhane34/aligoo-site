
import IndustriesWeWorkedWith from "./IndustriesWeWorkedWith";
import CTABottomSection from "@/components/CTA";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import HeroSection from "@/components/HeroSection";
export default function work() {
  return (
    <>
      <HeroSection 
      headlineText1="Bold Ideas,  "
        headlineText2="Real Impact"
        headlineText3="— Built From the Ground Up "
        subheading="A spotlight on a project that pushed boundaries, delivered big results, and shows what happens when trust meets vision. Dive into the thinking, the process, and the wins."
        primaryButtonText="🚀 Browse Projects"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="📊 Contact Us"
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
