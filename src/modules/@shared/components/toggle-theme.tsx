import { Moon, Sun } from "lucide-react";
import { EThemeType } from "../enums/theme.enum";
import { useTheme } from "@/contexts/theme.context";
import { Button } from "@/design/components/ui/button";
import { cn } from "@/design/lib/utils";

interface IProps {
  className?: string;
}
export default function AppToggleTheme(props: IProps) {
  const { className } = props;
  const { setTheme, theme } = useTheme();

  if (theme === EThemeType.light) {
    return (
      <Button
        size="icon"
        variant="secondary"
        onClick={() => setTheme(EThemeType.dark)}
        className={cn("rounded-full relative", className)}
      >
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    );
  } else {
    return (
      <Button
        size="icon"
        variant="secondary"
        onClick={() => setTheme(EThemeType.light)}
        className={cn("rounded-full relative", className)}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    );
  }
}
