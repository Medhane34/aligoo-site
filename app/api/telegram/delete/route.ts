import { NextResponse } from 'next/server';
import { client } from '@/src/sanity/client';

export async function POST(req: Request) {
    try {
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
        }

        console.log(`🗑️ Deleting ${ids.length} documents...`);

        // Sanity Transaction for bulk delete
        const transaction = client.transaction();
        ids.forEach((id) => transaction.delete(id));
        await transaction.commit();

        console.log(`✅ Successfully deleted ${ids.length} documents.`);

        return NextResponse.json({ success: true, count: ids.length });
    } catch (err: any) {
        console.error("❌ Delete Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
