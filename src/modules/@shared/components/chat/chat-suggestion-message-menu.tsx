import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/design/components/ui/dropdown-menu";

import Each from "../utils/each";
import { Button } from "@/design/components/ui/button";
import { BotMessageSquare, GripVertical } from "lucide-react";
import { CHAT_SUGGESTIONS } from "../../constants/chat-suggention.constant";

interface IChatSuggestionMessageMenuProps {
  isDisabled?: boolean;
  onSelectMessage: (message: string) => void;
}

export default function ChatSuggestionMessageMenu(
  props: IChatSuggestionMessageMenuProps
) {
  const { onSelectMessage, isDisabled = false } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isDisabled}>
        <Button variant="ghost">
          <BotMessageSquare />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-96" isShowBackdrop>
        <DropdownMenuLabel>Sugestões</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Each
          data={CHAT_SUGGESTIONS}
          render={(item) => (
            <DropdownMenuItem
              onClick={() => onSelectMessage(item)}
              className="cursor-pointer text-sm!"
            >
              <GripVertical className="mr-2 w-4 h-4 text-foreground/40" />
              {item}
            </DropdownMenuItem>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
