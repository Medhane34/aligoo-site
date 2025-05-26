// components/sections/ServiceSection.tsx
"use client"; // This component needs to be client-side for interactivity (useState, useEffect, useRef)

import React from 'react'; // Removed useRef, useState, useEffect as they are no longer needed
import { motion } from 'framer-motion'; // Keep if you plan to use it for animations elsewhere
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { AccentText, SectionHeading } from '@/components/ui/typography';
// Removed classNames as pagination dots are gone

const ServiceSection = () => {
    const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const RightArrow = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
    );

    // Removed carouselRef, activeIndex, setActiveIndex, numItems state and effect
    // Removed scrollToSlide and useEffect for scroll handling

    return (
        
        <div className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <AccentText>Our Services</AccentText>
                    <SectionHeading>
                        How We Work
                    </SectionHeading>
                    </div>
                {/* Carousel Container - Now just a standard grid for all screen sizes */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 // Changed to grid-cols-1 on mobile, md:grid-cols-3 on desktop
                               // Removed overflow-x-scroll, overflow-x-hidden, scroll-smooth, snap-x, snap-mandatory, scrollbar-hidden
                               // Removed -mx-4, md:mx-0
                               pb-4                                     // Keep padding bottom for aesthetic spacing
                               mb-12                                    // Bottom margin for spacing below columns
                    "
                >
                    {/* Strategy Column with Accordions */}
                    <div className="
                                // Removed flex-none, w-full, md:w-auto, md:flex-1, p-4, md:p-0, scroll-snap-align-start
                                text-white outline-2 outline-offset-2 outline-blue-500 // Your existing outline
                               "
                    >
                        <h2 className="text-2xl font-semibold mb-4">Strategy</h2>
                        <p className="text-gray-400 mb-6">
                            We get to know your organisation and industry inside out,
                            putting ourselves in your shoes so we can give you smart
                            recommendations with a solid reason behind them.
                        </p>
                        <Accordion showDivider={false}>
                            <AccordionItem
                                key="1"
                                aria-label="Brand Development"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="primary"
                                        radius="lg"
                                        src="/icons/strategy-brand.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Brand Development
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/brand-development"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} A detailed explanation of brand development, including market research and identity creation.
                            </AccordionItem>
                            <AccordionItem
                                key="2"
                                aria-label="Digital Marketing"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="success"
                                        radius="lg"
                                        src="/icons/strategy-marketing.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Digital Marketing
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/digital-marketing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Covering SEO, social media, and content marketing strategies for online visibility.
                            </AccordionItem>
                            <AccordionItem
                                key="3"
                                aria-label="Content Strategy"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="warning"
                                        radius="lg"
                                        src="/icons/strategy-content.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Content Strategy
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/content-strategy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Planning and creation of engaging content tailored to your audience.
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Design Column with Accordions */}
                    <div className="
                                // Removed flex-none, w-full, md:w-auto, md:flex-1, p-4, md:p-0, scroll-snap-align-start
                                text-white
                               "
                    >
                        <h2 className="text-2xl font-semibold mb-4">Design</h2>
                        <p className="text-gray-400 mb-6">
                            Great design should look great, work seamlessly, and
                            communicate clearly. Every element of your brand should
                            feel connected, with thoughtful, lasting choices.
                        </p>
                         <Accordion showDivider={false}>
                            <AccordionItem
                                key="4"
                                aria-label="Sustainable Web Design"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="primary"
                                        radius="lg"
                                        src="/icons/design-web.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Sustainable Web Design
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/sustainable-web-design"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Crafting beautiful and efficient websites with a focus on longevity and eco-friendliness.
                            </AccordionItem>
                            <AccordionItem
                                key="5"
                                aria-label="UX/UI Design"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="success"
                                        radius="lg"
                                        src="/icons/design-uxui.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        UX/UI Design
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/ux-ui-design"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Creating intuitive and engaging user experiences with visually appealing interfaces.
                            </AccordionItem>
                             <AccordionItem
                                key="6"
                                aria-label="Copywriting"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="warning"
                                        radius="lg"
                                        src="/icons/design-copywriting.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Copywriting
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/copywriting"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Crafting persuasive and clear content that resonates with your target audience and drives action.
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Execution Column with Accordions */}
                    <div className="
                                // Removed flex-none, w-full, md:w-auto, md:flex-1, p-4, md:p-0, scroll-snap-align-start
                                text-white
                               "
                    >
                        <h2 className="text-2xl font-semibold mb-4">Execution</h2>
                        <p className="text-gray-400 mb-6">
                            A great website needs great design—just like a brand or
                            strategy needs smart, sustainable, and SEO-focused
                            execution to create a lasting impact and drive real
                            results.
                        </p>
                        <Accordion showDivider={false}>
                            <AccordionItem
                                key="7"
                                aria-label="Sustainable Web Development"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="primary"
                                        radius="lg"
                                        src="/icons/execution-development.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Sustainable Web Development
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/sustainable-web-development"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Building robust and scalable web solutions with modern technologies and best practices.
                            </AccordionItem>
                            <AccordionItem
                                key="8"
                                aria-label="Search Engine Optimisation"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="success"
                                        radius="lg"
                                        src="/icons/execution-seo.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Search Engine Optimisation
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/seo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Implementing strategies to improve your website's visibility and ranking on search engines.
                            </AccordionItem>
                            <AccordionItem
                                key="9"
                                aria-label="Email Marketing"
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="warning"
                                        radius="lg"
                                        src="/icons/execution-email.svg"
                                    />
                                }
                                subtitle={
                                    <span className="text-gray-400 text-sm">
                                        press to read more
                                    </span>
                                }
                                title={
                                    <span className="hover:underline">
                                        Email Marketing
                                    </span>
                                }
                                indicator={
                                    <Link
                                        href="/services/email-marketing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-400 hover:text-pink-300 transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <RightArrow />
                                    </Link>
                                }
                            >
                                {defaultContent} Designing and executing effective email campaigns to engage your audience and drive conversions.
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Pagination Dots (Removed) */}
                {/* <div className="flex justify-center mt-8 md:hidden">
                    {Array.from({ length: numItems }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={classNames(
                                'w-2 h-2 rounded-full mx-1 transition-colors duration-300',
                                { 'bg-pink-500': index === activeIndex, 'bg-gray-600': index !== activeIndex }
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div> */}


            </div>
        </div>
    );
};

export default ServiceSection;