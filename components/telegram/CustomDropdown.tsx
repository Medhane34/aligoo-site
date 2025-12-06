'use client';

import React, { useState, useRef, useEffect } from 'react';
import { dropdown as dropdownStyles, button as buttonStyles } from './table-styles';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const { trigger, menu, item, selectedItem } = dropdownStyles();
const button = buttonStyles();

interface DropdownOption {
    key: string;
    label: string;
}

interface CustomDropdownProps {
    label: string;
    options: DropdownOption[];
    selectedKeys?: Set<string> | 'all';
    onSelectionChange?: (keys: Set<string> | 'all') => void;
    onAction?: (key: string) => void;
    multiple?: boolean;
    icon?: React.ReactNode;
}

export default function CustomDropdown({
    label,
    options,
    selectedKeys,
    onSelectionChange,
    onAction,
    multiple = true,
    icon
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (key: string) => {
        if (onAction) {
            onAction(key);
            setIsOpen(false);
            return;
        }

        if (onSelectionChange && selectedKeys) {
            if (!multiple) {
                onSelectionChange(new Set([key]));
                setIsOpen(false);
                return;
            }

            const newSelection = selectedKeys === 'all' ? new Set<string>() : new Set(selectedKeys);

            if (newSelection.has(key)) {
                newSelection.delete(key);
            } else {
                newSelection.add(key);
            }

            if (newSelection.size === 0 || newSelection.size === options.length) {
                onSelectionChange('all');
            } else {
                onSelectionChange(newSelection);
            }
        }
    };

    const isSelected = (key: string) => {
        if (!selectedKeys) return false;
        if (selectedKeys === 'all') return true;
        return selectedKeys.has(key);
    };

    const getSelectedCount = () => {
        if (!selectedKeys) return 0;
        if (selectedKeys === 'all') return options.length;
        return selectedKeys.size;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={trigger()}
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon && <span className="mr-1">{icon}</span>}
                {label}
                {multiple && selectedKeys && getSelectedCount() > 0 && getSelectedCount() < options.length && (
                    <span className="text-[#FF595E] text-xs">({getSelectedCount()})</span>
                )}
                <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className={menu()}>
                    {options.map(option => (
                        <div
                            key={option.key}
                            className={isSelected(option.key) ? selectedItem() : item()}
                            onClick={() => handleSelect(option.key)}
                        >
                            {multiple && selectedKeys && (
                                <input
                                    type="checkbox"
                                    checked={isSelected(option.key)}
                                    onChange={() => { }}
                                    className="w-4 h-4 rounded border-2 border-white/20 bg-transparent checked:bg-[#FF595E] checked:border-[#FF595E] pointer-events-none"
                                />
                            )}
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
