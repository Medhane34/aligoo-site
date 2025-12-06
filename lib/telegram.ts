// src/lib/telegram.ts

// --- ENVIRONMENT VARIABLES CHECK ---
// --- ENVIRONMENT VARIABLES CHECK ---
const BOT_TOKEN = process.env.TELEGRAM_CLIENT_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!BOT_TOKEN) console.error("❌ TELEGRAM_CLIENT_BOT_TOKEN is missing!");
else console.log("✅ Telegram Bot Token found (starts with):", BOT_TOKEN.substring(0, 5) + "...");

if (!PROJECT_ID) console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID missing!");
if (!PROJECT_ID) console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID missing!");

// ----------------------------------------------------------------
// GENERIC TELEGRAM REQUEST WRAPPER WITH FULL DEBUG LOGGING
// ----------------------------------------------------------------
async function requestTelegram(method: string, body: any) {
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;

        console.log("➡️ Sending Telegram Request:", {
            method,
            url,
            body,
        });

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!data.ok) {
            console.error("❌ Telegram API Error:", data);
            return { ok: false, error: data };
        }

        console.log("⬅️ Telegram Response:", data);

        return { ok: true, result: data.result };
    } catch (err: any) {
        console.error("❌ Telegram Request Exception:", err);
        return { ok: false, error: err.message || "Unknown error" };
    }
}

// ----------------------------------------------------------------
// PARSE SANITY PORTABLE TEXT TO MARKDOWN
// ----------------------------------------------------------------
function parsePortableText(content: any[]) {
    if (!Array.isArray(content)) return "";

    let text = "";

    for (const block of content) {
        if (block._type === "block") {
            const line = (block.children || [])
                .map((c: any) => {
                    let t = c.text || "";
                    if (c.marks?.includes("strong")) t = `*${t}*`;
                    if (c.marks?.includes("em")) t = `_${t}_`;
                    return t;
                })
                .join("");
            text += line + "\n\n";
        }
    }

    return text.trim();
}

// ----------------------------------------------------------------
// BUILD SANITY CDN URLs
// ----------------------------------------------------------------
function buildSanityImageURL(ref: string) {
    // ref example: image-abc123-800x600-png
    const [_, id, dimension, ext] = ref.split("-");
    return `https://cdn.sanity.io/images/${PROJECT_ID}/production/${id}-${dimension}.${ext}`;
}

function buildSanityFileURL(ref: string) {
    // ref example: file-abc123-pdf
    const [_, id, ext] = ref.split("-");
    return `https://cdn.sanity.io/files/${PROJECT_ID}/production/${id}.${ext}`;
}

// ----------------------------------------------------------------
// MAIN EXPORTED FUNCTION
// ----------------------------------------------------------------
export async function sendTelegramMessage(rawTelegramId: any, campaign: any, subscriber: any = {}) {
    try {
        console.log("📨 Preparing Telegram Send For:", {
            rawTelegramId,
            campaignId: campaign?._id,
            subscriberName: subscriber?.firstName
        });

        // --- TELEGRAM ID FIX ---
        const telegramId = Number(rawTelegramId);

        if (!telegramId || Number.isNaN(telegramId)) {
            console.error("❌ Invalid telegramId:", rawTelegramId);
            return { ok: false, error: "Invalid chat_id" };
        }

        // --- CONTENT PARSING & PERSONALIZATION ---
        let text = parsePortableText(campaign.content);

        // Replace {{firstName}} with actual name or fallback
        const name = subscriber?.firstName || 'Friend';
        text = text.replace(/{{firstName}}/g, name);

        console.log("📝 Parsed & Personalized text:", text);

        const imageBlock = campaign.content?.find((b: any) => b._type === "image");
        const pdfRef = campaign.attachPdf?.asset?._ref;

        // --- BUILD INLINE KEYBOARD FROM CTA BUTTONS ---
        const inlineKeyboard: any[] = [];

        if (campaign.ctaButtons && campaign.ctaButtons.length > 0) {
            campaign.ctaButtons.forEach((button: any) => {
                if (button.type === 'url' && button.url) {
                    // External link button
                    inlineKeyboard.push([{
                        text: button.text,
                        url: button.url
                    }]);
                } else {
                    // Tracking callback button
                    inlineKeyboard.push([{
                        text: button.text,
                        callback_data: `track_${campaign._id}_${button.text.substring(0, 20)}`
                    }]);
                }
            });
        }

        // --- PDF PRIORITY ---
        if (pdfRef) {
            const pdfUrl = buildSanityFileURL(pdfRef);
            console.log("📎 Sending PDF:", pdfUrl);

            // Add PDF download button to inline keyboard
            inlineKeyboard.push([{ text: "📄 Download PDF", url: pdfUrl }]);

            return await requestTelegram("sendDocument", {
                chat_id: telegramId,
                document: pdfUrl,
                caption: text.slice(0, 1024),
                parse_mode: "Markdown",
                reply_markup: inlineKeyboard.length > 0 ? {
                    inline_keyboard: inlineKeyboard
                } : undefined,
            });
        }

        // --- IMAGE SECOND PRIORITY ---
        if (imageBlock?.asset?._ref) {
            const imageUrl = buildSanityImageURL(imageBlock.asset._ref);
            console.log("🖼 Sending Image:", imageUrl);

            return await requestTelegram("sendPhoto", {
                chat_id: telegramId,
                photo: imageUrl,
                caption: text.slice(0, 1024),
                parse_mode: "Markdown",
                reply_markup: inlineKeyboard.length > 0 ? {
                    inline_keyboard: inlineKeyboard
                } : undefined,
            });
        }

        // --- TEXT FALLBACK ---
        console.log("✉️ Sending Text-only message");

        return await requestTelegram("sendMessage", {
            chat_id: telegramId,
            text: text || "New message from Aligoo",
            parse_mode: "Markdown",
            disable_web_page_preview: true,
            reply_markup: inlineKeyboard.length > 0 ? {
                inline_keyboard: inlineKeyboard
            } : undefined,
        });
    } catch (err: any) {
        console.error("❌ sendTelegramMessage Fatal Error:", err);
        return { ok: false, error: err };
    }
}
