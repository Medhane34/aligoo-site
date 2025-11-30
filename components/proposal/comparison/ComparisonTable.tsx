// src/components/proposal/comparison/ComparisonTable.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown } from 'lucide-react';
import RecommendedBadge from './RecommendedBadge';
import InfoTooltip from '@/components/ui/InfoTooltip';
import type { AddOn } from '@/types/ProposalType';
import AddonCard from '../AddonCard';
import StickyPriceFooter from './StickyPriceFooter';

type PackageKey = 'basic' | 'pro' | 'enterprise';

interface FeatureItem {
    _key: string;
    feature: string;
    basic?: string;
    pro?: string;
    enterprise?: string;
    note?: string;
}

interface FeatureGroup {
    _key: string;
    groupTitle: string;
    backgroundColor?: string;
    items: FeatureItem[];
}

interface ComparisonTableProps {
    comparisonTable: {
        recommendedPackage?: PackageKey;
        groups: FeatureGroup[];
    };
    packagePricing: {
        basic: number;
        pro: number;
        enterprise: number;
    };
    selectedPackage: PackageKey;
    onPackageChange: (pkg: PackageKey) => void;
    proposalId: string;
    addOns: AddOn[];
    selectedAddOns: string[];
    onToggleAddOn: (name: string) => void;
    uniqueCode: string;
    onProceedToContract: () => Promise<void>;
    isProcessing?: boolean;
}

const packageLabels = {
    basic: 'Build',
    pro: 'Grow',
    enterprise: 'Accelerate',
};

