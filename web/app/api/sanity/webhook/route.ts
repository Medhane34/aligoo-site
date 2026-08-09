// app/api/sanity/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { status: "error", message: "Invalid Signature" },
        { status: 401 },
      );
    }

    // Only process campaign documents
    if (body?._type === "campaign") {
      const campaignId = body._id;

      // OPTIMIZATION: Idempotency guard — skip if already sent/sending
      if (body.status === "sent" || body.status === "sending") {
        console.log(
          `⏭️ Webhook skipped: Campaign ${campaignId} is already ${body.status}`,
        );

        return NextResponse.json({ skipped: "already sent or sending" });
      }

      // Ensure siteUrl has no trailing slash and await the trigger fetch so serverless runtime does not abort it
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

      if (siteUrl) {
        const baseUrl = siteUrl.replace(/\/$/, "");
        try {
          const triggerRes = await fetch(`${baseUrl}/api/broadcast/trigger`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              campaignId,
              campaignData: body, // Pass the document from webhook payload
            }),
          });
          const triggerResult = await triggerRes.json();
          console.log(`✅ Webhook triggered broadcast for campaign ${campaignId}:`, triggerResult);
        } catch (e) {
          console.error("Async trigger failed", e);
        }
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("Webhook error:", err);

    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 },
    );
  }
}
