// wrappers/about/ValuesSectionWrapper.tsx

import ValuesSection from "@/components/about/values";
import { ValuesSectionData } from "@/lib/about";

interface ValuesWrapperProps {
  data: ValuesSectionData | null;
  lang?: 'en' | 'am';   // optional — keep only if ValuesSection still needs it
}

export default function ValuesWrapper({ data, lang }: ValuesWrapperProps) {
  if (!data || data.values.length < 5) {
    return (
      <div className="py-12 text-center text-gray-500">
        Values section not available or incomplete
      </div>
    );
  }

  return (
    <ValuesSection
      sectionHeading={data.sectionHeading || ""}
      accentText={data.accentText || ""}
      buttonText={data.buttonText || ""}
      buttonUrl={data.buttonUrl || ""}
      values={data.values}
      lang={lang || 'en'}   // ← keep only if your ValuesSection component still uses lang
    // (e.g. for RTL/LTR, icons, or conditional text)
    // If not needed anymore, remove this line and the prop
    />
  );
}