export default function ComparisonTable({
    comparisonTable,
    packagePricing,
    selectedPackage,
    onPackageChange,
    proposalId,
    addOns,
    selectedAddOns,
    onToggleAddOn,
    uniqueCode,
    onProceedToContract,
    isProcessing = false,
}: ComparisonTableProps) {
    const [mobileViewPackage, setMobileViewPackage] = useState<PackageKey>(selectedPackage);
    const [hoveredPackage, setHoveredPackage] = useState<PackageKey | null>(null);
    const addOnsRef = useRef<HTMLDivElement>(null);
    const pricingTableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMobileViewPackage(selectedPackage);
    }, [selectedPackage]);

    // Calculate total price
    const totalPrice = useMemo(() => {
        let total = packagePricing[selectedPackage] || 0;
        selectedAddOns.forEach(addonName => {
            const addon = addOns.find(a => a.name === addonName);
            if (addon) total += addon.price;
        });
        return total;
    }, [selectedPackage, selectedAddOns, packagePricing, addOns]);

    // Get selected add-ons with prices for footer
    const selectedAddOnsWithPrices = useMemo(() => {
        return selectedAddOns.map(name => {
            const addon = addOns.find(a => a.name === name);
            return addon ? { name: addon.name, price: addon.price } : null;
        }).filter(Boolean) as Array<{ name: string; price: number }>;
    }, [selectedAddOns, addOns]);

    const formatPrice = (price: number) => `ETB ${price.toLocaleString('en-US')}`;

    // Handle package selection with auto-scroll
    const handlePackageSelect = (pkg: PackageKey) => {
        onPackageChange(pkg);
        // Scroll to add-ons section after a brief delay for visual feedback
        setTimeout(() => {
            addOnsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }, 300);
    };

    const renderValue = (value: string | undefined) => {
        if (!value) return <span className="text-gray-500">—</span>;
        if (value === '✔' || value.toLowerCase() === 'true') {
            return (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <Check className="w-7 h-7 text-green-400 mx-auto" />
                </motion.div>
            );
        }
        if (value === '✗' || value.toLowerCase() === 'false') {
            return (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <X className="w-7 h-7 text-red-500 mx-auto" />
                </motion.div>
            );
        }
        return <span className="text-white font-semibold text-center block">{value}</span>;
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-20 px-4" ref={pricingTableRef}>
            {/* Mobile Dropdown */}
            <div className="md:hidden mb-10 relative">
                <select
                    value={mobileViewPackage}
                    onChange={(e) => setMobileViewPackage(e.target.value as PackageKey)}
                    className="w-full appearance-none bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-black text-2xl py-6 px-8 rounded-3xl pr-16 shadow-2xl"
                >
                    <option value="basic">{packageLabels.basic}</option>
                    <option value="pro">{packageLabels.pro}</option>
                    <option value="enterprise">{packageLabels.enterprise}</option>
                </select>
                <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 text-white pointer-events-none" />
            </div>

            {/* TABLE CONTAINER */}
            <div className="relative mb-20">
                {/* Background & Glow Container (Separate to allow sticky headers) */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-2xl bg-neutral-950/80 backdrop-blur-xl -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
                </div>

                {/* DESKTOP FULL TABLE */}
                <div className="hidden md:block rounded-3xl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {/* Empty Top-Left Corner */}
                                <th className="text-left p-4 text-2xl font-black text-transparent bg-neutral-950/90 backdrop-blur-xl sticky top-0 z-40 rounded-tl-3xl">
                                    Features
                                </th>

                                {(['basic', 'pro', 'enterprise'] as PackageKey[]).map((pkg) => {
                                    const isRecommended = comparisonTable.recommendedPackage === pkg;
                                    return (
                                        <th
                                            key={pkg}
                                            onMouseEnter={() => setHoveredPackage(pkg)}
                                            onMouseLeave={() => setHoveredPackage(null)}
                                            className={`p-6 text-center sticky top-0 z-40 transition-all duration-200 backdrop-blur-xl
                                                ${pkg === 'basic' ? 'bg-neutral-900/90' : pkg === 'pro' ? 'bg-neutral-950/90' : 'bg-black/90'}
                                                ${pkg === 'enterprise' ? 'rounded-tr-3xl' : ''}
                                                ${hoveredPackage === pkg ? 'brightness-125' : ''}
                                                ${isRecommended ? 'border-t-2 border-yellow-500/50' : ''}
                                            `}
                                        >
                                            <div className="text-2xl font-black text-white mb-4 z-10 relative">
                                                {packageLabels[pkg]}
                                            </div>
                                            {isRecommended && (
                                                <div className="absolute -top-4 left-0 right-0 flex justify-center z-50">
                                                    <RecommendedBadge />
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        {comparisonTable.groups.map((group) => (
                            <tbody key={group._key}>
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-6 text-2xl font-black text-white text-left"
                                        style={{ backgroundColor: group.backgroundColor || '#1e293b' }}
                                    >
                                        {group.groupTitle}
                                    </td>
                                </tr>
                                {group.items.map((item, index) => (
                                    <tr
                                        key={item._key}
                                        className={`border-t border-white/10 hover:bg-white/5 transition ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                                            } `}
                                    >
                                        <td className="p-6 text-lg text-gray-300 font-medium pl-12">
                                            {item.feature}
                                            <InfoTooltip content={item.note} />                                        </td>
                                        {(['basic', 'pro', 'enterprise'] as PackageKey[]).map((pkg) => {
                                            const isRecommended = comparisonTable.recommendedPackage === pkg;
                                            return (
                                                <td
                                                    key={pkg}
                                                    onMouseEnter={() => setHoveredPackage(pkg)}
                                                    onMouseLeave={() => setHoveredPackage(null)}
                                                    className={`p-6 text-center transition-colors duration-200 
                                                        ${hoveredPackage === pkg ? 'bg-white/5' : ''}
                                                        ${isRecommended ? 'border-l-2 border-r-2 border-yellow-500/30 bg-yellow-500/[0.02]' : ''}
`}
                                                >
                                                    {renderValue(item[pkg])}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        ))}
                        {/* PRICE ROW - Interactive Buttons */}
                        <tfoot>
                            <tr>
                                {/* Empty Bottom-Left Corner */}
                                <td className="p-8 text-transparent bg-transparent">Price</td>

                                {(['basic', 'pro', 'enterprise'] as PackageKey[]).map((pkg) => {
                                    const isRecommended = comparisonTable.recommendedPackage === pkg;
                                    const isSelected = selectedPackage === pkg;
                                    return (
                                        <td
                                            key={pkg}
                                            className={`p-4 text-center transition-all duration-300 ${pkg === 'basic' ? 'bg-orange-600/10' :
                                                pkg === 'pro' ? 'bg-orange-500/10' :
                                                    'bg-yellow-600/10'
                                                } ${isRecommended ? 'border-b-2 border-l-2 border-r-2 border-yellow-500/50' : ''}`}
                                        >
                                            <button
                                                onClick={() => handlePackageSelect(pkg)}
                                                className={`w-full px-6 py-4 rounded-xl font-black text-white transition-all duration-300 transform ${isSelected
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 scale-105 shadow-xl shadow-green-500/50'
                                                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 hover:brightness-110 shadow-lg'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-1">
                                                    {formatPrice(packagePricing[pkg])}
                                                </div>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="text-sm flex items-center justify-center gap-1"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Selected
                                                    </motion.div>
                                                )}
                                                {!isSelected && (
                                                    <div className="text-sm opacity-80">
                                                        Select {packageLabels[pkg]}
                                                    </div>
                                                )}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* MOBILE SINGLE COLUMN */}
                <div className="md:hidden">
                    {comparisonTable.groups.map((group) => (
                        <div key={group._key} className="border-b border-white/10">
                            <div
                                className="p-6 text-2xl font-black text-white text-center"
                                style={{ backgroundColor: group.backgroundColor || '#1e293b' }}
                            >
                                {group.groupTitle}
                            </div>
                            {group.items.map((item) => (
                                <div key={item._key} className="p-6 border-t border-white/5">
                                    <div className="text-gray-300 font-medium">{item.feature}</div>
                                    <div className="mt-4 text-3xl font-bold text-white text-center">
                                        {renderValue(item[mobileViewPackage])}
                                    </div>
                                    {item.note && <div className="text-sm text-gray-500 text-center mt-2">{item.note}</div>}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="p-10 bg-gradient-to-r from-orange-600 to-yellow-600 text-center">
                        <div className="text-5xl font-black text-white">
                            {formatPrice(packagePricing[mobileViewPackage])}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add-Ons Section */}
            {addOns && addOns.length > 0 && (
                <div ref={addOnsRef} className="mb-32">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl font-bold text-white text-center mb-10"
                    >
                        Add Powerful Features
                    </motion.h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {addOns.map((addon, i) => (
                            <motion.div
                                key={addon.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <AddonCard
                                    addon={addon}
                                    selected={selectedAddOns.includes(addon.name)}
                                    onToggle={() => onToggleAddOn(addon.name)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sticky Price Footer */}
            <StickyPriceFooter
                totalPrice={totalPrice}
                selectedPackageName={packageLabels[selectedPackage]}
                selectedPackagePrice={packagePricing[selectedPackage]}
                selectedAddOnsCount={selectedAddOns.length}
                uniqueCode={uniqueCode}
                isPackageSelected={!!selectedPackage}
                onProceed={onProceedToContract}
                isProcessing={isProcessing}
                selectedAddOns={selectedAddOnsWithPrices}
                pricingTableRef={pricingTableRef}
            />
        </div>
    );
}