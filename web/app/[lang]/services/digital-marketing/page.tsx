/* eslint-disable prettier/prettier */

import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

import Container from "@/components/ui/Container";
import HeroDigitalSectionWrapper from "@/wrappers/services/digital-marketing/HeroDigitalWrapper";

const WhyDigitalWorksSectionWrapper = dynamic(() =>
  import("@/wrappers/services/digital-marketing/WhyDigitalWorksWrappers"),
);
const DigitalProcessSectionWrapper = dynamic(() =>
  import("@/wrappers/services/digital-marketing/OurProcessDigitalWrappers"),
);
const DigitalWhoThisIsForSectionWrapper = dynamic(() =>
  import("@/wrappers/services/digital-marketing/DigitalWhoThisWrapper"),
);
const DigitalFaqTikTokSectionWrapper = dynamic(() =>
  import("@/wrappers/services/digital-marketing/DigitalFaqWrapper"),
);
const CTATikTokSectionWrapper = dynamic(() =>
  import("@/wrappers/services/TikTok-ad/CtaTikTokWrapper"),
);
const ServiceRecentBlogs = dynamic(() =>
  import("@/components/organism/blog/ServiceRecentBlogs"),
);

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";
  return createPageMetadata({
    pathnameWithoutLang: "/services/digital-marketing",
    currentLang: locale,
    title: locale === "am" ? "አሊጎ ዲጂታል ማርኬቲንግ ስትራቴጂ አግልግሎት| Aligoo" : "Digital Marketing Strategy | Aligoo Digital Agency",
    description:
      locale === "am"
        ? "የሚያሸንፍ ዲጂታል ማርኪቲንግ ስትራቴጂ ይፈልጋሉ? አሊጎ ሁሉንም ዲጂታል ቻናሎችህን — ማስታወቂያ፣ SEO፣ ኮንተንት — ወደ አንድ ብቻ ግብ ያስተካክላል፡ እድገት። ከአሁን ጀምሮ ሁሉም ነገር በአንድ አቅጣጫ ይሰራል — እና ያ አቅጣጫ ቢዝነስህን ወደ ፊት የሚያራምድ ነው። 🚀"
        : "Need a winning digital marketing strategy? Aligoo aligns all your digital channels — ads, SEO, content — toward one goal: growth.",
  });
}


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
        <WhyDigitalWorksSectionWrapper id="whyServiceWorksSection-Digital" lang={lang} />
      </Container>
      <div className="section-deferred">
        <DigitalProcessSectionWrapper lang={lang} />
      </div>
      <Container>
        <div className="section-deferred">
          <DigitalWhoThisIsForSectionWrapper lang={lang} />
        </div>
      </Container>


      <Container>
        <div className="section-deferred">
          <DigitalFaqTikTokSectionWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred">
          <CTATikTokSectionWrapper lang={lang} />
        </div>
      </Container>
      <div className="section-deferred">
        <ServiceRecentBlogs categorySlug="digital-marketing" serviceName="Digital Marketing" lang={lang} />
      </div>
    </>
  );
}
