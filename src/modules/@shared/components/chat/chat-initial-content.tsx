import Each from "../utils/each";
import { Card } from "@/design/components/ui/card";
import { GripVertical, Sparkles } from "lucide-react";
import { CHAT_SUGGESTIONS } from "../../constants/chat-suggention.constant";

interface IChatInitialContentProps {
  isHideSuggestion?: boolean;
  onSelectMessage: (message: string) => void;
}

export default function ChatInitialContent(props: IChatInitialContentProps) {
  const { onSelectMessage, isHideSuggestion = true } = props;

  return (
    <article className="pb-4 h-full min-h-[530px] flex flex-col items-center justify-end">
      <Sparkles className="h-12 w-12 mb-4 text-foreground/40 self-start" />

      <h5 className="text-left self-start mb-6 text-foreground/40">
        Como posso te ajudar hoje?
      </h5>

      <span className="self-start mb-4 bg-linear-to-t from-sky-500 to-indigo-500 px-4 rounded-md cursor-default text-sm !font-semibold">
        Em breve
      </span>

      {!isHideSuggestion && (
        <section className="grid gap-2">
          <Each
            data={CHAT_SUGGESTIONS}
            render={(item) => (
              <Card
                onClick={() => onSelectMessage(item)}
                className="pointer-events-none p-4 text-sm flex gap-2 items-center cursor-pointer transition-transform duration-500 hover:scale-[0.99]"
              >
                <GripVertical className="w-4 h-4 text-foreground/40" />
                {item}
              </Card>
            )}
          />
        </section>
      )}
    </article>
  );
}
