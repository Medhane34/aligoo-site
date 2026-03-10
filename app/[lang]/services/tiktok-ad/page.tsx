/* eslint-disable prettier/prettier */

import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import AreWeMatch from "./AreWeMatch";

import Container from "@/components/ui/Container";
import HeroTikTokSectionWrapper from "@/wrappers/services/TikTok-ad/HeroTikTokWrappers";
import dynamic from "next/dynamic";

const ServiceRecentBlogs = dynamic(() => import("@/components/organism/blog/ServiceRecentBlogs"));
const WhyTikTokWorksSectionWrapper = dynamic(() => import("@/wrappers/services/TikTok-ad/WhyTikTokWrappers"));
const TikTokProcessSectionWrapper = dynamic(() => import("@/wrappers/services/TikTok-ad/ProcessTikTokWrappers"));
const FaqTikTokSectionWrapper = dynamic(() => import("@/wrappers/services/TikTok-ad/FaqTikTokWrappers"));
const CTATikTokSectionWrapper = dynamic(() => import("@/wrappers/services/TikTok-ad/CtaTikTokWrapper"));
const WhoThisIsForTikTokWrapper = dynamic(() => import("@/wrappers/services/TikTok-ad/WhothisforTikTokWrappers"));



export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";
  return createPageMetadata({
    pathnameWithoutLang: "/services/tiktok-ad",
    currentLang: locale,
    title: locale === "am" ? "ቲክቶክ ማስታወቂያ | አሊጎ ዲጂታል ማርኪቲንግ" : "TikTok Ads | Aligoo Digital Marketing Agency",
    description:
      locale === "am"
        ? "1.5 ቢሊዮን ወርሃዊ ተጠቃሚዎችን ይቅርቡ። አሊጎ ለ ቲክቶክ ተፈጥሯዊ ማስታወቂያዎችን እናዘጋጃለን"
        : "Reach 1.5B monthly TikTok users with native-style ad creatives built for engagement, brand awareness, and conversion.",
  });
}

const fbWhyContent = {
  heading: "Why TikTok Ad Works(if you know to",
  highlight: "use them)",
  paragraph1:
    "Many believe TikTok is “just for kids” or “not serious enough” for business. We strongly disagree. TikTok is the most engaging platform on the planet — and it’s where attention lives right now.",
  paragraph2:
    "The trick? Don’t treat it like TV. Success on TikTok Ads means understanding the culture of the platform, creating content that blends in but stands out, and mastering how to guide that attention into action.",
  stats: [
    { value: "1.5B+", label: "Monthly Active Users 🌍" },
    { value: "10.85m", label: "Avg. User Session: longer than any other platform 🕒" },
    { value: "67%", label: "of users say TikTok inspires them to shop — even when they weren’t planning to 🛍️" },
    { value: "#1", label: "App for driving impulse purchases" },
  ],
};

const processSteps = [
  {
    id: 1,
    title: 'V — Visual Hook First',
    description: "We start with scroll-stopping visuals that catch attention within the first 2 seconds. Whether it's humor, intrigue, or shock — we lead with the hook.",
  },
  {
    id: 2,
    title: '🧠 I — Integrated Storyline',
    description: "No boring, direct-sell content. We script your brand’s message into a native TikTok-style narrative — just like users expect.",
  },
  {
    id: 3,
    title: '🛠️ B — Built for Conversions',
    description: "Every ad is optimized for clicks, leads, or sales — with A/B tested CTAs, fast-loading landing pages, and seamless funnels.",
  },
  {
    id: 4,
    title: '📊 E — Evaluate & Expand',
    description: "We continuously analyze performance and scale what's working — turning top-performing creatives into revenue engines.",
  },
];

export const revalidate = 3600; // Rebuild every hour
export default async function IndexPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
  const { lang } = await params; // ✅

  return (
    <>
      <HeroTikTokSectionWrapper lang={lang} />
      <Container>
        <div className="section-deferred" >
          <WhyTikTokWorksSectionWrapper id="why-tiktok-works" lang={lang} />
        </div>
      </Container>

      <Container>
        <div className="section-deferred" >
          <TikTokProcessSectionWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <WhoThisIsForTikTokWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <AreWeMatch />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <FaqTikTokSectionWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <CTATikTokSectionWrapper lang={lang} />
        </div>
      </Container>
      <div className="section-deferred" >
        <ServiceRecentBlogs categorySlug="tik-tok" serviceName="TikTok Ads" lang={lang} />
      </div>
    </>
  );
}
