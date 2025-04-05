import Show from "../utils/show";
import Animate from "../utils/animate";
import { cn } from "@/design/lib/utils";
import { IconReload } from "@tabler/icons-react";
import { useChat } from "@/contexts/chat.context";
import { EChatRole } from "../../enums/chat.enum";
import ChatGradientLoading from "./chat-gradient-loading";
import { IChatMessage } from "../../interfaces/chat.interface";
import { Alert, AlertDescription } from "@/design/components/ui/alert";
import AppLoadingText from "../loading/loading-text";
import AppMarkdown from "../app-markdown";

interface IChatMessageProps {
  data: IChatMessage;
  className?: string;
}

export default function ChatMessage(props: IChatMessageProps) {
  const { data, className } = props;
  const { handleRetry, isLoading } = useChat();

  const isError = data.role === EChatRole.ERROR;
  const isUserMessage = data.role === EChatRole.USER;

  return (
    <Animate
      animation={isUserMessage ? "animate__fadeInRight" : "animate__fadeIn"}
    >
      <section
        className={cn(
          className,
          isUserMessage
            ? "self-end p-2 px-4 border border-foreground/10 rounded-2xl max-w-[70%]"
            : "self-start"
        )}
      >
        <Show>
          <Show.When condition={isUserMessage}>
            <p>{data.content}</p>
          </Show.When>
          <Show.When condition={isError}>
            <Alert variant="destructive" className="p-2">
              <AlertDescription className="flex gap-2 items-center">
                <IconReload
                  onClick={handleRetry}
                  className="cursor-pointer transition-all duration-500 hover:scale-95"
                />
                {data.content}
              </AlertDescription>
            </Alert>
          </Show.When>
          <Show.Else>
            <article className="grid gap-2">
              <nav className="flex gap-2 mb-4 items-center">
                <i className="h-4 w-4 rounded-full bg-linear-to-r from-pink-500 to-purple-500"></i>
                <h6 className="text-sm text-foreground/50">Agente IA</h6>
              </nav>

              <Show>
                <Show.When condition={isLoading && !data?.content}>
                  <div>
                    <AppLoadingText text="Refletindo..." />
                    <ChatGradientLoading isLoading={isLoading} />
                  </div>
                </Show.When>
                <Show.Else>
                  <AppMarkdown text={data?.content || ""} />
                </Show.Else>
              </Show>
            </article>
          </Show.Else>
        </Show>
      </section>
    </Animate>
  );
}
