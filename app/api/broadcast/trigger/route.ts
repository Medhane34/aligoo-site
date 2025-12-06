// app/api/broadcast/trigger/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/src/sanity/client';
import { sendTelegramMessage } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const { campaignId } = await req.json();

    try {
        // FIXED: Remove the 'status !== draft' check — we trigger on publish now
        const campaign = await client.getDocument(campaignId);
        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        // Prevent double-sending
        if (campaign.status === 'sent' || campaign.status === 'sending') {
            return NextResponse.json({ already: 'sent or sending' });
        }

        // Mark as sending
        await client.patch(campaignId).set({ status: 'sending', debugLog: 'Starting broadcast...' }).commit();

        // Fetch subscribers based on segmentation
        let query = `*[_type == "subscriber" && isActive == true]{telegramId, firstName}`;
        let params = {};

        if (campaign.service) {
            query = `*[_type == "subscriber" && isActive == true && $service in services]{telegramId, firstName}`;
            params = { service: campaign.service };
        }

        const subscribers = await client.fetch(query, params);

        if (!subscribers || subscribers.length === 0) {
            await client.patch(campaignId).set({ status: 'failed', debugLog: 'No active subscribers found.' }).commit();
            return NextResponse.json({ error: 'No subscribers' });
        }

        let sent = 0, failed = 0;
        const errors: any[] = [];

        for (const sub of subscribers) {
            const result = await sendTelegramMessage(sub.telegramId, campaign, sub);
            if (result.ok) sent++;
            else {
                failed++;
                errors.push({ id: sub.telegramId, error: result.error });
            }
        }

        const finalStatus = failed > 0 && sent === 0 ? 'failed' : 'sent';
        const debugMessage = errors.length > 0
            ? `Completed with errors. Failed IDs: ${JSON.stringify(errors)}`
            : `Success! Sent to ${sent} subscribers.`;

        await client
            .patch(campaignId)
            .set({
                status: finalStatus,
                sentAt: new Date().toISOString(),
                stats: { totalSubscribers: subscribers.length, sent, failed },
                debugLog: debugMessage
            })
            .commit();

        return NextResponse.json({ sent, failed, total: subscribers.length, errors });

    } catch (err: any) {
        console.error("Broadcast Error:", err);

        // Try to log error to Sanity if possible
        try {
            await client.patch(campaignId).set({
                status: 'failed',
                debugLog: `CRITICAL ERROR: ${err.message || JSON.stringify(err)}`
            }).commit();
        } catch (e) {
            console.error("Failed to write error log to Sanity", e);
        }

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}