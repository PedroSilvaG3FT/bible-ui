import Show from "../utils/show";
import Each from "../utils/each";
import { cn } from "@/design/lib/utils";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";
import { useChat } from "@/contexts/chat.context";
import { Button } from "@/design/components/ui/button";
import ChatInitialContent from "./chat-initial-content";
import { IChatMessage } from "../../interfaces/chat.interface";

interface IChatConversationProps {
  className?: string;
  data: IChatMessage[];
  onSelectInitialMessage: (message: string) => void;
}

export default function ChatConversation(props: IChatConversationProps) {
  const { data, className, onSelectInitialMessage } = props;
  const { isAiTyping, handleClearMessages } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    if (data.length) scrollToBottom();
  }, [data]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAiTyping) {
      scrollToBottom();
      interval = setInterval(scrollToBottom, 100);
    } else if (!isAiTyping && !!data.length) {
      setTimeout(() => scrollToBottom(), 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAiTyping, data]);

  return (
    <section
      ref={scrollRef}
      className={cn(
        "pb-[85px] invisible-scroll w-full overflow-y-auto scroll-smooth",
        className
      )}
    >
      <Show>
        <Show.When condition={!data.length}>
          <ChatInitialContent
            isHideSuggestion={false}
            onSelectMessage={onSelectInitialMessage}
          />
        </Show.When>
        <Show.Else>
          <section className="w-full pb-4 flex gap-4 flex-col">
            <Each
              data={data}
              render={(message) => (
                <article className="w-full flex flex-col">
                  <ChatMessage data={message} />
                </article>
              )}
            />

            {data.length >= 2 && (
              <footer className="w-full flex items-center justify-end">
                <Button
                  size="xs"
                  disabled={isAiTyping}
                  onClick={handleClearMessages}
                >
                  Limpar conversa
                </Button>
              </footer>
            )}
          </section>
        </Show.Else>
      </Show>
    </section>
  );
}
