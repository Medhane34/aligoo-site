// src/components/proposal/comparison/PackageSelector.tsx
'use client';

import { Check } from 'lucide-react';

type PackageKey = 'basic' | 'pro' | 'enterprise';

const packageLabels = {
    basic: 'Build',
    pro: 'Grow',
    enterprise: 'Accelerate',
} as const;

const packageColors = {
    basic: 'from-orange-600 to-amber-600',
    pro: 'from-emerald-600 to-teal-600',
    enterprise: 'from-purple-600 to-indigo-600',
} as const;

interface PackageSelectorProps {
    selectedPackage: PackageKey;
    onPackageChange: (pkg: PackageKey) => void;
    packagePricing: { basic: number; pro: number; enterprise: number };
    recommendedPackage?: PackageKey;
    currentViewPackage?: PackageKey; // For mobile: what package is currently being viewed
}

export default function PackageSelector({
    selectedPackage,
    onPackageChange,
    packagePricing,
    recommendedPackage,
    currentViewPackage = selectedPackage, // fallback if not passed
}: PackageSelectorProps) {
    const formatPrice = (price: number) => `ETB ${price.toLocaleString('en-US')}`;

    return (
        <>
            {/* DESKTOP: RADIO CARDS */}
            <div className="hidden md:flex justify-center gap-12 mt-16">
                {(['basic', 'pro', 'enterprise'] as PackageKey[]).map((pkg) => (
                    <label
                        key={pkg}
                        className={`relative cursor-pointer transition-all duration-500 ${selectedPackage === pkg ? 'scale-110' : 'opacity-85 hover:opacity-100'
                            }`}
                    >
                        <input
                            type="radio"
                            name="package"
                            value={pkg}
                            checked={selectedPackage === pkg}
                            onChange={() => onPackageChange(pkg)}
                            className="sr-only"
                        />

                        <div
                            className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all ${selectedPackage === pkg ? 'ring-4 ring-white/60 shadow-yellow-500/60' : ''
                                }`}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${packageColors[pkg]} opacity-90`} />

                            {/* Recommended Badge (only if not already selected) */}
                            {recommendedPackage === pkg && selectedPackage !== pkg && (
                                <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-10">
                                    <div className="bg-yellow-400 text-black font-black text-xs px-6 py-2 rounded-full uppercase tracking-wider shadow-xl">
                                        RECOMMENDED
                                    </div>
                                </div>
                            )}

                            <div className="relative p-10 text-center text-white">
                                <div className="font-black text-4xl mb-4">{packageLabels[pkg]}</div>
                                <div className="text-5xl font-black mb-8">
                                    {formatPrice(packagePricing[pkg])}
                                </div>
                                <div className="flex justify-center">
                                    <div
                                        className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all ${selectedPackage === pkg ? 'bg-white border-white' : 'border-white/40'
                                            }`}
                                    >
                                        {selectedPackage === pkg && <Check className="w-9 h-9 text-black" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            {/* MOBILE: SELECT BUTTON */}
            <div className="md:hidden mt-12 text-center">
                <button
                    onClick={() => onPackageChange(currentViewPackage)}
                    className="w-full max-w-lg mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-2xl py-7 px-12 rounded-3xl shadow-2xl transform transition-all hover:scale-105 active:scale-95"
                >
                    Select {packageLabels[currentViewPackage]} Package — {formatPrice(packagePricing[currentViewPackage])}
                </button>
            </div>
        </>
    );
}