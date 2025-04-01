import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useBible } from "@/contexts/bible.context";
import { Button } from "@/design/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Each from "@/modules/@shared/components/utils/each";
import BookExtensions from "../components/book/book-extensions";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import BookVersicleComponent from "../components/book/book-versicle.component";
import BookPaginationComponent from "../components/book/book-pagination.component";

export default function BibleBookPage() {
  const params = useParams();
  const { data } = useBible();
  const navigate = useNavigate();

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
  }, [data, params]);

  return (
    <section className="app-container grid gap-4 grid-cols-[1fr_300px] mobile:grid-cols-1">
      <article className="border-r pr-4 mr-4 mobile:pr-0 mobile:mr-0 mobile:border-r-0 mobile:pb-24">
        <nav className="flex items-center gap-4 mb-4 py-4 sticky top-0 left-0 bg-background">
          <Button size="icon" variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>

          <BookPaginationComponent
            className="ml-auto"
            currentBook={book}
            chapter={Number(params.chapter)}
          />
        </nav>

        <h1 className="text-center">{params.chapter}</h1>
        <h2 className="text-center mb-16">{book.name}</h2>

        <Each
          data={chapter}
          render={(item, index) => (
            <BookVersicleComponent content={item} number={index + 1} />
          )}
        />
      </article>

      <section className="sticky top-0 h-fit mobile:hidden">
        <BookExtensions book={book} chapter={Number(params.chapter)} />
      </section>
    </section>
  );
}
