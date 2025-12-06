'use client';

import React from 'react';
import { pagination as paginationStyles } from './table-styles';

const { wrapper, button: buttonClass, activeButton, pageInfo } = paginationStyles();

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function CustomPagination({
    currentPage,
    totalPages,
    onPageChange,
}: CustomPaginationProps) {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className={wrapper()}>
            <button
                className={buttonClass()}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button
                        className={buttonClass()}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className={pageInfo()}>...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    className={page === currentPage ? activeButton() : buttonClass()}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className={pageInfo()}>...</span>}
                    <button
                        className={buttonClass()}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={buttonClass()}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
