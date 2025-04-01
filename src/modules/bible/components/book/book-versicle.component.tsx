import { cn } from "@/design/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  number: number;
  content: string;
  onClick?: () => void;
}
export default function BookVersicleComponent(props: IProps) {
  const { number, content, onClick } = props;

  const location = useLocation();
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick?.();
  };

  useEffect(() => {
    setSelected(false);
  }, [location]);

  return (
    <p
      className={cn(
        "mb-4 transition-all duration-500 cursor-pointer hover:scale-[1.01] rounded-sm px-2 group",
        selected && "text-yellow-400"
      )}
    >
      <span onClick={handleClick}>{number} - </span>
      <span onClick={handleClick}>{content}</span>
    </p>
  );
}
