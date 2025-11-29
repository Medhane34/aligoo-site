// app/api/telegram/marketing/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const update = await req.json()

    const chatId = update.message?.chat?.id
    const text = update.message?.text
    const firstName = update.message?.from?.first_name || 'there'

    if (text === '/start') {
        const welcome = `Hey ${firstName}!

Welcome to *Aligoo Digital* — Ethiopia’s fastest-growing digital agency.

You’ll get:
• Free marketing tips
• Client success stories
• Exclusive offers

Just stay tuned — no spam, only value

Questions? Type /help anytime.`

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_CLIENT_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: welcome,
                parse_mode: 'Markdown',
            }),
        })
    }

    return NextResponse.json({ ok: true })
}