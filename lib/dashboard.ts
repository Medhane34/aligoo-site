// src/lib/dashboard.ts — FINAL WORKING VERSION (NO -> NEEDED)
import { client } from '@/src/sanity/client'
import { DashboardProposal, ProposalStatus } from '@/types/dashboard'
import { formatDistanceToNow } from 'date-fns'

export async function subscribeToProposals(callback: (proposals: DashboardProposal[]) => void) {
    const query = `*[_type == "proposal"] | order(_createdAt desc)`

    const subscription = client.listen(query).subscribe(() => {
        fetchAllProposals().then(callback)
    })

    fetchAllProposals().then(callback)

    return () => subscription.unsubscribe()
}

async function fetchAllProposals(): Promise<DashboardProposal[]> {
    const proposals = await client.fetch<DashboardProposal[]>(`
    *[_type == "proposal"] | order(_createdAt desc) {
      _id,
      _updatedAt,
      clientName,
      clientPhone,
      uniqueCode,
      currentSelection,
      expiresAt,
      "viewLogs": viewLogs[] {
        timestamp,
        event,
        ip
      },
      _createdAt
    }
  `)

    return proposals.map(p => ({
        ...p,
        totalPrice: p.currentSelection?.totalPrice || 0,
        currentSelection: {
            ...p.currentSelection,
            status: p.currentSelection?.selectedPackage ? 'Opened' : null  // or your logic
        }
    }))
}

export { fetchAllProposals as getAllProposals }


export function getProposalStatus(proposal: DashboardProposal): { text: ProposalStatus; color: string } {
    const now = new Date()
    const expiry = proposal.expiresAt ? new Date(proposal.expiresAt) : null

    if (expiry && now > expiry) return { text: 'Expired', color: 'bg-gray-500' }

    const hasOpened = proposal.viewLogs.some(log => log.event === 'opened')
    if (!hasOpened) return { text: 'Not Opened', color: 'bg-gray-400' }

    // You can add accepted/rejected logic later when you add those fields
    return { text: 'Opened', color: 'bg-blue-500' }
}

export function getLastActivity(proposal: DashboardProposal): string {
    const times = [
        ...(proposal.viewLogs?.map(l => new Date(l.timestamp)) || []),
        proposal._updatedAt ? new Date(proposal._updatedAt) : null
    ].filter(Boolean) as Date[]

    if (times.length === 0) return '—'
    const latest = new Date(Math.max(...times.map(t => t.getTime())))
    return formatDistanceToNow(latest, { addSuffix: true })
}

export function getProposalLink(uniqueCode: string): string {
    return `https://aligoo-digital.agency/proposal/${uniqueCode}`
}

export function formatPrice(price: number): string {
    if (!price || price === 0) return '—'
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 0,
    }).format(price)
}