// app/api/proposal/payment/route.ts → v2.2 DEBUG MODE
import { client } from '@/src/sanity/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        console.log('PAYMENT ROUTE TRIGGERED')

        const formData = await req.formData()
        const proposalId = formData.get('proposalId') as string
        const clientName = formData.get('clientName') as string
        const code = formData.get('code') as string
        const totalPrice = Number(formData.get('totalPrice'))
        const depositAmount = Number(formData.get('depositAmount'))
        const proofFile = formData.get('proof') as File | null

        console.log('Data received:', { proposalId, clientName, code, totalPrice, depositAmount, hasFile: !!proofFile })

        if (!proofFile) {
            return NextResponse.json({ error: 'Proof required' }, { status: 400 })
        }

        // 1. Upload to Sanity
        console.log('Uploading image to Sanity...')
        const imageAsset = await client.assets.upload('image', proofFile, {
            filename: `payment-proof-${code}-${Date.now()}`,
            title: `Payment Proof - ${clientName}`,
        })
        console.log('Image uploaded, asset ID:', imageAsset._id)

        // 2. Patch proposal
        console.log('Patching proposal in Sanity...')
        await client
            .patch(proposalId)
            .set({
                paymentProof: { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } },
                'currentSelection.paymentStatus': 'pending',
                'currentSelection.paymentConfirmedByClientAt': new Date().toISOString(),
                status: 'payment_pending',
            })
            .commit()
        console.log('Proposal patched successfully')

        // 3. SEND TO MAIN GROUP (your existing bot)
        console.log('Sending to main group...')
        console.log('Main bot token exists:', !!process.env.TELEGRAM_BOT_TOKEN)
        console.log('Main chat ID:', process.env.TELEGRAM_CHAT_ID)

        const groupText = `DEPOSIT + PROOF RECEIVED!\n\n${clientName} paid ETB ${depositAmount.toLocaleString()}\n\nTotal: ETB ${totalPrice.toLocaleString()}\nCode: ${code.toUpperCase()}\n\nhttps://proposal.aligoo-digital.agency/p/${code}\n\nConfirm payment NOW`

        const groupForm = new FormData()
        groupForm.append('chat_id', process.env.TELEGRAM_CHAT_ID!)
        groupForm.append('photo', proofFile)
        groupForm.append('caption', groupText)
        groupForm.append('parse_mode', 'HTML')

        const groupRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: groupForm,
        })
        console.log('Main group response:', groupRes.ok ? 'SUCCESS' : 'FAILED', await groupRes.text())

        // 4. SEND TO CLIENT BOT — THIS IS WHERE WE DEBUG
        console.log('CLIENT BOT DEBUG START')
        console.log('CLIENT_BOT_TOKEN exists:', !!process.env.TELEGRAM_CLIENT_BOT_TOKEN)
        console.log('CLIENT_CHAT_ID exists:', !!process.env.TELEGRAM_CLIENT_CHAT_ID)
        console.log('Token preview (first 20 chars):', process.env.TELEGRAM_CLIENT_BOT_TOKEN?.slice(0, 20))
        console.log('Chat ID value:', process.env.TELEGRAM_CLIENT_CHAT_ID)

        if (!process.env.TELEGRAM_CLIENT_BOT_TOKEN || !process.env.TELEGRAM_CLIENT_CHAT_ID) {
            console.error('MISSING CLIENT BOT ENV VARS — CHECK .env.local')
            return NextResponse.json({ success: true, warning: 'Client bot not configured' })
        }

        const clientText = `*Payment Received!*\n\nHi ${clientName},\n\nYour deposit of *ETB ${depositAmount.toLocaleString()}* has been received!\n\n• Total Project Value: *ETB ${totalPrice.toLocaleString()}*\n• Code: \`${code.toUpperCase()}\`\n\nWe’ll verify within 1 hour and your project starts *TODAY*!\n\nThank you for choosing Aligoo Digital\n\nView: https://proposal.aligoo-digital.agency/p/${code}`

        const clientForm = new FormData()
        clientForm.append('chat_id', process.env.TELEGRAM_CLIENT_CHAT_ID!)
        clientForm.append('photo', proofFile)
        clientForm.append('caption', clientText)
        clientForm.append('parse_mode', 'Markdown')

        console.log('Sending to client bot...')
        const clientRes = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_CLIENT_BOT_TOKEN}/sendPhoto`,
            {
                method: 'POST',
                body: clientForm,
            }
        )

        const clientBody = await clientRes.text()
        console.log('Client bot response:', clientRes.ok ? 'SUCCESS' : 'FAILED')
        console.log('Client bot response body:', clientBody)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('FATAL ERROR:', error)
        return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 })
    }
}