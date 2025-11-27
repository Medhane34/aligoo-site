// app/api/proposal/[id]/selection/route.ts
import { client } from '@/src/sanity/client'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { selectedPackage, selectedAddOns, totalPrice } = await req.json()

    // FIXED: Deep update — preserves depositPercentage & paymentStatus
    await client
      .patch(id)
      .setIfMissing({ currentSelection: { _type: 'object' } })
      .set({
        'currentSelection.selectedPackage': selectedPackage,
        'currentSelection.selectedAddOns': selectedAddOns || [],
        'currentSelection.totalPrice': totalPrice,
        'currentSelection.depositPercentage': 50,
        'currentSelection.paymentStatus': 'none'
      })
      .commit()

    // Fetch fresh data
    const proposal = await client.getDocument(id)
    const clientName = proposal?.clientName || 'Client'
    const code = proposal?.uniqueCode || 'unknown'

    // Telegram Alert
    const message = `New Selection Confirmed!

${clientName} just chose:

Package: ${selectedPackage || 'None'}
Add-ons: ${selectedAddOns?.length > 0 ? selectedAddOns.join(', ') : 'None'}
Total: ETB ${totalPrice?.toLocaleString() || '0'}

https://proposal.aligoo-digital.agency/p/${code}`

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    })

    return NextResponse.json({ success: true, totalPrice })
  } catch (error: any) {
    console.error('Save + Telegram failed:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}