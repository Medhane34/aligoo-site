import HeroSection from "@/components/HeroSection";
import AboutUsSection from "./home/AboutUsSection";
import TestimonialsSection from "./home/TestimonialsSection";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import StatsSection from "./home/StatsSection";
import WorkSection from "./home/WorkSection";
import ProcessSection from "./home/ProcessSection";
import ServiceSection from "./home/ServiceSection";
import BlogSectionClient from "./home/BlogSectionClient";
import BlogSection from "./home/blogSection";
import WhyUsSection from "./home/WhyUsSection";
import CTABottomSection from "@/components/CTA";
import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";

export default function Home() {
  return (
    <>
      <HeroSection
        headlineText1="Build"
        headlineText2="incredible"
        headlineText3="apps with zero config."
        subheading="Our platform empowers developers to launch and scale their ideas faster than ever before. Focus on code, we handle the rest."
        primaryButtonText="Start Building"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="View Docs"
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
