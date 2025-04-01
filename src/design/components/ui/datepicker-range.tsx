import { Button } from "./button";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { cn } from "@/design/lib/utils";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IProps {
  value?: DateRange;
  className?: string;
  placeholder?: string;
  onChange?: (date: DateRange | undefined) => void;
}

export default function DatePickerRange({
  value,
  onChange,
  className,
  placeholder = "Pick a date range",
}: IProps) {
  return (
    <div className={cn("grid gap-2 h-full")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            defaultMonth={value?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
