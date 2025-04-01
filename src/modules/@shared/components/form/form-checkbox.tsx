import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/design/components/ui/checkbox";

interface IAppFormCheckboxProps extends CheckboxProps {
  name: string;
  label: string;
  control: Control<any>;
}
export default function AppFormCheckbox(props: IAppFormCheckboxProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <>
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                {...props}
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{props.label}</FormLabel>
          </FormItem>

          <FormMessage />
        </>
      )}
    />
  );
}
