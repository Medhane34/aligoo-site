// components/Navbar.tsx
"use client";
import React, { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@heroui/dropdown";
import { Logo } from "./icons";
import { Accordion, AccordionItem } from "@heroui/accordion";

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="currentColor"
    className="inline-block ml-1 w-4 h-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.846a.75.75 0 01-1.02 0l-4.25-3.846a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <div className="relative">
      <HeroUINavbar
        maxWidth="xl"
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background-light dark:bg-background-dark shadow"
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
      >
        {/* Mobile Navbar Content */}
        <NavbarContent className="sm:hidden relative w-full flex items-center justify-between px-2">
          <div className="flex-1 flex items-center">
            <NavbarMenuToggle
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink className="flex items-center gap-1" href="/">
                <p className="font-bold text-inherit">Aligoo</p>
              </NextLink>
            </NavbarBrand>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeSwitch />
          </div>
        </NavbarContent>

        {/* Desktop Navbar Content */}
        <NavbarContent className="hidden sm:flex" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex items-center gap-1" href="/">

              <p className="font-bold text-inherit">Aligoo</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 text-red-500 dark:text-text-dark" justify="center">
          <NavbarItem>
            <Link
              href="/"

              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium"
            >
              Home
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-red-500 text-base font-medium flex items-center"
                  variant="light"
                >
                  Services <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="Service Actions" >
              <DropdownItem key="Facebook Ad" href="/services/facebook-ad">
                Facebook Ad
              </DropdownItem>
              <DropdownItem key="Web Design" href="/services/web-design">
                Web Design
              </DropdownItem>
              <DropdownItem key="TikTok Ads" href="/services/tiktok-ad">
                TikTok Ads
              </DropdownItem>
              <DropdownItem key="Digital Marketing Strategy" href="/services/digital-marketing">
                Digital Marketing Strategy 
              </DropdownItem>
              <DropdownItem key="SEO" href="/services/seo">
                SEO
              </DropdownItem>
              <DropdownItem key="Content Marketing" href="/services/content-marketing">
                Content Marketing  
              </DropdownItem>
              <DropdownItem key="Funnel Mapping" href="/services/funnel-mapping">
                Funnel Mapping 
              </DropdownItem>
              <DropdownItem key="Graphic Design" href="/services/graphic-design">
                Graphic Design  
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link
              href="/works"
               
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium"
            >
              Our work
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/about"
               
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium"
            >
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/contact"
               
              className="data-[active=true]:text-primary data-[active=true]:font-medium text-base font-medium"
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <NavbarMenuItem className="p-0">
              <Link
                href="/"
                className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left py-2"
                onClick={handleMenuClose}
              >
                Home
              </Link>
            </NavbarMenuItem>
            <Accordion
              className="w-full"
              variant="light"
            >
              <AccordionItem
                aria-label="Services"
                title={
                  <span className="flex items-center text-xl font-medium text-red-500 dark:text-text-dark text-left w-full">
                    Services <ChevronDownIcon className="ml-1" />
                  </span>
                }
                classNames={{
                  trigger: "py-2 px-0 w-full text-left",
                  title: "text-left w-full block",
                  content: "pl-0 pr-0",
                }}
              >
                <NavbarMenuItem className="p-0">
                  <Link
                    href="/services/facebook-ad"
                    className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left pl-4 py-2"
                    onClick={handleMenuClose}
                  >
                    Facebook Ad
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="p-0">
                  <Link
                    href="/services/web-design"
                    className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left pl-4 py-2"
                    onClick={handleMenuClose}
                  >
                    Web Design
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="p-0">
                  <Link
                    href="/services/tiktok-ad"
                    className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left pl-4 py-2"
                    onClick={handleMenuClose}
                  >
                    TikTok Ads
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="p-0">
                  <Link
                    href="/services/seo"
                    className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left pl-4 py-2"
                    onClick={handleMenuClose}
                  >
                    SEO
                  </Link>
                </NavbarMenuItem>
              </AccordionItem>
            </Accordion>
            <NavbarMenuItem className="p-0">
              <Link
                href="/works"
                className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left py-2"
                onClick={handleMenuClose}
              >
                Our Work
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="p-0">
              <Link
                href="/about"
                className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left py-2"
                onClick={handleMenuClose}
              >
                About Us
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="p-0">
              <Link
                href="/contact"
                className="w-full text-xl font-medium text-red-500 dark:text-text-dark text-left py-2"
                onClick={handleMenuClose}
              >
                Contact Us
              </Link>
            </NavbarMenuItem>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};

export default Navbar;
