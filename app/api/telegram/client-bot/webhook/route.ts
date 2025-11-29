// app/api/telegram/client-bot/webhook/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()
    console.log('NEW MESSAGE RECEIVED FROM CLIENT BOT:', JSON.stringify(body, null, 2))

    const chatId = body.message?.chat?.id
    const text = body.message?.text
    const firstName = body.message?.from?.first_name

    if (text === '/start' || text === '/subscribe') {
        const reply = `Hi ${firstName}!\n\nYou're now subscribed to Aligoo Client Updates!\n\nYou will receive:\n• Payment confirmations\n• Project start alerts\n• Weekly updates\n\nThank you for trusting us`

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_CLIENT_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: reply,
                parse_mode: 'Markdown',
            }),
        })
    }

    return NextResponse.json({ ok: true })
}