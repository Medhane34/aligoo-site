import { fetchAboutUsSection } from "@/lib/homepage";
import AboutUsSection, { AboutUsSectionProps } from "@/app/home/AboutUsSection";
export default async function AboutUsSectionWrapper() {
  const data: AboutUsSectionProps | null = await fetchAboutUsSection();
  if (!data) return null;
  return <AboutUsSection {...data} />;
}
