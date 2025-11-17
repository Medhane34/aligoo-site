// app/[lang]/blog/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { CTABottomSection } from "@/components";
import BlogListSectionWrapper from "@/wrappers/blog/BlogListSectionWrapper";
import Container from "@/components/ui/Container";

// Correct type for Next.js 15+
type Props = {
  params: Promise<{ lang: "en" | "am" }>;
};

// You can keep this if you want strong typing inside the function
type Lang = "en" | "am";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params; // ← await the promise

  return {
    title: lang === "am" ? "ብሎግ | አሊጉ ዲጂታል" : "Blog | Aligoo Digital",
    description:
      lang === "am"
        ? "የዲጂታል ግብይት ስልቶችና ምክሮች"
        : "Digital marketing strategies and insights from Addis Ababa",
  };
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
      <Container children={undefined}>
        {/* <NewsletterCTASection lang={lang} /> */}
      </Container>
      {/* <CTABottomSection /> */}
    </>
  );
}