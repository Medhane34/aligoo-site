// app/api/proposal/verify-email/route.ts
import { client } from '@/src/sanity/client'

export async function POST(req: Request) {
    const { proposalId, email } = await req.json()

    const proposal = await client.fetch(
        `*[_type == "proposal" && _id == $proposalId && clientEmail == $email][0]{
      clientName,
      clientEmail
    }`,
        { proposalId, email: email.toLowerCase().trim() }
    )

    if (!proposal) {
        return Response.json({ allowed: false })
    }

    return Response.json({ allowed: true, clientName: proposal.clientName })
}