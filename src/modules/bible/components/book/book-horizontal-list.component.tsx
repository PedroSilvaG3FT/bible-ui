import BookCardComponent from "./book-card.component";
import Each from "@/modules/@shared/components/utils/each";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  title: string;
  data: IBibleItem[];
}
export default function BookHorizontalListComponent(props: IProps) {
  const { title, data } = props;

  return (
    <section>
      <h3>{title}</h3>

      <section className="py-6 flex gap-6 overflow-x-auto">
        <Each
          data={data}
          render={(item) => <BookCardComponent data={item} />}
        />
      </section>
    </section>
  );
}
