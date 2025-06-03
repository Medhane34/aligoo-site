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
      headlineText1="Turn Clicks"
        headlineText2="Into Customers"
        headlineText3="With Facebook Ads That Actually Convert"
        subheading="Tired of wasting money on ads that get likes but no leads? We build high-performing Facebook ad campaigns that attract the right audience, generate real demand, and grow your business — without the guesswork."
        primaryButtonText="👉 Book Strategy Call"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="👀 See Past Results"
        secondaryButtonUrl="/docs"
        badgeText="Facebook Ad!" // Optional badge text
      />
      <WhyFacebookAdsWork />
      <AdPhilosophy />
      <WhoThisIsFor />
      <FeaturedFbCaseStudiesWrappers />
      <FaqSection />
      <CTABottomSection />
    </>
  );
}
