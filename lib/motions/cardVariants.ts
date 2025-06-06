import { Variants } from "framer-motion";

// motion/variants/cardVariants.ts
export const cardVariantsTilt: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    rotateX: -5,
    rotateY: 5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
}
