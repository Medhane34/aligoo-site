import { fetchAboutIntroSection } from "@/lib/about";
import AboutIntroSection, { AboutIntroSectionProps } from "@/app/about/Intro"

export default async function AboutIntroSectionWrapper() {
  const data: AboutIntroSectionProps | null = await fetchAboutIntroSection();
  if (!data) return null;
  return <AboutIntroSection {...data} />;
}