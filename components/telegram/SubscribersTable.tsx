'use client';

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, TrashIcon, ChatBubbleLeftRightIcon, PencilSquareIcon, ClockIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Facebook, Instagram, Globe, Youtube, Link as LinkIcon } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { addToast } from "@heroui/toast";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import SubscriberHistoryModal from "@/components/telegram/SubscriberHistoryModal";
import CustomTable from "./CustomTable";
import CustomPagination from "./CustomPagination";
import CustomDropdown from "./CustomDropdown";
import CustomTooltip from "./CustomTooltip";
import ConfirmDialog from "./ConfirmDialog";
import { searchInput, button } from "./table-styles";
import { exportToExcel, exportToPDF } from "@/utils/export";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type Subscriber = {
    _id: string;
    firstName: string;
    username?: string;
    phone?: string;
    isActive: boolean;
    joinedAt: string;
    tags?: string[];
    notes?: string;
    lastActive?: string;
    source?: string;
    services?: string[];
};

const columns = [
    { key: "firstName", label: "NAME", sortable: true },
    { key: "phone", label: "PHONE" },
    { key: "source", label: "SOURCE" },
    { key: "services", label: "SERVICES" },
    { key: "isActive", label: "STATUS", sortable: true },
    { key: "tags", label: "TAGS" },
    { key: "lastActive", label: "LAST ACTIVE", sortable: true },
    { key: "joinedAt", label: "JOINED", sortable: true },
    { key: "actions", label: "ACTIONS" },
];

