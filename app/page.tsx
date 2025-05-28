import HeroSection from "./home/HeroSection";
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <StatsSection />
      <ServiceSection />
      <WorkSection />
      <ProcessSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTABottomSection
        heading="Let’s Build Something Amazing!"
        subheading="Start your next project with our expert team today."
      />
    </>
  );
}
