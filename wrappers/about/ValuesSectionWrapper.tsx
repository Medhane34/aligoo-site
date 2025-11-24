import ValuesSection from "@/components/about/values";
import { fetchValuesSection } from "@/lib/about";

export default async function ValuesWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchValuesSection(lang)

  if (!data || data.values.length < 5) return null

  return (
    <ValuesSection
      sectionHeading={data.sectionHeading}
      accentText={data.accentText}
      buttonText={data.buttonText}
      buttonUrl={data.buttonUrl}
      values={data.values}
      lang={lang}
    />
  )
}