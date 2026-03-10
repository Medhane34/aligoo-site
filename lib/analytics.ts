// lib/analytics.ts
/**
 * Centralized Google Analytics 4 Event Tracker
 * Works with both direct gtag and Google Tag Manager
 */

type EventName =
    | "telegram_signup_click"
    | "whatsapp_chat_click"
    | "button_click"
    | "add_to_cart"
    | "newsletter_signup"
    | "blog_read_more"
    | "contact_form_submit"
    | "strategy_session_view"
    | "strategy_session_submit"
    | "strategy_session_step_complete";

// Add new event names here as you create them

interface EventParams {
    [key: string]: string | number | boolean | undefined;
    event_category?: string;
    event_label?: string;
    source?: string;
    language?: "en" | "am";
    button_text?: string;
    link_url?: string;
    page_location?: string;
    page_title?: string;
    status?: "success" | "error";
    step_number?: number;
    step_label?: string;
    progress?: number;
    step_completed?: number;
    has_phone?: boolean;
    error_message?: string;
}

/**
 * Track any event in Google Analytics 4
 *
 * How to enable Debug Mode for local testing:
 * 1. Set `FORCE_DEBUG_MODE = true` below when testing locally.
 * 2. Set it back to `false` before deploying to production.
 * 3. Always keep Google Analytics Debugger Chrome extension ON during testing.
 */
const FORCE_DEBUG_MODE = false;   // ← CHANGE THIS TO true ONLY when testing locally

export const trackEvent = (eventName: EventName, params: EventParams = {}) => {
    if (typeof window === "undefined") return;

    const gtag = (window as any).gtag;
    if (!gtag) {
        console.warn(`[Analytics] gtag not loaded yet. Event "${eventName}" skipped.`);
        return;
    }

    const enrichedParams: EventParams = {
        ...params,
        page_location: window.location.pathname,
        page_title: document.title,
        language: params.language || "en",
        debug_mode: FORCE_DEBUG_MODE || process.env.NODE_ENV === "development",
    };

    gtag("event", eventName, enrichedParams);

    // Log in development for easy debugging
    if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Event fired → ${eventName}`, enrichedParams);
    }
};