import { replyMessage } from "./replyMessage";

export default function getDate(replyToken: string) {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  replyMessage(replyToken, `Hari ini: ${today}`);
}
