import BookSearchComponent from "../book-search.component";
import { Separator } from "@/design/components/ui/separator";
import VersionsListComponent from "../../versions-list.component";
import BookChapterListComponent from "../book-chapter-list.component";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  book: IBibleItem;
  chapter: number;
}
export default function BookOptionsComponent(props: IProps) {
  return (
    <section className="pt-4">
      <BookSearchComponent />

      <Separator className="my-4" />

      <h5 className="my-4 text-sm text-foreground/50">Capitulos:</h5>
      <BookChapterListComponent {...props} />

      <Separator className="my-4" />

      <h5 className="text-foreground/50 text-sm mb-4">Versões:</h5>
      <VersionsListComponent />
    </section>
  );
}
