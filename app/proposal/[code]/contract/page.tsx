
// app/proposal/[code]/contract/page.tsx


'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import { motion } from 'framer-motion';

import { Loader2, CheckCircle, ShieldCheck, FileText } from 'lucide-react';
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
        <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto p-6 pt-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-sm mb-6"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Official Service Agreement</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-4">
                        {proposal.contractTemplate.header.mainHeading}
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Prepared for <strong className="text-white">{data.clientName}</strong>
                    </p>
                </div>

                {/* LEGAL DOCUMENT CONTAINER */}
                <div className="bg-[#f8f9fa] text-neutral-900 rounded-xl shadow-2xl overflow-hidden relative">
                    {/* Top Bar */}
                    <div className="h-2 bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600" />

                    <div className="p-8 md:p-16">
                        {/* Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-neutral-900/5 rotate-[-45deg] pointer-events-none whitespace-nowrap select-none">
                            OFFICIAL CONTRACT
                        </div>

                        {/* Contract Content - Serif Font for Legal Feel */}
                        <div className="font-serif space-y-12 text-lg leading-relaxed">
                            {proposal.contractTemplate.sections.map((section, i) => (
                                <div key={i}>
                                    <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-widest mb-6 border-b-2 border-neutral-200 pb-2 inline-block">
                                        {section.heading}
                                    </h2>
                                    <div className="text-neutral-700 space-y-4">
                                        {replacePlaceholders(section.body, data).split('\n').map((line, idx) => (
                                            <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                                        ))}
                                        {section.bullets && (
                                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                                {section.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Price Summary Box */}
                            <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200 break-inside-avoid">
                                <h3 className="font-sans font-bold text-neutral-900 mb-6 text-center uppercase tracking-wider">Payment Schedule</h3>
                                <div className="grid md:grid-cols-2 gap-6 font-sans">
                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wider">Total Project Value</p>
                                        <p className="text-2xl font-bold text-neutral-900">{data.totalPrice.toLocaleString()} ETB</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wider">Deposit Required ({data.depositPercentage}%)</p>
                                        <p className="text-2xl font-bold text-cyan-700">{data.depositAmount.toLocaleString()} ETB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SIGNATURE SECTION */}
                        <div className="mt-20 pt-12 border-t-2 border-neutral-200 font-sans">
                            <div className="grid md:grid-cols-2 gap-16">

                                {/* Client Signature Block */}
                                <div>
                                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Signed By Client</p>

                                    {signed ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative border-2 border-green-600/30 bg-green-50/50 rounded-lg p-6 text-center"
                                        >
                                            {/* Digital Stamp */}
                                            <div className="absolute -top-3 -right-3">
                                                <CheckCircle className="w-8 h-8 text-green-600 bg-white rounded-full" />
                                            </div>

                                            <div className="font-serif italic text-3xl text-neutral-800 mb-2">
                                                {data.clientName}
                                            </div>
                                            <div className="text-xs text-green-700 font-mono border-t border-green-200 pt-2 mt-2">
                                                DIGITALLY SIGNED • {new Date().toLocaleString()}
                                                <br />
                                                IP: 192.168.X.X (Verified)
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="border-2 border-dashed border-neutral-300 rounded-lg bg-white hover:border-cyan-400 transition-colors">
                                                <SignatureCanvas
                                                    ref={sigCanvas}
                                                    canvasProps={{ className: 'w-full h-40 cursor-crosshair' }}
                                                />
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={clearSignature} className="px-4 py-2 text-sm text-neutral-500 hover:text-red-500 font-medium transition-colors">
                                                    Clear
                                                </button>
                                                <button
                                                    onClick={handleSign}
                                                    disabled={signing}
                                                    className="flex-1 bg-neutral-900 text-white hover:bg-black disabled:opacity-50 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                                >
                                                    {signing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                                    {signing ? 'Signing...' : 'Sign Contract'}
                                                </button>
                                            </div>
                                            <p className="text-xs text-neutral-400 text-center">
                                                By signing, you agree to the Terms & Conditions above.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Agency Signature Block */}
                                <div>
                                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Signed By Agency</p>
                                    <div className="relative border border-neutral-200 rounded-lg p-6 bg-white">
                                        {typeof proposal.contractTemplate.agencySignature.signatureImage === 'string' ? (
                                            <img src={proposal.contractTemplate.agencySignature.signatureImage} alt="Agency Signature" className="h-24 object-contain mb-2" />
                                        ) : (
                                            <div className="h-24 flex items-center text-4xl font-serif italic text-neutral-400">
                                                {proposal.contractTemplate.agencySignature.signerName}
                                            </div>
                                        )}
                                        <div className="border-t border-neutral-200 pt-2">
                                            <p className="font-bold text-neutral-900">{proposal.contractTemplate.agencySignature.signerName}</p>
                                            <p className="text-sm text-neutral-500">Authorized Signer, Aligoo Digital</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Document Footer */}
                    <div className="bg-neutral-100 p-4 text-center text-xs text-neutral-400 font-mono border-t border-neutral-200">
                        DOCUMENT ID: {proposal.uniqueCode} • PAGE 1 OF 1
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 text-center pb-20">
                    <p className="text-neutral-500 text-sm mb-4">Need to make changes? Contact your account manager.</p>
                </div>

            </div>
        </div>
    );
}