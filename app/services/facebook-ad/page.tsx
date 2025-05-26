import HeroSection from "./HeroSection";
import WhyFacebookAdsWork from "./WhyFacebookAdsWork";
import AdPhilosophy from "./OurPhilosophy";
import WhoThisIsFor from "./WhoThisIsFor";
import FaqSection from "./FaqSection";
export default async function IndexPage() {
  return (

    <><HeroSection />
    <WhyFacebookAdsWork />
    <AdPhilosophy/>
    <WhoThisIsFor/>
    <FaqSection />
    </>
  );
}