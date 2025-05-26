
import React from 'react';
import {Button, ButtonGroup} from "@heroui/button";

const Footer = () => {
    const cn = (...args: any[]) => {
    return args.filter(Boolean).join(' ');
};
    return (
        <footer
            className={cn(
                "bg-gray-950 text-gray-400 py-12 md:py-16",
                "border-t border-gray-800"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-20">
                    {/* Company Info Section */}
                    <div className="space-y-6">
                        <h1
                            className={cn(
                                "text-2xl font-bold text-white",
                                "bg-gradient-to-r from-purple-500 to-blue-500 inline-block",
                                "bg-clip-text text-transparent"
                            )}
                        >
                            ALIGOO DIGITAL AGENCY
                        </h1>
                        <p className="text-sm">
                            Transforming Ideas into Digital Excellence. Elevate your
                            online presence with our innovative solutions and
                            strategic digital services.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">

                                <a
                                    href="mailto:info@aligoodigitalagency.com"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    info@aligoodigitalagency.com
                                </a>
                            </div>
                            <div className="flex items-start gap-2">

                                <a
                                    href="tel:(888) 234-5100"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    (888) 234-5100
                                </a>
                            </div>
                            <div className="flex items-start gap-2">

                                <span className="text-sm">
                                    1535 West Loop S. Ste 450, Houston, TX, 77027
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com"
                                className="hover:text-blue-400 transition-colors"
                                aria-label="Facebook"
                            >

                            </a>
                            <a
                                href="https://www.instagram.com"
                                className="hover:text-blue-400 transition-colors"
                                aria-label="Instagram"
                            >

                            </a>
                            <a
                                href="https://twitter.com"
                                className="hover:text-blue-400 transition-colors"
                                aria-label="Twitter"
                            >

                            </a>
                            <a
                                href="https://www.youtube.com"
                                className="hover:text-blue-400 transition-colors"
                                aria-label="YouTube"
                            >

                            </a>
                            <a
                                href="https://www.linkedin.com"
                                className="hover:text-blue-400 transition-colors"
                                aria-label="LinkedIn"
                            >

                            </a>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Search Engine Optimization (SEO)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Pay-Per-Click Advertising (PPC)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Social Media Marketing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Content Marketing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Email Marketing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Web Design & Development
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Conversion Rate Optimization (CRO)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Analytics & Reporting
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Industries Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            Industries
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    B2B
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Manufacturers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Fintech
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Law
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Real Estate
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Construction
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://example.com/"
                                    className="hover:text-blue-400 transition-colors text-sm"
                                >
                                    Technology
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources and Locations Section */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Resources
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            eBooks & Whitepapers
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            Case Studies
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            Audit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Locations
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="https://example.com/"
                                            className="hover:text-blue-400 transition-colors text-sm"
                                        >
                                            Houston
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button
                                variant="light"
                                className="text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-300"
                            >
                                READ OUR REVIEWS AT DESIGNRUSH.COM
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    Copyright © {new Date().getFullYear()} Aligoo Digital Agency.
                    All rights reserved.
                    <div className="mt-4 flex justify-center gap-6">
                        <a
                            href="https://example.com/"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="https://example.com/"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
