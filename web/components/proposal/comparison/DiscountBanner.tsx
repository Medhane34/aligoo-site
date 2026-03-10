"use client";

import type { Discount } from "@/types/ProposalType";

import { motion } from "framer-motion";
import { Tag, CheckCircle, Clock } from "lucide-react";

import { calculateDiscount } from "@/utils/discount";

interface DiscountBannerProps {
  discount: Discount;
  totalPrice: number;
  daysLeftText?: string;
}

export default function DiscountBanner({
  discount,
  totalPrice,
  daysLeftText = "14 days",
}: DiscountBannerProps) {
  const discountResult = calculateDiscount(totalPrice, discount);

  if (!discountResult.hasDiscount) return null;

  // Determine urgency level based on days remaining
  const daysRemaining = parseInt(daysLeftText) || 14;
  const urgencyLevel =
    daysRemaining < 3 ? "high" : daysRemaining < 7 ? "medium" : "low";

  const urgencyColors = {
    high: "from-red-500 to-orange-500",
    medium: "from-orange-500 to-yellow-500",
    low: "from-[#FF595E] to-orange-500",
  };

  const pulseSpeed = {
    high: 1.5,
    medium: 2,
    low: 3,
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Main Banner */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-neutral-900/80 via-neutral-950/80 to-neutral-900/80 backdrop-blur-xl border border-white/10 overflow-hidden">
        {/* Animated Glow Effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          className={`absolute inset-0 bg-gradient-to-r ${urgencyColors[urgencyLevel]} opacity-10 blur-2xl`}
          transition={{
            duration: pulseSpeed[urgencyLevel],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gradient Border Glow */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${urgencyColors[urgencyLevel]} opacity-20 blur-sm`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Badge Column */}
            <div className="flex flex-col items-center md:items-start justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r ${urgencyColors[urgencyLevel]} shadow-lg`}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-4xl md:text-5xl font-black text-white">
                  {discountResult.percentage}%
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white">
                  OFF
                </span>
              </motion.div>
            </div>

            {/* Savings Column */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-sm text-white/70 uppercase tracking-wide">
                  You're Saving
                </span>
              </div>
              <motion.p
                animate={{ scale: 1 }}
                className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"
                initial={{ scale: 0.9 }}
              >
                ETB {discountResult.amount.toLocaleString()}
              </motion.p>
              <p className="text-sm text-white/60 mt-1">today!</p>
            </div>

            {/* Reason Column */}
            {discountResult.reason && (
              <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-white/70 uppercase tracking-wide">
                    Special Offer
                  </span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  {discountResult.reason}
                </p>
              </div>
            )}
          </div>

          {/* Urgency Message */}
          <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/10">
            <Clock className="w-5 h-5 text-orange-400" />
            <p className="text-base md:text-lg text-white/80">
              This discount expires in{" "}
              <span
                className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${urgencyColors[urgencyLevel]}`}
              >
                {daysLeftText}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
