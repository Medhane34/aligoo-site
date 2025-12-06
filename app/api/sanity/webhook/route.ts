// app/api/sanity/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { client } from '@/src/sanity/client';

export const dynamic = 'force-dynamic'; // Critical for Vercel free tier

const SECRET = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    // DIAGNOSTIC MODE: Return env var status directly to Sanity Log
    const envStatus = {
        hasSecret: !!process.env.SANITY_WEBHOOK_SECRET,
        hasToken: !!process.env.SANITY_API_READ_WRITE_TOKEN,
        hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        tokenStart: process.env.SANITY_API_READ_WRITE_TOKEN ? process.env.SANITY_API_READ_WRITE_TOKEN.substring(0, 5) + '...' : 'MISSING'
    };

    console.log("Webhook Diagnostic:", envStatus);

    try {
        const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

        if (!isValidSignature) {
            return NextResponse.json({
                status: 'error',
                message: 'Invalid Signature',
                env: envStatus
            }, { status: 401 });
        }

        if (body?._type === 'campaign') {
            const campaignId = body._id;

            // Try to write to Sanity to prove token works
            try {
                await client.patch(campaignId).set({ debugLog: `Webhook connected! Env: ${JSON.stringify(envStatus)}` }).commit();
            } catch (writeErr: any) {
                return NextResponse.json({
                    status: 'error',
                    message: 'Failed to write to Sanity (Token Issue?)',
                    error: writeErr.message,
                    env: envStatus
                }, { status: 500 });
            }

            // Trigger broadcast
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
            if (siteUrl) {
                fetch(`${siteUrl}/api/broadcast/trigger`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ campaignId }),
                }).catch(e => console.error("Async trigger failed", e));
            }
        }

        return NextResponse.json({ status: 'success', env: envStatus });

    } catch (err: any) {
        return NextResponse.json({
            status: 'fatal_error',
            message: err.message,
            env: envStatus
        }, { status: 500 });
    }
}