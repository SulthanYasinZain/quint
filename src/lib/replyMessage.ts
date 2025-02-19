export async function replyMessage(replyToken: string, text: string) {
  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("LINE API error:", errorData);
    }

    return response.ok;
  } catch (error) {
    console.error("Error sending reply:", error);
    return false;
  }
}
