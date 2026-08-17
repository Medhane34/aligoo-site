"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronDownIcon,
  FileText,
  Filter,
  Monitor,
  Paintbrush,
  PenTool,
  Search,
} from "lucide-react";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid";

import ThemeSwitch from "../theme-switch";
import { FacebookIcon, TikTokIcon } from "../icons";

type ServiceItem = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

type ServiceGroup = {
  title: string;
  description: string;
  items: ServiceItem[];
};

const serviceGroups: ServiceGroup[] = [
  {
    title: "Strategy",
    description:
      "We dive deep into your brand, audience, and market — so every move we make is backed by insight, not guesswork.",
    items: [
      {
        label: "Digital Marketing Strategy",
        href: "/services/digital-marketing",
        Icon: Monitor,
      },
      {
        label: "Content Strategy",
        href: "/services/content-marketing",
        Icon: FileText,
      },
      {
        label: "Funnel Mapping",
        href: "/services/funnel-mapping",
        Icon: Filter,
      },
    ],
  },
  {
    title: "Design",
    description:
      "We don't just make things look good — we design with purpose, personality, and performance in mind.",
    items: [
      {
        label: "Web Design",
        href: "/services/web-design",
        Icon: Paintbrush,
      },
      {
        label: "Graphic Design",
        href: "/services/graphic-design",
        Icon: PenTool,
      },
    ],
  },
  {
    title: "Execution",
    description:
      "This is where the magic happens. From ads to analytics, we bring your strategy to life — and keep optimizing for results.",
    items: [
      {
        label: "Facebook & Instagram Ads",
        href: "/services/facebook-ad",
        Icon: FacebookIcon,
      },
      {
        label: "TikTok Ads",
        href: "/services/tiktok-ad",
        Icon: TikTokIcon,
      },
      {
        label: "SEO",
        href: "/services/seo",
        Icon: Search,
      },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/am") ? "am" : "en";
  const reduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stagger the three columns in on open; disabled for reduced-motion users.
  const staggerContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
    },
  };
  const staggerColumn: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
          } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <HeroUINavbar>
          <NavbarContent className="hidden sm:flex" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink className="flex items-center gap-1" href={`/${lang}`}>
                <p className="font-bold text-inherit">Aligoo</p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link
                className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base"
                href={`/${lang}`}
              >
                Home
              </Link>
            </NavbarItem>
            {/* Services Dropdown */}
            <div
              className="relative pt-4 pb-4 -mt-4 -mb-4" // Add padding to bridge the gap
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <button
                ref={servicesButtonRef}
                aria-haspopup="true"
                aria-expanded={isServicesMenuOpen}
                onClick={() => setIsServicesMenuOpen((v) => !v)}
                className="flex items-center gap-1 transition-colors bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base"
              >
                Services
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isServicesMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -6, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-2 w-[min(1152px,calc(100vw-2rem))] -translate-x-1/2"
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setIsServicesMenuOpen(false);
                      }
                    }}
                    onKeyDown={(e: { key: string; }) => {
                      if (e.key === "Escape") {
                        setIsServicesMenuOpen(false);
                        servicesButtonRef.current?.focus();
                      }
                    }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
                      {/* Brand gradient hairline */}
                      <div className="mx-auto h-px w-[calc(100%-4rem)] bg-gradient-to-r from-transparent via-[#FF595E] to-transparent" />
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-10 px-10 py-8 md:grid-cols-3"
                      >
                        {serviceGroups.map((group, groupIndex) => (
                          <motion.div
                            key={group.title}
                            variants={staggerColumn}
                            className={groupIndex > 0 ? "md:border-l md:border-border/50 md:pl-10" : ""}
                          >
                            <h3 className="text-lg font-bold text-foreground">{group.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {group.description}
                            </p>
                            <ul className="mt-5 space-y-1">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                                    href={`/${lang}${item.href}`}
                                  >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-sm transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#FF595E] group-hover:to-orange-500 group-hover:text-white">
                                      <item.Icon className="h-5 w-5" />
                                    </span>
                                    <span className="flex-1 text-sm font-medium text-foreground">
                                      {item.label}
                                    </span>
                                    <ArrowRight className="h-4 w-4 shrink-0 text-[#FF595E] opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavbarItem>
              <Link
                className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base"
                href={`/${lang}/works`}
              >
                Our work
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base"
                href={`/${lang}/about`}
              >
                About Us
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base"
                href={`/${lang}/contact`}
              >
                Contact Us
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex" justify="end">
            <ThemeSwitch />
          </NavbarContent>
        </HeroUINavbar>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-4 z-[9999] left-4 right-4 mx-auto flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <ThemeSwitch />
        <Link className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-medium text-base" href="/">
          Aligoo
        </Link>

        <button
          aria-label="Toggle menu"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars4Icon className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col gap-2 text-red-500">
              <Link
                className="text-lg font-medium hover:text-primary transition-colors py-2"
                href={`/${lang}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="h-px bg-border/50" />

              {/* Mobile Services Accordion */}
              <div>
                <button
                  className="w-full flex justify-between items-center text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  <span>Services</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMobileServicesOpen && (
                  <div className="flex flex-col gap-4 pl-4 mt-2 border-l border-border">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          {group.title}
                        </p>
                        <div className="flex flex-col">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              className="text-base text-muted-foreground hover:text-primary transition-colors py-1"
                              href={`/${lang}${item.href}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-px bg-border/50" />

              <Link
                className="text-lg font-medium hover:text-primary transition-colors py-2"
                href={`/${lang}/works`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our work
              </Link>
              <div className="h-px bg-border/50" />
              <Link
                className="text-lg font-medium hover:text-primary transition-colors py-2"
                href={`/${lang}/about`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="h-px bg-border/50" />
              <Link
                className="text-lg font-medium hover:text-primary transition-colors py-2"
                href={`/${lang}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
