"use client";
import { useEffect, useState } from "react";
import HeroSectionWrapper from "@/wrappers/homepage/HeroSectionWrapper";
import AboutUsSectionWrapper from "@/wrappers/homepage/AboutUsSectionWrapper";
import StatsSectionWrapper from "@/wrappers/homepage/StatsSectionWrapper";
import ServiceSectionWrapper from "@/wrappers/homepage/ServiceSectionWrapper";
import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";
import ProcessSectionWrapper from "@/wrappers/homepage/ProcessSectionWrapper";
import WhyUsSectionWrapper from "@/wrappers/homepage/WhyUsSectionWrapper";
import CTABottomSectionWrapper from "@/wrappers/homepage/CTABottomSectionWrapper";
import Container from "@/components/ui/Container";
/* import TestimonialsSection from "./home/TestimonialsSection"; */
import BlogSection from "./home/blogSection";
import { TestimonialsSectionScroll } from "@/components/organism/home/testimonials";

export default function HomePageClient() {
  const [lang, setLang] = useState<"en" | "am">("en");
     const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 
   useEffect(() => {
     const root = window.document.documentElement
     root.classList.remove("light", "system")
     root.classList.add("dark")
   }, [])
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 100)
     }
 
     window.addEventListener("scroll", handleScroll)
     return () => window.removeEventListener("scroll", handleScroll)
   }, [])
 
   const handleMobileNavClick = (elementId: string) => {
     setIsMobileMenuOpen(false)
     setTimeout(() => {
       const element = document.getElementById(elementId)
       if (element) {
         const headerOffset = 120 // Account for sticky header height + margin
         const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
         const offsetPosition = elementPosition - headerOffset
 
         window.scrollTo({
           top: offsetPosition,
           behavior: "smooth",
         })
       }
     }, 100)
   }
 
  return (
    <>
      <div className="flex justify-end p-4">
        <button
          className={`px-4 py-2 rounded-l ${lang === "en" ? "bg-brand-primary text-white" : "bg-gray-200"}`}
          onClick={() => setLang("en")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded-r ${lang === "am" ? "bg-brand-primary text-white" : "bg-gray-200"}`}
          onClick={() => setLang("am")}
        >
          አማርኛ
        </button>
      </div>
      <HeroSectionWrapper lang={lang} />
      <Container>
        <AboutUsSectionWrapper />
      </Container>
      <StatsSectionWrapper lang={"en"} />
      <Container>
        <div className="div" id="service-section">
          <ServiceSectionWrapper lang={"en"} />
        </div>
      </Container>
      <Container>
        <HomeCaseStudyWrapper />
      </Container>
      <Container>
        <ProcessSectionWrapper lang={"en"} />
      </Container>
      <Container>
        <WhyUsSectionWrapper lang={"en"} />
      </Container>
      <Container>
       {/* Testimonials Section */}
              <div id="testimonials">
                <TestimonialsSectionScroll />
              </div>
        
         <a
      className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      
    >
    </a>
      </Container>
      <Container>
        <BlogSection lang={"en"} />
      </Container>
      <Container>
        <CTABottomSectionWrapper />
      </Container>
    </>
  );
}
