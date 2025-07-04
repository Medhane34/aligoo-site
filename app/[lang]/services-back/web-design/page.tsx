/* eslint-disable prettier/prettier */
import HeroSection from "@/components/HeroSection";

import CTABottomSection from "@/components/CTA";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
import FaqSection from "@/components/service-sections/FaqSection";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";
import FeaturedWebDesignPostsWrapper from "@/wrappers/FeaturedWebDesignPostsWrapper";
import OurProcess from "@/components/service-sections/ourprocess";
import Container from "@/components/ui/Container";
import OurProcessSectionWrapper from "@/wrappers/services/web-design/OurProcessSectionWrapper";

import CTAWEBSectionWrapper from "@/wrappers/services/web-design/CTAWebSectionWrapper";
import HeroWebSectionWrapper from "@/wrappers/services/web-design/HeroHomeSectionWrapper";

const webWhyContent = {
  heading: "Why Web Design Still Works(When Done",
  highlight: "Right)",
  paragraph1:
    "Many think websites are just digital brochures. We disagree. A strategically designed website is your 24/7 salesperson—built to educate, persuade, and convert.",
  paragraph2:
    "The truth is, good design isn’t just about aesthetics—it’s about understanding user behavior, guiding action, and building trust. Today, success online starts with a fast, mobile-friendly, and conversion-optimized website that works for you even while you sleep.",
  stats: [
    { value: "93%", label: "of online experiences begin with a search engine" },
    { value: "75%", label: "of users judge a company’s credibility based on website design" },
    { value: "88%", label: "of users won’t return after a bad user experience" },
    { value: "0.05s", label: "is all it takes for users to form an opinion about your website" },
  ],
};

const processSteps = [
  {
    id: 1,
    title: 'W — Website Intelligence',
    description: 'We kick things off by understanding your brand, goals, audience, and competitors. We don’t touch a pixel until we know exactly what your website needs to do — and who it needs to do it for.',
  },
  {
    id: 2,
    title: 'I — Impactful Design',
    description: 'We craft a high-converting visual experience that captures attention, builds trust, and guides visitors to take action. No generic templates here—just clean, bold design with purpose.',
  },
  {
    id: 3,
    title: 'S — Seamless Development',
    description: 'Your design comes to life with responsive, high-speed development that works beautifully across all devices. We ensure everything functions smoothly and loads fast—because slow = no',
  },
  {
    id: 4,
    title: 'E — Elevate & Launch',
    description: 'Before launch, we test thoroughly and train your team (if needed). Then, we hit publish and elevate your brand with a website that’s ready to convert—and built to grow with you.',
  },
];

export default async function IndexPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
   const { lang } = await params; // ✅

  return (
    <>
      <HeroWebSectionWrapper lang={lang} />
      <Container>
      <WhyServiceWorks {...webWhyContent} />
    </Container>
      <Container>
        <div className="div" id="our-process-web">
      <OurProcessSectionWrapper lang={lang}/>
        </div>
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

     <FeaturedWebDesignPostsWrapper lang={lang}
     />
</Container>
     <Container>
      <FaqSection
  ctaText="📩 Need Custom Advice?"
  eyebrow="❓ FAQs about Our Web Design Service"
  faqs={[
    {
      question: "💡 “How much does a website cost?",
      answer:
        "Our pricing depends on the complexity of your website, number of pages, and special features (like booking, e-commerce, etc.). We’ll give you a custom quote after a quick discovery call. No guesswork, no hidden fees.",
    },
    {
      question: "🕒 How long does it take to design and launch a site?",
      answer:
        "Most websites take 2–4 weeks from start to launch, depending on the scope. Need it faster? We offer rush delivery options for time-sensitive projects.",
    },
     {
      question: "✏️ Will I be able to update the site myself later?",
      answer:
        "Absolutely. All our websites come with an easy-to-use CMS (like WordPress or Webflow) and a walkthrough video showing you how to update your content anytime — no coding required.",
    },
    {
      question: "🔎 Do you also offer SEO or content writing?",
      answer:
        "Yes! We offer SEO-ready structure, and optional content writing services to help your message come across clear and compelling. We also handle on-page SEO setup (meta titles, descriptions, etc.) during development.",
    },

  ]}
  heading="Still Wondering If It Works?"
  subheading="We’ve helped dozens of brands run profitable campaigns. Here are answers to the most common questions people ask before they sign up."
/>
</Container>
<Container>

   <CTAWEBSectionWrapper lang={lang} />
</Container>

    </>
  );
}
