import { Metadata } from "next";

import TestimonialsSection from "../home/TestimonialsSection";
import BlogSection from "../home/blogSection";

import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";
import Container from "@/components/ui/Container";
import HeroSectionWrapper from "@/wrappers/homepage/HeroSectionWrapper";
import AboutUsSectionWrapper from "@/wrappers/homepage/AboutUsSectionWrapper";
import StatsSectionWrapper from "@/wrappers/homepage/StatsSectionWrapper";
import ServiceSectionWrapper from "@/wrappers/homepage/ServiceSectionWrapper";
import ProcessSectionWrapper from "@/wrappers/homepage/ProcessSectionWrapper";
import WhyUsSectionWrapper from "@/wrappers/homepage/WhyUsSectionWrapper";
import CTABottomSectionWrapper from "@/wrappers/homepage/CTABottomSectionWrapper";
import HomeHeroSectionWrapper from "@/wrappers/homepage/HeroSectionWrapper";

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
export const revalidate = 3600; // Rebuild every hour

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}) {
  const { lang } = await params;

  return (
    <>
      <section className="bg-background-light dark:bg-background-dark">
        <HomeHeroSectionWrapper lang={lang} />
        <Container>
          <AboutUsSectionWrapper lang={lang} />
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