export default function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
    const router = useRouter();
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [statusFilter, setStatusFilter] = useState<Set<string> | 'all'>('all');
    const [tagFilter, setTagFilter] = useState<Set<string> | 'all'>('all');
    const [sourceFilter, setSourceFilter] = useState<Set<string> | 'all'>('all');
    const [serviceFilter, setServiceFilter] = useState<Set<string> | 'all'>('all');
    const [isDeleting, setIsDeleting] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
        column: "joinedAt",
        direction: "descending"
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedSubscriberId, setSelectedSubscriberId] = useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const tagsOptions = useMemo(() => {
        const tags = new Set<string>();
        subscribers.forEach(sub => sub.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).map(tag => ({ key: tag, label: tag }));
    }, [subscribers]);

    const sourceOptions = useMemo(() => {
        const sources = new Set<string>();
        subscribers.forEach(sub => {
            if (sub.source) sources.add(sub.source);
        });
        return Array.from(sources).map(source => ({ key: source, label: source.charAt(0).toUpperCase() + source.slice(1) }));
    }, [subscribers]);

    const serviceOptions = useMemo(() => {
        const services = new Set<string>();
        subscribers.forEach(sub => sub.services?.forEach(s => services.add(s)));
        return Array.from(services).map(s => ({ key: s, label: s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }));
    }, [subscribers]);

    const filteredItems = useMemo(() => {
        let filtered = [...subscribers];

        if (filterValue) {
            filtered = filtered.filter((user) =>
                user.firstName?.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.phone?.includes(filterValue) ||
                user.username?.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((user) => {
                const status = user.isActive ? "active" : "blocked";
                return statusFilter.has(status);
            });
        }

        if (tagFilter !== "all") {
            filtered = filtered.filter((user) => {
                if (!user.tags) return false;
                return user.tags.some(tag => tagFilter.has(tag));
            });
        }

        if (sourceFilter !== "all") {
            filtered = filtered.filter((user) => {
                if (!user.source) return false;
                return sourceFilter.has(user.source);
            });
        }

        if (serviceFilter !== "all") {
            filtered = filtered.filter((user) => {
                if (!user.services) return false;
                return user.services.some(s => serviceFilter.has(s));
            });
        }

        return filtered;
    }, [subscribers, filterValue, statusFilter, tagFilter, sourceFilter, serviceFilter]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [filteredItems, sortDescriptor]);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return sortedItems.slice(start, start + rowsPerPage);
    }, [page, sortedItems]);

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
                    description: `Deleted ${data.count} subscribers`,
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

    const handleExport = (type: 'excel' | 'pdf') => {
        const exportData = subscribers.map(sub => ({
            Name: sub.firstName,
            Username: sub.username || 'N/A',
            Phone: sub.phone || 'N/A',
            Source: sub.source || 'N/A',
            Status: sub.isActive ? 'Active' : 'Blocked',
            Tags: sub.tags?.join(', ') || '',
            'Last Active': sub.lastActive ? new Date(sub.lastActive).toLocaleDateString() : 'Never',
            Joined: new Date(sub.joinedAt).toLocaleDateString()
        }));

        const fileName = `subscribers_export_${new Date().toISOString().split('T')[0]}`;

        if (type === 'excel') {
            exportToExcel(exportData, fileName);
            addToast({ title: "Success", description: "Exported to Excel", color: "success" });
        } else {
            const columns = ['Name', 'Username', 'Phone', 'Source', 'Status', 'Tags', 'Last Active', 'Joined'];
            const rows = exportData.map(item => Object.values(item));
            exportToPDF(columns, rows, fileName);
            addToast({ title: "Success", description: "Exported to PDF", color: "success" });
        }
    };

    const renderCell = (user: Subscriber, columnKey: string) => {
        switch (columnKey) {
            case "firstName":
                return (
                    <div className="flex items-center gap-2">
                        <div>
                            <p className="font-semibold text-white/90">{user.firstName}</p>
                            <p className="text-xs text-white/50">@{user.username || 'N/A'}</p>
                        </div>
                        {user.notes && (
                            <CustomTooltip content={user.notes}>
                                <InformationCircleIcon className="w-4 h-4 text-white/40 hover:text-white/70 cursor-help flex-shrink-0" />
                            </CustomTooltip>
                        )}
                    </div>
                );
            case "phone":
                return <span className="text-white/70">{user.phone || '—'}</span>;
            case "source":
                if (!user.source) return <span className="text-white/30">-</span>;

                const source = user.source.toLowerCase();
                let Icon = LinkIcon;
                let iconColor = "text-white/70";

                if (source.includes('facebook')) { Icon = Facebook; iconColor = "text-blue-500"; }
                else if (source.includes('instagram')) { Icon = Instagram; iconColor = "text-pink-500"; }
                else if (source.includes('web')) { Icon = Globe; iconColor = "text-cyan-500"; }
                else if (source.includes('youtube')) { Icon = Youtube; iconColor = "text-red-500"; }

                return (
                    <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                        <span className="capitalize text-white/70">{user.source}</span>
                    </div>
                );
            case "services":
                return (
                    <div className="flex gap-1 flex-wrap">
                        {user.services?.map((s) => (
                            <BadgeAtom key={s} color="blue" variant="filled" className="text-xs px-2 py-1">
                                {s.replace(/-/g, ' ')}
                            </BadgeAtom>
                        )) || <span className="text-white/30">-</span>}
                    </div>
                );
            case "isActive":
                return (
                    <BadgeAtom color={user.isActive ? "green" : "red"} variant="filled" className="text-xs px-2 py-1">
                        {user.isActive ? "Active" : "Blocked"}
                    </BadgeAtom>
                );
            case "tags":
                return (
                    <div className="flex gap-1 flex-wrap">
                        {user.tags?.map((tag) => (
                            <BadgeAtom key={tag} color="blue" variant="filled" className="text-xs px-2 py-1">
                                {tag}
                            </BadgeAtom>
                        )) || '—'}
                    </div>
                );

            case "lastActive":
                if (!user.lastActive) {
                    return <BadgeAtom color="blue" variant="filled" className="text-xs px-2 py-1">Never</BadgeAtom>;
                }
                const lastActiveDate = new Date(user.lastActive);
                const now = new Date();
                const hoursDiff = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60);
                const daysDiff = hoursDiff / 24;

                let color: "green" | "yellow" | "red" | "gray" = "gray";
                if (hoursDiff < 24) color = "green";
                else if (daysDiff < 7) color = "yellow";
                else color = "red";

                return (
                    <BadgeAtom color="red" variant="filled" className="text-xs px-2 py-1">
                        {formatDistanceToNow(lastActiveDate, { addSuffix: true })}
                    </BadgeAtom>
                );
            case "joinedAt":
                return (
                    <span className="text-white/70">
                        {new Date(user.joinedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setSelectedSubscriberId(user._id);
                                setHistoryModalOpen(true);
                            }}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="View History"
                        >
                            <ClockIcon className="w-5 h-5 text-white/70" />
                        </button>
                        <button
                            onClick={() => user.username && window.open(`https://t.me/${user.username}`, '_blank')}
                            disabled={!user.username}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-30"
                            title={user.username ? "Chat on Telegram" : "No username"}
                        >
                            <ChatBubbleLeftRightIcon className="w-5 h-5 text-white/70" />
                        </button>
                        <button
                            onClick={() => {
                                const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';
                                window.open(`${studioUrl}/structure/__edit__${user._id}%2Ctype%3Dsubscriber`, '_blank');
                            }}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="Edit in Sanity"
                        >
                            <PencilSquareIcon className="w-5 h-5 text-white/70" />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const topContent = (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end flex-wrap">
                <input
                    type="text"
                    placeholder="Search by name, phone..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className={searchInput()}
                />
                <div className="flex gap-3 items-center flex-wrap">
                    <CustomDropdown
                        label="Status"
                        options={[
                            { key: "active", label: "Active" },
                            { key: "blocked", label: "Blocked" }
                        ]}
                        selectedKeys={statusFilter}
                        onSelectionChange={setStatusFilter}
                    />

                    {tagsOptions.length > 0 && (
                        <CustomDropdown
                            label="Tags"
                            options={tagsOptions}
                            selectedKeys={tagFilter}
                            onSelectionChange={setTagFilter}
                        />

                    )}

                    {sourceOptions.length > 0 && (
                        <CustomDropdown
                            label="Source"
                            options={sourceOptions}
                            selectedKeys={sourceFilter}
                            onSelectionChange={setSourceFilter}
                        />
                    )}

                    <CustomDropdown
                        label="Services"
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

                    <CustomDropdown
                        label="Export"
                        icon={<ArrowDownTrayIcon className="w-4 h-4" />}
                        options={[
                            { key: "excel", label: "Export to Excel" },
                            { key: "pdf", label: "Export to PDF" }
                        ]}
                        onAction={(key) => handleExport(key as 'excel' | 'pdf')}
                        multiple={false}
                    />

                    <span className="text-white/50 text-sm">Total {subscribers.length} users</span>
                </div>
            </div>
        </div>
    );

    const bottomContent = (
        <CustomPagination
            currentPage={page}
            totalPages={Math.ceil(filteredItems.length / rowsPerPage)}
            onPageChange={setPage}
        />
    );

    return (
        <>
            <CustomTable
                columns={columns}
                data={paginatedItems}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                renderCell={renderCell}
                topContent={topContent}
                bottomContent={bottomContent}
                emptyContent="No subscribers found"
            />

            <SubscriberHistoryModal
                isOpen={historyModalOpen}
                onClose={() => setHistoryModalOpen(false)}
                subscriberId={selectedSubscriberId}
            />

            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Subscribers"
                message={`Are you sure you want to delete ${selectedKeys.size} subscriber${selectedKeys.size > 1 ? 's' : ''}? This action cannot be undone.`}
                isLoading={isDeleting}
            />
        </>
    );
}
