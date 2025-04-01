import { useRef } from "react";
import BookCardComponent from "./book-card.component";
import { Button } from "@/design/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Each from "@/modules/@shared/components/utils/each";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  title: string;
  data: IBibleItem[];
}

export default function BookHorizontalListComponent(props: IProps) {
  const { title, data } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <nav className="flex items-center justify-between">
        <h3>{title}</h3>

        <section>
          <Button size="icon" variant="ghost" onClick={() => scroll("left")}>
            <ChevronLeft />
          </Button>

          <Button size="icon" variant="ghost" onClick={() => scroll("right")}>
            <ChevronRight />
          </Button>
        </section>
      </nav>

      <section
        ref={scrollRef}
        className="py-6 flex gap-6 overflow-x-auto scroll-smooth"
      >
        <Each
          data={data}
          render={(item) => <BookCardComponent data={item} />}
        />
      </section>
    </section>
  );
}
