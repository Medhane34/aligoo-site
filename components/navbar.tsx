"use client";
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
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@heroui/dropdown";
import { Logo, SearchIcon } from "./icons";
import { Accordion, AccordionItem } from "@heroui/accordion";


// components/Navbar.tsx


export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="relative">
      <div className="glow-background z-3"></div>
      <HeroUINavbar maxWidth="xl" position="sticky" className="bg-white/0">

        {/* Mobile Navbar Content (Visible on small screens) */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle /> {/* Hamburger icon */}
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">Aligoo</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>


        {/* Desktop Navbar Content */}
        <NavbarContent className="hidden sm:flex" justify="start"> {/* Aligned to start for logo */}
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">Aligoo</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 text-text-light" justify="center"> {/* Aligned to center for menu items */}
          <NavbarItem>
            <Link
              href="/"
              color="foreground"
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
            >
              Home
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem> {/* No longer need 'hidden sm:flex' here as it's in the parent NavbarContent */}
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-foreground"
                  variant="light"
                >
                  Services
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="Service Actions">
              <DropdownItem key="Facebook Ad" href="/services/facebook-ad">
                Facebook Ad
              </DropdownItem>
              <DropdownItem key="Web Design" href="/about">
                Web Design
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link
              href="/works"
              color="foreground"
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
            >
              Our work
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/about"
              color="foreground"
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
            >
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/contact" 
              color="foreground"
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end"> {/* Aligned to end for ThemeSwitch */}
          <ThemeSwitch />
        </NavbarContent>



        <NavbarMenu>
             {/* Search input {searchInput} */}
          <div className="mx-4 mt-2 flex flex-col gap-2"> {/* This div applies mx-4 */}
            <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
              <Link href="/" className="w-full text-xl font-medium text-red-400 text-left py-2">Home</Link> {/* Apply w-full, text-left, and explicit vertical padding */}
            </NavbarMenuItem>
            <Accordion className="w-full" variant="light">
              <AccordionItem
                aria-label="Services"
                title={
                    <span className="text-xl font-medium text-red-400">Services</span>
                }
                classNames={{
                  trigger: "py-2 px-0", // Adjust padding for the trigger to match links
                  title: "text-left", // Ensure the title text itself is left-aligned
                  content: "pl-0 pr-0", // Ensure no extra padding on content wrapper
                }}
              >
                {/* Ensure sub-links also have consistent styling */}
                <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
                  <Link href="/services/facebook-ad" className="w-full text-xl font-medium text-red-400 text-left pl-4 py-2">Facebook Ad</Link> {/* Add explicit left padding for sub-items */}
                </NavbarMenuItem>
                <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
                  <Link href="/about" className="w-full text-xl font-medium text-red-400 text-left pl-4 py-2">Web Design</Link> {/* Add explicit left padding for sub-items */}
                </NavbarMenuItem>
              </AccordionItem>
            </Accordion>
            <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
              <Link href="/works" className="w-full text-xl font-medium text-red-400 text-left py-2">Our Work</Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
              <Link href="/about" className="w-full text-xl font-medium text-red-400 text-left py-2">About Us</Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="p-0"> {/* Remove default padding from NavbarMenuItem */}
              <Link href="/contact" className="w-full text-xl font-medium text-red-400 text-left py-2">Contact Us</Link>
            </NavbarMenuItem>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};