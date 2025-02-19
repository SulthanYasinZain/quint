import { replyMessage } from "./replyMessage";

export default function getTest(replyToken: string) {
  replyMessage(replyToken, `Ini Test dari getTest`);
}
