// app/dashboard/home/TableClient.tsx
'use client'

import { Copy, ExternalLink, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { DashboardProposal } from '@/types/dashboard'
import { getProposalStatus, getLastActivity, getProposalLink, formatPrice } from '@/lib/dashboard'
import { useState, useEffect } from 'react'
import { subscribeToProposals } from '@/lib/dashboard'

interface TableClientProps {
    proposals: DashboardProposal[]
}

export default function TableClient({ proposals: initialProposals }: TableClientProps) {
    const [proposals, setProposals] = useState(initialProposals)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    /*  useEffect(() => {
         const unsubscribe = subscribeToProposals((newProposals) => {
             setProposals(newProposals);
         });
         return () => unsubscribe()
     }, []) */

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <tbody className="divide-y divide-gray-200">
            {proposals.map((p) => {
                const status = getProposalStatus(p)
                const link = getProposalLink(p.uniqueCode)

                return (
                    <tr key={p._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{p.clientName || '—'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{p.clientPhone}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                {status.text}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                            {getLastActivity(p)}
                        </td>
                        <td className="px-6 py-4 text-lg font-bold text-indigo-600">
                            {formatPrice(p.totalPrice || 0)}
                        </td>
                        {/* <td className="px-6 py-4 text-right space-x-4">
                            <button
                                onClick={() => copyToClipboard(link, p._id)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-sm"
                            >
                                {copiedId === p._id ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copiedId === p._id ? 'Copied!' : 'Copy Link'}
                            </button>
                            <Link href={link} target="_blank" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center gap-1">
                                View <ExternalLink className="w-4 h-4" />
                            </Link>
                        </td> */}
                    </tr>
                )
            })}
        </tbody>
    )
}