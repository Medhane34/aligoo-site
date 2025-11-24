// wrappers/about/OurWayWrapper.tsx
import OurWaySection from "@/components/about/ourway"
import { fetchOurWaySection } from "@/lib/about"

export default async function OurWayWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchOurWaySection(lang)

  // TEMPORARY: FORCE RENDER EVEN IF DATA IS INCOMPLETE
  // Remove this block once you're 100% sure data is stable
  if (!data) {
    console.log("OurWaySection: No data from Sanity (yet)")
    // Show fallback UI so you can see the section exists
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Our Way Section: Data not loaded yet (check Sanity document)
      </div>
    )
  }

  // CRITICAL: Never return null here — always render something
  return <OurWaySection {...data} lang={lang} />
}