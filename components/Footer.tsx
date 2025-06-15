// components/Footer.tsx
"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const services = [
  { label: "Facebook & Instagram Ads", href: "/services/facebook-ad" },
  { label: "Web Design & Development", href: "/services/web-design" },
  {
    label: "Digital Marketing (all-in-one)",
    href: "/services/digital-marketing",
  },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Search Engine Optimization (SEO)", href: "/services/seo" },
  { label: "TikTok Ads", href: "/services/tiktok-ad" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "Funnel Mapping", href: "/services/funnel-mapping" },
];

const contacts = [
  {
    label: "Email",
    value: "info@aligoo-digital.agency",
    href: "mailto:info@aligoo-digital.agency",
  },
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
    icon: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/aligoodigitalagency/",
    label: "Facebook",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com",
    label: "Instagram",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <Youtube className="w-5 h-5" />,
    href: "https://www.youtube.com",
    label: "YouTube",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://et.linkedin.com/company/aligoo",
    label: "LinkedIn",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark text-gray-400 pt-12 pb-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand/About */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">
            ALIGOO DIGITAL AGENCY
          </h1>
          <p className="text-sm">
            Based in Addis Ababa, we help forward-thinking brands break through
            the noise with clarity, creativity, and measurable results. Elevate
            your online presence with our innovative digital solutions.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.label}>
                <a
                  href={service.href}
                  className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 mb-6">
            {contacts.map((c) =>
              c.href ? (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-sm hover:text-red-400 transition-colors"
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
                href={s.href}
                aria-label={s.label}
                className="hover:text-red-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* CTA: Join Telegram */}
        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-4">
            Get the latest marketing tips and agency news. Join our Telegram
            bot!
          </p>
          <Button
            as="a"
            href="https://t.me/aligoo_leads_bot?start=start" // Replace with your actual Telegram bot link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Join our Telegram Bot
          </Button>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        Copyright © {new Date().getFullYear()} Aligoo Digital Agency. All
        rights reserved.
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <a href="/terms" className="hover:text-red-400 transition-colors">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-red-400 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
