// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    let data;

    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body: Expected JSON" },
        { status: 400 },
      );
    }

    const {
      fullName,
      countryCode,
      phoneNumber,
      companyName,
      serviceEnquiry,
      message,
      preferredCommunication,
      telegramUsername,
    } = data;

    // Validate required fields
    if (
      !fullName ||
      !countryCode ||
      !phoneNumber ||
      !serviceEnquiry ||
      !message ||
      !preferredCommunication
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Construct the Telegram message for the team
    const telegramMessage = `
New Contact Form Submission:

Full Name: ${fullName}
Phone: ${countryCode} ${phoneNumber}
Company Name: ${companyName || "N/A"}
Service Enquiry: ${serviceEnquiry}
Message: ${message}
Preferred Communication: ${preferredCommunication}
    `;

    // Validate environment variables for Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { message: "Telegram bot token or chat ID not configured" },
        { status: 500 },
      );
    }

    // Send the message to the Telegram group
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
        }),
      },
    );

    if (!telegramResponse.ok) {
      let errorDescription = "Unknown error";

      try {
        const errorData = await telegramResponse.json();

        errorDescription = errorData.description || errorDescription;
      } catch (jsonError) {
        console.error("Failed to parse Telegram API error:", jsonError);
      }

      return NextResponse.json(
        { message: `Failed to send message to Telegram: ${errorDescription}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
