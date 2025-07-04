import { fetchContactSection, ContactSectionData } from "@/lib/contact";
import ContactSection from "@/app/[lang]/contact/ContactSection";

export default async function ContactSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: ContactSectionData | null = await fetchContactSection();
  if (!data) return null;
  return (
    <ContactSection
      heading={lang === "am" ? data.heading_am : data.heading_en}
      subheading={lang === "am" ? data.subheading_am : data.subheading_en}
      address={lang === "am" ? data.address_am : data.address_en}
      availability={lang === "am" ? data.availability_am : data.availability_en}
      phone={data.phone}
      email={data.email}
    />
  );
}
