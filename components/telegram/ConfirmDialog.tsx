'use client';

import React from 'react';
import CardMolecule from '@/components/molecules/CardMolecule';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { button } from './table-styles';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Delete',
    cancelText = 'Cancel',
    isLoading = false,
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleCancel}
            />

            {/* Dialog Content */}
            <div className="relative z-10 w-full max-w-md">
                <CardMolecule variant="default" padding="lg">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20">
                        <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-center text-white mb-2">
                        {title}
                    </h3>

                    {/* Message */}
                    <p className="text-center text-white/70 mb-6">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className={`${button({ variant: 'ghost' })} flex-1 disabled:opacity-50`}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={`${button({ variant: 'danger' })} flex-1 disabled:opacity-50`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Deleting...
                                </span>
                            ) : confirmText}
                        </button>
                    </div>
                </CardMolecule>
            </div>
        </div>
    );
}
