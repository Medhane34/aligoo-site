// components/wrappers/BonusGiftWrapper.tsx
import BonusGiftSection from '@/components/proposal/BonusGift'

export default function BonusGiftWrapper({ bonusGift }: { bonusGift?: any }) {
    if (!bonusGift?.enabled || !bonusGift.gifts?.length) return null

    return (
        <BonusGiftSection
            headline={bonusGift.headline}
            urgencyMessage={bonusGift.urgencyMessage}
            countdownHours={bonusGift.countdownHours}
            ctaText={bonusGift.ctaText}
            gifts={bonusGift.gifts}
        />
    )
}