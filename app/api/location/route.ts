import { NextRequest, NextResponse } from 'next/server';

const cacheHeaders = {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
};

export async function GET(request: NextRequest) {
    // Vercel populates this header automatically
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    console.log("📍 Location API Debug:", {
        country,
        allHeaders: Object.fromEntries(request.headers.entries())
    });

    // Suggestion: Allow override via query param for testing
    const { searchParams } = new URL(request.url);
    if (searchParams.get('force_et') === 'true') {
        return NextResponse.json({ country: 'ET' }, { headers: cacheHeaders });
    }

    // For local testing, you can uncomment below to simulate Ethiopia
    return NextResponse.json({ country: 'ET' }, { headers: cacheHeaders });

    return NextResponse.json({ country }, { headers: cacheHeaders });
}

