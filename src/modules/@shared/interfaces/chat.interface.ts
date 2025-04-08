import { EChatEvent, EChatRole } from "../enums/chat.enum";

export interface IChatMessage {
  role: EChatRole;
  content: string;
}

export interface IChatSendMessageRequest {
  message: string;
  history: IChatMessage[];
}

export interface IChatEventPayload {
  name: string;
  data: string | string[];
  error: string | null;
}

export interface IChatEvent {
  event: EChatEvent;
  payload: IChatEventPayload;
}

export interface IChatStreamCallback
  extends Partial<{
    onReceive: (text: string) => void;
    onError: <Data>(error: Data) => void;
    onComplete: (content: string) => void;
  }> {}
