import { Metadata } from "next";

import BlogSection from "../home/blogSection";

import HomeCaseStudyWrapper from "@/wrappers/HomeCaseStudyWrapper";
import Container from "@/components/ui/Container";
import HeroSectionWrapper from "@/wrappers/homepage/HeroSectionWrapper";
import AboutUsSectionWrapper from "@/wrappers/homepage/AboutUsSectionWrapper";
import StatsSectionWrapper from "@/wrappers/homepage/StatsSectionWrapper";
import ServiceSectionWrapper from "@/wrappers/homepage/ServiceSectionWrapper";
import ProcessSectionWrapper from "@/wrappers/homepage/ProcessSectionWrapper";
import WhyUsSectionWrapper from "@/wrappers/homepage/WhyUsSectionWrapper";
import CTABottomSectionWrapper from "@/wrappers/homepage/CTABottomSectionWrapper";
import { Lang } from "@/types/BlogPost";
import TestimonialsWrapper from "@/wrappers/homepage/TestimonialsWrapper";

export const metadata: Metadata = {
  title: "Aligoo Digital Agency | Digital Marketing in Addis Ababa",
  description:
    "Aligoo is a full-service digital marketing agency in Addis Ababa. We build smart websites, run killer ad campaigns, and craft content that delivers clarity, clicks, and conversions.",
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
  alternates: {
    canonical: "https://aligoo-digital.agency/",
  },
};
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
        <StatsSectionWrapper lang={lang} />
        <Container>
          <div className="div" id="service-section">
            <ServiceSectionWrapper lang={lang} />
          </div>
        </Container>
        <Container>
          <HomeCaseStudyWrapper />
        </Container>
        <Container>
          <ProcessSectionWrapper lang={lang} />
        </Container>

        <Container>
          <WhyUsSectionWrapper lang={lang} />
        </Container>
        <Container>
          {/* Testimonials Section */}
          <div id="testimonials">
            <TestimonialsWrapper lang={lang} />{" "}
          </div>

          <a className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
        </Container>
        <Container>
          <BlogSection lang={lang as Lang} />
        </Container>

        <Container>
          <CTABottomSectionWrapper />
        </Container>
      </section>
    </>
  );
}
