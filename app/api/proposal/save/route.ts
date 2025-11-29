// File: app/api/proposal/save/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/src/sanity/client';

/**
 * Expected payload shape
 */
interface SavePayload {
    proposalId: string;
    selectedPackage: string;
    selectedAddOns: string[];
    totalPrice: number;
    status?: string; // optional, defaults to 'viewed'
}

export async function POST(request: Request) {
    try {
        const data: SavePayload = await request.json();
        const {
            proposalId,
            selectedPackage,
            selectedAddOns,
            totalPrice,
            status = 'viewed',
        } = data;

        if (!proposalId) {
            return NextResponse.json({ error: 'proposalId is required' }, { status: 400 });
        }

        // Build patch data
        const patchData: Record<string, any> = {
            'currentSelection.selectedPackage': selectedPackage,
            'currentSelection.selectedAddOns': selectedAddOns,
            'currentSelection.totalPrice': totalPrice,
            status,
        };

        await client.patch(proposalId).set(patchData).commit();

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Error in proposal save API:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
