"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle, Check } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const selectTriggerStyles = tv({
  base: "w-full relative bg-white/5 border border-white/10 text-left text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all cursor-pointer flex items-center justify-between",
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    },
    hasError: {
      true: "border-red-500 bg-red-500/5 hover:bg-red-500/10",
      false: "hover:bg-white/10 hover:border-white/20",
    },
    isOpen: {
      true: "ring-2 ring-brand-primary/50 border-brand-primary/50 bg-white/10",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    hasError: false,
    isOpen: false,
  },
});

interface SelectOption {
  value: string;
  label: string | ReactNode;
  displayLabel?: string | ReactNode; // Used for selected view
}

interface SelectAtomProps extends VariantProps<typeof selectTriggerStyles> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | string[]; // Support single or multi (single implemented effectively)
  onChange?: (value: string) => void;
  error?: string;
  startContent?: ReactNode;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export default function SelectAtom({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  error,
  size,
  className,
  containerClassName,
  startContent,
  disabled = false,
}: SelectAtomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const isError = !!error;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-1.5 w-full relative ${containerClassName || ""}`}
    >
      {label && (
        <label className="text-sm font-medium text-white/80 ml-1">
          {label}
        </label>
      )}

      <button
        className={selectTriggerStyles({
          size,
          hasError: isError,
          isOpen,
          className: `${className} ${startContent ? "pl-2" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
        })}
        disabled={disabled}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 truncate pr-6">
          {startContent}
          {selectedOption ? (
            <span className="truncate block">
              {selectedOption.displayLabel || selectedOption.label}
            </span>
          ) : (
            <span className="text-white/30 truncate">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-[105%] left-0 w-full z-50 p-1 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-0.5">
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    className={`
                                            flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-left
                                            ${
                                              isSelected
                                                ? "bg-brand-primary/10 text-brand-primary"
                                                : "text-white/80 hover:bg-white/10 hover:text-white"
                                            }
                                        `}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className="truncate flex-1">{option.label}</span>
                    {isSelected && (
                      <Check
                        className="text-brand-primary flex-shrink-0"
                        size={14}
                      />
                    )}
                  </button>
                );
              })}
              {options.length === 0 && (
                <div className="px-3 py-2.5 text-sm text-white/30 text-center">
                  No options
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-red-400 text-xs ml-1 absolute -bottom-6 left-0"
            exit={{ opacity: 0, y: -5 }}
            initial={{ opacity: 0, y: -5 }}
          >
            <AlertCircle size={12} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
