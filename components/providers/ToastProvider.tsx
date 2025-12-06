"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import ToastAtom, { ToastType } from "../atoms/ToastAtom";
import { AnimatePresence } from "framer-motion";

export interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

interface ToastContextType {
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        ({ type, title, message, duration = 5000 }: Omit<Toast, "id">) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast = { id, type, title, message, duration };

            setToasts((prev) => [...prev, newToast]);

            // Timer is handled in ToastAtom implicitly via useEffect, or here.
            // Better to handle removal here via setTimeout to keep logic centralized,
            // but ToastAtom usually has self-close logic too. I'll rely on ToastAtom triggering remove,
            // or just set a timeout here.
            // Let's set timeout here for simplicity.
            setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {/* Toast Container - Bottom Right */}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <ToastAtom
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
