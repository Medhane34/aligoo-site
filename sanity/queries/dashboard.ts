// src/lib/dashboard.ts
import { client } from '@/src/sanity/client'
import { DashboardProposal, ProposalStatus } from '@/types/dashboard'
import { formatDistanceToNow } from 'date-fns'

export async function getAllProposals(): Promise<DashboardProposal[]> {
    const proposals = await client.fetch<DashboardProposal[]>(`
    *[_type == "proposal"] | order(_createdAt desc) {
      _id,
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

    return proposals
}

export function getProposalStatus(proposal: DashboardProposal): { text: ProposalStatus; color: string } {
    const now = new Date()
    const expiry = proposal.expiresAt ? new Date(proposal.expiresAt) : null

    if (expiry && now > expiry) return { text: 'Expired', color: 'bg-gray-500' }

    const hasOpened = proposal.viewLogs.some(log => log.event === 'opened')
    if (!hasOpened) return { text: 'Not Opened', color: 'bg-gray-400' }

    if (proposal.currentSelection && proposal.currentSelection?.status === 'Accepted')
        return { text: 'Accepted', color: 'bg-green-500' }
    if (proposal.currentSelection && proposal.currentSelection?.status === 'Rejected')
        return { text: 'Rejected', color: 'bg-red-500' }
    if (proposal.currentSelection && proposal.currentSelection?.status === 'Payment_pending')
        return { text: 'Payment_pending', color: 'bg-yellow-500' }
    if (proposal.currentSelection && proposal.currentSelection?.status === 'Paid')
        return { text: 'Paid', color: 'bg-green-500' }
    return { text: 'Opened', color: 'bg-blue-500' }
}

export function getLastActivity(proposal: DashboardProposal): string {
    const logs = proposal.viewLogs || []
    const selectionTime = proposal.currentSelection?._updatedAt

    const times = [
        ...logs.map(l => new Date(l.timestamp)),
        selectionTime ? new Date(selectionTime) : null
    ].filter(Boolean) as Date[]

    if (times.length === 0) return '—'

    const latest = new Date(Math.max(...times.map(t => t.getTime())))
    return formatDistanceToNow(latest, { addSuffix: true })
}

export function getProposalLink(uniqueCode: string): string {
    return `https://aligoo-digital.agency/proposal/${uniqueCode}`
}

export function getSanityEditLink(id: string): string {
    return `https://aligoo-digital.sanity.studio/desk/proposal;${id}`
}