// app/p/[code]/checkout/page.tsx → FINAL CLEAN SERVER COMPONENT
import { getProposalByCode } from '@/lib/proposal'
import CheckoutClient from './CheckoutClient'
import BankGrid from './BankGrid'
import { Banknote } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params
    const proposal = await getProposalByCode(code)

    if (!proposal?.currentSelection?.totalPrice) {
        return <div className="text-white text-6xl text-center pt-40">ACCESS DENIED</div>
    }

    const {
        _id,
        clientName,
        currentSelection: { totalPrice, selectedPackage, selectedAddOns = [], depositPercentage = 50 },
    } = proposal

    const depositAmount = Math.round(totalPrice * (depositPercentage / 100))

    const banks = [
        { name: 'CBE', accountName: 'Aligoo Digital PLC', accountNumber: '1000XXXXXXXXXX', branch: 'Africa Avenue' },
        { name: 'Dashen Bank', accountName: 'Aligoo Digital PLC', accountNumber: '1234XXXXXXXXXX', branch: 'Bole Medhanealem' },
        { name: 'Telebirr', merchantId: 'ALIGOO2025', phone: '+251911XXXXXX' }
    ]

    return (
        <div className="min-h-screen bg-neutral-950 p-6 md:p-12 font-sans selection:bg-cyan-500/30">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Checkout & Payment</h1>
                    <p className="text-neutral-400">Complete your secure payment to initialize the project.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT: Order Summary (Invoice Style) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                                <div>
                                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Bill To</p>
                                    <h2 className="text-xl font-semibold text-white">{clientName}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Proposal Code</p>
                                    <p className="font-mono text-neutral-300">{code}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-neutral-300">Selected Package</span>
                                    <span className="font-medium text-white capitalize">{selectedPackage}</span>
                                </div>

                                {selectedAddOns.length > 0 && (
                                    <div className="py-2 border-t border-white/5">
                                        <p className="text-neutral-400 text-sm mb-3">Add-ons</p>
                                        <div className="space-y-2 pl-4 border-l-2 border-white/10">
                                            {selectedAddOns.map((addon) => (
                                                <div key={addon} className="text-sm text-neutral-300">
                                                    + {addon}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-neutral-950 rounded-xl p-6 border border-white/5 space-y-3">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span>ETB {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <div>
                                        <span className="block text-lg font-bold text-white">Deposit Due</span>
                                        <span className="text-xs text-yellow-500 font-medium bg-yellow-500/10 px-2 py-0.5 rounded">
                                            {depositPercentage}% Required to Start
                                        </span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-400">
                                        ETB {depositAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details Section */}
                        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-cyan-400" />
                                Payment Methods
                            </h3>
                            <BankGrid banks={banks} />
                        </div>
                    </div>

                    {/* RIGHT: Upload & Action */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50">
                                <CheckoutClient
                                    proposalId={_id}
                                    clientName={clientName}
                                    code={code}
                                    totalPrice={totalPrice}
                                    depositAmount={depositAmount}
                                />
                            </div>

                            <p className="text-center text-neutral-500 text-xs mt-6 max-w-xs mx-auto">
                                Your payment is secure. Once proof is uploaded, our team will verify and initialize your project dashboard within 1 hour.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
