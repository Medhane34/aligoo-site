import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

import WhatHappensNextSection from "./WhatHappensNextSection";

import HeroSection from "@/components/HeroSectionStable";
import dynamic from "next/dynamic";

const ContactSectionWrapper = dynamic(() =>
  import("@/wrappers/contact/ContactSectionWrapper"),
);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "am" ? "am" : "en";

  const title =
    locale === "am"
      ? "አግኙን | አሊጎ የዲጂታል ማርኪቲንግ ኤጀንሲ"
      : "Contact Us | Aligoo Digital Agency";

  const description =
    locale === "am"
      ? "ቢዝነስህን ለማሳደግ ዝግጁ ነህ? በአዲስ አበባ ያለውን አሊጎ የዲጂታል ማርኪቲንግ ኤጀንሲ አነጋግረን — ነፃ የስትራቴጂ ሴሽን፣ ፕሮጀክት ጥያቄ፣ ወይም የዲጂታል ማርኪቲንግ ባለሙያ ምክር ለማግኘት። 🚀"
      : "Ready to grow your business? Contact Aligoo Digital Agency in Addis Ababa for a free strategy session, project inquiries, or expert digital marketing advice.";

  return createPageMetadata({
    pathnameWithoutLang: "/contact",
    currentLang: locale,
    title,
    description,
    keywords: [
      "contact Aligoo",
      "digital marketing consultation",
      "strategy session",
      "Addis Ababa agency",
      "get in touch",
      "Aligoo Digital Agency",
      "Ethiopia",
    ],
  });
}

export const revalidate = 3600; // Rebuild every hour

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: "en" | "am" }>;
}) {
  const { lang } = await params; // ✅

  return (
    <>
      <HeroSection
        badgeText="Let’s Make Something Amazing Together 💬!" // Optional badge text
        headlineText1="Have a project in mind?  "
        headlineText2="We’d love"
        headlineText3="to hear from you."
        primaryButtonText="👉 Custom Strategy Session"
        primaryButtonUrl="/strategy-session"
        secondaryButtonText="💬 Quick Chat"
        secondaryButtonUrl="#quick-chat"
        subheading="Whether you're looking to grow your business, launch a new campaign, or just want to bounce around some ideas — we’re all ears. Drop us a line and let's explore how we can help you turn ambition into action."
      />
      <div className="section-deferred" id="quick-chat">
        <ContactSectionWrapper lang={lang} />
        <WhatHappensNextSection />
      </div>
    </>
  );
}
