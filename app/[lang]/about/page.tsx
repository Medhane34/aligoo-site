// app/[lang]/about/page.tsx   (adjust path if different)

import { Metadata } from "next";
import Container from "@/components/ui/Container";
import { HeroSection } from "@/components";
import TeamWrapper from "@/wrappers/about/TeamWrapper";
import AboutIntroWrapper from "@/wrappers/about/AboutIntroSectionWrapper";
import ValuesWrapper from "@/wrappers/about/ValuesSectionWrapper";
import MeaningWrapper from "@/wrappers/about/MeaningWrapper";
import OurWayWrapper from "@/wrappers/about/OurWayWrapper";
import { fetchAboutPageData } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us | Aligoo Digital Agency",
  description: "Meet Aligoo: your growth-obsessed digital marketing partners in Addis Ababa...",
};

export const revalidate = 3600;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang?: 'en' | 'am' }>;
}) {
  const { lang } = await params;
  const locale = lang === 'am' ? 'am' : 'en';

  const data = await fetchAboutPageData(locale);

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
          <AboutIntroWrapper
            data={data.intro}
            lang={locale}   // ← pass locale if Intro still needs it
          />
        </div>
      </Container>
      <Container>
        <MeaningWrapper data={data.meaning} lang={locale} />
      </Container>
      <Container>
        <ValuesWrapper
          data={data.values}
          lang={locale}     // ← pass locale if Values still needs it
        />
      </Container>
      <Container>
        <OurWayWrapper data={data.ourWay} lang={locale} />
      </Container>
      <Container>
        <TeamWrapper data={data.team} lang={locale} />
      </Container>

      {/* Temporarily comment out other sections while testing */}
      {/* <Container><MeaningWrapper data={data.meaning} lang={locale} /></Container> */}
      {/* ... */}

    </>
  );
}