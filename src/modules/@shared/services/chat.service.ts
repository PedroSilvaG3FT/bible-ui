import { ChatUtil } from "../util/chat.util";
import {
  IChatSendMessageRequest,
  IChatStreamCallback,
} from "../interfaces/chat.interface";

export class ChatService {
  static async sendChatMessageStream(
    body: IChatSendMessageRequest,
    callback: IChatStreamCallback
  ) {
    try {
      const path = `/chat/message/stream`;
      const response = await ChatUtil.handleRequestStream(path, body);
      await ChatUtil.handleReceiveStream(response, callback);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
