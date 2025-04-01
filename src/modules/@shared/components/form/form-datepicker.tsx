import { Control, useController } from "react-hook-form";
import { DateRange } from "react-day-picker";
import DatePickerRange from "@/design/components/ui/datepicker-range";
import DatePicker from "@/design/components/ui/datepicker";

interface IAppFormDatepickerProps {
  name: string;
  label?: string;
  isRange?: boolean;
  className?: string;
  placeholder?: string;
  control: Control<any>;
}

export default function AppFormDatepicker({
  name,
  label,
  control,
  className,
  placeholder,
  isRange = false,
}: IAppFormDatepickerProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const ensureValidDate = (date: any): Date | undefined => {
    if (date instanceof Date && !isNaN(date.getTime())) return date;
    return undefined;
  };

  const ensureValidDateRange = (range: any): DateRange => {
    return {
      from: ensureValidDate(range?.from) || undefined,
      to: ensureValidDate(range?.to),
    };
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      {isRange ? (
        <DatePickerRange
          className={className}
          placeholder={placeholder}
          value={ensureValidDateRange(value)}
          onChange={(newValue) => onChange(newValue)}
        />
      ) : (
        <DatePicker
          className={className}
          placeholder={placeholder}
          value={ensureValidDate(value)}
          onChange={(newValue) => onChange(newValue)}
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
