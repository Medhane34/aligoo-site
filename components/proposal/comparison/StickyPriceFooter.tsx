// components/proposal/comparison/StickyPriceFooter.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface StickyPriceFooterProps {
    totalPrice: number;
    selectedPackageName: string;
    selectedPackagePrice: number;
    selectedAddOnsCount: number;
    uniqueCode: string;
    isPackageSelected: boolean;
    onProceed: () => Promise<void>;
    isProcessing?: boolean;
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
}: StickyPriceFooterProps) {
    const formatPrice = (price: number) => `ETB ${price.toLocaleString('en-US')}`;

    const handleClick = async () => {
        await onProceed();
        // Navigation disabled for testing
        // router.push(`/proposal/${uniqueCode}/contract`);
    };

    if (!isPackageSelected) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 backdrop-blur-xl bg-black/40 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Price Section */}
                    <div className="text-center md:text-left">
                        <p className="text-sm md:text-base text-white/70 mb-1">
                            💰 Your Total Investment
                        </p>
                        <motion.p
                            key={totalPrice}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="text-4xl md:text-5xl font-black text-white"
                        >
                            {formatPrice(totalPrice)}
                        </motion.p>
                        <p className="text-sm md:text-base text-white/60 mt-1">
                            {selectedPackageName} Package
                            {selectedAddOnsCount > 0 && ` + ${selectedAddOnsCount} Add-on${selectedAddOnsCount > 1 ? 's' : ''}`}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleClick}
                        disabled={isProcessing}
                        className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white font-black text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
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
    );
}
