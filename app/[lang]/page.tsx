import { Metadata } from "next";

import AboutUsSection from "../home/AboutUsSection";
import TestimonialsSection from "../home/TestimonialsSection";
import StatsSection from "../home/StatsSection";
import ProcessSection from "../home/ProcessSection";
import ServiceSection from "../home/ServiceSection";
import BlogSection from "../home/blogSection";
import WhyUsSection from "../home/WhyUsSection";

import HeroSection from "@/components/HeroSection";
import CTABottomSection from "@/components/CTA";
import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";
import Container from "@/components/ui/Container";

import HeroSectionWrapper from "@/wrappers/homepage/HeroSectionWrapper";
import AboutUsSectionWrapper from "@/wrappers/homepage/AboutUsSectionWrapper";
import StatsSectionWrapper from "@/wrappers/homepage/StatsSectionWrapper";
import ServiceSectionWrapper from "@/wrappers/homepage/ServiceSectionWrapper";
import ProcessSectionWrapper from "@/wrappers/homepage/ProcessSectionWrapper";
import WhyServiceWorksSection from "@/components/service-sections/WhyServiceWorksSection";
import WhyUsSectionWrapper from "@/wrappers/homepage/WhyUsSectionWrapper";
import CTABottomSectionWrapper from "@/wrappers/homepage/CTABottomSectionWrapper";

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

export default function Home({ params }: { params: { lang: "en" | "am" } }) {
  return (
    <>
      <section className="bg-background-light dark:bg-background-dark">
        <HeroSectionWrapper lang={params.lang} />
        <Container>
          <AboutUsSectionWrapper lang={params.lang} />
        </Container>
        <StatsSectionWrapper />
        <Container>
          <div className="div" id="service-section">
            <ServiceSectionWrapper />
          </div>
        </Container>
        <Container>
          <HomeCaseStudyWrapper />
        </Container>
        <Container>
          <ProcessSectionWrapper />
        </Container>

        <Container>
          <WhyUsSectionWrapper />
        </Container>
        <Container>
          <TestimonialsSection />
        </Container>
        <Container>
          <BlogSection />
        </Container>

        <Container>
          <CTABottomSectionWrapper />
        </Container>
      </section>
    </>
  );
}
