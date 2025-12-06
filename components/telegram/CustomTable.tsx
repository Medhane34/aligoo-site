'use client';

import React from 'react';
import { table as tableStyles } from './table-styles';

const { base, wrapper, table: tableClass, thead, tbody, tr, th, td, emptyWrapper, selectedRow } = tableStyles();

interface Column {
    key: string;
    label: string;
    sortable?: boolean;
}

interface CustomTableProps {
    columns: Column[];
    data: any[];
    selectedKeys: Set<string>;
    onSelectionChange: (keys: Set<string>) => void;
    sortDescriptor?: { column: string; direction: 'ascending' | 'descending' };
    onSortChange?: (descriptor: { column: string; direction: 'ascending' | 'descending' }) => void;
    renderCell: (item: any, columnKey: string) => React.ReactNode;
    emptyContent?: string;
    topContent?: React.ReactNode;
    bottomContent?: React.ReactNode;
}

export default function CustomTable({
    columns,
    data,
    selectedKeys,
    onSelectionChange,
    sortDescriptor,
    onSortChange,
    renderCell,
    emptyContent = 'No data available',
    topContent,
    bottomContent,
}: CustomTableProps) {

    const isAllSelected = data.length > 0 && selectedKeys.size === data.length;
    const isSomeSelected = selectedKeys.size > 0 && selectedKeys.size < data.length;

    const toggleAll = () => {
        if (isAllSelected) {
            onSelectionChange(new Set());
        } else {
            onSelectionChange(new Set(data.map(item => item._id)));
        }
    };

    const toggleRow = (id: string) => {
        const newSelection = new Set(selectedKeys);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        onSelectionChange(newSelection);
    };

    const handleSort = (columnKey: string) => {
        if (!onSortChange) return;

        const column = columns.find(col => col.key === columnKey);
        if (!column?.sortable) return;

        const newDirection =
            sortDescriptor?.column === columnKey && sortDescriptor.direction === 'ascending'
                ? 'descending'
                : 'ascending';

        onSortChange({ column: columnKey, direction: newDirection });
    };

    return (
        <div className="space-y-4">
            {topContent}

            <div className={wrapper()}>
                <table className={tableClass()}>
                    <thead className={thead()}>
                        <tr>
                            <th className={th()}>
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={input => {
                                        if (input) input.indeterminate = isSomeSelected;
                                    }}
                                    onChange={toggleAll}
                                    className="w-4 h-4 rounded border-2 border-white/20 bg-transparent checked:bg-[#FF595E] checked:border-[#FF595E] cursor-pointer"
                                />
                            </th>
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    className={`${th()} ${column.sortable ? 'cursor-pointer hover:text-white' : ''}`}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && sortDescriptor?.column === column.key && (
                                            <span className="text-[#FF595E]">
                                                {sortDescriptor.direction === 'ascending' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={tbody()}>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className={emptyWrapper()}>
                                    {emptyContent}
                                </td>
                            </tr>
                        ) : (
                            data.map(item => (
                                <tr
                                    key={item._id}
                                    className={`${tr()} ${selectedKeys.has(item._id) ? selectedRow() : ''}`}
                                >
                                    <td className={td()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedKeys.has(item._id)}
                                            onChange={() => toggleRow(item._id)}
                                            className="w-4 h-4 rounded border-2 border-white/20 bg-transparent checked:bg-[#FF595E] checked:border-[#FF595E] cursor-pointer"
                                        />
                                    </td>
                                    {columns.map(column => (
                                        <td key={column.key} className={td()}>
                                            {renderCell(item, column.key)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {bottomContent}
        </div>
    );
}
