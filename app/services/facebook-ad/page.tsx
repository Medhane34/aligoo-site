import HeroSection from "@/components/HeroSection";
import WhyFacebookAdsWork from "./WhyFacebookAdsWork";
import AdPhilosophy from "./OurPhilosophy";
import WhoThisIsFor from "./WhoThisIsFor";
import FaqSection from "./FaqSection";
import CTABottomSection from "./CallToAction";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import FeaturedFbCaseStudiesWrappers from "@/wrappers/FeaturedFbCaseStudiesWrappers";
export default async function IndexPage() {
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
      <WhyFacebookAdsWork />
      <AdPhilosophy />
      <WhoThisIsFor />
      <FeaturedFbCaseStudiesWrappers/>
      <FaqSection />
      <CTABottomSection />
    </>
  );
}
