/* eslint-disable prettier/prettier */
import HeroSection from "@/components/HeroSection";
import WhyFacebookAdsWork from "./WhyFacebookAdsWork";
import AdPhilosophy from "./OurPhilosophy";

import CTABottomSection from "@/components/CTA";
import FetchCaseStudiesWrapper from "@/wrappers/FeaturedCaseStudyWrapper";
import FeaturedFbCaseStudiesWrappers from "@/wrappers/FeaturedFbCaseStudiesWrappers";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import FeaturedFbPostsWrapper from "@/wrappers/FeaturedFbCaseStudiesWrappers";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import FeaturedWebDesignPostsWrapper from "@/wrappers/FeaturedWebDesignPostsWrapper";

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

export default async function IndexPage() {
  return (
    <>
      <HeroSection 
      badgeText="Facebook Ad!" // Optional badge text
        headlineText1="Turn Clicks"
        headlineText2="Into Customers"
        headlineText3="With Facebook Ads That Actually Convert"
        primaryButtonText="👉 Book Strategy Call"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="👀 See Past Results"
        secondaryButtonUrl="/docs"
        subheading="Tired of wasting money on ads that get likes but no leads? We build high-performing Facebook ad campaigns that attract the right audience, generate real demand, and grow your business — without the guesswork."
      />
      <WhyServiceWorks {...facebookWhyContent} />
      <AdPhilosophy />
      <WhoThisIsForSection
      heading="Who This Is For"
      highlightedPhrases={[
        "are serious about growth",
        "have tried running ads but never got real results",
        "want leads that actually convert, not just “likes”",
        "scale it",
        "value strategy, not just hacks and trends",
        "just want to “boost a few posts” and hope for the best",
        "think Facebook Ads are a magic wand with no effort"
      ]}
      introText="This service is ideal for SaaS founders who"
      subheading="This Isn’t for Everyone — And That’s the Point"
    />
           <FeaturedFbPostsWrapper />

      <FaqSection
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
/>

      <CTABottomSection firstbuttontext={"📲 Book a Free Strategy Call"} heading={"Ready to get started?"} subheading={"Book a free strategy session with our team. "} />
    </>
  );
}
