// wrappers/about/MeaningWrapper.tsx
import MeaningSection from "@/components/about/Meanining"
import { fetchMeaningSection } from "@/lib/about"

export default async function MeaningWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchMeaningSection(lang)
  if (!data) return null

  return <MeaningSection {...data} lang={lang} />
}