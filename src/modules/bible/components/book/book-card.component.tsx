import { useState } from "react";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import BookSummaryModalComponent from "./book-summary-modal.component";

interface IProps {
  data: IBibleItem;
}
export default function BookCardComponent(props: IProps) {
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false);

  const imageURL = `https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

  return (
    <BookSummaryModalComponent
      data={data}
      isOpen={isOpen}
      backgroundImageURL={imageURL}
      onOpenChange={(data) => setIsOpen(data)}
    >
      <article className="cursor-pointer relative overflow-hidden rounded-2xl h-80 min-w-72 group transition-all duration-500 top-0 hover:scale-[0.99]">
        <figure className="h-full w-full">
          <img
            src={imageURL}
            alt={data.abbrev}
            className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
        </figure>

        <footer className="absolute bottom-0 left-0 z-10 w-full h-full p-4 flex items-end justify-between">
          <section></section>
          <section>
            <h5 className="font-semibold text-right">{data.name}</h5>
            <h6 className="text-sm">{data.chapters.length} Capitulos</h6>
          </section>
        </footer>
      </article>
    </BookSummaryModalComponent>
  );
}
