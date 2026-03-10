// app/[lang]/about/page.tsx
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

import dynamic from "next/dynamic";

import Container from "@/components/ui/Container";
import { HeroSection } from "@/components";

const TeamWrapper = dynamic(() => import("@/wrappers/about/TeamWrapper"));
const AboutIntroWrapper = dynamic(() =>
  import("@/wrappers/about/AboutIntroSectionWrapper"),
);
const ValuesWrapper = dynamic(() =>
  import("@/wrappers/about/ValuesSectionWrapper"),
);
const MeaningWrapper = dynamic(() => import("@/wrappers/about/MeaningWrapper"));
const OurWayWrapper = dynamic(() => import("@/wrappers/about/OurWayWrapper"));
import { fetchAboutPageData } from "@/lib/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: "en" | "am" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

  const title =
    locale === "am"
      ? "ስለእኛ | አሊጎ የዲጂታል ማርኪቲንግ ኤጀንሲ"
      : "About Us | Aligoo Digital Agency";

  const description =
    locale === "am"
      ? "አሊጎን ይተዋወቁ፡ በአዲስ አበባ ውስጥ የእርስዎ እድገት ተኮር የዲጂታል ማርኪቲንግ አጋሮች። አሊጎ ብሎ ፕሮጀክቶቻቸውን የሚያካሂዱ ዲዛይነሮቻቸውን እና ስትራቴጂስቶቻቸውን ይሰሩ።"
      : "Meet Aligoo: your growth-obsessed digital marketing partners in Addis Ababa. A team of strategists, designers, and builders driven by one thing — your results.";

  return createPageMetadata({
    pathnameWithoutLang: "/about",
    currentLang: locale,
    title,
    description,
  });
}

export const revalidate = 3600;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang?: "en" | "am" }>;
}) {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

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
            lang={locale} // ← pass locale if Intro still needs it
          />
        </div>
      </Container>


      <Container>
        <div className="section-deferred">
          <MeaningWrapper data={data.meaning} lang={locale} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred">
          <ValuesWrapper
            data={data.values}
            lang={locale} // ← pass locale if Values still needs it
          />

        </div>
      </Container>
      <Container>
        <div className="section-deferred">
          <OurWayWrapper data={data.ourWay} lang={locale} />
        </div>
      </Container>
      <Container>
        <div className="section-deferred">
          <TeamWrapper data={data.team} lang={locale} />
        </div>
      </Container>

      {/* Temporarily comment out other sections while testing */}
      {/* <Container><MeaningWrapper data={data.meaning} lang={locale} /></Container> */}
      {/* ... */}
    </>
  );
}
