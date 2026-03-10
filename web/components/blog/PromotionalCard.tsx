"use client";

import React from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import CardMolecule from "@/components/molecules/CardMolecule";

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
    <motion.div className="sticky top-32 w-full" style={{ y }}>
      <CardMolecule className="w-full" padding="lg" variant="spotlight">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white leading-tight">
            {heading}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
          {buttonText && buttonLink && (
            <Button
              as={Link}
              className="w-full mt-2 font-semibold bg-[#FF595E] text-white"
              href={buttonLink}
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
