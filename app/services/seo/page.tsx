/* eslint-disable prettier/prettier */
import HeroSection from "@/components/HeroSection";

import CTABottomSection from "@/components/CTA";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import FeaturedWebDesignPostsWrapper from "@/wrappers/FeaturedWebDesignPostsWrapper";
import OurProcess from "@/components/service-sections/ourprocess";
import Container from "@/components/ui/Container";
const fbWhyContent = {
  heading: "Why SEO Still Reigns in the(Digital world if you know to",
  highlight: "use them)",
  paragraph1:
    "Paid ads come and go. SEO compounds. With the right strategy, your website can attract a steady stream of organic leads 24/7 — without spending a cent on ads.",
  paragraph2:
    "Want to dominate search results instead of chasing ads?Let’s make your brand impossible to ignore",
  stats: [
    { value: "🔍 94% ", label: "🌍of online journeys begin with a search" },
    { value: "🧠 High intent", label: "Avg. User Session: longer than any other platform = higher conversions" },
    { value: "💸 Lower long-term ", label: "cost than paid ads" },
    { value: "📊 Top rank", label: "build trust fast" },
  ],
};

const processSteps = [
  {
    id: 1,
    title: '🔍 SEO Audit & Research',
    description: "We analyze your current rankings, competitors, and keyword opportunities to build a data-backed roadmap",
  },
  {
    id: 2,
    title: '🏗️ On-Page Optimization',
    description: "We fix technical issues, optimize your site structure, and improve content for better visibility and crawlability.",
  },
  {
    id: 3,
    title: '✍️ Content Strategy & Creation',
    description: "We craft high-quality content that aligns with what your ideal clients are actually searching for.",
  },
  {
    id: 4,
    title: '🔗 Authority Building',
    description: "We implement ethical backlink strategies and citation-building to increase domain authority and rankability.",
  },
];

export default async function IndexPage() {
  return (
    <>
      <HeroSection 
      badgeText="Be Found Where It Matters Most!" // Optional badge text
        headlineText1="Search Engine"
        headlineText2="Visibility"
        headlineText3=" Visibility That Drives Clicks, Leads & Sales"
        primaryButtonText="📞 Book a Strategy Call"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="🔍 Get a Free SEO Audit"
        secondaryButtonUrl="#our-process-seo"
        subheading="We help you rank higher, get discovered faster, and convert more. Whether you're a local business or a growing brand, our SEO strategies are built to attract traffic that turns into paying customers — not just visitors."
      />
      <Container>
      <WhyServiceWorks {...fbWhyContent} />
      <OurProcess
        id="our-process-seo"
        heading="The Evergreen Growth Framework 🌱"
        subheading="We don’t chase traffic. We build it organically, methodically, and strategically — so it keeps compounding over time. Here’s how:"
        imageSrc="/page-content-images/ourprocess-seo.png" // Path to your image in the public folder
        imageAlt="“Marketers nurturing an organic growth ecosystem with SEO audit, optimized content, and authority-building strategies for long-term traffic.”"
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

      <FaqSection
  ctaText="📩 Need Custom Advice?"
  eyebrow="❓ FAQs about Our TikTok Ad Service"
  faqs={[
    {
      question: "1. How long before I see results from SEO?",
      answer:
        "SEO is a long game. Most clients start seeing meaningful traffic and ranking improvements within 3 to 6 months.",
    },
    {
      question: "2. Do you offer monthly SEO services or just one-time optimization?",
      answer:
        "Both. We offer one-time SEO overhauls and ongoing monthly plans for businesses ready to dominate their niche."
    },
     {
      question: "3. Is SEO better than paid adss?",
      answer:
       "They work differently. Paid ads bring fast results but stop when the budget ends. SEO builds long-term, sustainable traffic."
    },
    {
      question: "4. What makes your SEO different from others",
      answer:
       "We don’t do guesswork. We use real data, ethical methods, and tailor strategies to your business goals.",
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
