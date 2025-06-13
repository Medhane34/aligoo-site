import ContactForm from "./ContactForm";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Aligoo Digital Agency",
  description:
    "Ready to grow your business? Contact Aligoo Digital Agency in Addis Ababa for a free strategy session, project inquiries, or expert digital marketing advice.",
  keywords: [
    "contact Aligoo",
    "digital marketing consultation",
    "strategy session",
    "Addis Ababa agency",
    "get in touch",
    "Aligoo Digital Agency",
    "Ethiopia",
  ],
  alternates: {
    canonical: "https://aligoo-digital.agency/contact",
  },
};
export default function ContactPage() {
  return (
    <>
      <HeroSection
        headlineText1="Build"
        headlineText2="incredible"
        headlineText3="apps with zero config."
        subheading="Our platform empowers developers to launch and scale their ideas faster than ever before. Focus on code, we handle the rest."
        primaryButtonText="Start Building"
        primaryButtonUrl="/dashboard"
        secondaryButtonText="View Docs"
        secondaryButtonUrl="/docs"
        badgeText="New v3.0 Released!" // Optional badge text
      />
      <ContactForm />
    </>
  );
}
