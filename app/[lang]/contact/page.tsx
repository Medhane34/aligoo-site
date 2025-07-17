import ContactForm from "./ContactForm";
import HeroSection from "@/components/HeroSection";
import ContactSectionWrapper from "@/wrappers/contact/ContactSectionWrapper";
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

export const revalidate = 3600; // Rebuild every hour

export default async function ContactPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
  const { lang } = await params; // ✅
  
  return (
    <>
      <HeroSection
        headlineText1="Have a project in mind?  "
        headlineText2="We’d love"
        headlineText3="to hear from you."
        subheading="Whether you're looking to grow your business, launch a new campaign, or just want to bounce around some ideas — we’re all ears. Drop us a line and let's explore how we can help you turn ambition into action."
        primaryButtonText="👉 Custom Strategy Session"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="💬 Quick Chat"
        secondaryButtonUrl="#quick-chat"
        badgeText="Let’s Make Something Amazing Together 💬!" // Optional badge text
      />
      <div className="div" id="quick-chat">
     <ContactSectionWrapper lang={lang} />;
      </div>
    </>
  );
}
