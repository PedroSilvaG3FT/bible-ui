import { useEffect, useState } from "react";
import { useBible } from "@/contexts/bible.context";
import { Button } from "@/design/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Each from "@/modules/@shared/components/utils/each";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTextToSpeech } from "@/hooks/text-to-speech.hook";
import BookExtensions from "../components/book/book-extensions";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import BookVersicleComponent from "../components/book/book-versicle.component";
import BookPaginationComponent from "../components/book/book-pagination.component";
import BookExtensionsSheetComponent from "../components/book/book-extensions/book-extensions-sheet.component";

export default function BibleBookPage() {
  const params = useParams();
  const { data } = useBible();
  const [animationParent] = useAutoAnimate();

  const navigate = useNavigate();
  const { isSpeaking, toggleSpeech } = useTextToSpeech();

  const [chapter, setChapter] = useState([]);
  const [book, setBook] = useState({} as IBibleItem);

  const setBookData = () => {
    const bookData = data?.find((item) => item.abbrev === params.book);

    if (bookData) {
      setBook(bookData);
      setChapter(bookData.chapters[Number(params.chapter) - 1]);
    }
  };

  useEffect(() => {
    setBookData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [data, params]);

  return (
    <section className="app-container grid gap-4 grid-cols-[1fr_400px] mobile:grid-cols-1">
      <article
        ref={animationParent}
        className="border-r pr-4 mr-4 mobile:pr-0 mobile:mr-0 mobile:border-r-0 mobile:pb-24"
      >
        <nav className="flex items-center justify-end gap-4 mb-4 sticky top-0 left-0 bg-background lg:py-4">
          <Button
            size="icon"
            variant="ghost"
            className="mr-auto"
            onClick={() => navigate("/")}
          >
            <ArrowLeft />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => toggleSpeech(chapter)}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>

          <BookExtensionsSheetComponent
            book={book}
            chapter={Number(params.chapter)}
          />

          <BookPaginationComponent
            currentBook={book}
            chapter={Number(params.chapter)}
          />
        </nav>

        <h1 className="text-center">{params.chapter}</h1>
        <h2 className="text-center mb-16">{book.name}</h2>

        <Each
          data={chapter}
          render={(item, index) => (
            <BookVersicleComponent
              content={item}
              book={book.abbrev}
              number={index + 1}
              chapter={Number(params.chapter)}
            />
          )}
        />
      </article>

      <section className="sticky top-0 h-[100dvh] mobile:hidden">
        <BookExtensions book={book} chapter={Number(params.chapter)} />
      </section>
    </section>
  );
}
