import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import { RadioProps } from "@radix-ui/react-radio-group";
import { IFormOption } from "../_interfaces/form-option.interface";
import { RadioGroup, RadioGroupItem } from "@/design/components/ui/radio-group";
import { cn } from "@/design/lib/utils";

interface IAppFormRadioGroupProps extends RadioProps {
  name: string;
  label?: string;
  control: Control<any>;
  options: IFormOption[];
  containerClassName?: string;
}
export default function AppFormRadioGroup(props: IAppFormRadioGroupProps) {
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
            <RadioGroup
              {...field}
              value={field.value}
              defaultValue={field.value}
              onValueChange={field.onChange}
              className={cn(
                "flex flex-col space-y-1",
                props.containerClassName
              )}
            >
              {props.options.map((item, index) => (
                <FormItem
                  key={index}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
