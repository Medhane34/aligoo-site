/* eslint-disable prettier/prettier */

import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import Container from "@/components/ui/Container";
import HeroDigitalSectionWrapper from "@/wrappers/services/digital-marketing/HeroDigitalWrapper";
import WhyDigitalWorksSectionWrapper from "@/wrappers/services/digital-marketing/WhyDigitalWorksWrappers";
import DigitalProcessSectionWrapper from "@/wrappers/services/digital-marketing/OurProcessDigitalWrappers";
import DigitalWhoThisIsForSectionWrapper from "@/wrappers/services/digital-marketing/DigitalWhoThisWrapper";
import DigitalFaqTikTokSectionWrapper from "@/wrappers/services/digital-marketing/DigitalFaqWrapper";
import CTATikTokSectionWrapper from "@/wrappers/services/TikTok-ad/CtaTikTokWrapper";

const webWhyContent = {
  heading: "Why Digital Marketing Strategy Still Works(When Done",
  highlight: "Right)",
  paragraph1:
    "Many businesses jump straight into tactics—ads, reels, blogs—without a plan. We take a different route. A well-crafted digital strategy acts as your GPS, aligning every effort, every post, every ad with your business goals.",
  paragraph2:
    "It’s not just about doing more. It’s about doing what works. With the right strategy, you stop reacting and start leading. You understand your audience, clarify your message, and make marketing decisions with confidence and purpose.",
  stats: [
    { value: "76%", label: "of marketers say a clear strategy helps them hit marketing goals faster" },
    { value: "70%", label: "of growing brands follow a documented digital marketing strategy" },
    { value: "65%", label: "of businesses that succeed online attribute it to consistent planning" },
    { value: "2x", label: "more ROI from marketing activities when backed by strategy" },
  ],
};


export default async function IndexPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
  const { lang } = await params; // ✅

  return (
    <>
      <HeroDigitalSectionWrapper lang={lang} />
      <Container>
     <WhyDigitalWorksSectionWrapper lang={lang} id="whyServiceWorksSection-Digital" />
      </Container>
      <DigitalProcessSectionWrapper lang={lang} />
      <Container>
      <DigitalWhoThisIsForSectionWrapper lang={lang} /> 
   </Container>

   
  <Container>
    <DigitalFaqTikTokSectionWrapper lang={lang}/>
</Container>
<Container>
      <CTATikTokSectionWrapper lang={lang}/>
  </Container> 
    </>
  );
}
