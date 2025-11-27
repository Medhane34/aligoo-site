'use server'

import { client } from '@/src/sanity/client'

export async function verifyProposalPhone(proposalId: string, phone: string) {
    try {
        // Fetch proposal with server-side token (process.env.PROPOSAL_READ_WRITE is available here)
        const proposal = await client.fetch(
            `*[_type == "proposal" && _id == $id][0]{ clientPhone }`,
            { id: proposalId }
        )

        if (!proposal?.clientPhone) {
            return { success: false, error: 'Proposal not found or missing phone number' }
        }

        // Normalize both numbers
        const cleanStored = proposal.clientPhone.replace(/[\s\-()]/g, '')
        const cleanInput = phone.replace(/[\s\-()]/g, '')

        if (cleanStored !== cleanInput) {
            console.log('Phone Mismatch (Server):', { input: cleanInput, stored: cleanStored })
            return { success: false, error: 'Phone number does not match our records' }
        }

        return { success: true }
    } catch (error) {
        console.error('Sanity Verification Error:', error)
        return { success: false, error: 'Failed to verify phone number. Please try again.' }
    }
}
