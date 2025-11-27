'use client'

import { useState } from 'react'
import { PrimaryButton } from '@/components/atoms/button'

type PaymentButtonProps = {
    handlePaymentClaim: () => Promise<void>
}

export default function PaymentButton({ handlePaymentClaim }: PaymentButtonProps) {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        try {
            await handlePaymentClaim()
            // Optionally, you can handle success here, like showing a success message or redirecting.
        } catch (error) {
            // Optionally, handle errors here, e.g., show an error message.
            console.error("Payment claim failed:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PrimaryButton
            size="md"
            className="bg-white text-blue-900 hover:bg-gray-100 font-bold text-lg px-10 py-7 rounded-xl shadow-xl w-full"
            onClick={handleClick}
            loading={loading}
            disabled={loading}
        />
    )
}
