import { cn } from "@/design/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBible } from "@/contexts/bible.context";

interface IProps {
  book: string;
  number: number;
  chapter: number;
  content: string;
  onClick?: () => void;
}
export default function BookVersicleComponent(props: IProps) {
  const { number, content, book, chapter, onClick } = props;

  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const { handleSaveVersicle, savedVersicles } = useBible();

  const handleClick = () => {
    setSelected(!selected);
    onClick?.();
    handleSaveVersicle({ book, chapter, number });
  };

  const initSavedVersicle = () => {
    const hasVersicle = savedVersicles.some(
      (i) => i.book === book && i.chapter === chapter && i.number === number
    );
    setSelected(hasVersicle);
  };

  useEffect(() => {
    initSavedVersicle();
  }, [location, savedVersicles]);

  return (
    <p
      className={cn(
        "mb-4 transition-all duration-500 cursor-pointer hover:scale-[1.01] rounded-lg px-2 group",
        selected && "text-yellow-400"
      )}
    >
      <span onClick={handleClick}>{number} - </span>
      <span onClick={handleClick}>{content}</span>
    </p>
  );
}
