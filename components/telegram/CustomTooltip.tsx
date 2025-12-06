'use client';

import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    className?: string;
}

export default function CustomTooltip({ children, content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && content && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg border border-white/10 whitespace-pre-wrap max-w-xs max-h-48 overflow-y-auto shadow-lg">
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45" />
                </div>
            )}
        </div>
    );
}
