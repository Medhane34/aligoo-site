// app/api/dashboard/logout/route.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
    (await cookies()).delete('dashboard_session')
    redirect('/proposal/dashboard')
}
