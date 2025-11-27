// app/api/otp/verify/route.ts — FINAL VERSION (Logs + Telegram on EVERY unlock)
export const runtime = 'nodejs'   // ← ADD THIS LINE
export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { client } from '@/src/sanity/client'

export async function POST(req: NextRequest) {
  try {
    const { proposalId } = await req.json()

    // Set session cookie
    ;(await cookies()).set('proposal_session', `verified-${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    // GET IP & User Agent (works in Vercel + localhost)
    const ip = 
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('cf-connecting-ip') ||  // Cloudflare
      'unknown'

    const userAgent = req.headers.get('user-agent') || 'unknown'

    // ALWAYS log every unlock (not just first)
    await client
      .patch(proposalId)
      .setIfMissing({ viewLogs: [] })
      .append('viewLogs', [
        {
          _key: `log-${Date.now()}-${Math.random()}`,  // Required for arrays
          timestamp: new Date().toISOString(),
          event: 'opened',
          ip,
          userAgent,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })

    // Get proposal for Telegram
    const proposal = await client.fetch(
      `*[_type == "proposal" && _id == $id][0]{ clientName, uniqueCode }`,
      { id: proposalId }
    )

    // SEND TELEGRAM EVERY TIME
    // Fire-and-forget: Don't await this, so it doesn't block the response.
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `PROPOSAL UNLOCKED!\n\nClient: ${proposal.clientName}\nLink: https://proposal.aligoo-digital.agency/p/${proposal.uniqueCode}\nIP: ${ip}\nTime: ${new Date().toLocaleString()}`,
        parse_mode: 'HTML',
      }),
    }).catch(err => {
      // Log any errors from the Telegram fetch without crashing the main function
      console.error('Telegram notification failed:', err);
    });

    return Response.json({ success: true })
  } catch (err: any) {
    console.error('OTP Verify Error:', err)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}