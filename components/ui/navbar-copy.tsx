"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import ThemeSwitch from "../theme-switch";
import { ChevronDownIcon } from "lucide-react";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (elementId: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 120 // Account for sticky header height + margin
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
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
            <NextLink className="flex items-center gap-1" href="/">
              <p className="font-bold text-inherit">Aligoo</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
        >
          <NavbarItem>
            <Link
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium text-red-500 dark:text-text-dark"
              href="/"
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
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium flex items-center gap-1 transition-colors text-red-500 dark:text-text-dark hover:text-primary"
            >
              Services
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isServicesMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {isServicesMenuOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 origin-top-right rounded-xl bg-gray-100 dark:bg-neutral-900 backdrop-blur-md border border-border/50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-2">
                  <Link href="/en/servicesfacebook-ad" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Facebook Ad
                  </Link>
                  <Link href="/en/services/web-design" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Web Design
                  </Link>
                  <Link href="/en/services/tiktok-ad" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    TikTok Ads
                  </Link>
                  <Link href="/en/services/digital-marketing" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Digital Marketing Strategy
                  </Link>
                  <Link href="/en/services/seo" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    SEO
                  </Link>
                  <Link href="/services/content-marketing" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Content Marketing
                  </Link>
                  <Link href="/services/funnel-mapping" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Funnel Mapping
                  </Link>
                  <Link href="/services/graphic-design" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-2">
                    Graphic Design
                  </Link>
                </div>
              </div>
            )}
          </div>
          <NavbarItem>
            <Link
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium text-red-500 dark:text-text-dark"
              href="/en/works"
            >
              Our work
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium text-red-500 dark:text-text-dark"
              href="/about"
            >
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium text-red-500 dark:text-text-dark"
              href="/en/contact"
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex" justify="end">
          {/* #region CTA */}
         {/*  <div className="flex gap-1">
            <Link
              className={`px-3 py-1 rounded-l ${pathname.startsWith("/en") ? "bg-brand-primary text-white" : "bg-gray-200"}`}
              href={`/en${pathWithoutLang === "" ? "/" : pathWithoutLang}`}
            >
              EN
            </Link>
            <Link
              className={`px-3 py-1 rounded-r ${pathname.startsWith("/am") ? "bg-brand-primary text-white" : "bg-gray-200"}`}
              href={`/am${pathWithoutLang === "" ? "/" : pathWithoutLang}`}
            >
              አማ
            </Link>
          </div> */}
          {/* #endregion */}

          <ThemeSwitch />
        </NavbarContent>
       </HeroUINavbar>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-4 z-[9999] left-4 right-4 mx-auto flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <ThemeSwitch />
        <Link className="flex items-center justify-center gap-2" href="/">
          Aligoo 
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars4Icon className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col gap-2 text-red-500">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors py-2">Home</Link>              
              <div className="h-px bg-border/50" />
              
              {/* Mobile Services Accordion */}
              <div>
                <button onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} className="w-full flex justify-between items-center text-lg font-medium hover:text-primary transition-colors py-2">
                  <span>Services</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="flex flex-col pl-4 mt-2 gap-2 border-l border-border">
                    <Link href="/en/servicesfacebook-ad" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Facebook Ad</Link>
                    <Link href="/en/services/web-design" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Web Design</Link>
                    <Link href="/en/services/tiktok-ad" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">TikTok Ads</Link>
                    <Link href="/en/services/digital-marketing" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Digital Marketing Strategy</Link>
                    <Link href="/en/services/seo" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">SEO</Link>
                    <Link href="/services/content-marketing" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Content Marketing</Link>
                    <Link href="/services/funnel-mapping" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Funnel Mapping</Link>
                    <Link href="/services/graphic-design" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors py-1">Graphic Design</Link>
                  </div>
                )}
              </div>
              <div className="h-px bg-border/50" />

              <Link href="/en/works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors py-2">Our work</Link>
              <div className="h-px bg-border/50" />
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors py-2">About Us</Link>
              <div className="h-px bg-border/50" />
              <Link href="/en/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors py-2">Contact Us</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
