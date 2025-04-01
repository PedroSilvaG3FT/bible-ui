import ChatForm from "./chat-form";
import { cn } from "@/design/lib/utils";
import { useChat } from "@/contexts/chat.context";
import ChatConversation from "./chat-conversation";

interface IChatProps {
  className?: string;
}

export default function Chat(props: IChatProps) {
  const { className } = props;
  const { messages, isLoading, isAiTyping, handleSend } = useChat();

  return (
    <section
      className={cn("relative h-full flex flex-col overflow-hidden", className)}
    >
      <ChatConversation
        data={messages}
        className="flex-grow"
        onSelectInitialMessage={handleSend}
      />

      <ChatForm
        onSubmit={handleSend}
        isLoading={isLoading || isAiTyping}
        className="mt-auto absolute bottom-0"
        isSuggestionDisabled={!messages.length}
      />
    </section>
  );
}
