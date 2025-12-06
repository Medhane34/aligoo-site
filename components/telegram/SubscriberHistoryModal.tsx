'use client';

import React, { useState, useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import CardMolecule from "@/components/molecules/CardMolecule";
import { formatDistanceToNow } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/outline';

type TimelineEvent = {
    type: 'interaction' | 'campaign' | 'status';
    action?: string;
    buttonText?: string;
    campaign?: string;
    title?: string;
    delivered?: boolean;
    timestamp: string;
};

type HistoryData = {
    subscriber: {
        firstName: string;
        username?: string;
        lastActive?: string;
    };
    timeline: TimelineEvent[];
    stats: {
        totalCampaigns: number;
        totalClicks: number;
        lastActive?: string;
    };
};

export default function SubscriberHistoryModal({
    isOpen,
    onClose,
    subscriberId
}: {
    isOpen: boolean;
    onClose: () => void;
    subscriberId: string | null;
}) {
    const [data, setData] = useState<HistoryData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && subscriberId) {
            setLoading(true);
            fetch(`/api/telegram/subscriber/${subscriberId}/history`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch history:", err);
                    setLoading(false);
                });
        }
    }, [isOpen, subscriberId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <CardMolecule variant="default" padding="lg">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                {data?.subscriber?.firstName || 'Subscriber'}'s History
                            </h3>
                            <p className="text-sm text-white/50 mt-1">
                                @{data?.subscriber?.username || 'No username'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 text-white/70" />
                        </button>
                    </div>

                    {/* Body - Scrollable */}
                    <div className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Spinner />
                            </div>
                        ) : data ? (
                            <>
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-3xl font-bold text-[#FF595E]">{data.stats.totalCampaigns}</p>
                                        <p className="text-sm text-white/50 mt-1">Campaigns</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-3xl font-bold text-[#FF595E]">{data.stats.totalClicks}</p>
                                        <p className="text-sm text-white/50 mt-1">Clicks</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-sm font-bold text-white">
                                            {data.stats.lastActive
                                                ? formatDistanceToNow(new Date(data.stats.lastActive), { addSuffix: true })
                                                : 'Never'
                                            }
                                        </p>
                                        <p className="text-sm text-white/50 mt-1">Last Active</p>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg text-white mb-4">Activity Timeline</h4>
                                    {data.timeline.length > 0 ? (
                                        data.timeline.map((event, idx) => (
                                            <TimelineEventItem key={idx} event={event} />
                                        ))
                                    ) : (
                                        <p className="text-white/40 text-center py-8">No activity yet</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="text-center py-8 text-white/40">Failed to load history</p>
                        )}
                    </div>
                </CardMolecule>
            </div>
        </div>
    );
}

function TimelineEventItem({ event }: { event: TimelineEvent }) {
    const getIcon = () => {
        switch (event.type) {
            case 'interaction': return '🔘';
            case 'campaign': return '📧';
            case 'status': return '✅';
            default: return '•';
        }
    };

    const getLabel = () => {
        if (event.type === 'interaction') {
            return `Clicked "${event.buttonText}" on ${event.campaign}`;
        }
        if (event.type === 'campaign') {
            return event.delivered
                ? `Received "${event.title}"`
                : `Failed to receive "${event.title}"`;
        }
        return 'Joined';
    };

    return (
        <div className="flex gap-3 items-start p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <span className="text-2xl">{getIcon()}</span>
            <div className="flex-1">
                <p className="text-sm font-medium text-white/90">{getLabel()}</p>
                <p className="text-xs text-white/40 mt-1">
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                </p>
            </div>
            {event.type === 'campaign' && (
                <BadgeAtom color={event.delivered ? "green" : "red"} variant="filled">
                    {event.delivered ? "Delivered" : "Failed"}
                </BadgeAtom>
            )}
        </div>
    );
}
