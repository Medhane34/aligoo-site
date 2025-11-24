import { Metadata } from "next";
import Container from "@/components/ui/Container";
import { HeroSection } from "@/components";
import TeamWrapper from "@/wrappers/about/TeamWrapper";
import AboutIntroWrapper from "@/wrappers/about/AboutIntroSectionWrapper";
import ValuesWrapper from "@/wrappers/about/ValuesSectionWrapper";
import MeaningWrapper from "@/wrappers/about/MeaningWrapper";
import OurWayWrapper from "@/wrappers/about/OurWayWrapper";

export const metadata: Metadata = {
  title: "About Us | Aligoo Digital Agency",
  description: "Meet Aligoo: your growth-obsessed digital marketing partners in Addis Ababa...",
};

export const revalidate = 3600;

export default function AboutPage({ params }: { params: { lang?: 'en' | 'am' } }) {
  const lang =  params?.lang === 'am' ? 'am' : 'en';

  return (
    <>
      <HeroSection
        badgeText="Get to know us a bit!"
        headlineText1="We Build Brands "
        headlineText2="that actually "
        headlineText3="moves people."
        primaryButtonText="Talk to the real team"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="Read Our Story"
        secondaryButtonUrl="#intro-section"
        subheading="We’re not just another agency. We’re your unfair advantage..."
      />

      <Container>
        <div id="intro-section">
          <AboutIntroWrapper lang={lang} />
        </div>
      </Container>
       <Container>
        <MeaningWrapper lang={lang} />
      </Container>
      <Container>
        <OurWayWrapper lang={lang} />
      </Container>
      <Container>
        <ValuesWrapper lang={lang} />
      </Container>

      <Container>
        <TeamWrapper lang={lang} />
      </Container>
    </>
  );
}