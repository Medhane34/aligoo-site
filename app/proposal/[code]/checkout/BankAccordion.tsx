'use client'

import { useState } from 'react'
import { Copy, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react'

type Bank = {
    name: string
    accountName?: string
    accountNumber?: string
    branch?: string
    merchantId?: string
    phone?: string
}

export default function BankAccordion({ banks }: { banks: Bank[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const handleCopy = (textToCopy: string, index: number) => {
        navigator.clipboard.writeText(textToCopy)
        setCopiedIndex(index)
        setTimeout(() => {
            setCopiedIndex(null)
        }, 2000) // Revert back to copy icon after 2 seconds
    }

    return (
        <div className="space-y-4">
            {banks.map((bank, i) => (
                <div key={i} className="bg-white/5 rounded-2xl overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex justify-between items-center text-left text-white text-2xl font-bold p-8 hover:bg-white/10 transition-colors"
                    >
                        <span>{bank.name}</span>
                        <ChevronDown className={`w-8 h-8 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === i && (
                        <div className="p-8 pt-0 text-white">
                            <div className="space-y-8 text-2xl border-t border-white/20 pt-8">
                                {bank.accountName && <p><strong>Account:</strong> {bank.accountName}</p>}
                                {bank.accountNumber && (
                                    <div className="flex items-center justify-between bg-white/10 p-8 rounded-2xl">
                                        <span>Account No.</span>
                                        <button
                                            onClick={() => handleCopy(bank.accountNumber!, i)}
                                            className="flex items-center gap-4 bg-cyan-600 px-10 p-1 rounded-xl hover:bg-cyan-500 font-mono text-2xl"
                                            disabled={copiedIndex === i}
                                        >
                                            {copiedIndex === i ? (
                                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                                            ) : (
                                                <Copy className="w-8 h-8" />
                                            )}
                                            {bank.accountNumber}
                                        </button>
                                    </div>
                                )}
                                {bank.branch && <p><strong>Branch:</strong> {bank.branch}</p>}
                                {bank.merchantId && <p><strong>Merchant ID:</strong> {bank.merchantId}</p>}
                                {bank.phone && <p><strong>Phone:</strong> {bank.phone}</p>}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}