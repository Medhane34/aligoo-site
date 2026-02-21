// app/api/sanity/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

        if (!isValidSignature) {
            return NextResponse.json({ status: 'error', message: 'Invalid Signature' }, { status: 401 });
        }

        // Only process campaign documents
        if (body?._type === 'campaign') {
            const campaignId = body._id;

            // OPTIMIZATION: Idempotency guard — skip if already sent/sending
            if (body.status === 'sent' || body.status === 'sending') {
                console.log(`⏭️ Webhook skipped: Campaign ${campaignId} is already ${body.status}`);
                return NextResponse.json({ skipped: 'already sent or sending' });
            }

            // OPTIMIZATION: Pass full campaign data to avoid redundant fetch in broadcast
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
            if (siteUrl) {
                fetch(`${siteUrl}/api/broadcast/trigger`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        campaignId,
                        campaignData: body  // Pass the document from webhook payload
                    }),
                }).catch(e => console.error("Async trigger failed", e));
            }

            console.log(`✅ Webhook triggered broadcast for campaign: ${campaignId}`);
        }

        return NextResponse.json({ status: 'success' });

    } catch (err: any) {
        console.error("Webhook error:", err);
        return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
    }
}