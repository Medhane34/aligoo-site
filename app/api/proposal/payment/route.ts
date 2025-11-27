// app/api/proposal/payment/route.ts → FINAL v2.0 — WITH IMAGE PROOF
import { client } from '@/src/sanity/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const proposalId = formData.get('proposalId') as string
        const clientName = formData.get('clientName') as string
        const code = formData.get('code') as string
        const totalPrice = Number(formData.get('totalPrice'))
        const depositAmount = Number(formData.get('depositAmount'))
        const proofFile = formData.get('proof') as File | null

        if (!proofFile) {
            return NextResponse.json({ error: 'Proof required' }, { status: 400 })
        }

        // 1. Upload image to Sanity
        const imageAsset = await client.assets.upload('image', proofFile, {
            filename: `payment-proof-${code}-${Date.now()}`,
            title: `Payment Proof - ${clientName}`,
        })

        // 2. Update proposal with image + status
        await client
            .patch(proposalId)
            .set({
                paymentProof: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id,
                    },
                },
                'currentSelection.paymentStatus': 'pending',
                'currentSelection.paymentConfirmedByClientAt': new Date().toISOString(),
                status: 'payment_pending',
            })
            .commit()

        // 3. Send Telegram with PHOTO
        const telegramText = `DEPOSIT + PROOF RECEIVED!

${clientName} paid ETB ${depositAmount.toLocaleString()}

Total Project: ETB ${totalPrice.toLocaleString()}
Code: ${code.toUpperCase()}

View: https://proposal.aligoo-digital.agency/p/${code}

Confirm payment NOW`

        const telegramForm = new FormData()
        telegramForm.append('chat_id', process.env.TELEGRAM_CHAT_ID!)
        telegramForm.append('photo', proofFile)
        telegramForm.append('caption', telegramText)
        telegramForm.append('parse_mode', 'HTML')

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: telegramForm,
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Payment + Proof upload failed:', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}