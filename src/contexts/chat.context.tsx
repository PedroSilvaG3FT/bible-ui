import {
  IChatMessage,
  IChatStreamCallback,
  IChatSendMessageRequest,
} from "@/modules/@shared/interfaces/chat.interface";
import { EChatRole } from "@/modules/@shared/enums/chat.enum";
import React, { createContext, useContext, useState } from "react";
import { ChatService } from "@/modules/@shared/services/chat.service";

interface IChatContext {
  isLoading: boolean;
  isAiTyping: boolean;
  messages: IChatMessage[];
  setIsAiTyping: React.Dispatch<React.SetStateAction<boolean>>;

  handleInit: () => void;
  handleRetry: () => void;
  handleClearMessages: () => void;
  handleSend: (content: string) => void;
}

interface IChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<IChatContext>({
  messages: [],
  isLoading: false,
  isAiTyping: false,

  handleInit: () => {},
  handleSend: () => {},
  handleRetry: () => {},
  setIsAiTyping: () => {},
  handleClearMessages: () => {},
});

const ChatProvider: React.FC<IChatProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const [retryData, setRetryData] = useState<IChatSendMessageRequest>(
    {} as IChatSendMessageRequest
  );

  const handleInit = () => {
    setMessages([]);
    setIsAiTyping(false);
  };

  const handleRetry = () => handleSend(retryData.message);
  const handleClearMessages = () => setMessages([]);

  const handleError = (messages: IChatMessage[]) => {
    setIsLoading(false);
    setMessages([
      ...messages,
      { role: EChatRole.ERROR, content: `Ocorreu um erro ao enviar menssagem` },
    ]);
  };

  const handleSend = (content: string) => {
    console.log(content);
    const newMessages: IChatMessage[] = [
      ...messages,
      { content, role: EChatRole.USER },
      { content: "", role: EChatRole.IA },
    ];

    const messagesDTO = newMessages.filter(
      ({ role }) => role !== EChatRole.ERROR
    );

    const callbacks: IChatStreamCallback = {
      onReceive: handleReceiveStream,
      onComplete: () => {
        setIsLoading(false);
        setIsAiTyping(false);
        setMessages((value) => [...value]);
      },
    };

    setIsLoading(true);
    setMessages([...newMessages]);
    setRetryData({ message: content, history: [] });

    handleSendMessage(content, messagesDTO, callbacks);
  };

  const handleReceiveStream = (content: string) => {
    console.log(content);
    setMessages((value) => {
      const updatedMessages = [...value];
      const lastMessageIndex = updatedMessages.length - 1;
      const lastMessageData = updatedMessages[lastMessageIndex];

      if (lastMessageIndex >= 0 && lastMessageData.role === EChatRole.IA) {
        updatedMessages[lastMessageIndex] = { ...lastMessageData, content };
      }

      return updatedMessages;
    });
  };

  const handleSendMessage = (
    message: string,
    messages: IChatMessage[],
    callbacks: IChatStreamCallback
  ) => {
    setMessages(messages);

    ChatService.sendChatMessageStream({ message, history: [] }, callbacks)
      .then(() => {})
      .catch(() => handleError(messages));
  };

  const providerValue: IChatContext = {
    messages,
    isLoading,
    isAiTyping,

    handleInit,
    handleSend,
    handleRetry,
    setIsAiTyping,
    handleClearMessages,
  };

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };

export const useChat = () => {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("useChat must be used within a ChatProvider");

  return context;
};
