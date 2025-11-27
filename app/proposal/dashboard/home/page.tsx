// app/proposal/dashboard/home/page.tsx   ← MOVE THIS FILE HERE
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getAllProposals } from '@/lib/dashboard'
import TableClient from './TableClient'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardHome() {
    const user = await currentUser()

    // If not logged in → redirect to sign-in
    if (!user) {
        redirect('/proposal/dashboard')
    }

    const proposals = await getAllProposals()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Proposals Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome back, {user.firstName || user.emailAddresses[0].emailAddress}
                    </p>
                </div>

                {/* CLERK LOGOUT BUTTON */}
                <SignOutButton redirectUrl="/proposal/dashboard">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        Logout
                    </button>
                </SignOutButton>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <TableClient proposals={proposals} />
                        </table>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Live updates • {proposals.length} proposals
                </p>
            </div>
        </div>
    )
}