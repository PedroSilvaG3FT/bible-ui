import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { IFormOption } from "../_interfaces/form-option.interface";

interface IAppFormSelectProps extends SelectProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  control?: Control<any>;
  options: IFormOption[];
}
export default function AppFormSelect(props: IAppFormSelectProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          {props.label && (
            <FormLabel>
              {props.required && <span className="text-red-400 mr-0.5">*</span>}
              {props.label}
            </FormLabel>
          )}

          <FormControl>
            <Select
              {...props}
              defaultValue={String(field.value)}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className={props.className}>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {props.options.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
