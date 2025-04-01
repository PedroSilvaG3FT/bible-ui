import { format } from "date-fns";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IProps {
  value?: Date;
  className?: string;
  placeholder?: string;
  onChange?: (date: Date | undefined) => void;
}

export default function DatePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a date",
}: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
