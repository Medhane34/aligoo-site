import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import Container from "@/components/ui/Container";
import dynamic from "next/dynamic";

const FeaturedCaseStudyWrapper = dynamic(() =>
  import("@/wrappers/works/FeaturedCaseStudyWrapper"),
);
const IndustriesSectionWrapper = dynamic(() =>
  import("@/wrappers/works/IndustriesSectionWrapper"),
);
const WorksHeroSectionWrapper = dynamic(() =>
  import("@/wrappers/works/HeroWorksWrapper"),
);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

  const title =
    locale === "am"
      ? "ስራዎቻችን | አሊጎ የዲጂታል ማርኪቲንግ ፕሮጀክቶች"
      : "Our Work | Aligoo Digital Agency Projects & Case Studies";

  const description =
    locale === "am"
      ? "ከ አሊጎ የዲጂታል ማርኪቲንግ ፕሮጀክቶችን ያግኝ። በአዲስ አበባ እና ከዚያ ባሻገር አሸናፊ ስትራቴጂ ፣ ንጹህ ዲዛይን እና ገራሚ ማስታውቂያ ብራንዶቻቸውን እንዴት እናሳድጋለን ይመልከቱ።"
      : "Explore real projects and case studies from Aligoo Digital Agency. See how we help brands grow with smart strategy, clean design, and powerful execution in Addis Ababa and beyond.";

  return createPageMetadata({
    pathnameWithoutLang: "/works",
    currentLang: locale,
    title,
    description,
    keywords: [
      "case studies",
      "project portfolio",
      "digital marketing results",
      "web design examples",
      "Aligoo projects",
      "Addis Ababa",
      "Ethiopia",
      "marketing success stories",
    ],
  });
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "am" }];
}

export const revalidate = 3600; // Rebuild every hour

export default async function WorksPage({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}) {
  const { lang } = await params; // ✅

  return (
    <>
      <WorksHeroSectionWrapper lang={lang} />
      <Container>
        <FeaturedCaseStudyWrapper lang={lang} />
      </Container>
      <div className="section-deferred" id="our-work-section">
        <WorkSectionWrapper />
      </div>

      <Container>
        <div className="section-deferred">
          <IndustriesSectionWrapper lang={lang} />
        </div>
      </Container>
      {/* <Container>
        <CTABottomSection
          firstbuttontext="🎯 Let's Talk Details "
          heading="Let’s Build Something Amazing!"
          subheading="Start your next project with our expert team today."
        />
      </Container> */}
    </>
  );
}
