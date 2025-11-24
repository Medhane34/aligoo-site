// wrappers/about/TeamWrapper.tsx
import TeamSection from "@/components/about/team"
import { fetchTeamSection } from "@/lib/about"

export default async function TeamWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchTeamSection(lang)
  if (!data) return null

  return <TeamSection {...data} lang={lang} />
}