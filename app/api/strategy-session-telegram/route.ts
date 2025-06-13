// app/api/strategy-session-telegram/route.ts
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
        { status: 400 }
      );
    }

    // Destructure all expected fields from your multi-step form
    const {
      name,
      position,
      company,
      product,
      industry,
      years,
      employees,
      strengths,
      marketing,
      online,
      challenge,
      pastSolutions,
      timeline,
      phone,
    } = data;

    // Validate required fields (adjust as needed)
    if (
      !name ||
      !position ||
      !company ||
      !product ||
      !industry ||
      !years ||
      !employees ||
      !challenge ||
      !timeline ||
      !phone
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct the Telegram message
    const telegramMessage = `
<b>New Strategy Session Submission</b>
👤 Name: ${name}
🏢 Position: ${position}
🏢 Company: ${company}
🛒 Product/Service: ${product}
🏭 Industry: ${industry}
📆 Years in Business: ${years}
👥 Employees: ${employees}
💪 Strengths/Weaknesses: ${strengths || "N/A"}
📣 Marketing: ${marketing || "N/A"}
🌐 Online Presence: ${online || "N/A"}
🚩 Challenge: ${challenge}
🛠️ Past Solutions: ${pastSolutions || "N/A"}
⏰ Timeline: ${timeline}
📞 Phone: ${phone}
    `;

    // Validate environment variables for Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { message: "Telegram bot token or chat ID not configured" },
        { status: 500 }
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
          parse_mode: "HTML",
        }),
      }
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
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/strategy-session-telegram:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
