import { cn } from "@/design/lib/utils";
import { useNavigate } from "react-router-dom";
import { useBible } from "@/contexts/bible.context";
import { Button } from "@/design/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  chapter: number;
  className?: string;
  currentBook: IBibleItem;
}
export default function BookPaginationComponent(props: IProps) {
  const { chapter, className, currentBook } = props;
  const { data } = useBible();
  const navigate = useNavigate();

  const isGenesis = currentBook.abbrev === "gn";
  const bookIndex = data.findIndex(
    (item) => item.abbrev === currentBook.abbrev
  );

  const handlePrev = () => {
    const isFirst = chapter === 1;
    if (!isFirst) navigate(`/${currentBook.abbrev}/${chapter - 1}`);
    else {
      const prevBook = data[bookIndex - 1];
      if (prevBook) navigate(`/${prevBook.abbrev}/${prevBook.chapters.length}`);
    }
  };

  const handleNext = () => {
    const isLast = chapter === currentBook.chapters.length;

    if (!isLast) navigate(`/${currentBook.abbrev}/${chapter + 1}`);
    else {
      const nextBook = data[bookIndex + 1];
      if (nextBook) navigate(`/${nextBook.abbrev}/1`);
    }
  };

  return (
    <section className={cn(className, "flex gap-2 items-center")}>
      <Button
        size="icon"
        variant="ghost"
        onClick={handlePrev}
        disabled={isGenesis && chapter === 1}
      >
        <ChevronLeft />
      </Button>

      <Button size="icon" variant="ghost" onClick={handleNext}>
        <ChevronRight />
      </Button>
    </section>
  );
}
