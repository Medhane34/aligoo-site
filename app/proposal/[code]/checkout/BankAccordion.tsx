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
        <div className="space-y-3">
            {banks.map((bank, i) => (
                <div key={i} className="bg-neutral-950/50 border border-white/5 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex justify-between items-center text-left text-white text-sm font-medium p-4 hover:bg-white/5 transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                            {bank.name}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === i && (
                        <div className="p-4 pt-0 text-neutral-300 text-sm">
                            <div className="space-y-3 border-t border-white/5 pt-4 mt-2">
                                {bank.accountName && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Account Name</span>
                                        <span className="font-medium text-white">{bank.accountName}</span>
                                    </div>
                                )}
                                {bank.accountNumber && (
                                    <div className="bg-white/5 p-3 rounded-lg flex items-center justify-between group">
                                        <span className="font-mono text-cyan-300">{bank.accountNumber}</span>
                                        <button
                                            onClick={() => handleCopy(bank.accountNumber!, i)}
                                            className="text-neutral-400 hover:text-white transition-colors"
                                            disabled={copiedIndex === i}
                                            title="Copy Account Number"
                                        >
                                            {copiedIndex === i ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                )}
                                {bank.branch && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Branch</span>
                                        <span>{bank.branch}</span>
                                    </div>
                                )}
                                {bank.merchantId && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Merchant ID</span>
                                        <span className="font-mono text-white">{bank.merchantId}</span>
                                    </div>
                                )}
                                {bank.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Phone</span>
                                        <span className="font-mono text-white">{bank.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}