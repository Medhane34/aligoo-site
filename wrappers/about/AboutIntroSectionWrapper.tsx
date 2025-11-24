import AboutIntroSection from "@/components/about/Intro";
import { fetchAboutIntroSection } from "@/lib/about";


export default async function AboutIntroWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchAboutIntroSection(lang)

  if (!data) return null

  return (
    <AboutIntroSection
      {...data}
      lang={lang}
    />
  )
}