import { useNavigate } from "react-router-dom";
import { Button } from "@/design/components/ui/button";
import Each from "@/modules/@shared/components/utils/each";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import { cn } from "@/design/lib/utils";

interface IProps {
  book: IBibleItem;
  chapter?: number;
  className?: string;
}
export default function BookChapterListComponent(props: IProps) {
  const { book, chapter, className } = props;
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        "h-fit grid grid-cols-8 gap-2 overflow-y-auto max-h-72 invisible-scroll",
        className
      )}
    >
      <Each
        data={book.chapters}
        render={(_, index) => {
          const chapterNumber = index + 1;
          return (
            <Button
              className="w-10 focus-visible:ring-0 focus-visible:ring-offset-0"
              variant={chapter === chapterNumber ? "secondary" : "ghost"}
              onClick={() => navigate(`/${book.abbrev}/${chapterNumber}`)}
            >
              {chapterNumber}
            </Button>
          );
        }}
      />
    </section>
  );
}
