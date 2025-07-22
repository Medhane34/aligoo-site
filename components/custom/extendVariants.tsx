import { extendVariants, Button } from "@heroui/react";

export const MyButton = extendVariants(Button, {
  variants: {
    color: {
      gradient:
        "h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-linear-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full",
    },
    // You can add more custom variants here if needed
  },
  defaultVariants: {
    color: "gradient", // Set your custom variant as default if you want
  },
});

export const MyOutlineButton = extendVariants(Button, {
  variants: {
    color: {
      gradient:
        "h-10 w-[163px] border-2 dark:border-white border-brand-primary-light px-[16px] py-[10px] text-text-light dark:text-text-dark font-medium leading-5 rounded-full",
    },
    radius: {
      full: "rounded-full",
    },
    variant: {
    bordered: "bordered", // Corrected typo
    }
    // You can add more custom variants here if needed
  },
  defaultVariants: {
    color: "gradient", // Set your custom variant as default if you want
  },
});


