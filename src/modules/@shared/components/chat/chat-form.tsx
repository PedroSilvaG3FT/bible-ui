import Show from "../utils/show";
import { cn } from "@/design/lib/utils";
import { Button } from "@/design/components/ui/button";
import { KeyboardEvent, useRef, useState } from "react";
import { LucideIcon, SendHorizonal } from "lucide-react";
import AppLoadingIndicator from "../loading/loading-indicator";
import ChatSuggestionMessageMenu from "./chat-suggestion-message-menu";

interface IChatFormProps {
  icon?: LucideIcon;
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
  formClassName?: string;

  isHideSuggestion?: boolean;
  isSuggestionDisabled?: boolean;
  onSubmit: (data: string) => void;
}

export default function ChatForm(props: IChatFormProps) {
  const {
    onSubmit,
    className,
    formClassName,
    isLoading = false,
    isHideSuggestion = true,
    icon: Icon = SendHorizonal,
    isSuggestionDisabled = false,
    placeholder = "Insira sua pergunta...",
  } = props;

  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const hasMessage = !!message && !!message.trim().length;

    if (e.key === "Enter" && !e.shiftKey && hasMessage && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("comming soon");
  };
  // const handleSubmit = () => {
  //   onSubmit(message);
  //   setMessage("");
  // };

  return (
    <section className={cn("bg-background  w-full pt-4", className)}>
      <form
        className={cn(
          "shadow-md border border-foreground/10 p-2 pl-8 w-full flex items-center rounded-2xl overflow-hidden",
          formClassName
        )}
      >
        <textarea
          rows={1}
          required
          value={message}
          ref={textareaRef}
          disabled={isLoading}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-sm appearance-none outline-hidden bg-transparent text-foreground/60 resize-none whitespace-pre-wrap overflow-y-auto place-content-center"
        />

        <section className="flex gap-2 items-center">
          <Show>
            <Show.When condition={!isHideSuggestion}>
              <ChatSuggestionMessageMenu
                onSelectMessage={(data) => onSubmit(data)}
                isDisabled={isSuggestionDisabled || isLoading}
              />
            </Show.When>
          </Show>

          <Button
            size="icon"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading || !message.trim().length}
            className="flex items-center justify-center transition-all duration-500 hover:scale-90"
          >
            <Show>
              <Show.When condition={isLoading}>
                <AppLoadingIndicator className="w-6" />
              </Show.When>
              <Show.Else>
                <Icon className="h-4 w-4" />
              </Show.Else>
            </Show>
          </Button>
        </section>
      </form>
    </section>
  );
}
