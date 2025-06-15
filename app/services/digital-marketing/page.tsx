/* eslint-disable prettier/prettier */
import HeroSection from "@/components/HeroSection";

import CTABottomSection from "@/components/CTA";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import FeaturedWebDesignPostsWrapper from "@/wrappers/FeaturedWebDesignPostsWrapper";
import OurProcess from "@/components/service-sections/ourprocess";

import Container from "@/components/ui/Container";

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

const processSteps = [
  {
    id: 1,
    title: '1. Market Audit',
    description: "We dig deep into your current digital presence, competitors, and industry trends to see what’s working—and what’s holding you back.",
  },
  {
    id: 2,
    title: '2. Audience Alignment',
    description: "Who are you really speaking to? We define your ideal customer personas and map their journey, so every touchpoint feels personal and intentional.",
  },
  {
    id: 3,
    title: '3. Positioning & Priorities',
    description: "We identify where you stand in the market, refine your messaging, and prioritize the right channels for traction—not just activity.",
  },
  {
    id: 4,
    title: '4. Action Plan',
    description: "We deliver a clear, step-by-step roadmap with tactics, timelines, and KPIs—so you know exactly what to do, when, and why.",
  },
];

export default async function IndexPage() {
  return (
    <>
      <HeroSection 
      badgeText="Strategy Before Tactics!" // Optional badge text
        headlineText1="Digital Marketing Strategy   "
        headlineText2="That Drives Growth"
        headlineText3="— Not Just Likes"
        primaryButtonText="📞 Book Your Strategy Call"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="👀How We Build Strategy"
        secondaryButtonUrl="#our-process-digital"
        subheading="Without a clear roadmap, your marketing is just noise. We help businesses cut through the clutter with tailored digital strategies built to attract, convert, and scale. Stop guessing. Start growing.

"
      />
      <Container>
      <WhyServiceWorks {...webWhyContent} />
      </Container>
      <OurProcess
      id="our-process-digital"
        heading="🧩 Our Process — The MAP Framework"
        subheading="Marketing. Alignment. Precision.
We don’t throw spaghetti at the wall. We build strategies that stick and scale."
        imageSrc="/page-content-images/ourprocess-digital.png" // Path to your image in the public folder
        imageAlt="“Marketing team analyzing a strategic roadmap with audience personas, market research data, and a prioritized digital marketing action plan.”"
        steps={processSteps}
      />
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
      <FaqSection
  ctaText="📩 Need Custom Advice?"
  eyebrow="❓ FAQs about Our Digital Marketing Service"
  faqs={[
    {
      question: "How is a digital strategy different from just running ads or posting on social media?",
      answer:
        "A strategy connects the dots. Instead of isolated actions, we build a full roadmap that aligns all channels—ads, content, SEO, email—around your business goals.",
    },
    {
      question: "What kind of businesses is this strategy for?",
      answer:
        "We work best with service providers, online businesses, and local brands ready to scale. Whether you're launching, pivoting, or refining—strategy matters.",
    },
     {
      question: "What’s the timeline to get my strategy done?",
      answer:
        "Most projects take 2–3 weeks from kickoff to delivery, depending on complexity and your availability for reviews.",
    },
    {
      question: "Do you help with execution too?",
      answer:
        "Yes! Once the strategy is approved, we can either implement it for you or hand it off to your team with clear instructions.",
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
