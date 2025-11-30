'use client'

import { useState } from 'react'
import { Copy, CheckCircle2, Building2, Smartphone, CreditCard } from 'lucide-react'
import { cn } from '@/utils/cn'


type Bank = {
    name: string
    accountName?: string
    accountNumber?: string
    branch?: string
    merchantId?: string
    phone?: string
}

const BankLogo = ({ name }: { name: string }) => {
    // Simple placeholder logic for icons/logos
    if (name.toLowerCase().includes('telebirr')) return <Smartphone className="w-8 h-8 text-cyan-400" />
    if (name.toLowerCase().includes('cbe')) return <Building2 className="w-8 h-8 text-purple-400" />
    return <CreditCard className="w-8 h-8 text-indigo-400" />
}

export default function BankGrid({ banks }: { banks: Bank[] }) {
    const [selectedBank, setSelectedBank] = useState<number | null>(null)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const handleCopy = (textToCopy: string, index: number) => {
        navigator.clipboard.writeText(textToCopy)
        setCopiedIndex(index)
        setTimeout(() => {
            setCopiedIndex(null)
        }, 2000)
    }

    return (
        <div className="space-y-6">
            {/* Grid of Bank Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {banks.map((bank, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedBank(selectedBank === i ? null : i)}
                        className={cn(
                            "relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 group",
                            selectedBank === i
                                ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                                : "bg-neutral-900/50 border-white/5 hover:bg-white/5 hover:border-white/10"
                        )}
                    >
                        <div className={cn(
                            "p-3 rounded-full mb-3 transition-colors",
                            selectedBank === i ? "bg-cyan-500/20" : "bg-white/5 group-hover:bg-white/10"
                        )}>
                            <BankLogo name={bank.name} />
                        </div>
                        <span className={cn(
                            "text-sm font-bold text-center",
                            selectedBank === i ? "text-cyan-400" : "text-neutral-400 group-hover:text-white"
                        )}>
                            {bank.name}
                        </span>

                        {selectedBank === i && (
                            <div className="absolute -top-2 -right-2 bg-cyan-500 text-black p-1 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Selected Bank Details Panel */}
            {selectedBank !== null && (
                <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <BankLogo name={banks[selectedBank].name} />
                        <div>
                            <h4 className="text-white font-bold">{banks[selectedBank].name}</h4>
                            <p className="text-neutral-500 text-xs">Use the details below to complete your transfer</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {banks[selectedBank].accountName && (
                            <div className="space-y-1">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Account Name</span>
                                <p className="text-white font-medium">{banks[selectedBank].accountName}</p>
                            </div>
                        )}

                        {banks[selectedBank].accountNumber && (
                            <div className="col-span-full bg-black/30 p-4 rounded-lg border border-white/5 flex items-center justify-between group">
                                <div>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Account Number</span>
                                    <p className="font-mono text-xl text-cyan-400 tracking-wide">{banks[selectedBank].accountNumber}</p>
                                </div>
                                <button
                                    onClick={() => handleCopy(banks[selectedBank].accountNumber!, selectedBank)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
                                    title="Copy to clipboard"
                                >
                                    {copiedIndex === selectedBank ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        )}

                        {banks[selectedBank].merchantId && (
                            <div className="col-span-full bg-black/30 p-4 rounded-lg border border-white/5 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Merchant ID</span>
                                    <p className="font-mono text-xl text-cyan-400 tracking-wide">{banks[selectedBank].merchantId}</p>
                                </div>
                            </div>
                        )}

                        {banks[selectedBank].branch && (
                            <div className="space-y-1">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Branch</span>
                                <p className="text-neutral-300">{banks[selectedBank].branch}</p>
                            </div>
                        )}

                        {banks[selectedBank].phone && (
                            <div className="space-y-1">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Phone</span>
                                <p className="font-mono text-neutral-300">{banks[selectedBank].phone}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
