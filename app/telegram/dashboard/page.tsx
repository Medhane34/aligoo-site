import React from "react";
import { client } from "@/src/sanity/client";
import CardMolecule from "@/components/molecules/CardMolecule";
import { UserGroupIcon, PaperAirplaneIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

async function getStats() {
    const subscribers = await client.fetch(`count(*[_type == "subscriber"])`);
    const activeSubscribers = await client.fetch(`count(*[_type == "subscriber" && isActive == true])`);
    const campaigns = await client.fetch(`*[_type == "campaign"]{status, stats}`);

    let totalSent = 0;
    let totalFailed = 0;

    campaigns.forEach((c: any) => {
        if (c.stats) {
            totalSent += c.stats.sent || 0;
            totalFailed += c.stats.failed || 0;
        }
    });

    const totalAttempts = totalSent + totalFailed;
    const deliveryRate = totalAttempts > 0 ? ((totalSent / totalAttempts) * 100).toFixed(1) : "0";

    return {
        subscribers,
        activeSubscribers,
        deliveryRate,
        totalSent
    };
}

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-default-500">Real-time metrics for your Telegram marketing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardMolecule variant="spotlight" className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <UserGroupIcon className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-default-500">Total Subscribers</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{stats.subscribers}</p>
                        <p className="text-xs text-success">{stats.activeSubscribers} Active Users</p>
                    </div>
                </CardMolecule>

                <CardMolecule variant="spotlight" className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <PaperAirplaneIcon className="w-6 h-6 text-success" />
                        </div>
                        <p className="text-sm text-default-500">Delivery Rate</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{stats.deliveryRate}%</p>
                        <p className="text-xs text-default-500">Successful Message Delivery</p>
                    </div>
                </CardMolecule>

                <CardMolecule variant="spotlight" className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-warning/10 rounded-lg">
                            <ChartBarIcon className="w-6 h-6 text-warning" />
                        </div>
                        <p className="text-sm text-default-500">Total Messages Sent</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{stats.totalSent}</p>
                        <p className="text-xs text-default-500">Lifetime Broadcasts</p>
                    </div>
                </CardMolecule>
            </div>
        </div>
    );
}
