/* eslint-disable prettier/prettier */

import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import HeroSection from "@/components/HeroSectionStable";
import FeaturedFbPostsWrapper from "@/wrappers/FeaturedFbCaseStudiesWrappers";
import Container from "@/components/ui/Container";
import dynamic from "next/dynamic";

const WhyServiceWorksSectionWrapper = dynamic(() => import("@/wrappers/services/facebook-ad/WhyServiceWorksSectionWrapper"));
const AdPhilosophySectionWrapper = dynamic(() => import("@/wrappers/services/facebook-ad/AdPhilosophySectionWrapper"));
const WhoThisIsForSectionWrapper = dynamic(() => import("@/wrappers/services/facebook-ad/WhoThisIsForSectionWrapper"));
const FaqSectionWrapper = dynamic(() => import("@/wrappers/services/facebook-ad/FaqSectionWrapper"));
const ServiceRecentBlogs = dynamic(() => import("@/components/organism/blog/ServiceRecentBlogs"));



export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";
  return createPageMetadata({
    pathnameWithoutLang: "/services/facebook-ad",
    currentLang: locale,
    title: locale === "am" ? "ፌስቡክ ማስታወቂያ | Aligoo ዲጂታል" : "Facebook Ads | Aligoo Digital Agency",
    description:
      locale === "am"
        ? "ወደ ደንበኞች ወደሚቀይሩ ፌስቡክ ማስታወቂያ ዘመቻዎች ያባርሩ። Aligoo ከ3.04 ቢሊዮን ተጠቃሚዎች ጋር የሚደርሱ ውጤታማ ዘመቻዎችን እናዘጋጃለን"
        : "Turn clicks into customers with Facebook ad campaigns that actually convert. Aligoo builds high-performing campaigns reaching over 3.04B monthly users.",
  });
}

const facebookWhyContent = {
  heading: "Why Facebook Ads Still Work (If You Do Them",
  highlight: "Right)",
  paragraph1:
    "Many believe Facebook Ads are outdated. We disagree. When executed strategically, they remain a powerful tool for reaching your audience and driving real results.",
  paragraph2:
    "The key is in understanding that the platform has evolved. Gone are the days of simple boosting. Today, success with Facebook Ads hinges on a deep understanding of the customer journey, crafting ads that speak directly to user needs and desires, and employing precision targeting.",
  stats: [
    { value: "3.04B+", label: "Monthly Active Users" },
    { value: "1.98B+", label: "Daily Active Users" },
    { value: "69%", label: "Adults Use Facebook" },
    { value: "~$12", label: "Avg. Ad Spend Per User" },
  ],
};

export const revalidate = 3600; // Rebuild every hour

export default async function IndexPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
  const { lang } = await params; // ✅

  return (
    <>
      <HeroSection
        badgeText="Facebook Ad!" // Optional badge text
        headlineText1="Turn Clicks"
        headlineText2="Into Customers"
        headlineText3="With Facebook Ads That Actually Convert"
        primaryButtonText="👉 Book Strategy Call"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="👀 See Past Results"
        secondaryButtonUrl="#who-this-for-fb"
        subheading="Tired of wasting money on ads that get likes but no leads? We build high-performing Facebook ad campaigns that attract the right audience, generate real demand, and grow your business — without the guesswork."
      />
      <Container>
        <WhyServiceWorksSectionWrapper lang={lang} />
      </Container>
      <Container>
        <div className="section-deferred" >
          <AdPhilosophySectionWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <WhoThisIsForSectionWrapper lang={lang} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred" >
          <FeaturedFbPostsWrapper lang={lang} />
        </div>
      </Container>
      <Container>

        {/* <FaqSection
  ctaText="📩 Need Custom Advice?"
  eyebrow="❓ FAQs about Our Facebook Ads Service"
  faqs={[
    {
      question: "❓ How soon can I expect results?",
      answer:
        "💬 It depends on your offer, audience, and budget — but most campaigns see traction within 1–2 weeks. We usually test for 2–4 weeks before scaling.",
    },
    {
      question: "❓ Do you create ad visuals and copy?",
      answer:
        "💬 Yes. We write all the copy, design static creatives, and edit videos — all optimized for conversion.",
    },
     {
      question: "❓ What if the ads don’t work?",
      answer:
        "💬 No agency can guarantee sales — but we guarantee action. If a campaign isn’t converting, we’ll dig in, pivot, and test new angles. Our focus is on continuous improvement, not cookie-cutter solutions.",
    },
  ]}
  heading="Still Wondering If It Works?"
  subheading="We’ve helped dozens of brands run profitable campaigns. Here are answers to the most common questions people ask before they sign up."
/> */}
        <div className="section-deferred" >
          <FaqSectionWrapper lang={lang} />
        </div>
      </Container>

      {/* <Container>

      <CTABottomSection firstbuttontext={"📲 Book a Free Strategy Call"} heading={"Ready to get started?"} subheading={"Book a free strategy session with our team. "} />
    </Container> */}
      <div className="section-deferred" >
        <ServiceRecentBlogs categorySlug="facebook-ad" serviceName="Facebook Ads" lang={lang} />
      </div>
    </>
  );
}
