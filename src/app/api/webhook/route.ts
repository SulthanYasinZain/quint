export async function POST(req: any) {
  const body = await req.json();
  const { events } = body;

  if (!events || events.length === 0) {
    return Response.json({ message: "No events received" }, { status: 200 });
  }

  const { replyToken, message } = events[0];

  if (message?.type === "text" && message.text === "!date") {
    const today = new Date().toLocaleDateString("id-ID");
    await replyMessage(replyToken, `Hari ini: ${today}`);
  }

  return Response.json({ message: "Event processed" });
}

async function replyMessage(replyToken: any, text: string) {
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
