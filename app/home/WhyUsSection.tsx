// components/sections/WhyUsSection.tsx
import { WhyUsSectionData } from "@/lib/homepage";

interface Props extends WhyUsSectionData {
  lang: 'en' | 'am';
}

export default function WhyUsSection({ sectionHeading, accentText, reasons, lang }: Props) {
  console.log(`[WhyUsSection] Rendering for lang '${lang}':`, { sectionHeading, accentText, reasons }); // Debug

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-4">{sectionHeading}</h2>
      <p className="text-muted-foreground mb-8">{accentText}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason, i) => (
          <div key={i} className={`p-6 rounded-lg ${reason.gradient} ${reason.span || 'col-span-1'}`}>
            <span className="text-3xl mb-4">{reason.emoji}</span>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-sm">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}