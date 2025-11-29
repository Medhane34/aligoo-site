// app/proposal/[code]/contract/page.tsx


'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';

import { Loader2, CheckCircle } from 'lucide-react';
import { getContractByCode } from '@/lib/proposal'
import { ContractReadyProposal } from '@/types/ProposalType'
import { replacePlaceholders } from '@/utils/contractUtils';

export const dynamic = 'force-dynamic';

export default function ContractPage() {
    const { code } = useParams() as { code: string };
    const [proposal, setProposal] = useState<ContractReadyProposal | null>(null);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);
    const [signed, setSigned] = useState(false);
    const sigCanvas = useRef<SignatureCanvas>(null);

    // Load data
    useState(() => {
        async function load() {
            const data = await getContractByCode(code);
            setProposal(data);
            setLoading(false);
        }
        load();
    });

    const handleSign = async () => {
        if (!sigCanvas.current?.isEmpty() && proposal) {
            setSigning(true);
            try {
                const signatureDataUrl = sigCanvas.current!.toDataURL();
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

                const res = await fetch('/api/proposal/contract', {
                    method: 'POST',

                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        proposalId: proposal._id,
                        uniqueCode: proposal.uniqueCode,
                        clientSignature: signatureDataUrl,
                    }),
                    signal: controller.signal,
                });
                clearTimeout(timeoutId);

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.error || result.details || 'Signing failed');
                }

                setSigned(true);
            } catch (error: any) {
                console.error('Signing Error:', error);
                alert(`Error: ${error.message || 'Failed to sign contract. Please try again.'}`);
            } finally {
                setSigning(false);
            }
        }
    };

    const clearSignature = () => sigCanvas.current?.clear();

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin" /></div>;
    if (!proposal?.contractTemplate) return <div className="min-h-screen bg-red-900 text-white flex items-center justify-center text-3xl">Contract not configured</div>;

    const data = {
        clientName: proposal.clientName,
        clientCompany: 'Nova Fitness', // fallback — improve later
        packageName: proposal.currentSelection?.selectedPackage === 'basic' ? 'Build' : proposal.currentSelection?.selectedPackage === 'pro' ? 'Grow' : 'Accelerate',
        packagePrice: proposal.currentSelection?.totalPrice || 0,
        totalPrice: proposal.currentSelection?.totalPrice || 0,
        depositAmount: ((proposal.currentSelection?.totalPrice || 0) * (proposal.currentSelection?.depositPercentage || 50)) / 100,
        depositPercentage: proposal.currentSelection?.depositPercentage || 50,
        todayDate: new Date().toLocaleDateString('en-GB'),
        agencyName: 'Aligoo Digital PLC',
        agencySigner: 'Amanuel Tesfaye',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
            <div className="max-w-5xl mx-auto p-6 pt-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        {proposal.contractTemplate.header.mainHeading}
                    </h1>
                    <div className="mt-6 space-y-2 text-xl">
                        <p>{proposal.contractTemplate.header.preparedForText} <strong>{data.clientName}</strong> • {data.clientCompany}</p>
                        <p>{proposal.contractTemplate.header.createdByText} <strong>{data.agencyName}</strong></p>
                    </div>
                </div>

                {/* Contract Body */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 mb-10 shadow-2xl border border-white/20">
                    {proposal.contractTemplate.sections.map((section, i) => (
                        <div key={i} className="mb-10">
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{section.heading}</h2>
                            <div className="text-gray-200 leading-relaxed space-y-3">
                                {replacePlaceholders(section.body, data).split('\n').map((line, idx) => (
                                    <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                                ))}
                                {section.bullets && (
                                    <ul className="list-disc list-inside mt-4 space-y-2">
                                        {section.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Price Section */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl border border-yellow-500/50">
                        <h2 className="text-3xl font-black text-center mb-8">{proposal.contractTemplate.priceSection.heading}</h2>
                        <div className="bg-black/50 rounded-xl p-6">
                            <div className="space-y-4 text-xl">
                                <div className="flex justify-between"><span>Package:</span> <strong>{data.packageName}</strong></div>
                                <div className="flex justify-between"><span>Total Price:</span> <strong>{data.totalPrice.toLocaleString()} ETB</strong></div>
                                <div className="flex justify-between text-yellow-400"><span>Deposit Due ({data.depositPercentage}%):</span> <strong>{data.depositAmount.toLocaleString()} ETB</strong></div>
                                <div className="flex justify-between"><span>Remaining Balance:</span> <strong>{(data.totalPrice - data.depositAmount).toLocaleString()} ETB</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Area */}
                <div className="grid md:grid-cols-2 gap-10 mb-16">
                    {/* Client */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-4">{data.clientName}</h3>
                        {signed ? (
                            <div className="bg-green-900/50 border border-green-500 rounded-xl p-6 text-center">
                                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                                <p className="text-xl font-bold">Signed Successfully!</p>
                            </div>
                        ) : (
                            <>
                                <SignatureCanvas
                                    ref={sigCanvas}
                                    canvasProps={{ className: 'border-2 border-white/30 rounded-xl w-full h-48 bg-black/30' }}
                                />
                                <div className="flex gap-4 mt-4">
                                    <button onClick={clearSignature} className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold">Clear</button>
                                    <button
                                        onClick={handleSign}
                                        disabled={signing || sigCanvas.current?.isEmpty()}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 py-4 rounded-xl font-black text-xl shadow-lg"
                                    >
                                        {signing ? 'Signing...' : 'I Agree & Sign Contract'}
                                    </button>
                                </div>
                            </>
                        )}
                        <p className="text-center mt-4 text-sm text-gray-400">Date: {data.todayDate}</p>
                    </div>

                    {/* Agency (Pre-filled) */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-4">Aligoo Digital PLC</h3>
                        {typeof proposal.contractTemplate.agencySignature.signatureImage === 'string' ? (
                            <img src={proposal.contractTemplate.agencySignature.signatureImage} alt="Agency Signature" className="h-32 object-contain" />
                        ) : (
                            <div className="h-32 bg-gray-800 border-2 border-dashed rounded-xl flex items-center justify-center text-4xl font-bold">
                                {proposal.contractTemplate.agencySignature.signerName[0]}
                            </div>
                        )}
                        <p className="mt-4 font-bold">{proposal.contractTemplate.agencySignature.signerName}</p>
                        <p className="text-sm text-gray-400">Authorized Signer</p>
                        <p className="text-sm text-gray-400 mt-4">Date: {data.todayDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}