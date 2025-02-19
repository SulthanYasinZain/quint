import { NextRequest, NextResponse } from "next/server";
import { RequestBody } from "../types";
import { replyMessage } from "@/lib/replyMessage";
import getDate from "@/lib/getDate";

export async function POST(req: NextRequest) {
  try {
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
      getDate(replyToken);
    }

    return NextResponse.json({ message: "Event processed" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
