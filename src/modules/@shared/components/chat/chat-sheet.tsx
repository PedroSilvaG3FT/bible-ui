import Chat from "./chat";
import { cn } from "@/design/lib/utils";
import { ChevronLeft } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "@/design/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/design/components/ui/sheet";

interface IProps {
  children: ReactNode;
}
export default function ChatSheet(props: IProps) {
  const { children } = props;
  const [isFullSize, setIsFullSize] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          "transition-all duration-300 mobile:w-screen",
          isFullSize ? "min-w-[800px]" : "min-w-[400px]"
        )}
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsFullSize(!isFullSize)}
          className="scale-75 absolute top-[15%] -left-5 mobile:hidden tablet:hidden rounded-full"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isFullSize && "rotate-180"
            )}
          />
        </Button>

        <Chat />
      </SheetContent>
    </Sheet>
  );
}
