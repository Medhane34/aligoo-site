// components/Footer.tsx
"use client";
import React, { useCallback } from "react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./icons";
import { usePathname } from "next/navigation";

import ButtonAtom from "./atoms/ButtonAtom";
import LanguageSwitcher from "./LanguageSwitcher";
import { trackEvent } from "@/lib/analytics";

const contacts = [
  /* {
    label: "Email",
    value: "info@aligoo-digital.agency",
    href: "mailto:info@aligoo-digital.agency",
  }, */
  {
    label: "Phone",
    value: "(+251)910 58 47 12",
    href: "(+251)910 58 47 12",
  },
  {
    label: "Address",
    value: "Addis Ababa, Ethiopia",
    href: undefined,
  },
];

const socialLinks = [
  {
    icon: <FacebookIcon className="w-5 h-5" />,
    href: "https://www.facebook.com/aligoodigitalagency/",
    label: "Facebook",
  },
  {
    icon: <XIcon className="w-5 h-5" />,
    href: "https://x.com/HannibalTi24966",
    label: "Twitter",
  },
  {
    icon: <YoutubeIcon className="w-5 h-5" />,
    href: "https://www.youtube.com/@aligoodigital",
    label: "YouTube",
  },
  {
    icon: <LinkedinIcon className="w-5 h-5" />,
    href: "https://et.linkedin.com/company/aligoo",
    label: "LinkedIn",
  },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/am") ? "am" : "en";

  const handleTelegramClick = useCallback(() => {
    trackEvent("telegram_signup_click", {
      event_category: "signup",
      event_label: "footer_telegram_join",
      source: "footer",
      language: lang,
      button_text: "Get Exclusive Insights",
      link_url: "https://t.me/AligooClientBot?start=web",
    });
  }, [lang]);

  const services = [
    {
      label: "Facebook & Instagram Ads",
      href: `/${lang}/services/facebook-ad`,
    },
    { label: "Web Design & Development", href: `/${lang}/services/web-design` },
    {
      label: "Digital Marketing (all-in-one)",
      href: `/${lang}/services/digital-marketing`,
    },
    { label: "Content Marketing", href: `/${lang}/services/content-marketing` },
    {
      label: "Search Engine Optimization (SEO)",
      href: `/${lang}/services/seo`,
    },
    { label: "TikTok Ads", href: `/${lang}/services/tiktok-ad` },
    { label: "Graphic Design", href: `/${lang}/services/graphic-design` },
    { label: "Funnel Mapping", href: `/${lang}/services/funnel-mapping` },
  ];

  return (
    <footer className="bg-background-dark pt-12 pb-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand/About */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            ALIGOO DIGITAL MARKETING AGENCY
          </h1>
          <p className="text-sm bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base">
            Based in Addis Ababa, we help forward-thinking brands break through
            the noise with clarity, creativity, and measurable results. Elevate
            your online presence with our innovative digital solutions.
          </p>

          {/* Language Switcher */}
          <div className="pt-2 justify-start">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Services</h3>
          <ul className="space-y-2 bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base">
            {services.map((service) => (
              <li key={service.label}>
                <a
                  className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                  href={service.href}
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Contact</h3>
          <ul className="space-y-2 mb-6 bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base">
            {contacts.map((c) =>
              c.href ? (
                <li key={c.label}>
                  <a
                    className="text-sm hover:text-red-400 transition-colors"
                    href={c.href}
                  >
                    {c.value}
                  </a>
                </li>
              ) : (
                <li key={c.label}>
                  <span className="text-sm">{c.value}</span>
                </li>
              ),
            )}
          </ul>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                className="hover:text-red-400  transition-colors"
                href={s.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* CTA: Join Telegram */}
        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base">
            Get the latest marketing tips and agency news. Join our Telegram
            bot!
          </p>
          <a
            href="https://t.me/AligooClientBot?start=web"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            target="_blank"
          >
            <ButtonAtom shimmer> Get Exclusive Insights </ButtonAtom>
          </a>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        Copyright © {new Date().getFullYear()} Aligoo - Digital Marketing Agency. All
        rights reserved.
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <a
            className="hover:text-red-400 transition-colors"
            href={`/${lang}/terms`}
          >
            Terms of Service
          </a>
          <a
            className="hover:text-red-400 transition-colors"
            href={`/${lang}/privacy`}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
