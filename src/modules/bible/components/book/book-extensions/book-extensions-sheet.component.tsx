import BookExtensions from ".";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/design/components/ui/button";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/design/components/ui/sheet";
import bibleStore from "@/store/bible.store";

interface IProps {
  book: IBibleItem;
  chapter: number;
}

export default function BookExtensionsSheetComponent(props: IProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const _bibleStore = bibleStore((state) => state);

  useEffect(() => {
    setOpen(false);
  }, [location, _bibleStore.version]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mobile:flex hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[100dvw] p-4 pt-16">
        <BookExtensions {...props} />
      </SheetContent>
    </Sheet>
  );
}
