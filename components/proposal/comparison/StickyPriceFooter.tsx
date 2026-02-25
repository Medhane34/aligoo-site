// components/proposal/comparison/StickyPriceFooter.tsx
"use client";

import type { Discount } from "@/types/ProposalType";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState, useEffect } from "react";

import { calculateDiscount } from "@/utils/discount";

interface StickyPriceFooterProps {
  totalPrice: number;
  selectedPackageName: string;
  selectedPackagePrice: number;
  selectedAddOnsCount: number;
  uniqueCode: string;
  isPackageSelected: boolean;
  onProceed: () => Promise<void>;
  isProcessing?: boolean;
  selectedAddOns?: Array<{ name: string; price: number }>;
  pricingTableRef?: React.RefObject<HTMLDivElement>;
  discount?: Discount;
}

export default function StickyPriceFooter({
  totalPrice,
  selectedPackageName,
  selectedPackagePrice,
  selectedAddOnsCount,
  uniqueCode,
  isPackageSelected,
  onProceed,
  isProcessing = false,
  selectedAddOns = [],
  pricingTableRef,
  discount,
}: StickyPriceFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [prevPrice, setPrevPrice] = useState(totalPrice);

  const formatPrice = (price: number) => `ETB ${price.toLocaleString("en-US")}`;

  // Calculate discount if applicable
  const subtotal =
    selectedPackagePrice +
    selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const discountResult = calculateDiscount(subtotal, discount);

  // Smart visibility: Show only when scrolled past pricing table
  useEffect(() => {
    if (!isPackageSelected) {
      setIsVisible(false);

      return;
    }

    const handleScroll = () => {
      if (pricingTableRef?.current) {
        const tableBottom =
          pricingTableRef.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Show footer when pricing table is scrolled past
        setIsVisible(tableBottom < windowHeight * 0.5);
      } else {
        // Fallback: show after scrolling 800px
        setIsVisible(window.scrollY > 800);
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPackageSelected, pricingTableRef]);

  // Pulse animation on price change
  useEffect(() => {
    if (totalPrice !== prevPrice) {
      setPrevPrice(totalPrice);
    }
  }, [totalPrice, prevPrice]);

  const handleClick = async () => {
    await onProceed();
  };

  if (!isPackageSelected) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Glassmorphic Container */}
          <div className="relative bg-gradient-to-r from-neutral-900/95 via-neutral-950/95 to-neutral-900/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_-10px_rgba(255,89,94,0.3)]">
            {/* Collapse Button */}
            <button
              className="absolute -top-10 right-4 w-10 h-10 rounded-t-xl bg-gradient-to-r from-[#FF595E] to-orange-500 flex items-center justify-center text-white hover:brightness-110 transition-all shadow-lg"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-12 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      {/* Price Section */}
                      <div className="text-center md:text-left relative">
                        <p className="text-sm md:text-base text-white/70 mb-1">
                          💰 Your Total Investment
                        </p>
                        <motion.div
                          key={totalPrice}
                          animate={{ scale: 1 }}
                          className="relative"
                          initial={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF595E] to-orange-500">
                            {formatPrice(totalPrice)}
                          </p>

                          {/* Pulse effect on price change */}
                          {totalPrice !== prevPrice && (
                            <motion.div
                              animate={{ scale: 2, opacity: 0 }}
                              className="absolute inset-0 bg-gradient-to-r from-[#FF595E]/30 to-orange-500/30 rounded-full blur-xl"
                              initial={{ scale: 1, opacity: 0.5 }}
                              transition={{ duration: 0.6 }}
                            />
                          )}
                        </motion.div>

                        {/* Package Info with Breakdown Toggle */}
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm md:text-base text-white/60">
                            {selectedPackageName} Package
                            {selectedAddOnsCount > 0 &&
                              ` + ${selectedAddOnsCount} Add-on${selectedAddOnsCount > 1 ? "s" : ""}`}
                          </p>
                          {selectedAddOnsCount > 0 && (
                            <button
                              className="text-xs text-[#FF595E] hover:text-orange-500 underline"
                              onClick={() => setShowBreakdown(!showBreakdown)}
                            >
                              {showBreakdown ? "Hide" : "Show"} breakdown
                            </button>
                          )}
                        </div>

                        {/* Breakdown Popover */}
                        <AnimatePresence>
                          {showBreakdown && (
                            <motion.div
                              animate={{ opacity: 1, scale: 1 }}
                              className="fixed bottom-24 left-4 md:left-auto md:right-auto p-4 rounded-xl bg-neutral-900 border border-white/20 shadow-2xl min-w-[280px] z-[60]"
                              exit={{ opacity: 0, scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0.95 }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-white font-bold">
                                  Price Breakdown
                                </h4>
                                <button
                                  className="text-white/60 hover:text-white"
                                  onClick={() => setShowBreakdown(false)}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/70">
                                    {selectedPackageName} Package
                                  </span>
                                  <span className="text-white font-medium">
                                    {formatPrice(selectedPackagePrice)}
                                  </span>
                                </div>

                                {selectedAddOns.map((addon, i) => (
                                  <div
                                    key={i}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-white/70">
                                      {addon.name}
                                    </span>
                                    <span className="text-white font-medium">
                                      {formatPrice(addon.price)}
                                    </span>
                                  </div>
                                ))}

                                {/* Discount Line Item */}
                                {discountResult.hasDiscount && (
                                  <>
                                    <div className="border-t border-white/10 pt-2 mt-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-white/70">
                                          Subtotal
                                        </span>
                                        <span className="text-white font-medium">
                                          {formatPrice(subtotal)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-green-400 font-medium">
                                        Discount ({discountResult.percentage}%)
                                      </span>
                                      <span className="text-green-400 font-medium">
                                        -{formatPrice(discountResult.amount)}
                                      </span>
                                    </div>
                                  </>
                                )}

                                <div className="border-t border-white/10 pt-2 mt-2">
                                  <div className="flex justify-between font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-[#FF595E]">
                                      {formatPrice(totalPrice)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full md:w-auto bg-gradient-to-r from-[#FF595E] to-orange-500 hover:brightness-110 text-white font-black text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-[#FF595E]/30 transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                        disabled={isProcessing}
                        onClick={handleClick}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            Proceed to Contract
                            <ArrowRight className="w-6 h-6" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed State */}
            {isCollapsed && (
              <motion.div
                animate={{ opacity: 1 }}
                className="py-3 px-4 flex items-center justify-between"
                initial={{ opacity: 0 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-white/70 text-sm">Total:</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF595E] to-orange-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  className="bg-gradient-to-r from-[#FF595E] to-orange-500 hover:brightness-110 text-white font-bold text-sm px-6 py-2 rounded-full transition-all disabled:opacity-50"
                  disabled={isProcessing}
                  onClick={handleClick}
                >
                  {isProcessing ? "Saving..." : "Proceed"}
                </button>
              </motion.div>
            )}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF595E]/5 to-orange-500/5 -z-10 blur-2xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
