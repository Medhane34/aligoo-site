import React from "react";
import { client } from "@/src/sanity/client";
import CampaignsTable from "@/components/telegram/CampaignsTable";

export const dynamic = 'force-dynamic';

async function getCampaigns() {
    return await client.fetch(`*[_type == "campaign"] | order(_createdAt desc)`);
}

export default async function CampaignsPage() {
    const campaigns = await getCampaigns();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Campaign History</h1>
                <p className="text-default-500">Track performance of your past broadcasts.</p>
            </div>

            <CampaignsTable campaigns={campaigns} />
        </div>
    );
}
