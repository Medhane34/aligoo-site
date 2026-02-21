import React from "react";
import { automationClient } from "@/src/sanity/client";
import SubscribersTable from "@/components/telegram/SubscribersTable";


export const revalidate = 86400;
async function getSubscribers() {
    return await automationClient.fetch(`*[_type == "subscriber"] | order(joinedAt desc) {
        _id,
        firstName,
        username,
        phone,
        isActive,
        joinedAt,
        tags,
        notes,
        lastActive,
        source,
        services
    }`);
}

export default async function SubscribersPage() {
    const subscribers = await getSubscribers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Subscribers</h1>
                <p className="text-default-500">Manage your Telegram audience.</p>
            </div>

            <SubscribersTable subscribers={subscribers} />
        </div>
    );
}
