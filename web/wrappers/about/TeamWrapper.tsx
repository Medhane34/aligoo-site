// wrappers/about/TeamWrapper.tsx

import TeamSection from "@/components/about/team";
import { TeamSectionData } from "@/lib/about";

interface TeamWrapperProps {
  data: TeamSectionData | null;
  lang: "en" | "am";
}

export default function TeamWrapper({ data, lang }: TeamWrapperProps) {
  if (!data) {
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Team Section: Data not loaded yet (check Sanity document)
      </div>
    );
  }

  return <TeamSection {...data} lang={lang} />;
}
