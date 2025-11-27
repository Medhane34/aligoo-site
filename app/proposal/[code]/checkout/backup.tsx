
// app/p/[code]/checkout/page.tsx → FINAL CLEAN SERVER COMPONENT
import { getProposalByCode } from '@/lib/proposal'
import CheckoutClient from './CheckoutClient'
import BankAccordion from './BankAccordion'
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
        { name: 'Commercial Bank of Ethiopia (CBE)', accountName: 'Aligoo Digital PLC', accountNumber: '1000XXXXXXXXXX', branch: 'Africa Avenue' },
        { name: 'Dashen Bank', accountName: 'Aligoo Digital PLC', accountNumber: '1234XXXXXXXXXX', branch: 'Bole Medhanealem' },
        { name: 'Telebirr Merchant', merchantId: 'ALIGOO2025', phone: '+251911XXXXXX' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* LEFT: Summary */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-white">
                        <h1 className="text-7xl font-black mb-12 text-cyan-400">PAY NOW</h1>
                        <div className="space-y-12">
                            <div>
                                <p className="text-gray-300 text-2xl">Client</p>
                                <p className="text-2xl font-black text-white">{clientName}</p>
                            </div>

                            <div>
                                <p className="text-gray-300 text-2xl">Package</p>
                                <p className="text-2xl font-bold text-green-400">{selectedPackage}</p>
                            </div>

                            {selectedAddOns.length > 0 && (
                                <div>
                                    <p className="text-gray-300 text-2xl">Add-ons</p>
                                    <div className="mt-6 space-y-4">
                                        {selectedAddOns.map((addon) => (
                                            <div key={addon} className="bg-white/10 rounded-xl px-8 py-5 text-2xl text-cyan-300 font-medium">
                                                {addon}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t-4 border-white/50 pt-12 mt-20">
                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span>ETB {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-green-400 mt-16">
                                    <span>DEPOSIT</span>
                                    <span>ETB {depositAmount.toLocaleString()}</span>
                                </div>
                                <p className="text-center text-yellow-400 font-black text-2xl mt-10 uppercase">
                                    {depositPercentage}% Required Now
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Bank + Upload + Button */}
                    <div className="space-y-12">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12">
                            <h2 className="text-5xl font-black text-white mb-12 flex items-center gap-6">
                                <Banknote className="w-16 h-16" />
                                PAYMENT DETAILS
                            </h2>
                            <BankAccordion banks={banks} />
                        </div>

                        {/* Client Component Handles Everything Interactive */}
                        <CheckoutClient
                            proposalId={_id}
                            clientName={clientName}
                            code={code}
                            totalPrice={totalPrice}
                            depositAmount={depositAmount}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
