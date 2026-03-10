// components/wrappers/FAQWrapper.tsx
import FAQSection from "@/components/proposal/FAQSection";

export default function FAQWrapper({ faq }: { faq?: any }) {
  if (!faq?.enabled || !faq?.items?.length) return null;

  return (
    <FAQSection
      badgeText={faq.badgeText}
      highlightedText={faq.highlightedText}
      items={faq.items}
      mainHeading={faq.mainHeading}
    />
  );
}
