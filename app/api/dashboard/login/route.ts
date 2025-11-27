// app/api/dashboard/login/route.ts
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const { phone, name } = await req.json()

        ; (await cookies()).set('dashboard_session', JSON.stringify({ phone, name }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        })

    return Response.json({ success: true })
}