import { useBible } from "@/contexts/bible.context";
import { Separator } from "@/design/components/ui/separator";
import BibleHeroComponent from "../components/home/bible-hero.component";
import BookHorizontalListComponent from "../components/book/book-horizontal-list.component";

export default function BibleHomePage() {
  const { oldTestamentData, newTestamentData } = useBible();

  return (
    <>
      <BibleHeroComponent />

      <section className="app-container py-6">
        <BookHorizontalListComponent
          data={oldTestamentData}
          title={"Antigo testamento"}
        />

        <Separator className="my-4" />

        <BookHorizontalListComponent
          data={newTestamentData}
          title={"Novo testamento"}
        />
      </section>
    </>
  );
}
