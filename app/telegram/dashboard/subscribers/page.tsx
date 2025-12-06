import React from "react";
import { client } from "@/src/sanity/client";
import SubscribersTable from "@/components/telegram/SubscribersTable";

export const dynamic = 'force-dynamic';

async function getSubscribers() {
    return await client.fetch(`*[_type == "subscriber"] | order(joinedAt desc) {
        _id,
        firstName,
        username,
        phone,
        isActive,
        joinedAt,
        tags,
        notes,
        lastActive,
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
