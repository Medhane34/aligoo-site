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
/* import BlogSection from "./home/blogSection"; */
import { Navbar } from "@/components/ui/navbar-copy";
import { Button, GhostButton, GlowOutlineButton, PrimaryButton, SecondaryButton, SimpleOutlineButton } from "@/components/atoms/button";
import { Section, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
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
        {/* <button
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
        </button> */}
        
      </div>
    {/* <Navbar/> */}

            {/* Using the standard component with explicit props */}
            {/* Section for Primary Button (Branded Gradient) */}
                <Section >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <PrimaryButton size="sm">Small Primary</PrimaryButton>
                        <PrimaryButton size="md">Medium Primary</PrimaryButton>
                        <PrimaryButton size="lg">Large Primary</PrimaryButton>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <PrimaryButton>
                        </PrimaryButton>
                        <PrimaryButton disabled>Disabled Primary</PrimaryButton>
                    </div>
                </Section>

                {/* Section for Secondary Button (Outline/White Tint) */}
                <Section >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <SecondaryButton size="sm">Small Secondary</SecondaryButton>
                        <SecondaryButton size="md">Medium Secondary</SecondaryButton>
                        <SecondaryButton size="lg">Large Secondary</SecondaryButton>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <SecondaryButton >
                        </SecondaryButton>
                        <SecondaryButton disabled>Disabled Secondary</SecondaryButton>
                    </div>
                </Section>

                {/* Section for Ghost Button (Text Only) */}
                <Section >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <GhostButton size="sm">Small Ghost</GhostButton>
                        <GhostButton size="md">Medium Ghost</GhostButton>
                        <GhostButton size="lg">Large Ghost</GhostButton>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <GhostButton className="text-blue-400 hover:text-blue-300">
                            Custom Color Ghost
                        </GhostButton>
                        <GhostButton disabled>Disabled Ghost</GhostButton>
                    </div>
                </Section>

                {/* Section for Complex Outline Button (Glow Effect) */}
                <Section >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GlowOutlineButton size="lg" icon={<Zap className="h-5 w-5" />}>
                            Activate Premium Access
                        </GlowOutlineButton>
                        <GlowOutlineButton size="md" icon={<Zap className="h-4 w-4" />} disabled>
                            Glow Disabled
                        </GlowOutlineButton>
                    </div>
                </Section>
                
                {/* Section for Simple Button (Using Base Component) */}
                <Section >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Using the generic Button component and passing the danger variant */}
                        <Button variant="danger" size="lg">Delete All Data</Button>
                        {/* Using the SimpleOutlineButton (which is mapped to danger) */}
                        <SimpleOutlineButton size="md" disabled>Danger Disabled (SimpleOutline)</SimpleOutlineButton>
                    </div>
                </Section>


            {/* Ghost Button with a custom class to override padding */}
            {/* <GhostButton className="p-1 hover:underline">
                View History
            </GhostButton> */}
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
        {/* <TestimonialsSection /> */}
        <span className="relative z-20">Testimonials</span>
    <a
      className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      
    >
    </a>
      </Container>
      {/* <Container>
        <BlogSection lang={"en"} />
      </Container> */}
      <Container>
        <CTABottomSectionWrapper />
      </Container>
      
    </>
  );
}
