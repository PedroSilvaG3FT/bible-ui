import { cn } from "@/design/lib/utils";
import { LucideIcon, Search } from "lucide-react";

interface IProps {
  text?: string;
  icon?: LucideIcon;
  textClassName?: string;
  iconClassName?: string;
}

export default function AppEmptyList(props: IProps) {
  const {
    textClassName = "",
    iconClassName = "",
    icon: Icon = Search,
    text = "There are no items to display",
  } = props;

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Icon className={cn("text-foreground/50 mb-2", iconClassName)} />
      <p
        className={cn("text-center text-sm text-foreground/50", textClassName)}
      >
        {text}
      </p>
    </section>
  );
}
