import { Metadata } from "next";

import AboutUsSection from "./home/AboutUsSection";
import TestimonialsSection from "./home/TestimonialsSection";
import StatsSection from "./home/StatsSection";
import ProcessSection from "./home/ProcessSection";
import ServiceSection from "./home/ServiceSection";
import BlogSection from "./home/blogSection";
import WhyUsSection from "./home/WhyUsSection";

import HeroSection from "@/components/HeroSection";
import CTABottomSection from "@/components/CTA";
import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";
import Container from "@/components/ui/Container";
export const metadata: Metadata = {
  title: "Aligoo Digital Agency | Digital Marketing in Addis Ababa",
  description:
    "Aligoo is a full-service digital marketing agency in Addis Ababa. We build smart websites, run killer ad campaigns, and craft content that delivers clarity, clicks, and conversions.",
  keywords: [
    "digital marketing",
    "Addis Ababa",
    "marketing agency",
    "web design",
    "SEO",
    "Facebook ads",
    "Ethiopia",
    "Aligoo",
    "content marketing",
    "lead generation",
  ],
  alternates: {
    canonical: "https://aligoo-digital.agency/",
  },
};

export default function Home() {
  return (
    <>
      <section className="bg-background-light dark:bg-background-dark">
        <HeroSection
          badgeText="Welcome to Our V2 Site!" // Optional badge text
          headlineText1="Digital marketing that "
          headlineText2="delivers"
          headlineText3="clarity, clicks, and conversions."
          primaryButtonText="🚀 Book a Consultation"
          primaryButtonUrl="/strategy-session"
          secondaryButtonText="📊 Explore Our Services"
          secondaryButtonUrl="#service-section"
          subheading="Aligoo is a full-service digital marketing agency based in Addis Ababa.
      We build smart websites, run killer ad campaigns, and craft content that actually gets people to act."
        />
        <Container>
          <AboutUsSection />
        </Container>
        <StatsSection />
        <Container>
          <div className="div" id="service-section">
          <ServiceSection />
          </div>
        </Container>
        <Container>
          <HomeCaseStudyWrapper />
        </Container>
        <Container>
          <ProcessSection />
        </Container>

        <Container>
          <WhyUsSection />
        </Container>
        <Container>
          <TestimonialsSection />
        </Container>
        <Container>
          <BlogSection />
        </Container>

        <Container>
          <CTABottomSection
            firstbuttontext="📩 Book a Consultation"
            heading="Let’s Build Something Amazing!"
            subheading="Start your next project with our expert team today."
          />
        </Container>
      </section>
    </>
  );
}
