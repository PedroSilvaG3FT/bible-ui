import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/design/components/ui/dropdown-menu";

import Chat from "./chat";
import { useState } from "react";
import { cn } from "@/design/lib/utils";
import { Maximize2, Sparkles, X } from "lucide-react";
import { Button } from "@/design/components/ui/button";
import { Separator } from "@/design/components/ui/separator";

interface IChatWidgetProps {
  triggerClassName?: string;
}
export default function ChatWidget(props: IChatWidgetProps) {
  const { triggerClassName } = props;

  const [isFullSize, setIsFullSize] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "group fixed z-10 bottom-5 right-6 h-12 w-12 flex items-center justify-center rounded-full transition-all duration-500 hover:scale-110 hover:w-52",
            triggerClassName
          )}
        >
          <span className="mr-4 hidden group-hover:block">
            Conversar com Agente IA
          </span>
          <Sparkles />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        isShowBackdrop
        backdropClassName="backdrop-blur-[4px]"
        className={cn(
          "app-max-content transition-all duration-500",
          "w-[24rem] max-w-[calc(100vw-120px)] p-4 relative right-12 border-foreground/20 rounded-2xl",
          "mobile:right-4 mobile:w-full mobile:max-w-[calc(100vw-32px)]",
          isFullSize && "w-[72rem] "
        )}
      >
        <nav className="flex gap-2 items-center">
          <DropdownMenuItem className="p-0 rounded-md">
            <Button size="icon" variant="outline">
              <X className="w-5 h-5" />
            </Button>
          </DropdownMenuItem>

          <Button
            size="icon"
            variant="outline"
            className="mobile:hidden tablet:hidden"
            onClick={() => setIsFullSize(!isFullSize)}
          >
            <Maximize2 className="scale-x-[-1] w-4 h-4" />
          </Button>
        </nav>

        <Separator className="my-2 bg-foreground/10" />

        <Chat className={cn("h-[70vh] mobile:h-[75dvh]")} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
