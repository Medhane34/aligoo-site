"use client";

import React from "react";
import CardMolecule from "@/components/molecules/CardMolecule";
import { Button } from "@heroui/button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface PromotionalCardProps {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export default function PromotionalCard({
    heading,
    description,
    buttonText,
    buttonLink,
}: PromotionalCardProps) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 200], [0, 50]);

    if (!heading || !description) return null;

    return (
        <motion.div style={{ y }} className="sticky top-32 w-full">
            <CardMolecule variant="spotlight" padding="lg" className="w-full">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white leading-tight">
                        {heading}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {description}
                    </p>
                    {buttonText && buttonLink && (
                        <Button
                            as={Link}
                            href={buttonLink}
                            className="w-full mt-2 font-semibold bg-[#FF595E] text-white"
                            variant="solid"
                        >
                            {buttonText}
                        </Button>
                    )}
                </div>
            </CardMolecule>
        </motion.div>
    );
}
