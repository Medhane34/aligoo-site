import HeroSection from "./HeroSection";
import FeaturedWorkSection from "./featuredWorkSection";
import WorkSection from "./WorkSection";
import IndustriesWeWorkedWith from "./IndustriesWeWorkedWith";
import CTABottomSection from "@/components/CTA";
export default function work() {
  return (
    <>
      <HeroSection />
      <FeaturedWorkSection />
      <WorkSection />
      <IndustriesWeWorkedWith/>
      <CTABottomSection
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
      />
    </>
  );
}
