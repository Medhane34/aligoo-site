import { NextRequest } from "next/server";
import { client } from "@/src/sanity/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: subscriberId } = await params;

        // 1. Fetch subscriber info
        const subscriber = await client.getDocument(subscriberId);

        if (!subscriber) {
            return Response.json({ error: "Subscriber not found" }, { status: 404 });
        }

        // 2. Fetch all interactions for this subscriber
        const interactions = await client.fetch(`
            *[_type == "interaction" && subscriber._ref == $subscriberId] 
            | order(timestamp desc) {
                _id,
                action,
                buttonText,
                timestamp,
                campaign->{
                    _id,
                    title,
                    sentAt
                }
            }
        `, { subscriberId });

        // 3. Fetch all sent campaigns (we'll check delivery in timeline)
        const campaigns = await client.fetch(`
            *[_type == "campaign" && status == "sent"] 
            | order(sentAt desc) {
                _id,
                title,
                sentAt,
                status
            }
        `);

        // 4. Build unified timeline
        const timeline = [
            // Add interactions
            ...interactions.map((i: any) => ({
                type: 'interaction',
                action: i.action,
                buttonText: i.buttonText,
                campaign: i.campaign?.title,
                timestamp: i.timestamp
            })),
            // Add campaigns (assume all were delivered for now)
            ...campaigns.map((c: any) => ({
                type: 'campaign',
                title: c.title,
                delivered: true, // We'll enhance this later with actual delivery tracking
                timestamp: c.sentAt
            })),
            // Add joined event
            {
                type: 'status',
                action: 'joined',
                timestamp: subscriber.joinedAt
            }
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        // 5. Calculate stats
        const stats = {
            totalCampaigns: campaigns.length,
            totalClicks: interactions.filter((i: any) => i.action === 'button_click').length,
            lastActive: subscriber.lastActive
        };

        return Response.json({
            subscriber,
            timeline,
            stats
        });

    } catch (error: any) {
        console.error("Error fetching subscriber history:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
