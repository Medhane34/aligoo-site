import { Metadata } from "next";

import WorkSectionWrapper from "@/wrappers/WorkSectionWrapper";
import Container from "@/components/ui/Container";
import FeaturedCaseStudyWrapper from "@/wrappers/works/FeaturedCaseStudyWrapper";
import IndustriesSectionWrapper from "@/wrappers/works/IndustriesSectionWrapper";
import WorksHeroSectionWrapper from "@/wrappers/works/HeroWorksWrapper";
export const metadata: Metadata = {
  title: "Our Work | Aligoo Digital Agency Projects & Case Studies",
  description:
    "Explore real projects and case studies from Aligoo Digital Agency. See how we help brands grow with smart strategy, clean design, and powerful execution in Addis Ababa and beyond.",
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
  alternates: {
    canonical: "https://aligoo-digital.agency/works",
  },
};

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
      <div className="div" id="our-work-section">
        <WorkSectionWrapper />
      </div>

      <Container>
        <IndustriesSectionWrapper lang={lang} />
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
