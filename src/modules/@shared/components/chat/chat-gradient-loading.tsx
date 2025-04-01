import { cn } from "@/design/lib/utils";
import { BackgroundGradient } from "@/design/components/ui/background-gradient";

interface IProps {
  isLoading: boolean;
  className?: string;
}
export default function ChatGradientLoading({ isLoading, className }: IProps) {
  return (
    <section
      className={cn(
        "flex items-center justify-center mt-1.5 transition-all duration-700",
        isLoading ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <BackgroundGradient className="w-44" duration={1} />
    </section>
  );
}
