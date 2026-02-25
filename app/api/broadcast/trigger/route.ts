// app/api/broadcast/trigger/route.ts
import { NextResponse } from "next/server";

import { automationClient } from "@/src/sanity/client";
import { sendTelegramMessage } from "@/lib/telegram";
import { isAutomationEnabled } from "@/lib/automation-guard";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Kill switch check
  if (!isAutomationEnabled()) {
    return NextResponse.json({ paused: "Automations are disabled" });
  }

  const { campaignId, campaignData } = await req.json();

  try {
    // OPTIMIZATION: Use campaign data from webhook if available (saves 1 Sanity read)
    const campaign =
      campaignData || (await automationClient.getDocument(campaignId));

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    // Prevent double-sending
    if (campaign.status === "sent" || campaign.status === "sending") {
      return NextResponse.json({ already: "sent or sending" });
    }

    // Fetch subscribers based on segmentation
    let query = `*[_type == "subscriber" && isActive == true]{telegramId, firstName}`;
    let params = {};

    if (campaign.service) {
      query = `*[_type == "subscriber" && isActive == true && $service in services]{telegramId, firstName}`;
      params = { service: campaign.service };
    }

    const subscribers = await automationClient.fetch(query, params);

    if (!subscribers || subscribers.length === 0) {
      // Single write for "no subscribers" case
      await automationClient
        .patch(campaignId)
        .set({
          status: "failed",
          debugLog: "No active subscribers found.",
        })
        .commit();

      return NextResponse.json({ error: "No subscribers" });
    }

    let sent = 0,
      failed = 0;
    const errors: any[] = [];

    for (const sub of subscribers) {
      const result = await sendTelegramMessage(sub.telegramId, campaign, sub);

      if (result.ok) sent++;
      else {
        failed++;
        errors.push({ id: sub.telegramId, error: result.error });
      }
    }

    const finalStatus = failed > 0 && sent === 0 ? "failed" : "sent";
    const debugMessage =
      errors.length > 0
        ? `Completed with errors. Failed IDs: ${JSON.stringify(errors)}`
        : `Success! Sent to ${sent} subscribers.`;

    // OPTIMIZATION: Single write at the end (removed separate "sending" status update)
    await automationClient
      .patch(campaignId)
      .set({
        status: finalStatus,
        sentAt: new Date().toISOString(),
        stats: { totalSubscribers: subscribers.length, sent, failed },
        debugLog: debugMessage,
      })
      .commit();

    return NextResponse.json({
      sent,
      failed,
      total: subscribers.length,
      errors,
    });
  } catch (err: any) {
    console.error("Broadcast Error:", err);

    // Try to log error to Sanity if possible
    try {
      await automationClient
        .patch(campaignId)
        .set({
          status: "failed",
          debugLog: `CRITICAL ERROR: ${err.message || JSON.stringify(err)}`,
        })
        .commit();
    } catch (e) {
      console.error("Failed to write error log to Sanity", e);
    }

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
