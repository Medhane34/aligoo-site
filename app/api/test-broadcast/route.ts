import { NextResponse } from 'next/server';
import { client } from '@/src/sanity/client';
import { sendTelegramMessage } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('campaignId');

    if (!campaignId) {
        return NextResponse.json({ error: 'Missing campaignId param' }, { status: 400 });
    }

    try {
        const campaign = await client.getDocument(campaignId);
        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        const subscribers = await client.fetch(`*[_type == "subscriber" && isActive == true]{telegramId}`);

        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json({ error: 'No subscribers found' });
        }

        const results = [];
        for (const sub of subscribers) {
            const result = await sendTelegramMessage(sub.telegramId, campaign);
            results.push({ id: sub.telegramId, result });
        }

        return NextResponse.json({
            success: true,
            total: subscribers.length,
            results,
            env: {
                hasBotToken: !!(process.env.TELEGRAM_CLIENT_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN),
                projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
            }
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
    }
}
