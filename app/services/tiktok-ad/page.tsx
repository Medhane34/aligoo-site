/* eslint-disable prettier/prettier */
import HeroSection from "@/components/HeroSection";

import CTABottomSection from "@/components/CTA";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import FeaturedWebDesignPostsWrapper from "@/wrappers/FeaturedWebDesignPostsWrapper";
import OurProcess from "@/components/service-sections/ourprocess";
import AreWeMatch from "./AreWeMatch";

import Container from "@/components/ui/Container";
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

export default async function IndexPage() {
  return (
    <>
      <HeroSection 
      badgeText="TikTok-Ads!" // Optional badge text
        headlineText1="Turn Scrolls  "
        headlineText2="Into Sales"
        headlineText3=" with High-Converting TikTok Ads"
        primaryButtonText="🔴 Book a Strategy Call"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="👀 See Our Process"
        secondaryButtonUrl="#our-process-tiktok"
        subheading="Tired of throwing money at ads that don’t move the needle? We create thumb-stopping TikTok ads that blend into the feed, spark attention, and convert like crazy."
      />
      <Container>
      <WhyServiceWorks {...fbWhyContent} />
     </Container>

      <Container>
      <OurProcess
        id="our-process-tiktok"
        heading="Our Process — The V.I.B.E Framework"
        subheading="TikTok isn’t just another ad platform — it’s a culture. We don’t just run ads, we help you V.I.B.E. with your audience."
        imageSrc="/page-content-images/tik-tok-ourprocess.png" // Path to your image in the public folder
        imageAlt="Illustration of the V.I.B.E TikTok ad framework showcasing steps from visual hooks to performance analysis"
        steps={processSteps}
      />
     </Container>
      <Container>
      <WhoThisIsForSection
      heading="Who This Is For"
      highlightedPhrases={[
        "we build strategic ones that drive results.",
        "If you’re looking for a freelancer to slap together a template in a weekend, we’re not for you.",
        "But if you’re serious about creating a high-converting,”",
        "professional online presence ",
        "that actually helps you ",
        "grow your business — ",
        "we might be a perfect fit"
      ]}
      introText="We don’t just build pretty websites-"
      subheading="we build strategic ones that drive results."
    />

    </Container>
    <Container>
    <AreWeMatch/>
   </Container>
   <Container>
      <FaqSection
  ctaText="📩 Need Custom Advice?"
  eyebrow="❓ FAQs about Our TikTok Ad Service"
  faqs={[
    {
      question: "📌 “Do I need a TikTok account to run ads?”",
      answer:
        "Nope! We can run ads through our TikTok Ads Manager — though we recommend having a profile for extra credibility.",
    },
    {
      question: "📌 “Will I have to show my face or dance on camera?",
      answer:
        "Not unless you want to 😄 We specialize in creating brand-led content using trends, UGC, voiceover, or animation — no dancing required",
    },
     {
      question: "📌 “How fast will I see results?",
      answer:
        "Many campaigns get traction within 3–5 days, but we suggest running ads for at least 14 days to properly test and scale.",
    },
    {
      question: "📌 “What kind of businesses does TikTok work for?",
      answer:
        "Surprisingly many — from eCommerce and local services to educators and coaches. If your audience is under 45, TikTok’s worth it.",
    },

  ]}
  heading="Still Wondering If It Works?"
  subheading="We’ve helped dozens of brands run profitable campaigns. Here are answers to the most common questions people ask before they sign up."
/>

</Container>
<Container>

      <CTABottomSection firstbuttontext={"📲 Book a Free Strategy Call"} heading={"Ready to get started?"} subheading={"Book a free strategy session with our team. "} />
    </Container>
    </>
  );
}
