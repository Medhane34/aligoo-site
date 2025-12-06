// lib/discount.ts

import type { Discount } from '@/types/ProposalType'

export interface DiscountResult {
    hasDiscount: boolean
    percentage: number
    amount: number
    originalPrice: number
    finalPrice: number
    reason?: string
    savingsText: string        // e.g. "Save 20% (24,000 ETB)"
    badgeText: string         // e.g. "20% OFF – Early Bird Special"
}

/**
 * Calculate discount based on total price and discount object from Sanity
 */
export function calculateDiscount(
    totalPrice: number,
    discount?: Discount
): DiscountResult {
    const hasDiscount = Boolean(discount?.enabled && discount.percentage > 0)
    const percentage = hasDiscount ? discount!.percentage : 0
    const amount = hasDiscount ? Math.round(totalPrice * percentage / 100) : 0
    const finalPrice = totalPrice - amount
    const reason = hasDiscount ? discount!.reason : undefined

    return {
        hasDiscount,
        percentage,
        amount,
        originalPrice: totalPrice,
        finalPrice,
        reason,
        savingsText: hasDiscount
            ? `Save ${percentage}% (${amount.toLocaleString()} ETB)`
            : '',
        badgeText: hasDiscount
            ? `${percentage}% OFF${reason ? ` – ${reason}` : ''}`
            : '',
    }
}
