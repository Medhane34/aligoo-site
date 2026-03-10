// app/[lang]/blog/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

import BlogListSectionWrapper from "@/wrappers/blog/BlogListSectionWrapper";
import TGPromotionWrapper from "@/wrappers/blog/TGPromotionWrapper";
import Container from "@/components/ui/Container";

// Correct type for Next.js 15+
type Props = {
  params: Promise<{ lang: "en" | "am" }>;
};

// You can keep this if you want strong typing inside the function
type Lang = "en" | "am";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

  return createPageMetadata({
    pathnameWithoutLang: "/blog",
    currentLang: locale,
    title: locale === "am" ? "ብሎግ | አሊጉ ዲጂታል" : "Blog | Aligoo Digital Agency",
    description:
      locale === "am"
        ? "የዲጂታል ማርኬቲንግ ስልቶች፣ ምክሮች እና ጥናቶች ከአዲስ አበባ ኢትዮጵያ አነጋግረን።"
        : "Digital marketing strategies, tips, and insights from Addis Ababa — written by the Aligoo team.",
  });
}


export const revalidate = 3600;

export default async function BlogPage({ params }: Props) {
  const { lang } = await params; // ← must await here too

  if (!["en", "am"].includes(lang)) {
    notFound();
  }

  return (
    <>
      {/* <HeroSection name="blog-hero" lang={lang} /> */}
      <Container>
        <BlogListSectionWrapper lang={lang} />
      </Container>
      <Container>
        <TGPromotionWrapper lang={lang} />
      </Container>
      {/* <CTABottomSection /> */}
    </>
  );
}
