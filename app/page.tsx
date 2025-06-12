import HeroSection from "@/components/HeroSection";
import AboutUsSection from "./home/AboutUsSection";
import TestimonialsSection from "./home/TestimonialsSection";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import StatsSection from "./home/StatsSection";
import WorkSection from "./home/WorkSection";
import ProcessSection from "./home/ProcessSection";
import ServiceSection from "./home/ServiceSection";

import BlogSection from "./home/blogSection";
import WhyUsSection from "./home/WhyUsSection";

import CTABottomSection from "@/components/CTA";
import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";

export default function Home() {
  return (
    <>
      <HeroSection
        headlineText1="Digital marketing that "
        headlineText2="delivers"
        headlineText3="clarity, clicks, and conversions."
        subheading="Aligoo is a full-service digital marketing agency based in Addis Ababa.
      We build smart websites, run killer ad campaigns, and craft content that actually gets people to act."
        primaryButtonText="🚀 Start Your Project"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="📊 Explore Our Services"
        secondaryButtonUrl="/docs"
        badgeText="New v3.0 Released!" // Optional badge text
      />
      <AboutUsSection />
      <StatsSection />
      <ServiceSection />
      <HomeCaseStudyWrapper />
      <ProcessSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTABottomSection
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
        firstbuttontext="Contact Us"
      />
    </>
  );
}
