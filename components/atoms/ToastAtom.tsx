"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

export type ToastType = "success" | "error" | "info" | "warning";

const toastStyles = tv({
    base: "pointer-events-auto relative overflow-hidden flex items-start w-full gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border select-none",
    variants: {
        type: {
            success: "bg-[#0A0A0A]/90 border-green-500/20 shadow-green-500/10",
            error: "bg-[#0A0A0A]/90 border-red-500/20 shadow-red-500/10",
            info: "bg-[#0A0A0A]/90 border-blue-500/20 shadow-blue-500/10",
            warning: "bg-[#0A0A0A]/90 border-yellow-500/20 shadow-yellow-500/10",
        },
    },
    defaultVariants: {
        type: "info",
    },
});

const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />,
};

interface ToastAtomProps extends VariantProps<typeof toastStyles> {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    onClose: () => void;
}

export default function ToastAtom({ type, title, message, onClose }: ToastAtomProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={toastStyles({ type })}
        >
            {/* Icon */}
            <div className="mt-0.5">{icons[type || "info"]}</div>

            {/* Content */}
            <div className="flex-1">
                {title && <h5 className="font-semibold text-white text-sm mb-1">{title}</h5>}
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{message}</p>
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="text-white/20 hover:text-white transition-colors p-1"
            >
                <X size={16} />
            </button>

            {/* Progress Bar (Optional, can add later) */}
            <div className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50`} />
        </motion.div>
    );
}
