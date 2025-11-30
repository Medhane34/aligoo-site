// src/components/wrappers/PricingTableWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import ComparisonTable from '@/components/proposal/comparison/ComparisonTable';
import { updateProposalSelection, updateProposalWithTotal } from '@/lib/proposal';
import type { AddOn } from '@/types/ProposalType';

type PackageKey = 'basic' | 'pro' | 'enterprise';

interface PricingTableWrapperProps {
    comparisonTable?: {
        recommendedPackage?: PackageKey;
        groups: any[];
    } | null;
    packagePricing?: {
        basic: number;
        pro: number;
        enterprise: number;
    } | null;
    currentSelection?: {
        selectedPackage?: string;
        selectedAddOns?: string[];
    } | null;
    proposalId: string;
    addOns: AddOn[];
    uniqueCode: string;
}

export default function PricingTableWrapper({
    comparisonTable,
    packagePricing,
    currentSelection,
    proposalId,
    addOns,
    uniqueCode,
}: PricingTableWrapperProps) {
    console.log('PricingTableWrapper Debug:', {
        comparisonTable: !!comparisonTable,
        packagePricing: !!packagePricing,
        groups: comparisonTable?.groups?.length || 0,
        currentSelection,
        proposalId,
        addOnsCount: addOns?.length
    });

    // If no new data → hide (just like TimelineWrapper)
    if (!comparisonTable || !packagePricing || !comparisonTable.groups || comparisonTable.groups.length === 0) {
        console.log('No comparison table data → hidden');
        return null;
    }

    // Map old → new package names (temporary bridge)
    const mapOldToNew = (old: string): PackageKey => {
        const map: Record<string, PackageKey> = {
            Bronze: 'basic',
            Silver: 'pro',
            Gold: 'enterprise',
        };
        return map[old];
    };

    // Use recommended package as default if no valid selection exists
    const getInitialPackage = (): PackageKey => {
        // Check if there's a saved selection
        if (currentSelection?.selectedPackage) {
            const mapped = mapOldToNew(currentSelection.selectedPackage);
            if (mapped) return mapped;
        }
        // Otherwise use recommended package
        return comparisonTable.recommendedPackage || 'pro';
    };

    const initialPackage = getInitialPackage();

    const [selectedPackage, setSelectedPackage] = useState<PackageKey>(initialPackage);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>(
        (currentSelection?.selectedAddOns || []).filter(Boolean)
    );

    // Save initial selection to Sanity if it's the recommended package and not yet saved
    useEffect(() => {
        const saveInitialSelection = async () => {
            // Only save if there's no existing selection and we have a recommended package
            if (!currentSelection?.selectedPackage && comparisonTable.recommendedPackage) {
                try {
                    await updateProposalSelection(proposalId, initialPackage, selectedAddOns);
                    console.log('Initial recommended package saved:', initialPackage);
                } catch (err) {
                    console.error('Failed to save initial selection', err);
                }
            }
        };
        saveInitialSelection();
    }, []); // Run only once on mount

    const handlePackageChange = (pkg: PackageKey) => {
        console.log('User selected:', pkg);
        setSelectedPackage(pkg);
        // Note: Not saving to Sanity here - only saves on "Proceed to Contract"
    };

    const handleToggleAddOn = (addonName: string) => {
        const newSelection = selectedAddOns.includes(addonName)
            ? selectedAddOns.filter(name => name !== addonName)
            : [...selectedAddOns, addonName];

        setSelectedAddOns(newSelection);
        console.log('Add-on toggled:', addonName);
        // Note: Not saving to Sanity here - only saves on "Proceed to Contract"
    };

    // Handle proceed to contract - save total price and update status
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProceedToContract = async () => {
        setIsProcessing(true);
        try {
            // Calculate total price
            let total = packagePricing[selectedPackage] || 0;
            selectedAddOns.forEach(addonName => {
                const addon = addOns.find(a => a.name === addonName);
                if (addon) total += addon.price;
            });

            console.log('📦 Selected Package:', selectedPackage);
            console.log('➕ Selected Add-ons:', selectedAddOns);
            console.log('💰 Total Price:', total);

            // Send data to API route for saving
            const response = await fetch('/api/proposal/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    proposalId,
                    selectedPackage,
                    selectedAddOns,
                    totalPrice: total,
                    status: 'viewed',
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                console.error('❌ Save API error:', err);
                // TODO: Show error toast
                return;
            }

            const result = await response.json();
            if (result.success) {
                console.log('✅ Proposal saved via API');
                // TODO: Show success toast
                // TODO: Navigate to contract page (disabled for testing)
            } else {
                console.error('❌ Save failed:', result);
                // TODO: Show error toast
            }
        } catch (error) {
            console.error('Error in handleProceedToContract:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ComparisonTable
            comparisonTable={comparisonTable}
            packagePricing={packagePricing}
            selectedPackage={selectedPackage}
            onPackageChange={handlePackageChange}
            proposalId={proposalId}
            addOns={addOns}
            selectedAddOns={selectedAddOns}
            onToggleAddOn={handleToggleAddOn}
            uniqueCode={uniqueCode}
            onProceedToContract={handleProceedToContract}
            isProcessing={isProcessing}
        />
    );
}