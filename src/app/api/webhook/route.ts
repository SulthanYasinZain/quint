import { NextRequest, NextResponse } from "next/server";

interface Event {
  replyToken: string;
  message: {
    type: string;
    text: string;
  };
}

interface RequestBody {
  events: Event[];
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { events } = body;

  if (!events || events.length === 0) {
    return NextResponse.json(
      { message: "No events received" },
      { status: 200 }
    );
  }

  const { replyToken, message } = events[0];

  if (message?.type === "text" && message.text === "!date") {
    const today = new Date().toLocaleDateString("id-ID");
    await replyMessage(replyToken, `Hari ini: ${today}`);
  }

  return NextResponse.json({ message: "Event processed" });
}

async function replyMessage(replyToken: string, text: string) {
  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  });

  return response.ok;
}
