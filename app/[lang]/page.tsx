import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

import dynamic from "next/dynamic";

const HomeCaseStudyWrapper = dynamic(() => import("@/wrappers/HomeCaseStudyWrapper"));
const ProcessSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/ProcessSectionWrapper"),
);
const WhyUsSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/WhyUsSectionWrapper"),
);
const TestimonialsWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/TestimonialsWrapper"),
);
const BlogSection = dynamic<{ lang: Lang }>(() => import("../home/blogSection"));
const CTABottomSectionWrapper = dynamic(() =>
  import("@/wrappers/homepage/CTABottomSectionWrapper"),
);

import Container from "@/components/ui/Container";
const HeroSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/HeroSectionWrapper"),
);
const AboutUsSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/AboutUsSectionWrapper"),
);
const StatsSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/StatsSectionWrapper"),
);
const ServiceSectionWrapper = dynamic<{ lang: "en" | "am" }>(() =>
  import("@/wrappers/homepage/ServiceSectionWrapper"),
);
import { Lang } from "@/types/BlogPost";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

  const title =
    locale === "am"
      ? "አሊጎ ዲጂታል ማርኪቲንግ ኤጀንሲ | በአዲስ አበባ ዲጂታል ማርኬቲንግ"
      : "Aligoo | Digital Marketing in Addis Ababa, Ethiopia";

  const description =
    locale === "am"
      ? "አሊጎ ባለሙሉ አገልግሎት ዲጂታል ማርኪቲንግ ኤጀንሲ ነው። ብልጥ ድህረ ገጾችን እንገነባለን፣ ኃይለኛ የማስታወቂያ ዘመቻዎችን እናካሂዳለን፣ ለቢዝነስ ሽያጭን የሚያመስገኝ ማስታውቂያዎችን እናዘጋጃለን።"
      : "Aligoo is a full-service digital marketing agency in Addis Ababa, Ethiopia. We build smart websites, run killer ad campaigns, and craft content that delivers clarity, clicks, and conversions.";

  return createPageMetadata({
    pathnameWithoutLang: "/",
    currentLang: locale,
    title,
    description,
    keywords: [
      "digital marketing",
      "Addis Ababa",
      "marketing agency",
      "web design",
      "SEO",
      "Facebook ads",
      "Ethiopia",
      "Aligoo",
      "content marketing",
      "lead generation",
    ],
  });
}
export const revalidate = 3600; // Rebuild every hour

import { client } from "@/src/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries/siteSettings";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}) {
  const { lang } = await params;
  const siteSettings = await client.fetch(siteSettingsQuery).catch(() => null);

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aligoo Digital Agency",
    url: "https://aligoo-digital.agency",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://aligoo-digital.agency/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  let jsonLdLocalBusiness = null;

  if (siteSettings) {
    jsonLdLocalBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteSettings.title || "Aligoo Digital Agency",
      image: "https://aligoo-digital.agency/aligoo_favicon.png",
      "@id": "https://aligoo-digital.agency",
      url: "https://aligoo-digital.agency",
      telephone: siteSettings.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteSettings.streetAddress,
        addressLocality: siteSettings.addressLocality,
        addressRegion: siteSettings.addressRegion,
        postalCode: siteSettings.postalCode,
        addressCountry: siteSettings.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteSettings.latitude,
        longitude: siteSettings.longitude,
      },
      ...(siteSettings.ratingValue && siteSettings.reviewCount
        ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: siteSettings.ratingValue,
            reviewCount: siteSettings.reviewCount,
            bestRating: 5,
          },
        }
        : {}),
    };
  }

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        type="application/ld+json"
      />
      {jsonLdLocalBusiness && (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
          type="application/ld+json"
        />
      )}

      <section className="bg-background-light dark:bg-background-dark">
        <HeroSectionWrapper lang={lang} />
        <Container>
          <AboutUsSectionWrapper lang={lang} />
        </Container>
        <div className="section-deferred">
          <StatsSectionWrapper lang={lang} />
        </div>
        <Container>
          <div className="div section-deferred" id="service-section">
            <ServiceSectionWrapper lang={lang} />
          </div>
        </Container>
        <Container>
          <div className="section-deferred">
            <HomeCaseStudyWrapper />
          </div>
        </Container>
        <Container>
          <div className="section-deferred">
            <ProcessSectionWrapper lang={lang} />
          </div>
        </Container>

        <Container>
          <div className="section-deferred">
            <WhyUsSectionWrapper lang={lang} />
          </div>
        </Container>
        <Container>
          {/* Testimonials Section */}
          <div className="section-deferred" id="testimonials">
            <TestimonialsWrapper lang={lang} />{" "}
          </div>

          <a className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
        </Container>
        <Container>
          <div className="section-deferred">
            <BlogSection lang={lang as Lang} />
          </div>
        </Container>

        <Container>
          <div className="section-deferred">
            <CTABottomSectionWrapper />
          </div>
        </Container>
      </section>
    </>
  );
}
