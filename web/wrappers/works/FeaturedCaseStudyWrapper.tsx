import { fetchFeaturedCaseStudy, FeaturedCaseStudyData } from "@/lib/works";
import FeaturedCaseStudy from "@/app/[lang]/works/Featured";

export default async function FeaturedCaseStudyWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: FeaturedCaseStudyData | null = await fetchFeaturedCaseStudy();

  if (!data) return null;

  return (
    <FeaturedCaseStudy
      excerpt={lang === "am" ? data.excerpt_am : data.excerpt_en}
      imageAlt={data.imageAlt}
      imageUrl={data.imageUrl}
      slug={data.slug}
      title={lang === "am" ? data.title_am : data.title_en}
    />
  );
}
