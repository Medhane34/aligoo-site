import React from "react";

import { automationClient } from "@/src/sanity/client";
import CampaignsTable from "@/components/telegram/CampaignsTable";

export const revalidate = 86400;

async function getCampaigns() {
  return await automationClient.fetch(
    `*[_type == "campaign"] | order(_createdAt desc)`,
  );
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Campaign History</h1>
        <p className="text-default-500">
          Track performance of your past broadcasts.
        </p>
      </div>

      <CampaignsTable campaigns={campaigns} />
    </div>
  );
}
