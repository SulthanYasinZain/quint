export interface Event {
  replyToken: string;
  message: {
    type: string;
    text: string;
  };
}

export interface RequestBody {
  events: Event[];
}
