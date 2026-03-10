import { Variants } from "framer-motion";

export const ButtonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
};
