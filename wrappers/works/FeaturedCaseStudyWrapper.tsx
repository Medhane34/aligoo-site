import { fetchFeaturedCaseStudy, FeaturedCaseStudyData } from "@/lib/works";
import FeaturedCaseStudy from "@/app/[lang]/works/Featured";

export default async function FeaturedCaseStudyWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: FeaturedCaseStudyData | null = await fetchFeaturedCaseStudy();

  if (!data) return null;

  return (
    <FeaturedCaseStudy
      title={lang === "am" ? data.title_am : data.title_en}
      excerpt={lang === "am" ? data.excerpt_am : data.excerpt_en}
      imageUrl={data.imageUrl}
      imageAlt={data.imageAlt}
      slug={data.slug}
    />
  );
}
