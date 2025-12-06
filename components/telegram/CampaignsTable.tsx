'use client';

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
import { addToast } from "@heroui/toast";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import CustomTable from "./CustomTable";
import CustomDropdown from "./CustomDropdown";
import ConfirmDialog from "./ConfirmDialog";
import { button } from "./table-styles";

type Campaign = {
    _id: string;
    title: string;
    status: string;
    sentAt: string;
    stats?: {
        totalSubscribers: number;
        sent: number;
        failed: number;
    };
    service?: string;
};

const columns = [
    { key: "title", label: "CAMPAIGN", sortable: true },
    { key: "service", label: "TARGET" },
    { key: "status", label: "STATUS", sortable: true },
    { key: "stats.sent", label: "SENT", sortable: true },
    { key: "stats.failed", label: "FAILED", sortable: true },
    { key: "sentAt", label: "DATE", sortable: true },
];

export default function CampaignsTable({ campaigns }: { campaigns: Campaign[] }) {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [statusFilter, setStatusFilter] = useState<Set<string> | 'all'>('all');
    const [serviceFilter, setServiceFilter] = useState<Set<string> | 'all'>('all');
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
        column: "sentAt",
        direction: "descending"
    });

    const serviceOptions = useMemo(() => {
        const services = new Set<string>();
        campaigns.forEach(c => {
            if (c.service) services.add(c.service);
        });
        return Array.from(services).map(s => ({ key: s, label: s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }));
    }, [campaigns]);

    const filteredItems = useMemo(() => {
        let filtered = [...campaigns];

        if (statusFilter !== "all") {
            filtered = filtered.filter((campaign) =>
                statusFilter.has(campaign.status)
            );
        }

        if (serviceFilter !== "all") {
            filtered = filtered.filter((campaign) => {
                if (!campaign.service) return false;
                return serviceFilter.has(campaign.service);
            });
        }

        return filtered;
    }, [campaigns, statusFilter, serviceFilter]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a: any, b: any) => {
            const first = sortDescriptor.column === "stats.sent" ? a.stats?.sent :
                sortDescriptor.column === "stats.failed" ? a.stats?.failed :
                    a[sortDescriptor.column as keyof Campaign];

            const second = sortDescriptor.column === "stats.sent" ? b.stats?.sent :
                sortDescriptor.column === "stats.failed" ? b.stats?.failed :
                    b[sortDescriptor.column as keyof Campaign];

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [filteredItems, sortDescriptor]);

    const handleDeleteClick = () => {
        if (selectedKeys.size === 0) return;
        setConfirmDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        const idsToDelete = Array.from(selectedKeys);
        setIsDeleting(true);
        try {
            const res = await fetch('/api/telegram/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: idsToDelete }),
            });

            const data = await res.json();

            if (data.success) {
                addToast({
                    title: "Success",
                    description: `Deleted ${data.count} campaigns`,
                    color: "success",
                });
                setSelectedKeys(new Set());
                router.refresh();
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error.message || "Failed to delete",
                color: "danger",
            });
        } finally {
            setIsDeleting(false);
            setConfirmDialogOpen(false);
        }
    };

    const renderCell = (campaign: Campaign, columnKey: string) => {
        switch (columnKey) {
            case "title":
                return <span className="font-semibold text-white/90">{campaign.title}</span>;
            case "service":
                return (
                    <BadgeAtom color="blue" variant="filled" className="text-xs px-2 py-1">
                        {campaign.service ? campaign.service.replace(/-/g, ' ') : 'All Subscribers'}
                    </BadgeAtom>
                );
            case "status":
                const statusColors: Record<string, "green" | "yellow" | "red" | "blue"> = {
                    sent: "green",
                    sending: "yellow",
                    failed: "red",
                    draft: "blue",
                };
                return (
                    <BadgeAtom color={statusColors[campaign.status] || "blue"} variant="filled">
                        {campaign.status}
                    </BadgeAtom>
                );
            case "stats.sent":
                return <span className="text-white/70">{campaign.stats?.sent || 0}</span>;
            case "stats.failed":
                return <span className="text-white/70">{campaign.stats?.failed || 0}</span>;
            case "sentAt":
                return (
                    <span className="text-white/70">
                        {new Date(campaign.sentAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                );
            default:
                return null;
        }
    };

    const topContent = (
        <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="flex gap-3 items-center flex-wrap">
                <CustomDropdown
                    label="Status"
                    options={[
                        { key: "sent", label: "Sent" },
                        { key: "sending", label: "Sending" },
                        { key: "failed", label: "Failed" },
                        { key: "draft", label: "Draft" }
                    ]}
                    selectedKeys={statusFilter}
                    onSelectionChange={setStatusFilter}
                />

                <CustomDropdown
                    label="Target"
                    options={serviceOptions}
                    selectedKeys={serviceFilter}
                    onSelectionChange={setServiceFilter}
                />

                {selectedKeys.size > 0 && (
                    <button
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        className={button({ variant: 'danger' })}
                    >
                        <TrashIcon className="w-4 h-4" />
                        Delete ({selectedKeys.size})
                    </button>
                )}
            </div>
            <span className="text-white/50 text-sm">Total {campaigns.length} campaigns</span>
        </div>
    );

    return (
        <>
            <CustomTable
                columns={columns}
                data={sortedItems}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                renderCell={renderCell}
                topContent={topContent}
                emptyContent="No campaigns found"
            />

            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Campaigns"
                message={`Are you sure you want to delete ${selectedKeys.size} campaign${selectedKeys.size > 1 ? 's' : ''}? This action cannot be undone.`}
                isLoading={isDeleting}
            />
        </>
    );
}
