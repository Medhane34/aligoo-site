import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Vercel populates this header automatically
    const country = request.headers.get('x-vercel-ip-country') || 'US';

    // For local testing, you can uncomment below to simulate Ethiopia
    // return NextResponse.json({ country: 'ET' });

    return NextResponse.json({ country });
}
