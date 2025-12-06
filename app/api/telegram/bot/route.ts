import { Bot, InlineKeyboard } from "gramio";
import { client } from "@/src/sanity/client";

export const dynamic = "force-dynamic";

// Initialize Bot with the Token
const bot = new Bot(process.env.TELEGRAM_CLIENT_BOT_TOKEN as string)
    .command("start", async (context) => {
        const { id, firstName, username } = context.from!;

        // FIXED: Manually parse payload to avoid [object Object]
        // context.text is like "/start instagram"
        const textParts = context.text?.split(" ") || [];
        const payload = textParts.length > 1 ? textParts[1] : undefined;

        console.log("🔍 Debug Payload:", { fullText: context.text, parsedPayload: payload });

        // Refresh commands menu (ensure it runs in serverless)
        await bot.api.setMyCommands({
            commands: [
                { command: "start", description: "Subscribe to updates" },
                { command: "help", description: "Show available commands" },
                { command: "unsubscribe", description: "Stop receiving messages" },
                { command: "resubscribe", description: "Opt back in" }
            ]
        } as any).catch(err => console.error("Failed to set commands:", err));

        const docId = `subscriber-${id}`;

        // Create if not exists
        await client.createIfNotExists({
            _id: docId,
            _type: "subscriber",
            telegramId: id,
            firstName: firstName,
            username: username,
            joinedAt: new Date().toISOString(),
            isActive: true,
            tags: [],
            lastActive: new Date().toISOString(),
            source: payload || "direct"
        });

        // Always update these fields for existing users
        const updateData: any = {
            lastActive: new Date().toISOString(),
            isActive: true // Reactivate if they were unsubscribed
        };

        // Update source if payload exists (from deep link)
        if (payload) {
            updateData.source = payload;
        }

        await client.patch(docId).set(updateData).commit();

        // Fetch updated subscriber
        const subscriber = await client.getDocument(docId);

        if (!subscriber?.phone) {
            return context.send("Welcome to Aligoo! 🚀\n\nTo get started, please share your phone number so we can send you the exclusive updates.", {
                reply_markup: {
                    keyboard: [[{ text: "📱 Share My Phone Number", request_contact: true }]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }

        if (!subscriber.tags?.includes("confirmed")) {
            // New Flow: If phone exists but not confirmed, go to services
            const currentServices = subscriber.services || [];
            return context.send(
                "Thanks! Which services are you interested in? (Select up to 2)",
                { reply_markup: getServiceKeyboard(currentServices) }
            );
        }

        return context.send("You are already subscribed! 🎉");
    })
    .command("unsubscribe", async (context) => {
        const { id } = context.from!;
        const docId = `subscriber-${id}`;

        try {
            // Set user as inactive
            await client.patch(docId).set({
                isActive: false,
                lastActive: new Date().toISOString()
            }).commit();

            return context.send(
                "✅ You've been unsubscribed successfully.\n\n" +
                "You won't receive marketing messages anymore.\n\n" +
                "Changed your mind? Use /resubscribe anytime to opt back in.\n\n" +
                "Need help? Contact us:\n" +
                "📱 +251910584712\n" +
                "💬 @findusontelegram"
            );
        } catch (error) {
            console.error("Unsubscribe error:", error);
            return context.send("Sorry, something went wrong. Please try again or contact support.");
        }
    })
    .command("resubscribe", async (context) => {
        const { id } = context.from!;
        const docId = `subscriber-${id}`;

        try {
            // Set user as active again
            await client.patch(docId).set({
                isActive: true,
                lastActive: new Date().toISOString()
            }).commit();

            return context.send(
                "🎉 Welcome back!\n\n" +
                "You're now resubscribed and will receive our updates again.\n\n" +
                "Use /help to see all available commands."
            );
        } catch (error) {
            console.error("Resubscribe error:", error);
            return context.send("Sorry, something went wrong. Please try again or contact support.");
        }
    })
    .command("help", async (context) => {
        return context.send(
            "🤖 *Aligoo Marketing Bot*\n\n" +
            "*Available Commands:*\n" +
            "/start - Subscribe to updates\n" +
            "/unsubscribe - Stop receiving messages\n" +
            "/resubscribe - Opt back in\n" +
            "/help - Show this message\n\n" +
            "*Contact Us:*\n" +
            "📱 Phone: +251910584712\n" +
            "💬 Telegram: @findusontelegram\n\n" +
            "We're here to help! 🚀",
            { parse_mode: "Markdown" }
        );
    })
    .on("message", async (context) => {
        // FIXED: context.from is available on message events
        if (!context.from) return;

        const { id } = context.from;
        const docId = `subscriber-${id}`;

        // Update lastActive on any message
        await client.patch(docId).set({ lastActive: new Date().toISOString() }).commit();

        // FIXED: Access contact directly from context (not context.message.contact)
        // GramIO merges message properties into context
        if (context.contact) {
            // FIXED: Use camelCase (phoneNumber)
            const phone = context.contact.phoneNumber;

            await client.patch(docId).set({ phone }).commit();

            // New Flow: After phone, go to services
            const subscriber = await client.getDocument(docId);
            const currentServices = subscriber?.services || [];

            return context.send(
                "Thanks! Which services are you interested in? (Select up to 2)",
                { reply_markup: getServiceKeyboard(currentServices) }
            );
        }

        // HANDLE CONFIRMATION (Final Step)
        if (context.text === "✅ Confirm Subscription") {
            // Add 'confirmed' tag
            await client.patch(docId)
                .setIfMissing({ tags: [] })
                .append("tags", ["confirmed"])
                .commit();

            await context.send("You're all set! 🎉\n\nHere is your free guide.");
            return;
        }
    })
    .on("callback_query", async (context) => {
        // Handle inline button clicks
        const userId = context.from.id;
        const docId = `subscriber-${userId}`;
        const callbackData = context.data; // e.g., "track_campaign-123_Read More"

        console.log("🔘 Button clicked:", { userId, callbackData });

        // 1. Update lastActive
        await client.patch(docId).set({
            lastActive: new Date().toISOString()
        }).commit();

        // 2. Track button click for analytics
        if (callbackData.startsWith('track_')) {
            const parts = callbackData.split('_');
            const campaignId = parts[1];
            const buttonText = parts.slice(2).join('_');

            try {
                await client.create({
                    _type: 'interaction',
                    subscriber: { _type: 'reference', _ref: docId },
                    campaign: { _type: 'reference', _ref: campaignId },
                    action: 'button_click',
                    buttonText: buttonText,
                    timestamp: new Date().toISOString()
                });
                console.log("✅ Interaction logged");
            } catch (error) {
                console.error("❌ Failed to log interaction:", error);
            }
        }

        // 3. Handle Service Selection
        if (callbackData.startsWith('service_')) {
            const serviceId = callbackData.replace('service_', '');

            // Fetch current subscriber
            const subscriber = await client.getDocument(docId);
            const currentServices = subscriber?.services || [];
            let newServices = [...currentServices];

            if (serviceId === 'done') {
                // Save and move to confirmation
                if (context.message) {
                    await context.message.editText("✅ Preferences saved!");
                }

                return context.send("One last step. Please confirm you want to receive our marketing updates.", {
                    reply_markup: {
                        keyboard: [[{ text: "✅ Confirm Subscription" }]],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }

            // Toggle service
            if (newServices.includes(serviceId)) {
                newServices = newServices.filter(s => s !== serviceId);
            } else {
                if (newServices.length >= 2) {
                    return context.answerCallbackQuery({
                        text: "⚠️ You can only select up to 2 services.",
                        show_alert: true
                    });
                }
                newServices.push(serviceId);
            }

            // Update Sanity
            // Ensure we are patching the correct document ID
            console.log(`Updating services for ${docId}:`, newServices);
            await client.patch(docId).set({ services: newServices }).commit();

            // Update Keyboard
            try {
                if (context.message) {
                    await context.message.editReplyMarkup(getServiceKeyboard(newServices));
                }
            } catch (e) {
                // Ignore "message is not modified" error
            }

            return context.answerCallbackQuery();
        }

        // 4. Acknowledge other clicks
        await context.answerCallbackQuery({
            text: "✅ Thanks for your interest!"
        });
    });

const getServiceKeyboard = (selected: string[]) => {
    const services = [
        { id: 'web-design', label: '🎨 Web Design' },
        { id: 'web-redesign', label: '🔄 Web Redesign (Upgrade)' },
        { id: 'seo', label: '🔍 SEO' },
        { id: 'facebook-ads', label: '📘 FB & Insta Ads' },
        { id: 'tiktok-ads', label: '🎵 TikTok Ads' }
    ];

    const keyboard = new InlineKeyboard();

    services.forEach(s => {
        const isSelected = selected.includes(s.id);
        const text = isSelected ? `✅ ${s.label}` : s.label;
        keyboard.text(text, `service_${s.id}`).row();
    });

    keyboard.text("Done", "service_done");
    return keyboard;
};

// FIXED: Manual Webhook Handler for Next.js App Router
export const POST = async (req: Request) => {
    try {
        const update = await req.json();
        await bot.updates.handleUpdate(update);
        return new Response("ok");
    } catch (e) {
        console.error("Bot Error:", e);
        return new Response("Error", { status: 500 });
    }
};
